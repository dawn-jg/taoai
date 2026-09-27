// scripts/fetch-sources.mjs
// 抓取工具官网的基础事实素材，供编辑部撰写原创资料时参考（不是用来搬运的）。
//
// 合规边界（见 docs/original-content-sop.md 三条红线）：
//   · 只取产品自我描述类信息：title / meta description / og 标签 / 标题层级 / 首页可见文本摘要
//   · 这些内容仅作为事实素材写入 data/raw_sources/<slug>.json，供撰写时核对
//   · 正文一律由编辑部用自有语言重写，禁止逐句搬运或近义替换
//
// 用法：
//   node scripts/fetch-sources.mjs --slugs midjourney,claude,cursor
//   node scripts/fetch-sources.mjs --top 20            # 自动取优先级最高的 20 条待写
//   node scripts/fetch-sources.mjs --slugs a,b --force # 覆盖已有素材
//
// 说明：Node 的 fetch 不读系统代理。若目标站需要代理，先设置 HTTPS_PROXY 并改用
// curl 备用通道；此处仅走直连，失败会如实记录，不重试不伪造。

import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const OUT_DIR = join(ROOT, 'data', 'raw_sources');

const args = process.argv.slice(2);
const has = (n) => args.includes(n);
const opt = (n, d) => {
  const i = args.indexOf(n);
  return i >= 0 && args[i + 1] ? args[i + 1] : d;
};

const TIMEOUT = Number(opt('--timeout', '15000'));
const CONCURRENCY = Number(opt('--concurrency', '8'));
const FORCE = has('--force');

// ─── 目标 slug 解析 ───
let slugs = [];

if (opt('--slugs', '')) {
  slugs = opt('--slugs', '').split(',').map((s) => s.trim()).filter(Boolean);
} else {
  // 从内容队列读取待写清单（先跑 node scripts/content-queue.mjs --top N --save）
  const queuePath = join(ROOT, 'data', 'content_queue.json');
  if (!existsSync(queuePath)) {
    console.error('未找到 data/content_queue.json。\n先执行：node scripts/content-queue.mjs --top 30 --save');
    process.exit(1);
  }
  slugs = JSON.parse(readFileSync(queuePath, 'utf-8')).batch.map((b) => b.slug);
}

const tools = JSON.parse(readFileSync(join(ROOT, 'data', 'tools.json'), 'utf-8'));
const bySlug = new Map(tools.map((t) => [t.slug, t]));

mkdirSync(OUT_DIR, { recursive: true });

// 模式 B：解析已抓取的 HTML。
// 有些站点需走代理，而 Node fetch 不读系统代理；此时用 curl 抓成文件
// （文件名即 <slug>.html），再由本脚本统一解析，保证解析逻辑只有一份。
if (has('--from-dir')) {
  const dir = opt('--from-dir', '');
  if (!dir || !existsSync(dir)) {
    console.error('目录不存在：' + dir);
    process.exit(1);
  }
  const files = readdirSync(dir).filter((f) => f.endsWith('.html'));
  let okCount = 0;
  for (const f of files) {
    const slug = f.replace(/\.html$/, '');
    const tool = bySlug.get(slug);
    if (!tool) continue;
    const parsed = parseHtml(decodeBody(readFileSync(join(dir, f)), ''));
    const out = {
      slug,
      name: tool.name,
      url: tool.url,
      ok: !!(parsed.title || parsed.description || parsed.textSample),
      error: '',
      fetchedAt: new Date().toISOString().slice(0, 10),
      ...parsed,
    };
    if (!out.ok) out.error = '未解析到有效内容（可能是 SPA 需 JS 渲染）';
    writeFileSync(join(OUT_DIR, `${slug}.json`), JSON.stringify(out, null, 2), 'utf-8');
    if (out.ok) okCount++;
    console.log(`${out.ok ? 'OK  ' : 'FAIL'} ${slug.padEnd(24)} ${String(out.title || out.error).slice(0, 48)}`);
  }
  console.log('');
  console.log(`解析完成：成功 ${okCount}/${files.length} → data/raw_sources/`);
  process.exit(0);
}

// ─── 极简 HTML 解析 ───
function decodeEntities(s) {
  return String(s)
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(Number(d)))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCharCode(parseInt(h, 16)));
}
function strip(s) {
  return s.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function metaContent(html, key) {
  const tag = html.match(new RegExp(`<meta[^>]+(?:name|property)\\s*=\\s*["']${key}["'][^>]*>`, 'i'));
  if (!tag) return '';
  const c = tag[0].match(/content\s*=\s*["']([^"']*)["']/i);
  return c ? decodeEntities(c[1]).trim() : '';
}

function visibleText(html) {
  return decodeEntities(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ')
      .replace(/<!--[\s\S]*?-->/g, ' ')
      .replace(/<[^>]+>/g, ' ')
  )
    .replace(/\s+/g, ' ')
    .trim();
}

function parseHtml(html) {
  const titleM = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const headings = [...html.matchAll(/<h([1-3])[^>]*>([\s\S]*?)<\/h\1>/gi)]
    .map((m) => strip(decodeEntities(m[2])))
    .filter((h) => h && h.length <= 80);
  const desc =
    metaContent(html, 'description') ||
    metaContent(html, 'og:description') ||
    '';
  return {
    title: titleM ? strip(decodeEntities(titleM[1])) : '',
    description: desc,
    ogTitle: metaContent(html, 'og:title'),
    ogDescription: metaContent(html, 'og:description'),
    keywords: metaContent(html, 'keywords'),
    headings: [...new Set(headings)].slice(0, 14),
    textSample: visibleText(html).slice(0, 1500),
  };
}

function decodeBody(buf, contentType) {
  let charset = 'utf-8';
  const ct = String(contentType || '').match(/charset\s*=\s*["']?([\w-]+)/i);
  if (ct) charset = ct[1].toLowerCase();
  const head = buf.slice(0, 4096).toString('latin1');
  const hm = head.match(/charset\s*=\s*["']?([\w-]+)/i);
  if (hm) charset = hm[1].toLowerCase();
  if (charset === 'gb2312' || charset === 'gbk') charset = 'gbk';
  try {
    return new TextDecoder(charset).decode(buf);
  } catch {
    return buf.toString('utf-8');
  }
}

async function fetchOne(tool) {
  const out = { slug: tool.slug, name: tool.name, url: tool.url, ok: false, error: '' };
  if (!tool.url) {
    out.error = '无 url';
    return out;
  }
  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), TIMEOUT);
  try {
    const res = await fetch(tool.url, {
      signal: ctl.signal,
      redirect: 'follow',
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
      },
    });
    out.status = res.status;
    out.finalUrl = res.url;
    if (!res.ok) {
      out.error = `HTTP ${res.status}`;
      return out;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    const parsed = parseHtml(decodeBody(buf, res.headers.get('content-type')));
    Object.assign(out, parsed);
    out.ok = !!(parsed.title || parsed.description || parsed.textSample);
    if (!out.ok) out.error = '未解析到有效内容（可能是 SPA 需 JS 渲染）';
    return out;
  } catch (e) {
    out.error = e.name === 'AbortError' ? `超时 ${TIMEOUT}ms` : String(e.message || e);
    return out;
  } finally {
    clearTimeout(timer);
  }
}

// ─── 并发执行 ───
const targets = slugs
  .map((s) => bySlug.get(s))
  .filter(Boolean)
  .filter((t) => FORCE || !existsSync(join(OUT_DIR, `${t.slug}.json`)));

const skipped = slugs.length - targets.length;
const results = [];
let cursor = 0;

async function worker() {
  while (cursor < targets.length) {
    const tool = targets[cursor++];
    const r = await fetchOne(tool);
    r.fetchedAt = new Date().toISOString().slice(0, 10);
    writeFileSync(join(OUT_DIR, `${tool.slug}.json`), JSON.stringify(r, null, 2), 'utf-8');
    results.push(r);
    const mark = r.ok ? 'OK  ' : 'FAIL';
    console.log(
      `${mark} ${String(tool.slug).padEnd(24)} ${String(r.status || '-').padEnd(5)} ${r.ok ? String((r.title || '').slice(0, 46)) : r.error}`
    );
  }
}

await Promise.all(Array.from({ length: Math.min(CONCURRENCY, targets.length) }, worker));

const ok = results.filter((r) => r.ok).length;
console.log('');
console.log(`完成：成功 ${ok} / 尝试 ${results.length}${skipped ? `（跳过已有 ${skipped}）` : ''}`);
console.log(`素材目录：data/raw_sources/`);
if (ok < results.length) {
  console.log('失败条目多为 SPA（正文由 JS 渲染）或站点不可直连，需人工核对官网，禁止据空素材编造内容。');
}
