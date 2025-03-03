'use client';

import { motion } from 'framer-motion';
import { FileEdit, Lightbulb, MessageCircle, RefreshCw, Users, Zap } from 'lucide-react';
import Link from 'next/link';

const faq = [
  {
    icon: Lightbulb,
    question: '这个网站能为我提供什么帮助？',
    answer:
      '本网站为前后端开发者提供全面的面试准备资源，包括最新技术知识点、精选面试题库、真实项目案例分析和专业职业规划建议，帮助你在竞争激烈的技术求职市场中脱颖而出。',
  },
  {
    icon: Users,
    question: '哪些人适合使用这个平台？',
    answer:
      '无论你是刚入门的前端新手、正在积极求职的开发者，还是希望提升技术深度的资深工程师，我们的内容都能满足你在不同阶段的学习和职业发展需求。',
  },
  {
    icon: Zap,
    question: '网站的收费模式是怎样的？',
    answer:
      '我们秉持知识共享理念，核心的八股文内容完全免费。同时提供高级功能如AI模拟面试、实战项目课程和专家一对一指导等增值服务，可通过会员订阅解锁。',
  },
  {
    icon: FileEdit,
    question: '如何参与内容贡献或建立合作？',
    answer:
      '我们欢迎优秀的开发者参与内容贡献！你可以通过页面底部的联系方式找到我们，或直接点击"联系我们"按钮发送合作提案。我们的团队会在24小时内回复，优质贡献者有机会加入我们的专家团队，共同打造更好的学习平台。',
  },
  {
    icon: RefreshCw,
    question: '网站内容多久更新一次？',
    answer:
      '我们的技术团队每周定期更新内容，紧跟前沿技术趋势和面试热点。重大技术变革或框架更新后，我们会第一时间提供专题解析，确保用户获取最新、最实用的知识。',
  },
  {
    icon: MessageCircle,
    question: '遇到技术问题如何获得帮助？',
    answer:
      '你可以通过页面上的"联系我们"按钮或页面底部的联系方式直接与我们沟通。我们的社区论坛也欢迎你发布问题，活跃的开发者和技术专家会提供解答。会员用户还可享受优先回复和定期的在线技术答疑活动，帮助你快速突破技术瓶颈。',
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
              bg-gradient-to-r from-[#00DC82] to-[#4F46E5]
              text-white font-medium transition-all duration-300
              hover:shadow-[0_0_30px_rgba(0,220,130,0.3)] transform hover:scale-105"
            >
              <span>查看更多问题</span>
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
