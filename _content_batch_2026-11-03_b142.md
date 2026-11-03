# 第一百四十二批实测（2026-11-03 晚）

## 结论

**新增 0 条，连续第 71 批零产出；因素材缺失跳过 50 条（待写池仍为 50，且已全部核实为不可写）。**
本批走完直连 → 代理 curl → 渲染读取三通道，50 条全部复核；新增 3 条「产品已停运」硬证据、
4 条「域名在公共 DNS 已无解析」硬证据、4 条「域名/产品已易主或改名」证据。可写池仍为 0。

## 基线（起始状态）

| 项目 | 数值 |
|---|---|
| HEAD | `c9b24840`（b141），工作区干净，HEAD == origin/main |
| 工具总数 | 1177 |
| 原创池 | 1127（`tool_profiles` 1123 + `editorials` 5，重叠 1） |
| 四条件通过 | **1127** == `public/tools.xml` 1127 == 线上 `taoai365.com/tools.xml` 1127（`cmp` 逐字节一致） |
| 池内失败 | 0 / 0 / 0（名称 0、字数 0、含自身名 0） |
| 待写 | 50（`content-queue.mjs --top 60 --json` 名单与 b140/b141 逐条一致，第 47 批） |

## 本批取证（三通道）

1. **通道①直连**（Node fetch / 6 路 / 13s / `identity`）：200×19、403×2、404×3、传输层失败×26。
   与 b141（200×20 / 403×2 / 404×2 / ERR×26）无实质翻转，仅 `tool148` 维持超时。
2. **通道②代理 curl**（`--proxy 127.0.0.1:7897 --tls-max 1.2 -H "Accept-Encoding: identity"`）对 27 条失败项重抓：
   仅 2 条拿到 200（`tool6840` 20786 B、`tool150` 24302 B），其余为证书过期、握手失败、超时或断言失败。
   两条 200 逐条读可见正文后仍不可写（见下表）。
3. **通道③渲染读取**（`r.jina.ai` + `--proxy` + `--tls-max 1.2`、无浏览器 UA、串行 3s）复验 11 条：
   拿到 4 条「公共 DNS 无解析」、1 条停放页、2 条停运公告、1 条名实不符。

## 新增证据

### 停运 / 域名失效（→ 下线或改 URL，不再列「待写」）

| 条目 | 本期实测 | 处置建议 |
|---|---|---|
| `tool67418` GetDraft | 官网首屏即 **"GetDraft has ceased operations"**；数据冻结于 2026-08-31，导出通道开放至 2026-12-31，可迁移至「得到大脑」 | **服务停止 → 下线** |
| `6pen-art` 6pen Art | 官网公告「💫 新的篇章 / 是时候说再见了」，点数迁移至 **6pen.pro** | **原站关停 → 改 URL 为 6pen.pro 或下线** |
| `tool14278` MidReal | 官网公开信：已 **sunset MidReal**，团队转向新产品 Macaron（`contact@macaron.im`） | **停运 → 下线**（缓存素材即停运公告，不可作撰写依据） |
| `photonaiclub-com` / `photonaiclub-com-2` | 渲染服务返回 42205 `Failed to resolve domain 'www.photonaiclub.com'` | **公共 DNS 无解析 → 下线** |
| `xanswer-com` | 42205 `Failed to resolve domain 'www.xanswer.com' (EAI_AGAIN)` | **同上** |
| `tool2676` 175FUN | 42203 `Domain '175.fun' could not be resolved` | **同上** |
| `etna-7volcanoes-com` Etna | 42203 `Domain 'etna.7volcanoes.com' could not be resolved` | **同上** |
| `tool66554` 造次 | 渲染返回 42206 `Unexpected empty file`（直连 fetch failed） | 站点无响应 → 下线候选 |
| `humva-ai` Humva | 渲染读取得到 **ParkLogic 停放页**（"This page has been created by ParkLogic"） | **域名已停放 → 下线** |

### 易主 / 改名（→ 改名或改 URL 后才可能可写）

| 条目 | 本期实测 | 处置建议 |
|---|---|---|
| `tool6840` 360智绘 | `aigc.360.com` 已 302 至 **360AI办公**；页面为 SPA 外壳，可见正文仅 12 行提示语（无痕模式提示、网络故障） | 产品已更名 → 改名为「360AI办公」并另找素材页 |
| `tool150`（名「AI高保真原型设计」） | `usegalileo.ai` 已 302 至 **Stitch - Design with AI**（Google） | 产品被并入 Stitch；名称为描述式 → **排除** |
| `duiyou-ai` 堆友AI | `designkit.cn` 现 title「美图设计室-免费AI设计工具…」 | 名实不符 → 改 URL 或下线 |
| `moyin-com` 魔撰写作 | `x.moyin.com` 渲染 75 KB，title 为「魔音工坊--达人热推的短视频/有声书AI配音平台」 | **DB 名与站点产品不符**（配音 ≠ 写作）→ 改名「魔音工坊」后可写 |
| `hotshot-co` Hotshot | 域名现为 "Hotshot \| AI Tools, Gadgets, Smart Home"（数码评测站） | 主体更换 → 下线 |
| `tool216` Zyro AI Image Upscaler | 页面为 "Zyro Website Builder Joins Forces With Hostinger" 合并公告 | 产品并入 Hostinger → 下线候选 |

其余维持原判：`ai-bot`（通用名，SOP 第 10 条）、`tool67595`（关键词堆砌名）、`tool1079`（阿里云登录页）、
`tool1333`/`tool14961`（博彩站）、`tool58825`（CF 403）、`phind-com`（CF 挑战）、`tool3006`（公司已注销）、
`tool71074`/`tool479`（404）、`seelesai-go-link`/`tool11840`/`tool67371`/`tool33149`/`tool67455`/`tool1338`/`tool11395`（描述式名称 + 0–128 字空壳）。

## 自检

- 四条件通过 **1127** == `public/tools.xml` **1127** == 线上 **1127**（`cmp` 逐字节一致，321508 B）✅
- 池内失败 0 / 0 / 0 ✅
- 本批 0 条新增，**未执行** `apply-tool-profiles --apply` 与 `generate-sitemap`（无内容合并，避免刷新 1123 条 lastmod）；
  `git status` 证 `data/` 与 `public/` 零改动，仅新增本文档与 `docs/pending-content-decisions.md` 第十三节。

## 结论与待授权

- 可写池 **0**，索引面上限 **1127 / 1177 = 95.8%**，b77–b142 共 **66 轮零翻转**。
- 待授权事项（第 71 次未变）：
  1. **教程页 56 条补正文**（+56 → 1183，当前唯一成规模的可索引面，须先改 8 条「实测/亲测」标题口径）；
  2. **50 条清理**：本批新增 9 条下线硬证据（GetDraft、6pen、MidReal、光子AI×2、XAnswer、175FUN、Etna、Humva）
     + 4 条改名/改 URL（360AI办公、堆友AI、魔音工坊、Hotshot/Zyro）→ 清理后约 1131 条；
  3. 提示词中的「1210 / 35 / 1175」与实况「1177 / 1127 / 50」偏差 1.03× / 32× / 23.5×，
     **目标不改则第 143 批必然仍为 0**。
