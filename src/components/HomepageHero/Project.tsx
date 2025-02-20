'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

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
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  }

  return (
    <div className="flex flex-col items-center">
      <div className="w-full text-center mb-12">
        <h2 className="text-3xl font-bold text-[#00DC82] mb-4">GitHub 项目</h2>
        <p className="text-slate-400 max-w-3xl mx-auto">
          这些项目都是与社区的朋友们一起完成的，期待更多开发者的参与和贡献！
        </p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 w-full"
      >
        {projects.map((project, index) => (
          <motion.div
            key={index}
            variants={item}
            whileHover={{ y: -5 }}
            className="group flex flex-col overflow-hidden rounded-2xl bg-[#0D1117] border border-slate-800 transition-shadow duration-300 hover:shadow-lg hover:shadow-violet-500/20"
          >
            <div className="relative h-40">
              <Image
                src={project.image}
                alt={project.title}
                fill
                priority
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <div className="relative p-5 flex-1 bg-[#0D1117]">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-white">{project.title}</h3>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <span className="icon-[octicon--star-16] text-yellow-500" />
                    <span className="text-slate-400">{project.stars}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="icon-[octicon--repo-forked-16] text-blue-500" />
                    <span className="text-slate-400">{project.forks}</span>
                  </div>
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white">
                    <span className="icon-[mdi--github] text-xl" />
                  </a>
                </div>
              </div>

              <p className="text-slate-400 text-sm mb-3 line-clamp-2">{project.description}</p>

              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((tech, i) => (
                  <span
                    key={i}
                    className={`px-2 py-0.5 text-xs rounded-full ${
                      techColors[tech] || 'bg-slate-800/50 text-slate-300'
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-gradient-to-r from-violet-600 to-blue-500
              hover:from-violet-700 hover:to-blue-600
              text-white text-sm font-medium py-3 text-center
              transition-all duration-300 group cursor-pointer"
            >
              <motion.div
                className="flex items-center justify-center gap-2"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <span>查看项目</span>
                <span className="icon-[material-symbols--arrow-right-alt-rounded] text-lg" />
              </motion.div>
            </a>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
