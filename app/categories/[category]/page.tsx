import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getCategoryBySlug, getToolsByCategory, getCategories, getCategoryIntro } from '@/lib/tools';
import { Metadata } from 'next';
import ToolCard from '@/components/ToolCard';
import { SubcategoryGrid } from '@/components/SubcategoryGrid';
import { ItemListSchema, FAQSchema } from '@/components/StructuredData';

export async function generateStaticParams() {
  return getCategories().map(c => ({ category: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const cat = getCategoryBySlug((await params).category);
  if (!cat) return { title: '未找到' };
  const count = getToolsByCategory(cat.slug).length;
  const baseName = cat.name.replace(/工具$/, '');
  const title = `${baseName}工具大全（${count}款）- 2026年推荐 | TaoAI`;
  const description = `收录${count}款${baseName}工具，含免费与付费产品对比、TaoAI 编辑部真实评测与优缺点分析，助你快速找到最适合的AI工具。每日更新。`;
  return { title, description };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) notFound();

  const tools = getToolsByCategory(category);
  const subcats = cat.subcategories || {};
  const intro = getCategoryIntro(category);
  const catFaqs = buildCategoryFaqs(cat, tools.length);
  const itemListItems = tools.slice(0, 12).map(t => ({ name: t.name, url: `https://taoai365.com/tools/${t.slug}` }));

  return (
    <div className="max-w-6xl mx-auto px-6 py-6">
      <ItemListSchema items={itemListItems} />
      <nav className="text-xs text-gray-400 mb-4">
        <Link href="/" className="hover:text-blue-600">首页</Link>
        <span className="mx-1">/</span>
        <span className="text-gray-600">{cat.name}</span>
      </nav>

      <div className="bg-white rounded-xl border border-gray-200 p-5 mb-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{cat.icon}</span>
          <div>
            <h1 className="text-lg font-bold text-gray-900">{cat.name}</h1>
            <p className="text-xs text-gray-500">{cat.description}</p>
            <p className="text-xs text-gray-400 mt-1">共 {tools.length} 款工具</p>
          </div>
        </div>
      </div>

      {/* Category Intro — original editorial content */}
      {intro && (
        <div className="mb-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100 p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm">📝</span>
            <span className="text-xs font-bold text-blue-700">TaoAI 编辑部 · 分类介绍</span>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">{intro}</p>
        </div>
      )}

      {/* What-is definition block (GEO: 可被生成式搜索引擎引用的定义内容) */}
      <div className="mb-4 bg-white rounded-xl border border-gray-200 p-5">
        <h2 className="text-base font-bold text-gray-900 mb-2">什么是{cat.name}？</h2>
        <p className="text-sm text-gray-600 leading-relaxed mb-3">{cat.description}。本分类收录了 {tools.length} 款经过筛选的{cat.name}，覆盖{Object.keys(subcats).length > 0 ? Object.values(subcats).join('、') + '等细分场景' : '主流应用场景'}，从免费工具到企业级方案一应俱全。</p>
        <p className="text-sm text-gray-600 leading-relaxed">选择{cat.name}时，建议从「是否免费」「中文支持」「生成质量」「使用门槛」四个维度对比。TaoAI 编辑部的分类介绍和每款工具的编辑评测可以帮助你快速决策。</p>
      </div>

      {/* Subcategory Grid */}
      {Object.keys(subcats).length > 0 ? (
        <SubcategoryGrid tools={tools} subcats={subcats} />
      ) : tools.length === 0 ? (
        <div className="text-center py-16 text-gray-500 text-sm">该分类暂无工具</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {tools.map(t => <ToolCard key={t.slug} tool={t} />)}
        </div>
      )}

      {/* FAQ (GEO: 直接回答式内容) */}
      <div className="mt-6 bg-white rounded-xl border border-gray-200 p-5">
        <h2 className="text-base font-bold text-gray-900 mb-4">{cat.name} 常见问题</h2>
        <div className="space-y-4">
          {catFaqs.map((faq, i) => (
            <div key={i}>
              <h3 className="text-sm font-semibold text-gray-900 mb-1.5">{faq.question}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      <FAQSchema faqs={catFaqs} />
    </div>
  );
}

/* 分类 FAQ 生成器（GEO 优化） */
function buildCategoryFaqs(cat: any, count: number) {
  const name = cat.name;
  return [
    {
      question: `什么是${name}？`,
      answer: `${name}是指利用人工智能技术辅助完成相关任务的工具。TaoAI 收录了 ${count} 款相关产品，涵盖${Object.keys(cat.subcategories || {}).length > 0 ? Object.values(cat.subcategories).join('、') : '多种应用场景'}，用户可按子分类快速筛选。`,
    },
    {
      question: `${name}免费吗？`,
      answer: `大部分${name}提供免费版或免费试用，部分高级功能需要付费。在本分类的每款工具详情页中，我们都标注了免费（free）、免费增值（freemium）或付费（paid）的价格模式，供你快速对比。`,
    },
    {
      question: `如何选择适合自己的${name}？`,
      answer: `建议从使用场景出发：先确定你需要的核心功能（对应本页的子分类），再对比工具的评分、价格模式和用户评价。TaoAI 编辑部的分类介绍与编辑评测提供了真实使用体验，可作为参考。`,
    },
  ];
}
