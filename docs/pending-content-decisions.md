# 原创内容生产：待决事项（需人工授权）

> 更新时间：2026-11-01（第 134 批）
> 用途：把「为什么产能为 0」和「解开它需要批准什么」压缩到一页，供编辑部一次性决策。
> 事实来源：`data/tools.json`、`data/tool_profiles.json`、`public/tools.xml`、抓取实测（见各批次记录 `_content_batch_2026-10-30_b*.md`）。

---

## 一、当前处境（可用代码复算）

| 指标 | 数值 | 口径 |
|---|---|---|
| 工具条目总数 | 1177 | `data/tools.json` |
| 原创内容池 | 1127 | `editorials` 5 ∪ `tool_profiles.items` 1123，重叠 1（b131 新增 2） |
| 四条件可索引 | **1127** | 名称干净 + 正文 ≥600 + 含自身名，池内失败 0 |
| `public/tools.xml` | **1127** | 与四条件完全一致 |
| 未进池（待写） | **50** | 1177 − 1127 |
| 索引覆盖率 | **95.8%** | 1127 / 1177 |

**关键事实**：原创池里 1123 条已全部可索引，池内没有任何「差一点」的条目。继续按「选题 → 抓官网 → 写 15–20 条」跑，第 130 批仍是 0 条——因为剩下的 50 条不是「还没写」，而是**写不了**。b77–b130 共 54 轮、30 次复核、十类通道全部试尽，无一条翻转。

> 第 130 批已把 52 条**一次性全量代理抓取**（HTTP 状态 + 字节数 + `<title>` 全记录，4 路并发），结果：200 × 23、000 × 22、403 × 4、404 × 3。证据已饱和——22 条连不上，其余 30 条能打开但分别是清算公告、停运公告、博彩站、主体变更、描述式名称或纯 SPA 空壳。下一批不必再抓。

### 第 132 批补正：50 条里有 12 条是「同一产品的重复页」（新维度）

此前 60 批只把原因归为「抓不到素材」。第 132 批新增一条机器校验：**按主域 + 官网 `<title>` 反查待写条目是否已有同产品的已写页**，
结果发现 12 条根本不是「还没写」，而是**不该有独立页**——给同一产品写第二份资料正是 scaled content abuse 的形态：

| 待写 slug | 实测官网 title | 已写的同产品条目（正文字数） |
|---|---|---|
| `moyin-com` | 魔音工坊（x.moyin.com 现为配音平台，非「魔撰写作」） | `tool1924` 魔音工坊（880） |
| `duiyou-ai` | 美图设计室（designkit.cn） | `xmyeditor-com` 美图设计室（836） |
| `tool67455` | 稿易 - AI论文写作指导平台 | `tool36409` 稿易AI论文（704） |
| `tool67595` | aigc.66paper.cn 降 AIGC 子产品 | `tool14679` 66AI论文（871） |
| `seelesai-go-link` | 渲染终址 www.seeles.ai/workspace | `tool14989` SeeleAgent（797） |
| `tool11395` | flowith.paluai.com 为分销镜像 | `tool139` Flowith |
| `tool6840` | 360AI办公（301 → bangong.360.cn） | `bangong-360-cn`（719） |
| `tool216` | 同域 zyro.com（已并入 Hostinger） | `tool302`（967） |
| `tool1338` | 通往通义千问网页版 | `qwen` 通义千问 |
| `tool150` | 301 → stitch.withgoogle.com | `tool73947` |
| `photonaiclub-com` / `-2` | 同站两入口，域名已注销 | 互为重复 |

> 结论：这 12 条的正确处置是**合并/下线**（并入 ③ 项），不是补正文。给它们写 400–700 字反而是新的风险。

## 二、50 条为什么写不了（按原因归组）

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
- 预期：1127 → **1183**（+5.0%），是当前唯一不依赖枯竭素材池的增量。
- 前置：8 条标题含「实测 / 亲测」（如「AI编程实测：6款顶流大模型对比」），未做实际测试就保留该表述违反红线三，须先改口径或补真实验证；正文另有 7 处正文内出现同类字样。
- 成本：≈ 4 批（每批 14–15 条），素材来自教程对应工具的官网与官方文档。

### ② 4 条「改名后可写」（+4）→ **已完成 2 条**

| slug | 现名 | 素材情况 | 建议名 | 状态 |
|---|---|---|---|---|
| `tool111` | Reply Logo | 官网 9195 字符，页面即 Devin Desktop | `Devin` | ✅ b131 已改名并写入 1249 字 |
| `tool923` | AI 3D捕捉、建模和渲染 | lumalabs.ai 首页 306 KB | `Luma` | ✅ b131 已改名并写入 1415 字 |
| `ask-xiaoyuzhoufm-com` | 小宇宙推出的AI搜索产品 | b131 复验：ask 站仅 29 字符 SPA 壳，渲染后仍是播客主页文案 | `小宇宙 AI 搜索` | ⏸ 素材不足，暂停 |
| `tool67595` | 论文降aigc-论文aigc降重-AI痕迹降低-论文ai降重（30 字） | b132 复验：`aigc.66paper.cn` 渲染成功，为 66paper 降 AIGC 子产品，但同品牌已有 `tool14679` 66AI论文（871 字） | 建议直接并入 `tool14679` | ⛔ 转为重复项，不再补正文 |

- 动作：改 `name`（`slug` 保留则无需 301；若同时改 slug 须补 301），再按 SOP 四节结构写正文。
- 风险：低。收益：+4 条索引页；附带修掉 4 条错误名称。
- **b131 执行说明**：只改 `name`，`slug` 与 URL 未动，无需 301。剩余 2 条不宜为凑数改名——其中
  `ask-xiaoyuzhoufm-com` 抓不到 AI 搜索本身的可引用事实，`tool67595` 落地页 403，据空素材写正文会触碰红线三。

### ③ 50 条清理（下线 / 合并 / 移出）

- 动作：把 A、D 两组（约 34 条）从 `data/tools.json` 移除或标记下线，B、C 两组按上表改名或合并。
- 收益：索引覆盖率分母从 1177 降到约 1140，覆盖率升至 ≈98.7%；同时移出 2 条高风险外链（优先 `tool14961` 博彩站、`tool1333` 企业官网）。
- 风险：中。属生产数据删改，必须人工确认清单后执行，且需同步 `public/_redirects` 与分类计数。
- **b132 补充（新增第 4 组）**：50 条中有 **12 条属「同一产品的重复页」**（见第一节末尾），处置是合并/下线而不是补正文。
  加上原始 A/D 两组，清理总量由「约 34 条」修正为「约 46 条」，余下 4 条为名实不符需改名或改 URL。清理后 1177 → ≈1131，覆盖率 ≈99.6%。
- **b133 定性（决定性证据，可复算）**：对待写 50 条的 `detailed_content` 做**来源指纹比对**——
  正文 HTML 内是否残留 `ai-bot.cn` 站内链接。结果：正文 ≥300 字者 23 条，**其中 23 条含 ai-bot.cn 采集链接，非采集 0 条**。
  即「看起来已有正文」的条目全部是当年采集稿（含原站 `<img>`、`<div class="paragraph">`、`rel="noopener nofollow"` 结构）。
  → 这批不是「待写」，而是**必须清理的采集残留**；改写入池会直接违反红线一。
  同时说明 62 批 0 产出并非脚本缺陷：索引门槛（命中原创池）正在正确排除唯一没有原创来源的那 50 条。
  **结论：工具页可写池已归零，任何继续抓取都不再产生新信息。**

## 四、给自动化的建议

当前自动化（每小时级触发）在素材池枯竭后每轮产出恒为 0，只消耗额度。建议二选一：

1. **改任务目标**：把提示词从「续写工具页 15–20 条」改为「教程页补正文 14–15 条」——按 ① 执行，能连续 4 批有产出。
2. **降频巡检**：改为每周一次，只跑四条件自检 + 上线一致性核对，发现新数据缺口再报。

在未做上述调整前，本自动化每轮只会重复输出同一份「0 新增」结论。

## 五、第 134 批补充（四通道重测，结论不变）

重启四通道重测队列 24 条，未沿用旧结论，仍得 0 条可写：

- 直连 9 条 200，逐条定性后全部作废：`ai-bot` 通用名+竞品导航站、`hotshot-co` 已转型科技博客、
  `tool1333` 跳赌博落地页、`duiyou-ai`/`tool6840`/`moyin-com` 为重复页、`seelesai`/`ask-xiaoyuzhoufm`/`yanqueai` 纯 SPA 且为描述性长名。
- 代理 curl 13 条：12 条 000、`flowgpt` 403（CF）。
- 渲染读取 8 条：`telehire-ai` 42203、`xanswer-com` 42205 → **域名已无公共解析（站点下线硬证据）**；`humva-ai` ParkLogic 停放；
  `6pen-art` 2024-08-15 关停公告；`voxcraft-ai` 504；`miaohui` 渲染到「创大产控」名实不符。
- 队列外余量 26 条复核：名称含 `|`/`&#`/描述性长句者 8 条，名称门槛即失败，写正文无意义。

→ 五名待清理条目新增确认：`telehire-ai`、`xanswer-com`、`humva-ai`、`6pen-art`、`voxcraft-ai`。

## 六、第 135 批补充（33 条重新实测，新增 1 条合并硬证据 + 1 条口径更正）

- **新增硬证据（合并）**：`seelesai-go-link` 直连现为 189 KB 服务端渲染页，title「Best No-Code AI Game Maker for 2D/3D Games」，
  页面出现 `seele*` 品牌词 81 次；`seelesai.go.link/kw8uW` 为 `www.seeles.ai` 分享短链 → 与 `tool14989` SeeleAgent **同一产品**，
  处置为合并，不补第二份正文。（此前记为「SPA 正文 42 字，判不了」，本批已可定性。）
- **新增硬证据（下线）**：`tool14278` MidReal 可见正文 1180 字全为停运告别信（meta description 仍宣传产品，**不可据 meta 取材**）；
  `tool3006` LogoliveryAI 正文 214 字「Logolivery, Inc. has been officially liquidated」。
- **口径更正**：b134 第九节「队列外 8 条名称门槛即失败」表述有误。按 `isCleanToolName()` 复算，**50/50 语法层全部通过**；
  其中 8 条属**语义层不可用**（描述性长句），不是语法校验失败。后续引用勿混。
- **提示词失效**：任务提示词写「1210 条 / 可索引 35 / 剩余 1175」，实况 1177 / 1127 / 50，差距 1.03× / 32× / 23.5×。


