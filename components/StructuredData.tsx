// components/StructuredData.tsx
// 统一 JSON-LD 结构化数据组件，覆盖 Organization / WebSite / BreadcrumbList

import { EditorialItem } from '@/types';

// ─── Site-wide: Organization + WebSite + SearchAction ───
export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'TaoAI',
    url: 'https://taoai365.com',
    description: '独立AI工具导航站，收录1200+款AI工具，编辑部真实评测，优缺点分析',
    sameAs: [],
    logo: 'https://taoai365.com/favicon.svg',
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

export function WebSiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'TaoAI',
    url: 'https://taoai365.com',
    description: '独立AI工具导航站，收录1200+款AI工具',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://taoai365.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

// ─── BreadcrumbList ───
export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

// ─── Tool detail: SoftwareApplication ───
export function ToolSchema({ tool, editorial }: { tool: any; editorial?: EditorialItem }) {
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: tool.description,
    url: tool.url,
    applicationCategory: 'AIApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'CNY',
    },
  };

  if (tool.rating) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: tool.rating,
      bestRating: '5',
      ratingCount: 1,
    };
  }

  if (editorial) {
    schema.review = {
      '@type': 'Review',
      author: { '@type': 'Person', name: editorial.author },
      datePublished: editorial.date,
      reviewBody: editorial.summary,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: editorial.rating,
        bestRating: '5',
      },
    };
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

// ─── Article (News / Tutorial) ───
export function ArticleSchema({ title, description, date, author, url }: { title: string; description: string; date: string; author: string; url: string }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    datePublished: date,
    author: { '@type': 'Person', name: author },
    publisher: { '@type': 'Organization', name: 'TaoAI', logo: { '@type': 'ImageObject', url: 'https://taoai365.com/favicon.svg' } },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

// ─── FAQPage (for tutorial detail pages with Q&A structure) ───
export function FAQSchema({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
