import type { MetaRecord } from 'nextra'
import { TitleBadge } from '@/components/TitleBadge'

export default {
  whiteScreen: {
    title: (
      <span className="flex items-center leading-[1]">
        白屏检测
        <TitleBadge />
      </span>
    ),
  },

  FCP: '前端性能指标--FCP',
  FMP: '前端性能指标--FMP',


} satisfies MetaRecord
