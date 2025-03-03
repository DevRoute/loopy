import type { Metadata } from 'next';
import type { ReactNode } from 'react';
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
import './styles/index.css';

export const metadata = {
  metadataBase: new URL('https://nextjs-nextra-starter-green.vercel.app'),
  icons: '/img/favicon.svg',
} satisfies Metadata;

const repo = 'https://github.com/pdsuwwz/nextjs-nextra-starter';

const CustomNavbar = async ({ lang }: I18nLangAsyncProps) => {
  const { t } = await useServerLocale(lang);

  return (
    <Navbar logo={<span>{t('systemTitle')}</span>} logoLink={`/${lang}`} projectLink={repo}>
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

  const title = 'My Nextra Starter';
  const description = 'A Starter template with Next.js, Nextra';

  const { t } = await useServerLocale(lang);

  return (
    <html
      // Not required, but good for SEO
      lang={lang}
      // Required to be set
      // dir="ltr"
      // Suggested by `next-themes` package https://github.com/pacocoursey/next-themes#with-app
      dir={getDirection(lang)}
      suppressHydrationWarning
    >
      <Head>
        {/* <title>{asPath !== '/' ? `${normalizePagesResult.title} - ${title}` : title}</title> */}
        <meta property="og:title" content={title} />
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
        <link rel="canonical" href={repo} />
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
              docsRepositoryBase="https://github.com/pdsuwwz/nextjs-nextra-starter"
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
