import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getToolBySlug, getCategories, getAllTools } from '@/lib/tools';
import ToolLogo from '@/components/ToolLogo';
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
  const relatedTools = getAllTools().filter(t => t.slug !== slug && t.categories.some(c => tool.categories.includes(c))).slice(0, 6);
  const hasDetails = tool.detailed_content && tool.detailed_content.length > 0;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
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

      {/* ===== Header Card ===== */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-5">
        <div className="flex flex-col sm:flex-row sm:items-start gap-5">
          {/* Left: Logo + meta */}
          <div className="shrink-0 flex flex-col items-center gap-3 w-36">
            {tool.logo && (
              <ToolLogo src={tool.logo} domain={tool.domain} alt="" className="w-20 h-20 rounded-xl bg-gray-50 object-contain p-1" />
            )}
            <div className="flex items-center gap-1 text-sm text-yellow-500">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
              <span className="text-gray-700 font-medium">{tool.rating || '—'}</span>
            </div>
            <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${pricingColor[tool.pricing]}`}>{pricingLabel[tool.pricing]}</span>
          </div>

          {/* Right: Title + desc + tags + button */}
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{tool.name}</h1>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">{tool.description}</p>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {tool.tags.map(tag => (
                <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md">{tag}</span>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {tool.categories.map(catSlug => {
                const cat = cats.find(c => c.slug === catSlug);
                return cat ? (
                  <Link key={catSlug} href={`/categories/${catSlug}`} className="text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full hover:bg-blue-100">
                    {cat.icon} {cat.name}
                  </Link>
                ) : null;
              })}
            </div>

            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              访问官网 →
            </a>
          </div>
        </div>
      </div>

      {/* ===== Screenshots Gallery ===== */}
      {tool.screenshots && tool.screenshots.length > 0 && (
        <div className="mb-5">
          <h2 className="text-base font-bold text-gray-900 mb-3">{tool.name} 页面截图</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {tool.screenshots.map((src, i) => (
              <a key={i} href={src} target="_blank" rel="noopener noreferrer"
                className="block bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md hover:border-blue-200 transition-all group">
                <div className="aspect-video bg-gray-100 relative overflow-hidden">
                  <img src={src} alt={`${tool.name} 截图 ${i + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                </div>
                <div className="px-3 py-2 text-xs text-gray-400">截图 {i + 1} — 点击查看原图</div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* ===== Content: Detailed (from ai-bot) or Generic ===== */}
      {hasDetails ? (
        /* ===== Detailed Content from ai-bot ===== */
        <div className="space-y-4">
          {tool.detailed_content!.map((section, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 p-5">
              {section.title && (
                <h2 className="text-base font-bold text-gray-900 mb-3">{section.title}</h2>
              )}
              <div
                className="tool-content prose-sm"
                dangerouslySetInnerHTML={{ __html: section.html }}
              />
            </div>
          ))}
        </div>
      ) : (
        /* ===== Generic Content (fallback) ===== */
        <div className="space-y-5">
          <SectionCard title={`什么是 ${tool.name}`}>
            <p className="text-sm text-gray-700 leading-relaxed mb-3">
              {tool.name} 是一款 {tool.description}。作为 AI 工具生态中的优秀产品，{tool.name} 在 {tool.tags.slice(0, 3).join('、')} 等场景中表现出色，帮助用户提升效率、激发创造力。
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded-r">
              <p className="text-xs text-blue-700">
                💡 {tool.name} 支持 {tool.pricing === 'free' ? '完全免费使用' : tool.pricing === 'freemium' ? '免费版 + 付费高级功能' : '付费订阅'}，
                访问官网了解更多信息。
              </p>
            </div>
          </SectionCard>

          <SectionCard title="主要功能">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {tool.tags.map((tag, i) => (
                <div key={i} className="flex items-start gap-2.5 p-3 bg-gray-50 rounded-lg">
                  <span className="shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 text-xs font-bold">{(i + 1).toString().padStart(2, '0')}</span>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">{tag}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">在 {tag} 方面提供专业级能力支持，满足多样化创作需求。</p>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="技术优势">
            <div className="space-y-3">
              <TechRow icon="🚀" title="响应速度快" desc={`${tool.name} 推理响应速度快，延迟低，适合实时交互场景。`} />
              <TechRow icon="🎯" title="效果出色" desc={`在${tool.tags[0] || '核心'}场景下表现优异，输出质量稳定可靠。`} />
              <TechRow icon="💰" title="性价比高" desc={tool.pricing === 'free' ? '完全免费，无任何隐藏费用。' : '提供灵活的定价方案，满足不同用户需求。'} />
              <TechRow icon="🔌" title="接入便捷" desc="支持 API 调用，可快速集成到现有工作流中。" />
            </div>
          </SectionCard>

          <SectionCard title={`如何使用 ${tool.name}`}>
            <ol className="space-y-3">
              <Step num={1} title="访问官网" desc={`打开浏览器访问 ${tool.url}，进入 ${tool.name} 官方网站。`} />
              <Step num={2} title="注册/登录" desc="根据页面提示完成账号注册或直接登录（支持第三方登录）。" />
              <Step num={3} title="选择功能" desc={`在控制台中选择需要的 ${tool.tags.slice(0, 2).join(' / ')} 等功能模块开始使用。`} />
              <Step num={4} title="查看文档" desc="如需深入了解，可查看官方文档或在本站搜索相关教程。" />
            </ol>
          </SectionCard>

          <SectionCard title="价格信息">
            <div className="text-sm text-gray-700 leading-relaxed">
              {tool.pricing === 'free' && <p>✅ <strong>{tool.name}</strong> 目前完全<strong className="text-green-600">免费</strong>使用，无需付费即可体验全部核心功能。</p>}
              {tool.pricing === 'freemium' && <p>✅ <strong>{tool.name}</strong> 提供<strong className="text-blue-600">免费版</strong>，同时提供付费高级版，解锁更多功能和更高配额。</p>}
              {tool.pricing === 'paid' && <p>✅ <strong>{tool.name}</strong> 为付费工具，提供多种订阅方案，可按需选择。</p>}
            </div>
          </SectionCard>
        </div>
      )}

      {/* ===== Related Tools ===== */}
      {relatedTools.length > 0 && (
        <div className="mt-5 bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="text-base font-bold text-gray-900 mb-3">类似于 {tool.name} 的工具</h2>
          <p className="text-xs text-gray-400 mb-3">同类 AI 工具推荐，供对比参考</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {relatedTools.map(t => (
              <Link key={t.slug} href={`/tools/${t.slug}`} className="block bg-gray-50 hover:bg-blue-50 border border-gray-100 rounded-lg p-3 transition-colors">
                <div className="flex items-center gap-2">
                  {t.logo && <ToolLogo src={t.logo} domain={t.domain} alt="" className="w-8 h-8 rounded-md shrink-0 bg-white object-contain p-0.5" />}
                  <div className="min-w-0">
                    <h4 className="text-sm font-semibold text-gray-900 truncate">{t.name}</h4>
                    <p className="text-xs text-gray-500 truncate">{t.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ---- Sub-components ---- */

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h2 className="text-base font-bold text-gray-900 mb-3">{title}</h2>
      {children}
    </div>
  );
}

function TechRow({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
      <span className="text-lg">{icon}</span>
      <div>
        <h4 className="text-sm font-semibold text-gray-900">{title}</h4>
        <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
      </div>
    </div>
  );
}

function Step({ num, title, desc }: { num: number; title: string; desc: string }) {
  return (
    <li className="flex items-start gap-3">
      <span className="shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-600 text-white text-xs font-bold">{num}</span>
      <div>
        <h4 className="text-sm font-semibold text-gray-900">{title}</h4>
        <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
      </div>
    </li>
  );
}