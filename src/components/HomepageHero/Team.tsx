'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const teamMembers = [
  {
    name: 'John Doe',
    title: '创始人 & CEO',
    bio: '前 Opendoor 联合创始人。Spotify 和 Clearbit 早期员工。',
    imageUrl: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg',
  },
  {
    name: 'Jane Doe',
    title: '工程经理',
    bio: '曾在 Figma、Pitch 和 Protocol Labs 领导工程团队。',
    imageUrl: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
  },
  {
    name: 'Bob Smith',
    title: '产品经理',
    bio: '前 Linear、Lambda School 和 On Deck 产品经理。',
    imageUrl: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg',
  },
  {
    name: 'Peter Johnson',
    title: '前端开发',
    bio: '前 Linear、Coinbase 和 Postscript 前端开发。',
    imageUrl: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg',
  },
]

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
      <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-[#00DC82]/5 to-black/0">
        <div className="absolute inset-0 opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#00DC82]/20 via-[#4F46E5]/20 to-transparent rounded-full blur-3xl -translate-y-1/2 animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center space-y-6 mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block text-[#00DC82] font-medium bg-[#00DC82]/10 border border-[#00DC82]/20
              px-6 py-2 rounded-full text-sm backdrop-blur-sm"
          >
            团队成员
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-[#00DC82] via-[#4F46E5] to-[#00DC82]
              bg-clip-text text-transparent bg-[length:200%] animate-gradient"
          >
            遇见我们的团队
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-slate-300 max-w-2xl mx-auto text-base sm:text-lg"
          >
            我们是一个充满激情的团队，致力于为用户创造最好的产品体验
          </motion.p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              variants={item}
              className="group relative bg-black/30 backdrop-blur-lg border border-white/10 rounded-xl p-6
                hover:border-[#00DC82]/30 transition-all duration-500
                hover:shadow-[0_0_30px_rgba(0,220,130,0.2)]
                before:absolute before:inset-0 before:bg-gradient-to-br
                before:from-[#00DC82]/0 before:to-[#4F46E5]/0
                before:opacity-0 before:transition-opacity before:duration-500
                hover:before:opacity-100 before:rounded-xl"
            >
              <div className="relative">
                <div className="relative h-48 w-full mb-6 overflow-hidden rounded-lg">
                  <Image
                    src={member.imageUrl}
                    alt={member.name}
                    fill
                    priority={index === 0}
                    className="object-cover transition-all duration-700
                      group-hover:scale-110 group-hover:rotate-2"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0
                    group-hover:opacity-100 transition-opacity duration-500"
                  />
                </div>
                <motion.h3
                  className="text-xl font-bold text-white group-hover:text-[#00DC82]
                    transition-colors duration-300 relative"
                >
                  {member.name}
                  <span className="absolute -inset-x-2 -inset-y-1 scale-x-0 group-hover:scale-x-100
                    transition-transform duration-300 bg-gradient-to-r from-[#00DC82]/10 to-transparent
                    rounded-lg -z-10"
                  />
                </motion.h3>
                <p className="text-[#00DC82] mt-1 font-medium relative z-10">
                  {member.title}
                </p>
                <p className="mt-4 text-slate-400 text-sm relative z-10">
                  {member.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
