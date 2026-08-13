import { getToolBySlug, getAllTools } from '@/lib/tools';
import { notFound, permanentRedirect } from 'next/navigation';

export function generateStaticParams() {
  // /content/* 已废弃，全部 301 → /tools/*。
  // 仍须生成全部 slug（Next.js output:export 要求动态路由 generateStaticParams 非空），
  // 生成的是纯 301 重定向页；robots.txt Disallow: /content/ 确保这些中转页不被索引。
  return getAllTools().map(t => ({ slug: t.slug }));
}

// 301 redirect /content/* -> /tools/*
export default function ContentPage({ params }: { params: { slug: string } }) {
  const tool = getToolBySlug(params.slug);
  if (!tool) notFound();
  permanentRedirect(`/tools/${tool.slug}`);
}
