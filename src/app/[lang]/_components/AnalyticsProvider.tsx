'use client';

import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { useEffect, useRef } from 'react';

import { track } from '@/services/analytics';

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const initialized = useRef(false);

  useEffect(() => {
    // 确保只初始化一次
    if (!initialized.current) {
      initialized.current = true;

      // 初始化 FingerprintJS
      const initFingerprint = async () => {
        try {
          // 加载 FingerprintJS
          const fp = await FingerprintJS.load();
          const result = await fp.get();
          const vid = result.visitorId;

          // 只设置访客ID，不发送数据
          // 数据将在用户离开页面时由 analytics.ts 中的事件处理器发送
          track({ visitorId: vid }, true); // 设置 setVisitorIdOnly 为 true
        } catch (error) {
          // 初始化指纹失败
          console.error('Failed to initialize fingerprint:', error);
        }
      };

      initFingerprint();
    }
  }, []); // 空依赖数组确保只运行一次

  return <>{children}</>;
}
