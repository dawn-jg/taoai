import Link from 'next/link';
import { categories } from '@/lib/tools';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">分类导航</h3>
            <ul className="space-y-2">
              {categories.slice(0, 5).map((cat) => (
                <li key={cat.slug}>
                  <Link href={`/categories/${cat.slug}`} className="text-sm text-gray-600 hover:text-blue-600">
                    {cat.icon} {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">更多分类</h3>
            <ul className="space-y-2">
              {categories.slice(5).map((cat) => (
                <li key={cat.slug}>
                  <Link href={`/categories/${cat.slug}`} className="text-sm text-gray-600 hover:text-blue-600">
                    {cat.icon} {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">内容</h3>
            <ul className="space-y-2">
              <li><Link href="/news" className="text-sm text-gray-600 hover:text-blue-600">📰 AI资讯</Link></li>
              <li><Link href="/tutorials" className="text-sm text-gray-600 hover:text-blue-600">📚 AI教程</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">关于</h3>
            <ul className="space-y-2">
              <li><span className="text-sm text-gray-500">TaoAI · 发现最好的AI工具</span></li>
              <li><span className="text-sm text-gray-500">已收录 {categories.reduce((s,c) => s + c.count, 0)}+ 款AI工具</span></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-500">© 2026 <a href="https://taoai365.com" className="hover:text-blue-600" target="_blank">taoai365.com</a> · 发现最好的AI工具</p>
        </div>
      </div>
    </footer>
  );
}
