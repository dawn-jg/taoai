import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '联系我们 - AI工具集 | TaoAI',
  description: '联系 TaoAI 团队，提交工具、反馈建议或商务合作。',
};

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      {/* Breadcrumb */}
      <nav className="text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-blue-600">首页</Link>
        <span className="mx-1">/</span>
        <span className="text-gray-600">联系我们</span>
      </nav>

      <h1 className="text-xl font-bold text-gray-900 mb-8">📬 联系我们</h1>

      <div className="space-y-6 text-sm text-gray-600 leading-relaxed">
        {/* Email */}
        <section className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-base font-semibold text-gray-900 mb-3">📧 电子邮箱</h2>
          <p className="mb-2">任何问题均可通过邮件与我们取得联系：</p>
          <a
            href="mailto:admin@taoai365.com"
            className="text-lg font-semibold text-blue-600 hover:text-blue-800 hover:underline"
          >
            admin@taoai365.com
          </a>
        </section>

        {/* Submit a tool */}
        <section className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-base font-semibold text-gray-900 mb-3">🤝 提交工具</h2>
          <p>如果您有 AI 工具希望收录到 TaoAI，请发送邮件包含以下信息：</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>工具名称与官网链接</li>
            <li>简要功能描述（100 字以内）</li>
            <li>所属分类</li>
          </ul>
        </section>

        {/* Feedback */}
        <section className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-base font-semibold text-gray-900 mb-3">💡 反馈建议</h2>
          <p>发现信息有误、链接失效或有改进建议？欢迎通过邮件告诉我们，我们会及时处理。</p>
        </section>

        {/* Cooperation */}
        <section className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-base font-semibold text-gray-900 mb-3">🤝 商务合作</h2>
          <p>如需商务合作、广告投放或内容授权，请发送邮件至：</p>
          <a
            href="mailto:admin@taoai365.com"
            className="text-blue-600 hover:underline mt-1 inline-block"
          >
            admin@taoai365.com
          </a>
        </section>
      </div>
    </div>
  );
}
