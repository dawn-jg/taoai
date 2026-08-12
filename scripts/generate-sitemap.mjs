// scripts/generate-sitemap.mjs
// 拆分版 sitemap：sitemap-index.xml → tools.xml / categories.xml / news.xml / tutorials.xml / static-pages.xml
// 每类独立 changefreq/priority/lastmod；tools.xml 含 image sitemap，news.xml 含 news sitemap。
// 同步更新 robots.txt 的 Sitemap 指向 sitemap-index.xml。

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const TOOLS = JSON.parse(readFileSync(join(ROOT, 'data', 'tools.json'), 'utf-8'));
const NEWS = JSON.parse(readFileSync(join(ROOT, 'data', 'news.json'), 'utf-8'));
const CATEGORIES = JSON.parse(readFileSync(join(ROOT, 'data', 'categories.json'), 'utf-8'));
const TUTORIALS = JSON.parse(readFileSync(join(ROOT, 'data', 'tutorials.json'), 'utf-8'));

const BASE_URL = 'https://taoai365.com';
const today = new Date().toISOString().split('T')[0];

function esc(v) {
  return String(v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

function urlsetXml(nsExtras, urls) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"';
  if (nsExtras) xml += nsExtras;
  xml += '>\n';
  urls.forEach(u => {
    xml += '  <url>\n';
    xml += `    <loc>${esc(u.loc)}</loc>\n`;
    if (u.lastmod) xml += `    <lastmod>${esc(u.lastmod)}</lastmod>\n`;
    if (u.changefreq) xml += `    <changefreq>${esc(u.changefreq)}</changefreq>\n`;
    if (u.priority) xml += `    <priority>${esc(u.priority)}</priority>\n`;
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
  return xml;
}

function indexXml(sitemaps) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  sitemaps.forEach(s => {
    xml += '  <sitemap>\n';
    xml += `    <loc>${esc(s.loc)}</loc>\n`;
    if (s.lastmod) xml += `    <lastmod>${esc(s.lastmod)}</lastmod>\n`;
    xml += '  </sitemap>\n';
  });
  xml += '</sitemapindex>\n';
  return xml;
}

// ─── static pages ───
const staticUrls = [
  { loc: `${BASE_URL}/`, changefreq: 'daily', priority: '1.0', lastmod: today },
  { loc: `${BASE_URL}/news`, changefreq: 'daily', priority: '0.8', lastmod: today },
  { loc: `${BASE_URL}/tutorials`, changefreq: 'weekly', priority: '0.7' },
  { loc: `${BASE_URL}/about`, changefreq: 'monthly', priority: '0.5' },
  { loc: `${BASE_URL}/editorial-policy`, changefreq: 'monthly', priority: '0.5' },
  { loc: `${BASE_URL}/search`, changefreq: 'weekly', priority: '0.4' },
  { loc: `${BASE_URL}/contact`, changefreq: 'monthly', priority: '0.3' },
  { loc: `${BASE_URL}/privacy`, changefreq: 'yearly', priority: '0.2' },
];

// ─── categories ───
const categoryUrls = CATEGORIES.map(c => ({
  loc: `${BASE_URL}/categories/${c.slug}`,
  changefreq: 'weekly',
  priority: '0.8',
}));

// ─── tools（含 image） ───
const toolUrls = TOOLS.map(t => {
  const images = [];
  if (t.screenshots && t.screenshots.length > 0) {
    t.screenshots.forEach(src => images.push({ image_loc: src }));
  }
  if (t.logo) images.push({ image_loc: t.logo, image_title: `${t.name} logo` });
  return {
    loc: `${BASE_URL}/tools/${t.slug}`,
    changefreq: 'monthly',
    priority: t.featured ? '0.8' : '0.6',
    images,
  };
});

// ─── news（含 news sitemap） ───
const newsUrls = NEWS.map(n => {
  const d = n.date.replace(/\//g, '-');
  return {
    loc: `${BASE_URL}/news/${n.slug}`,
    changefreq: 'never',
    priority: '0.5',
    lastmod: d,
    news: { name: 'TaoAI', language: 'zh', publication_date: d, title: n.title },
  };
});

// ─── tutorials ───
const tutorialUrls = TUTORIALS.map(t => ({
  loc: `${BASE_URL}/tutorials/${t.slug}`,
  changefreq: 'monthly',
  priority: t.is_new ? '0.7' : '0.5',
}));

// ─── write files ───
const outDir = join(ROOT, 'public');
const IMG_NS = ' xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"';
const NEWS_NS = ' xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"';

const files = [
  ['tools.xml', urlsetXml(IMG_NS, toolUrls)],
  ['categories.xml', urlsetXml(null, categoryUrls)],
  ['news.xml', urlsetXml(NEWS_NS, newsUrls)],
  ['tutorials.xml', urlsetXml(null, tutorialUrls)],
  ['static-pages.xml', urlsetXml(null, staticUrls)],
];

files.forEach(([name, xml]) => {
  writeFileSync(join(outDir, name), xml, 'utf-8');
  console.log(`Generated ${name} (${xml.length} bytes)`);
});

const sitemapIndex = indexXml([
  { loc: `${BASE_URL}/tools.xml`, lastmod: today },
  { loc: `${BASE_URL}/categories.xml`, lastmod: today },
  { loc: `${BASE_URL}/news.xml`, lastmod: today },
  { loc: `${BASE_URL}/tutorials.xml`, lastmod: today },
  { loc: `${BASE_URL}/static-pages.xml`, lastmod: today },
]);
writeFileSync(join(outDir, 'sitemap-index.xml'), sitemapIndex, 'utf-8');
console.log(`Generated sitemap-index.xml (${sitemapIndex.length} bytes)`);

// 为兼容旧引用，sitemap.xml 保留为 index 的副本（robots 指向 sitemap-index.xml）
writeFileSync(join(outDir, 'sitemap.xml'), sitemapIndex, 'utf-8');
console.log('sitemap.xml updated (mirror of sitemap-index.xml)');

// ─── update robots.txt Sitemap 指向 ───
const robotsPath = join(outDir, 'robots.txt');
let robots = readFileSync(robotsPath, 'utf-8');
robots = robots.replace(/Sitemap: [^\r\n]+/g, `Sitemap: ${BASE_URL}/sitemap-index.xml`);
writeFileSync(robotsPath, robots, 'utf-8');
console.log('robots.txt Sitemap line updated');
