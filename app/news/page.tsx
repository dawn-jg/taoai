import Link from 'next/link';
import { getNews } from '@/lib/tools';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '每日AI快讯 - AI工具集 | TaoAI',
  description: 'AI行业最新动态、产品发布、投融资信息，每日更新',
};

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  return `${d.getMonth() + 1}月${d.getDate()} · ${weekdays[d.getDay()]}`;
}

interface NewsItem {
  slug: string;
  title: string;
  summary: string;
  date: string;
  source: string;
  url?: string;
}

export default function NewsPage() {
  const news = getNews();
  news.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Group by date
  const grouped = new Map<string, NewsItem[]>();
  for (const item of news) {
    if (!grouped.has(item.date)) grouped.set(item.date, []);
    grouped.get(item.date)!.push(item);
  }
  const dates = Array.from(grouped.keys());

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      {/* Breadcrumb */}
      <nav className="text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-blue-600">
          首页
        </Link>
        <span className="mx-1">/</span>
        <span className="text-gray-600">每日AI快讯</span>
      </nav>

      {/* Title */}
      <h1 className="text-xl font-bold text-gray-900 mb-10">
        📰 每日AI快讯
      </h1>

      {/* Timeline */}
      <div className="space-y-12">
        {dates.map((date) => {
          const items = grouped.get(date) || [];
          return (
            <div key={date}>
              {/* Date header */}
              <div className="text-base font-semibold text-gray-400 mb-5">
                {formatDate(date)}
              </div>

              {/* News items for this date */}
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
                        {item.title}
                      </a>
                    ) : (
                      <h2 className="text-[15px] font-medium text-gray-900 mb-1.5">
                        {item.title}
                      </h2>
                    )}
                    <p className="text-sm text-gray-500 leading-relaxed mb-1.5">
                      {item.summary}
                    </p>
                    <span className="text-xs text-gray-350">
                      来源: {item.source}
                    </span>
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