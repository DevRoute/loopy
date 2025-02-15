import type { MetaRecord } from 'nextra'
import { TitleBadge } from '@/components/TitleBadge'

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
  project: {
    type: 'page',
    title: (
      <span className="flex items-center leading-[1]">
        项目
        <TitleBadge />
      </span>
    ),
    theme: {
      timestamp: false,
      layout: 'full',
      toc: false,
    },
  },

} satisfies MetaRecord
