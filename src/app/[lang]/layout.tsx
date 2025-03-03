import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { LastUpdated, Layout, Navbar } from 'nextra-theme-docs';
import { Head, Search } from 'nextra/components';
import { getPageMap } from 'nextra/page-map';

import { getDirection } from '../_dictionaries/get-dictionary';
import { ThemeProvider } from './_components/ThemeProvider';
import { AnalyticsProvider } from './_components/AnalyticsProvider';

import ThemeToggle from '@/widgets/theme-toggle';
import LocaleToggle from '@/widgets/locale-toggle';
import { useServerLocale } from '@/hooks';
import { CustomFooter } from '@/components/CustomFooter';
import type { I18nLangAsyncProps, I18nLangKeys } from '@/i18n';
import { AnimatedLogo } from '@/components/AnimatedLogo';
import './styles/index.css';

// 网站基本信息配置
const siteConfig = {
  title: '面试导航',
  description:
    '前后端开发面试宝典 - 包含JavaScript、TypeScript、React、Node.js、前端工程化、计算机网络、浏览器原理等技术知识点整理',
  url: 'https://www.codecrack.cn/', // 更新为您的实际网站URL
  author: 'Moment',
  locale: {
    en: {
      title: 'Interview Navigator',
      description:
        'Frontend & Backend Interview Guide - Comprehensive knowledge base covering JavaScript, TypeScript, React, Node.js, Frontend Engineering, Computer Networks, Browser Internals and more',
      keywords:
        'frontend interview, backend interview, javascript interview questions, typescript, react, node.js, web development, coding interview, technical interview, frontend engineering, computer networks, browser internals',
    },
    zh: {
      title: '面试导航',
      description:
        '前后端开发面试宝典 - 包含JavaScript、TypeScript、React、Node.js、前端工程化、计算机网络、浏览器原理等技术知识点整理与面试题解析',
      keywords:
        '前端面试, 后端面试, JavaScript面试题, TypeScript, React, Node.js, 前端工程化, 计算机网络, 浏览器原理, 技术面试, 八股文, 前端开发, 后端开发, 编程面试',
    },
  },
  ogImage: '/img/og-image.png', // 确保这个图片存在，建议使用与面试主题相关的图片
  favicon: '/img/favicon.svg',
  topics: [
    'JavaScript',
    'TypeScript',
    'React',
    'Node.js',
    '前端工程化',
    '计算机网络',
    '浏览器原理',
    '面试题',
  ],
};

// 动态生成元数据
export async function generateMetadata({
  params,
}: {
  params: { lang: I18nLangKeys };
}): Promise<Metadata> {
  const lang = params.lang;
  const localizedData = siteConfig.locale[lang] || siteConfig.locale.en;

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: localizedData.title,
      template: `%s | ${localizedData.title}`,
    },
    description: localizedData.description,
    keywords: localizedData.keywords,
    authors: [{ name: siteConfig.author }],
    creator: siteConfig.author,
    publisher: siteConfig.author,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: lang,
      url: siteConfig.url,
      title: localizedData.title,
      description: localizedData.description,
      siteName: localizedData.title,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: localizedData.title,
        },
      ],
    },
    alternates: {
      canonical: `${siteConfig.url}/${lang}`,
      languages: {
        en: `${siteConfig.url}/en`,
        zh: `${siteConfig.url}/zh`,
      },
    },
    icons: {
      icon: siteConfig.favicon,
      shortcut: siteConfig.favicon,
      apple: siteConfig.favicon,
    },
    verification: {
      google: 'google042c2269edd8781b.html',
    },
  };
}

const CustomNavbar = async ({ lang }: I18nLangAsyncProps) => {
  const { t } = await useServerLocale(lang);

  return (
    <Navbar
      logo={<AnimatedLogo text={t('systemTitle')} mode="dark" />}
      logoLink={`/${lang}`}
      projectLink={'https://github.com/xun082'}
    >
      <>
        <LocaleToggle className="max-md:hidden" />
        <ThemeToggle className="max-md:hidden" lang={lang} />
      </>
    </Navbar>
  );
};

interface Props {
  children: ReactNode;
  params: Promise<{ lang: I18nLangKeys }>;
}

export default async function RootLayout({ children, params }: Props) {
  const { lang } = await params;
  const pageMap = await getPageMap(lang);
  const { t } = await useServerLocale(lang);
  const localizedData = siteConfig.locale[lang] || siteConfig.locale.en;

  return (
    <html lang={lang} dir={getDirection(lang)} suppressHydrationWarning>
      <Head>
        {/* 添加结构化数据 - 技术面试网站 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: localizedData.title,
              description: localizedData.description,
              url: `${siteConfig.url}/${lang}`,
              potentialAction: {
                '@type': 'SearchAction',
                target: `${siteConfig.url}/${lang}/search?q={search_term_string}`,
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
        {/* 添加技术知识库结构化数据 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'EducationalOrganization',
              name: localizedData.title,
              description: localizedData.description,
              url: `${siteConfig.url}/${lang}`,
              sameAs: ['https://github.com/xun082'],
              knowsAbout: siteConfig.topics,
            }),
          }}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Language" content={lang} />
        <meta name="apple-mobile-web-app-title" content={localizedData.title} />
        <meta name="theme-color" content="#ffffff" />
        <meta name="application-name" content={localizedData.title} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="format-detection" content="telephone=no" />
      </Head>
      <body suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          storageKey="starter-theme-provider"
          disableTransitionOnChange
        >
          <AnalyticsProvider>
            <Layout
              navbar={<CustomNavbar lang={lang} />}
              lastUpdated={<LastUpdated>{t('lastUpdated')}</LastUpdated>}
              editLink={null}
              docsRepositoryBase={'https://github.com/xun082'}
              footer={
                <main className="bg-background py-5!">
                  <CustomFooter lang={lang} />
                </main>
              }
              search={<Search />}
              i18n={[
                { locale: 'en', name: 'English' },
                { locale: 'zh', name: '简体中文' },
              ]}
              pageMap={pageMap}
              feedback={{ content: '' }}
            >
              {children}
            </Layout>
          </AnalyticsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
