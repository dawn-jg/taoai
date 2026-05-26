import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'TaoAI - AI导航 | 发现最好的AI工具',
  description: 'TaoAI AI导航 - 收录数百款AI工具，覆盖AI对话、写作、绘画、视频、编程等全品类，帮你找到最适合的AI工具',
  keywords: 'AI工具, AI导航, TaoAI, AI对话, AI写作, AI绘画, AI视频, AI编程, ChatGPT, DeepSeek',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" className="h-full">
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
