'use client';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { searchTools } from '@/lib/tools';
import ToolCard from '@/components/ToolCard';
import { Suspense } from 'react';

function Results() {
  const q = useSearchParams().get('q') || '';
  const results = q ? searchTools(q) : [];
  return (
    <div className="max-w-6xl mx-auto px-6 py-6">
      <nav className="text-xs text-gray-400 mb-4">
        <Link href="/" className="hover:text-blue-600">首页</Link><span className="mx-1">/</span><span className="text-gray-600">搜索</span>
      </nav>
      <h1 className="text-lg font-bold text-gray-900 mb-1">{q ? `搜索结果: "${q}"` : '搜索AI工具'}</h1>
      {q && <p className="text-xs text-gray-500 mb-4">找到 {results.length} 个结果</p>}
      {!q ? <div className="text-center py-16 text-gray-500 text-sm">请输入搜索关键词</div> :
       results.length === 0 ? <div className="text-center py-16 text-gray-500"><p className="text-sm mb-1">未找到匹配的工具</p><p className="text-xs">试试其他关键词</p></div> :
       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">{results.map(t => <ToolCard key={t.slug} tool={t} />)}</div>}
    </div>
  );
}

export default function SearchPage() {
  return <Suspense fallback={<div className="text-center py-16 text-gray-500 text-sm">加载中...</div>}><Results /></Suspense>;
}
