'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar({ large = false }: { large?: boolean }) {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="搜索AI工具名称、功能、标签..."
          className={`w-full border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white ${
            large ? 'px-5 py-4 text-base' : 'px-4 py-3 text-sm'
          }`}
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white rounded-lg px-4 py-1.5 text-sm hover:bg-blue-700 transition-colors"
        >
          搜索
        </button>
      </div>
    </form>
  );
}
