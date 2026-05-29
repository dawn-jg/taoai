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

// Delete logos/
const logosDir = path.join(outDir, "logos");
if (fs.existsSync(logosDir)) {
  const logosCount = countFiles(logosDir);
  fs.rmSync(logosDir, { recursive: true, force: true });
  console.log(`Deleted logos/: ${logosCount} files`);
}

// Delete all .txt files recursively
let txtCount = 0;
function removeTxt(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      removeTxt(full);
    } else if (entry.name.endsWith(".txt")) {
      fs.unlinkSync(full);
      txtCount++;
    }
  }
}
removeTxt(outDir);
console.log(`Deleted .txt files: ${txtCount}`);

// Count after
const after = countFiles(outDir);
console.log(`After cleanup: ${after} files`);
console.log(`Saved: ${before - after} files`);
