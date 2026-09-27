// scripts/fix-adsense-content.mjs
// AdSense「低价值内容」整改 · 第一步：清理错配与重复正文
//
// 处理两类缺陷：
//   1) 同一份正文被多个页面共用 —— 仅保留归属方，其余剥离
//      （例如 55 个页面共用「豆包」的正文：perplexity / chatglm / gamma-app …）
//   2) 正文完全未提及自身工具名 —— 剥离（内容与页面主题不符）
//
// 剥离方式：把 detailed_content 置为空数组，页面据此降级为 noindex 的简版条目。
// 用法：node scripts/fix-adsense-content.mjs          # 试算，不写盘
//       node scripts/fix-adsense-content.mjs --apply  # 实际写盘

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const TOOLS_PATH = join(ROOT, 'data', 'tools.json');
const APPLY = process.argv.includes('--apply');

const tools = JSON.parse(readFileSync(TOOLS_PATH, 'utf-8'));

const plainText = (t) =>
  (t.detailed_content || [])
    .map((s) => String(s.html || ''))
    .join('')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, '');

const isAutoSlug = (s) => /^tool\d+$/.test(s);

// ─── 1. 指纹分组，确定每个重复组的归属方 ───
const groups = new Map();
for (const t of tools) {
  const p = plainText(t);
  if (p.length === 0) continue;
  const fp = p.slice(0, 300);
  if (!groups.has(fp)) groups.set(fp, []);
  groups.get(fp).push(t);
}

const stripSet = new Map(); // slug -> 原因
let dupGroups = 0;
let dupStripped = 0;

for (const [, members] of groups) {
  if (members.length < 2) continue;
  dupGroups++;

  // 组内可能没有一个成员是这份正文的真正归属者
  // （例如 55 个页面共用「豆包」的正文，但组内没有任何一个叫豆包）。
  // 这种情况整组剥离，不保留任何副本。
  const selfMentioning = members.filter((t) => plainText(t).includes(t.name));
  if (selfMentioning.length === 0) {
    for (const m of members) {
      if (!stripSet.has(m.slug)) {
        stripSet.set(m.slug, '重复正文（组内无归属者）');
        dupStripped++;
      }
    }
    continue;
  }

  // 归属方优先：语义 slug > 自动 slug；同类取正文更长者
  const semantic = selfMentioning.filter((t) => !isAutoSlug(t.slug));
  const owner = (semantic.length ? semantic : selfMentioning).sort(
    (a, b) => plainText(b).length - plainText(a).length
  )[0];
  for (const m of members) {
    if (m.slug === owner.slug) continue;
    if (!stripSet.has(m.slug)) {
      stripSet.set(m.slug, `重复正文（归属方 ${owner.slug}）`);
      dupStripped++;
    }
  }
}

// ─── 2. 内容与页面主题不符 ───
let mismatchStripped = 0;
for (const t of tools) {
  if (stripSet.has(t.slug)) continue;
  const p = plainText(t);
  if (p.length === 0) continue;
  if (!p.includes(t.name)) {
    stripSet.set(t.slug, '正文未提及自身工具名');
    mismatchStripped++;
  }
}

// ─── 报告 ───
console.log('工具总数:', tools.length);
console.log('重复正文组:', dupGroups, '组，剥离非归属方:', dupStripped, '页');
console.log('正文与主题不符，剥离:', mismatchStripped, '页');
console.log('本次共剥离 detailed_content:', stripSet.size, '页');
console.log('剥离后仍有正文:', tools.length - stripSet.size, '页');

const sample = [...stripSet.entries()].slice(0, 12);
console.log('\n样例:');
sample.forEach(([s, r]) => console.log('  ', s.padEnd(18), r));

if (!APPLY) {
  console.log('\n[试算模式] 未写盘。加 --apply 生效。');
  process.exit(0);
}

let touched = 0;
for (const t of tools) {
  if (stripSet.has(t.slug) && (t.detailed_content || []).length > 0) {
    t.detailed_content = [];
    touched++;
  }
}
writeFileSync(TOOLS_PATH, JSON.stringify(tools, null, 2), 'utf-8');
console.log(`\n已写盘：${touched} 条工具记录清空 detailed_content → ${TOOLS_PATH}`);
