'use client'

import { motion } from 'framer-motion'
import { MailIcon, MapPinIcon, MessageCircle, PhoneIcon } from 'lucide-react'

export function Contact() {
  const handleCopyWechat = async (wechat: string) => {
    try {
      await navigator.clipboard.writeText(wechat)
    }
    catch (err) {
      console.error('复制失败', err)
    }
  }

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
    <div className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-[#00DC82]/5 to-black/0" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center space-y-6 mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block text-[#00DC82] font-medium bg-[#00DC82]/10 border border-[#00DC82]/20 px-6 py-2 rounded-full text-sm"
          >
            联系我们
          </motion.span>
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-[#00DC82] to-[#4F46E5] bg-clip-text text-transparent">
            随时与我们联系
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-base sm:text-lg">
            如果您有任何问题或建议，我们很乐意与您交流。
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
              icon: <MailIcon className="w-5 h-5" />,
              title: '电子邮件',
              desc: '我们的团队随时为您服务',
              link: 'mailto:contact@example.com',
              text: 'contact@example.com',
            },
            {
              icon: <MessageCircle className="w-5 h-5" />,
              title: '微信咨询',
              desc: '添加微信，获取更多支持',
              text: 'yunmz777',
              isWechat: true,
            },
            {
              icon: <MapPinIcon className="w-5 h-5" />,
              title: '办公地址',
              desc: '欢迎来访我们的办公室',
              link: 'https://map.google.com',
              text: '深圳市南山区科技园',
            },
            {
              icon: <PhoneIcon className="w-5 h-5" />,
              title: '联系电话',
              desc: '周一至周五 9:00-18:00',
              link: 'tel:+86123456789',
              text: '+86 123-4567-89',
            },
          ].map((card, index) => (
            <motion.div
              key={index}
              variants={item}
              className="group bg-black/30 backdrop-blur-lg border border-white/10 rounded-xl p-6
                hover:border-[#00DC82]/30 hover:bg-black/40 transition-all duration-500
                hover:shadow-[0_0_30px_rgba(0,220,130,0.1)] relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#00DC82]/5 to-[#4F46E5]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="h-12 w-12 flex items-center justify-center bg-gradient-to-br from-[#00DC82]/20 to-[#4F46E5]/20
                  text-[#00DC82] rounded-xl group-hover:scale-110 transition-transform duration-500"
                >
                  {card.icon}
                </div>
                <h3 className="mt-5 font-semibold text-white text-xl">
                  {card.title}
                </h3>
                <p className="mt-3 text-slate-400">
                  {card.desc}
                </p>
                {card.isWechat
                  ? (
                      <button
                        onClick={() => handleCopyWechat(card.text)}
                        className="mt-4 text-[#00DC82] font-medium flex items-center gap-2
                      hover:text-[#4F46E5] transition-colors duration-300"
                      >
                        {card.text}
                        <span className="icon-[mdi--content-copy] text-lg opacity-80" />
                      </button>
                    )
                  : (
                      <a
                        className="mt-4 text-[#00DC82] font-medium hover:text-[#4F46E5] transition-colors duration-300 block"
                        href={card.link}
                        target={card.link?.startsWith('http') ? '_blank' : undefined}
                        rel={card.link?.startsWith('http') ? 'noopener noreferrer' : undefined}
                      >
                        {card.text}
                      </a>
                    )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
