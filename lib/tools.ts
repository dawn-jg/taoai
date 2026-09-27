import { AITool, Category, NewsItem, TutorialItem, EditorialItem } from '@/types';
import toolsData from '@/data/tools.json';
import categoriesData from '@/data/categories.json';
import newsData from '@/data/news.json';
import tutorialsData from '@/data/tutorials.json';
import editorialsData from '@/data/editorials.json';
import categoryIntrosData from '@/data/category_intros.json';

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

// ─── 内容质量判定（AdSense「低价值内容」整改）────────────────────────
// 站点约 6 成工具页只有模板化壳子，缺少与自身相关的实质内容。
// 这些页面保留可访问性，但输出 noindex,follow，避免被判定为批量生成的低价值内容。
// 判定规则同时被 sitemap 生成脚本复用，保证「sitemap 只收录可索引页」。

const editorialSlugs = new Set(editorials.map(e => e.slug));

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

/**
 * 工具页是否允许被搜索引擎索引。
 * 1) 有编辑部原创评测 → 可索引
 * 2) 否则须同时满足：名称干净 + 正文 ≥600 字 + 正文提到自身工具名
 */
export function isToolIndexable(tool: AITool): boolean {
  if (editorialSlugs.has(tool.slug)) return true;
  if (!isCleanToolName(tool.name)) return false;

  const plain = toolPlainText(tool);
  if (plain.length < TOOL_MIN_CONTENT_CHARS) return false;
  if (!plain.includes(tool.name.trim())) return false;

  return true;
}

/** 可索引的工具页集合（供 sitemap 使用） */
export function getIndexableTools(): AITool[] {
  return tools.filter(isToolIndexable);
}

export function getEditorials(): EditorialItem[] {
  return editorials;
}

export function getCategoryIntro(slug: string): string | undefined {
  return categoryIntros[slug];
}
