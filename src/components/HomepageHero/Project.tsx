'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface ProjectProps {
  title: string
  description: string
  image: string
  link: string
  repo: string
  stars: number
  forks: number
  tech: string[]
}

const techColors: { [key: string]: string } = {
  Webpack: 'bg-blue-500/20 text-blue-400',
  Vite: 'bg-purple-500/20 text-purple-400',
  NodeJs: 'bg-green-500/20 text-green-400',
  TypeScript: 'bg-blue-600/20 text-blue-400',
  Turborepo: 'bg-pink-500/20 text-pink-400',
  'Next.js': 'bg-black/20 text-gray-300',
  'Shadcn UI': 'bg-slate-500/20 text-slate-400',
  Zustand: 'bg-orange-500/20 text-orange-400',
  'Tailwind CSS': 'bg-cyan-500/20 text-cyan-400',
  Yjs: 'bg-yellow-500/20 text-yellow-400',
  OpenAI: 'bg-emerald-500/20 text-emerald-400',
}

export function Project() {
  const projects: ProjectProps[] = [
    {
      title: 'Create Neat',
      description: '基于 PNPM 和 Turborepo 开发的前端脚手架，旨在帮助用户快速创建各类型项目。',
      image: 'https://cdn.pixabay.com/photo/2023/01/30/07/24/losangeles-7754986_1280.jpg',
      link: 'https://github.com/xun082/create-neat',
      repo: 'xun082/create-neat',
      stars: 12,
      forks: 3,
      tech: ['Webpack', 'Vite', 'NodeJs', 'TypeScript', 'Turborepo'],
    },
    {
      title: 'Online Editor',
      description: '基于 Next.js 和 NestJS 的在线代码编辑器，使用 Monaco Editor 和 Yjs 实现实时协作编辑和同步功能。',
      image: 'https://cdn.pixabay.com/photo/2023/01/30/07/24/losangeles-7754986_1280.jpg',
      link: 'https://github.com/xun082/online-edit-web',
      repo: 'xun082/online-edit-web',
      stars: 8,
      forks: 2,
      tech: ['Next.js', 'TypeScript', 'Shadcn UI', 'Zustand', 'Tailwind CSS', 'Yjs'],
    },
    {
      title: 'Create AI Toolkit',
      description: '一个 AI 驱动的开发工具包，提供智能化功能如自动生成提交信息、代码审查、根据描述生成 React 组件等，帮助开发者提升效率和代码质量。',
      image: 'https://cdn.pixabay.com/photo/2023/01/30/07/24/losangeles-7754986_1280.jpg',
      link: 'https://github.com/xun082/create-ai-toolkit',
      repo: 'xun082/create-ai-toolkit',
      stars: 15,
      forks: 4,
      tech: ['Node.js', 'TypeScript', 'OpenAI'],
    },
  ]

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
            开源项目
          </motion.span>
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-[#00DC82] to-[#4F46E5] bg-clip-text text-transparent">
            GitHub 项目
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-base sm:text-lg">
            这些项目都是与社区的朋友们一起完成的，期待更多开发者的参与和贡献！
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={item}
              className="group bg-black/30 backdrop-blur-lg border border-white/10 rounded-xl
                overflow-hidden hover:border-[#00DC82]/30 transition-all duration-500
                hover:shadow-[0_0_30px_rgba(0,220,130,0.1)] flex flex-col"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  priority
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white group-hover:text-[#00DC82] transition-colors duration-300">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <span className="icon-[octicon--star-16] text-yellow-500" />
                      <span className="text-slate-300">{project.stars}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="icon-[octicon--repo-forked-16] text-blue-500" />
                      <span className="text-slate-300">{project.forks}</span>
                    </div>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-300 hover:text-white transition-colors"
                    >
                      <span className="icon-[mdi--github] text-xl" />
                    </a>
                  </div>
                </div>

                <p className="text-slate-300 text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className={`px-3 py-1 text-xs rounded-full font-medium ${
                        techColors[tech] || 'bg-slate-800/50 text-slate-300'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-auto text-center w-full">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3
                      relative overflow-hidden group/link
                      bg-gradient-to-r from-[#8B5CF6] to-[#6366F1]
                      before:absolute before:inset-0
                      before:bg-gradient-to-r before:from-[#9333EA] before:to-[#4F46E5]
                      before:translate-x-[-100%] before:transition-transform before:duration-500
                      before:ease-out hover:before:translate-x-0
                      text-white font-medium
                      transition-all duration-300
                      rounded-md shadow-[0_0_0_3px_rgba(139,92,246,0.1)]
                      hover:shadow-[0_0_0_3px_rgba(139,92,246,0.2)]
                      active:scale-[0.98]"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <span>查看项目</span>
                      <span className="icon-[material-symbols--arrow-right-alt-rounded] text-lg
                        transform transition-transform duration-300 group-hover/link:translate-x-1"
                      />
                    </span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
