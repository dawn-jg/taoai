// 清洗 data/tools.json 中 URL 的推广/跟踪参数（含路径型跟踪），
// 使 link 指向工具的真实官网页面，而不是带渠道码的跳转链接。
//
// 用法：
//   node scripts/clean-tracking-urls.mjs           # 试算（只打印，不写盘）
//   node scripts/clean-tracking-urls.mjs --apply   # 落盘
//
// 说明：
// - 只删除「跟踪类」查询参数（utm_* / ref / from / hmsr / inviteCode / spm ...）。
//   功能性参数（如 gaoding 的 ?q=PPT）保留。
// - 路径型跟踪：/utms/<hash> 段删除；若删除后落到同一基址而需要区分，
//   用下面的 OVERRIDES 映射到该功能各自的真实页面。
import fs from 'fs';
import path from 'path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '..');
const TOOLS_PATH = path.join(ROOT, 'data', 'tools.json');
const APPLY = process.argv.includes('--apply');

// 跟踪参数名（小写精确匹配）
const TRACK = new Set([
  'hmsr', 'spm', 'spm_id_from', 'from', 'fromsource', 'from_source',
  'ref', 'referrer', 'referral', 'ref_src', 'refsrc',
  'source', 'sourceid', 'souceid', 'source_id',
  'share', 'share_code', 'sharecode', 'share_token', 'sharetoken', 'share_source', 'shareid',
  'shareruserid', 'share_user_id',
  'invite', 'invitecode', 'invitationcode', 'invite_code', 'invitationtype',
  'inviterid', 'inviter_id', 'invitesource', 'invite_ref', 'invitation_code',
  'channel', 'channelcode', 'channelcode', 'channelid', 'channel_id',
  'channel_track_key', '_channel_track_key', 'channelcode',
  'cg', 'cgv', 'fr', 'keyword', 'searchfr', 'search_fr', 'dist_source',
  'third_id', 'track_id', 'trackid', 'hmmd', 'ad_channel', 'ad_id',
  'fbclid', 'gclid', 'msclkid', 'yclid', 'tt_from', 'toutiao_source',
  'utm', 'utm_id', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term',
  'utm_content', 'utm_account', 'utm_type', 'utm_page', 'utm_plan', 'utm_unit',
  'utm_keyword', 'utm_channel', 'utm_cg', 'utm_name', 'utm_creative', 'utm_from',
  'campaign_id', 'advertiser_id', 'refer', 'fromchannel', 'sourcefrom',
  'huiwainvitecode', 'invitecode', 'invitationcode', 'invite_code',
]);
const TRACK_PREFIX = /^utm_/i;

function isTracking(key) {
  const k = key.toLowerCase();
  return TRACK.has(k) || TRACK_PREFIX.test(k);
}

// 少数「路径型跟踪」无法通用还原，映射到该功能各自的真实页面
const OVERRIDES = {
  tool49483: 'https://www.gaoding.com/tools-ai-writer',      // 稿定AI文案
  'gaoding-com': 'https://www.gaoding.com/ai-product',        // 稿定AI商品图
  'gaoding-com-2': 'https://www.gaoding.com/tools-ai-eliminate', // 稿定AI消除
  'gaoding-com-3': 'https://www.gaoding.com/tools-ai-clearer',   // 稿定AI变清晰
  'gaoding-com-4': 'https://www.gaoding.com/contents?q=PPT',     // 稿定PPT模板
  'gaoding-art': 'https://www.gaoding.art/',                    // 稿定AI
};

function cleanUrl(u) {
  if (!u || typeof u !== 'string') return u;
  if (!/^https?:\/\//i.test(u)) return u;
  // 路径型跟踪：/utms/<hash>
  const hadPath = /\/utms\/[0-9a-f]{6,}\/?/i.test(u);
  let s = hadPath ? u.replace(/\/utms\/[0-9a-f]{6,}\/?/ig, '/') : u;
  // 路径型邀请码：/*-invite/<code>（保留功能路径）与 /invite|inviteCode|referral/<code>
  const beforePath = s;
  s = s.replace(/(\/register-invite)\/[A-Za-z0-9_-]{4,}\/?$/i, '$1');
  s = s.replace(/\/(invite|invitecode|invite_code|referral)\/[A-Za-z0-9_-]{4,}\/?$/i, '/');
  const hadInvitePath = s !== beforePath;
  let url;
  try { url = new URL(s); } catch { return u; }

  const keep = [];
  let removed = false;
  for (const [k, v] of url.searchParams) {
    if (isTracking(k)) removed = true;
    else keep.push([k, v]);
  }
  // hash 内嵌跟踪（如 /path#/?ref=ai-bot.cn）
  const hashHasTrack = /([?&]|^#\/?\??)(ref|utm_[a-z]*|from|hmsr|invite[a-z_]*|share[a-z_]*|source|channel|fr|spm)=/i.test(url.hash || '');
  const hadBadHash = hashHasTrack || url.hash === '#' || url.hash === '#/';
  // 没有任何跟踪痕迹时保持原样，避免 new URL() 补尾斜杠造成无意义改动
  if (!hadPath && !hadInvitePath && !removed && !hadBadHash) return u;

  url.search = keep.length
    ? '?' + keep.map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join('&')
    : '';
  if (hadBadHash) url.hash = '';
  return url.toString();
}

const tools = JSON.parse(fs.readFileSync(TOOLS_PATH, 'utf-8'));
const changes = [];
for (const t of tools) {
  const before = t.url || '';
  const after = OVERRIDES[t.slug] || cleanUrl(before);
  if (after !== before) changes.push({ slug: t.slug, name: t.name, before, after });
}

console.log(`待清洗条目: ${changes.length} / ${tools.length}`);
const byClean = new Map();
for (const c of changes) {
  if (!byClean.has(c.after)) byClean.set(c.after, []);
  byClean.get(c.after).push(c.slug);
}
const collide = [...byClean.entries()].filter(([, v]) => v.length > 1);
console.log(`清洗后互相撞车: ${collide.length} 组`);
collide.forEach(([u, v]) => console.log(`  ${u}  <=  ${v.join(' | ')}`));

// 清洗后是否与「本来就如此」的其它条目撞车
const untouched = new Map();
for (const t of tools) {
  if (!changes.find((c) => c.slug === t.slug)) {
    const k = t.url || '';
    if (!untouched.has(k)) untouched.set(k, []);
    untouched.get(k).push(t.slug);
  }
}
const cross = [];
for (const c of changes) {
  if (untouched.has(c.after)) cross.push(`${c.after}  <=  ${c.slug} 撞 ${untouched.get(c.after).join('|')}`);
}
console.log(`与未改动条目撞车: ${cross.length}`);
cross.forEach((s) => console.log('  ' + s));

console.log('\n--- 变更明细 ---');
changes.forEach((c) => console.log(`  ${c.slug.padEnd(22)} ${c.before}\n  ${''.padEnd(22)}   -> ${c.after}`));

if (APPLY) {
  const map = new Map(changes.map((c) => [c.slug, c.after]));
  for (const t of tools) if (map.has(t.slug)) t.url = map.get(t.slug);
  fs.writeFileSync(TOOLS_PATH, JSON.stringify(tools, null, 2) + '\n');
  console.log(`\n已写入 ${TOOLS_PATH}`);
} else {
  console.log('\n（试算模式，未写盘；加 --apply 落盘）');
}
