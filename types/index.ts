export interface AITool {
  slug: string;
  name: string;
  description: string;
  url: string;
  categories: string[];
  tags: string[];
  featured: boolean;
  rating: number;
  pricing: 'free' | 'freemium' | 'paid';
  screenshots?: string[];
  createdAt: string;
  subcategory?: string;
  logo?: string;
  domain?: string;
  detailed_content?: {
    title: string;
    html: string;
  }[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  count: number;
  description: string;
  subcategories?: Record<string, string>;
}

export interface NewsItem {
  slug: string;
  title: string;
  summary: string;
  content: string;
  date: string;
  source: string;
}

export interface TutorialItem {
  slug: string;
  title: string;
  summary: string;
  content: string;
  date: string;
  category: string;
}
