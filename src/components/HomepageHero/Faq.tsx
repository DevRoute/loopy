'use client';

import { motion } from 'framer-motion';
import { BadgeDollarSign, Route, ShieldCheck, Truck, Undo2, UserRoundCheck } from 'lucide-react';
import Link from 'next/link';

const faq = [
  {
    icon: Undo2,
    question: '这个网站是做什么的？',
    answer:
      '本网站专注于为前端开发者提供全面的面试准备资料，包括技术知识点、常见面试题、实战项目经验分享以及职业建议，帮助你在前端求职中脱颖而出。',
  },
  {
    icon: Route,
    question: '谁可以使用这个网站？',
    answer:
      '无论你是前端初学者、正在准备面试的求职者，还是想提升技能的在职开发者，这个网站都适合你。',
  },
  {
    icon: Truck,
    question: '使用这个网站需要付费吗？',
    answer:
      '网站的基础内容完全免费，我们也提供部分高级功能或独家资源（如模拟面试服务、高级课程），可以通过订阅解锁。',
  },
  {
    icon: BadgeDollarSign,
    question: '网站的内容包括哪些方面？',
    answer:
      '我们涵盖HTML、CSS、JavaScript、React/Vue等前端核心技术，算法与数据结构，系统设计问题，以及软技能（如沟通技巧、自我介绍）。还有真实面试经验分享和企业常见考题。',
  },
  {
    icon: ShieldCheck,
    question: '内容会定期更新吗？',
    answer:
      '是的，我们会根据前端技术趋势和用户反馈定期更新内容，确保你获取的信息是最新的，比如新增热门框架或工具的相关资料。',
  },
  {
    icon: UserRoundCheck,
    question: '如果我有疑问，能提问吗？',
    answer:
      '可以！我们有讨论区，你可以发帖提问，社区成员或专家会尽力解答。订阅用户还能享受一对一答疑服务。',
  },
];

export function Faq({ lang }: { lang: string }) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        duration: 0.5,
        bounce: 0.3,
      },
    },
  };

  return (
    <div className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-[#00DC82]/5 to-black/0">
        <div className="absolute inset-0 opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#00DC82]/20 via-[#4F46E5]/20 to-transparent rounded-full blur-3xl -translate-y-1/2 animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center space-y-6 mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block text-[#00DC82] font-medium bg-[#00DC82]/10 border border-[#00DC82]/20 px-6 py-2 rounded-full text-sm"
          >
            常见问题
          </motion.span>
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-[#00DC82] to-[#4F46E5] bg-clip-text text-transparent">
            FAQ
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-base sm:text-lg">
            这里列出了一些常见问题的解答，如果没有找到你想要的答案，欢迎联系我们
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
        >
          {faq.map(({ question, answer, icon: Icon }, index) => (
            <motion.div
              key={index}
              variants={item}
              className="group bg-black/30 backdrop-blur-lg border border-white/10 rounded-xl p-6
                hover:border-[#00DC82]/30 transition-all duration-500
                hover:shadow-[0_0_30px_rgba(0,220,130,0.1)]"
            >
              <div className="flex items-center gap-4">
                <div
                  className="h-12 w-12 flex items-center justify-center rounded-xl
                  bg-gradient-to-br from-[#00DC82]/20 to-[#4F46E5]/20 text-[#00DC82]
                  group-hover:scale-110 transition-transform duration-500"
                >
                  <Icon className="h-6 w-6" />
                </div>
                <h3
                  className="text-xl font-bold text-white group-hover:text-[#00DC82]
                  transition-colors duration-300"
                >
                  {question}
                </h3>
              </div>
              <p className="mt-4 text-slate-400 pl-16">{answer}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="flex justify-center mt-12"
        >
          <Link href={`/${lang}/questions`}>
            <button
              className="group flex items-center gap-2 px-8 py-3 rounded-full
              bg-gradient-to-r from-[#00DC82] to-[#4F46E5]/80
              text-white font-medium transition-all duration-300
              hover:shadow-[0_0_30px_rgba(0,220,130,0.3)] transform hover:scale-105"
            >
              <span>{lang === 'zh' ? '查看更多问题' : 'View More Questions'}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
