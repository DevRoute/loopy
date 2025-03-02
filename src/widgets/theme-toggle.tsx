'use client';

import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { useTheme } from 'nextra-theme-docs';
import { useCallback, useEffect, useState } from 'react';

import { Toggle } from '@/components/ui/toggle';

/**
 * 快速切换暗黑模式组件，用于覆盖 nextra 原生切换下拉框
 */
export default function ThemeToggle({ className, lang }: { className?: string; lang: string }) {
  const { setTheme, theme, resolvedTheme } = useTheme(); // 获取当前主题和解析后的主题
  const [previousTheme, setPreviousTheme] = useState('dark'); // 设置默认值为light
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === `/${lang}`;

  // 组件挂载后设置mounted状态
  useEffect(() => {
    setMounted(true);
  }, []);

  // 处理主题切换逻辑
  useEffect(() => {
    // 只在客户端挂载后执行
    if (!mounted) return;

    if (isHomePage) {
      // 在首页，保存当前主题并设置为暗色
      const currentTheme = theme || resolvedTheme;

      if (currentTheme && currentTheme !== 'dark') {
        setPreviousTheme(currentTheme);
      }

      setTheme('dark');
    } else if (previousTheme) {
      // 不在首页，恢复之前的主题
      setTheme(previousTheme);
    }
  }, [isHomePage]);

  const changeTheme = useCallback(() => {
    if (theme === 'dark' || resolvedTheme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  }, [setTheme, theme, resolvedTheme]);

  // 如果组件尚未挂载，不渲染任何内容
  if (!mounted) return null;

  return (
    !isHomePage && (
      <Toggle size="sm" className={clsx(['cursor-pointer', className])} onClick={changeTheme}>
        <span className="icon-[ri--sun-fill] dark:icon-[ri--moon-clear-fill]"></span>
      </Toggle>
    )
  );
}
