'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { useLocale } from '@/hooks';
import { categories, features } from '@/lib/data';
import { cn } from '@/lib/utils';

export function SetupHero() {
  const { t, currentLocale } = useLocale();
  console.log(t);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

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
          <span
            className={cn(
              'inline-flex items-center px-3.5 py-1.5 rounded-full text-sm font-medium',
              'shadow-md hover:shadow-lg transition-all duration-300',
              'bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white',
              'border border-white/20',
            )}
          >
            <motion.span
              className="icon-[material-symbols--new-releases] mr-1.5 text-base"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            系统化的前端面试题库
          </span>
        </motion.div>

        {/* 主标题 */}
        <motion.h1 variants={item} className="mt-8 text-center font-bold">
          <span
            className={cn(
              'block text-5xl md:text-6xl lg:text-7xl mb-2',
              'text-transparent bg-clip-text bg-gradient-to-r',
              'from-blue-300 via-blue-400 to-blue-500',
              'dark:from-blue-300 dark:via-purple-400 dark:to-pink-400',
              'animate-gradient-x',
              'tracking-tight',
            )}
          >
            面试宝典
          </span>
          <span
            className={cn(
              'block text-4xl md:text-5xl lg:text-6xl',
              'text-transparent bg-clip-text bg-gradient-to-r',
              'from-gray-200 via-gray-300 to-gray-200',
              'dark:from-indigo-200 dark:via-white dark:to-indigo-200',
              'dark:hover:from-white dark:hover:via-indigo-200 dark:hover:to-white',
              'transition-all duration-500',
              'tracking-tight',
            )}
          >
            知识体系精选
          </span>
        </motion.h1>

        {/* 技术标签 */}
        <motion.div
          variants={container}
          className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-wrap justify-center gap-2 max-w-4xl mx-auto px-4"
        >
          {categories.map((category) => (
            <motion.div
              key={category.name}
              variants={item}
              whileHover={{
                scale: 1.03,
                y: -1,
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                transition: { duration: 0.2, ease: 'easeOut' },
              }}
              className={`
                group w-full md:w-auto md:min-w-[110px]
                px-2.5 sm:px-3.5 py-1.5 rounded-full
                bg-gradient-to-r ${category.color}
                bg-opacity-15 backdrop-blur-sm
                border border-white/15 hover:border-white/30
                cursor-pointer transition-all duration-200
                shadow-sm hover:shadow-md
                flex items-center justify-center gap-1.5
              `}
            >
              <span
                className={`
                  text-base sm:text-lg text-white shrink-0
                  drop-shadow-[0_0_3px_rgba(255,255,255,0.5)]
                  filter brightness-125
                  group-hover:scale-105 transition-transform duration-200
                `}
              >
                {category.icon}
              </span>
              <span className="font-medium text-xs sm:text-sm text-white group-hover:text-white whitespace-nowrap">
                {category.name}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* 特性说明 */}
        <motion.div variants={item} className="mt-8 text-center">
          <span
            className={cn(
              'inline-flex items-center px-3 py-1.5 rounded-full text-xs',
              'border border-white/15',
              'bg-white/5 text-white backdrop-blur-sm shadow-sm',
              'hover:bg-white/8 hover:border-white/25 transition-all duration-200',
            )}
          >
            <span className="icon-[material-symbols--info-outline] mr-1.5 text-sm" />
            每个知识点都提供完整的知识图谱和深度解析
          </span>
        </motion.div>

        {/* 特性卡片 */}
        <motion.div
          variants={container}
          className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={item}
              whileHover={{
                y: -3,
                boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                transition: { duration: 0.2, ease: 'easeOut' },
              }}
              className={`
                p-5 rounded-xl
                bg-gradient-to-br ${feature.color} bg-opacity-8
                backdrop-blur-sm border border-white/10
                hover:border-white/20 transition-all duration-200
                shadow-sm hover:shadow-md
              `}
            >
              <motion.span
                className="text-2xl mb-3 block text-white"
                whileHover={{ scale: 1.05 }}
                animate={{
                  y: [0, -3, 0],
                  rotate: [0, 2, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <span className={`${feature.icon} drop-shadow-[0_0_4px_rgba(255,255,255,0.3)]`} />
              </motion.span>
              <h3 className="text-lg font-bold mb-1.5 text-white">{feature.title}</h3>
              <p className="text-xs text-white/90 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* 统计数据 */}
        <motion.div
          variants={container}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5 max-w-3xl mx-auto"
        >
          {[
            { icon: 'icon-[material-symbols--person]', count: '10000+', label: '学习者' },
            { icon: 'icon-[material-symbols--library-books]', count: '500+', label: '知识点' },
            {
              icon: 'icon-[material-symbols--workspace-premium]',
              count: '200+',
              label: '面试真题',
            },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              variants={item}
              whileHover={{
                scale: 1.03,
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              }}
              className="flex flex-col items-center p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/8 hover:border-white/15 transition-all duration-200"
            >
              <motion.span
                className={`${stat.icon} text-xl text-blue-200 mb-1.5`}
                animate={{
                  scale: [1, 1.08, 1],
                  rotate: [0, 2, 0],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="text-lg font-bold text-white">{stat.count}</span>
              <span className="text-xs text-white/80">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* 按钮组 */}
        <motion.div variants={item} className="mt-10 flex flex-wrap gap-3 justify-center">
          <motion.div
            whileHover={{
              scale: 1.03,
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold px-6 py-2.5 rounded-lg shadow-md"
            >
              <Link href={`/${currentLocale}/javascript/typeChange`}>
                开始学习
                <motion.span
                  className="ml-1.5 icon-[mingcute--arrow-right-fill]"
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </Link>
            </Button>
          </motion.div>
          <motion.div
            whileHover={{
              scale: 1.03,
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="bg-white/8 hover:bg-white/12 text-white font-bold px-6 py-2.5 rounded-lg shadow-md"
            >
              <Link href={`/${currentLocale}/interview`}>
                模拟面试
                <motion.span
                  className="ml-1.5 icon-[material-symbols--psychology]"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </Link>
            </Button>
          </motion.div>
          <motion.div
            whileHover={{
              scale: 1.03,
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="bg-white/8 hover:bg-white/12 text-white font-bold px-6 py-2.5 rounded-lg shadow-md"
            >
              <Link href={`/${currentLocale}/podcast`}>
                AI 播客
                <motion.span
                  className="ml-1.5 icon-[material-symbols--podcasts]"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [1, 0.9, 1],
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
