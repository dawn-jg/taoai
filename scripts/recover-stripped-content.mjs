// scripts/recover-stripped-content.mjs
// 修复历史误删：fix-adsense-content.mjs 的「正文未提及自身工具名」判定
// 使用了未去空白的工具名与已去空白的正文比对，
// 导致名称含空格的多词工具（如 "Kimi AI"、"Stable Diffusion"）即使正文正确也被清空。
//
// 本脚本从指定的历史提交中把这类被误删的正文恢复回来，并重新做一次去重与主题校验。
//
// 用法：
//   node scripts/recover-stripped-content.mjs [git-ref]           # 试算（默认 88e1f455）
//   CODEBUDDY_SAFE_DELETE_ENABLED=0 node scripts/recover-stripped-content.mjs 88e1f455 --apply

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const TOOLS_PATH = join(ROOT, 'data', 'tools.json');
const APPLY = process.argv.includes('--apply');
const REF = process.argv.slice(2).find((a) => !a.startsWith('--')) || '88e1f455';
const TOOL_MIN_CONTENT_CHARS = 600;

const tools = JSON.parse(readFileSync(TOOLS_PATH, 'utf-8'));
const before = JSON.parse(execSync(`git show ${REF}:data/tools.json`, { cwd: ROOT, maxBuffer: 64 * 1024 * 1024 }).toString('utf-8'));

const plainText = (t) =>
  (t.detailed_content || [])
    .map((s) => String(s.html || ''))
    .join('')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, '');
const nameKey = (t) => String(t.name || '').replace(/\s+/g, '').trim();

// ─── 1. 找回被误删的正文 ───
const restored = [];
for (const t of tools) {
  if ((t.detailed_content || []).length > 0) continue;
  const old = before.find((b) => b.slug === t.slug);
  if (!old || !(old.detailed_content || []).length) continue;
  const p = plainText(old);
  if (p.length < TOOL_MIN_CONTENT_CHARS) continue;
  if (!p.includes(nameKey(t))) continue;
  t.detailed_content = old.detailed_content;
  restored.push(t.slug);
}
console.log(`从 ${REF} 恢复正文: ${restored.length} 条`);

// ─── 2. 恢复后重新去重 ───
const groups = new Map();
for (const t of tools) {
  const p = plainText(t);
  if (!p) continue;
  const fp = p.slice(0, 300);
  if (!groups.has(fp)) groups.set(fp, []);
  groups.get(fp).push(t);
}

const stripSet = new Map();
for (const [, members] of groups) {
  if (members.length < 2) continue;
  const selfMentioning = members.filter((t) => plainText(t).includes(nameKey(t)));
  if (selfMentioning.length === 0) {
    members.forEach((m) => stripSet.set(m.slug, '重复正文（组内无归属者）'));
    continue;
  }
  const semantic = selfMentioning.filter((t) => !/^tool\d+$/.test(t.slug));
  const owner = (semantic.length ? semantic : selfMentioning).sort(
    (a, b) => plainText(b).length - plainText(a).length
  )[0];
  members.forEach((m) => {
    if (m.slug !== owner.slug) stripSet.set(m.slug, `重复正文（归属方 ${owner.slug}）`);
  });
}

// ─── 3. 主题复校：正文必须提到自身工具名 ───
for (const t of tools) {
  const p = plainText(t);
  if (!p) continue;
  if (!p.includes(nameKey(t))) stripSet.set(t.slug, '正文未提及自身工具名');
}

const dupStripped = [...stripSet.entries()].filter(([s]) => restored.includes(s));
console.log(`去重/复校后需再次剥离: ${stripSet.size} 条，其中来自本次恢复的: ${dupStripped.length} 条`);
dupStripped.slice(0, 10).forEach(([s, r]) => console.log(`   ${s} ${r}`));

let restoredFinal = 0;
for (const t of tools) {
  if (stripSet.has(t.slug)) t.detailed_content = [];
  if (restored.includes(t.slug) && !stripSet.has(t.slug)) restoredFinal++;
}
console.log(`最终净恢复: ${restoredFinal} 条`);

if (!APPLY) {
  console.log('（试算模式，未写盘。加 --apply 执行）');
  process.exit(0);
}
writeFileSync(TOOLS_PATH, JSON.stringify(tools, null, 2), 'utf-8');
console.log('已写盘 data/tools.json');
