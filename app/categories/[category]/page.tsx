import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getCategoryBySlug, getToolsByCategory, getCategories } from '@/lib/tools';
import { Metadata } from 'next';
import ToolCard from '@/components/ToolCard';
import { SubcategoryGrid } from '@/components/SubcategoryGrid';

export async function generateStaticParams() {
  return getCategories().map(c => ({ category: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const cat = getCategoryBySlug((await params).category);
  if (!cat) return { title: '未找到' };
  return { title: `${cat.name} - AI工具集 | TaoAI`, description: cat.description };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) notFound();

  const tools = getToolsByCategory(category);
  const subcats = cat.subcategories || {};

  return (
    <div className="max-w-6xl mx-auto px-6 py-6">
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
    </div>
  );
}
