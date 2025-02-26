import type { MetaRecord } from 'nextra';

import { TitleBadge } from '@/components/TitleBadge';

export default {
  index: {
    type: 'page',
    display: 'hidden',
    theme: {
      timestamp: false,
      layout: 'full',
      toc: false,
    },
  },
  javascript: {
    title: 'Javascript',
    type: 'page',
  },
  performance: {
    title: (
      <span className="flex items-center leading-[1] ">
        前端性能优化
        <TitleBadge />
      </span>
    ),
    type: 'page',
  },
  questions: {
    title: '常见问题',
    display: 'hidden',
    type: 'page',
    theme: {
      breadcrumb: false,
      timestamp: false,
      layout: 'full',
    },
  },
  interview: {
    title: '模拟面试',
    display: 'hidden',
    type: 'page',
    theme: {
      breadcrumb: false,
      timestamp: false,
      layout: 'full',
      toc: false,
    },
  },
  podcast: {
    title: 'AI 播客',
    display: 'hidden',
    type: 'page',
    theme: {
      breadcrumb: false,
      timestamp: false,
      layout: 'full',
      toc: false,
    },
  },
} satisfies MetaRecord;
