import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { pool } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    // 解析请求体
    const data = await request.json();

    // 修改时间戳格式，确保符合 MySQL DATETIME 格式
    const timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const ipAddress = request.headers.get('x-forwarded-for') || 'unknown';

    // 准备要插入的数据
    const eventData = {
      event_name: data.eventName,
      visitor_id: data.visitorId,
      ip_address: ipAddress,
      timestamp: timestamp, // 使用修改后的时间戳格式
      additional_data: JSON.stringify(data), // 存储完整的事件数据
    };

    // 获取数据库连接并插入数据
    const connection = await pool.getConnection();

    try {
      // 检查今天是否已经有相同IP的记录
      const today = new Date().toISOString().split('T')[0]; // 获取当前日期 YYYY-MM-DD
      const [existingRecords] = await connection.execute(
        `SELECT id FROM events 
         WHERE ip_address = ? 
         AND DATE(timestamp) = DATE(?)`,
        [ipAddress, today],
      );

      // 如果没有找到记录，则插入新数据
      if (!Array.isArray(existingRecords) || existingRecords.length === 0) {
        await connection.execute(
          `INSERT INTO events (event_name, visitor_id, ip_address, timestamp, additional_data) 
           VALUES (?, ?, ?, ?, ?)`,
          [
            eventData.event_name,
            eventData.visitor_id,
            eventData.ip_address,
            eventData.timestamp,
            eventData.additional_data,
          ],
        );

        console.log('Event recorded:', {
          eventName: data.eventName,
          visitorId: data.visitorId,
          ...data,
        });

        return NextResponse.json({
          success: true,
          message: 'Event recorded successfully',
        });
      } else {
        return NextResponse.json(
          {
            success: false,
            message: 'IP already recorded today',
          },
          { status: 409 },
        ); // 409 Conflict
      }
    } finally {
      connection.release(); // 确保释放连接
    }
  } catch (error) {
    console.error('Error recording event:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to record event',
      },
      { status: 500 },
    );
  }
}
