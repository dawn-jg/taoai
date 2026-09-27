// scripts/migrate-slugs.mjs
// P1：把可索引工具页中无语义的 toolNNNN slug 迁移为语义 slug，并生成 301 规则。
//
// 规则：
//   · 只迁移「允许被索引」且 slug 形如 toolNNNN 的条目（无索引价值的不动，避免无谓的重定向）
//   · 新 slug 由工具官网域名派生：www.xxx.com → xxx-com（纯 ASCII，稳定、可读）
//   · 冲突时追加 -2 / -3
//   · 同步重命名 public/logos/<old>.<ext> → <new>.<ext>，并更新 logo 字段
//   · 生成 public/_redirects（Cloudflare Pages 301），旧地址永久跳转到新地址
//
// 用法：
//   node scripts/migrate-slugs.mjs            # 试算
//   CODEBUDDY_SAFE_DELETE_ENABLED=0 node scripts/migrate-slugs.mjs --apply

import { readFileSync, writeFileSync, renameSync, existsSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const TOOLS_PATH = join(ROOT, 'data', 'tools.json');
const EDITORIALS_PATH = join(ROOT, 'data', 'editorials.json');
const LOGO_DIR = join(ROOT, 'public', 'logos');
const REDIRECTS_PATH = join(ROOT, 'public', '_redirects');
const APPLY = process.argv.includes('--apply');

const tools = JSON.parse(readFileSync(TOOLS_PATH, 'utf-8'));
const editorials = JSON.parse(readFileSync(EDITORIALS_PATH, 'utf-8'));
const editorialSlugs = new Set(editorials.map((e) => e.slug));

const TOOL_MIN_CONTENT_CHARS = 600;
const plainText = (t) =>
  (t.detailed_content || [])
    .map((s) => String(s.html || ''))
    .join('')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, '');
const isCleanName = (name) => {
  const n = (name || '').trim();
  if (!n || n.length > 30) return false;
  if (n.includes(' | ') || n.includes('&#') || n.includes('--')) return false;
  return true;
};
const isIndexable = (t) => {
  if (editorialSlugs.has(t.slug)) return true;
  if (!isCleanName(t.name)) return false;
  const p = plainText(t);
  if (p.length < TOOL_MIN_CONTENT_CHARS) return false;
  // 名称比对须去掉空白（plainText 已无空白），否则多词名称永远匹配不上
  return p.includes(String(t.name).replace(/\s+/g, '').trim());
};

const AUTO = /^tool\d+$/;
const targets = tools.filter((t) => AUTO.test(t.slug) && isIndexable(t));

// 已被占用的 slug（不含待迁移条目的旧 slug，迁移后即释放）
const targetOldSlugs = new Set(targets.map((t) => t.slug));
const taken = new Set(tools.filter((t) => !targetOldSlugs.has(t.slug)).map((t) => t.slug));

/** 由名称 / 域名派生语义 slug
 *  优先用工具名（纯拉丁名，如 "Stable Diffusion" → stable-diffusion、"Kimi AI" → kimi-ai），
 *  名称含中日韩字符时才退回域名（域名比拼音更稳定、可读）。
 *  理由：部分条目的 name 与 url 并不指向同一产品，直接拿域名当 slug 会产生误导性地址。 */
function deriveSlug(tool) {
  const name = String(tool.name || '').trim();
  const hasCJK = /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff]/.test(name);

  const slugify = (s) =>
    String(s)
      .toLowerCase()
      .replace(/[’'`]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

  let base = '';
  if (!hasCJK) {
    const fromName = slugify(name);
    if (fromName.length >= 3 && !/^[0-9-]+$/.test(fromName)) base = fromName;
  }
  if (!base) {
    const host = String(tool.domain || '')
      .toLowerCase()
      .replace(/^https?:\/\//, '')
      .replace(/^www\./, '')
      .replace(/[/?#].*$/, '');
    base = slugify(host);
  }
  if (!base || base.length < 2 || /^[0-9-]+$/.test(base)) return '';
  if (base.length > 48) base = base.slice(0, 48).replace(/-+$/g, '');

  let slug = base;
  let n = 2;
  while (taken.has(slug)) {
    slug = `${base}-${n++}`;
  }
  taken.add(slug);
  return slug;
}

const mapping = []; // { old, new, name, domain }
const skipped = [];

for (const t of targets) {
  const next = deriveSlug(t);
  if (!next) {
    skipped.push(`${t.slug} (${t.name})`);
    continue;
  }
  mapping.push({ old: t.slug, new: next, name: t.name, domain: t.domain });
}

console.log(`待迁移: ${mapping.length} 条 / 可索引且为 toolNNNN 的共 ${targets.length} 条`);
if (skipped.length) console.log(`无法派生（保持原 slug）: ${skipped.length} → ${skipped.slice(0, 10).join(', ')}`);
console.log('\n映射示例（前 30）:');
mapping.slice(0, 30).forEach((m) => console.log(`  ${m.old.padEnd(12)} → ${m.new.padEnd(34)} ${m.name} (${m.domain})`));

// 冲突检查
const newSlugs = mapping.map((m) => m.new);
const dup = newSlugs.filter((s, i) => newSlugs.indexOf(s) !== i);
console.log('\n新 slug 重复:', dup.length, dup.slice(0, 5));

// 日志/截图引用检查
const shots = tools.filter((t) => (t.screenshots || []).some((s) => s.includes(t.slug)));
console.log('screenshots 路径含自身 slug 的条目:', shots.length);

if (!APPLY) {
  console.log('\n（试算模式，未写盘。加 --apply 执行）');
  process.exit(0);
}

// ─── 执行迁移 ───
let renamedLogos = 0;
let missingLogos = 0;
for (const m of mapping) {
  const tool = tools.find((t) => t.slug === m.old);
  tool.slug = m.new;

  // 重命名 logo 文件
  if (tool.logo) {
    const fileName = String(tool.logo).replace(/^\/logos\//, '');
    const dot = fileName.lastIndexOf('.');
    const ext = dot > -1 ? fileName.slice(dot) : '';
    if (fileName.startsWith(m.old) && existsSync(join(LOGO_DIR, fileName))) {
      const nextName = `${m.new}${ext}`;
      renameSync(join(LOGO_DIR, fileName), join(LOGO_DIR, nextName));
      tool.logo = `/logos/${nextName}`;
      renamedLogos++;
    } else {
      // 兜底：按旧 slug 前缀查找实际文件
      const hit = readdirSync(LOGO_DIR).find((f) => f.startsWith(`${m.old}.`));
      if (hit) {
        const nextName = `${m.new}${hit.slice(m.old.length)}`;
        renameSync(join(LOGO_DIR, hit), join(LOGO_DIR, nextName));
        tool.logo = `/logos/${nextName}`;
        renamedLogos++;
      } else {
        missingLogos++;
      }
    }
  }
}

// 修正 screenshots 路径
tools.forEach((t) => {
  if (!t.screenshots) return;
  t.screenshots = t.screenshots.map((s) => {
    for (const m of mapping) {
      if (s.includes(`/${m.old}`)) return s.split(`/${m.old}`).join(`/${m.new}`);
    }
    return s;
  });
});

writeFileSync(TOOLS_PATH, JSON.stringify(tools, null, 2), 'utf-8');
console.log(`\n已更新 data/tools.json（重命名 logo ${renamedLogos} 个，未找到 logo ${missingLogos} 个）`);

// ─── 生成 _redirects（累积式：历史映射写入 data/slug_redirects.json） ───
const REDIRECTS_DB = join(ROOT, 'data', 'slug_redirects.json');

let db = {};
try {
  db = JSON.parse(readFileSync(REDIRECTS_DB, 'utf-8'));
} catch {
  db = {};
}

// 首次运行时，从既有 _redirects 回填历史映射，避免覆盖丢失
if (Object.keys(db).length === 0 && existsSync(REDIRECTS_PATH)) {
  readFileSync(REDIRECTS_PATH, 'utf-8')
    .split(/\r?\n/)
    .forEach((line) => {
      const m = line.match(/^\/tools\/(\S+)\s+\/tools\/(\S+)\s+301$/);
      if (m) db[m[1]] = { new: m[2] };
    });
  console.log(`从既有 _redirects 回填历史映射 ${Object.keys(db).length} 条`);
}

mapping.forEach((m) => {
  db[m.old] = { new: m.new, name: m.name };
});

writeFileSync(REDIRECTS_DB, JSON.stringify(db, null, 2), 'utf-8');

const oldSlugs = Object.keys(db).sort();
const lines = [
  '# Cloudflare Pages 重定向规则（自动生成，请勿手改；重新生成见 scripts/migrate-slugs.mjs）',
  '# 2026-09：可索引工具页的无语义 slug（toolNNNN）→ 语义 slug，全部 301',
  `# 映射明细见 data/slug_redirects.json（共 ${oldSlugs.length} 条）`,
  '',
];
oldSlugs.forEach((old) => lines.push(`/tools/${old}  /tools/${db[old].new}  301`));
lines.push('');
oldSlugs.forEach((old) => lines.push(`/content/${old}  /tools/${db[old].new}  301`));
lines.push('');
writeFileSync(REDIRECTS_PATH, lines.join('\n'), 'utf-8');
console.log(`已生成 public/_redirects（累计 ${oldSlugs.length} 条旧 slug，${oldSlugs.length * 2} 行 301）`);
