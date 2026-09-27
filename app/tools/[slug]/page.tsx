import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getToolBySlug, getCategories, getAllTools, getEditorialBySlug, isToolIndexable } from '@/lib/tools';
import { AITool } from '@/types';
import ToolLogo from '@/components/ToolLogo';
import { ToolSchema, BreadcrumbSchema, FAQSchema } from '@/components/StructuredData';
import { Metadata } from 'next';

export async function generateStaticParams() {
  return getAllTools().map(t => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const tool = getToolBySlug((await params).slug);
  if (!tool) return { title: '未找到' };

  return {
    title: buildToolTitle(tool),
    description: buildToolDescription(tool),
    alternates: { canonical: `https://taoai365.com/tools/${tool.slug}` },
    // 缺少实质内容的条目：保留可访问性，但不参与索引，
    // 避免被 AdSense / 搜索算法判定为批量生成的低价值内容。
    robots: isToolIndexable(tool) ? undefined : { index: false, follow: true },
  };
}

// ─── SEO helpers: 长尾关键词 Title/Description 模板 ───
function buildToolTitle(tool: AITool): string {
  // 核心用途词：优先取子分类名（如"通用对话AI""图片插画生成"），去冗余尾缀
  const use = getCompactUse(tool);

  // 泛化工具名（name 含"工具/平台/系统/助手/生成器/机器人"）需域名区分
  const nameIsGeneric = /[工具平台系统助手生成器机器人]/.test(tool.name) ||
    (/^AI/.test(tool.name) && /[工具平台系统助手生成器机器人]/.test(tool.name));
  const domain = tool.domain || '';
  const brand = (nameIsGeneric && domain)
    ? ' · ' + domain.replace(/^https?:\/\//, '').replace(/\/$/, '')
    : '';

  // 中文 Title 预算：总宽 ≤50（约 25 中文字）；三段式：工具名 + 用途 + 品牌
  const SEP = ' - ';
  const SUFFIX = ' | TaoAI';
  const nameLen = tool.name.length;
  const brandLen = brand.length;
  const suffixLen = SUFFIX.length;
  const maxUse = 50 - nameLen - SEP.length - brandLen - suffixLen;

  let finalUse = use;
  if (maxUse < 0) {
    finalUse = '';
  } else if (use.length > maxUse) {
    // 优雅省略：保留前 60% + … + 保留后 30%，首尾语义完整
    const keepFront = Math.max(1, Math.floor(maxUse * 0.6));
    const keepBack = Math.max(1, Math.min(maxUse - keepFront - 1, Math.floor(maxUse * 0.3)));
    finalUse = use.slice(0, keepFront) + '…' + use.slice(-keepBack);
  }

  return finalUse
    ? `${tool.name}${SEP}${finalUse}${brand}${SUFFIX}`
    : `${tool.name}${SUFFIX}`;
}

// 提取紧凑用途词：子分类名 → 分类名，去"AI"前缀与"工具/生成/平台/助手/模型"等尾缀
function getCompactUse(tool: AITool): string {
  const cats = getCategories();
  let subName = '';
  let catName = '';
  if (tool.subcategory) {
    for (const cat of cats) {
      const sn = (cat.subcategories || {})[tool.subcategory];
      if (sn) { subName = sn; catName = cat.name; break; }
    }
  }
  if (!subName && tool.categories && tool.categories[0]) {
    const cat = cats.find(c => c.slug === tool.categories[0]);
    if (cat) catName = cat.name;
  }
  const compact = (s: string) =>
    s.replace(/^(AI|AI·|AI-)/, '')
      .replace(/(工具|生成|平台|助手|模型|训练|系统|引擎|服务|器|工具集|制作)$/, '')
      .replace(/^(AI|AI·|AI-)/, '')
      .trim();
  const subC = compact(subName);
  const catC = compact(catName);
  if (subC && subC !== catC) return subC;
  return catC;
}

function buildToolDescription(tool: AITool): string {
  const catName = tool.categories[0] ? (getCategories().find(c => c.slug === tool.categories[0])?.name || '') : '';
  const pricingText = { free: '免费', freemium: '免费增值', paid: '付费' }[tool.pricing] || '';
  // 去掉"属于XX分类。"前缀,并避免工具名重复(description 首句常含"XX是一款...")
  let core = tool.description.replace(/^属于[^。]+。/, '');
  const nameIdx = core.indexOf(tool.name + '是');
  if (nameIdx === 0) core = core.slice(tool.name.length + 1);
  core = core.replace(/^(一款|是一个|是|是一款)/, '');
  core = core.split('。').slice(0, 2).join('。') + '。';
  // 避免与分类名前缀重复:如"AI聊天助手领域的AI工具,AI聊天助手领域的免费AI工具..."
  if (catName) {
    const dupPrefix = catName + '领域的';
    if (core.startsWith(dupPrefix)) core = core.slice(dupPrefix.length);
  }
  const desc = `${tool.name}是${catName ? catName + '领域的' : ''}AI工具,${core}${pricingText ? '支持' + pricingText + '使用。' : ''}TaoAI 编辑实测推荐,收录于 taoai365.com AI工具导航。`;
  return desc.length > 120 ? desc.slice(0, 117) + '...' : desc;
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
  const editorial = getEditorialBySlug(slug);
  const indexable = isToolIndexable(tool);
  const faqs = buildToolFaqs(tool, relatedTools);
  const canonicalUrl = `https://taoai365.com/tools/${slug}`;

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
              <span className="text-gray-700 font-medium">{tool.rating || '-'}</span>
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

      {/* ===== Editorial Review (from TaoAI) ===== */}
      {editorial && (
        <div className="mb-5 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">✍️</span>
            <h2 className="text-base font-bold text-gray-900">TaoAI 编辑评测</h2>
            <span className="text-[10px] text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full">原创内容</span>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-0.5 text-amber-500 text-sm">
              {Array.from({ length: Math.floor(editorial.rating) }).map((_, i) => (
                <span key={i}>★</span>
              ))}
              {editorial.rating % 1 >= 0.5 && <span>1⁄2</span>}
            </div>
            <span className="text-sm font-bold text-gray-900">{editorial.rating}</span>
            <span className="text-xs text-gray-500">/ 5.0</span>
            <span className="text-[10px] text-gray-400 ml-auto">
              <Link href="/about#editorial-team" className="hover:text-blue-600">{editorial.author}</Link> · {editorial.date}
            </span>
          </div>
          <p className="text-sm text-gray-700 font-medium mb-3">{editorial.summary}</p>
          <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line mb-4">{editorial.body}</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <h4 className="text-xs font-bold text-green-700 mb-2">👍 优点</h4>
              <ul className="space-y-1">
                {editorial.pros.map((p, i) => (
                  <li key={i} className="text-xs text-green-800 flex items-start gap-1.5">
                    <span className="text-green-500 shrink-0 mt-0.5">✓</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <h4 className="text-xs font-bold text-red-700 mb-2">👎 缺点</h4>
              <ul className="space-y-1">
                {editorial.cons.map((c, i) => (
                  <li key={i} className="text-xs text-red-800 flex items-start gap-1.5">
                    <span className="text-red-500 shrink-0 mt-0.5">✗</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="text-[10px] text-gray-400 mt-3 pt-3 border-t border-amber-100">
            评测基于 TaoAI 编辑部的真实使用体验,更新时间 {editorial.date}。查看<a href="/editorial-policy" className="text-blue-600 hover:underline">评测标准</a>。
          </p>
        </div>
      )}

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
                <div className="px-3 py-2 text-xs text-gray-400">截图 {i + 1} - 点击查看原图</div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* ===== 正文内容 ===== */}
      {hasDetails ? (
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
        /* 无实质内容的条目：不再生成模板化填充文本，
           只保留基础信息与官网入口供用户跳转。 */
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="text-base font-bold text-gray-900 mb-2">关于 {tool.name}</h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-3">{tool.description}</p>
          <p className="text-xs text-gray-400 leading-relaxed">
            本站暂未收录该工具的使用体验评测。你可以先访问官网了解详情，或在
            <Link href="/tutorials" className="text-blue-600 hover:underline">教程栏目</Link>
            中查找相关用法。若你是该工具的作者或深度用户，欢迎
            <Link href="/contact" className="text-blue-600 hover:underline">提供信息</Link>
            帮助我们完善此条目。
          </p>
        </div>
      )}

      {/* ===== Related Tools ===== */}
      {relatedTools.length > 0 && (
        <div className="mt-5 bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="text-base font-bold text-gray-900 mb-3">类似于 {tool.name} 的工具</h2>
          <p className="text-xs text-gray-400 mb-3">同类 AI 工具推荐,供对比参考</p>
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

      {/* ===== FAQ：按工具自身信息生成，仅在与内容匹配的页面上输出 ===== */}
      {indexable && (
        <SectionCard title={`${tool.name} 常见问题`}>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i}>
                <h3 className="text-sm font-semibold text-gray-900 mb-1.5">{faq.question}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-gray-400 mt-4 pt-3 border-t border-gray-100">
            信息最后更新于 {tool.updatedAt || tool.createdAt || '2026-07'}。如信息有误,欢迎<Link href="/contact" className="text-blue-600 hover:underline">联系我们</Link>更正。
          </p>
        </SectionCard>
      )}

      {/* ===== 署名 · 更新时间 · 数据来源（E-E-A-T） ===== */}
      <div className="mt-5 bg-gray-50 rounded-xl border border-gray-200 p-4 text-xs text-gray-500 leading-relaxed">
        <p>
          本页由{' '}
          <Link href="/about#editorial-team" className="text-blue-600 hover:underline">TaoAI 编辑部</Link>{' '}
          整理维护 · 收录于 {tool.createdAt || '—'} · 最后更新 {tool.updatedAt || tool.createdAt || '—'}
        </p>
        <p className="mt-1">
          信息来源：工具官网与公开资料，核对与引用规则见{' '}
          <Link href="/sources" className="text-blue-600 hover:underline">来源与引用规范</Link>
          ；工具信息可能随官方调整而变化，请以官网最新说明为准。纠错请
          <Link href="/contact" className="text-blue-600 hover:underline">联系我们</Link>。
        </p>
      </div>

      {/* JSON-LD Structured Data */}
      <BreadcrumbSchema items={[
        { name: '首页', url: 'https://taoai365.com' },
        { name: cats.find(c => c.slug === tool.categories[0])?.name || '', url: `https://taoai365.com/categories/${tool.categories[0]}` },
        { name: tool.name, url: canonicalUrl },
      ]} />
      <ToolSchema tool={tool} editorial={editorial} />
      {indexable && <FAQSchema faqs={faqs} />}
    </div>
  );
}

/* 按工具自身字段生成 FAQ（GEO 优化：直接回答式内容，便于 AI 搜索引擎引用）。
   每条内容随工具不同而不同，避免全站复用同一段文本构成重复内容。 */
function buildToolFaqs(tool: AITool, relatedTools: AITool[]): { question: string; answer: string }[] {
  const catName = tool.categories[0]
    ? (getCategories().find(c => c.slug === tool.categories[0])?.name || 'AI')
    : 'AI';
  const pricingAnswer = {
    free: `${tool.name} 目前可免费使用，无需付费即可体验核心功能。具体额度与限制请以官网说明为准。`,
    freemium: `${tool.name} 采用免费增值模式：提供免费版本，付费后可解锁更高配额与进阶功能。`,
    paid: `${tool.name} 为付费产品，提供多种订阅方案，选择前建议先确认试用政策。`,
  }[tool.pricing] || `${tool.name} 的定价方案请以官网最新说明为准。`;

  const faqs = [
    { question: `${tool.name} 是免费的吗？`, answer: pricingAnswer },
    {
      question: `${tool.name} 适合哪些场景？`,
      answer: `${tool.name} 属于${catName}类工具，主要覆盖 ${tool.tags.slice(0, 5).join('、')} 等使用场景。是否适合你的需求，可结合这些能力点与自己的工作流对照判断。`,
    },
  ];

  if (relatedTools.length > 0) {
    faqs.push({
      question: `有哪些和 ${tool.name} 类似的工具？`,
      answer: `与本页收录的同类工具相比，${relatedTools.slice(0, 3).map(t => t.name).join('、')} 等定位相近。可以对照各自的定价模式、能力侧重和使用场景再做选择。`,
    });
  }

  return faqs;
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