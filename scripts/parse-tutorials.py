"""
Parse ai-bot tutorial listings from raw HTML and generate tutorials data.
"""
import json, re, html as html_mod

RAW_FILE = "D:/ai-nav-site/_tutorials_raw.html"
OUTPUT_FILE = "D:/ai-nav-site/data/tutorials.json"

with open(RAW_FILE, "r", encoding="utf-8") as f:
    raw = f.read()

pages = raw.split("<!-- PAGE BREAK -->")

def extract_tutorials(html_text):
    """Extract tutorial entries from list-item card elements"""
    items = []
    # Each item structure:
    # <div class="list-grid ...">
    #   <div class="list-item card">CONTENT</div>
    # </div>
    blocks = re.findall(
        r'<div class="list-grid[^>]*>\s*<div class="list-item card">(.*?)</div>\s*</div>',
        html_text, re.DOTALL
    )
    
    for block in blocks:
        # Thumbnail (data-src from lazy-loaded <a>)
        thumb_match = re.search(r'data-src="([^"]+)"', block)
        thumb = thumb_match.group(1) if thumb_match else ""
        
        # URL and title from the title attribute on <a>
        title_link_match = re.search(
            r'<a[^>]*href="([^"]+)"[^>]*title="([^"]+)"[^>]*class="list-title',
            block
        )
        if not title_link_match:
            # try fallback: find any <a> with title
            title_link_match = re.search(r'<a[^>]*href="([^"]+)"[^>]*title="([^"]+)"', block)
            if not title_link_match:
                continue
        
        url = title_link_match.group(1)
        full_title = title_link_match.group(2)
        
        # Check "新" badge
        is_new = bool(re.search(r'badge vc-red', block))
        
        # Remove badge text from title
        clean_title = re.sub(r'<span[^>]*>新</span>\s*', '', full_title)
        clean_title = html_mod.unescape(clean_title).strip()
        
        # Description
        desc_match = re.search(r'overflowClip_2[^>]*>(.*?)</div>', block)
        desc = desc_match.group(1) if desc_match else ""
        desc = html_mod.unescape(desc).strip()
        
        # Category
        cat_match = re.search(r'icon-classification[^<]*</i>\s*<a[^>]*>([^<]+)</a>', block)
        category = cat_match.group(1) if cat_match else "AI教程"
        
        # Time
        time_match = re.search(r'<time[^>]*>([^<]+)</time>', block)
        time_str = time_match.group(1) if time_match else ""
        
        # Generate slug from URL
        slug = re.sub(r'https?://[^/]+/', '', url).rstrip('/')
        slug = re.sub(r'[^a-z0-9-]', '-', slug.lower()).strip('-')[:60]
        if not slug:
            slug = f"tutorial-{len(items)}"
        
        items.append({
            "slug": slug,
            "title": clean_title,
            "summary": desc[:250],
            "content": "",
            "date": time_str,
            "category": category,
            "thumbnail": thumb,
            "url": url,
            "is_new": is_new,
        })
    
    return items

# Parse all pages
seen_urls = set()
all_tutorials = []
for page_html in pages:
    items = extract_tutorials(page_html)
    for item in items:
        if item["url"] not in seen_urls:
            seen_urls.add(item["url"])
            all_tutorials.append(item)

print(f"Extracted {len(all_tutorials)} tutorials from {len(pages)} pages")

# Load existing tutorials (keep any that have content)
with open(OUTPUT_FILE, "r", encoding="utf-8") as f:
    existing = json.load(f)

existing_with_content = {t["slug"]: t for t in existing if t.get("content")}
new_slugs = {t["slug"] for t in all_tutorials}

# Merge: new data first, then old ones not in new data (with content)
final = list(all_tutorials)  # newest first
for slug, t in existing_with_content.items():
    if slug not in new_slugs:
        final.append(t)

# Save
with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
    json.dump(final, f, ensure_ascii=False, indent=2)

print(f"Saved {len(final)} tutorials (new: {len(all_tutorials)}, kept-old: {len(final)-len(all_tutorials)})")
for t in final[:5]:
    badge = "[NEW]" if t.get("is_new") else "     "
    print(f"  {badge} {t['title']} ({t['date']}) [cat: {t.get('category','?')}]")
