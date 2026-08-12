import Link from 'next/link';
import { getFeaturedTools, getCategories, getLatestNews, getLatestTutorials, getEditorials } from '@/lib/tools';
import ToolLogo from '@/components/ToolLogo';
import ToolCard from '@/components/ToolCard';
import { ItemListSchema, FAQSchema } from '@/components/StructuredData';

const colorMap: Record<string, string> = {
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
  const editorials = getEditorials();
  const totalTools = categories.reduce((s, c) => s + c.count, 0);

  // 首页 ItemList：编辑精选 + 热门推荐（前 12 个代表性工具）
  const itemListItems = [...editorials.map(e => featuredTools.find(t => t.slug === e.slug)).filter(Boolean), ...featuredTools]
    .filter((t, i, arr) => t && arr.findIndex(x => x?.slug === t.slug) === i)
    .slice(0, 12)
    .map(t => ({ name: t!.name, url: `https://taoai365.com/tools/${t!.slug}` }));

  return (
    <div className="max-w-6xl mx-auto px-6 py-6 space-y-8">
      {/* 首页结构化数据：WebSite/Organization 已在 layout，这里补 ItemList + FAQ */}
      <ItemListSchema items={itemListItems} />
      <FAQSchema faqs={[
        { question: 'TaoAI 是什么？', answer: 'TaoAI 是独立的 AI 工具导航站，收录 1200+ 款 AI 工具，覆盖 15 个分类，为重要工具提供编辑部原创评测和优缺点分析。' },
        { question: 'TaoAI 的评测可信吗？', answer: 'TaoAI 坚持真实使用后评分，不接受付费好评，评测独立于广告合作，完整标准见编辑政策页面。' },
        { question: 'TaoAI 免费吗？', answer: 'TaoAI 对用户完全免费，通过展示广告维持运营，广告不影响评测立场。' },
        { question: '如何提交我的 AI 工具？', answer: '可通过 TaoAI 联系页面提交工具收录申请，审核后会尽快回复。' },
      ]} />

      {/* Hero Banner — rewritten with original value proposition */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-8 text-white">
        <h1 className="text-2xl font-bold mb-2">🚀 TaoAI · AI工具导航，发现最好用的AI工具</h1>
        <p className="text-blue-100 text-sm leading-relaxed mb-1">
          市面上的 AI 工具每天都在增长，但真正好用的没几个。<strong>TaoAI</strong> 是一个独立的 AI 工具导航站——
          我们亲自测试、客观评分、持续更新，帮你在 {totalTools}+ 款工具中快速找到适合你的那一款。
        </p>
        <p className="text-blue-200 text-xs leading-relaxed mb-4">
          不搬运官方宣传语，每篇评测都基于真实使用体验。广告友好，绝不为了推广说假话。
        </p>
        <div className="flex gap-2">
          {categories.slice(0, 6).map(c => (
            <Link key={c.slug} href={`/categories/${c.slug}`} className="text-xs bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full transition-colors">
              {c.icon} {c.name}
            </Link>
          ))}
        </div>
      </section>

      {/* Editor's Picks — original editorial content */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">✍️ 编辑精选 · 深度评测</h2>
          <Link href="/categories/ai-chat" className="text-xs text-blue-600 hover:underline">更多工具 →</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {editorials.map(ed => {
            const tool = featuredTools.find(t => t.slug === ed.slug);
            const catSlug = tool?.categories?.[0] || 'ai-chat';
            const gradient = colorMap[catSlug] || 'from-gray-400 to-gray-600';
            return (
              <Link key={ed.slug} href={`/tools/${ed.slug}`} className="group block bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg hover:border-blue-200 transition-all">
                {/* Header with gradient */}
                <div className={`bg-gradient-to-r ${gradient} p-4 flex items-center gap-3`}>
                  {tool?.logo && (
                    <ToolLogo src={tool.logo} domain={tool.domain || ''} alt="" className="w-10 h-10 rounded-lg bg-white/90 object-contain p-1 shrink-0" />
                  )}
                  <div className="min-w-0 text-white">
                    <h3 className="font-bold text-sm truncate">{tool?.name || ed.slug}</h3>
                    <div className="flex items-center gap-1 text-xs text-white/80">
                      <span className="text-yellow-300">★</span>
                      <span>{ed.rating}</span>
                      <span className="mx-1">·</span>
                      <span className="truncate">{ed.summary}</span>
                    </div>
                  </div>
                </div>
                {/* Body excerpt */}
                <div className="p-4">
                  <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">{ed.body}</p>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                    <span className="text-[10px] text-gray-400">TaoAI 编辑部 · 真实评测</span>
                    <span className="text-xs text-blue-600 font-medium group-hover:underline">阅读全文 →</span>
                  </div>
                </div>
              </Link>
            );
          })}
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
            <Link key={item.slug} href={`/news/${item.slug}`} className="block bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
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
            <Link key={item.slug} href={`/tutorials/${item.slug}`} className="block bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
              <span className="text-[10px] text-blue-600 font-medium bg-blue-50 px-2 py-0.5 rounded-full">{item.category}</span>
              <h3 className="text-sm font-medium text-gray-900 mt-2 mb-1">{item.title}</h3>
              <p className="text-xs text-gray-500 line-clamp-2">{item.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Why TaoAI — unique value proposition */}
      <section className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-100">
        <h2 className="text-lg font-bold text-gray-900 mb-4">为什么选择 TaoAI？</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 border border-gray-100">
            <div className="text-2xl mb-2">🔍</div>
            <h3 className="text-sm font-bold text-gray-900 mb-1">真实评测，不是搬运工</h3>
            <p className="text-xs text-gray-500 leading-relaxed">每篇编辑精选都来自真实使用体验，告诉你一个工具好在哪里、差在哪里，而不是复制官方介绍。</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-100">
            <div className="text-2xl mb-2">📊</div>
            <h3 className="text-sm font-bold text-gray-900 mb-1">1200+ 工具，持续更新</h3>
            <p className="text-xs text-gray-500 leading-relaxed">覆盖 15 个分类，从大模型到 AI 设计、从编程到办公，每周新增和更新工具，跟上 AI 发展的速度。</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-100">
            <div className="text-2xl mb-2">🎯</div>
            <h3 className="text-sm font-bold text-gray-900 mb-1">不吹不黑，独立客观</h3>
            <p className="text-xs text-gray-500 leading-relaxed">我们接受广告合作，但评测独立于商业。每个工具的优缺点都如实标注，帮你在海量选择中做出明智决定。</p>
          </div>
        </div>
      </section>

      {/* FAQ (GEO: 生成式搜索引擎常引用) */}
      <section className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">关于 TaoAI 的常见问题</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-1.5">TaoAI 是什么？</h3>
            <p className="text-xs text-gray-600 leading-relaxed">TaoAI 是独立的 AI 工具导航站，收录 1200+ 款 AI 工具，覆盖 15 个分类。与聚合站不同，我们为重要工具提供编辑部原创评测和优缺点分析。</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-1.5">TaoAI 的评测可信吗？</h3>
            <p className="text-xs text-gray-600 leading-relaxed">我们坚持真实使用后评分，不接受付费好评，评测独立于广告合作。完整的评测标准见<a href="/editorial-policy" className="text-blue-600 hover:underline">编辑政策</a>。</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-1.5">TaoAI 免费吗？</h3>
            <p className="text-xs text-gray-600 leading-relaxed">TaoAI 对用户完全免费。我们通过展示广告（如 Google AdSense）维持运营，广告不影响评测立场。</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-1.5">如何提交我的 AI 工具？</h3>
            <p className="text-xs text-gray-600 leading-relaxed">欢迎通过<a href="/contact" className="text-blue-600 hover:underline">联系我们</a>页面提交工具收录申请，我们审核后会尽快回复。</p>
          </div>
        </div>
      </section>
    </div>
  );
}
