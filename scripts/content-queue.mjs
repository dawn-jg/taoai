// scripts/content-queue.mjs
// 原创内容生产队列：列出「待写原创资料」的工具，按优先级排序，供分批撰写。
//
// 背景：索引面已收紧为「只认原创内容」（lib/tools.ts → isToolIndexable）。
// 不在原创池的工具页全部 noindex,follow，需按 docs/original-content-sop.md
// 逐条补写原创资料后才会恢复索引。
//
// 用法：
//   node scripts/content-queue.mjs                 # 总览 + 分类进度
//   node scripts/content-queue.mjs --top 30        # 列出优先级最高的 30 条待写
//   node scripts/content-queue.mjs --top 30 --json # 供脚本消费的 JSON
//   node scripts/content-queue.mjs --cat ai-image  # 只看某个分类的待写

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const read = (p) => JSON.parse(readFileSync(join(ROOT, 'data', p), 'utf-8'));

const tools = read('tools.json');
const categories = read('categories.json');
const editorials = read('editorials.json');
const profiles = read('tool_profiles.json').items || {};

const args = process.argv.slice(2);
const flag = (n) => args.includes(n);
const opt = (n, d) => {
  const i = args.indexOf(n);
  return i >= 0 && args[i + 1] ? args[i + 1] : d;
};

const catName = new Map(categories.map((c) => [c.slug, c.name]));

// 原创池（与 lib/tools.ts 的 originalToolSlugs 一致）
const originalSlugs = new Set([...editorials.map((e) => e.slug), ...Object.keys(profiles)]);

const plain = (t) =>
  (t.detailed_content || [])
    .map((s) => String(s.html || ''))
    .join('')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, '');

// 优先级：编辑精选 > 评分 > 已有正文体量（正文长的说明原本就是重点条目）
// 同分时按名称排序，保证多次运行顺序稳定。
const pending = tools
  .filter((t) => !originalSlugs.has(t.slug))
  .map((t) => ({
    slug: t.slug,
    name: t.name,
    url: t.url,
    category: t.categories[0] || '',
    categoryName: catName.get(t.categories[0]) || '',
    subcategory: t.subcategory || '',
    rating: t.rating || 0,
    featured: !!t.featured,
    pricing: t.pricing || '',
    tags: (t.tags || []).slice(0, 6),
    existingChars: plain(t).length,
  }))
  .sort(
    (a, b) =>
      Number(b.featured) - Number(a.featured) ||
      b.rating - a.rating ||
      b.existingChars - a.existingChars ||
      a.name.localeCompare(b.name)
  );

const done = tools.length - pending.length;
const catFilter = opt('--cat', '');
const list = catFilter ? pending.filter((t) => t.category === catFilter) : pending;

if (flag('--json') || flag('--save')) {
  const top = Number(opt('--top', '30'));
  const payload = { generatedAt: new Date().toISOString().slice(0, 10), total: tools.length, done, pending: pending.length, batch: list.slice(0, top) };
  if (flag('--save')) {
    writeFileSync(join(ROOT, 'data', 'content_queue.json'), JSON.stringify(payload, null, 2), 'utf-8');
    console.log(`已写 data/content_queue.json（本批 ${payload.batch.length} 条）`);
  }
  if (flag('--json')) console.log(JSON.stringify(payload, null, 2));
  process.exit(0);
}

console.log('原创内容生产进度');
console.log('─'.repeat(56));
const pct = ((done / tools.length) * 100).toFixed(1);
console.log(`工具总数 ${tools.length}  |  已写原创 ${done}  |  待写 ${pending.length}  |  完成度 ${pct}%`);
console.log('');

console.log('按分类的进度：');
console.log('  ' + '分类'.padEnd(14) + '已写/总数    待写');
for (const c of categories) {
  const all = tools.filter((t) => t.categories.includes(c.slug));
  const d = all.filter((t) => originalSlugs.has(t.slug)).length;
  const p = all.length - d;
  if (all.length === 0) continue;
  const bar = '█'.repeat(Math.round((d / all.length) * 12)).padEnd(12, '·');
  console.log(`  ${(c.name || c.slug).padEnd(14)}${bar}  ${String(d).padStart(4)}/${String(all.length).padEnd(6)}${String(p).padStart(4)}`);
}
console.log('');

const top = Number(opt('--top', '0'));
if (top > 0) {
  console.log(`优先级最高的 ${Math.min(top, list.length)} 条待写：`);
  console.log('  ' + '#'.padStart(3) + '  ' + 'slug'.padEnd(26) + '名称'.padEnd(22) + '分类'.padEnd(12) + '评分 现正文');
  list.slice(0, top).forEach((t, i) => {
    const mark = t.featured ? '★' : ' ';
    console.log(
      `  ${String(i + 1).padStart(3)} ${mark} ${t.slug.padEnd(26)}${String(t.name).slice(0, 20).padEnd(22)}${String(t.categoryName).padEnd(12)}${String(t.rating).padEnd(5)}${t.existingChars}`
    );
  });
  console.log('');
  console.log('（★ = 编辑精选，最高优先级；现正文为该条当前 detailed_content 纯文本字数，仅作参考）');
} else {
  console.log('加 --top N 列出待写清单，或加 --json 获取机器可读格式。');
}
