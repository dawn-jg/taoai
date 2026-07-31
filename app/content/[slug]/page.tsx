import { getToolBySlug, getAllTools } from '@/lib/tools';
import { notFound, permanentRedirect } from 'next/navigation';

export function generateStaticParams() {
  const tools = getAllTools();
  return tools
    .filter(t => t.detailed_content && t.detailed_content.length > 0)
    .map(t => ({ slug: t.slug }));
}

// 301 redirect /content/* -> /tools/*
export default function ContentPage({ params }: { params: { slug: string } }) {
  const tool = getToolBySlug(params.slug);
  if (!tool) notFound();
  permanentRedirect(`/tools/${tool.slug}`);
}
