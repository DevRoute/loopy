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
  const { setTheme, theme } = useTheme();
  const [previousTheme, setPreviousTheme] = useState('');
  const pathname = usePathname();
  const isHomePage = pathname === `/${lang}`;

  useEffect(() => {
    console.log('isHomePage', isHomePage);
    console.log('theme', theme);
    if (isHomePage && theme) {
      setPreviousTheme(theme);
      setTheme('dark');
    } else {
      setTheme(previousTheme);
    }
  }, [isHomePage]);

  const changeTheme = useCallback(() => {
    if (theme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  }, [setTheme, theme]);

  return (
    !isHomePage && (
      <Toggle size="sm" className={clsx(['cursor-pointer', className])} onClick={changeTheme}>
        <span className="icon-[ri--sun-fill] dark:icon-[ri--moon-clear-fill]"></span>
      </Toggle>
    )
  );
}
