import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getToolBySlug, getCategories, getAllTools } from '@/lib/tools';
import ToolCard from '@/components/ToolCard';
import { Metadata } from 'next';

export async function generateStaticParams() {
  return getAllTools().map(t => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const tool = getToolBySlug((await params).slug);
  if (!tool) return { title: '未找到' };
  return { title: `${tool.name} - AI工具集 | TaoAI`, description: tool.description };
}

export default async function ToolDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const pricingLabel: Record<string, string> = { free: '免费', freemium: '免费增值', paid: '付费' };
  const pricingColor: Record<string, string> = { free: 'bg-green-100 text-green-700', freemium: 'bg-blue-100 text-blue-700', paid: 'bg-orange-100 text-orange-700' };
  const cats = getCategories();
  const relatedTools = getAllTools().filter(t => t.slug !== slug && t.categories.some(c => tool.categories.includes(c))).slice(0, 4);

  return (
    <div className="max-w-4xl mx-auto px-6 py-6">
      {/* Breadcrumb */}
      <nav className="text-xs text-gray-400 mb-4">
        <Link href="/" className="hover:text-blue-600">首页</Link>
        <span className="mx-1">/</span>
        <Link href={`/categories/${tool.categories[0]}`} className="hover:text-blue-600">
          {cats.find(c => c.slug === tool.categories[0])?.name || ''}
        </Link>
        <span className="mx-1">/</span>
        <span className="text-gray-600">{tool.name}</span>
      </nav>

      {/* Tool Header */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900 mb-2">{tool.name}</h1>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${pricingColor[tool.pricing]}`}>{pricingLabel[tool.pricing]}</span>
              <div className="flex items-center gap-1 text-xs text-yellow-500">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                <span className="text-gray-600">{tool.rating}</span>
              </div>
            </div>
          </div>
          <a href={tool.url} target="_blank" rel="noopener noreferrer" className="shrink-0 bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
            访问官网 →
          </a>
        </div>

        <p className="text-sm text-gray-700 leading-relaxed mb-4">{tool.description}</p>

        <div className="flex flex-wrap gap-1.5">
          {tool.tags.map(tag => (
            <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md">{tag}</span>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {tool.categories.map(catSlug => {
            const cat = cats.find(c => c.slug === catSlug);
            return cat ? <Link key={catSlug} href={`/categories/${catSlug}`} className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full hover:bg-blue-100">{cat.icon} {cat.name}</Link> : null;
          })}
        </div>
      </div>

      {/* What is this tool */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4">
        <h2 className="text-base font-bold text-gray-900 mb-3">什么是{tool.name}</h2>
        <p className="text-sm text-gray-700 leading-relaxed">{tool.description}。{tool.name}是一款优秀的AI工具，广泛应用于日常工作和创作场景，帮助用户提升效率和创造力。</p>
      </div>

      {/* Features */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4">
        <h2 className="text-base font-bold text-gray-900 mb-3">产品功能</h2>
        <ul className="space-y-2">
          {tool.tags.map((tag, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
              <span className="text-blue-500 mt-0.5 shrink-0">◆</span>
              <span><strong className="text-gray-900">{tag}</strong>：{tool.name}在{tag}方面表现出色，为用户提供专业级的能力支持。</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Pricing info */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4">
        <h2 className="text-base font-bold text-gray-900 mb-3">价格信息</h2>
        <p className="text-sm text-gray-700">
          {tool.pricing === 'free' ? `${tool.name}目前完全免费使用，无需付费。` :
           tool.pricing === 'freemium' ? `${tool.name}提供免费版本，付费版本提供更多高级功能。` :
           `${tool.name}为付费工具，提供多种订阅方案供选择。`}
        </p>
      </div>

      {/* How to use */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4">
        <h2 className="text-base font-bold text-gray-900 mb-3">如何使用 {tool.name}</h2>
        <ol className="space-y-2 text-sm text-gray-700 list-decimal list-inside">
          <li>访问 {tool.name} 官网（<a href={tool.url} target="_blank" className="text-blue-600 hover:underline">{tool.url}</a>）</li>
          <li>注册或登录账号</li>
          <li>根据需求选择相应的功能模块开始使用</li>
          <li>如需更详细的使用教程，可查看官方文档或在站内搜索相关教程</li>
        </ol>
      </div>

      {/* Similar tools */}
      {relatedTools.length > 0 && (
        <div className="mb-6">
          <h2 className="text-base font-bold text-gray-900 mb-3">类似于 {tool.name} 的工具</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {relatedTools.map(t => <ToolCard key={t.slug} tool={t} />)}
          </div>
        </div>
      )}
    </div>
  );
}
