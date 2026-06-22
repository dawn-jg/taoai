import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '隐私政策 - AI工具集 | TaoAI',
  description: 'TaoAI 隐私政策，了解我们如何收集、使用和保护您的个人信息。',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      {/* Breadcrumb */}
      <nav className="text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-blue-600">首页</Link>
        <span className="mx-1">/</span>
        <span className="text-gray-600">隐私政策</span>
      </nav>

      <h1 className="text-xl font-bold text-gray-900 mb-8">🔒 隐私政策</h1>

      <div className="space-y-6 text-sm text-gray-600 leading-relaxed">
        <p className="text-xs text-gray-400">最后更新：2026 年 5 月</p>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">1. 信息收集</h2>
          <p>
            TaoAI（taoai365.com）在您访问网站时可能会收集以下信息：
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>浏览数据</strong> — 我们使用 51.la 统计服务收集匿名访问数据（IP 地址、浏览器类型、访问页面、访问时间等），用于分析网站流量和改善用户体验。</li>
            <li><strong>Cookie</strong> — 51.la 和 Google AdSense 可能会在您的浏览器中放置 Cookie，用于统计分析和广告投放。</li>
            <li><strong>联系信息</strong> — 您通过邮件联系我们时提供的邮箱地址。</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">2. 信息使用</h2>
          <p>我们收集的信息用于以下目的：</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>改善网站内容和用户体验</li>
            <li>分析网站流量和使用趋势</li>
            <li>回复您的咨询和反馈</li>
            <li>展示相关广告（通过 Google AdSense）</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">3. 第三方服务</h2>
          <p>本网站使用以下第三方服务：</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>51.la</strong> — 网站流量统计分析</li>
            <li><strong>Google AdSense</strong> — 广告投放</li>
            <li><strong>Google Favicons</strong> — 工具图标显示</li>
            <li><strong>Cloudflare Pages</strong> — 网站托管</li>
          </ul>
          <p className="mt-2">
            这些服务商可能根据其各自的隐私政策收集和处理您的数据。建议您查阅其隐私政策了解更多信息。
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">4. 信息保护</h2>
          <p>
            我们采取合理的技术和管理措施保护您的个人信息安全。但请注意，互联网上的数据传输不能保证 100% 安全。
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">5. 外部链接</h2>
          <p>
            本网站包含指向第三方网站的链接（包括 AI 工具官网、教程来源网站等）。这些网站的隐私政策与本政策无关，我们不对其内容和实践承担任何责任。
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">6. 政策更新</h2>
          <p>
            我们可能会不时更新本隐私政策。重大变更将通过网站公告通知。继续使用本网站即表示您同意更新后的政策。
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">7. 联系我们</h2>
          <p>
            如对本隐私政策有任何疑问，请联系：
            <a href="mailto:admin@taoai365.com" className="text-blue-600 hover:underline ml-1">admin@taoai365.com</a>
          </p>
        </section>
      </div>
    </div>
  );
}
