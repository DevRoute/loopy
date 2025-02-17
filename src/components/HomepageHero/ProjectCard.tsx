'use client'

import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

// 定义项目的类型
interface Project {
  name: string
  github: string
  link: string
  image: string
  status: string
  description: string
  tags: string[]
}

// 更新 ProjectCard 组件的参数类型
const CardItem = ({ item }: { item: Project }) => {
  // 定义一个状态来存储渐变颜色
  const [bgGradient, setBgGradient] = useState<string>('')

  // 生成随机渐变颜色的函数
  const getRandomGradient = () => {
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#F3FF33', '#FF33A1']
    const color1 = colors[Math.floor(Math.random() * colors.length)]
    const color2 = colors[Math.floor(Math.random() * colors.length)]
    return `linear-gradient(135deg, ${color1}, ${color2})`
  }

  // 在组件挂载时生成随机渐变颜色
  useEffect(() => {
    if (!item.image) {
      setBgGradient(getRandomGradient())
    }
  }, [item.image])

  const statusColors: { [key: string]: string } = {
    已完成: 'bg-green-100 text-green-800',
    进行中: 'bg-blue-100 text-blue-800',
    计划中: 'bg-yellow-100 text-yellow-800',
  }

  return (
    <>
      <div className="flex justify-between mb-2">
        <h3 className="font-bold text-lg text-gray-800 dark:text-zinc-200">{item.name}</h3>
        <div className="flex items-center">
          <Link href={item.github} target="_blank" className="flex items-center mr-1 p-1 hover:bg-[#f3f4f6] hover:rounded-2xl dark:hover:bg-primary/[0.8]">
            <span className="icon-[mingcute--github-line] text-xl "></span>
          </Link>
          <Link href={item.link} target="_blank" className="flex items-center  p-1 hover:bg-[#f3f4f6] hover:rounded-2xl dark:hover:bg-primary/[0.8]">
            <span className="icon-[solar--link-bold] text-xl"></span>
          </Link>
        </div>
      </div>
      <p>
        <span className={cn(statusColors[item.status], 'py-1 px-3 rounded-2xl')}>
          {item.status}
        </span>
      </p>
      <p className="text-gray-600 my-2 dark:text-zinc-300/[0.8]">{item.description}</p>
      {item.image
        ? (
            <div className="w-full">
              <Image src={item.image} layout="responsive" height={250} width={400} alt="project image" />
            </div>
          )
        : (
            <div style={{ background: bgGradient }} className="w-full h-52 flex items-center justify-center">
              <h3 className="font-bold text-lg text-gray-800">{item.name}</h3>
            </div>
          )}
      <div className="flex flex-wrap gap-2 mt-2">
        {item.tags.map((tag: string, tagIndex: number) => (
          <span key={tagIndex} className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
            {tag}
          </span>
        ))}
      </div>
    </>
  )
}

const Card = ({ className, children }: {
  className?: string
  children: React.ReactNode
}) => {
  return (
    <div className={cn(
      'h-full w-full rounded-2xl overflow-hidden',
      'border duration-300 transition-shadow shadow-md',
      'bg-white dark:bg-neutral-800',
      'border-gray-300 dark:bg-white/[0.1]',
      'group-hover:shadow-lg dark:group-hover:border-primary/[0.8]',
      className,
    )}
    >
      <div className="relative">
        <div className="p-4">{children}</div>
      </div>
    </div>
  )
}

export const ProjectCard = ({
  items,
  className,
}: {
  items: Project[]
  className?: string
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  return (
    <div className={cn(
      'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-[10px]',
      className,
    )}
    >
      {items.map((item, idx) => (
        <div
          key={idx}
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="z-[-1] absolute inset-0 h-full w-full bg-neutral-200/[0.3] dark:bg-neutral-500/[0.5] block rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.5 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.3, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <CardItem item={item} />
          </Card>
        </div>
      ))}
    </div>
  )
}
