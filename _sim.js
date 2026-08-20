const fs = require('fs');
const tools = JSON.parse(fs.readFileSync('D:/ai-nav-site/data/tools.json', 'utf-8'));
const cats = JSON.parse(fs.readFileSync('D:/ai-nav-site/data/categories.json', 'utf-8'));
const catMap = {};
cats.forEach(c => catMap[c.slug] = { name: c.name, subs: c.subcategories || {} });
const SUFFIX = ' | TaoAI';

function compactUse(name) {
  if (!name) return '';
  return name
    .replace(/^(AI|AI·|AI-)/, '')
    .replace(/(工具|生成|平台|助手|模型|训练|系统|引擎|服务|器|工具集|制作)$/, '')
    .replace(/^(AI|AI·|AI-)/, '')
    .trim();
}

function getUse(t) {
  if (t.subcategory) {
    for (const cat of cats) {
      const subName = (cat.subcategories || {})[t.subcategory];
      if (subName) return compactUse(subName) || compactUse(cat.name);
    }
  }
  if (t.categories && t.categories[0]) {
    const cat = catMap[t.categories[0]];
    if (cat) return compactUse(cat.name);
  }
  return '';
}

// name 是描述句时压缩为品牌核心词
function compactName(name) {
  if (name.length <= 12) return name;
  let n = name
    // “XX推出的/推出的/打造的/上线的/发布的”
    .replace(/^[\u4e00-\u9fa5A-Za-z0-9]{1,8}(推出的|推出的的|打造的|上线的|发布的|推出的免费)/, '')
    // 冗余前缀形容词
    .replace(/^(免费|高效|专业|创新|智能|强大|领先|一站式|全能|快速|简单|便捷|精准|安全|可靠|实用|热门|顶级|优秀|最佳|全新|云|在线|极速|全面|深度|自动|智慧|赋能)/, '')
    .replace(/^(免费|高效|专业|创新|智能|强大|领先|一站式|全能|快速|简单|便捷|精准|安全|可靠|实用|热门|顶级|优秀|最佳|全新|云|在线|极速|全面|深度|自动|智慧|赋能)/, '')
    // 冗余尾缀
    .replace(/(AI|aigc|人工智能)?(工具|平台|助手|模型|系统|引擎|服务|机器人|生成器|工作台|网站|应用|软件|产品)$/, '')
    .trim();
  if (!n || n.length < 2) return name;
  return n;
}

function width(s) {
  let w = 0;
  for (const ch of s) w += ch.charCodeAt(0) > 255 ? 2 : 1;
  return w;
}

let over = 0, total = 0, nameCompressed = 0;
const byW = {};
const longSamples = [];
const samples = [];
tools.forEach(t => {
  let name = t.name;
  const isDesc = /(推出的|打造的|上线的|发布的|的AI|的免费|的智能|平台$|工具$|助手$)/.test(name) && name.length > 12;
  if (isDesc) { const c = compactName(name); if (c !== name) { name = c; nameCompressed++; } }
  const use = getUse(t);
  const gen = /[工具平台系统助手生成器机器人]/.test(name);
  const brand = (gen && t.domain) ? ' · ' + t.domain.replace(/^https?:\/\//, '').replace(/\/$/, '') : '';
  const title = name + ' - ' + use + brand + SUFFIX;
  total++;
  const w = width(title);
  const b = w <= 44 ? '<=44' : w <= 50 ? '45-50' : w <= 60 ? '51-60' : '>60';
  byW[b] = (byW[b] || 0) + 1;
  if (w > 50) { over++; if (longSamples.length < 14) longSamples.push('[' + w + ']' + title); }
  if (['deepseek', 'chatgpt', 'doubao', 'trae', 'midjourney', 'tool13455', 'tool15664', 'tool12586', 'tool14067'].includes(t.slug)) samples.push(t.slug + ' => ' + title);
});
console.log('总:', total, '| name压缩:', nameCompressed, '| 显示宽>50:', over, '(' + (over / total * 100).toFixed(1) + '%)');
console.log('宽度分布:', JSON.stringify(byW));
samples.forEach(s => console.log(s));
console.log('--- 超宽 ---');
longSamples.forEach(s => console.log(s));
