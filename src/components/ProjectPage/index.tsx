'use client'

import { useLocale } from '@/hooks'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useEffect, useState } from 'react'



// 定义项目的类型
interface Project {
  name: string;
  description: string;
  github:string;
  image:string;
  link:string;
  status: string;
  tags: string[];
}

// 更新 ProjectCard 组件的参数类型
const ProjectCard = ({ item }: { item: Project }) => {
  // 定义一个状态来存储渐变颜色
  const [bgGradient, setBgGradient] = useState<string>('')

  // 生成随机渐变颜色的函数
  const getRandomGradient = () => {
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#F3FF33', '#FF33A1'];
    const color1 = colors[Math.floor(Math.random() * colors.length)];
    const color2 = colors[Math.floor(Math.random() * colors.length)];
    return `linear-gradient(135deg, ${color1}, ${color2})`;
  }

  // 在组件挂载时生成随机渐变颜色
  useEffect(() => {
    if (!item.image) {
      setBgGradient(getRandomGradient());
    }
  }, [item.image]);

  const statusColors: { [key: string]: string } = {
  已完成: 'bg-green-100 text-green-800',
  进行中: 'bg-blue-100 text-blue-800',
  计划中: 'bg-yellow-100 text-yellow-800',
};

  return <div className='bg-white border border-gray-300 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300 '>
    <div className='flex justify-between mb-2'>
      <h3 className="font-bold text-lg text-gray-800">{item.name}</h3>
      <div className="flex items-center">
        <Link href={item.github} target="_blank" className="flex items-center mr-1 p-1 hover:bg-[#f3f4f6] hover:rounded-2xl ">
           <span className='icon-[mingcute--github-line] text-xl '></span>
        </Link>
        <Link href={item.link} target='_blank' className="flex items-center  p-1 hover:bg-[#f3f4f6] hover:rounded-2xl ">
          <span className="icon-[solar--link-bold] text-xl"></span>
        </Link>
      </div>
    </div>
    <p>
      <span className={cn(statusColors[item.status], 'py-1 px-3 rounded-2xl')}>
        {item.status}
      </span>
    </p>
    <p className="text-gray-600 my-2">{item.description}</p>
    {item.image ? (
      <div className='w-full'>
        <Image src={item.image} layout="responsive" height={250} width={400} alt="project image" />
      </div>
    ) : (
      <div style={{ background: bgGradient }} className="w-full h-52 flex items-center justify-center">
        <h3 className="font-bold text-lg text-gray-800">{item.name}</h3>
      </div>
    )}
    <div className="flex flex-wrap gap-2 mt-2">
      {item.tags.map((tag: string, tagIndex: number) => (
        <span key={tagIndex} className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
          {tag}
        </span>
      ))}
    </div>
  </div>
}

export default function ProjectPage() {
  const { t } = useLocale()
  const projectList = t('projectList')

  return (
    <div className="flex flex-col p-5">
      <h1 className='text-3xl font-bold mb-5'>项目</h1>
      <p className='mb-5'>如果该项目对你有帮助或者对这个项目感兴趣，欢迎 Star⭐️⭐️⭐️</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 w-full">
        {projectList.map((project: Project, index: number) => (
          <ProjectCard key={project.name} item={project}/>
        ))}
      </div>
    </div>
  )
}
