import type { Metadata } from 'next';
import './globals.css';
import LeftSidebar from '@/components/LeftSidebar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { OrganizationSchema, WebSiteSchema } from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'TaoAI - AI工具导航 | 发现最好用的AI工具',
  description: 'TaoAI 是独立AI工具导航站，收录1200+款AI工具，覆盖AI对话、写作、绘画、视频、编程、设计、办公等15个分类。每款工具附编辑部真实评测和优缺点分析，帮你快速找到最适合的AI工具。每日更新AI快讯与教程。',
  keywords: 'AI工具,AI导航,TaoAI,AI对话,AI写作,AI绘画,AI视频,AI编程,AI设计,AI办公,DeepSeek,豆包,Kimi,通义千问,AI工具推荐',
  openGraph: {
    title: 'TaoAI - AI工具导航 | 发现最好用的AI工具',
    description: 'TaoAI 是独立AI工具导航站，收录1200+款AI工具。编辑部真实评测，优缺点分析，帮你找到最适合的AI工具。',
    type: 'website',
    locale: 'zh_CN',
    siteName: 'TaoAI',
    images: [{ url: 'https://taoai365.com/og-image.png', width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
  metadataBase: new URL('https://taoai365.com'),
  alternates: { canonical: '/', languages: { 'zh-CN': '/' } },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" className="h-full">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://taoai365.com" />
        <link rel="alternate" hrefLang="zh-CN" href="https://taoai365.com" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta property="og:title" content="TaoAI - AI工具导航 | 发现最好用的AI工具" />
        <meta property="og:description" content="TaoAI 是独立AI工具导航站，收录1200+款AI工具。编辑部真实评测，优缺点分析，帮你找到最适合的AI工具。" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="zh_CN" />
        <meta property="og:site_name" content="TaoAI" />
        <meta property="og:image" content="https://taoai365.com/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://taoai365.com/og-image.png" />
        <script charSet="UTF-8" id="LA_COLLECT" src="//sdk.51.la/js-sdk-pro.min.js" />
        <script>{`LA.init({id:"LCklhM4QMEncFfxL",ck:"LCklhM4QMEncFfxL"})`}</script>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7487473818971469" crossOrigin="anonymous" />
        <OrganizationSchema />
        <WebSiteSchema />
      </head>
      <body className="min-h-full flex">
        <LeftSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <Header />
          <main className="flex-1 bg-gray-50">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
