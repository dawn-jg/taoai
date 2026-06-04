const { execSync } = require('child_process');
const fs = require('fs');
const raw = execSync('git show 033578fd:data/news.json', { cwd: 'D:\\ai-nav-site', encoding: 'buffer' });
const text = raw.toString('utf8').replace(/^\uFEFF/, '').trim();
const j = JSON.parse(text);
console.log('Total:', j.length);
j.forEach((i,n) => console.log(n+1, '|', (i.title||'').substring(0,25), '|', i.url || 'NO URL'));
