# 第 101 批原创资料执行报告（2026-10-24）

## 一、基线

| 指标 | 数值 | 说明 |
|---|---|---|
| 工具总数 | 1177 | — |
| 原创池 | 1125 | `editorials.json` 5 篇 ∪ `tool_profiles.json` 1121 条 |
| 四条件通过 | 1125 | 名称干净 / 正文 ≥600 字 / 含自身名，池内失败 0 |
| `public/tools.xml` | 1125 | 与四条件通过数一致 ✅ |
| 待写（不在池） | 52 | 名单自第 92 批起 10 批未变 |
| 本批新增 | **0** | 连续第 31 批 0 产出 |

HEAD `3bee93c2`（较 b100 只多一条 news cron）。

## 二、本批流程

1. `content-queue.mjs`（总览 + `--top 52 --json`）确认 pending 恰 52，与 b92–b100 逐条一致。
2. `content-queue.mjs --top 24 --save` 刷新 `data/content_queue.json`（内容相同，零 diff）。
3. `.tmp_probe101.mjs` 直连 6 并发探测 52 条：**200:22 / ERR:26 / 404:2 / 403:1 / 500:1**，
   与 b98–b100 三次结果逐条相同，无任何状态翻转。
4. 错误码分布：`UND_ERR_CONNECT_TIMEOUT` 8、`ENOTFOUND` 6、`CERT_HAS_EXPIRED` 3、
   `EAI_AGAIN` 2，其余 `ALTNAME_INVALID` / `ENOENT` / `UNABLE_TO_GET_ISSUER` / `ECONNRESET` /
   `DEPTH_ZERO_SELF_SIGNED` / `ECONNREFUSED` / `aborted` 各 1（合计 26）。
5. 代理健康（baidu 200 / google 200）后，对 11 条「200 但正文稀薄」的条目走渲染读取兜底
   （`r.jina.ai` + `X-Return-Format: markdown`，串行 3 秒间隔、不带浏览器 UA）——这是 b100 未覆盖的一层。

## 三、本批新增证据（8 条，均改变判定）

| # | slug | 名称 | 新证据 | 结论 |
|---|---|---|---|---|
| 1 | `tool67455` | 专注学术写作降AI率的工具 | 渲染回正文 2297 字符，标题「稿易 - AI论文写作指导平台」，域名 `gaoyiai.com/paper_aigc` | **与 `tool36409`「稿易AI论文」(`gaoyiai.com`，已索引) 同站同产品 → 合并，不写** |
| 2 | `tool11395` | 一站式用GPT-5.5、Claude-4.7 | 落地页跳 `flowith.io/blank`，署名 Flowith，是渠道分销页 | **与 `tool139`「Flowith」重复 → 合并** |
| 3 | `tool1338` | 全能AI助手，基于Qwen模型 | 渲染回标题「千问-阿里 AI 助手」，第三方壳页 `dis.chatdesks.cn` | **与 `qwen`「通义千问」重复 → 合并** |
| 4 | `tool67418` | GetDraft | 渲染全文：「GetDraft has ceased operations」，数据导出通道开放至 2026-12-31，余额转「得到大脑」会员 | **停运告别页（C 桶）** |
| 5 | `seelesai-go-link` | 全球首个端到端AI 3D游戏生成工具 | `seelesai.go.link/kw8uW` 渲染回 「Link not found / This link has expired」 | **短链失效（B 桶）** |
| 6 | `ask-xiaoyuzhoufm-com` | 小宇宙推出的AI搜索产品 | 渲染回正文是「听播客，上小宇宙」App 下载页（1742 字符，无任何 AI 搜索功能描述） | **主题不符（D 桶）** |
| 7 | `tool701` | AI生成3D材质 | `withpoly.com/browse/textures` 现标题「The Intelligent Cloud File Browser」 | **产品易主（D 桶）** |
| 8 | `yanqueai-com` / `tool3006` | AI LOGO设计工具 / LogoliveryAI — Free AI | 前者渲染回 404；后者仅 214 字符（标题 + 一行说明），无可用事实 | **空壳 / 素材不足** |

> 更正 b100 结论：`tool67455` 当时记为「暂缓，须改名稿易」。本批确认它是**已索引条目的重复页**，
> 改名后写内容会直接造出重复页面（正是 scaled content 的复发路径），应走合并而不是改名。

## 四、52 条分桶（按首个决定性因素）

| 桶 | 含义 | 条数 |
|---|---|---|
| A | 不可达 / 证书失效 / 空壳（含 3 条域名过期、6 条证书级死亡） | 26 |
| B | 403 / 404 / 500 / 短链失效 | 5 |
| C | 停运、告别页、并入他站 | 3 |
| D | 易主、主题不符、博彩站 | 9 |
| E | 名称不合规（通用名 / 关键词堆砌 / 含长破折号） | 3 |
| 合并 | 与已索引条目同站同产品 | 6 |
| 合计 | — | 52 |

## 五、自检

- 独立复算（`.tmp_check101.mjs`）：池内 1125 条，四条件通过 1125，`tools.xml` 1125 → **1125 == 1125 == 1125 ✅**，
  名称不合格 0、字数不足 0、缺自身名 0。
- `apply-tool-profiles.mjs` / `--apply` 与 `generate-sitemap.mjs` **均未运行**：本批无内容可合并，
  跑一次只会无意义刷新 `public/*.xml` 的 lastmod。
- `data/tools.json`、`data/tool_profiles.json`、`public/*.xml` 零改动。

## 六、结论与建议

**工具页索引面上限 = 1125，按本任务的目标（续写工具页原创资料）再跑，产能恒为 0。**
b77–b101 共 25 轮、四类抓取通道（直连 / 代理 curl / 渲染读取 / 官方子页+sitemap）累计数百 URL，
新增可写素材 1 条（b77），其余全部为死链、空壳、易主或重复。

真实的增量只剩两条路，都需要改任务口径：

1. **清理 52 条**（纯数据、零撰写成本）：下线 A/B 桶 31 条、C 桶 3 条、D 桶 9 条，共 **43 条移出**；
   合并 **6 条**（含本批新确证的 3 条重复）；E 桶 3 条（`ai-bot` 通用名、`tool67595` 关键词堆砌、`tool3006` 名称含长破折号）建议下线或改名后再议。
   效果：工具数 1177 → 1134，索引面不变（1125），但站内不再残留死链与重复页，对 AdSense 复核是加分的。
2. **转做教程页**：56 条教程正文为 145/229/316（min/avg/max），≥600 字 **0 条**，`public/tutorials.xml` 不存在。
   补齐即 **+56 个可索引页**（1125 → 1181），这是目前唯一能放量的面；其中 8 条标题含「实测/亲测」，需先改口径。
