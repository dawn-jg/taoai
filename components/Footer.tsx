import Link from 'next/link';
import { categories } from '@/lib/tools';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <h4 className="text-xs font-semibold text-gray-900 mb-2">分类</h4>
            <ul className="space-y-1">
              {categories.slice(0,4).map(c => (
                <li key={c.slug}><Link href={`/categories/${c.slug}`} className="text-xs text-gray-500 hover:text-blue-600">{c.icon} {c.name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-gray-900 mb-2">分类</h4>
            <ul className="space-y-1">
              {categories.slice(4,8).map(c => (
                <li key={c.slug}><Link href={`/categories/${c.slug}`} className="text-xs text-gray-500 hover:text-blue-600">{c.icon} {c.name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-gray-900 mb-2">分类</h4>
            <ul className="space-y-1">
              {categories.slice(8,12).map(c => (
                <li key={c.slug}><Link href={`/categories/${c.slug}`} className="text-xs text-gray-500 hover:text-blue-600">{c.icon} {c.name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-gray-900 mb-2">关于</h4>
            <ul className="space-y-1">
              <li className="text-xs text-gray-500">TaoAI · 发现最好的AI工具</li>
              <li className="text-xs text-gray-500">已收录 {categories.reduce((s,c)=>s+c.count,0)}+ 款</li>
              <li><a href="https://taoai365.com" className="text-xs text-gray-500 hover:text-blue-600" target="_blank">taoai365.com</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
