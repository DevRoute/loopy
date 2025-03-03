'use client';

import { useState, useEffect } from 'react';

interface AnimatedLogoProps {
  text: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  mode?: 'light' | 'dark';
}

export function AnimatedLogo({ text }: AnimatedLogoProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div
      className="flex items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`relative group perspective-[1000px] ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-700`}
      >
        {/* 主标题文本容器 - 3D效果 */}
        <div
          className={`
            relative z-10 px-3 py-1 rounded-lg
            transition-all duration-500 ease-out
            ${isHovered ? 'transform rotate-y-[-5deg] scale-110' : ''}
          `}
        >
          {/* 主标题文本 */}
          <span
            className="text-xl font-bold bg-gradient-to-r from-[#00DC82] to-[#4F46E5] bg-clip-text text-transparent
            transition-all duration-500 group-hover:tracking-wider relative z-10 inline-block"
          >
            {text}
          </span>

          {/* 文字阴影效果 */}
          <span className="absolute top-0.5 left-0.5 text-xl font-bold text-black/10 blur-[1px] z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            {text}
          </span>

          {/* 底部动画线条 */}
          <span
            className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#00DC82] to-[#4F46E5] 
            transition-all duration-500 group-hover:w-full"
          ></span>
        </div>

        {/* 悬停时的发光效果 */}
        <div
          className="absolute -inset-1 bg-gradient-to-r from-[#00DC82]/20 to-[#4F46E5]/20 rounded-lg blur-sm
          opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        ></div>

        {/* 装饰性元素 - 左侧小圆点 */}
        <div
          className="absolute -left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#00DC82]
          opacity-0 group-hover:opacity-100 transition-all duration-500 
          group-hover:-translate-x-1"
        ></div>

        {/* 装饰性元素 - 右侧小圆点 */}
        <div
          className="absolute -right-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#4F46E5]
          opacity-0 group-hover:opacity-100 transition-all duration-500 
          group-hover:translate-x-1"
        ></div>

        {/* 背景闪光效果 */}
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-white/10 to-transparent
          translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"
        ></div>

        {/* 装饰性粒子 - 上方 */}
        <div
          className="absolute -top-2 left-1/4 w-1 h-1 rounded-full bg-[#00DC82]
          opacity-0 group-hover:opacity-80 transition-all duration-700 delay-100
          group-hover:-translate-y-2 group-hover:scale-0"
        ></div>

        {/* 装饰性粒子 - 下方 */}
        <div
          className="absolute -bottom-2 right-1/4 w-1 h-1 rounded-full bg-[#4F46E5]
          opacity-0 group-hover:opacity-80 transition-all duration-700 delay-200
          group-hover:translate-y-2 group-hover:scale-0"
        ></div>
      </div>

      {/* 装饰性标记 */}
      <div className="ml-2 relative">
        <div
          className="w-2 h-2 bg-[#00DC82] rounded-full opacity-80 
          animate-pulse"
        ></div>
        <div
          className="absolute -top-1 -right-1 w-1 h-1 bg-[#4F46E5] rounded-full opacity-60 
          animate-ping"
        ></div>
      </div>
    </div>
  );
}
