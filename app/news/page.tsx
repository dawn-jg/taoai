import Link from 'next/link'; import { getNews } from '@/lib/tools'; import { Metadata } from 'next';
export const metadata: Metadata = { title: '每日AI资讯 - AI工具集 | TaoAI' };
export default function NewsPage() {
  const news = getNews();
  return (<div className="max-w-4xl mx-auto px-6 py-6">
    <nav className="text-xs text-gray-400 mb-4"><Link href="/" className="hover:text-blue-600">首页</Link><span className="mx-1">/</span><span className="text-gray-600">AI资讯</span></nav>
    <h1 className="text-lg font-bold text-gray-900 mb-6">📰 每日AI快讯</h1>
    <div className="space-y-3">
      {news.map(item => (<div key={item.slug} className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow">
        <h2 className="text-sm font-semibold text-gray-900 mb-1">{item.title}</h2>
        <p className="text-xs text-gray-600 mb-2">{item.summary}</p>
        <div className="flex items-center justify-between text-[10px] text-gray-400"><span>{item.source}</span><span>{item.date}</span></div>
      </div>))}
    </div>
  </div>);
}
