import Link from 'next/link';
import { categories, getAllTools } from '@/lib/tools';

export default function Sidebar({ currentCategory }: { currentCategory?: string }) {
  const allTools = getAllTools();
  return (
    <aside className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">分类导航</h3>
        <nav className="space-y-1">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                currentCategory === cat.slug
                  ? 'bg-blue-50 text-blue-700 font-medium'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              <span>{cat.icon} {cat.name}</span>
              <span className="text-xs text-gray-400">{cat.count}</span>
            </Link>
          ))}
        </nav>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">推荐工具</h3>
        <div className="space-y-3">
          {allTools.filter(t => t.featured).slice(0, 5).map((tool) => (
            <Link key={tool.slug} href={`/tools/${tool.slug}`} className="block text-sm text-gray-600 hover:text-blue-600">
              <span className="font-medium text-gray-900">{tool.name}</span>
              <p className="text-xs text-gray-400 truncate mt-0.5">{tool.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
