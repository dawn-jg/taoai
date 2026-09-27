import type { Metadata } from 'next';
import Link from 'next/link';
import { BreadcrumbSchema } from '@/components/StructuredData';

export const metadata: Metadata = {
  title: '编辑团队 - TaoAI | AI工具导航与评测',
  description:
    'TaoAI 编辑部团队介绍：负责 AI 工具收录、信息核对与原创评测的编辑团队，领域覆盖对话大模型、AI 编程、AI 设计、AI 办公、视频生成与智能体。',
  alternates: { canonical: '/authors' },
};

export default function AuthorsPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <nav className="text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-blue-600">首页</Link>
        <span className="mx-1">/</span>
        <span className="text-gray-600">编辑团队</span>
      </nav>

      <h1 className="text-xl font-bold text-gray-900 mb-2">编辑团队</h1>
      <p className="text-sm text-gray-500 mb-8">
        谁在维护 TaoAI 的内容，依据什么标准，如何署名。
      </p>

      <div className="space-y-6 text-sm text-gray-600 leading-relaxed">
        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">👥 署名方式</h2>
          <p>
            TaoAI 的内容统一以<strong className="text-gray-900">「TaoAI 编辑部」</strong>集体署名。
            我们采用集体署名而非个人署名，原因是收录与评测工作需要跨领域协作与交叉复核，
            单篇内容往往由多名编辑共同核对完成。每一篇内容都会标注发布时间与最后更新时间。
          </p>
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mt-3 text-xs text-blue-800">
            <p><strong>署名主体：</strong>TaoAI 编辑部</p>
            <p className="mt-1"><strong>内容责任：</strong>对工具名称、官网链接、分类归属、定价模式的准确性负责</p>
            <p className="mt-1"><strong>纠错响应：</strong>收到有效反馈后，一般 1–3 个工作日内核实并更正</p>
          </div>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">🧭 领域分工</h2>
          <p className="mb-2">编辑部按 AI 应用领域分工，各方向由长期使用该领域产品的编辑负责信息核对：</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { icon: '💬', name: '对话大模型', desc: '通用对话、长文本、推理与数学' },
              { icon: '⌨️', name: 'AI 编程', desc: '代码补全、智能 IDE、代码审查' },
              { icon: '🎨', name: 'AI 设计', desc: '图像生成、平面与 UI 设计、修图' },
              { icon: '📊', name: 'AI 办公', desc: '文档、表格、PPT、会议纪要' },
              { icon: '🎬', name: 'AI 视频与音频', desc: '文生视频、口播、配音与音乐' },
              { icon: '🤖', name: '智能体与平台', desc: 'Agent 搭建、模型 API、工作流' },
            ].map((d) => (
              <div key={d.name} className="bg-gray-50 border border-gray-100 rounded-lg p-3">
                <h3 className="text-sm font-semibold text-gray-900">{d.icon} {d.name}</h3>
                <p className="text-xs text-gray-500 mt-1">{d.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">✅ 工作流程</h2>
          <ol className="list-decimal pl-5 space-y-1.5">
            <li><strong className="text-gray-900">候选筛选</strong> —— 按用户实际需求挑选值得收录的工具，不做付费收录</li>
            <li><strong className="text-gray-900">信息核对</strong> —— 逐一核对官网地址、功能定位、分类归属与定价模式</li>
            <li><strong className="text-gray-900">交叉复核</strong> —— 由第二位编辑复查信息与表述，避免错配与夸大</li>
            <li><strong className="text-gray-900">上线与标注</strong> —— 标注收录时间、最后更新时间与信息来源</li>
            <li><strong className="text-gray-900">持续维护</strong> —— 产品重大更新或定价调整后回访更新</li>
          </ol>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">📐 评测标准</h2>
          <p>
            深度评测按「实际体验、功能完整度、性价比、稳定性与性能、生态与扩展」五个维度综合评分，
            优缺点如实列出。完整标准见
            <Link href="/editorial-policy" className="text-blue-600 hover:underline mx-1">编辑政策与评测标准</Link>。
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">🤝 加入与联系</h2>
          <p>
            如果你长期使用某一类 AI 产品并愿意参与信息核对与内容撰写，欢迎发送邮件至
            <a href="mailto:admin@taoai365.com" className="text-blue-600 hover:underline mx-1">admin@taoai365.com</a>
            （注明「编辑申请」）。工具作者或深度用户提供信息，也欢迎通过
            <Link href="/contact" className="text-blue-600 hover:underline mx-1">联系我们</Link>
            页面反馈。
          </p>
        </section>
      </div>

      <BreadcrumbSchema items={[
        { name: '首页', url: 'https://taoai365.com' },
        { name: '编辑团队', url: 'https://taoai365.com/authors' },
      ]} />
    </div>
  );
}
