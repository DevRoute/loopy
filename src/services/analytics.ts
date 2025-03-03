// 单例模式确保全局唯一的事件跟踪器
class AnalyticsTracker {
  private static instance: AnalyticsTracker;
  private pageEnterTime: number = 0;
  private visitorId: string | null = null;
  private exitEventRegistered = false;
  private heartbeatInterval: NodeJS.Timeout | null = null;
  private lastHeartbeat: number = 0;
  private accumulatedDuration: number = 0;

  private constructor() {
    // 记录页面进入时间
    this.pageEnterTime = Date.now();
    this.lastHeartbeat = this.pageEnterTime;

    // 在客户端环境中注册页面事件
    if (typeof window !== 'undefined') {
      // 注册页面退出事件（只注册一次）
      if (!this.exitEventRegistered) {
        // 使用多个事件来确保能捕获用户离开
        window.addEventListener('beforeunload', this.handlePageExit);
        window.addEventListener('unload', this.handlePageExit);
        window.addEventListener('pagehide', this.handlePageExit);

        // 页面可见性变化时更新时间
        document.addEventListener('visibilitychange', this.handleVisibilityChange);

        // 启动心跳计时器，定期更新累计时间
        this.startHeartbeat();

        this.exitEventRegistered = true;
      }
    }
  }

  private startHeartbeat(): void {
    // 每10秒更新一次累计时间
    this.heartbeatInterval = setInterval(() => {
      if (document.visibilityState === 'visible') {
        const now = Date.now();
        const increment = now - this.lastHeartbeat;
        this.accumulatedDuration += increment;
        this.lastHeartbeat = now;
      }
    }, 10000);
  }

  private handleVisibilityChange = (): void => {
    const now = Date.now();

    if (document.visibilityState === 'hidden') {
      // 页面隐藏时，累计时间
      const increment = now - this.lastHeartbeat;
      this.accumulatedDuration += increment;

      // 移除在页面隐藏时发送数据的逻辑
      // 只在用户完全离开网站时才发送数据
    } else if (document.visibilityState === 'visible') {
      // 页面再次可见时，重置最后心跳时间
      this.lastHeartbeat = now;
    }
  };

  public static getInstance(): AnalyticsTracker {
    if (!AnalyticsTracker.instance) {
      AnalyticsTracker.instance = new AnalyticsTracker();
    }

    return AnalyticsTracker.instance;
  }

  public setVisitorId(id: string): void {
    this.visitorId = id;
  }

  // 统一的跟踪方法
  public track(data: any, setVisitorIdOnly: boolean = false): void {
    // 只在客户端环境中执行
    if (typeof window === 'undefined') {
      return;
    }

    // 如果提供了访客ID，设置到跟踪器中
    if (data.visitorId) {
      this.setVisitorId(data.visitorId);
    }

    // 如果只是设置访客ID，不发送请求
    if (setVisitorIdOnly) {
      return;
    }

    // 使用 sendBeacon 发送数据
    if (navigator.sendBeacon) {
      const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
      navigator.sendBeacon('/api/track', blob);
    } else {
      // 浏览器不支持 sendBeacon，使用 fetch
      fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        keepalive: true,
      }).catch(() => {});
    }
  }

  private sendTrackingData(): void {
    if (!this.visitorId) {
      return;
    }

    // 计算总停留时间（毫秒）
    const now = Date.now();
    const totalDuration = this.accumulatedDuration + (now - this.lastHeartbeat);

    // 将毫秒转换为秒，并四舍五入到整数
    const durationInSeconds = Math.max(1, Math.round(totalDuration / 1000));

    if (durationInSeconds > 0) {
      this.track({
        visitorId: this.visitorId,
        referrer: this.getReferrer(),
        duration: durationInSeconds, // 添加停留时间（秒）
      });

      // 输出调试信息
      console.log(`发送停留时间数据: ${durationInSeconds}秒`);
    }
  }

  private handlePageExit = (): void => {
    // 清除心跳定时器
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
    }

    // 发送最终的跟踪数据
    this.sendTrackingData();
  };

  private getReferrer(): string {
    try {
      return document.referrer || '';
    } catch {
      return '';
    }
  }
}

// 创建一个安全的获取实例的函数
const getAnalyticsTracker = () => {
  // 确保只在客户端环境中创建实例
  if (typeof window === 'undefined') {
    // 返回一个空对象，具有相同的接口但不执行任何操作
    return {
      setVisitorId: () => {},
      track: () => {},
    };
  }

  return AnalyticsTracker.getInstance();
};

// 导出单例实例的方法
const analyticsTracker = getAnalyticsTracker();

// 导出统一的跟踪接口
export const track = (data: any, setVisitorIdOnly: boolean = false): void => {
  // 确保只在客户端环境中执行
  if (typeof window === 'undefined') {
    return;
  }

  // 发送数据
  analyticsTracker.track(data, setVisitorIdOnly);
};
