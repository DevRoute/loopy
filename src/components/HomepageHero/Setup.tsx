'use client'

import { Button } from '@/components/ui/button'
import { useLocale } from '@/hooks'
import { categories, features } from '@/lib/data'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface Props {
}

export function SetupHero(props: Props) {
  const { t, currentLocale } = useLocale()

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* 背景层 */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-purple-900 to-slate-900" />

      {/* 动态网格背景 */}
      <motion.div
        className="fixed inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]"
        animate={{
          y: ['0%', '50%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* 光效背景 */}
      <div className="fixed inset-0">
        <motion.div
          className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            scale: [1, 1.1, 0.9, 1],
            x: [0, 30, -20, 0],
            y: [0, -50, 20, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute top-0 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            scale: [1, 0.9, 1.1, 1],
            x: [0, -20, 30, 0],
            y: [0, 20, -50, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        />
        <motion.div
          className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            scale: [1, 1.1, 0.9, 1],
            x: [0, 30, -20, 0],
            y: [0, -20, 50, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 4,
          }}
        />
      </div>

      <motion.div
        className="relative container mx-auto px-4 py-20"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* 顶部标签 */}
        <motion.div variants={item} className="text-center">
          <span className={cn(
            'inline-flex items-center px-4 py-2 rounded-full text-sm font-medium  ',
            'shadow-lg hover:shadow-xl transition-all duration-300',
            'bg-linear-to-r from-yellow-400 via-orange-400 to-red-400 text-white',
            'dark:bg-gradient-to-r dark:from-blue-500 dark:via-indigo-500 dark:to-purple-500 ',
          )}
          >
            <motion.span
              className="icon-[material-symbols--new-releases] mr-2"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            系统化的前端面试题库
          </span>
        </motion.div>

        {/* 主标题 */}
        <motion.h1
          variants={item}
          className="mt-8 text-center font-bold"
        >
          <span className={cn(
            'block text-5xl md:text-6xl lg:text-7xl mb-2',
            'text-transparent bg-clip-text bg-gradient-to-r',
            'from-blue-400 via-blue-500 to-blue-600',
            'dark:from-blue-400 dark:via-purple-500 dark:to-pink-500',
            'animate-gradient-x',
          )}
          >
            面试宝典
          </span>
          <span className={cn(
            'block text-4xl md:text-5xl lg:text-6xl',
            'text-transparent bg-clip-text bg-gradient-to-r',
            'from-gray-700 via-gray-700 to-gray-700',
            'dark:from-indigo-300 dark:via-white dark:to-indigo-300',
            'dark:hover:from-white dark:hover:via-indigo-300 dark:hover:to-white',
            'transition-all duration-500',
          )}
          >
            知识体系精选
          </span>
        </motion.h1>

        {/* 技术标签 */}
        <motion.div
          variants={container}
          className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-wrap justify-center gap-3 max-w-4xl mx-auto px-4"
        >
          {categories.map((category) => (
            <motion.div
              key={category.name}
              variants={item}
              whileHover={{
                scale: 1.05,
                y: -2,
                transition: { duration: 0.2 },
              }}
              className={`
                group w-full md:w-auto md:min-w-[140px]
                px-4 sm:px-6 py-2.5 rounded-full
                bg-gradient-to-r ${category.color}
                bg-opacity-20 backdrop-blur-md
                border border-white/20 hover:border-white/40
                cursor-pointer transition-all duration-300
                shadow-lg shadow-black/10 hover:shadow-xl hover:shadow-black/20
                flex items-center justify-center gap-2 sm:gap-3
              `}
            >
              <span
                className={`
                  text-lg sm:text-xl text-white shrink-0
                  drop-shadow-[0_0_4px_rgba(255,255,255,0.5)]
                  filter brightness-125
                  group-hover:scale-110 transition-transform duration-300
                  font-bold
                `}
              >
                {category.icon}
              </span>
              <span className="font-semibold text-sm sm:text-[15px] text-white/90 group-hover:text-white whitespace-nowrap">
                {category.name}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* 特性说明 */}
        <motion.div
          variants={item}
          className="mt-12 text-center"
        >
          <span className={cn(
            'inline-flex items-center px-4 py-2 rounded-full text-sm ',
            'border border-gray-300',
            'dark:bg-white/10 dark:text-white/80 dark:backdrop-blur-sm dark:border-none',
          )}
          >
            <span className="icon-[material-symbols--info-outline] mr-2" />
            每个知识点都提供完整的知识图谱和深度解析
          </span>
        </motion.div>

        {/* 特性卡片 */}
        <motion.div
          variants={container}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={item}
              whileHover={{ y: -5 }}
              className={`
                p-6 rounded-2xl
                bg-gradient-to-br ${feature.color} bg-opacity-10
                backdrop-blur-sm border border-white/10
                hover:border-white/20 transition-all duration-300
              `}
            >
              <motion.span
                className="text-3xl mb-4 block text-white"
                whileHover={{ scale: 1.1 }}
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className={feature.icon} />
              </motion.span>
              <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
              <p className="text-sm text-white/80">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* 统计数据 */}
        <motion.div
          variants={container}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto"
        >
          {[
            { icon: 'icon-[material-symbols--person]', count: '10000+', label: '学习者' },
            { icon: 'icon-[material-symbols--library-books]', count: '500+', label: '知识点' },
            { icon: 'icon-[material-symbols--workspace-premium]', count: '200+', label: '面试真题' },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              variants={item}
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center p-4 rounded-xl bg-white/5 backdrop-blur-sm"
            >
              <motion.span
                className={`${stat.icon} text-3xl text-blue-400 mb-2`}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-2xl font-bold text-white">
                {stat.count}
              </span>
              <span className="text-sm text-slate-300">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* 按钮组 */}
        <motion.div
          variants={item}
          className="mt-12 flex flex-wrap gap-4 justify-center"
        >
          <motion.div whileHover={{ scale: 1.05 }}>
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg"
            >
              <Link href={`/${currentLocale}/getting-started`}>
                开始学习
                <motion.span
                  className="ml-2 icon-[mingcute--arrow-right-fill]"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </Link>
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-4 rounded-xl shadow-lg"
            >
              <Link href={`/${currentLocale}/mock-interview`}>
                模拟面试
                <motion.span
                  className="ml-2 icon-[material-symbols--psychology]"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </Link>
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-4 rounded-xl shadow-lg"
            >
              <Link href={`/${currentLocale}/ai-podcast`}>
                AI 播客
                <motion.span
                  className="ml-2 icon-[material-symbols--podcasts]"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.8, 1],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}
