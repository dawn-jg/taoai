"""
Scrape ai-bot.cn tutorial pages using xbrowser CLI via subprocess.
"""
import subprocess, json, time, os

node_path = r"C:\Program Files\nodejs\node.exe"
if not os.path.isfile(node_path):
    import shutil
    node_path = shutil.which("node") or "node.exe"

xb_path = r"C:\Program Files\QClaw\v0.2.23.532\resources\openclaw\config\skills\xbrowser\scripts\xb.cjs"

def xb(*args):
    cmd = [node_path, xb_path, "run", "--browser", "default"] + list(args)
    r = subprocess.run(cmd, capture_output=True, timeout=45)
    stdout = r.stdout.decode("utf-8", errors="replace")
    try:
        return json.loads(stdout)
    except:
        return {"ok": False, "raw": stdout[:300]}

def get_html(res):
    """Extract html from xb response (nested structure)."""
    try:
        return res["data"]["result"]["data"]["html"]
    except (KeyError, TypeError):
        return ""

BASE = "https://ai-bot.cn/ai-tutorials"
all_html = []

for page in range(1, 6):
    url = f"{BASE}/page/{page}/" if page > 1 else BASE
    print(f"  Page {page}: {url}")
    res = xb("open", url)
    title = get_html(res)[:60] or "?"
    if not res.get("ok"):
        print(f"    Failed: {res.get('raw','')[:100]}")
        continue
    print(f"    Loaded")
    time.sleep(0.3)
    
    res = xb("get", "html", ".content-layout")
    if not res.get("ok"):
        print(f"    Failed")
        continue
    html = get_html(res)
    if html:
        all_html.append(html)
        print(f"    Got {len(html)} chars")
    else:
        print(f"    Empty response")
    time.sleep(1)

combined = "\n<!-- PAGE BREAK -->\n".join(all_html)
out_path = "D:/ai-nav-site/_tutorials_raw.html"
with open(out_path, "w", encoding="utf-8") as f:
    f.write(combined)
print(f"\nTotal: {len(all_html)} pages = {len(combined)} chars")
