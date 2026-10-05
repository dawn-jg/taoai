import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getNews,
  getNewsDetail,
  isNewsIndexable,
  getRelatedToolsForNews,
} from '@/lib/tools';
import { ArticleSchema, BreadcrumbSchema } from '@/components/StructuredData';
import ToolLogo from '@/components/ToolLogo';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getNews().map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getNews().find((n) => n.slug === slug);
  if (!item) return { title: '未找到 - TaoAI' };

  return {
    title: `${item.title} - AI快讯 | TaoAI`,
    description: item.summary.slice(0, 150),
    alternates: { canonical: `https://taoai365.com/news/${item.slug}` },
    // 只有摘要 + 原创解读达到最低体量的快讯才参与索引；
    // 信息量不足的条目保留可访问性，输出 noindex,follow。
    robots: isNewsIndexable(item) ? undefined : { index: false, follow: true },
  };
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  return `${d.getFullYear()} 年 ${d.getMonth() + 1} 月 ${d.getDate()} 日 · ${weekdays[d.getDay()]}`;
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = getNews().find((n) => n.slug === slug);
  if (!item) notFound();

  const detail = getNewsDetail(item.slug);
  const related = getRelatedToolsForNews(item.slug);

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      {/* Breadcrumb */}
      <nav className="text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-blue-600">首页</Link>
        <span className="mx-1">/</span>
        <Link href="/news" className="hover:text-blue-600">每日AI快讯</Link>
        <span className="mx-1">/</span>
        <span className="text-gray-600">详情</span>
      </nav>

      <article>
        {/* Header */}
        <header className="mb-6">
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
            <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
              {item.source}
            </span>
            <time dateTime={item.date}>{formatDate(item.date)}</time>
          </div>
          <h1 className="text-xl font-bold text-gray-900 leading-snug mb-3">{item.title}</h1>
          <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 border-l-4 border-gray-300 p-3 rounded-r">
            {item.summary}
          </p>
          {item.url && (
            <p className="text-xs text-gray-400 mt-2">
              原始来源：
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="text-blue-600 hover:underline ml-1"
              >
                {item.source}
              </a>
            </p>
          )}
        </header>

        {/* 原创解读 */}
        {detail && detail.content ? (
          <div
            className="tool-content prose-sm text-sm text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: detail.content }}
          />
        ) : (
          <p className="text-xs text-gray-400 leading-relaxed">
            本条快讯暂未附编辑部解读。你可以先阅读上方摘要与原始来源，
            或浏览
            <Link href="/search" className="text-blue-600 hover:underline mx-1">工具库</Link>
            中相关的产品。
          </p>
        )}

        {/* 相关工具 */}
        {related.length > 0 && (
          <div className="mt-6 bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="text-base font-bold text-gray-900 mb-3">相关工具</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {related.map((t) => (
                <Link
                  key={t.slug}
                  href={`/tools/${t.slug}`}
                  className="block bg-gray-50 hover:bg-blue-50 border border-gray-100 rounded-lg p-3 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    {t.logo && (
                      <ToolLogo
                        src={t.logo}
                        domain={t.domain}
                        alt=""
                        className="w-8 h-8 rounded-md shrink-0 bg-white object-contain p-0.5"
                      />
                    )}
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold text-gray-900 truncate">{t.name}</h3>
                      <p className="text-xs text-gray-500 truncate">{t.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* 署名与来源说明 */}
        <div className="mt-6 bg-gray-50 rounded-xl border border-gray-200 p-4 text-xs text-gray-500 leading-relaxed">
          <p>
            本页由{' '}
            <Link href="/about#editorial-team" className="text-blue-600 hover:underline">TaoAI 编辑部</Link>{' '}
            整理并撰写解读 · 快讯日期 {item.date}
            {detail ? ` · 解读最后更新 ${detail.updated || '2026-10-05'}` : ''}
          </p>
          <p className="mt-1">
            快讯摘要基于公开报道整理，事实以原始来源为准；「为什么值得关注」等段落为本站分析性观点，
            仅基于摘要中已陈述的事实做推论。引用与纠错规则见
            <Link href="/sources" className="text-blue-600 hover:underline mx-1">来源与引用规范</Link>。
          </p>
        </div>

        <div className="mt-6">
          <Link href="/news" className="text-sm text-blue-600 hover:text-blue-800 inline-flex items-center gap-1">
            ← 返回快讯列表
          </Link>
        </div>
      </article>

      <BreadcrumbSchema items={[
        { name: '首页', url: 'https://taoai365.com' },
        { name: '每日AI快讯', url: 'https://taoai365.com/news' },
        { name: item.title, url: `https://taoai365.com/news/${item.slug}` },
      ]} />
      <ArticleSchema
        title={item.title}
        description={item.summary.slice(0, 150)}
        date={item.date}
        author="TaoAI 编辑部"
        url={`https://taoai365.com/news/${item.slug}`}
      />
    </div>
  );
}
