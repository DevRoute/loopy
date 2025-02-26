'use client';

// 假设有一个统计服务
// 引入 FingerprintJS
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { motion } from 'framer-motion';
import { lazy, Suspense, useEffect, useRef } from 'react';

// 直接导入首屏必需的 SetupHero
import { SetupHero } from './Setup';

import { trackEvent, trackPageView } from '@/services/analytics';
import { useInView } from '@/hooks/useInView';
import { useLocale } from '@/hooks';

// 懒加载其他组件
const Project = lazy(() => import('./Project').then((mod) => ({ default: mod.Project })));
const Donation = lazy(() => import('./Donation').then((mod) => ({ default: mod.Team })));
const Contact = lazy(() => import('./Contact').then((mod) => ({ default: mod.Contact })));
const Faq = lazy(() => import('./Faq').then((mod) => ({ default: mod.Faq })));
const Service = lazy(() => import('./Service').then((mod) => ({ default: mod.Service })));
// 加载占位组件
const LoadingFallback = () => (
  <div className="h-screen flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-[#00DC82] border-t-transparent rounded-full animate-spin" />
  </div>
);

export default function HomepageHero() {
  const { t } = useLocale();
  console.log(t);

  const [projectRef, projectInView] = useInView();
  const [donationRef, donationInView] = useInView();
  const [contactRef, contactInView] = useInView();
  const [faqRef, faqInView] = useInView();
  const [serviceRef, serviceInView] = useInView();
  // 使用 ref 来跟踪初始化状态
  const initialized = useRef(false);

  // 使用 ref 来跟踪各部分是否已经发送过事件
  const sectionEventsSent = useRef({
    project: false,
    donation: false,
    contact: false,
    faq: false,
  });

  // 访客ID
  const visitorId = useRef<string>('');

  // 初始化分析
  useEffect(() => {
    // 只在未初始化时执行
    if (!initialized.current) {
      initialized.current = true;

      // 初始化 FingerprintJS
      const initFingerprint = async () => {
        try {
          // 加载 FingerprintJS
          const fp = await FingerprintJS.load();
          const result = await fp.get();
          const vid = result.visitorId;

          // 获取来源信息
          const referrer = document.referrer;
          const urlParams = new URLSearchParams(window.location.search);
          const utmSource = urlParams.get('utm_source') || undefined;
          const utmMedium = urlParams.get('utm_medium') || undefined;
          const utmCampaign = urlParams.get('utm_campaign') || undefined;

          // 只上报一次 PV 和 UV
          trackPageView({
            page: 'homepage',
            visitorId: vid,
            referrer,
            utmSource,
            utmMedium,
            utmCampaign,
          });
        } catch (error) {
          console.error('Failed to initialize fingerprint:', error);
          // 即使指纹获取失败，也尝试记录PV
          trackPageView({
            page: 'homepage',
            referrer: document.referrer,
          });
        }
      };

      initFingerprint();
    }
  }, []); // 空依赖数组确保只运行一次

  // 监听各部分的可见性
  useEffect(() => {
    if (projectInView && visitorId.current && !sectionEventsSent.current.project) {
      sectionEventsSent.current.project = true;
      trackEvent({
        eventName: 'section_view',
        section: 'project',
        visitorId: visitorId.current,
      });
    }
  }, [projectInView]);

  useEffect(() => {
    if (donationInView && visitorId.current && !sectionEventsSent.current.donation) {
      sectionEventsSent.current.donation = true;
      trackEvent({
        eventName: 'section_view',
        section: 'donation',
        visitorId: visitorId.current,
      });
    }
  }, [donationInView]);

  useEffect(() => {
    if (contactInView && visitorId.current && !sectionEventsSent.current.contact) {
      sectionEventsSent.current.contact = true;
      trackEvent({
        eventName: 'section_view',
        section: 'contact',
        visitorId: visitorId.current,
      });
    }
  }, [contactInView]);

  useEffect(() => {
    if (faqInView && visitorId.current && !sectionEventsSent.current.faq) {
      sectionEventsSent.current.faq = true;
      trackEvent({
        eventName: 'section_view',
        section: 'faq',
        visitorId: visitorId.current,
      });
    }
  }, [faqInView]);

  return (
    <div className="min-h-screen">
      <SetupHero />

      <motion.div
        ref={projectRef}
        initial={{ opacity: 0, y: 50 }}
        animate={projectInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.6 }}
      >
        <Suspense fallback={<LoadingFallback />}>
          <Project />
        </Suspense>
      </motion.div>

      <motion.div
        ref={serviceRef}
        initial={{ opacity: 0, y: 50 }}
        animate={serviceInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.6 }}
      >
        <Suspense fallback={<LoadingFallback />}>
          <Service />
        </Suspense>
      </motion.div>

      <motion.div
        ref={contactRef}
        initial={{ opacity: 0, y: 50 }}
        animate={contactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.6 }}
      >
        <Suspense fallback={<LoadingFallback />}>
          <Contact />
        </Suspense>
      </motion.div>

      <motion.div
        ref={faqRef}
        initial={{ opacity: 0, y: 50 }}
        animate={faqInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.6 }}
      >
        <Suspense fallback={<LoadingFallback />}>
          <Faq />
        </Suspense>
      </motion.div>

      <motion.div
        ref={donationRef}
        initial={{ opacity: 0, y: 50 }}
        animate={donationInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.6 }}
      >
        <Suspense fallback={<LoadingFallback />}>
          <Donation />
        </Suspense>
      </motion.div>
    </div>
  );
}
