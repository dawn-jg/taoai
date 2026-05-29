"""Generate static sitemap.xml"""
import json

tools = json.load(open("data/tools.json", "r", encoding="utf-8"))
cats = json.load(open("data/categories.json", "r", encoding="utf-8"))
now = "2026-05-29"

with open("public/sitemap.xml", "w", encoding="utf-8") as f:
    f.write('<?xml version="1.0" encoding="UTF-8"?>\n')
    f.write('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n')
    f.write(f'  <url><loc>https://taoai365.com</loc><lastmod>{now}</lastmod><priority>1.0</priority></url>\n')
    f.write(f'  <url><loc>https://taoai365.com/content</loc><lastmod>{now}</lastmod><priority>0.8</priority></url>\n')
    f.write(f'  <url><loc>https://taoai365.com/search</loc><lastmod>{now}</lastmod><priority>0.5</priority></url>\n')
    for cat in cats:
        f.write(f'  <url><loc>https://taoai365.com/categories/{cat["slug"]}</loc><lastmod>{now}</lastmod><priority>0.8</priority></url>\n')
    for tool in tools:
        f.write(f'  <url><loc>https://taoai365.com/tools/{tool["slug"]}</loc><lastmod>{now}</lastmod><priority>0.7</priority></url>\n')
    for tool in tools:
        if tool.get("detailed_content"):
            f.write(f'  <url><loc>https://taoai365.com/content/{tool["slug"]}</loc><lastmod>{now}</lastmod><priority>0.6</priority></url>\n')
    f.write('</urlset>\n')

print("Sitemap generated")
