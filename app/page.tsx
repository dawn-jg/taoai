import Link from 'next/link';
import { getFeaturedTools, getCategories, getLatestNews, getLatestTutorials } from '@/lib/tools';
import ToolCard from '@/components/ToolCard';

const colorMap = {
  'ai-chat':'from-blue-400 to-blue-600','ai-writing':'from-violet-400 to-violet-600',
  'ai-image':'from-pink-400 to-pink-600','ai-video':'from-red-400 to-red-600',
  'ai-coding':'from-green-400 to-green-600','ai-office':'from-amber-400 to-amber-600',
  'ai-audio':'from-purple-400 to-purple-600','ai-search':'from-cyan-400 to-cyan-600',
  'ai-design':'from-rose-400 to-rose-600','ai-agent':'from-indigo-400 to-indigo-600',
  'ai-platform':'from-slate-400 to-slate-600','ai-learning':'from-teal-400 to-teal-600',
  'ai-models':'from-orange-400 to-orange-600','ai-detection':'from-lime-400 to-lime-600',
  'ai-prompt':'from-yellow-400 to-yellow-600','ai-apps':'from-emerald-400 to-emerald-600',
};

export default function HomePage() {
  const featuredTools = getFeaturedTools();
  const categories = getCategories();
  const latestNews = getLatestNews(4);
  const latestTutorials = getLatestTutorials(3);

  return (
    <div className="max-w-6xl mx-auto px-6 py-6 space-y-8">
      {/* Banner */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-8 text-white">
        <h1 className="text-2xl font-bold mb-2">🚀 TaoAI - 发现最好的AI工具</h1>
        <p className="text-blue-100 text-sm mb-4">收录 {categories.reduce((s,c)=>s+c.count,0)}+ 款AI工具，持续更新中</p>
        <div className="flex gap-2">
          {categories.slice(0,6).map(c => (
            <Link key={c.slug} href={`/categories/${c.slug}`} className="text-xs bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full transition-colors">
              {c.icon} {c.name}
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Tools */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">🔥 热门推荐</h2>
          <Link href="/categories/ai-chat" className="text-xs text-blue-600 hover:underline">查看全部 →</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {featuredTools.map(t => <ToolCard key={t.slug} tool={t} />)}
        </div>
      </section>

      {/* Categories */}
      <section>
        <h2 className="text-lg font-bold text-gray-900 mb-4">📂 AI工具分类</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 gap-3">
          {categories.map(c => (
            <Link key={c.slug} href={`/categories/${c.slug}`} className="block bg-white rounded-lg border border-gray-200 p-4 text-center hover:shadow-md hover:border-blue-200 transition-all">
              <span className="text-2xl block mb-1">{c.icon}</span>
              <span className="text-xs font-medium text-gray-700">{c.name}</span>
              <span className="text-[10px] text-gray-400 block mt-0.5">{c.count}款</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Latest News */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">📰 每日AI快讯</h2>
          <Link href="/news" className="text-xs text-blue-600 hover:underline">更多 →</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {latestNews.map(item => (
            <Link key={item.slug} href="/news" className="block bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
              <h3 className="text-sm font-medium text-gray-900 mb-1">{item.title}</h3>
              <p className="text-xs text-gray-500 line-clamp-2">{item.summary}</p>
              <span className="text-[10px] text-gray-400 mt-2 block">{item.date}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Latest Tutorials */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">📚 精选教程</h2>
          <Link href="/tutorials" className="text-xs text-blue-600 hover:underline">更多 →</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {latestTutorials.map(item => (
            <div key={item.slug} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
              <span className="text-[10px] text-blue-600 font-medium bg-blue-50 px-2 py-0.5 rounded-full">{item.category}</span>
              <h3 className="text-sm font-medium text-gray-900 mt-2 mb-1">{item.title}</h3>
              <p className="text-xs text-gray-500 line-clamp-2">{item.summary}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
