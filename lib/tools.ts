import { AITool, Category, NewsItem, TutorialItem, EditorialItem } from '@/types';
import toolsData from '@/data/tools.json';
import categoriesData from '@/data/categories.json';
import newsData from '@/data/news.json';
import newsDetailsData from '@/data/news_details.json';
import tutorialsData from '@/data/tutorials.json';
import editorialsData from '@/data/editorials.json';
import categoryIntrosData from '@/data/category_intros.json';
import toolProfilesData from '@/data/tool_profiles.json';

export const tools = toolsData as AITool[];
export const categories = categoriesData as unknown as Category[];
export const newsItems = newsData as NewsItem[];
export const tutorialItems = tutorialsData as TutorialItem[];
export const editorials = editorialsData as EditorialItem[];
export const categoryIntros = categoryIntrosData as Record<string, string>;

export function getAllTools(): AITool[] {
  return tools;
}

export function getToolBySlug(slug: string): AITool | undefined {
  return tools.find(t => t.slug === slug);
}

export function getToolsByCategory(categorySlug: string): AITool[] {
  return tools.filter(t => t.categories.includes(categorySlug));
}

export function getToolsByCategoryAndSubcategory(categorySlug: string, subcategory?: string): AITool[] {
  let result = tools.filter(t => t.categories.includes(categorySlug));
  if (subcategory) {
    result = result.filter(t => t.subcategory === subcategory);
  }
  return result;
}

export function getFeaturedTools(): AITool[] {
  return tools.filter(t => t.featured);
}

export function searchTools(query: string): AITool[] {
  const q = query.toLowerCase();
  return tools.filter(t =>
    t.name.toLowerCase().includes(q) ||
    t.description.toLowerCase().includes(q) ||
    t.tags.some(tag => tag.toLowerCase().includes(q)) ||
    t.categories.some(cat => cat.toLowerCase().includes(q))
  );
}

export function getCategories(): Category[] {
  return categories;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find(c => c.slug === slug);
}

export function getNews(): NewsItem[] {
  return newsItems;
}

// ─── 快讯详情（长文内容与 news.json 分离，避免被每日定时任务覆盖）──
type NewsDetail = { content: string; related: string[]; updated?: string };
const newsDetails = (newsDetailsData as { items: Record<string, NewsDetail> }).items || {};

export function getNewsDetail(slug: string): NewsDetail | undefined {
  return newsDetails[slug];
}

/** 快讯详情页可索引判定：必须有编辑部撰写的原创解读，且达到最低体量。
 *  快讯本身是「摘要 + 外链」形态，只有配上原创解读才具备独立价值。 */
export const NEWS_MIN_COMMENTARY_CHARS = 180;

export function newsPlainText(item: NewsItem): string {
  const detail = newsDetails[item.slug];
  const content = detail ? String(detail.content || '').replace(/<[^>]+>/g, '') : '';
  return String(item.summary || '').replace(/\s+/g, '') + content.replace(/\s+/g, '');
}

export function newsCommentaryText(item: NewsItem): string {
  const detail = newsDetails[item.slug];
  return detail ? String(detail.content || '').replace(/<[^>]+>/g, '').replace(/\s+/g, '') : '';
}

export function isNewsIndexable(item: NewsItem): boolean {
  return newsCommentaryText(item).length >= NEWS_MIN_COMMENTARY_CHARS;
}

export function getIndexableNews(): NewsItem[] {
  return newsItems.filter(isNewsIndexable);
}

export function getRelatedToolsForNews(slug: string): AITool[] {
  const detail = newsDetails[slug];
  if (!detail || !Array.isArray(detail.related)) return [];
  return detail.related
    .map((s) => tools.find((t) => t.slug === s))
    .filter((t): t is AITool => Boolean(t));
}

export function getTutorials(): TutorialItem[] {
  return tutorialItems;
}

export function getTutorialBySlug(slug: string): TutorialItem | undefined {
  return tutorialItems.find(t => t.slug === slug);
}

export function getLatestNews(limit = 3): NewsItem[] {
  return newsItems.slice(0, limit);
}

export function getLatestTutorials(limit = 3): TutorialItem[] {
  return tutorialItems.slice(0, limit);
}

export function getEditorialBySlug(slug: string): EditorialItem | undefined {
  return editorials.find(e => e.slug === slug);
}

// ─── 内容质量判定（AdSense「低价值内容」整改 · 第二轮）────────────────
// 站点工具页正文多源自第三方采集，即便体量达标也不构成「本站原创内容」，
// 对 AdSense 而言仍属 scraped content。故索引面收紧为「只认编辑部原创内容」：
//   原创池 = 编辑部评测（editorials.json）+ 原创工具资料（tool_profiles.json）
// 不在原创池的页面保留可访问性，但输出 noindex,follow。
// 判定规则同时被 sitemap 生成脚本复用，保证「sitemap 只收录可索引页」。

/** 原创内容池：只有出现在这里的 slug 才有资格被索引 */
const originalToolSlugs = new Set<string>([
  ...editorials.map(e => e.slug),
  ...Object.keys((toolProfilesData as { items?: Record<string, unknown> }).items || {}),
]);

/** 原创内容池（供内容生产进度统计复用） */
export function getOriginalToolSlugs(): Set<string> {
  return originalToolSlugs;
}

/** 正文纯文本（去标签、去空白），用于内容体量判定 */
export function toolPlainText(tool: AITool): string {
  return (tool.detailed_content || [])
    .map(s => String(s.html || ''))
    .join('')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, '');
}

/** 工具名是否为干净可用的名称（排除抓取残留的超长标题） */
function isCleanToolName(name: string): boolean {
  const n = (name || '').trim();
  if (!n || n.length > 30) return false;
  if (n.includes(' | ') || n.includes('&#') || n.includes('--')) return false;
  return true;
}

/** 单个工具页的最低正文体量（纯文本字符数） */
export const TOOL_MIN_CONTENT_CHARS = 600;

/** 工具名标准化：去掉空白后比对。
 *  注意 toolPlainText 已移除空白，若直接用含空格的 name 比对，多词名称（如 "Kimi AI"）永远匹配不上。 */
export function normalizeName(name: string): string {
  return String(name || '').replace(/\s+/g, '').trim();
}

/**
 * 工具页是否允许被搜索引擎索引。
 *
 * 唯一入口是「原创内容池」——正文若来自第三方采集，即使体量达标也不索引。
 * 池内页面仍须通过体量校验（≥600 字且提到自身工具名），防止空壳页被误放行。
 */
export function isToolIndexable(tool: AITool): boolean {
  if (!originalToolSlugs.has(tool.slug)) return false;
  if (!isCleanToolName(tool.name)) return false;

  const plain = toolPlainText(tool);
  if (plain.length < TOOL_MIN_CONTENT_CHARS) return false;
  if (!plain.includes(normalizeName(tool.name))) return false;

  return true;
}

/** 可索引的工具页集合（供 sitemap 使用） */
export function getIndexableTools(): AITool[] {
  return tools.filter(isToolIndexable);
}

// ─── 教程页可索引判定（同一套思路：稀薄页退出索引）──────────────────
// 当前教程正文普遍在 300 字上下，属于「摘要 + 外链」形态，缺少独立价值。
// 在补齐真正原创的教程正文之前，这些页面输出 noindex,follow。

/** 教程正文纯文本长度阈值 */
export const TUTORIAL_MIN_CONTENT_CHARS = 600;

export function tutorialPlainText(tutorial: TutorialItem): string {
  return String(tutorial.content || '')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, '');
}

export function isTutorialIndexable(tutorial: TutorialItem): boolean {
  return tutorialPlainText(tutorial).length >= TUTORIAL_MIN_CONTENT_CHARS;
}

export function getIndexableTutorials(): TutorialItem[] {
  return tutorialItems.filter(isTutorialIndexable);
}

export function getEditorials(): EditorialItem[] {
  return editorials;
}

export function getCategoryIntro(slug: string): string | undefined {
  return categoryIntros[slug];
}
