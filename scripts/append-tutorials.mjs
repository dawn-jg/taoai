// 追加教程条目到 data/tutorials.json：按 slug 去重，打印去标签去空白字数
// 用法：node scripts/append-tutorials.mjs .tmp_raw/b155/entries_1.json [--apply]
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const apply = args.includes('--apply');
const files = args.filter(a => !a.startsWith('--'));

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '..');
const DATA = path.join(ROOT, 'data', 'tutorials.json');
const tutorials = JSON.parse(fs.readFileSync(DATA, 'utf8'));
const existing = new Set(tutorials.map(t => t.slug));

function plain(html) {
  return (html || '')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, '');
}

let added = 0;
for (const f of files) {
  const entries = JSON.parse(fs.readFileSync(path.resolve(ROOT, f), 'utf8'));
  for (const e of entries) {
    if (existing.has(e.slug)) {
      console.log(`SKIP(dup) ${e.slug}`);
      continue;
    }
    const chars = plain(e.content).length;
    console.log(`${chars >= 600 ? 'OK ' : 'THIN'} ${String(chars).padStart(5)} ${e.slug}`);
    tutorials.push(e);
    existing.add(e.slug);
    added++;
  }
}

console.log(`\n新增 ${added} 条，教程总数 ${tutorials.length}，${apply ? '已写入' : '试算模式'}`);
if (apply && added > 0) {
  fs.writeFileSync(DATA, JSON.stringify(tutorials, null, 2) + '\n', 'utf8');
  console.log('已写入 data/tutorials.json');
}
