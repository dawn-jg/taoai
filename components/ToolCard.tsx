import Link from 'next/link';
import { AITool } from '@/types';
import ToolLogo from './ToolLogo';

export default function ToolCard({ tool }: { tool: AITool }) {
  const pricingLabel: Record<string, string> = { free: '免费', freemium: '免费增值', paid: '付费' };
  const pricingColor: Record<string, string> = { free: 'bg-green-100 text-green-700', freemium: 'bg-blue-100 text-blue-700', paid: 'bg-orange-100 text-orange-700' };
  return (
    <Link href={`/tools/${tool.slug}`} className="block bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md hover:border-blue-200 transition-all">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2 min-w-0">
          {tool.logo && (
            <ToolLogo src={tool.logo} domain={tool.domain} alt="" className="w-6 h-6 rounded shrink-0" />
          )}
          <h3 className="text-sm font-semibold text-gray-900 truncate">{tool.name}</h3>
        </div>
        <span className={`shrink-0 ml-2 text-[10px] font-medium px-1.5 py-0.5 rounded-full ${pricingColor[tool.pricing]}`}>{pricingLabel[tool.pricing]}</span>
      </div>
      <p className="text-xs text-gray-500 line-clamp-2 mb-2 leading-relaxed">{tool.description}</p>
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-1">
          {tool.tags.slice(0,2).map(tag => <span key={tag} className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">{tag}</span>)}
        </div>
        <div className="flex items-center gap-0.5 text-[10px] text-yellow-500 shrink-0 ml-2">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
          <span className="text-gray-400">{tool.rating}</span>
        </div>
      </div>
    </Link>
  );
}
