const fs = require('fs');
let content = fs.readFileSync('D:\\ai-nav-site\\data\\news.json', 'utf8');

// Replace Chinese/ASCII double quotes that appear inside JSON string values
// The pattern: after a CJK character, a " that's not part of JSON structure
// Simpler: find all inner double quotes and remove them
// Strategy: parse line by line, and for summary/title fields, replace " with 「」

const lines = content.split('\n');
const fixed = lines.map(line => {
  // For "summary" and "title" lines, replace inner " with 「」
  if (line.includes('"summary"') || line.includes('"title"')) {
    // The line is:     "summary": "...",
    // Find the value part (between the 3rd and last " before ,)
    // Simpler: after "summary": " or "title": ", replace all " until the closing ",
    const match = line.match(/"(summary|title)":\s*"/);
    if (match) {
      const prefix = line.substring(0, match.index + match[0].length);
      const rest = line.substring(match.index + match[0].length);
      // The rest ends with ", 
      const lastQuoteComma = rest.lastIndexOf('",');
      if (lastQuoteComma >= 0) {
        const value = rest.substring(0, lastQuoteComma);
        const suffix = rest.substring(lastQuoteComma);
        // Replace any " in the value part
        const fixedValue = value.replace(/"/g, '「').replace(/「/g, '「').replace(/」/g, '」');
        return prefix + fixedValue + suffix;
      }
    }
  }
  return line;
}).join('\n');

fs.writeFileSync('D:\\ai-nav-site\\data\\news.json', fixed, 'utf8');
console.log('Fixed');
