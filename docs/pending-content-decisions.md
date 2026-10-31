# 原创内容生产：待决事项（需人工授权）

> 更新时间：2026-10-31（第 130 批）
> 用途：把「为什么产能为 0」和「解开它需要批准什么」压缩到一页，供编辑部一次性决策。
> 事实来源：`data/tools.json`、`data/tool_profiles.json`、`public/tools.xml`、抓取实测（见各批次记录 `_content_batch_2026-10-30_b*.md`）。

---

## 一、当前处境（可用代码复算）

| 指标 | 数值 | 口径 |
|---|---|---|
| 工具条目总数 | 1177 | `data/tools.json` |
| 原创内容池 | 1125 | `editorials` 5 ∪ `tool_profiles.items` 1121，重叠 1 |
| 四条件可索引 | **1125** | 名称干净 + 正文 ≥600 + 含自身名，池内失败 0 |
| `public/tools.xml` | **1125** | 与四条件完全一致 |
| 未进池（待写） | **52** | 1177 − 1125 |
| 索引覆盖率 | **95.6%** | 1125 / 1177 |

**关键事实**：原创池里 1121 条已全部可索引，池内没有任何「差一点」的条目。继续按「选题 → 抓官网 → 写 15–20 条」跑，第 130 批仍是 0 条——因为剩下的 52 条不是「还没写」，而是**写不了**。b77–b130 共 54 轮、30 次复核、十类通道全部试尽，无一条翻转。

> 第 130 批已把 52 条**一次性全量代理抓取**（HTTP 状态 + 字节数 + `<title>` 全记录，4 路并发），结果：200 × 23、000 × 22、403 × 4、404 × 3。证据已饱和——22 条连不上，其余 30 条能打开但分别是清算公告、停运公告、博彩站、主体变更、描述式名称或纯 SPA 空壳。下一批不必再抓。

## 二、52 条为什么写不了（按原因归组）

| 组 | 条数 | 典型条目 | 为什么不能写 |
|---|---|---|---|
| A. 站点已死 / 下线 / 空壳 | 约 30 | `voxcraft-ai`（504）、`6pen-art`（下线公告）、`tool66554`（0 字节）、`humva-ai`（握手即断）、`writingpal-ai` / `xanswer-com` / `etna-7volcanoes-com`（抓取 0 字节）、`explorer.globe.engineer`（0 字节）、`briefly.video`（Project not found）、`getdraft.ai`（8 字符） | 无任何官网事实可依，写出来只能是编造 → 违反红线「不虚构」 |
| B. 名称不合规（含自身名校验失效） | 约 12 | `ai-bot`（AI工具集，通用名）、`tool67371`（含 `\|`）、`telehire-ai` / `seelesai-go-link` / `ask-xiaoyuzhoufm-com` / `tool9412` / `tool13251`（描述式名称） | 名称本身就是一句描述，正文「必须含工具名」的校验失去意义；SOP §7.10 要求人工判断 |
| C. 名实不符 / 脏数据 | 约 6 | `tool111`（名为 Reply Logo，url 实为 Devin Desktop）、`moyin-com`（名为魔撰写作，站点实为魔音工坊）、`tool923`（名为「AI 3D捕捉、建模和渲染」，实为 Luma）、`tool148`（BW188）、`tool1333`（aiapp.cc 为企业官网）、`tool14961`（fryderyk.ai 为境外博彩站） | 名与页面不一致，写正文等于给错产品立传；`tool14961` 还有外链风险 |
| D. 产品已停运 / 主体变更 | 约 4 | `tool216`（Zyro 该工具停运）、`tool1890`（Neeva 关停）、`hotshot-co`（域名易主为数码博客）、`tool1079`（阿里云登录页，非工具） | 无在营产品，页面不该存在 |

> 归组依据为实测抓取结果（`textSample` 长度、HTTP 状态、页面 title 与 DB 名称是否一致）。条数为近似值，逐条明细见各批次记录。

### 第 130 批全量快照（52 条一轮抓完，可直接执行）

代理已用 `example.com` 校准（200 / 577 B），`--tls-max 1.2`，故下列 000 均为站点侧问题。**新增 5 条可执行清理**：

| slug | 实测结果 | 处置 |
|---|---|---|
| `tool14278`（MidReal） | 首页 200 / 84 KB，正文即停运信「we've made the difficult decision to sunset MidReal」，导流至后继产品 Macaron | **已停运，下线或改指向** |
| `tool216`（Zyro AI Image Upscaler） | 200 / 248 KB，title「Zyro Website Builder Joins Forces With Hostinger」 | **品牌并入 Hostinger，原工具停运，下线** |
| `tool148`（BW188） | 200 / 554 KB，title「BETWIN188: Link Slot Gacor…」 | **已变境外博彩站，最高优先移出** |
| `tool14961` | 200 / 51 KB，title「DegenCity Casino New Zealand」 | **同上，移出** |
| `yanqueai-com` / `tool71074` / `tool479` / `tool701` | 404 / 404 / 404 / 200 但仅 87 字节 | 站点已死或空壳，归入清理 |

维持不可写（本批复核，零翻转）：`tool3006`（清算公告 214 字）、`humva-ai` 与 `tool1890`（纯跳转页 28 字，HEAD 亦 000）、
`tool67418`（921 字节空壳）、`phind-com` 与 `flow-studio`（`r.jina.ai` 复验仍为 Cloudflare 拦截页）、
`tool923` / `ask-xiaoyuzhoufm-com` / `tool111` / `tool67595`（产品在营，卡在名称，见 ②）。

### 第 128 批新增确证（可直接执行，无需再核）

对 52 条中**名称合规的 10 条**做定向四通道复核（直连 → 代理 curl `--tls-max 1.2` → 渲染读取 → 独立 WebFetch）。
代理健康度已校准（同代理下 `lumalabs.ai` 200 / 306 KB、`example.com` 200），故下列失败均为站点侧问题。

| slug | 实测结果 | 处置 |
|---|---|---|
| `tool7424`（XPaper AI） | `130ai.com` 渲染读取返回 42206 `ERR_CONNECTION_REFUSED` | **域名失效，清理** |
| `miaohui-jixueai-com`（秒绘AI） | 页面 title 为「创大产控｜科研经纪产业领军企业」，全站为产控公司官网 | **主体已更换，清理** |
| `photonaiclub-com` / `photonaiclub-com-2`（光子AI / 光子AI抠图） | 第三方返回 42205 `EAI_AGAIN`，公共 DNS 无此域名 | **域名注销，两条一并清理** |
| `duiyou-ai`（堆友AI） | `designkit.cn` title 现为「美图设计室-免费AI设计工具」 | **名实不符，清理或改名改 URL** |
| `tool6840`（360智绘） | `aigc.360.com` title 现为「360AI办公」 | **产品线更名，改 URL 或下线** |
| `tool67418`（GetDraft） | 200 但正文仅 8 字符 | 维持纯 SPA 空壳，不可写 |
| `flow-studio`（Flow Studio） | `flowgpt.com` Cloudflare 403 挑战页 | 维持不可写 |
| `tool1957`（AIDesign） | 四通道全失败（含 40305「解析到非公网 IP」） | 维持不可写 |
| `miantuan-knowfuture-com-cn`（面团AI） | 直连失败，代理超时 000 | 维持不可达 |

### 第 127 批确证（保留备查）

| slug | 实测结果 | 处置 |
|---|---|---|
| `tool150`（AI高保真原型设计） | `www.usegalileo.ai` 301 → `stitch.withgoogle.com`，而 `tool73947` 已收录该域名且已在原创池 | **重复项，合并/下线** |
| `tool3006`（LogoliveryAI） | 官网首页为清算公告「Logolivery, Inc. has been officially liquidated」 | **确认注销，清理** |
| `phind-com` | 首页与 `/about` 均返回 Vercel 404，无产品文案 | 维持不可写 |
| `hotshot-co` | 实为科技博客「Your everyday tech guide」，无产品功能与定价 | 维持名实不符 |
| `tool2676`（175FUN） | 仍取回失败，与此前 DoH `Status=3` NXDOMAIN 一致 | 维持域名注销 |

## 三、三件待批准的事（按投入产出排序）

### ① 教程页补正文 —— 唯一能成规模放量的面（+56）

- 现状（2026-10-30 复算）：`/tutorials/*` 共 56 条，正文纯文本中位 **232 字**、最长 **316 字**，≥600 字的 **0 条**，全部 `noindex, follow`，不进 sitemap。
- 门槛：纯文本 ≥600 字（`isTutorialIndexable`，与工具页同一套比对逻辑）。
- 预期：1125 → **1181**（+5.0%），是当前唯一不依赖枯竭素材池的增量。
- 前置：8 条标题含「实测 / 亲测」（如「AI编程实测：6款顶流大模型对比」），未做实际测试就保留该表述违反红线三，须先改口径或补真实验证；正文另有 7 处正文内出现同类字样。
- 成本：≈ 4 批（每批 14–15 条），素材来自教程对应工具的官网与官方文档。

### ② 4 条「改名后可写」（+4）

| slug | 现名 | 素材情况 | 建议名 |
|---|---|---|---|
| `tool111` | Reply Logo | 官网 9195 字符，页面即 Devin Desktop | `Devin` |
| `tool923` | AI 3D捕捉、建模和渲染 | lumalabs.ai 首页 306 KB | `Luma` |
| `ask-xiaoyuzhoufm-com` | 小宇宙推出的AI搜索产品 | ask 站可抓 | `小宇宙 AI 搜索` |
| `tool67595` | 论文降aigc-论文aigc降重-AI痕迹降低-论文ai降重（30 字） | 落地页 1669 字符（内容偏营销） | 需编辑部定名，如 `66paper 论文降AIGC` |

- 动作：改 `name`（`slug` 保留则无需 301；若同时改 slug 须补 301），再按 SOP 四节结构写正文。
- 风险：低。收益：+4 条索引页；附带修掉 4 条错误名称。

### ③ 52 条清理（下线 / 合并 / 移出）

- 动作：把 A、D 两组（约 34 条）从 `data/tools.json` 移除或标记下线，B、C 两组按上表改名或合并。
- 收益：索引覆盖率分母从 1177 降到约 1140，覆盖率升至 ≈98.7%；同时移出 2 条高风险外链（优先 `tool14961` 博彩站、`tool1333` 企业官网）。
- 风险：中。属生产数据删改，必须人工确认清单后执行，且需同步 `public/_redirects` 与分类计数。

## 四、给自动化的建议

当前自动化（每小时级触发）在素材池枯竭后每轮产出恒为 0，只消耗额度。建议二选一：

1. **改任务目标**：把提示词从「续写工具页 15–20 条」改为「教程页补正文 14–15 条」——按 ① 执行，能连续 4 批有产出。
2. **降频巡检**：改为每周一次，只跑四条件自检 + 上线一致性核对，发现新数据缺口再报。

在未做上述调整前，本自动化每轮只会重复输出同一份「0 新增」结论。
