#!/usr/bin/env node
/**
 * Post-build cleanup: remove unnecessary files from Next.js static export
 * to stay under Cloudflare Pages 20,000 file limit.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(process.argv[2] || path.join(__dirname, "..", "out"));

function countFiles(dir) {
  let count = 0;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      count += countFiles(path.join(dir, entry.name));
    } else {
      count++;
    }
  }
  return count;
}

// Count before
const before = countFiles(outDir);
console.log(`Before cleanup: ${before} files`);

// Delete RSC .txt files, but preserve ads.txt / robots.txt / indexnow-key.txt.
// Windows can transiently lock files (antivirus / search indexer), so retry
// per-file and never abort the whole cleanup on a single failure.
const KEEP = new Set(["ads.txt", "robots.txt", "indexnow-key.txt"]);
let txtCount = 0;
const failed = [];
function removeTxt(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      removeTxt(full);
    } else if (entry.name.endsWith(".txt") && !KEEP.has(entry.name)) {
      try {
        fs.unlinkSync(full);
        txtCount++;
      } catch (err) {
        failed.push({ path: full, code: err.code });
      }
    }
  }
}
removeTxt(outDir);
console.log(`Deleted .txt files: ${txtCount}`);
if (failed.length) {
  console.warn(`WARN: ${failed.length} .txt file(s) could not be removed (locked):`);
  for (const f of failed.slice(0, 10)) console.warn(`  - ${f.path} (${f.code})`);
}

// Count after
const after = countFiles(outDir);
console.log(`After cleanup: ${after} files`);
console.log(`Saved: ${before - after} files`);
