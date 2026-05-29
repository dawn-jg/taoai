"""Debug: check raw HTML structure"""
import re

with open("D:/ai-nav-site/_tutorials_raw.html", "r", encoding="utf-8") as f:
    raw = f.read()

print(f"Raw length: {len(raw)} chars")
print(f"Contains 'list-item card': {'list-item card' in raw}")
print(f"Contains 'panel-body': {'panel-body' in raw}")

# Check the structure at the beginning
idx = raw.find("list-item")
if idx >= 0:
    print(f"\n--- First 2000 chars around 'list-item' ---")
    print(raw[max(0,idx-200):idx+1800])
else:
    print("\n--- First 2000 chars of file ---")
    print(raw[:2000])
