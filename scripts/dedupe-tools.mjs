// scripts/dedupe-tools.mjs
// 全库一致性校验（AdSense P1「slug/url 一致性系统校验」）：
// 合并「官网 URL 与名称都相同」的重复工具条目。
//
// 保守策略：只在归一化后的 URL 与去空白后的名称都相同时才判定为重复；
// 同名但 URL 不同、同 URL 但名称不同的组合一律不动（可能只是 URL 填错，不是重复条目），
// 仅打印清单供人工复核。
//
// 保留规则（依次比较）：有编辑部评测 > 可索引 > 语义 slug > 正文更长 > 评分更高。
// 被合并条目的 slug 写入 data/slug_redirects.json，生成 301 指向保留方；
// 同时删除其 logo 文件、按实际重算 categories.json 的 count。
//
// 用法：
//   node scripts/dedupe-tools.mjs            # 试算
//   CODEBUDDY_SAFE_DELETE_ENABLED=0 node scripts/dedupe-tools.mjs --apply

import { readFileSync, writeFileSync, existsSync, unlinkSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const TOOLS_PATH = join(ROOT, 'data', 'tools.json');
const EDITORIALS_PATH = join(ROOT, 'data', 'editorials.json');
const TOOL_PROFILES_PATH = join(ROOT, 'data', 'tool_profiles.json');
const CATEGORIES_PATH = join(ROOT, 'data', 'categories.json');
const REDIRECTS_DB = join(ROOT, 'data', 'slug_redirects.json');
const LOGO_DIR = join(ROOT, 'public', 'logos');
const APPLY = process.argv.includes('--apply');

const tools = JSON.parse(readFileSync(TOOLS_PATH, 'utf-8'));
const editorials = JSON.parse(readFileSync(EDITORIALS_PATH, 'utf-8'));
const toolProfiles = JSON.parse(readFileSync(TOOL_PROFILES_PATH, 'utf-8'));
// 原创内容池（与 lib/tools.ts 的 isToolIndexable 保持一致）
const originalSlugs = new Set([
  ...editorials.map((e) => e.slug),
  ...Object.keys(toolProfiles.items || {}),
]);

const TOOL_MIN_CONTENT_CHARS = 600;
const plain = (t) =>
  (t.detailed_content || [])
    .map((s) => String(s.html || ''))
    .join('')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, '');
const nk = (n) => String(n || '').replace(/\s+/g, '').trim();
const clean = (n) => {
  const s = (n || '').trim();
  return !!s && s.length <= 30 && !s.includes(' | ') && !s.includes('&#') && !s.includes('--');
};
const indexable = (t) =>
  originalSlugs.has(t.slug) && clean(t.name) && plain(t).length >= TOOL_MIN_CONTENT_CHARS && plain(t).includes(nk(t.name));
const normUrl = (u) => {
  try {
    const x = new URL(u);
    return (x.hostname.replace(/^www\./, '') + x.pathname).replace(/\/+$/, '').toLowerCase();
  } catch {
    return String(u || '');
  }
};

// ─── 分组：同 URL + 同名 ───
const byKey = new Map();
tools.forEach((t) => {
  const k = `${normUrl(t.url)}|${nk(t.name)}`;
  if (!byKey.has(k)) byKey.set(k, []);
  byKey.get(k).push(t);
});

const groups = [...byKey.entries()].filter(([, v]) => v.length > 1);

// 保留方打分（越大越优先）
const score = (t) => [
  originalSlugs.has(t.slug) ? 1 : 0,
  indexable(t) ? 1 : 0,
  /^tool\d+$/.test(t.slug) ? 0 : 1,
];
const better = (a, b) => {
  const sa = score(a);
  const sb = score(b);
  for (let i = 0; i < sa.length; i++) {
    if (sa[i] !== sb[i]) return sa[i] > sb[i];
  }
  if (plain(a).length !== plain(b).length) return plain(a).length > plain(b).length;
  return (a.rating || 0) > (b.rating || 0);
};

const removals = []; // { slug, keep, name }
groups.forEach(([, v]) => {
  const sorted = [...v].sort((a, b) => (better(a, b) ? -1 : better(b, a) ? 1 : 0));
  const keep = sorted[0];
  sorted.slice(1).forEach((t) => removals.push({ slug: t.slug, keep: keep.slug, name: t.name }));
});

console.log(`「同 URL + 同名」重复组: ${groups.length}，待合并条目: ${removals.length}`);
removals.forEach((r) => console.log(`  ${r.slug.padEnd(20)} → ${r.keep.padEnd(20)} ${r.name}`));

// ─── 仅供人工复核的近似重复（不自动处理）───
const byName = new Map();
tools.forEach((t) => {
  if (!byName.has(nk(t.name))) byName.set(nk(t.name), []);
  byName.get(nk(t.name)).push(t);
});
const similarName = [...byName.values()].filter(
  (v) => v.length > 1 && new Set(v.map((t) => normUrl(t.url))).size > 1
);
const byUrl = new Map();
tools.forEach((t) => {
  if (!byUrl.has(normUrl(t.url))) byUrl.set(normUrl(t.url), []);
  byUrl.get(normUrl(t.url)).push(t);
});
const similarUrl = [...byUrl.values()].filter(
  (v) => v.length > 1 && new Set(v.map((t) => nk(t.name))).size > 1
);
console.log(`\n待人工复核：同名但 URL 不同 ${similarName.length} 组；同 URL 但名称不同 ${similarUrl.length} 组`);
similarName.slice(0, 12).forEach((v) => console.log(`  [同名] ${v.map((t) => `${t.slug}(${t.url.slice(0, 26)})`).join(' , ')}`));
similarUrl.slice(0, 12).forEach((v) => console.log(`  [同URL] ${v.map((t) => t.slug).join(', ')} | ${v[0].url.slice(0, 40)}`));

if (!APPLY) {
  console.log('\n（试算模式，未写盘。加 --apply 执行）');
  process.exit(0);
}

// ─── 执行合并 ───
const removeSlugs = new Set(removals.map((r) => r.slug));

// 1. 301 映射
let db = {};
try {
  db = JSON.parse(readFileSync(REDIRECTS_DB, 'utf-8'));
} catch {
  db = {};
}
removals.forEach((r) => {
  db[r.slug] = { new: r.keep, name: r.name };
});
writeFileSync(REDIRECTS_DB, JSON.stringify(db, null, 2), 'utf-8');

// 2. 删除 logo 文件
let removedLogos = 0;
tools
  .filter((t) => removeSlugs.has(t.slug))
  .forEach((t) => {
    if (!t.logo) return;
    const f = join(LOGO_DIR, String(t.logo).replace(/^\/logos\//, ''));
    if (existsSync(f)) {
      unlinkSync(f);
      removedLogos++;
    }
  });

// 3. 从工具库移除
const kept = tools.filter((t) => !removeSlugs.has(t.slug));
writeFileSync(TOOLS_PATH, JSON.stringify(kept, null, 2), 'utf-8');

// 4. 重算 categories.count
const categories = JSON.parse(readFileSync(CATEGORIES_PATH, 'utf-8'));
const countMap = {};
kept.forEach((t) => (t.categories || []).forEach((c) => (countMap[c] = (countMap[c] || 0) + 1)));
let countChanged = 0;
categories.forEach((c) => {
  const next = countMap[c.slug] || 0;
  if (c.count !== next) {
    console.log(`  count ${c.slug}: ${c.count} → ${next}`);
    c.count = next;
    countChanged++;
  }
});
writeFileSync(CATEGORIES_PATH, JSON.stringify(categories, null, 2), 'utf-8');

console.log(`\n已合并 ${removals.length} 条；删除 logo ${removedLogos} 个；重算 count ${countChanged} 项`);
console.log(`工具总数: ${tools.length} → ${kept.length}`);
