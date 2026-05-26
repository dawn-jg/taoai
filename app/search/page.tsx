'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { searchTools } from '@/lib/tools';
import ToolCard from '@/components/ToolCard';
import { Suspense } from 'react';

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const results = query ? searchTools(query) : [];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-blue-600">首页</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">搜索</span>
      </nav>

      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        {query ? `搜索结果: "${query}"` : '搜索AI工具'}
      </h1>
      {query && <p className="text-sm text-gray-500 mb-6">找到 {results.length} 个结果</p>}

      {!query ? (
        <div className="text-center py-16 text-gray-500">
          <p className="text-lg">请输入搜索关键词</p>
        </div>
      ) : results.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <p className="text-lg mb-2">未找到匹配的工具</p>
          <p className="text-sm">试试其他关键词，如 &quot;ChatGPT&quot;、&quot;AI写作&quot;、&quot;免费&quot;</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="text-center py-16 text-gray-500">加载中...</div>}>
      <SearchResults />
    </Suspense>
  );
}
