import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// 简单的内存存储
const events: any[] = [];

export async function POST(request: NextRequest) {
  try {
    // 解析请求体
    const data = await request.json();

    // 添加时间戳和IP地址
    data.timestamp = new Date().toISOString();
    data.ipAddress = request.headers.get('x-forwarded-for') || 'unknown';

    // 打印事件数据

    console.log('Event:', {
      eventName: data.eventName,
      visitorId: data.visitorId,
      ...data,
    });

    // 存储事件数据
    events.push(data);

    // 返回成功响应
    return NextResponse.json({ success: true });
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
