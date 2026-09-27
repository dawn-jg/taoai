import type { Metadata } from 'next';
import Link from 'next/link';
import { getTutorialBySlug, getTutorials, isTutorialIndexable } from '@/lib/tools';
import { notFound } from 'next/navigation';
import { ArticleSchema, BreadcrumbSchema } from '@/components/StructuredData';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tutorial = getTutorialBySlug(slug);
  if (!tutorial) return { title: '未找到 - TaoAI' };
  return {
    title: `${tutorial.title} - AI教程 | TaoAI`,
    description: tutorial.summary || tutorial.title,
    alternates: { canonical: `https://taoai365.com/tutorials/${tutorial.slug}` },
    // 正文过短的教程（摘要 + 外链形态）暂不参与索引，避免稀薄内容被判定为低价值。
    robots: isTutorialIndexable(tutorial) ? undefined : { index: false, follow: true },
  };
}

export function generateStaticParams() {
  return getTutorials().map(t => ({ slug: t.slug }));
}

export default async function TutorialDetailPage({ params }: Props) {
  const { slug } = await params;
  const tutorial = getTutorialBySlug(slug);
  if (!tutorial) notFound();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back link */}
      <div className="max-w-3xl mx-auto px-4 pt-6">
        <Link href="/tutorials" className="text-sm text-blue-600 hover:text-blue-800 inline-flex items-center gap-1">
          ← 返回教程列表
        </Link>
      </div>

      <article className="max-w-3xl mx-auto px-4 py-6">
        {/* Thumbnail */}
        {tutorial.thumbnail && (
          <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden mb-8">
            <img src={tutorial.thumbnail} alt={tutorial.title} className="w-full h-full object-cover" />
          </div>
        )}

        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded">{tutorial.category || 'AI教程'}</span>
            {tutorial.is_new && <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded text-xs">新发布</span>}
            {tutorial.date && <time>{tutorial.date}</time>}
          </div>
          <h1 className="text-2xl font-bold text-gray-900 leading-snug">{tutorial.title}</h1>
          {tutorial.summary && <p className="text-gray-500 mt-3">{tutorial.summary}</p>}
          {/* 署名与更新时间（E-E-A-T） */}
          <p className="text-xs text-gray-400 mt-3">
            作者：<Link href="/about#editorial-team" className="text-blue-600 hover:underline">TaoAI 编辑部</Link>
            {tutorial.date ? <> · 发布于 <time dateTime={tutorial.date}>{tutorial.date}</time></> : null}
            {' '}· 引用规范见<Link href="/sources" className="text-blue-600 hover:underline">来源与引用规范</Link>
          </p>
        </header>

        {/* Content */}
        {tutorial.content ? (
          <div className="prose prose-gray max-w-none" dangerouslySetInnerHTML={{ __html: tutorial.content }} />
        ) : (
          <div className="text-center py-16 text-gray-400">
            <p className="text-5xl mb-4">📝</p>
            <p className="text-lg">教程内容加载中...</p>
            <p className="text-sm mt-2">请稍后再来查看</p>
          </div>
        )}

        <BreadcrumbSchema items={[
          { name: '首页', url: 'https://taoai365.com' },
          { name: 'AI教程', url: 'https://taoai365.com/tutorials' },
          { name: tutorial.title, url: `https://taoai365.com/tutorials/${tutorial.slug}` },
        ]} />
        <ArticleSchema
          title={tutorial.title}
          description={tutorial.summary || tutorial.title}
          date={tutorial.date || '2026-07-01'}
          author="TaoAI 编辑部"
          url={`https://taoai365.com/tutorials/${tutorial.slug}`}
        />
      </article>
    </div>
  );
}
