'use client';

import { motion } from 'framer-motion';
import { BadgeDollarSign, Route, ShieldCheck, Truck, Undo2, UserRoundCheck } from 'lucide-react';

const faq = [
  {
    icon: Undo2,
    question: '如何开始使用？',
    answer:
      '只需要简单几步即可开始：克隆项目仓库，安装依赖，然后按照文档说明进行配置即可。我们提供详细的入门指南。',
  },
  {
    icon: Route,
    question: '支持哪些功能？',
    answer:
      '我们提供丰富的功能支持，包括但不限于：自动部署、代码生成、性能优化、TypeScript支持等。持续添加新特性。',
  },
  {
    icon: Truck,
    question: '如何获取更新？',
    answer:
      '项目使用语义化版本控制，你可以通过 npm 或 yarn 更新到最新版本。我们会定期发布更新日志说明新特性。',
  },
  {
    icon: BadgeDollarSign,
    question: '是否免费使用？',
    answer:
      '是的，项目采用 MIT 协议开源，你可以免费使用。如果项目对你有帮助，欢迎给我们一个 star 以示支持。',
  },
  {
    icon: ShieldCheck,
    question: '遇到问题怎么办？',
    answer:
      '你可以查看我们的文档，或在 GitHub Issues 上提问。我们的团队和社区会积极帮助解决你遇到的问题。',
  },
  {
    icon: UserRoundCheck,
    question: '如何参与贡献？',
    answer: '我们欢迎各种形式的贡献，包括提交 PR、报告 Bug、改进文档等。请查看贡献指南了解详情。',
  },
];

export function Faq() {
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
      </div>
    </div>
  );
}
