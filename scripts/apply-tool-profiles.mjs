// scripts/apply-tool-profiles.mjs
// 把 data/tool_profiles.json 中编辑部撰写的原创资料合并进 data/tools.json 的 detailed_content。
//
// 用法：
//   node scripts/apply-tool-profiles.mjs            # 试算
//   CODEBUDDY_SAFE_DELETE_ENABLED=0 node scripts/apply-tool-profiles.mjs --apply

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const TOOLS_PATH = join(ROOT, 'data', 'tools.json');
const PROFILES_PATH = join(ROOT, 'data', 'tool_profiles.json');
const APPLY = process.argv.includes('--apply');

const tools = JSON.parse(readFileSync(TOOLS_PATH, 'utf-8'));
const profiles = JSON.parse(readFileSync(PROFILES_PATH, 'utf-8')).items || {};

const plain = (html) => String(html || '').replace(/<[^>]+>/g, '').replace(/\s+/g, '');

let applied = 0;
const missing = [];

for (const [slug, profile] of Object.entries(profiles)) {
  const tool = tools.find((t) => t.slug === slug);
  if (!tool) {
    missing.push(slug);
    continue;
  }
  const sections = (profile.sections || []).filter((s) => s && s.title && s.html);
  if (sections.length === 0) continue;

  const chars = sections.reduce((a, s) => a + plain(s.html).length, 0);
  const hasName = sections.some((s) => plain(s.html).includes(tool.name) || String(s.title).includes(tool.name));
  console.log(
    `${slug.padEnd(18)} ${String(chars).padStart(5)} 字  含自身名:${hasName ? '是' : '否'}  ${tool.name}`
  );

  tool.detailed_content = sections;
  if (profile.updated) tool.updatedAt = profile.updated;
  applied++;
}

console.log(`\n应用 ${applied} 条；profiles 中未匹配到工具的 slug: ${missing.length}${missing.length ? ' → ' + missing.join(', ') : ''}`);

if (APPLY) {
  writeFileSync(TOOLS_PATH, JSON.stringify(tools, null, 2), 'utf-8');
  console.log('已写盘 data/tools.json');
} else {
  console.log('（试算模式，未写盘。加 --apply 执行）');
}
