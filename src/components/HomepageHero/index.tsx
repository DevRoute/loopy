'use client'

import { useLocale } from '@/hooks'

import { cn } from '@/lib/utils'

import { Contact } from './Contact'
import { Project } from './Project'
import { SetupHero } from './Setup'

export const StackItem = ({
  className,
}: {
  className: string
},
) => {
  return (
    <div className={cn(
      'mx-6 size-[50px]',
      'text-neutral-800 dark:text-neutral-100',
      className,
    )}
    />
  )
}

export default function HomepageHero() {
  const { t } = useLocale()

  return (

    <div className="min-h-screen">
      <SetupHero />
      <Project />
      <Contact />
    </div>

  )
}
