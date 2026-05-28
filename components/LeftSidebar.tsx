'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { categories } from '@/lib/tools';

const secondaryNav = [
  { name: '📰 每日AI快讯', href: '/news' },
  { name: '📚 AI教程资源', href: '/tutorials' },
  { name: '📖 AI百科', href: '/tutorials' },
];

export default function LeftSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[220px] shrink-0 h-screen sticky top-0 overflow-y-auto bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="px-4 py-5 border-b border-gray-100">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl">🚀</span>
          <span className="text-base font-bold">
            Tao<span className="text-blue-600">AI</span>
          </span>
        </Link>
        <p className="text-xs text-gray-400 mt-1">发现最好的AI工具</p>
      </div>

      {/* Main Nav */}
      <nav className="flex-1 py-3 px-2 space-y-0.5">
        <Link href="/" className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors text-gray-700 hover:bg-gray-100">
          🏠 首页
        </Link>

        <div className="text-[11px] text-gray-400 font-medium px-3 pt-3 pb-1">AI工具分类</div>
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/categories/${cat.slug}`}
            className={`flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors ${
              pathname.includes(cat.slug)
                ? 'bg-blue-50 text-blue-700 font-medium'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <span className="flex items-center gap-2">
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </span>
            <span className="text-xs text-gray-400">{cat.count}</span>
          </Link>
        ))}

        <div className="border-t border-gray-100 my-2" />

        <div className="text-[11px] text-gray-400 font-medium px-3 pt-1 pb-1">更多内容</div>
        {secondaryNav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors ${
              pathname === item.href ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Bottom */}
      <div className="px-4 py-3 border-t border-gray-100 text-xs text-gray-400">
        <a href="https://taoai365.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">taoai365.com</a>
      </div>
    </aside>
  );
}
