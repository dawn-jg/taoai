# TaoAI 原创内容生产 SOP

> 适用站点：taoai365.com（`D:\ai-nav-site`）
> 建立日期：2026-09-27
> 背景：站点曾因「正文采集自第三方 + 跨页模板文本 + 内容与页面主题错配」被 AdSense 判定为低价值内容。
> 本 SOP 的目的：把「页面能不能上线 / 能不能被索引」变成有明确门槛的工程问题，避免同类问题复发。

---

## 一、三条不可越过的红线

| 红线 | 说明 |
|---|---|
| **不采集** | 不抓取第三方站点的正文充当本站内容（含「抓下来改写几个词」）。工具的功能描述、定价、截图一律以该产品官网/官方文档为来源，并用自己的语言重写。 |
| **不套模板** | 不用同一段文字批量套用到大量页面。任何一段文本如果出现在两个以上页面，就必须删除或改写。 |
| **不虚构** | 没有实际验证过的内容，不写成「实测」「编辑部亲测」。可以做资料整理与事实归纳，但不能编造使用体验、用户评价、价格数字。 |

---

## 二、可索引门槛（硬性）

页面上线的必要条件，不是充分条件。以下门槛与代码实现严格一致：

| 页面类型 | 允许被索引的条件 | 代码位置 |
|---|---|---|
| 工具页 `/tools/*` | ① 有编辑部原创评测；**或** ② 名称干净（≤30 字符、无抓取残留分隔符）**且** 正文纯文本 ≥ 600 字 **且** 正文提到自身工具名 | `lib/tools.ts` → `isToolIndexable()` |
| 教程页 `/tutorials/*` | 正文纯文本 ≥ 600 字 | `lib/tools.ts` → `isTutorialIndexable()` |
| 快讯详情 `/news/*` | 必须存在编辑部撰写的原创解读（`data/news_details.json`），解读纯文本 ≥ 180 字 | `lib/tools.ts` → `isNewsIndexable()` |
| sitemap | **只收录可索引页面**；门槛不达标者输出 `noindex, follow` 且不提交 | `scripts/generate-sitemap.mjs` |

> ⚠️ 判定规则在 `lib/tools.ts`（TypeScript）与 `scripts/generate-sitemap.mjs`（JS）中**双份实现**，改一处必须同步另一处，否则会出现「sitemap 收录了 noindex 页面」的矛盾信号。

---

## 三、内容生产流程

1. **选题**：只做用户会搜索的问题（工具怎么选、A 与 B 的差别、某类任务用什么工具）。
2. **资料收集**：只允许三类来源——产品官网、官方文档/发布说明、公开媒体的原始报道。每条事实记下出处链接。
3. **撰写**：用编辑部自己的语言写。结构遵循「是什么 → 能做什么 → 怎么用 → 适合谁 / 注意事项」。禁止逐句翻译或近义替换。
4. **复核**：第二位编辑检查 ① 事实与来源是否一致 ② 是否与页面主题匹配（正文必须出现该工具名）③ 是否与其他页面重复。
5. **上线**：填写 `updatedAt`；页面自动展示署名、收录时间、最后更新时间与来源说明。
6. **维护**：产品重大更新、定价调整、服务下线后回访更新，并同步 `updatedAt`。

---

## 四、工具页正文标准结构

与 `data/tool_profiles.json` 中现有范例一致：

```json
{
  "slug": "<工具 slug>",
  "updated": "YYYY-MM-DD",
  "sources": ["<官网 URL>"],
  "sections": [
    { "title": "<工具名> 是什么", "html": "<p>…</p>" },
    { "title": "<工具名> 的主要功能", "html": "<ul><li>…</li></ul>" },
    { "title": "如何使用 <工具名>", "html": "<ol><li>…</li></ol>" },
    { "title": "<工具名> 的应用场景", "html": "<ul><li>…</li></ul>" }
  ]
}
```

要求：
- 每节正文必须出现工具名（避免再次出现「内容与页面主题不符」）。
- 全篇纯文本 ≥ 600 字（约 400–500 汉字），不为凑字数堆砌空话。
- 定价只写「免费 / 免费增值 / 付费」这类概括标签，具体数字以官网为准，页面已统一声明。

写入方式：

```bash
# 1. 编辑 data/tool_profiles.json
# 2. 试算（会逐条打印字数与是否含自身名）
node scripts/apply-tool-profiles.mjs
# 3. 应用
CODEBUDDY_SAFE_DELETE_ENABLED=0 node scripts/apply-tool-profiles.mjs --apply
# 4. 重建 sitemap + 构建
CODEBUDDY_SAFE_DELETE_ENABLED=0 npm run build
```

---

## 五、上线前检查清单

- [ ] 正文全部来自上面允许的三类来源，且已记下来源链接
- [ ] 正文提到该页面自身的工具名
- [ ] 正文纯文本 ≥ 对应类型的门槛字数
- [ ] 全文与站内任何其他页面不重复（含 FAQ、说明性段落）
- [ ] 没有「实测」「亲测」等未经证实的表述
- [ ] `updatedAt` 已更新
- [ ] 重新生成 sitemap，确认该页面出现在 `public/tools.xml` 中

---

## 六、相关脚本一览

| 脚本 | 作用 |
|---|---|
| `scripts/fix-adsense-content.mjs` | 清理错配正文与跨页重复正文（置空 `detailed_content`） |
| `scripts/recover-stripped-content.mjs` | 从历史提交恢复被误删的正文（判定缺陷修复后使用） |
| `scripts/fix-data-quality.mjs` | 修正错误 URL、脏名称、脏 domain，补 `updatedAt` |
| `scripts/migrate-slugs.mjs` | 无语义 slug（`toolNNNN`）→ 语义 slug，并累积生成 `public/_redirects` 的 301 |
| `scripts/apply-tool-profiles.mjs` | 把原创资料合并进 `data/tools.json` |
| `scripts/generate-sitemap.mjs` | 生成 sitemap，仅收录可索引页面 |
| `~/.workbuddy/skills/taoai-content-audit/` | 体检技能：一次性输出错配、重复、稀薄页、canonical、sitemap 一致性诊断 |

---

## 七、踩过的坑（避免重复）

1. **canonical 硬编码在 `<head>`**：曾导致全站 1215 个工具页全部声明「正规地址是首页」，被整体去重。动态路由必须逐页自引用，根级用 `'./'`。
2. **正文比对忽略空白**：`plainText` 会删掉所有空白，若拿含空格的名字（如 `Kimi AI`）去比对，永远匹配失败 → 内容会被误判为「与主题不符」而清空。比对双方都要去空白（`normalizeName()`）。
3. **sitemap 与页面判定不一致**：双份实现必须同步。
4. **news sitemap 的误用**：`news:` 命名空间是给 Google News 出版方的，导航站不应使用；普通 urlset 即可。
5. **定时任务会覆盖 `data/news.json`**：长文内容必须放在不会被覆盖的独立文件（`data/news_details.json`）。
6. **构建需要 `CODEBUDDY_SAFE_DELETE_ENABLED=0`**：否则清理 `.next` 缓存时会被批量删除拦截器挡下。
