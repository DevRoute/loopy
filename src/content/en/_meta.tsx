import type { MetaRecord } from 'nextra';

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
    title: '前端性能优化',
    type: 'page',
  },
  questions: {
    title: '常见问题',
    type: 'page',
  },
} satisfies MetaRecord;
