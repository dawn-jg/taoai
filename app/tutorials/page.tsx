import Link from 'next/link'; import { getTutorials } from '@/lib/tools'; import { Metadata } from 'next';
export const metadata: Metadata = { title: 'AI教程资源 - AI工具集 | TaoAI' };
export default function TutorialsPage() {
  const tutorials = getTutorials();
  return (<div className="max-w-4xl mx-auto px-6 py-6">
    <nav className="text-xs text-gray-400 mb-4"><Link href="/" className="hover:text-blue-600">首页</Link><span className="mx-1">/</span><span className="text-gray-600">AI教程</span></nav>
    <h1 className="text-lg font-bold text-gray-900 mb-6">📚 AI教程资源</h1>
    <div className="space-y-3">
      {tutorials.map(item => (<div key={item.slug} className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow">
        <span className="text-[10px] text-blue-600 font-medium bg-blue-50 px-2 py-0.5 rounded-full">{item.category}</span>
        <h2 className="text-sm font-semibold text-gray-900 mt-2 mb-1">{item.title}</h2>
        <p className="text-xs text-gray-600">{item.summary}</p>
        <span className="text-[10px] text-gray-400 block mt-2">{item.date}</span>
      </div>))}
    </div>
  </div>);
}
