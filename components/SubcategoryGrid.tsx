'use client';

import { useState } from 'react';
import ToolCard from '@/components/ToolCard';

export function SubcategoryGrid({ tools, subcats }: {
  tools: any[];
  subcats: Record<string, string>;
}) {
  const [activeSub, setActiveSub] = useState('');

  const filtered = activeSub ? tools.filter(t => t.subcategory === activeSub) : tools;

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setActiveSub('')}
          className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${
            !activeSub
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600'
          }`}
        >
          全部
        </button>
        {Object.entries(subcats).map(([slug, name]) => (
          <button
            key={slug}
            onClick={() => setActiveSub(slug)}
            className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${
              activeSub === slug
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600'
            }`}
          >
            {name}
          </button>
        ))}
      </div>
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-500 text-sm">该分类暂无工具</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filtered.map(t => <ToolCard key={t.slug} tool={t} />)}
        </div>
      )}
    </>
  );
}
