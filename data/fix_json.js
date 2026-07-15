const fs = require('fs');
let raw = fs.readFileSync('D:\\ai-nav-site\\data\\news.json', 'utf8');
raw = raw.replace(/\u201C/g, '\u201C').replace(/\u201D/g, '\u201D');
fs.writeFileSync('D:\\ai-nav-site\\data\\news.json', raw, 'utf8');
console.log('OK');
