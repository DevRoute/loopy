'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function DevelopPage({ lang, title }: { lang: string; title: string }) {
  const [progress, setProgress] = useState(0);

  // 模拟进度条加载 - 修复进度回退问题
  useEffect(() => {
    let currentProgress = 0;

    const interval = setInterval(() => {
      // 确保新进度始终大于当前进度
      const increment = 2 + Math.random() * 5; // 使用较小的增量，确保平滑增长
      currentProgress += increment;

      if (currentProgress >= 90) {
        clearInterval(interval);
        setProgress(90);
      } else {
        setProgress(currentProgress);
      }
    }, 600); // 稍微延长间隔，使动画更平滑

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-8 md:p-6 relative bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <svg
            className="absolute top-0 left-0 w-full h-full opacity-5 dark:opacity-10"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>
        {/* 优化背景光晕效果 - 移动端调整大小 */}
        <div className="absolute top-10 right-10 w-40 h-40 md:w-72 md:h-72 bg-[#00DC82]/10 dark:bg-[#00DC82]/20 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-10 left-10 w-40 h-40 md:w-72 md:h-72 bg-[#4F46E5]/10 dark:bg-[#4F46E5]/20 rounded-full filter blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 md:w-96 md:h-96 bg-[#FF6B6B]/5 dark:bg-[#FF6B6B]/10 rounded-full filter blur-3xl animate-pulse-slow" />
      </div>

      <div className="max-w-4xl w-full z-10 flex flex-col items-center">
        {/* 主要内容 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 md:mb-12 w-full"
        >
          <div className="flex items-center justify-center mb-6 md:mb-8">
            <div className="relative w-12 h-12 md:w-16 md:h-16 mr-3 md:mr-4">
              <svg className="w-full h-full animate-spin-slow" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="url(#gradient)"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray="251.2"
                  strokeDashoffset="100"
                  className="animate-dash"
                >
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00DC82" />
                      <stop offset="100%" stopColor="#4F46E5" />
                    </linearGradient>
                  </defs>
                </circle>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  className="w-6 h-6 md:w-8 md:h-8 text-[#00DC82]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              </div>
            </div>
            <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-[#00DC82] to-[#4F46E5] bg-clip-text text-transparent">
              {title}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white mb-6 md:mb-8 drop-shadow-lg">
            {lang === 'zh' ? '内容建设中' : 'Under Construction'}
          </h1>

          <div className="max-w-md mx-auto mb-8 md:mb-10 bg-gray-100/80 dark:bg-black/20 backdrop-blur-sm p-3 md:p-4 rounded-lg border border-gray-200 dark:border-white/10 shadow-md dark:shadow-none">
            <div className="h-2 w-full bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#00DC82] to-[#4F46E5]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <div className="flex justify-between mt-2">
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                {lang === 'zh' ? '开发进度' : 'Progress'}
              </p>
              <p className="text-xs md:text-sm text-[#00DC82]">{Math.floor(progress)}%</p>
            </div>
          </div>

          <p className="text-sm md:text-base lg:text-lg text-gray-600 dark:text-slate-300 max-w-2xl mx-auto mb-8 md:mb-12 leading-relaxed px-2">
            {lang === 'zh'
              ? '我们正在精心打造这部分内容，以确保为您提供最优质的学习资源。感谢您的耐心等待！'
              : 'We are carefully crafting this content to ensure we provide you with the highest quality learning resources. Thank you for your patience!'}
          </p>

          {/* 代码块装饰 - 增强视觉效果 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-full md:max-w-lg mx-auto mb-8 md:mb-12 bg-gray-50 dark:bg-black/50 backdrop-blur-sm rounded-lg border border-gray-200 dark:border-white/10 overflow-hidden shadow-lg dark:shadow-[0_0_15px_rgba(0,0,0,0.3)]"
          >
            <div className="flex items-center px-3 md:px-4 py-2 bg-gray-100 dark:bg-black/30 border-b border-gray-200 dark:border-white/10">
              <div className="flex space-x-1.5 md:space-x-2">
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500"></div>
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-500"></div>
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="ml-3 md:ml-4 text-xs text-gray-500 dark:text-gray-400">
                development.js
              </div>
            </div>
            <div className="p-3 md:p-5 text-left font-mono text-xs md:text-sm overflow-x-auto">
              <div className="text-gray-500">
                // {lang === 'zh' ? '正在加载内容' : 'Loading content'}
              </div>
              <div className="text-emerald-600 dark:text-[#00DC82] my-1">
                const <span className="text-blue-600 dark:text-[#4F46E5]">developmentStatus</span> ={' '}
                <span className="text-amber-600 dark:text-orange-400">'in-progress'</span>;
              </div>
              <div className="text-gray-800 dark:text-white my-1">
                async function{' '}
                <span className="text-amber-600 dark:text-yellow-400">loadContent</span>() {'{'}
              </div>
              <div className="pl-4 text-gray-800 dark:text-white my-1">try {'{'}</div>
              <div className="pl-8 text-gray-800 dark:text-white my-1">
                await new Promise(resolve =&gt; setTimeout(resolve, 1000));
              </div>
              <div className="pl-8 text-gray-800 dark:text-white my-1">
                return <span className="text-amber-600 dark:text-orange-400">'Coming Soon...'</span>
                ;
              </div>
              <div className="pl-4 text-gray-800 dark:text-white my-1">
                {'}'} catch (error) {'{'}
              </div>
              <div className="pl-8 text-red-500 dark:text-red-400 my-1">console.error(error);</div>
              <div className="pl-4 text-gray-800 dark:text-white my-1">{'}'}</div>
              <div className="text-gray-800 dark:text-white my-1">{'}'}</div>
            </div>
          </motion.div>
        </motion.div>

        {/* 返回按钮 - 增强视觉效果 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link href={`/${lang}`}>
            <button
              className="group flex items-center gap-2 md:gap-3 px-6 md:px-8 py-2.5 md:py-3 rounded-full
               backdrop-blur-sm border
               text-white font-medium transition-all duration-300
              bg-gradient-to-r from-[#00DC82]/90 to-[#4F46E5]/90
              hover:shadow-lg active:scale-95 transform
               "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 md:h-5 md:w-5 transform group-hover:-translate-x-1 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 17l-5-5m0 0l5-5m-5 5h12"
                />
              </svg>
              <span className="text-sm md:text-base">
                {lang === 'zh' ? '返回首页' : 'Back to Home'}
              </span>
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
