import type { Metadata } from 'next';
import { getTutorials } from '@/lib/tools';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'AI教程资源 - AI工具集 | TaoAI',
  description: '精选 AI 工具的使用教程、上手指南与深度评测，帮你快速掌握各类 AI 产品的玩法与技巧。',
};

// Slug → section label mapping
const SECTION_ORDER = [
  { key: 'coding', label: 'AI编程开发' },
  { key: 'video', label: 'AI视频生成' },
  { key: 'image', label: 'AI绘画设计' },
  { key: 'llm', label: '大模型评测' },
  { key: 'agent', label: 'AI Agent / OpenClaw' },
  { key: 'office', label: 'AI办公写作' },
  { key: 'other', label: '综合指南' },
];

function getSection(slug: string): string {
  const s = slug.toLowerCase();
  if (s.includes('cursor') || s.includes('vibe-coding') || s.includes('codex') || s.includes('claude-code') || s.includes('ai-coding')) return 'coding';
  if (s.includes('seedance') || s.includes('kling') || s.includes('video') || s.includes('sora') || s.includes('pixverse') || s.includes('pika') || s.includes('wan-')) return 'video';
  if (s.includes('midjourney') || s.includes('jimeng-image') || s.includes('ai-painting') || s.includes('drawing')) return 'image';
  if (s.includes('deepseek') || s.includes('llm-') || s.includes('domestic-llm') || s.includes('kimi-k') || s.includes('glm') || s.includes('qwen') || s.includes('gpt-') || s.includes('gemini')) return 'llm';
  if (s.includes('openclaw') || s.includes('clawdbot') || s.includes('agent') || s.includes('dingtalk') || s.includes('feishu')) return 'agent';
  if (s.includes('thesis') || s.includes('writing') || s.includes('officeai') || s.includes('office-ai') || s.includes('microsoft-365') || s.includes('copilot') || s.includes('ai-tools-ordinary') || s.includes('best-ai-tools')) return 'office';
  return 'other';
}

export default function TutorialsPage() {
  const allTutorials = getTutorials();

  // Group by section
  const grouped = new Map<string, typeof allTutorials>();
  for (const t of allTutorials) {
    const sec = getSection(t.slug);
    if (!grouped.has(sec)) grouped.set(sec, []);
    grouped.get(sec)!.push(t);
  }

  const totalNew = allTutorials.filter(t => t.is_new).length;

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      {/* Breadcrumb */}
      <nav className="text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-blue-600">
          首页
        </Link>
        <span className="mx-1">/</span>
        <span className="text-gray-600">AI教程资源</span>
      </nav>

      {/* Title */}
      <div className="mb-10">
        <h1 className="text-xl font-bold text-gray-900">📚 AI教程资源</h1>
        <p className="text-sm text-gray-400 mt-1">
          精选 AI 工具的使用教程、上手指南与深度评测，共 {allTutorials.length} 篇{totalNew > 0 ? `，${totalNew} 篇新内容` : ''}
        </p>
      </div>

      {/* Section list */}
      <div className="space-y-12">
        {SECTION_ORDER.map(({ key, label }) => {
          const items = grouped.get(key) || [];
          if (items.length === 0) return null;
          return (
            <div key={key}>
              <div className="text-base font-semibold text-gray-400 mb-5">
                {label}
              </div>
              <div className="space-y-6">
                {items.map((item) => (
                  <article key={item.slug}>
                    {item.url ? (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[15px] font-medium text-blue-600 hover:text-blue-800 hover:underline decoration-blue-300 underline-offset-2 mb-1.5 inline-block"
                      >
                        {item.is_new && (
                          <span className="inline-block bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded mr-1.5 align-middle">新</span>
                        )}
                        {item.title}
                      </a>
                    ) : (
                      <h2 className="text-[15px] font-medium text-gray-900 mb-1.5">
                        {item.title}
                      </h2>
                    )}
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {item.summary}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
