const fs = require('fs');
const path = 'D:/ai-nav-site/data/tools.json';
const tools = JSON.parse(fs.readFileSync(path, 'utf-8'));
const fixes = {
  'tool10217': 'Zoom Workplace',
};
let n = 0;
tools.forEach(t => {
  if (fixes[t.slug]) { t.name = fixes[t.slug]; n++; }
});
fs.writeFileSync(path, JSON.stringify(tools, null, 2), 'utf-8');
console.log('修正:', n);
