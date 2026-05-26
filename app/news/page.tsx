import Link from 'next/link';
import { getNews } from '@/lib/tools';
import { Metadata } from 'next';

export const metadata: Metadata = { title: 'AI资讯 - AI导航', description: '最新AI行业资讯和动态' };

export default function NewsPage() {
  const news = getNews();
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-blue-600">首页</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">AI资讯</span>
      </nav>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">📰 AI资讯</h1>
      <div className="space-y-4">
        {news.map((item) => (
          <div key={item.slug} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h2>
            <p className="text-sm text-gray-600 mb-3">{item.summary}</p>
            <div className="flex items-center justify-between text-sm text-gray-400">
              <span>{item.source}</span>
              <span>{item.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
