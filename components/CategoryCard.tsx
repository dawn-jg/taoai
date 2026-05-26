import Link from 'next/link';
import { Category } from '@/types';

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="flex items-center gap-4 bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md hover:border-blue-200 transition-all duration-200"
    >
      <span className="text-3xl shrink-0">{category.icon}</span>
      <div className="min-w-0">
        <h3 className="font-semibold text-gray-900">{category.name}</h3>
        <p className="text-sm text-gray-500 truncate">{category.description}</p>
        <span className="text-xs text-blue-600 font-medium">{category.count} 款工具</span>
      </div>
    </Link>
  );
}
