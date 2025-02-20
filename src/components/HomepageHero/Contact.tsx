'use client'

import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { useState } from 'react'

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [emailError, setEmailError] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))

    if (name === 'email') {
      setEmailError(!value.match(/^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/))
    }
  }

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
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="relative w-full overflow-hidden">
      {/* 背景层 */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-purple-900 to-slate-900" />

      <motion.div
        className="relative container mx-auto px-4 py-12"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* 标题 */}
        <motion.div variants={item} className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#00DC82]">联系我们</h2>
          <p className="mt-4 text-slate-300 max-w-2xl mx-auto">
            如果您有任何问题或建议，请随时与我们联系。我们很乐意与您交流并探讨合作机会。
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* 表单部分 */}
          <motion.div variants={item} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">您的姓名：</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10
                focus:border-[#00DC82] focus:ring-1 focus:ring-[#00DC82]
                text-white placeholder-white/30"
                placeholder="请输入您的姓名"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">您的邮箱：</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10
                focus:border-[#00DC82] focus:ring-1 focus:ring-[#00DC82]
                text-white placeholder-white/30"
                placeholder="请输入您的邮箱"
              />
              {emailError && formData.email && (
                <p className="mt-2 text-sm text-red-400">请输入有效的邮箱地址！</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">留言内容：</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10
                focus:border-[#00DC82] focus:ring-1 focus:ring-[#00DC82]
                text-white placeholder-white/30 min-h-[150px] resize-none"
                placeholder="请输入您的留言"
              />
            </div>

            <Button
              size="lg"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500
              hover:from-blue-600 hover:to-purple-600 text-white font-bold"
            >
              发送消息
              <motion.span
                className="ml-2 icon-[material-symbols--send]"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </Button>
          </motion.div>

          {/* 联系信息部分 */}
          <motion.div variants={item} className="space-y-8">
            <div className="flex items-center justify-between p-6 rounded-xl bg-black/20 backdrop-blur-sm border border-white/10 hover:border-[#00DC82]/50 transition-colors duration-300">
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#00DC82]/10">
                  <span className="icon-[ri--wechat-fill] text-2xl text-[#00DC82]" />
                </div>
                <span className="text-white">微信号：yunmz777</span>
              </div>
              <button
                onClick={() => handleCopyWechat('yunmz777')}
                className="p-2 rounded-full hover:bg-[#00DC82]/10 transition-colors duration-300"
              >
                <span className="icon-[mdi--content-copy] text-[#00DC82] text-xl" />
              </button>
            </div>

            <div className="flex items-center justify-between p-6 rounded-xl bg-black/20 backdrop-blur-sm border border-white/10 hover:border-[#00DC82]/50 transition-colors duration-300">
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#00DC82]/10">
                  <span className="icon-[ri--wechat-fill] text-2xl text-[#00DC82]" />
                </div>
                <span className="text-white">微信号：yunmz777</span>
              </div>
              <button
                onClick={() => handleCopyWechat('luojinan1010')}
                className="p-2 rounded-full hover:bg-[#00DC82]/10 transition-colors duration-300"
              >
                <span className="icon-[mdi--content-copy] text-[#00DC82] text-xl" />
              </button>
            </div>

            {/* 社交链接 */}
            <div className="flex flex-wrap gap-4">
              {[
                { icon: 'icon-[mdi--github]', href: 'https://github.com', label: 'GitHub' },
                { icon: 'icon-[simple-icons--juejin]', href: 'https://juejin.cn', label: '掘金' },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  className="flex items-center justify-center w-12 h-12 rounded-full
                  bg-black/20 hover:bg-[#00DC82]/10
                  backdrop-blur-sm border border-white/10 hover:border-[#00DC82]/50
                  transition-all duration-300 group"
                  title={social.label}
                >
                  <span className={`${social.icon} text-xl text-[#00DC82] group-hover:scale-110 transition-transform duration-300`} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
