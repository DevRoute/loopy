// 单例模式确保全局唯一的事件跟踪器
class AnalyticsTracker {
  private static instance: AnalyticsTracker;
  private sentPageViews = new Set<string>();
  private sentEvents = new Set<string>();
  private pageEnterTime: number = 0;
  private visitorId: string | null = null;
  private exitEventRegistered = false;

  private constructor() {
    // 记录页面进入时间
    this.pageEnterTime = Date.now();

    // 在客户端环境中注册页面退出事件
    if (typeof window !== 'undefined') {
      // 注册页面退出事件（只注册一次）
      if (!this.exitEventRegistered) {
        window.addEventListener('beforeunload', this.handlePageExit);
        this.exitEventRegistered = true;
      }
    }
  }

  public static getInstance(): AnalyticsTracker {
    if (!AnalyticsTracker.instance) {
      AnalyticsTracker.instance = new AnalyticsTracker();
    }

    return AnalyticsTracker.instance;
  }

  public setVisitorId(id: string): void {
    this.visitorId = id;
  }

  public trackPageView(data: {
    page: string;
    visitorId?: string;
    referrer?: string;
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
  }): void {
    // 只在客户端环境中执行
    if (typeof window === 'undefined') {
      return;
    }

    // 创建唯一键
    const key = `${data.page}-${data.visitorId || 'anonymous'}`;

    // 如果已经发送过，则跳过
    if (this.sentPageViews.has(key)) {
      // console.log(`[Analytics] Skipping duplicate page view: ${key}`)
      return;
    }

    // 标记为已发送
    this.sentPageViews.add(key);
    // console.log(`[Analytics] Sending page view: ${key}`)

    // 使用 sendBeacon 发送数据
    if (navigator.sendBeacon) {
      const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
      navigator.sendBeacon('/api/view', blob);
    } else {
      // 浏览器不支持 sendBeacon，使用 fetch
      fetch('/api/view', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        keepalive: true,
      }).catch(() => {});
    }
  }

  public trackEvent(data: { eventName: string; visitorId?: string; [key: string]: any }): void {
    // 只在客户端环境中执行
    if (typeof window === 'undefined') {
      return;
    }

    // 对于页面退出事件，总是发送
    if (data.eventName !== 'page_exit') {
      // 创建唯一键
      const key = `${data.eventName}-${data.section || ''}-${data.visitorId || 'anonymous'}`;

      // 如果已经发送过，则跳过
      if (this.sentEvents.has(key)) {
        // console.log(`[Analytics] Skipping duplicate event: ${key}`)
        return;
      }

      // 标记为已发送
      this.sentEvents.add(key);
      // console.log(`[Analytics] Sending event: ${key}`)
    }

    // 使用 sendBeacon 发送数据
    if (navigator.sendBeacon) {
      const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
      navigator.sendBeacon('/api/event', blob);
    } else {
      // 浏览器不支持 sendBeacon，使用 fetch
      fetch('/api/event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        keepalive: true,
      }).catch(() => {});
    }
  }

  private handlePageExit = (): void => {
    if (!this.visitorId) {
      return;
    }

    const stayDuration = Date.now() - this.pageEnterTime;

    if (stayDuration > 0) {
      this.trackEvent({
        eventName: 'page_exit',
        page: 'homepage',
        stayDuration,
        visitorId: this.visitorId,
      });
    }
  };
}

// 创建一个安全的获取实例的函数
const getAnalyticsTracker = () => {
  // 确保只在客户端环境中创建实例
  if (typeof window === 'undefined') {
    // 返回一个空对象，具有相同的接口但不执行任何操作
    return {
      setVisitorId: () => {},
      trackPageView: () => {},
      trackEvent: () => {},
    };
  }

  return AnalyticsTracker.getInstance();
};

// 导出单例实例的方法
const analyticsTracker = getAnalyticsTracker();

// 导出简化的接口
export const trackPageView = (data: {
  page: string;
  visitorId?: string;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}): void => {
  // 确保只在客户端环境中执行
  if (typeof window === 'undefined') {
    return;
  }

  analyticsTracker.trackPageView(data);

  // 如果提供了访客ID，设置到跟踪器中
  if (data.visitorId) {
    analyticsTracker.setVisitorId(data.visitorId);
  }
};

export const trackEvent = (data: {
  eventName: string;
  visitorId?: string;
  [key: string]: any;
}): void => {
  // 确保只在客户端环境中执行
  if (typeof window === 'undefined') {
    return;
  }

  analyticsTracker.trackEvent(data);

  // 如果提供了访客ID，设置到跟踪器中
  if (data.visitorId) {
    analyticsTracker.setVisitorId(data.visitorId);
  }
};
