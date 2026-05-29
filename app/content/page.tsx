import { getAllTools, getCategories } from '@/lib/tools';
import { AITool, Category } from '@/types';
import Link from 'next/link';

export default function ContentIndexPage() {
  const allTools = getAllTools();
  const categories = getCategories();

  // Filter tools with detailed_content
  const toolsWithContent = allTools.filter(
    t => t.detailed_content && t.detailed_content.length > 0
  );

  // Group by category
  const catMap = new Map<string, { category: Category; tools: AITool[] }>();
  for (const cat of categories) {
    const tools = toolsWithContent.filter(t => t.categories.includes(cat.slug));
    if (tools.length > 0) {
      catMap.set(cat.slug, { category: cat, tools });
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900">AI 工具详细内容索引</h1>
          <p className="mt-2 text-gray-600">
            共收录 <span className="font-semibold text-blue-600">{toolsWithContent.length}</span> 个 AI 工具的详细介绍，
            涵盖功能说明、使用方法、价格、应用场景等信息。
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {Array.from(catMap.values()).map(({ category, tools }) => (
            <div key={category.slug} className="bg-white rounded-lg border overflow-hidden">
              {/* Category Header */}
              <div className="px-4 py-3 bg-gray-50 border-b flex items-center gap-2">
                {category.icon && <span className="text-lg">{category.icon}</span>}
                <h2 className="font-semibold text-gray-900">{category.name}</h2>
                <span className="text-xs text-gray-400 ml-auto">{tools.length} 个</span>
              </div>

              {/* Tools List */}
              <div className="divide-y max-h-[400px] overflow-y-auto">
                {tools.map(tool => {
                  const sections = tool.detailed_content || [];
                  const titledSections = sections.filter(s => s.title);
                  return (
                    <Link
                      key={tool.slug}
                      href={`/content/${tool.slug}`}
                      className="block px-4 py-2.5 hover:bg-blue-50 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        {tool.logo && (
                          <img src={tool.logo} alt="" className="w-5 h-5 rounded flex-shrink-0" />
                        )}
                        <span className="text-sm font-medium text-gray-800 truncate">
                          {tool.name}
                        </span>
                      </div>
                      {titledSections.length > 0 && (
                        <div className="mt-1 flex flex-wrap gap-1">
                          {titledSections.slice(0, 3).map((s, i) => (
                            <span key={i} className="text-xs text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded">
                              {s.title.slice(0, 12)}
                            </span>
                          ))}
                          {titledSections.length > 3 && (
                            <span className="text-xs text-gray-400">+{titledSections.length - 3}</span>
                          )}
                        </div>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Stats Footer */}
        <div className="mt-8 p-4 bg-white border rounded-lg text-center text-sm text-gray-500">
          已收录 {toolsWithContent.length} 个 AI 工具的详细内容，
          来自 ai-bot.cn 数据源，涵盖功能介绍、使用教程、价格说明和常见问题。
        </div>
      </div>
    </div>
  );
}