const fs = require('fs');
const path = 'D:/ai-nav-site/data/tools.json';
const tools = JSON.parse(fs.readFileSync(path, 'utf-8'));
let fixed = 0;
// 解码 HTML 实体
function decodeEntities(s) {
  return s
    .replace(/&#x([0-9a-fA-F]+);/g, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)))
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&middot;/g, '·');
}
const affected = [];
tools.forEach(t => {
  let n = t.name;
  if (/&#x|&#\d|&amp;|&quot;|&lt;|&gt;|&nbsp;|&middot;/.test(n)) {
    const d = decodeEntities(n);
    if (d !== n) { t.name = d; fixed++; affected.push(t.slug + ': ' + n.slice(0, 30) + ' → ' + d.slice(0, 30)); }
  }
  if (t.description && /&#x|&#\d|&amp;/.test(t.description)) {
    t.description = decodeEntities(t.description);
  }
});
fs.writeFileSync(path, JSON.stringify(tools, null, 2), 'utf-8');
console.log('修复 name 数:', fixed);
affected.forEach(a => console.log(' ', a));
