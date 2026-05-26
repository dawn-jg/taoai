import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getCategoryBySlug, getToolsByCategory, getCategories } from '@/lib/tools';
import ToolCard from '@/components/ToolCard';
import Sidebar from '@/components/Sidebar';
import { Metadata } from 'next';

export async function generateStaticParams() {
  return getCategories().map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) return { title: '分类未找到' };
  return { title: `${cat.name} - AI导航`, description: cat.description };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) notFound();

  const tools = getToolsByCategory(category);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-blue-600">首页</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{cat.name}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-64 shrink-0">
          <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">分类导航</h3>
            <nav className="space-y-1">
              {getCategories().map((c) => (
                <Link
                  key={c.slug}
                  href={`/categories/${c.slug}`}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                    category === c.slug
                      ? 'bg-blue-50 text-blue-700 font-medium'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  <span>{c.icon} {c.name}</span>
                  <span className="text-xs text-gray-400">{c.count}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">{cat.icon}</span>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{cat.name}</h1>
                <p className="text-gray-500 text-sm">{cat.description}</p>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">共 {tools.length} 款工具</p>
          </div>

          {tools.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              <p className="text-lg">该分类暂无工具</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  className="block bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg hover:border-blue-200 transition-all duration-200"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-gray-900 text-base">{tool.name}</h3>
                    <span className={`shrink-0 ml-2 text-xs font-medium px-2 py-0.5 rounded-full ${
                      tool.pricing === 'free' ? 'bg-green-100 text-green-700' : tool.pricing === 'freemium' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {{ free: '免费', freemium: '免费增值', paid: '付费' }[tool.pricing]}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">{tool.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {tool.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md">{tag}</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-yellow-500 shrink-0 ml-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                      <span className="text-gray-500">{tool.rating}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
