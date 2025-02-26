'use client';

import { motion } from 'framer-motion';
import { BookOpen, FileEdit, Brain, Code } from 'lucide-react';

export function Service() {
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
    <div className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-[#00DC82]/5 to-black/0" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center space-y-6 mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block text-[#00DC82] font-medium bg-[#00DC82]/10 border border-[#00DC82]/20 px-6 py-2 rounded-full text-sm"
          >
            我们的服务
          </motion.span>
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-[#00DC82] to-[#4F46E5] bg-clip-text text-transparent">
            全方位求职辅导
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-base sm:text-lg">
            从简历优化到面试技巧，从基础知识到实战项目，我们提供一站式求职解决方案。
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
        >
          {[
            {
              icon: <BookOpen className="w-5 h-5" />,
              title: '面试辅导',
              desc: '模拟面试演练，针对性指导，提升面试表现',
              features: ['一对一模拟面试', '面试技巧指导', '常见问题解析', '面试反馈优化'],
            },
            {
              icon: <FileEdit className="w-5 h-5" />,
              title: '简历修改',
              desc: '专业简历优化服务，突出个人亮点',
              features: ['简历内容优化', '项目经验包装', '专业技能提炼', '求职方向定位'],
            },
            {
              icon: <Brain className="w-5 h-5" />,
              title: '八股文专项',
              desc: '系统化知识梳理，夯实理论基础',
              features: ['知识体系构建', '重点难点讲解', '面试题目解析', '实战案例分析'],
            },
            {
              icon: <Code className="w-5 h-5" />,
              title: '项目实战',
              desc: '全程项目指导，积累实战经验',
              features: ['项目架构设计', '技术选型指导', '开发过程辅导', '项目部署上线'],
            },
          ].map((service, index) => (
            <motion.div
              key={index}
              variants={item}
              className="group bg-black/30 backdrop-blur-lg border border-white/10 rounded-xl p-6
                hover:border-[#00DC82]/30 hover:bg-black/40 transition-all duration-500
                hover:shadow-[0_0_30px_rgba(0,220,130,0.1)] relative overflow-hidden flex flex-col h-full"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#00DC82]/5 to-[#4F46E5]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative flex flex-col flex-1">
                <div
                  className="h-12 w-12 flex items-center justify-center bg-gradient-to-br from-[#00DC82]/20 to-[#4F46E5]/20
                  text-[#00DC82] rounded-xl group-hover:scale-110 transition-transform duration-500"
                >
                  {service.icon}
                </div>
                <h3 className="mt-5 font-semibold text-white text-base">{service.title}</h3>
                <p className="mt-3 text-slate-400 text-sm">{service.desc}</p>
                <ul className="mt-4 space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-slate-300 text-sm">
                      <span className="icon-[mdi--check-circle] text-[#00DC82] mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-6">
                  <button
                    className="w-full py-2 px-4 bg-gradient-to-r from-[#00DC82] to-[#4F46E5] 
                      text-white rounded-lg font-medium hover:opacity-90 transition-opacity duration-300"
                  >
                    了解更多
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
