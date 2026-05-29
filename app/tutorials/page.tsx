import type { Metadata } from 'next';
import { getTutorials } from '@/lib/tools';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'AI教程资源 - AI工具集 | TaoAI',
  description: '精选 AI 工具的使用教程、上手指南与深度评测，帮你快速掌握各类 AI 产品的玩法与技巧。',
};

const CATEGORIES = ['AI教程', 'AI工具', '综合指南'];

export default function TutorialsPage() {
  const allTutorials = getTutorials();

  // Group by category
  const grouped: Record<string, typeof allTutorials> = {};
  for (const cat of CATEGORIES) {
    grouped[cat] = allTutorials.filter(t => t.category === cat);
  }
  // Uncategorized
  grouped['其他'] = allTutorials.filter(t => !CATEGORIES.includes(t.category));

  const totalNew = allTutorials.filter(t => t.is_new).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <h1 className="text-2xl font-bold">📚 AI教程资源</h1>
          <p className="text-blue-100 text-sm mt-2 max-w-2xl">
            精选 AI 工具的使用教程、上手指南与深度评测，帮你快速掌握各类 AI 产品的玩法与技巧，从入门到精通。
          </p>
          <div className="flex flex-wrap gap-3 mt-4 text-sm">
            <span className="bg-white/20 px-3 py-1 rounded-full">共 {allTutorials.length} 篇教程</span>
            {totalNew > 0 && (
              <span className="bg-red-500/30 px-3 py-1 rounded-full">{totalNew} 篇新内容</span>
            )}
            {CATEGORIES.map(cat => {
              const count = grouped[cat]?.length || 0;
              return count > 0 ? (
                <a key={cat} href={`#cat-${cat}`} className="bg-white/15 hover:bg-white/25 px-3 py-1 rounded-full transition-colors">
                  {cat} ({count})
                </a>
              ) : null;
            })}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-6 space-y-8">
        {Object.entries(grouped).map(([catName, tutorials]) => {
          if (tutorials.length === 0) return null;
          return (
            <section key={catName} id={`cat-${catName}`}>
              <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-1 h-4 bg-blue-600 rounded-full inline-block"></span>
                {catName}
                <span className="text-xs text-gray-400 font-normal">({tutorials.length})</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {tutorials.map((tutorial, i) => (
                  <a
                    key={tutorial.slug}
                    href={`/tutorials/${tutorial.slug}`}
                    className="group block bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-blue-200 transition-all"
                  >
                    {/* Thumbnail */}
                    <div className="aspect-video bg-gray-100 relative overflow-hidden">
                      {tutorial.thumbnail ? (
                        <img
                          src={tutorial.thumbnail}
                          alt={tutorial.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading={i < 3 ? 'eager' : 'lazy'}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300 text-4xl">
                          📚
                        </div>
                      )}
                      {/* Badges */}
                      <div className="absolute top-2 left-2 flex gap-1">
                        {tutorial.is_new && (
                          <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">新</span>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors leading-snug mb-2">
                        {tutorial.title}
                      </h3>
                      <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-3">
                        {tutorial.summary}
                      </p>

                      {/* Footer */}
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                          {tutorial.category || 'AI教程'}
                        </span>
                        <time>{tutorial.date}</time>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
