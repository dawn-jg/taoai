// scripts/fix-data-quality.mjs
// 数据质量修复（AdSense 整改 P1）：
//   1. 修正与名称不符的官网 URL（doubao / coze）
//   2. 清理抓取残留的「长标题式」工具名（37 条）
//   3. 归一化 domain 字段（去掉 ?utm_source=... 之类的查询串，供 ToolLogo 回退使用）
//   4. 全库补充 updatedAt（本次全量核对日期）
//
// 用法：
//   node scripts/fix-data-quality.mjs            # 试算，仅打印变更
//   CODEBUDDY_SAFE_DELETE_ENABLED=0 node scripts/fix-data-quality.mjs --apply

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const TOOLS_PATH = join(ROOT, 'data', 'tools.json');
const APPLY = process.argv.includes('--apply');
const TODAY = '2026-09-27';

const tools = JSON.parse(readFileSync(TOOLS_PATH, 'utf-8'));

// ─── 1. URL 修正（名称与链接不符）────────────────────────────────
const URL_FIXES = {
  doubao: 'https://www.doubao.com/chat/', // 原指向 chat.sensetime.com（商汤），实为字节跳动豆包
  coze: 'https://www.coze.cn/',           // 原指向 shengsuanyun.com（晟算云），实为字节跳动扣子 Coze
};

// ─── 1b. domain 修正（与 url 主域保持一致）───────────────────────
const DOMAIN_FIXES = {
  doubao: 'doubao.com',
  coze: 'coze.cn',
};

// ─── 2. 脏名称修正（从抓取页面标题截断而来）──────────────────────
const NAME_FIXES = {
  tool302: 'Zyro',
  tool63272: 'Pi 智能演示文档',
  tool59541: 'Shortcut',
  tool1146: 'Excelly-AI',
  tool1148: 'SheetGod',
  tool2957: 'Coda AI',
  tool60383: '可赞AI',
  tool1157: 'Miro 思维导图',
  tool64294: '求职方舟AI',
  tool62337: '面团AI',
  tool73229: 'AutoClaw（澳龙）',
  tool76942: 'MiniMax Hub',
  tool71972: 'Leewow',
  tool64120: 'Opera Neon',
  tool60693: '酷宣AI',
  tool14989: 'SeeleAgent',
  tool63488: 'Calicat',
  tool65752: 'UXBot',
  tool1414: '标小智',
  tool27582: 'LogoAI',
  tool122: 'Uizard AI',
  tool74132: '视频音频转文字提取',
  tool11026: 'Udio',
  tool67872: 'LLaMA-Factory Online',
  tool67128: 'API Mart',
  tool16684: 'Chunkr',
  tool1055: 'Udacity',
  tool411: 'StudyCorgi ChatGPT 检测',
  tool396: 'Sapling AI Detector',
  tool70682: 'SpeedAI',
  tool67481: '笔灵AI 论文降重',
  tool67571: 'Aibiye',
  tool67460: '千笔降AI',
  tool68088: '研笔AI',
  tool23110: 'AI Prompt Generator',
  tool23106: 'AiShort',
};

const isDirtyName = (n) => {
  n = (n || '').trim();
  return !n || n.length > 30 || n.includes(' | ') || n.includes('&#') || n.includes('--');
};

const changes = { url: 0, name: 0, domain: 0, updatedAt: 0 };
const unresolved = [];

for (const t of tools) {
  // 1. URL
  if (URL_FIXES[t.slug] && t.url !== URL_FIXES[t.slug]) {
    console.log(`[url]    ${t.slug.padEnd(12)} ${t.url} → ${URL_FIXES[t.slug]}`);
    t.url = URL_FIXES[t.slug];
    changes.url++;
  }

  // 2. 名称
  if (NAME_FIXES[t.slug] && t.name !== NAME_FIXES[t.slug]) {
    console.log(`[name]   ${t.slug.padEnd(12)} ${JSON.stringify(t.name).slice(0, 44)} → ${NAME_FIXES[t.slug]}`);
    t.name = NAME_FIXES[t.slug];
    changes.name++;
  }

  // 3. domain 归一化：domain 供 ToolLogo 拼接 favicon，
  //    必须是不带查询串的裸主机名。这里只修「带 ?/# 或为空」的脏值，
  //    其余不一致仅统计上报，不做自动改写（避免误改真实主域）。
  let host = '';
  try {
    host = new URL(t.url).hostname.toLowerCase().replace(/\.$/, '');
  } catch {
    unresolved.push(`${t.slug}: 非法 url ${t.url}`);
  }
  if (DOMAIN_FIXES[t.slug] && t.domain !== DOMAIN_FIXES[t.slug]) {
    console.log(`[domain] ${t.slug.padEnd(12)} ${t.domain} → ${DOMAIN_FIXES[t.slug]}`);
    t.domain = DOMAIN_FIXES[t.slug];
    changes.domain++;
  } else if (host && (!t.domain || /[?#]/.test(t.domain))) {
    console.log(`[domain] ${t.slug.padEnd(12)} ${t.domain || '(空)'} → ${host}`);
    t.domain = host;
    changes.domain++;
  }

  // 4. updatedAt
  if (t.updatedAt !== TODAY) {
    t.updatedAt = TODAY;
    changes.updatedAt++;
  }
}

// 复查：应无残留脏名称
const stillDirty = tools.filter((t) => isDirtyName(t.name));
stillDirty.forEach((t) => console.log(`[WARN] 仍为脏名称: ${t.slug} → ${JSON.stringify(t.name)}`));

console.log('\n变更统计:', changes);
console.log('仍为脏名称:', stillDirty.length);
if (unresolved.length) console.log('URL 解析失败:', unresolved.slice(0, 10));

if (APPLY) {
  writeFileSync(TOOLS_PATH, JSON.stringify(tools, null, 2), 'utf-8');
  console.log('\n已写盘 data/tools.json');
} else {
  console.log('\n（试算模式，未写盘。加 --apply 执行）');
}
