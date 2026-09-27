import type { Metadata } from 'next';
import Link from 'next/link';
import { BreadcrumbSchema } from '@/components/StructuredData';

export const metadata: Metadata = {
  title: '来源与引用规范 - TaoAI',
  description:
    'TaoAI 的信息来源、引用规则与 AI 使用披露：工具信息以官网为准，快讯标注原始来源，第三方内容不逐字搬运，错误信息欢迎反馈更正。',
  alternates: { canonical: '/sources' },
};

export default function SourcesPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <nav className="text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-blue-600">首页</Link>
        <span className="mx-1">/</span>
        <span className="text-gray-600">来源与引用规范</span>
      </nav>

      <h1 className="text-xl font-bold text-gray-900 mb-2">来源与引用规范</h1>
      <p className="text-sm text-gray-500 mb-8">
        我们写下的每一句话从哪里来，以及我们如何对待别人的内容。
      </p>

      <div className="space-y-6 text-sm text-gray-600 leading-relaxed">
        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">📌 工具基础信息的来源</h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong className="text-gray-900">名称与官网地址</strong> —— 以产品官方站点为准，逐条核对后录入</li>
            <li><strong className="text-gray-900">功能定位与分类</strong> —— 依据官网的能力说明与产品文档归类</li>
            <li><strong className="text-gray-900">定价模式</strong> —— 依据官网定价页，仅标注「免费 / 免费增值 / 付费」三类概括性标签，具体价格与额度一律以官网实时信息为准</li>
            <li><strong className="text-gray-900">图标</strong> —— 取自产品官方站点公开的图标资源，仅用于识别与跳转</li>
          </ul>
          <p className="mt-2 text-xs text-gray-500">
            工具信息会随官方调整而变化。若你发现页面信息与官网不符，欢迎
            <Link href="/contact" className="text-blue-600 hover:underline mx-1">反馈</Link>
            更正。
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">📰 快讯与行业资讯的来源</h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>每日 AI 快讯基于公开报道与官方发布整理，<strong className="text-gray-900">每条均标注原始来源与原文链接</strong></li>
            <li>摘要为编辑对公开信息的归纳，不逐字复制原文</li>
            <li>涉及数据（金额、估值、用户量等）均以来源报道为准，不做推测性补充</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">🚫 我们不做的事</h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong className="text-gray-900">不逐字搬运</strong> —— 不复制第三方站点的正文内容充当本站内容</li>
            <li><strong className="text-gray-900">不批量套模板</strong> —— 不用同一段文字套用到大量页面以填充篇幅</li>
            <li><strong className="text-gray-900">不做付费好评</strong> —— 收录与评分不受商业合作影响</li>
            <li><strong className="text-gray-900">不虚构体验</strong> —— 没有实际验证过的内容，不写成「实测结论」</li>
          </ul>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-3 text-xs text-amber-900">
            <p>
              <strong>整改说明：</strong>本站早期版本存在两处问题——部分工具页面的正文来自第三方站点且未增加原创价值；
              部分页面复用了同一段模板文本。我们已在 2026-09 完成全库清理：
              移除来源不当与主题错配的正文，删除跨页重复的模板内容，
              并将缺少实质内容的页面改为不参与搜索引擎索引，只保留基础信息与官网入口。
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">🤖 AI 使用披露</h2>
          <p className="mb-2">
            我们会在信息整理、格式规范、错别字校对等环节使用工具辅助，但坚持以下原则：
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>对工具的事实性信息（官网、定价、能力范围）以官方来源核实后再发布</li>
            <li>不使用工具生成「虚构的使用体验」或「虚假的用户评价」</li>
            <li>评测结论、优缺点判断由编辑负责，并标注署名与更新时间</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">🔗 外部链接规范</h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>指向工具官网的链接为自然跳转，不设付费排序</li>
            <li>资讯类外链指向原始报道，方便读者核对原文</li>
            <li>如权利人认为本站内容或素材使用不当，可通过
              <a href="mailto:admin@taoai365.com" className="text-blue-600 hover:underline mx-1">admin@taoai365.com</a>
              联系我们，核实后我们会立即处理
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">✍️ 纠错与更新机制</h2>
          <p>
            所有工具页面均标注「收录时间」与「最后更新时间」。收到有效纠错后，我们会在 1–3 个工作日内核实并更正，
            同步更新页面的最后更新时间。相关标准另见
            <Link href="/editorial-policy" className="text-blue-600 hover:underline mx-1">编辑政策与评测标准</Link>
            与
            <Link href="/authors" className="text-blue-600 hover:underline mx-1">编辑团队</Link>。
          </p>
        </section>
      </div>

      <BreadcrumbSchema items={[
        { name: '首页', url: 'https://taoai365.com' },
        { name: '来源与引用规范', url: 'https://taoai365.com/sources' },
      ]} />
    </div>
  );
}
