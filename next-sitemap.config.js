/** @type {import('next-sitemap').IConfig} */
export default {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com', // 你的网站域名
  generateRobotsTxt: true, // 同时生成 robots.txt
  sitemapSize: 7000, // 站点地图分片大小
  generateIndexSitemap: false, // 禁用索引文件 sitemap-0.xml <a target="_blank" href="https://chodocs.cn/nextjs/sitemap/" class="hitref" data-title="给你的Next.js 项目优雅地添加sitemap - ChoDocs" data-snippet='关于next.js 生成sitemap 有一个比较好用的库，名字叫做 next-sitemap ... 通过 additionalPaths 这个配置项，我们可以在 next-sitemap 生成 sitemap ...' data-url="https://chodocs.cn/nextjs/sitemap/">1</a>
  exclude: [''], // 排除无需收录的路径

  // additionalPaths: async (config) => [
  //   // 手动添加其他路径（如非 Next.js 生成的页面）<a target="_blank" href="https://chodocs.cn/nextjs/sitemap/" class="hitref" data-title="给你的Next.js 项目优雅地添加sitemap - ChoDocs" data-snippet='关于next.js 生成sitemap 有一个比较好用的库，名字叫做 next-sitemap ... 通过 additionalPaths 这个配置项，我们可以在 next-sitemap 生成 sitemap ...' data-url="https://chodocs.cn/nextjs/sitemap/">1</a>
  //   { loc: "/custom-page", priority: 0.7 },
  // ],
  // changefreq: 'daily', // 默认更新频率
  // priority: 0.7, // 默认优先级
  // robotsTxtOptions: {
  //   policies: [
  //     { userAgent: '*', allow: '/' }, // 允许所有爬虫访问所有页面
  //     { userAgent: 'BadBot', disallow: '/' }, // 禁止特定爬虫
  //   ],
  // },
}
