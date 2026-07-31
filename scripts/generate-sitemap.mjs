// scripts/generate-sitemap.mjs
// 生成增强版 sitemap.xml：含 changefreq、image sitemap、news sitemap

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const TOOLS = JSON.parse(readFileSync(join(__dirname, '..', 'data', 'tools.json'), 'utf-8'));
const NEWS = JSON.parse(readFileSync(join(__dirname, '..', 'data', 'news.json'), 'utf-8'));
const CATEGORIES = JSON.parse(readFileSync(join(__dirname, '..', 'data', 'categories.json'), 'utf-8'));
const TUTORIALS = JSON.parse(readFileSync(join(__dirname, '..', 'data', 'tutorials.json'), 'utf-8'));

const BASE_URL = 'https://taoai365.com';

function esc(v) { return String(v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;'); }

const urls = [];

// --- Core pages ---
urls.push({ loc: `${BASE_URL}/`, changefreq: 'daily', priority: '1.0' });
urls.push({ loc: `${BASE_URL}/about`, changefreq: 'monthly', priority: '0.5' });
urls.push({ loc: `${BASE_URL}/contact`, changefreq: 'monthly', priority: '0.3' });
urls.push({ loc: `${BASE_URL}/privacy`, changefreq: 'yearly', priority: '0.2' });
urls.push({ loc: `${BASE_URL}/news`, changefreq: 'daily', priority: '0.8' });
urls.push({ loc: `${BASE_URL}/tutorials`, changefreq: 'weekly', priority: '0.7' });
urls.push({ loc: `${BASE_URL}/search`, changefreq: 'weekly', priority: '0.4' });

// --- Categories ---
CATEGORIES.forEach(c => {
  urls.push({ loc: `${BASE_URL}/categories/${c.slug}`, changefreq: 'weekly', priority: '0.8' });
});

// --- Tools (with image sitemap) ---
TOOLS.forEach(t => {
  const images = [];
  if (t.screenshots && t.screenshots.length > 0) {
    t.screenshots.forEach(src => {
      images.push({ image_loc: src });
    });
  }
  if (t.logo) {
    images.push({ image_loc: t.logo, image_title: `${t.name} logo` });
  }

  urls.push({
    loc: `${BASE_URL}/tools/${t.slug}`,
    changefreq: 'monthly',
    priority: t.featured ? '0.8' : '0.6',
    images,
  });
});

// --- News ---
NEWS.forEach(n => {
  const d = n.date.replace(/\//g, '-');
  urls.push({
    loc: `${BASE_URL}/news/${n.slug}`,
    changefreq: 'never',
    priority: '0.5',
    lastmod: d,
    news: { name: 'TaoAI', language: 'zh', publication_date: d, title: n.title },
  });
});

// --- Tutorials ---
TUTORIALS.forEach(t => {
  urls.push({
    loc: `${BASE_URL}/tutorials/${t.slug}`,
    changefreq: 'monthly',
    priority: t.is_new ? '0.7' : '0.5',
  });
});

// --- Build XML ---
const today = new Date().toISOString().split('T')[0];

let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"';
xml += ' xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"';
xml += ' xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">\n';

urls.forEach(u => {
  xml += '  <url>\n';
  xml += `    <loc>${esc(u.loc)}</loc>\n`;
  xml += `    <lastmod>${esc(u.lastmod || today)}</lastmod>\n`;
  xml += `    <changefreq>${esc(u.changefreq)}</changefreq>\n`;
  xml += `    <priority>${esc(u.priority)}</priority>\n`;

  if (u.images && u.images.length > 0) {
    u.images.forEach(img => {
      xml += '    <image:image>\n';
      xml += `      <image:loc>${esc(img.image_loc)}</image:loc>\n`;
      if (img.image_title) xml += `      <image:title>${esc(img.image_title)}</image:title>\n`;
      xml += '    </image:image>\n';
    });
  }

  if (u.news) {
    xml += '    <news:news>\n';
    xml += '      <news:publication>\n';
    xml += `        <news:name>${esc(u.news.name)}</news:name>\n`;
    xml += `        <news:language>${esc(u.news.language)}</news:language>\n`;
    xml += '      </news:publication>\n';
    xml += `      <news:publication_date>${esc(u.news.publication_date)}</news:publication_date>\n`;
    xml += `      <news:title>${esc(u.news.title)}</news:title>\n`;
    xml += '    </news:news>\n';
  }

  xml += '  </url>\n';
});

xml += '</urlset>\n';

const outDir = join(__dirname, '..', 'public');
writeFileSync(join(outDir, 'sitemap.xml'), xml, 'utf-8');
console.log(`Generated sitemap.xml with ${urls.length} URLs (${xml.length} bytes)`);
