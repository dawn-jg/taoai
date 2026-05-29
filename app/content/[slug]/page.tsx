import { getToolBySlug, getAllTools } from '@/lib/tools';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export function generateStaticParams() {
  const tools = getAllTools();
  return tools
    .filter(t => t.detailed_content && t.detailed_content.length > 0)
    .map(t => ({ slug: t.slug }));
}

export default function ContentPage({ params }: { params: { slug: string } }) {
  const tool = getToolBySlug(params.slug);
  if (!tool || !tool.detailed_content || tool.detailed_content.length === 0) {
    notFound();
  }

  const sections = tool.detailed_content;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link href="/content" className="text-blue-600 hover:text-blue-800 text-sm mb-3 inline-block">
            ← 返回内容索引
          </Link>
          <div className="flex items-center gap-4 mt-2">
            {tool.logo && (
              <img src={tool.logo} alt={tool.name} className="w-12 h-12 rounded" />
            )}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{tool.name}</h1>
              {tool.description && (
                <p className="text-gray-600 mt-1">{tool.description}</p>
              )}
            </div>
          </div>
          {tool.url && (
            <a href={tool.url} target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center gap-1 mt-3 text-sm text-blue-600 hover:text-blue-800">
              访问官网 ↗
            </a>
          )}
        </div>
      </div>

      {/* Table of Contents */}
      {sections.filter(s => s.title).length > 2 && (
        <div className="max-w-4xl mx-auto px-4 mt-6">
          <div className="bg-white rounded-lg border p-4">
            <h2 className="text-sm font-semibold text-gray-500 uppercase mb-2">目录</h2>
            <nav className="grid grid-cols-1 sm:grid-cols-2 gap-1">
              {sections.filter(s => s.title).map((section, i) => (
                <a key={i} href={`#section-${i}`}
                   className="text-sm text-blue-600 hover:text-blue-800 py-1">
                  {section.title}
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Content Sections */}
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {sections.map((section, i) => (
          <section key={i} id={`section-${i}`} className="bg-white rounded-lg border p-6">
            {section.title && (
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b">{section.title}</h2>
            )}
            <div
              className="prose prose-sm max-w-none text-gray-700"
              dangerouslySetInnerHTML={{ __html: section.html }}
            />
          </section>
        ))}
      </div>

      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: tool.name,
            description: tool.description,
            url: tool.url,
            applicationCategory: 'AI Tool',
          }),
        }}
      />
    </div>
  );
}