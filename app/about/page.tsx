import type { Metadata } from 'next';
import Link from 'next/link';
import { BreadcrumbSchema } from '@/components/StructuredData';

export const metadata: Metadata = {
  title: '关于我们 - TaoAI | AI工具导航与评测',
  description: 'TaoAI 是独立 AI 工具导航平台，收录 1200+ 款 AI 产品。了解我们的编辑团队、评测方法论、数据来源和更新机制。',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      {/* Breadcrumb */}
      <nav className="text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-blue-600">首页</Link>
        <span className="mx-1">/</span>
        <span className="text-gray-600">关于我们</span>
      </nav>

      <h1 className="text-xl font-bold text-gray-900 mb-2">关于 TaoAI</h1>
      <p className="text-sm text-gray-500 mb-8">独立、真实、持续更新 —— 这是我们的全部承诺。</p>

      <div className="space-y-6 text-sm text-gray-600 leading-relaxed">
        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">📌 我们是谁</h2>
          <p>
            TaoAI 是一个独立的 AI 工具导航与评测平台。我们系统化地收录、整理和评测各类 AI 产品，
            帮助开发者和普通用户快速找到最适合自己的 AI 工具，降低 AI 工具的使用门槛。
          </p>
          <p className="mt-2">
            与纯链接聚合站不同，我们坚持为重要工具撰写<strong className="text-gray-900">原创评测</strong>——
            亲自注册、真实使用、如实评价优缺点，而不是复制官方宣传语。
          </p>
        </section>

        <section id="editorial-team">
          <h2 className="text-base font-semibold text-gray-900 mb-3">👥 编辑团队</h2>
          <p className="mb-3">
            评测工作由「TaoAI 编辑部」完成，成员覆盖大模型、编程开发、视觉设计、内容创作等 AI 应用一线领域。
            每篇评测均标注作者与更新日期，并对内容准确性负责。
          </p>
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
            <p className="text-xs text-blue-800">
              <strong>评测作者：</strong>TaoAI 编辑部（署名评测由编辑团队集体完成，确保多视角、可复核）
              <br />
              <strong>领域覆盖：</strong>对话大模型 · AI 编程 · AI 设计 · AI 办公 · 视频生成 · 智能体
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">📊 平台数据</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>收录 <strong>1200+</strong> 款 AI 工具，覆盖 15 个分类、30+ 个子分类</li>
            <li>编辑精选深度评测持续扩充中（首批覆盖 DeepSeek、ChatGPT、豆包、Kimi、通义千问）</li>
            <li>15 个分类页均配有编辑部原创导读</li>
            <li>每日更新 AI 行业快讯，标注来源可追溯</li>
            <li>56 篇原创精选教程，覆盖编程、视频、绘画、大模型等主题</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">🎯 内容特色</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>工具导航</strong> — 按分类和子分类精准筛选，一键直达官网</li>
            <li><strong>编辑评测</strong> — 真实使用体验 + 评分 + 优缺点列表，独立于商业合作</li>
            <li><strong>教程资源</strong> — 精选上手指南和深度评测，覆盖主流 AI 工具</li>
            <li><strong>每日快讯</strong> — 汇总 AI 行业最新动态和产品发布，注明来源</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">🔍 评测方法论</h2>
          <p className="mb-2">我们的评测遵循 <Link href="/editorial-policy" className="text-blue-600 hover:underline">编辑政策与评测标准</Link>，核心原则：</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>真实使用后才评分，不接受「付费好评」</li>
            <li>评分综合体验、功能、性价比、稳定性、生态五个维度</li>
            <li>优点缺点如实标注，不回避产品的短板</li>
            <li>广告与合作不影响收录与评分</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">🔄 更新与纠错</h2>
          <p>
            工具信息与评测持续更新。如发现价格、功能或链接有误，欢迎告知我们，
            核实后会在 1-3 个工作日内更正。我们珍视每一位用户的反馈。
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">🔗 联系我们</h2>
          <p>
            如有建议、合作或工具提交需求，欢迎发送邮件至：
            <a href="mailto:admin@taoai365.com" className="text-blue-600 hover:underline ml-1">admin@taoai365.com</a>
          </p>
          <p className="mt-2 text-xs text-gray-400">
            商务合作请注明「合作」，工具收录申请请注明「提交工具」，纠错请注明「纠错」。
          </p>
        </section>
      </div>

      <BreadcrumbSchema items={[
        { name: '首页', url: 'https://taoai365.com' },
        { name: '关于我们', url: 'https://taoai365.com/about' },
      ]} />
    </div>
  );
}
