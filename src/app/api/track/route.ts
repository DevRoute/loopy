import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import type { RowDataPacket } from 'mysql2';

import { pool } from '@/lib/db';

// 内存缓冲区，用于批量处理访问记录
interface VisitRecord {
  visitorId: string;
  referrer: string;
  ipAddress: string;
  timestamp: string;
  duration: number; // 停留时间（秒）
  date: string; // 日期，格式：YYYY-MM-DD
}

// 数据库记录接口
interface VisitRow extends RowDataPacket {
  id: number;
}

// 是否为开发环境
const isDevelopment = process.env.NODE_ENV === 'development';

// 缓冲区大小和刷新间隔
const BUFFER_SIZE = isDevelopment ? 1 : 50; // 开发环境下每条记录都立即写入
const FLUSH_INTERVAL = isDevelopment ? 1000 : 60000; // 开发环境下每秒刷新一次

// 访问记录缓冲区
const visitBuffer: VisitRecord[] = [];

// 已记录的IP（按日期）
const recordedIPs: Map<string, Set<string>> = new Map();
// 记录IP和访客ID的映射关系
const ipVisitorMap: Map<string, { visitorId: string }> = new Map();

// 上次刷新时间
let lastFlushTime = Date.now();

// 获取当前时间的MySQL格式字符串（YYYY-MM-DD HH:MM:SS）
function getCurrentMySQLTimestamp(): string {
  const now = new Date();

  // 格式化为 YYYY-MM-DD HH:MM:SS
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// 获取当前日期（YYYY-MM-DD）
function getCurrentDate(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

// 批量保存访问记录到数据库
async function flushVisitBuffer() {
  if (visitBuffer.length === 0) return;

  const recordsToInsert = [...visitBuffer];
  visitBuffer.length = 0; // 清空缓冲区

  try {
    const connection = await pool.getConnection();

    try {
      // 使用事务批量插入
      await connection.beginTransaction();

      for (const record of recordsToInsert) {
        // 检查是否已存在该IP的记录
        const [rows] = await connection.execute<VisitRow[]>(
          `SELECT id FROM visits 
           WHERE ip_address = ? AND DATE(timestamp) = ?`,
          [record.ipAddress, record.date],
        );

        if (rows.length === 0) {
          // 不存在记录，插入新记录
          await connection.execute(
            `INSERT INTO visits (visitor_id, referrer, ip_address, timestamp, duration) 
             VALUES (?, ?, ?, ?, ?)`,
            [
              record.visitorId,
              record.referrer,
              record.ipAddress,
              record.timestamp,
              record.duration,
            ],
          );
        }
      }

      await connection.commit();
    } catch {
      await connection.rollback();
    } finally {
      connection.release();
    }
  } catch {}

  lastFlushTime = Date.now();
}

// 直接保存单条记录到数据库（开发环境使用）
async function saveVisitRecord(record: VisitRecord) {
  try {
    const connection = await pool.getConnection();

    try {
      // 检查是否已存在该IP的记录
      const [rows] = await connection.execute<VisitRow[]>(
        `SELECT id FROM visits 
         WHERE ip_address = ? AND DATE(timestamp) = ?`,
        [record.ipAddress, record.date],
      );

      if (rows.length === 0) {
        // 不存在记录，插入新记录
        await connection.execute(
          `INSERT INTO visits (visitor_id, referrer, ip_address, timestamp, duration) 
           VALUES (?, ?, ?, ?, ?)`,
          [record.visitorId, record.referrer, record.ipAddress, record.timestamp, record.duration],
        );
        console.log(`插入了新的访问记录: ${record.ipAddress}, 停留时间: ${record.duration}秒`);
      } else {
        console.log(`跳过已存在的记录: ${record.ipAddress}, 日期: ${record.date}`);
      }
    } catch {
      // 保存访问记录失败
    } finally {
      connection.release();
    }
  } catch {
    // 获取数据库连接失败
  }
}

// 定期刷新缓冲区
setInterval(() => {
  if (Date.now() - lastFlushTime >= FLUSH_INTERVAL && visitBuffer.length > 0) {
    flushVisitBuffer();
  }
}, FLUSH_INTERVAL / 2);

// 清理过期的IP记录（保留最近7天）
setInterval(() => {
  const now = new Date();
  const cutoffDate = new Date(now.setDate(now.getDate() - 7)).toISOString().split('T')[0];

  // 使用日期作为键来删除过期记录
  for (const date of recordedIPs.keys()) {
    if (date < cutoffDate) {
      recordedIPs.delete(date);
    }
  }

  // 清理过期的IP-访客映射
  for (const key of ipVisitorMap.keys()) {
    const [, date] = key.split('|');

    if (date < cutoffDate) {
      ipVisitorMap.delete(key);
    }
  }
}, 86400000); // 每24小时清理一次

export async function POST(request: NextRequest) {
  try {
    // 解析请求体
    const data = await request.json();

    // 使用自定义函数获取当前时间和日期
    const timestamp = getCurrentMySQLTimestamp();
    const today = getCurrentDate();

    const ipAddress = request.headers.get('x-forwarded-for') || 'unknown';
    const referrer = data.referrer || '';
    const visitorId = data.visitorId;
    const duration = parseInt(data.duration) || 0; // 确保停留时间是整数

    // 记录调试信息
    console.log('接收到的请求数据:', {
      visitorId,
      referrer,
      ipAddress,
      timestamp,
      today,
      duration,
    });

    if (!visitorId) {
      // 如果没有访客ID，直接返回204状态码（无内容）
      return new NextResponse(null, { status: 204 });
    }

    // 生成IP和日期的组合键
    const ipDateKey = `${ipAddress}|${today}`;

    // 检查今天是否已经记录过这个IP
    if (!recordedIPs.has(today)) {
      recordedIPs.set(today, new Set());
    }

    const todayIPs = recordedIPs.get(today)!;

    // 如果今天已经记录过这个IP，直接忽略
    if (todayIPs.has(ipAddress)) {
      console.log(`忽略重复访问: ${ipAddress}, 日期: ${today}`);

      return new NextResponse(null, { status: 204 });
    }

    // 标记这个IP今天已经记录过
    todayIPs.add(ipAddress);

    // 更新IP-访客映射
    ipVisitorMap.set(ipDateKey, { visitorId });

    const record = {
      visitorId,
      referrer,
      ipAddress,
      timestamp,
      duration,
      date: today,
    };

    if (isDevelopment) {
      // 开发环境下直接保存记录
      await saveVisitRecord(record);
    } else {
      // 生产环境下添加到缓冲区
      visitBuffer.push(record);
      console.log('访问记录已添加到缓冲区:', {
        visitorId,
        referrer,
        ipAddress,
        timestamp,
        duration,
      });

      // 如果缓冲区达到阈值，批量保存
      if (visitBuffer.length >= BUFFER_SIZE) {
        flushVisitBuffer();
      }
    }

    // 无论是否记录数据，都返回204状态码（无内容）
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('记录访问数据错误:', error);

    // 即使出错也返回204，不向前端暴露错误信息
    return new NextResponse(null, { status: 204 });
  }
}

// 确保进程退出前保存缓冲区中的数据
process.on('SIGTERM', async () => {
  await flushVisitBuffer();
  process.exit(0);
});

process.on('SIGINT', async () => {
  await flushVisitBuffer();
  process.exit(0);
});
