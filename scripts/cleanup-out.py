"""
Post-build cleanup: remove unnecessary files from Next.js static export
to stay under Cloudflare Pages 20,000 file limit.

Deletes:
1. logos/ directory (1,042 local favicon files, logos are served via Google Favicons URL)
2. All .txt RSC payload files (Next.js Flight protocol, not needed for static site rendering)
"""
import os, shutil, sys

out_dir = os.path.abspath(sys.argv[1] if len(sys.argv) > 1 else "out")

# 1. Count initial files
total_before = sum(len(files) for _, _, files in os.walk(out_dir))
print(f"Before cleanup: {total_before} files")

# 2. Delete logos/ directory
logos_dir = os.path.join(out_dir, "logos")
if os.path.isdir(logos_dir):
    count = sum(len(files) for _, _, files in os.walk(logos_dir))
    shutil.rmtree(logos_dir)
    print(f"Deleted logos/: {count} files")

# 3. Delete all .txt files (RSC payloads)
txt_count = 0
for root, dirs, files in os.walk(out_dir):
    for f in files:
        if f.endswith(".txt"):
            os.remove(os.path.join(root, f))
            txt_count += 1
print(f"Deleted .txt files: {txt_count}")

# 4. Count final
total_after = sum(len(files) for _, _, files in os.walk(out_dir))
print(f"After cleanup: {total_after} files")
print(f"Saved: {total_before - total_after} files")
