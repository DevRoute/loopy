import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// 简单的内存存储
const pageViews: any[] = [];
const uniqueVisitors = new Set<string>();

export async function POST(request: NextRequest) {
  try {
    // 解析请求体
    const data = await request.json();

    // 添加时间戳和IP地址
    data.timestamp = new Date().toISOString();
    data.ipAddress = request.headers.get('x-forwarded-for') || 'unknown';

    // 打印数据

    console.log('Page View:', {
      page: data.page,
      visitorId: data.visitorId,
      referrer: data.referrer,
      utmSource: data.utmSource,
      utmMedium: data.utmMedium,
      utmCampaign: data.utmCampaign,
      timestamp: data.timestamp,
      ipAddress: data.ipAddress,
    });

    // 存储页面访问数据
    pageViews.push(data);

    // 如果有访客ID，记录唯一访客
    if (data.visitorId) {
      uniqueVisitors.add(data.visitorId);
    }

    // 返回当前统计数据
    return NextResponse.json({
      success: true,
      stats: {
        pv: pageViews.length,
        uv: uniqueVisitors.size,
      },
    });
  } catch (error) {
    console.error('Error recording page view:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to record page view',
      },
      { status: 500 },
    );
  }
}
