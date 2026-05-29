// xbrowser-based batch scraper for ai-bot.cn tutorial content
import { execSync, exec } from 'child_process';
import fs from 'fs';
import path from 'path';

const NODE_CMD = 'node';
const XB_SCRIPT = 'C:\\Program Files\\QClaw\\v0.2.23.532\\resources\\openclaw\\config\\skills\\xbrowser\\scripts\\xb.cjs';
const TUTORIALS_FILE = path.resolve('data/tutorials.json');

const tutorials = JSON.parse(fs.readFileSync(TUTORIALS_FILE, 'utf-8'));
const toScrape = tutorials.filter(t => !t.content);
console.log(`Total tutorials: ${tutorials.length}`);
console.log(`Need content: ${toScrape.length}`);

const SKIP_REDIRECT = ['vipcheap-banner-0210', 'buy-chatgpt-plus-claude-pro-china', 'chatgpt-plus-recharge-on-behalf', 'coding-plan-buying-guide', 'volcano-coding-plan-review'];

function xbRun(args) {
  return new Promise((resolve, reject) => {
    const cmd = `"${NODE_CMD}" "${XB_SCRIPT}" run --browser default ${args}`;
    exec(cmd, { timeout: 25000 }, (err, stdout, stderr) => {
      resolve({ ok: !err, stdout, stderr });
    });
  });
}

async function scrapeOne(tutorial) {
  const slug = tutorial.slug;
  
  if (SKIP_REDIRECT.includes(slug)) {
    console.log(`[SKIP] ${slug}: known redirect, no ai-bot content`);
    return null;
  }

  // Open the page
  const openResult = await xbRun(`open "${tutorial.url}"`);
  
  // Get content
  const getResult = await xbRun('get html ".panel-body.single"');

  try {
    const data = JSON.parse(getResult.stdout);
    const html = data?.data?.result?.data?.html;
    if (html && html.trim().length > 50) {
      console.log(`[OK] ${slug}: ${Math.round(html.length / 3)} chars`);
      return { slug, content: html };
    } else {
      console.log(`[NO] ${slug}: empty content`);
      return null;
    }
  } catch {
    console.log(`[ERR] ${slug}: parse error`);
    return null;
  }
}

async function main() {
  const batchSize = 3;
  let successCount = 0;
  
  for (let i = 0; i < toScrape.length; i += batchSize) {
    const batch = toScrape.slice(i, i + batchSize);
    console.log(`\n--- Batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(toScrape.length / batchSize)} ---`);
    
    const results = await Promise.all(batch.map(t => scrapeOne(t).catch(e => {
      console.log(`[FAIL] ${t.slug}: ${e.message}`);
      return null;
    })));
    
    const valid = results.filter(r => r !== null);
    successCount += valid.length;
    
    // Save incrementally
    if (valid.length > 0) {
      const current = JSON.parse(fs.readFileSync(TUTORIALS_FILE, 'utf-8'));
      for (const r of valid) {
        const idx = current.findIndex(t => t.slug === r.slug);
        if (idx >= 0) {
          current[idx].content = r.content;
          current[idx].summary = (r.content.replace(/<[^>]+>/g, '').substring(0, 150) + '...');
        }
      }
      fs.writeFileSync(TUTORIALS_FILE, JSON.stringify(current, null, 2), 'utf-8');
      console.log(`  Saved to tutorials.json (${valid.length} tutorials)`);
    }
  }
  
  console.log(`\n=== Done! ${successCount}/${toScrape.length} scraped ===`);
}

main().catch(console.error);
