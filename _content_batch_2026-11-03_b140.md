# 第一百四十批实测（2026-11-03 上午）

## 结论

**新增 0 条，连续第 69 批零产出。** 本批对全部 50 条待写做一轮直连全量快照（上一次同口径为 6 小时前的 b139），
19 条 200 响应逐条定性后**全部不可写**，无一条翻转。新增 2 条细节（不改变处置）、1 条定性升级。

## 基线（起始状态）

| 项目 | 数值 |
|---|---|
| HEAD | `7bf5547c`（b139），工作区干净，HEAD == origin/main |
| 工具总数 | 1177 |
| 原创池 | 1127（`tool_profiles` 1123 + `editorials` 5，重叠 1） |
| 四条件通过 | **1127** == `public/tools.xml` 1127 == 线上 `taoai365.com/tools.xml` 1127 |
| 线上文件 | 200 / 308779 B，与本地 `public/tools.xml` **逐字节一致** |
| 池内失败 | 0 / 0 / 0（名称 0、字数 0、含自身名 0） |
| 待写 | 50（`content-queue.mjs --top 24 --save` 零 diff，第 45 批） |

> 自检口径备注（沿用 b132/b135 修正）：正文必须读 `data/tools.json` 的 `detailed_content`（数组，逐项取 `html` 拼接），
> 且 `normalizeName()` **不做小写化**。本批首次误用 `String(detailed_content)` 得到 `[object Object]` 的 59 字假值，
> 已改正后复算，结果 1127/1127 自洽。

## 本批取证（单通道全量，50 条）

Node fetch / 6 路并发 / 15s / `Accept-Encoding: identity` / 浏览器 UA，记录状态、字节、最终 URL、`<title>`、正文纯文本长度。

| 分布 | 条数 | 说明 |
|---|---|---|
| 200 | 19 | 正文 >600 字 8 条、<200 字 11 条 |
| 403 | 2 | `tool58825`（Cloudflare，终址 clepto.io）、`phind-com`（Cloudflare 挑战页） |
| 404 | 2 | `tool71074`（briefly.video「Project not found」）、`tool479`（ai-code-reviewer.com 空响应） |
| 传输层失败 | 27 | `fetch failed` 26 + `tool148` 超时中止 |

与 b139（凌晨同口径）相比：分布由 200×20 / 403×2 / 404×2 / ERR×26 变为 200×19 / ERR×27，
差异仅来自 `tool148` 由「200 返回博彩站」转为超时，其余逐条一致。

## 逐条定性（19 条 200，全部维持不可写）

| slug | 本批实测 | 归类 |
|---|---|---|
| `ai-bot` | 200 / 747304 B / 13338 字，title「AI工具集官网」 | 通用名 + 竞品导航站，名称校验无意义 |
| `tool14961` | 200 / 19404 字，title「DegenCity Casino New Zealand」 | **博彩站，最高优先移出** |
| `tool1333` | 200 / 3231 字，title 为 HTML 实体编码的「qy球友会」 | **博彩站（编码绕过文本检查）** |
| `hotshot-co` | 200 / 7528 字，title「AI Tools, Gadgets, Smart Home & How-To Guides」 | 已转型科技博客，名实不符 |
| `tool216` | 301 → `hostinger.com/blog/zyro-joins-forces-with-hostinger/` | 产品实体消失，并入 Hostinger |
| `tool67595` | 200 / 2151 字，title「稿易 - AI论文写作…」（66paper 子站） | 与 `tool14679` 66AI论文 重复 |
| `duiyou-ai` | 200 / 2095 字，title「美图设计室」 | 与 `xmyeditor-com` 重复，名实不符 |
| `tool14278` | 200 / 983 字，终址 `/a-letter-to-our-midreal-community` | 停运告别信，导流 Macaron |
| `tool67455` | 200 / 128 字，title「稿易」 | 与 `tool36409` 重复，描述性脏名 |
| `tool6840` | 301 → `bangong.360.cn/ai-tools/…`，94 字 | 与 `bangong-360-cn` 重复 |
| `seelesai-go-link` | 200 / 189619 B，正文仅 35 字（纯 SPA） | 与 `tool14989` SeeleAgent 同一产品 |
| `ask-xiaoyuzhoufm-com` | 200 / 23 字 | 纯 SPA，描述性长名，无产品文案 |
| `moyin-com` | 301 → `www.moyin.com`，24 字，title「魔音工坊」 | 与 `tool1924` 重复，名称不符 |
| `yanqueai-com` | 301 → `www.logoyq.com`，5980 B，**正文 0 字** | 见下方「定性升级」 |
| `tool67418` | 200 / 921 B / 8 字 | GetDraft 已停运（b137 确认） |
| `tool1079` | 200 / 26 字，title「阿里云登录」 | 登录页，非工具页 |
| `tool701` | 200 / 454 B / 0 字，终址 `poly.app/browse/textures` | 业务下线，主体变更 |
| `tool11395` | 200 / 698 B / 0 字 | 空壳（Flowith 镜像，与 `tool139` 重复） |
| `tool1338` | 200 / 633 B / 0 字 | 空壳，跳转通义千问 |

## 本批新增细节（3 条，均不改变处置）

1. **`yanqueai-com` 定性升级**：此前记录为「纯 SPA 抓不到正文（0 字）」，本批实测为
   **301 → `www.logoyq.com`**（5980 B / 0 字）。原域名已不做独立站点，指向 LogoYQ 品牌页
   → 处置由「素材不足」升级为「URL 失效 / 需改 URL 或下线」，**不再列为可写候选**。
2. **`tool58825` 终址变化**：`dinq.io` 403 且最终落到 `clepto.io`（Cloudflare「Attention Required」），
   与 b132 记「dinq.io 403」同结论，但补充了「域名已换主体」这一细节。
3. **`tool148` magician.design 由 200 转超时**：b133 记录其为 554 KB 博彩落地页（BETWIN188），
   本批 15s 内未响应。据此**不能**推断站点恢复，处置仍为「移出博彩外链」，仅记录可达性下降。

## 素材通道说明（为何本批不再扩通道）

b77–b139 共 63 轮已把可用通道跑满：直连、代理 curl（`--tls-max 1.2`）、`r.jina.ai` 渲染读取、
官方 `sitemap.xml` 枚举、GitHub raw README、云厂商帮助中心、内容型子页（`/blog` `/docs` `/download` 等）。
b133 的来源指纹比对已给出机制性结论：待写 50 条中「看起来已有正文」的 23 条，`detailed_content` 内
**100% 残留 `ai-bot.cn` 站内链接**，属采集残留，改写后入池即违反红线一。
因此本批只做「确认无翻转」的全量快照，未再重复已闭合的四通道探测——继续抓取不会产生新信息。

## 自检

- 1127（四条件）== 1127（`public/tools.xml`）== 1127（线上，308779 B，逐字节一致）✅
- **未跑** `apply-tool-profiles.mjs --apply`、**未跑** `generate-sitemap.mjs`：无内容可合并，
  跑只会刷 1123 条 lastmod；`git status` 已证 `data/` 与 `public/*.xml` 零改动。
- 临时脚本与快照均在系统 `Temp/b140/`，未入仓。

## 判断

b77–b140 共 **64 轮零翻转**，工具页可写池 = 0，索引面上限 1127（1177 的 95.8%）。
剩余 50 条已全部定性为四类：约 30 条站点已死/停运、13 条同一产品的重复页、4 条名实不符、2 条博彩外链。
**在任务目标不变的前提下，第 141 批仍必然是 0。**

唯一能成规模放量的面仍是教程页 56 条补正文（+56 → 1183，+5.0%），但需先统一 8 条「实测/亲测」标题口径，
属人工授权范围；50 条清理同理。
