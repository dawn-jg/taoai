const fs = require('fs');
const data = fs.readFileSync('D:\\ai-nav-site\\data\\news.json', 'utf8');
const parsed = JSON.parse(data);
console.log('Valid JSON, items:', parsed.length);
