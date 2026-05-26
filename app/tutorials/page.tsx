import Link from 'next/link';
import { getTutorials } from '@/lib/tools';
import { Metadata } from 'next';

export const metadata: Metadata = { title: 'AI教程 - AI导航', description: 'AI工具使用教程和学习资源' };

export default function TutorialsPage() {
  const tutorials = getTutorials();
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-blue-600">首页</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">AI教程</span>
      </nav>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">📚 AI教程</h1>
      <div className="space-y-4">
        {tutorials.map((item) => (
          <div key={item.slug} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <span className="text-xs text-blue-600 font-medium bg-blue-100 px-2 py-0.5 rounded-full">{item.category}</span>
            <h2 className="text-lg font-semibold text-gray-900 mt-2 mb-2">{item.title}</h2>
            <p className="text-sm text-gray-600 mb-3">{item.summary}</p>
            <span className="text-xs text-gray-400">{item.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
