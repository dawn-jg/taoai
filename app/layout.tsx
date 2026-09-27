import type { Metadata } from 'next';
import './globals.css';
import LeftSidebar from '@/components/LeftSidebar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { OrganizationSchema, WebSiteSchema } from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'TaoAI - AI工具导航 | 发现最好用的AI工具',
  description: 'TaoAI 是独立 AI 工具导航站，收录 1200+ 款 AI 工具，覆盖 AI 对话、写作、绘画、视频、编程、设计、办公等 15 个分类。提供工具信息整理、分类检索与编辑部评测，每日更新 AI 快讯与使用教程。',
  keywords: 'AI工具,AI导航,TaoAI,AI对话,AI写作,AI绘画,AI视频,AI编程,AI设计,AI办公,DeepSeek,豆包,Kimi,通义千问,AI工具推荐',
  openGraph: {
    title: 'TaoAI - AI工具导航 | 发现最好用的AI工具',
    description: 'TaoAI 是独立 AI 工具导航站，收录 1200+ 款 AI 工具，提供工具信息整理、分类检索与编辑部评测。',
    type: 'website',
    locale: 'zh_CN',
    siteName: 'TaoAI',
    images: [{ url: 'https://taoai365.com/og-image.png', width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
  metadataBase: new URL('https://taoai365.com'),
  // 相对 canonical：在 Next.js 中解析为「当前页面自身地址」，
  // 各动态路由再用 generateMetadata 覆盖为绝对地址。
  alternates: { canonical: './', languages: { 'zh-CN': './' } },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" className="h-full">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
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
