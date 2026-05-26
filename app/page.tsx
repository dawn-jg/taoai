import Link from 'next/link';
import { getFeaturedTools, getCategories, getLatestNews, getLatestTutorials } from '@/lib/tools';
import ToolCard from '@/components/ToolCard';
import CategoryCard from '@/components/CategoryCard';
import SearchBar from '@/components/SearchBar';

export default function HomePage() {
  const featuredTools = getFeaturedTools();
  const categories = getCategories();
  const latestNews = getLatestNews(3);
  const latestTutorials = getLatestTutorials(3);

  return (
    <div>
      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
              TaoAI · 发现最好的 AI 工具
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-8">
              已收录 {categories.reduce((s, c) => s + c.count, 0)}+ 款AI工具，覆盖对话、写作、绘画、视频、编程全品类
            </p>
            <SearchBar large />
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {categories.map((cat) => (
            <CategoryCard key={cat.slug} category={cat} />
          ))}
        </div>
      </section>

      {/* Featured Tools */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">🔥 热门推荐</h2>
          <Link href="/categories/ai-chat" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            查看全部 →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {featuredTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>

      {/* Latest News & Tutorials */}
      <section className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">📰 最新资讯</h2>
                <Link href="/news" className="text-sm text-blue-600 hover:text-blue-700">更多 →</Link>
              </div>
              <div className="space-y-4">
                {latestNews.map((item) => (
                  <Link key={item.slug} href={`/news`} className="block bg-gray-50 rounded-xl p-4 hover:bg-blue-50 transition-colors">
                    <h3 className="font-medium text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{item.summary}</p>
                    <span className="text-xs text-gray-400 mt-2 block">{item.date}</span>
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">📚 精选教程</h2>
                <Link href="/tutorials" className="text-sm text-blue-600 hover:text-blue-700">更多 →</Link>
              </div>
              <div className="space-y-4">
                {latestTutorials.map((item) => (
                  <Link key={item.slug} href={`/tutorials`} className="block bg-gray-50 rounded-xl p-4 hover:bg-blue-50 transition-colors">
                    <span className="text-xs text-blue-600 font-medium bg-blue-100 px-2 py-0.5 rounded-full">{item.category}</span>
                    <h3 className="font-medium text-gray-900 mt-2 mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{item.summary}</p>
                    <span className="text-xs text-gray-400 mt-2 block">{item.date}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
