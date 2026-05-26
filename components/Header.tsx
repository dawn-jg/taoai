'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center px-6">
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
        <div className="text-sm text-gray-500">
          <Link href="/" className="text-blue-600 hover:underline">首页</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-400">发现最好的AI工具</span>
        </div>
        <form onSubmit={handleSearch} className="flex items-center">
          <input
            type="text" value={query} onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索AI工具..."
            className="w-56 pl-3 pr-8 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-gray-50"
          />
          <button type="submit" className="-ml-7 text-gray-400 hover:text-blue-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </form>
      </div>
    </header>
  );
}
