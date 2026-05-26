import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getToolBySlug, getCategories, getAllTools } from '@/lib/tools';
import { Metadata } from 'next';

export async function generateStaticParams() {
  return getAllTools().map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return { title: '未找到工具' };
  return { title: `${tool.name} - AI导航`, description: tool.description };
}

export default async function ToolDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const pricingLabel: Record<string, string> = { free: '免费', freemium: '免费增值', paid: '付费' };
  const pricingColor: Record<string, string> = { free: 'bg-green-100 text-green-700', freemium: 'bg-blue-100 text-blue-700', paid: 'bg-orange-100 text-orange-700' };
  const allCategories = getCategories();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-blue-600">首页</Link>
        <span className="mx-2">/</span>
        <Link href={`/categories/${tool.categories[0]}`} className="hover:text-blue-600">
          {allCategories.find(c => c.slug === tool.categories[0])?.name || tool.categories[0]}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{tool.name}</span>
      </nav>

      <div className="bg-white rounded-2xl border border-gray-200 p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{tool.name}</h1>
            <div className="flex items-center gap-3">
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${pricingColor[tool.pricing]}`}>
                {pricingLabel[tool.pricing]}
              </span>
              <div className="flex items-center gap-1 text-sm text-yellow-500">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                <span className="text-gray-700">{tool.rating}</span>
              </div>
            </div>
          </div>
          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            访问官网 →
          </a>
        </div>

        {/* Description */}
        <p className="text-gray-700 leading-relaxed mb-6">{tool.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tool.tags.map((tag) => (
            <span key={tag} className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full">{tag}</span>
          ))}
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {tool.categories.map((catSlug) => {
            const cat = allCategories.find(c => c.slug === catSlug);
            return (
              <Link
                key={catSlug}
                href={`/categories/${catSlug}`}
                className="text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-100"
              >
                {cat?.icon} {cat?.name || catSlug}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
