const fs = require('fs');
const file = 'D:\\ai-nav-site\\data\\news.json';
let t = fs.readFileSync(file, 'utf8');
t = t.replace(/[\u201c\u201d]/g, '"');
fs.writeFileSync(file, t, 'utf8');
console.log('Fixed');
// validate
const j = JSON.parse(t);
console.log('Valid JSON, items:', j.length);
