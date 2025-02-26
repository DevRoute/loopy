'use client';

import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export function Contact() {
  const handleCopyWechat = async (wechat: string) => {
    try {
      await navigator.clipboard.writeText(wechat);
    } catch (err) {
      console.error('复制失败', err);
    }
  };

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
              icon: <MessageCircle className="w-5 h-5" />,
              title: '微信',
              desc: '添加微信，获取更多支持',
              text: 'yunmz777',
              isWechat: true,
            },
            {
              icon: (
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 28 28"
                  fill="currentColor"
                >
                  <path d="M12.5803 2.06646C8.33233 2.4956 4.71692 5.2581 3.06763 9.23901C0.0768366 16.9742 5.68201 25.0759 13.7303 25.0759H21.1557V25.0399C24.8936 24.7347 28 21.5267 28 17.6344C28 13.8782 25.1049 10.7782 21.4751 10.3109C21.0768 5.8969 17.3389 2.4956 12.7995 2.03036C12.7264 2.03036 12.6534 2.03036 12.5803 2.06646ZM12.7995 4.93427C16.0277 5.33491 18.5121 8.18386 18.5121 11.5759C18.5121 11.7169 18.5121 11.8579 18.5121 11.9989H19.7935C22.7112 11.9989 25.1226 14.4516 25.1226 17.5989C25.1226 20.7462 22.7112 23.1989 19.7935 23.1989H13.7303C7.2768 23.1989 2.7424 16.8332 5.06547 10.7782C6.41886 7.64681 9.48047 5.54301 12.7995 4.93427Z" />
                  <path d="M8.76863 14.0154C9.68394 14.0154 10.4278 14.7593 10.4278 15.6746C10.4278 16.5899 9.68394 17.3338 8.76863 17.3338C7.85332 17.3338 7.10944 16.5899 7.10944 15.6746C7.10944 14.7593 7.85332 14.0154 8.76863 14.0154Z" />
                  <path d="M15.0117 14.0154C15.927 14.0154 16.6709 14.7593 16.6709 15.6746C16.6709 16.5899 15.927 17.3338 15.0117 17.3338C14.0964 17.3338 13.3525 16.5899 13.3525 15.6746C13.3525 14.7593 14.0964 14.0154 15.0117 14.0154Z" />
                </svg>
              ),
              title: '掘金',
              desc: '关注我们的技术文章',
              link: 'https://juejin.cn/user/3782764966460398/posts',
              text: '前往掘金主页',
            },
            {
              icon: (
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              ),
              title: 'GitHub',
              desc: '查看我们的开源项目',
              link: 'https://github.com/xun082',
              text: '前往GitHub',
            },
            {
              icon: <MessageCircle className="w-5 h-5" />,
              title: '公众号',
              desc: '关注公众号获取最新资讯',
              text: '递归忘加终止条件',
              isWechat: true,
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
                <div
                  className="h-12 w-12 flex items-center justify-center bg-gradient-to-br from-[#00DC82]/20 to-[#4F46E5]/20
                  text-[#00DC82] rounded-xl group-hover:scale-110 transition-transform duration-500"
                >
                  {card.icon}
                </div>
                <h3 className="mt-5 font-semibold text-white text-xl">{card.title}</h3>
                <p className="mt-3 text-slate-400">{card.desc}</p>
                {card.isWechat ? (
                  <button
                    onClick={() => handleCopyWechat(card.text)}
                    className="mt-4 text-[#00DC82] font-medium flex items-center gap-2
                    hover:text-[#4F46E5] transition-colors duration-300"
                  >
                    {card.text}
                    <span className="icon-[mdi--content-copy] text-lg opacity-80" />
                  </button>
                ) : (
                  <a
                    className="mt-4 text-[#00DC82] font-medium hover:text-[#4F46E5] transition-colors duration-300 block"
                    href={card.link}
                    target="_blank"
                    rel="noopener noreferrer"
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
  );
}
