import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '关于我们 - AI工具集 | TaoAI',
  description: 'TaoAI - 发现最好的AI工具，收录上千款AI产品，覆盖对话、写作、绘画、视频、编程等全品类。',
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

      <h1 className="text-xl font-bold text-gray-900 mb-8">关于 TaoAI</h1>

      <div className="space-y-6 text-sm text-gray-600 leading-relaxed">
        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">📌 我们的使命</h2>
          <p>
            TaoAI 致力于成为最实用的 AI 工具导航平台。我们系统化地收录、整理和评测各类 AI 产品，
            帮助开发者和普通用户快速找到最适合自己的 AI 工具，降低 AI 工具的使用门槛。
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">📊 平台数据</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>收录 <strong>1200+</strong> 款 AI 工具，覆盖 15 个分类</li>
            <li>提供工具详情、使用教程、横评对比等内容</li>
            <li>每日更新 AI 行业快讯</li>
            <li>所有工具信息均来源于官方渠道和权威合作方</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">🎯 内容特色</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>工具导航</strong> — 按分类和子分类精准筛选，一键直达官网</li>
            <li><strong>详情评测</strong> — 每个工具配有功能、技术、价格等全方位信息</li>
            <li><strong>教程资源</strong> — 精选上手指南和深度评测，覆盖主流 AI 工具</li>
            <li><strong>每日快讯</strong> — 汇总 AI 行业最新动态和产品发布</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">🔗 联系我们</h2>
          <p>
            如有建议、合作或工具提交需求，欢迎发送邮件至：
            <a href="mailto:admin@taoai365.com" className="text-blue-600 hover:underline ml-1">admin@taoai365.com</a>
          </p>
        </section>
      </div>
    </div>
  );
}
