// scripts/extend-descriptions.mjs
// 批量扩展工具描述到 50-80 字符，提升 SEO meta description 质量

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const toolsPath = join(__dirname, '..', 'data', 'tools.json');
const categoriesPath = join(__dirname, '..', 'data', 'categories.json');

const tools = JSON.parse(readFileSync(toolsPath, 'utf-8'));
const categories = JSON.parse(readFileSync(categoriesPath, 'utf-8'));

// Category name mapping
const catMap = {};
categories.forEach(c => { catMap[c.slug] = c.name; });

// Use case mappings per category (from our category_intros context)
const useCaseMap = {
  'ai-chat': '需要AI辅助对话与问答',
  'ai-writing': '需要进行AI辅助内容创作与写作',
  'ai-image': '需要AI生成或处理图像',
  'ai-video': '需要进行AI视频创作与编辑',
  'ai-coding': '需要AI辅助编程与代码生成',
  'ai-office': '需要提升办公效率与自动化',
  'ai-design': '需要AI辅助设计创作',
  'ai-audio': '需要AI处理音频或生成语音',
  'ai-search': '需要AI驱动的智能搜索',
  'ai-agent': '需要AI智能体与自动化工作流',
  'ai-platform': '需要构建或部署AI应用',
  'ai-learning': '需要系统学习AI知识与技能',
  'ai-models': '需要了解和使用大语言模型',
  'ai-detection': '需要检测AI生成内容',
  'ai-prompt': '需要优化Prompt与AI交互',
};

let changed = 0;

tools.forEach(tool => {
  // Skip tools that already have decent descriptions (>=50 chars)
  if (tool.description.length >= 50) {
    // Still fix descriptions that mention ai-bot
    if (tool.description.includes('ai-bot.cn') || tool.description.includes('AI-bot')) {
      tool.description = tool.description
        .replace(/https?:\/\/ai-bot\.cn[^\s]*/g, '')
        .replace(/来自AI-bot.cn[，,\s]*/g, '')
        .replace(/来源：ai-bot\.cn[，,\s]*/g, '')
        .trim();
      if (tool.description.length < 30) changed++; // fall through to extend
    }
    if (tool.description.length >= 50) return;
  }

  const primaryCat = tool.categories[0];
  const catName = catMap[primaryCat] || 'AI';
  const tags = tool.tags.slice(0, 3);
  const tagStr = tags.length > 0 ? `支持${tags.join('、')}` : '';
  const useCase = useCaseMap[primaryCat] || '探索AI技术';
  const pricing = tool.pricing === 'free' ? '免费' : tool.pricing === 'freemium' ? '免费增值' : '付费';

  // Build a proper description
  let desc = '';
  const originalDesc = tool.description.trim();

  if (originalDesc.length >= 20) {
    // Has a workable short description — expand it
    desc = `${originalDesc}。${tagStr}`;
  } else {
    // Very short description — generate from metadata
    desc = `${tool.name}是一款${catName}领域的${pricing}AI工具，${originalDesc ? originalDesc + '。' : ''}${tagStr}`;
  }

  // Add use case if still too short
  if (desc.length < 40) {
    desc = `${desc}，适合${useCase}的用户。`;
  }

  // Add subcategory context if available and still short
  if (tool.subcategory && desc.length < 55) {
    const subcatMap = categories.find(c => c.slug === primaryCat)?.subcategories || {};
    const subName = subcatMap[tool.subcategory] || tool.subcategory;
    desc = `属于${catName}·${subName}分类。${desc}`;
  }

  // Ensure it ends with proper punctuation and is 50-120 chars
  if (!desc.endsWith('。') && !desc.endsWith('！') && !desc.endsWith('？')) {
    desc += '。';
  }

  // Trim to reasonable length (max 140 chars)
  if (desc.length > 140) {
    const lastPeriod = desc.lastIndexOf('。', 135);
    if (lastPeriod > 50) {
      desc = desc.slice(0, lastPeriod + 1);
    } else {
      desc = desc.slice(0, 137) + '…';
    }
  }

  tool.description = desc;
  changed++;
});

writeFileSync(toolsPath, JSON.stringify(tools, null, 2), 'utf-8');
console.log(`Updated ${changed} tool descriptions. Total tools: ${tools.length}`);
