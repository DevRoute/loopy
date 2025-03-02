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
  typescript: {
    title: 'TypeScript',
    type: 'page',
  },
  react: {
    title: 'React',
    type: 'page',
  },
  node: {
    title: 'Node.js',
    type: 'page',
  },
  network: {
    title: '计算机网络',
    type: 'page',
  },
  engineer: {
    title: '前端工程化',
    type: 'page',
  },
  performance: {
    title: '前端性能优化',
    type: 'page',
  },
  questions: {
    title: '常见问题',
    display: 'hidden',
    type: 'page',
  },
  interview: {
    title: '面试',
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
