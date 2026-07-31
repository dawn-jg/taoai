import { getAllTools, getCategories } from '@/lib/tools';
import { permanentRedirect } from 'next/navigation';

// 301 redirect /content -> / (homepage)
export default function ContentIndexPage() {
  permanentRedirect('/');
}
