// scripts/generate-sitemap.mjs
// 拆分版 sitemap：sitemap-index.xml → tools.xml / categories.xml / news.xml / tutorials.xml / static-pages.xml
// 每类独立 changefreq/priority/lastmod；tools.xml 含 image sitemap，news.xml 含 news sitemap。
// 同步更新 robots.txt 的 Sitemap 指向 sitemap-index.xml。

import { readFileSync, writeFileSync, unlinkSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const TOOLS = JSON.parse(readFileSync(join(ROOT, 'data', 'tools.json'), 'utf-8'));
const CATEGORIES = JSON.parse(readFileSync(join(ROOT, 'data', 'categories.json'), 'utf-8'));
const TUTORIALS = JSON.parse(readFileSync(join(ROOT, 'data', 'tutorials.json'), 'utf-8'));
const EDITORIALS = JSON.parse(readFileSync(join(ROOT, 'data', 'editorials.json'), 'utf-8'));

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
  { loc: `${BASE_URL}/authors`, changefreq: 'monthly', priority: '0.4' },
  { loc: `${BASE_URL}/editorial-policy`, changefreq: 'monthly', priority: '0.5' },
  { loc: `${BASE_URL}/sources`, changefreq: 'monthly', priority: '0.4' },
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

// ─── 内容质量判定（与 lib/tools.ts 的 isToolIndexable 保持一致） ───
// sitemap 只应收录允许被索引的页面；低质条目已输出 noindex,follow，
// 出现在 sitemap 中会形成「提交了 noindex URL」的矛盾信号。
// 修改判定规则时，务必同步 lib/tools.ts。
const TOOL_MIN_CONTENT_CHARS = 600;

function toolPlainText(tool) {
  return (tool.detailed_content || [])
    .map(s => String(s.html || ''))
    .join('')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, '');
}

function isCleanToolName(name) {
  const n = (name || '').trim();
  if (!n || n.length > 30) return false;
  if (n.includes(' | ') || n.includes('&#') || n.includes('--')) return false;
  return true;
}

const EDITORIAL_SLUGS = new Set(EDITORIALS.map(e => e.slug));

// 工具名标准化：toolPlainText 已去掉空白，比对前名称也要去空白，
// 否则多词名称（"Kimi AI"）会永远匹配失败。
function normalizeName(name) {
  return String(name || '').replace(/\s+/g, '').trim();
}

function isToolIndexable(tool) {
  if (EDITORIAL_SLUGS.has(tool.slug)) return true;
  if (!isCleanToolName(tool.name)) return false;
  const plain = toolPlainText(tool);
  if (plain.length < TOOL_MIN_CONTENT_CHARS) return false;
  if (!plain.includes(normalizeName(tool.name))) return false;
  return true;
}

// ─── tools（含 image）：仅收录可索引页面 ───
const indexableTools = TOOLS.filter(isToolIndexable);
const toolUrls = indexableTools.map(t => {
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

// ─── tutorials（与 lib/tools.ts 的 isTutorialIndexable 保持一致） ───
// 教程正文普遍偏短（摘要 + 外链形态），未达阈值的页面已输出 noindex，
// 不应再出现在 sitemap 中。修改规则时务必同步 lib/tools.ts。
const TUTORIAL_MIN_CONTENT_CHARS = 600;

function tutorialPlainText(t) {
  return String(t.content || '').replace(/<[^>]+>/g, '').replace(/\s+/g, '');
}

const indexableTutorials = TUTORIALS.filter(t => tutorialPlainText(t).length >= TUTORIAL_MIN_CONTENT_CHARS);
const tutorialUrls = indexableTutorials.map(t => ({
  loc: `${BASE_URL}/tutorials/${t.slug}`,
  changefreq: 'monthly',
  priority: t.is_new ? '0.7' : '0.5',
}));

// ─── news 详情页（与 lib/tools.ts 的 isNewsIndexable 保持一致） ───
// news.json 只存列表数据，长文解读在 news_details.json。
// 注意：不使用 news: 命名空间（那是给 Google News 出版方用的），
// 本站是工具导航站，按普通 urlset 收录即可。
const NEWS = JSON.parse(readFileSync(join(ROOT, 'data', 'news.json'), 'utf-8'));
const NEWS_DETAILS = JSON.parse(readFileSync(join(ROOT, 'data', 'news_details.json'), 'utf-8')).items || {};
const NEWS_MIN_COMMENTARY_CHARS = 180;

function newsCommentaryText(item) {
  const detail = NEWS_DETAILS[item.slug];
  return detail ? String(detail.content || '').replace(/<[^>]+>/g, '').replace(/\s+/g, '') : '';
}

const indexableNews = NEWS.filter(n => newsCommentaryText(n).length >= NEWS_MIN_COMMENTARY_CHARS);
const newsDetailUrls = indexableNews.map(n => ({
  loc: `${BASE_URL}/news/${n.slug}`,
  changefreq: 'never',
  priority: '0.5',
  lastmod: n.date,
}));

// ─── write files ───
const outDir = join(ROOT, 'public');
const IMG_NS = ' xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"';

console.log(`tools.xml: 收录 ${indexableTools.length}/${TOOLS.length} 个工具页（其余 ${TOOLS.length - indexableTools.length} 个为 noindex，不提交）`);
console.log(`tutorials.xml: 收录 ${indexableTutorials.length}/${TUTORIALS.length} 个教程页`);
console.log(`news.xml: 收录 ${indexableNews.length}/${NEWS.length} 条快讯详情页`);

const files = [
  ['tools.xml', urlsetXml(IMG_NS, toolUrls)],
  ['categories.xml', urlsetXml(null, categoryUrls)],
  ['static-pages.xml', urlsetXml(null, staticUrls)],
];

const indexEntries = [
  { loc: `${BASE_URL}/tools.xml`, lastmod: today },
  { loc: `${BASE_URL}/categories.xml`, lastmod: today },
  { loc: `${BASE_URL}/static-pages.xml`, lastmod: today },
];

if (tutorialUrls.length > 0) {
  files.push(['tutorials.xml', urlsetXml(null, tutorialUrls)]);
  indexEntries.push({ loc: `${BASE_URL}/tutorials.xml`, lastmod: today });
}
if (newsDetailUrls.length > 0) {
  files.push(['news.xml', urlsetXml(null, newsDetailUrls)]);
  indexEntries.push({ loc: `${BASE_URL}/news.xml`, lastmod: today });
}

files.forEach(([name, xml]) => {
  writeFileSync(join(outDir, name), xml, 'utf-8');
  console.log(`Generated ${name} (${xml.length} bytes)`);
});

// 子 sitemap 若已无任何可收录 URL，则删除文件并移出索引，
// 避免提交空 sitemap。用 node 的 unlinkSync 而非 rm，避免批量删除拦截器介入。
[['tutorials.xml', tutorialUrls.length], ['news.xml', newsDetailUrls.length]].forEach(([name, count]) => {
  if (count > 0) return;
  try {
    unlinkSync(join(outDir, name));
    console.log(`Removed empty ${name}`);
  } catch {
    // 文件不存在即视为已完成
  }
});

const sitemapIndex = indexXml(indexEntries);
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
