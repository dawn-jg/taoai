import { AITool, Category, NewsItem, TutorialItem } from '@/types';
import toolsData from '@/data/tools.json';
import categoriesData from '@/data/categories.json';
import newsData from '@/data/news.json';
import tutorialsData from '@/data/tutorials.json';

export const tools = toolsData as AITool[];
export const categories = categoriesData as Category[];
export const newsItems = newsData as NewsItem[];
export const tutorialItems = tutorialsData as TutorialItem[];

export function getAllTools(): AITool[] {
  return tools;
}

export function getToolBySlug(slug: string): AITool | undefined {
  return tools.find(t => t.slug === slug);
}

export function getToolsByCategory(categorySlug: string): AITool[] {
  return tools.filter(t => t.categories.includes(categorySlug));
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

export function getLatestNews(limit = 3): NewsItem[] {
  return newsItems.slice(0, limit);
}

export function getLatestTutorials(limit = 3): TutorialItem[] {
  return tutorialItems.slice(0, limit);
}
