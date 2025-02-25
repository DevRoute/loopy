'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export function Team() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

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
  }

  return (
    <div className="py-24 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-[#00DC82]/10 to-[#4F46E5]/10" />
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-br from-[#00DC82]/20 via-[#4F46E5]/20 to-transparent rounded-full blur-3xl -translate-y-1/2 animate-pulse" />
        <div className="absolute bottom-0 right-0 left-0 h-[300px] bg-gradient-to-tr from-[#4F46E5]/20 via-[#00DC82]/20 to-transparent rounded-full blur-3xl translate-y-1/2 animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center space-y-6 mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block text-[#00DC82] font-medium bg-[#00DC82]/10 border border-[#00DC82]/20
              px-6 py-2 rounded-full text-sm backdrop-blur-sm"
          >
            支持我们
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-[#00DC82] via-[#4F46E5] to-[#00DC82]
              bg-clip-text text-transparent bg-[length:200%] animate-gradient"
          >
            您的支持是我们前进的动力
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-slate-300 max-w-2xl mx-auto text-base sm:text-lg"
          >
            我们是一个社区驱动的项目，服务器和开发成本全部由团队成员自费承担。
            如果您喜欢我们的项目，可以考虑捐赠支持我们继续前进！
          </motion.p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col sm:flex-row justify-center items-center gap-8 max-w-3xl mx-auto"
        >
          <motion.div
            variants={item}
            className="group relative bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-lg
              border border-white/10 rounded-2xl p-8
              hover:border-[#00DC82]/50 transition-all duration-500
              hover:shadow-[0_0_30px_rgba(0,220,130,0.3)]
              before:absolute before:inset-0 before:bg-gradient-to-br
              before:from-[#00DC82]/10 before:to-[#4F46E5]/10
              before:opacity-0 before:transition-opacity before:duration-500
              hover:before:opacity-100 before:rounded-2xl
              w-full sm:w-72"
          >
            <div className="relative">
              <h3 className="text-2xl font-bold text-white group-hover:text-[#00DC82] transition-colors duration-300 mb-6">
                支付宝
              </h3>
              <div className="relative h-56 w-full mb-6 overflow-hidden rounded-xl bg-white p-3
                shadow-[0_0_15px_rgba(0,0,0,0.2)] group-hover:shadow-[0_0_20px_rgba(0,220,130,0.3)] transition-all duration-500"
              >
                <Image
                  src="/img/zfb.jpg"
                  alt="支付宝捐赠"
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-slate-300 text-sm group-hover:text-white transition-colors duration-300">
                使用支付宝扫描二维码进行捐赠
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={item}
            className="group relative bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-lg
              border border-white/10 rounded-2xl p-8
              hover:border-[#00DC82]/50 transition-all duration-500
              hover:shadow-[0_0_30px_rgba(0,220,130,0.3)]
              before:absolute before:inset-0 before:bg-gradient-to-br
              before:from-[#00DC82]/10 before:to-[#4F46E5]/10
              before:opacity-0 before:transition-opacity before:duration-500
              hover:before:opacity-100 before:rounded-2xl
              w-full sm:w-72"
          >
            <div className="relative">
              <h3 className="text-2xl font-bold text-white group-hover:text-[#00DC82] transition-colors duration-300 mb-6">
                微信支付
              </h3>
              <div className="relative h-56 w-full mb-6 overflow-hidden rounded-xl bg-white p-3
                shadow-[0_0_15px_rgba(0,0,0,0.2)] group-hover:shadow-[0_0_20px_rgba(0,220,130,0.3)] transition-all duration-500"
              >
                <Image
                  src="/img/wx.jpg"
                  alt="微信捐赠"
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-slate-300 text-sm group-hover:text-white transition-colors duration-300">
                使用微信扫描二维码进行捐赠
              </p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 max-w-2xl mx-auto text-center"
        >
          <h3 className="text-xl font-semibold text-white mb-4">联系我们</h3>
          <p className="text-slate-300 mb-6">
            感谢您的支持！每一笔捐赠都将用于服务器维护和项目开发。
            如有任何问题，请通过以下方式联系我们：
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#00DC82]/10 to-[#4F46E5]/10
              border border-white/10 hover:border-[#00DC82]/30 transition-all duration-300
              text-white hover:text-[#00DC82] group cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00DC82] group-hover:text-[#00DC82]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span>微信号：yunmz777</span>
            </div>

            <a
              href="mailto:2042204285@qq.com"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#00DC82]/10 to-[#4F46E5]/10
                border border-white/10 hover:border-[#00DC82]/30 transition-all duration-300
                text-white hover:text-[#00DC82] group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00DC82] group-hover:text-[#00DC82]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>2042204285@qq.com</span>
            </a>
          </div>

          <p className="text-slate-400 text-sm">
            我们会尽快回复您的咨询，感谢您对我们项目的关注与支持！
          </p>
        </motion.div>
      </div>
    </div>
  )
}
