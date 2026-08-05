import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '编辑政策与评测标准 - TaoAI',
  description: 'TaoAI 编辑部的评测标准、内容更新机制与广告披露政策。我们坚持独立客观的 AI 工具评测，所有编辑内容与商业合作严格分离。',
};

export default function EditorialPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <nav className="text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-blue-600">首页</Link>
        <span className="mx-1">/</span>
        <span className="text-gray-600">编辑政策</span>
      </nav>

      <h1 className="text-xl font-bold text-gray-900 mb-2">编辑政策与评测标准</h1>
      <p className="text-xs text-gray-400 mb-8">最后更新：2026-08-05</p>

      <div className="space-y-6 text-sm text-gray-600 leading-relaxed">
        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">🎯 我们的立场</h2>
          <p>
            TaoAI 是一个独立的 AI 工具导航与评测平台。我们的核心原则是：<strong className="text-gray-900">不搬运官方宣传语，不做付费好评，评测基于真实使用体验。</strong>
            我们收录工具的出发点只有一个——它是否真的对用户有用。
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">📝 评测标准（如何打分）</h2>
          <p className="mb-2">每篇「编辑精选」评测按以下五个维度综合评分（满分 5.0）：</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong className="text-gray-900">实际体验</strong> — 编辑部成员真实注册并使用产品后的第一手感受</li>
            <li><strong className="text-gray-900">功能完整度</strong> — 核心功能是否好用、覆盖场景是否全面</li>
            <li><strong className="text-gray-900">性价比</strong> — 免费/付费模式是否合理，价格与价值是否匹配</li>
            <li><strong className="text-gray-900">稳定性与性能</strong> — 响应速度、服务稳定性、高峰期表现</li>
            <li><strong className="text-gray-900">生态与扩展</strong> — API、插件、与其他产品的集成能力</li>
          </ul>
          <p className="mt-2 text-xs text-gray-500">评分由编辑部集体讨论后确定，非单人主观意见。每个工具的优点和缺点都会如实列出。</p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">🔗 数据来源与准确性</h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>工具基础信息（名称、官网、分类）来源于官方渠道，并定期核对更新</li>
            <li>评测内容均为编辑部原创，标注作者与更新日期</li>
            <li>价格信息以官网实时为准，本页标注的价格模式仅供参考</li>
            <li>如发现信息错误，欢迎通过 <Link href="/contact" className="text-blue-600 hover:underline">联系我们</Link> 页面反馈，我们会在核实后尽快更正</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">🔄 更新机制</h2>
          <p>
            工具信息和评测内容会持续更新。重大版本更新、定价调整或功能下线后，我们会优先更新对应工具的页面。
            每日 AI 快讯基于公开新闻报道整理，标注来源，确保信息可追溯。
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">💼 广告与商业合作披露</h2>
          <p className="mb-2">
            TaoAI 通过广告展示（如 Google AdSense）维持运营。我们承诺：
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong className="text-gray-900">评测独立性</strong> — 是否收录、如何评分，不受任何商业合作影响</li>
            <li><strong className="text-gray-900">透明标识</strong> — 如存在赞助内容，会明确标注「赞助」字样</li>
            <li><strong className="text-gray-900">链接中立</strong> — 工具官网链接为自然跳转，不设付费排序</li>
          </ul>
          <p className="mt-2 text-xs text-gray-500">广告不会影响我们的评测立场。我们宁愿推荐一个真正好用的免费工具，也不推荐一个不好用的付费工具。</p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">✍️ 编辑部</h2>
          <p>
            我们的评测由熟悉 AI 产品的编辑团队完成，团队成员覆盖大模型、编程、设计、办公等不同领域。
            关于团队和联系方式，请参阅 <Link href="/about#editorial-team" className="text-blue-600 hover:underline">关于我们</Link>。
          </p>
        </section>
      </div>
    </div>
  );
}
