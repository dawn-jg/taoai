const fs = require('fs');
const path = 'D:/ai-nav-site/data/tools.json';
const tools = JSON.parse(fs.readFileSync(path, 'utf-8'));
const before = tools.length;
const toRemove = new Set(['tool72731', 'tool56', 'tool54501']);
const filtered = tools.filter(t => !toRemove.has(t.slug));
fs.writeFileSync(path, JSON.stringify(filtered, null, 2), 'utf-8');
console.log('删除重复:', before, '->', filtered.length, '| 删了:', before - filtered.length);
