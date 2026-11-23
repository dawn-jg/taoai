# 原创内容生产：待决事项（需人工授权）

> 更新时间：2026-11-02（第 136 批）
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

## 七、第 136 批补充（全量单通道一次拿齐，第 65 批 0 产出）

- **取证方式升级、结论零翻转**：本批不再按 b135 的「直连 33 + 代理 22」抽样，改为**全量 50 条一轮直连快照**
  （6 路并发 / 15s / `Accept-Encoding: identity`，记录状态 + 字节 + `<title>` + 正文长度）。分布 **200×20、403×2、404×2、传输层失败×26**，
  20 条 200 逐条定性后全部作废。→ 说明「未被发现的通道差异」这一可能性已排除，不是抽样没抽到。
- **博彩外链增至 2 条**：`tool14961`（DegenCity Casino）之外，`tool1333` 实测 title 为 **HTML 实体编码的「qy球友会」**（博彩站，用编码绕过文本检查），
  与 b130 记为「aiapp.cc 企业官网」不符，**升级为最高优先移出**。
- **新增 4 条可直接清理**：`tool1079`（201 字节，阿里云登录页，非工具页）、`tool11395`（698 B 空壳）、`tool1338`（633 B 跳转页 → 通义千问）、
  `tool701`（87 B 空壳，业务已迁 `poly.app`）。`tool1079` 此前未进入清理清单。
- **教程页放量面已按当前数据复算（不改内容）**：56 条，正文纯文本最短 145 / 中位 **230** / 最长 **316**，≥600 字 **0 条**，
  与 10-30 记录一致 → ① 项 +56 的预期仍然成立，仍是唯一可成规模放量的路径。
- **任务提示词第三次判为失效**：1177 / 1127 / 50 对 1210 / 35 / 1175。**若任务目标不变，第 66 批仍会是 0**，
  建议本轮之后直接切 ① 或降频至每周巡检。

## 八、第 137 批补充（渲染通道定向复验 13 条，新增 2 条「域名无解析」硬证据）

上批（b136）只跑直连通道。本批改跑**渲染读取通道**（`r.jina.ai`，无浏览器 UA、串行 3 秒间隔、17 个 URL），
专挑「名称是干净品牌名、理论上有机会通过含自身名校验」的条目，避免重复同一条通道：

| slug | 实测 | 处置 |
|---|---|---|
| `etna-7volcanoes-com` | 42203 `Domain 'etna.7volcanoes.com' could not be resolved` | **下线硬证据（新增）** |
| `tool2676`（175FUN） | 42203 `Domain '175.fun' could not be resolved` | **下线硬证据**（此前仅 DoH NXDOMAIN，现由第三方网络独立佐证） |
| `tool67418`（GetDraft） | 200，可见正文「GetDraft has ceased operations」，导出通道开放至 2026-12-31、余额转「得到大脑」 | **确认停运 → 清理**（b135 记「8 字符空壳」，本批拿到真实文案） |
| `moyin-com`（魔撰写作） | 200 / 75 KB，title「魔音工坊」 | 与 `tool1924` 重复 → **合并** |
| `miaohui-jixueai-com`（秒绘AI） | 200，title「创大产控」 | 主体更换 → 清理（与 b128 一致） |
| `tool66554`（造次） | 42206 `Unexpected empty file` | 无素材 |
| `writingpal-ai` / `miantuan-knowfuture-com-cn` | 422 导航 Timeout | 站点不响应 |
| `voxcraft-ai` / `tool7424`（XPaper） | 422 导航 AssertionFailure | 站点不响应 |
| `tool1957`（AIDesign） | `ailogo.qq.com` → 40305「解析到非公开 IP 0.0.0.1」；`idesign.qq.com` → 422 | 解析被黑洞，无主体 |
| `phind-com` | 首页 / `/docs` / `/about` 均为 Cloudflare「Just a moment...」 | 维持不可写 |
| `humva-ai` | 200 / 163 B「Redirecting...」 | 停放域名 |

→ 本批新增可执行清理 2 条（`etna-7volcanoes-com`、`tool2676` 域名已无公共解析）、升级 1 条（`tool67418` 由「空壳」升为「确认停运」）。
**四条通道至此全部闭合，b77–b137 共 61 轮零翻转；工具页可写池 = 0 这一结论不再需要新取证。**



## 九、第 138 批补充（三通道复核 33 个 URL，零新增信息）

本批刻意换了组合：**直连 32 条 + 代理 curl 8 条 + 渲染读取 8 条**，共 33 个不重复 URL，
覆盖待写池 50 条中的 36 条，重点打「名称是干净品牌名」的 18 条。

- **结论：0 条可写，且 0 条新证据。** 每一条的实测结果都能在 b134–b137 的表格里找到对应行
  （详见 `_content_batch_2026-11-02_b138.md` 的逐条定性表）。这是六批以来第一次「连清理证据也没有新增」，
  说明取证的边际收益已归零，继续按同一目标跑只是重复劳动。
- **唯一的新细节**（不影响处置）：`6pen.art` 的关停公告 `Published Time` 为 2024-08-15，
  页面仅剩告别信与 6pen Pro / 独响 / 哄哄模拟器三个导流入口；`tool14278` MidReal 的告别信正文 919 字，
  提及新项目 Macaron（`contact@macaron.im`），可用于清理时的补充说明。
- **自检**：四条件 1127 == `public/tools.xml` 1127 == 线上 1127（321508 B）✅；未跑 `--apply` / `generate-sitemap`。
- **建议（第四次）**：工具页方向已经没有内容可生产。若要让索引面继续增长，只有两条路——
  ① 教程页 56 条补正文（唯一成规模面，+56 → 1183）；② 50 条清理（下线约 30 + 合并 13 + 改名/改 URL 4）→ 1177 降至 ≈1131。

## 十、第 139 批补充（50 条全量一轮，2 条方法论修正，结论零翻转）

本批不抽样，**对 50 条待写条目全部做直连快照**（15s / 身份编码 / 浏览器 UA）。
分布 **200×20、403×2、404×2、传输层失败×26**，与 b136 完全一致；20 条 200 逐条定性后全部不可写。

- **新增硬证据（升级 1 条）**：`tool216`（Zyro AI Image Upscaler）实测 **301 → `hostinger.com/blog/zyro-joins-forces-with-hostinger/`**，
  落地为并购博文、产品页实体已消失。此前只记「与 `tool302` 重复」，本批有 301 链实证，处置升级为**合并/移除**。
- **方法论修正 1：停放页字节数不可作为存活证据。** `humva.ai` 本批 200 / 5 568 B（b137 记 163 B），
  但可见正文仍是 `Redirecting...` 停放壳。**字节漂移 ≠ 站点复活**，必须读可见正文定性。
- **方法论修正 2：短链与工具子路径必须先追 301 再判。** `seelesai-go-link`（189 KB / 正文 35 字）、
  `tool216` 都属「字节数很大但正文是壳或已跳走」的形态，单看字节会误判为可写。
- **本批再确认的清理项**：`tool14961`（DegenCity 博彩）、`tool1333`（qy球友会，HTML 实体编码绕过）、
  `tool1079`（阿里云登录页）、`tool479`（404 空响应）、`tool71074`（404 Project not found）、
  以及 `tool11395` / `tool1338` / `yanqueai-com` / `tool701` 四条 0 字空壳。
- **教程页放量面未变**：56 条，≥600 字 **0 条**，`tutorials.xml` 为空，教程页当前输出 noindex
  → 说明稀薄教程**没有**在污染索引面，AdSense 风险不来自它们；① 项仍是唯一可成规模放量路径。
- **自检**：四条件 1127 == `public/tools.xml` 1127，池内失败 0/0/0；未跑 `--apply` / `generate-sitemap`。
- **建议（第五次）**：目标不改则第 140 批必然仍是 0。b77–b139 共 63 轮零翻转，取证已三重饱和。
  两条都需要人工授权，本自动化无权自行执行。若均不授权，建议把本任务降为每周巡检或直接停用。

## 十一、第 140 批补充（50 条全量重快照，新增 1 条定性升级，结论零翻转）

- **基线**：工具 1177、原创池 1127、四条件 1127 == `public/tools.xml` 1127 == 线上 1127
  （200 / 308779 B，**与本地逐字节一致**），池内失败 0/0/0，待写 50；`content-queue --top 24 --save` 零 diff（第 45 批）。
- **取证**：50 条一轮直连全量（6 路 / 15s / identity），分布 200×19、403×2、404×2、ERR×27，
  与 6 小时前的 b139（200×20 / ERR×26）相比仅 `tool148` 由 200 转超时，**无一条翻转**。
- **定性升级（1 条）**：`yanqueai-com` 此前记「纯 SPA / 0 字」，本批实测 **301 → `www.logoyq.com`**（5980 B / 0 字），
  原域已不做独立站点 → 由「素材不足」改判为「URL 失效，需改 URL 或下线」，从可写候选中彻底移除。
- **新增细节（2 条，不改处置）**：`tool58825` `dinq.io` 403 后终址 `clepto.io`（主体已更换）；
  `tool148` `magician.design` 本批 15s 超时（b133 曾为 554 KB 博彩落地页），可达性下降但处置仍为移出外链。
- **自检踩坑（新增，务必记住）**：`detailed_content` 是**对象数组**，若用 `String(detailed_content)` 求纯文本会得到
  `[object Object]` 拼接的 59 字假值，导致 1123 条全被判「字数不足 + 不含自身名」。
  必须按 `toolPlainText` 的做法逐项取 `html` 再拼接。
- **结论（第 69 次）**：可写池 0，索引面上限 1127（95.8%），b77–b140 共 64 轮零翻转。
  ①②两项（教程页 56 条补正文 / 50 条清理）仍需人工授权；否则第 141 批必然仍为 0。

## 十二、第 141 批补充（直连全量 + 渲染读取定向 3 条，新增 2 条停运硬证据）

- **基线**：工具 1177、原创池 1127（profiles 1123 + editorials 5，重叠 1）、四条件 1127 == `public/tools.xml` 1127
  == 线上 `taoai365.com/tools.xml` **1127**，池内失败 0/0/0，待写 50（起始 HEAD `b787254d`，干净，HEAD==origin/main）。
  队列 `--top 60 --json` 名单与 b140 逐条一致（第 46 批）。
- **取证**：50 条一轮直连全量（6 路 / 15s / identity / 浏览器 UA）→ 200×20、403×2、404×2、ERR×26，
  与 6 小时前的 b140（200×19 / ERR×27）相比无实质翻转；20 条 200 逐条读可见正文后全部不可写。
  另对 3 条名称干净、疑似「产品还活着」的条目走渲染读取（`r.jina.ai` + `--proxy` + `--tls-max 1.2`、无浏览器 UA、串行 3s）。
- **新增停运硬证据 2 条**：
  - `tool3006` **LogoliveryAI 公司已注销**——官网首页可见正文为
    "Logolivery, Inc. has been officially liquidated"（2024-12-31 页面），非 SPA 空壳问题，属**主体消灭** → 应下线，
    不再列为「素材不足」。
  - `voxcraft-ai` 渲染读取返回 nginx **504 Gateway Time-out**（直连为 fetch failed）→ 服务端长期不可用，属下线候选。
- **复验维持原判 1 条**：`phind-com` 首页经渲染通道仍是 Cloudflare「Just a moment... / Performing security verification」→ 不可写。
- **新增改名/改 URL 候选 2 条（仅记录，未动数据）**：
  - `tool67595` 名称恰为 **30 字**（`论文降aigc-论文aigc降重-AI痕迹降低-论文ai降重`），**能通过代码的 30 字门槛**，
    但它是关键词堆砌串而非产品名，落在 SOP 第 10 条「描述性名称」的排除范围内——按门槛可写、按编辑标准不可写，
    写出去只会强化「scammy 页面」观感。该站（`aigc.66paper.cn`）本身有 2152 字可读正文，**改名后即可写**。
  - `tool67455` `gaoyiai.com` 页面 title 为「稿易 - AI论文写作指导平台」，DB 名却是「专注学术写作降AI率的工具」
    → 名实不符，改名为「稿易」后题材可写（页面仅 128 字正文，仍需补子页素材）。
- **结论（第 70 次）**：可写池 0，索引面上限 1127（95.8%），b77–b141 共 65 轮零翻转。
  ①②（教程页 56 条补正文 / 50 条清理）仍需人工授权；若目标不改，第 142 批必然仍为 0。
  本批新增的 3 条改名/下线证据（LogoliveryAI 注销、VoxCraft 504、tool67595+tool67455 改名）已足够让 50 条里的
  6 条进入「处置」而非「待写」状态。

## 十三、第 142 批补充（三通道全量复核，新增 9 条下线硬证据 + 4 条改名/改 URL）

- **基线**：工具 1177、原创池 1127（profiles 1123 + editorials 5，重叠 1）、四条件 1127 == `public/tools.xml` 1127
  == 线上 `taoai365.com/tools.xml` **1127**（`cmp` 逐字节一致），池内失败 0/0/0，待写 50（起始 HEAD `c9b24840`）。
  队列名单与 b140/b141 逐条一致（第 47 批）。
- **三通道**：①直连 50 条（200×19 / 403×2 / 404×3 / ERR×26，与 b141 无实质翻转）；
  ②代理 curl 重抓 27 条失败项，仅 `tool6840`、`tool150` 回 200，读正文后均不可写；
  ③渲染读取 11 条，取得本批全部新增证据。
- **新增下线硬证据 9 条**（属「处置」而非「待写」）：
  - `tool67418` GetDraft：首屏 **"GetDraft has ceased operations"**，数据冻结 2026-08-31，导出至 2026-12-31。
  - `6pen-art`：官网公告「是时候说再见了」，点数迁移 **6pen.pro** → 原站关停，需改 URL 或下线。
  - `tool14278` MidReal：公开信确认已 **sunset**，团队转向 Macaron。
  - `photonaiclub-com` / `photonaiclub-com-2`：42205 `Failed to resolve domain 'www.photonaiclub.com'`。
  - `xanswer-com`：42205 `EAI_AGAIN`；`tool2676`(175.fun)、`etna-7volcanoes-com`：42203 无解析。
  - `tool66554` 造次：42206 `Unexpected empty file`；`humva-ai`：**ParkLogic 停放页**。
- **新增改名/改 URL 4 条**：`tool6840` 360智绘 → 站点已更名 **360AI办公**（SPA 外壳，12 行提示语）；
  `tool150` usegalileo.ai → **Stitch**（Google）；`duiyou-ai` designkit.cn → **美图设计室**；
  `moyin-com` 魔撰写作 → 站点实为 **魔音工坊**（配音，非写作）；另 `hotshot-co`、`tool216` 域名易主。
- **方法论（第 23 条）**：直连失败的 26 个域名里，代理 curl 只救回 2 个且都是「已改名产品的空壳」——
  **证书过期（SEC_E_CERT_EXPIRED）与 DOMAIN 无解析都已能可靠区分「客户端问题」与「站点已死」**：
  前者是站点自身证书过期（`voxcraft.ai`），后者由渲染服务的 42203/42205 独立网络确认，
  无需再重复三轮抓取。后续批次遇到这两类可直接判死，把预算留给「200 但正文 <200 字」的 SPA 反例。
- **结论（第 71 次）**：可写池 0，索引面上限 1127（95.8%），b77–b142 共 66 轮零翻转。
  待授权不变：① 教程页 56 条补正文（+56 → 1183，唯一成规模面）；② 50 条清理（本批新增 9 下线 + 4 改名）→ ≈1131。

## 十四、第 143 批补充（三通道复核，新增 6 条判死证据 + 1 条「改名即可写」）

- **基线**：工具 1177、原创池 1127（profiles 1123 + editorials 5，重叠 1）、四条件 1127 == `public/tools.xml` 1127
  == 线上 `taoai365.com/tools.xml` **1127**（200 / 321508 B，与本地同尺寸），池内失败 0/0/0，待写 50
  （起始 HEAD `2030f5de`，干净）。队列名单与 b140–b142 逐条一致（第 48 批）。
- **三通道**：①直连 50 条（200×19 / 403×2 / 404×2 / ERR×27，与 b142 无实质翻转，仅 `tool148` 404→超时）；
  ②代理 curl 复核 15 条（先以 `proxy_test=200`、`direct=200` 证明网络正常），除 flowgpt 403 CF、
  withpoly 87 B 空壳外全部 000，`telehire.ai` 为 schannel 握手失败；
  ③渲染读取 9 条，取得本批全部新增证据。
- **新增判死证据 6 条**：`miaohui-jixueai-com`（秒绘AI）域名已易主为「创大产控」；
  `miantuan-knowfuture-com-cn`、`tool7424`(130ai.com) `ERR_CONNECTION_REFUSED`；
  `pagentia-com` 证书域名不匹配；`writingpal-ai` 25s 超时；`tool1957`(ailogo.qq.com) 解析至 `0.0.0.1` 黑洞地址。
  `tool66554` 造次「Unexpected empty file」二次确认。
- **⚠ 唯一可解锁条目**：`moyin-com` 渲染出 62 KB 正文，`x.moyin.com` 301 → `www.moyin.com`，
  站点实为「**魔音工坊**」（短视频/有声书 AI 配音），而 DB 名称是「魔撰写作」。
  **素材是全批最充足的一条，但题材与名称分属两个产品**，沿用现名写配音内容正是 AdSense 判过的「内容主题错配」。
  授权把名称改为「魔音工坊」+ url 改为 `https://www.moyin.com/` 后，可立即产出 1 条 ≥700 字原创资料。
- **方法论（第 24 条）**：渲染失败必须按错误码分流——42203/42205 = 域名消失；
  42206+`ERR_CONNECTION_REFUSED` = 存活但拒连；42206+`ERR_CERT_COMMON_NAME_INVALID` = 证书与域名不匹配；
  40305+`non-public IP 0.0.0.1` = 域名被指向黑洞；403 CF 挑战页 = 存活但不可写（不可判死）。
  五类都无需再跑三轮抓取。
- **结论（第 72 次）**：可写池 0，索引面上限 1127（95.8%），b77–b143 共 67 轮零翻转。
  待授权：① 教程页 56 条补正文（+56 → 1183，仍是唯一成规模面）；② 50 条清理（本批再增 6 条判死）→ ≈1125 上限不变，
  真正的增量只能来自 ①。

## 十五、第 144 批补充（三通道全量重跑，新增 6 条域名判死 + 2 条定性升级）

- **基线**：工具 1177、原创池 1127（profiles 1123 + editorials 5，重叠 1）、四条件 1127 == `public/tools.xml` 1127
  == 线上 1127（200 / 321508 B，与本地同尺寸），池内失败 0/0/0，待写 50（起始 HEAD `2b34f770`，干净、HEAD==origin/main）。
  队列名单与 b140–b143 逐条一致（第 49 批）。
- **三通道**：①直连强制重抓 38 条（成功 8，逐条定性后全部作废，含 `tool1333` 域名已易主为博彩站）；
  ②代理 curl 28 个 URL（先证 `proxy_test=200`，200×3 全是 JS 跳转壳，403×2 为 CF 挑战，404×2，其余 000）；
  ③渲染读取 12 个 URL，本批全部新增证据均来自此通道。
- **新增域名判死硬证据 6 条**：`tool9412`(maopaoya.com) 42203、`tool33149`(ibihun.com) 42203、
  `tool67371`(aimianshibang.com) 42205、`tool13251`(chatwiz.cn) 42205、`tool1890`(neeva.com) 域名出售停放为
  HeadlineLogic 新闻站、`yanqueai-com` 404 站点撤除。
- **定性升级 2 条**：`tool1333`（创作王，aiapp.cc）原记「企业官网」，现返回博彩站「球友会」，**须提升到清理优先级第一档**
  （与 `tool14961` 的 casino 站并列）；`flow-studio` 的 `/flow-studio` 产品页已撤除，301 回落 `flowgpt.com` 首页且全文无
  “Studio” 字样，由「视频工具待写」改判为「名实不符，需改 URL 或下线」。
- **错误码细化 2 条**：`tool11840` 42206 `ERR_CONNECTION_CLOSED`、`tool67775` 42206 `ERR_CERT_AUTHORITY_INVALID`
  （印证方法论第 24 条的五类分流，均无需再跑三轮）。
- **结论（第 73 次）**：可写池 0，索引面上限 1127（95.8%），b77–b144 共 68 轮零翻转。
  50 条中已有约 40 条取得下线/易主硬证据，余者为 CF 拦截或 SPA 空壳（不可写）。
  待授权项未变：① 教程页 56 条补正文（+56 → 1183）；② 50 条清理（→ ≈1131，覆盖率 ≈99.6%）。

## 十六、第 145 批补充（新增 9 条判死/清算/易主，待授权项第二次收敛）

- **基线**：工具 1177、原创池 1127（profiles 1123 + editorials 5，重叠 1）、四条件 1127 == `public/tools.xml` 1127
  == 线上 1127（200 / 321508 B 同字节），池内失败 0/0/0，待写 50（起始 HEAD `fa93705c`，干净、HEAD==origin/main）。
  队列与 b140–b144 逐条一致（第 50 批）。
- **三通道**：①直连 `--force` 12 条 → 成功 1（`hotshot-co` 已易主为数码评测站），余 10 条 `fetch failed`、1 条 403；
  ②代理 curl 10 URL（先证 `proxy_test=200`）→ `humva.ai` 200 但仅 24 字符跳转壳、`phind.com` 403 CF、其余 8 条 000；
  ③渲染读取 14 URL，**本批全部新证据均来自此通道**。
- **新增域名无解析（42203/42205）6 条**：`telehire-ai`、`etna-7volcanoes-com`、`tool2676`(175.fun)、
  `photonaiclub-com`、`photonaiclub-com-2`、`xanswer-com`。
- **新增易主 / 清算 4 条**：`tool3006`(LogoliveryAI) 官网公告「officially liquidated」；
  `tool216`(zyro.com) 已并入 Hostinger；`tool701`(withpoly.com) 实为「Poly 文件浏览器」，`/browse/textures` 已不存在；
  `tool58825`(dinq.io) 变为越南语博彩站 KeoNhaCai。
- **`voxcraft-ai` 仅判「不可写」不判死**：渲染返回 504 Gateway Time-out，属站点自身故障，需后续复访。
  `phind-com`（含 `/about`、`/blog`）三 URL 全为 CF 挑战页，同样只判不可写。
- **外链风险汇总（清理第一档，指向博彩站）**：`tool1333`(aiapp.cc)、`tool14961`(fryderyk.ai redirect)、
  `tool58825`(dinq.io)。三条应立即下线，不建议等待内容补齐。
- **待授权改名 2 条**：`moyin-com`（现名「魔撰写作」，实为「魔音工坊」，素材 75 KB，改名+改 url 后即可产出 1 条）；
  `tool6840`（现名「360智绘」，产品已并入「360AI办公」`bangong.360.cn`）。
- **结论（第 74 次）**：可写池 0，索引面上限 1127（95.8%），b77–b145 共 69 轮零翻转。
  50 条中约 46 条已有下线/易主/名实不符硬证据，剩余 4 条为 CF 拦截或 SPA 空壳。
  **建议把本自动化改为以下二者之一**：① 转做教程页 56 条补正文（唯一还有成规模增量 +56 → 1183）；
  ② 转为「50 条清理 + 死链巡检」任务（→ 约 1131，覆盖率 99.6%）。
  若仍按「15–20 条工具页/批」口径运行，第 146 批必然仍为 0。

---

## 十七、第 146 批：两条高流量页存在主题错配（已修复）

**背景**：本批把复核重点从「50 条待写」转向「已在原创池内、但正文不是编辑部撰写」的条目，
发现索引面里有 4 条页面靠历史正文进索引（`deepseek`、`chatgpt`、`doubao`、`qwen`），其中两条正文写的是**别的产品**：

| slug | 页面应讲 | 原正文实际在讲 | 判定 |
|---|---|---|---|
| `chatgpt` | ChatGPT | 「AI Short」提示词管理与共享平台 | 主题完全错配 |
| `qwen` | 通义千问 | 「AgentMore」智谱清言智能体协作平台 | 主题完全错配 |

两条都能通过 `isToolIndexable` 的四条件——因为错配正文里顺带出现了「ChatGPT」「通义千问」字样，
长度也够 600 字。这说明**四条件只能拦住「稀薄」与「完全不提自己」，拦不住「拿别人的正文顶替」**。

**处置**：按官网/官方文档重写 `deepseek`（1698 字）、`chatgpt`（1356 字）、`qwen`（1350 字）三条，
`apply-tool-profiles.mjs --apply` 已用新正文整段覆盖错配文本。`doubao` 因 `www.doubao.com/chat/`
被区域限制拦截、取不到该产品本身资料，本批未动，其现有「豆包大模型」文本主题一致，暂留。

**现状**：索引面 1127 条中，非 `tool_profiles.json` 来源的只剩 `doubao` 1 条。

**给后续批次的建议**：
1. 若继续做工具页，优先按「页面主题是否与正文一致」抽查，而不是只看字数与是否含自身名。
2. 50 条待写的第 75 轮复核仍为 0：`6pen.art` 已改为「致谢与新篇章」告别页、`hotshot.co` 域名改为数码评测博客，
   加上此前 40 余条下线/易主证据，该池实质已耗尽。
3. 成规模增量仍只有教程页 56 条（+56 → 1183），前置条件是统一 8 条「实测/亲测」标题口径。

## 十八、第 147 批：索引面最后一条采集正文已替换，并发现 24 条 noindex 页仍挂着采集内容

**背景**：本批没有继续在 50 条待写池上耗预算（第 76 轮，仍 0 条可写），改为对全库做一次采集残留扫描，
用 `ai-bot.cn` 与 `wp-content/uploads` 两个特征串检索 `detailed_content`。

**扫描结果：25 条命中。**

| 范围 | 条数 | 说明 |
|---|---|---|
| 待写队列（均 noindex） | 24 | 不进索引面，但页面对外仍可见 |
| 索引面内 | **1**（`doubao`） | 高流量页，正文整段来自 ai-bot.cn |

`doubao` 的问题比「字数够、也提到自己」更严重：正文里有 3 个 `ai-bot.cn` 站内链接、3 张
`https://ai-bot.cn/wp-content/uploads/...` 外链图（对方 CDN 热链）、以及 `utm_source=ai-bot.cn` 推广参数。
这正是 AdSense「正文采集自第三方」的典型特征，而 `isToolIndexable` 的四条件**一条都拦不住**——
与第十七节「拿别家正文顶替」属同一类漏洞：四条件只能验证「体量与自指」，验证不了「来源」。

**处置**：按官方来源重写 `doubao`（1813 字，四节均含工具名），`--apply` 整段覆盖，索引面内采集残留清零（1 → 0）。
豆包网页端三条通道均被区域限制拦截，故助手端只写官方标题可证的事实，能力描述全部落在火山方舟文档范围，未编造端内功能。

**待决策项（新增一条，优先级仅次于清理）：**

1. **教程页 56 条**：全部 145–316 字，`tutorials.xml` 收录 0 条；其中 8 条标题写「实测/亲测」但无实测记录，
   属 SOP「不虚构」红线，改稿须先把角度换成「对比 / 选型 / 上手路径」。这是唯一还能成规模（+56）的面。
2. **24 条 noindex 页的采集正文**：不进索引面，但对外可见且带对方外链图。建议随 50 条清理一并置空或删除，
   不要单独改写成新正文（其中 22 条站点已下线或易主，写了也是死链页）。
3. **`moyin-com` 改名**（第 4 次提出）：素材 75 KB 充足，但站点是「魔音工坊」，现名「魔撰写作」，改名 + 改 url 后即可产出。

## 十九、第 148 批：三条错链已修，另有 198 条「句子式名称」待决策

**一、`moyin-com` 的处置结论修正（撤销第十七节第 3 条的「改名即可产出」建议）**

`x.moyin.com` 实测 title 为「魔音工坊--达人热推的短视频/有声书AI配音平台」，而全库**已有** `www.moyin.com`
的「魔音工坊」条目。因此 `moyin-com` 不是「改名即可写」，而是**重复项**：若按其真实主题补正文，
会与既有条目构成跨页重复（违反 SOP 第二节）。处置应归入清理/合并，不再列为「改名可写」。

**二、三条错误 URL 已修正（索引面内，已验证）**

| slug | 原 url | 新 url | 依据 |
|---|---|---|---|
| `tool26420` | `ima-app.image.myqcloud.com/win_channel/ima.copilot_win_x64_…_3835.exe` | `https://ima.qq.com/` | 原值是安装包直链；新址 200，title「ima - 腾讯AI知识管家」，与正文/`sources[]` 一致 |
| `tool3433` | `kebuxi.datasink.sensorsdata.cn/r/dF` | `https://fabrie.com/` | 原值是神策埋点短链；新址 200，title「Fabrie - Online collaboration platform for designers」 |
| `tool9548` | `deepgram.partnerlinks.io/ai-bot` | `https://deepgram.com/` | 原值是带 `ai-bot` 后缀的联盟跳转域（疑搬运时带入）；新址 200，与 `sources[]` 一致 |

**方法**：按 url 形态对 1177 条做正则扫描（`.exe/.dmg/.apk/msi/zip`、`/r/xxxx` 埋点短链、`partnerlinks`、`go.link`、
`t.cn`、`bit.ly`、`#/` 类前端路由），共命中 46 条，逐条读正文与 `sources[]` 后只剩这 3 条属「指向错误目的地」。
其余命中项（登录页、`paluai.com` 分发子域、`#/` 前端路由）经核为可用，不改。

**三、核销一条误报**：`muse-meta` 的 url 是 `muse.ai`、`sources[]` 是 `ai.meta.com/muse/`，看似硬伤，
实测两者是同一产品（`muse.ai` title「Muse — Your Personal AI Agent」），**url 正确，不必再查**。

**四、待决策（新增，优先级高于继续跑待写池）：198 条句子式名称**

`isToolIndexable` 只校验「名称 ≤30 字、无脏字符」，不校验「名称是不是产品名」。索引面内当前：

- 含「推出的 / 一款 / 的AI / 免费…的」等描述性句式：**198 条**
- 以「工具 / 平台 / 系统」结尾且长度 ≥9：**196 条**（与上组高度重叠）

样本：`lumalabs-ai`=「Luma AI推出的AI视频生成工具」、`tool7012`=「高效的AI PPT生成工具」、
`tool12586`=「免费的AI视频生成和图像创作平台」。占比约 17.6%，多页共用同一句式，正是
「scaled content」判定会看的模式特征；四条件拦不住，因为正文当初就是按这个长名写的。

**建议做法**：50 条/批，把 `name` 改为真实产品名 + 替换正文首段「「<长名>」指的是…」句式，不动 slug/url，
改后用 `apply-tool-profiles` 试算复核「正文含新名」与字数。此项不增加索引条数，只降低模板化观感。

## 二十、第 149 批：6 条「改名可写」全部证伪，工具页增量路径已闭合

**一、改名解锁这条路走不通（新增硬证据）**

b141/b143 曾留下 6 个「改名 + 改 url 后即可写」的候选。逐条比对库内既有条目后发现，**每一条都已存在对应条目**，
改名只会造出跨页重复（违反 SOP「不套模板」与第二节门槛），应归入清理/合并而非补写：

| 待写条目（现名） | 站点实际产品 | 库内已存在 | 处置 |
|---|---|---|---|
| `seelesai-go-link` | Seele（`seeles.ai`） | `tool14989` SeeleAgent | 合并/移除 |
| `tool6840` 360智绘 | 360AI办公（`bangong.360.cn`） | `bangong-360-cn` | 合并/移除 |
| `duiyou-ai` 堆友AI | 美图设计室（`designkit.cn`） | `xmyeditor-com` 美图设计室 | 合并/移除 |
| `tool67455` | 稿易（`gaoyiai.com`） | `tool36409` 稿易AI论文 | 合并/移除 |
| `tool67595` | 66AI论文（`66paper.cn`） | `tool14679` 66AI论文 | 合并/移除 |
| `moyin-com` 魔撰写作 | 魔音工坊（`www.moyin.com`） | `tool1924` 魔音工坊 | 合并/移除 |

结论：50 条待写池里已**不存在**可写出合规原创资料的条目。原站取材、渲染读取、改名解锁三条假设全部关闭。

**二、索引面主题一致性全量体检（新方法，可复算）**

对 1127 条 profiles 页面，统计自身名出现次数 vs 其他库内工具名的最高出现次数，
标记「他名 ≥ max(3, 自身名×2) 且自身名 ≤3」。结果仅 3 条，且读后均为描述性名称（正文讲的是同品牌词
LongCat / Gemini）而非错配：`tool62159`、`tool12491`、`tool21562`。→ b146 那类「整段正文属于别家产品」
的错配在索引面已清零，这 3 条只需改名，不需重写正文。

**三、教程页首次产出：3 条补原创正文（`tutorials.xml` 0 → 3）**

| slug | 字数 | 官方来源 |
|---|---|---|
| `openclaw-local-setup-5min` | 1433 | `docs.openclaw.ai/install` |
| `openclaw-feishu-config` | 1175 | `docs.openclaw.ai/channels/feishu/setup` |
| `microsoft-365-copilot-create` | 894 | `learn.microsoft.com/.../microsoft-365-copilot-overview` |

同步把这 3 条的原 `url` 从 CSDN / QQ 新闻改为官方文档地址。未写的 53 条原因：
标题含「实测/亲测」12 条（红线）；模型版本横评类官方文档不可考 30 余条；
`docs.cursor.com` 三个路径返回同一 SPA 空壳（5525 字、标题相同），`docs.midjourney.com` 直连与代理均 403。

**四、新口径建议**：工具页批产模式（15–20 条/批）已无标的物，建议改为
「教程页按官方文档可取证性筛选后补正文（约 20 条）」+「索引面体检」，工具页侧只做 50 条清理。

## 二十一、第 150 批：工具页第 79 轮仍为 0，教程页再补 4 条（3 → 7）

**一、50 条待写池复核（b140–b150 第 74 轮零翻转）**

队列 24 条直连快照：200×8 / 403×1（Phind CF 挑战页）/ ERR×15。8 条 200 逐条定性后
全部作废——通用名 1（`ai-bot`「AI工具集」）、名实不符 1（`duiyou-ai` → 美图设计室）、
重复条目 2（`moyin-com` ↔ `tool1924`、`tool6840` ↔ `bangong-360-cn`）、
域名易主 1（`hotshot-co`）、博彩站 1（`tool1333`）、URL 失效 1（`yanqueai-com`）、
SPA 空壳 1（`seelesai-go-link`）。未再跑代理与渲染——22 条已有硬证据，余 2 条为 CF 与区域限制。

结论不变：50 条只能清理、不能补写。本批工具页新增 0 条。

**二、教程页补 4 条（`tutorials.xml` 3 → 7）**

| slug | 字数 | 官方来源 |
|---|---|---|
| `deepseek-v4-api-cost-guide` | 1670 | `api-docs.deepseek.com/quick_start/pricing`、`/guides/thinking_mode` |
| `kimi-k26-deep-review-2026` | 1620 | `platform.kimi.com/docs/guide/kimi-k2-6-quickstart`、`/docs/models` |
| `openclaw-api-model-selection` | 2005 | `docs.openclaw.ai/providers/models`、`/concepts/model-providers/custom-providers` |
| `ai-agent-im-integration-2026` | 1465 | `docs.openclaw.ai/channels/wecom`、`/channels/feishu`、`/channels/slack/setup` |

四条同步把 `url` 换成官方地址。标题做了三处必要修正：去「实测」、去未证实的价格表述
（「1元百万token」）、去「钉钉」（OpenClaw 官方无该通道，官方通道为飞书 / 企微 / Slack /
Telegram / Discord / Teams 等）。

**三、两条可复用的取材路径（新）**

1. **文档站的 Markdown 直出**：`docs.openclaw.ai/<path>.md` 与 `llms.txt` 索引、
   `platform.kimi.com/docs/<path>.md` 都直接返回干净 Markdown，正文密度远高于 HTML 页面。
   后续教程优先试这种形态，能省掉正文抽取与噪声过滤。
2. **`api-docs.deepseek.com` 的 Models & Pricing 页是少数把模型规格、上下文、并发、
   峰谷时段、缓存计价全写在一页里的官方定价页**，适合做「成本结构」类内容的事实底稿；
   但按 SOP 只写机制，不写具体数字。

**四、仍然不可用的来源（记录以免重复尝试）**

`www.volcengine.com/docs/*` 为 SPA 导航壳（1.2 MB / 正文 2040 字），Seedance 系列无法取证；
`docs.midjourney.com` 经渲染读取返回未展开的 Zendesk 模板（`<%= article.title %>`）；
`www.office-ai.cn/static/introductions/*` 为 325 B 跳转壳。

**五、教程余量估计**：56 条已写 7 条，剩余 49 条中官方文档可取证约 10–15 条
（OpenClaw 其它通道、DeepSeek/Kimi 文档章节、Microsoft Learn），其余为横评/实测/心得类，
缺官方事实支撑，需换角度或下架。

## 二十二、第 151 批：工具页第 80 轮仍为 0，教程页补 8 条（7 → 15）

**一、50 条待写池复核（第 80 轮零翻转）**

`content-queue --top 24 --save` 与 b140–b150 逐字节一致（第 55 批零 diff）。直连 `--force`
24 条：200×8 / 403×1（Phind CF 挑战页）/ ERR×15。8 条 200 逐条定性全部作废，原因与前几批
完全重合：通用名（`ai-bot`）、名实不符（`duiyou-ai` → 美图设计室、`tool6840` → 360AI办公）、
重复条目（`moyin-com` ↔ `tool1924`）、域名易主（`hotshot-co` → 数码评测站）、
博彩站（`tool1333` → qy球友会）、SPA 空壳（`yanqueai-com`、`ask-xiaoyuzhoufm-com`）、
描述性名称（`seelesai-go-link`）。未再跑代理与渲染——22 条已有硬证据。

**二、教程页补 8 条（`tutorials.xml` 7 → 15），全部为官方文档改写**

| slug | 字数 | 官方来源 |
|---|---|---|
| `hands-on-cursor-10min` | 917 | `cursor.com/docs/get-started/quickstart`、`/agent/overview` |
| `cursor-agent-mode-deep-dive` | 793 | `cursor.com/docs/agent/overview`、`/agent/agents-window` |
| `claude-code-vs-cursor-vs-codex` | 1276 | `docs.claude.com/.../claude-code/overview`、`cursor.com/docs/cli/overview`、`github.com/openai/codex` |
| `ai-prompt-engineering-master` | 923 | `cursor.com/docs/agent/prompting`、`/rules`、Claude Code overview |
| `clawdbot-to-openclaw-upgrade` | 1197 | `docs.openclaw.ai/cli/migrate`、`/install/migrating` |
| `vibe-coding-complete-flow-guide` | 949 | `cursor.com/docs/cloud-agent/setup`、`/cloud-agent/best-practices` |
| `midjourney-starter-guide` | 884 | `docs.midjourney.com/.../32023408776205-Prompt-Basics` |
| `midjourney-usage-detailed` | 952 | `docs.midjourney.com/.../32859204029709-Parameter-List` |

八条同步把 `url` 从 CSDN / 腾讯新闻 / 111cn 换成官方文档地址，`thumbnail` 改为对应官网 favicon。
四条对照组标题重写：`clawdbot-to-openclaw-upgrade` 由「Clawdbot 无痛升级」改为 `openclaw migrate`
的预演与换机流程、`vibe-coding-complete-flow-guide` 由「全流程指南」改为 Cloud Agent 环境配置。
`midjourney-*` 保留原名，但正文改为官方提示词与参数文档的整理。

**三、纠正 b150 的一条错误结论（方法论第 30 条）**

b150 记录「`docs.midjourney.com` 经渲染读取返回未展开的 Zendesk 模板」，据此判定该来源不可用，
本轮证伪：带 `-H "x-no-cache: true"` 与 `-H "x-return-format: markdown"` 请求
`r.jina.ai/https://docs.midjourney.com/hc/en-us/articles/<id>`，返回的是完整渲染后的文章正文
（19–23 KB），标题、小节、参数表都在。**缺 `x-no-cache` 时服务会命中上一次失败渲染的缓存**，
这才是拿到模板占位符的原因。`docs.midjourney.com` 由此恢复为可用官方来源，6 条 Midjourney
教程全部可写，是教程余量里最大的一块。

**四、新可用来源（方法论第 29 条）**

Cursor 文档已迁至 `cursor.com/docs/*`，**加 `.md` 后缀直接返回干净 Markdown**
（`get-started/quickstart.md`、`agent/overview.md`、`cloud-agent/setup.md` 等），
配合 `cursor.com/llms.txt` 可枚举全部路径；而旧的 `docs.cursor.com` 与 `docs.cursor.com/llms.txt`
均为 585 KB 的 Next.js 空壳，JSON 里没有正文，不要再从旧域取材料。
`docs.claude.com/en/docs/claude-code/*.md` 只在部分页面返回真 Markdown（overview、quickstart、
common-workflows 等），提示词工程那几页仍返回 HTML，需按 HTML 处理。

**五、口径（第 80 次重申）**

工具页 1127/1177 = 95.8%，待写池 50 条已无补写可能（约 46 条有下线/易主硬证据）。
提示词里的「1210 / 35 / 1175」相对实况偏差 1.03× / 32× / 23.5×，目标不改则后续批次工具页仍为 0。
本批仍建议：① 50 条清理（合并 19 + 下线约 30）；② 教程按官方可取证性续写——Midjourney 6 条
与 Cursor 系列是当前最确定的一块。

## 二十三、第 153 批：50 条待写池逐条定性完成，工具页路径正式判死（第 77 轮 0 条）

**一、方法变了，结论没变**

前 76 轮多按「队列前 24 条」抓取，样本有限。本批改为**一次性探测全部 50 条**
（8 并发 / 15s 超时），对 200 的逐条核对落地页标题，对证书异常、403、超时的补跑
代理 curl 与渲染读取，最终给 50 条各自留下证据（见 `_content_batch_2026-11-06_b153.md` 第二节）。

分布：通用名/描述性名/关键词堆叠名 12、域名消失 11、停服或产品并入 8、
名实不符或已易主 8、证书或连接故障 8、SPA/登录/注册壳 5、博彩外链 2。

**二、这是「写不了」，不是「还没写」**

过去几轮的表述是「素材偏薄、命中率低」，容易让人以为继续投入还能挖出来。
本批的证据支持更强的判断：50 条里**没有一条**能在不虚构的前提下写出 ≥700 字原创资料。
另需注意，工具页的判定门槛是「名称干净 + ≥600 字 + 含自身名」，其中 12 条连名称这一关都过不了
（`AI工具集` 这类通用名、`最轻量级的全领域AI面试官` 这类句子式名、`论文降aigc-…` 这类堆词名）。

**三、两条必须立即处理的下线项**

`tool1333`（创作王）落地 `aiapp.cc`，标题为「qy球友会」；`tool14961`（Redirecting...）落地
DegenCity 赌场站。两条都是博彩外链，对 AdSense 审核是明确风险，建议先下线，不等整批清理。

**四、本批产出转向教程页（25 → 34）**

9 条全部来自官方文档：OpenClaw 的飞书访问控制、Matrix、Teams、微信插件、WhatsApp、
security CLI、memory CLI，以及 Cursor 的 Bugbot、CLI。其中飞书那条是重写——
原 279 字且 `url` 指向第三方镜像 `clawd.org.cn`（不在允许来源内），已改为官方文档口径。

**五、口径（第 81 次重申）**

工具页 1127/1177 = 95.8%；待写 50；可索引页面合计 1127 + 34 教程 + 15 快讯 = 1176。
提示词目标「工具页 15–20 条」在实况下不可达，建议改为「按官方可取证素材量产出，如实上报」，
否则后续批次仍会以 0 结束。

---

## 第 166 批（2026-11-10）：工具页第 90 轮零翻转，教程侧新面已开

本批对 50 条待写工具页做了两轮探测：50 条全量直连（6 并发/18s）+ 42 条失败项的官方子页穷举
（home/about/en/pricing/docs/help/faq，7 个路径 × 2 个 host 变体）。结果与第 89 轮完全一致：
19 个 200 响应逐条开箱后全部作废（名称不符 6 条、纯壳/SPA 5 条、博彩 2 条、Cloudflare 2 条、
停服公告 1 条、登录页 1 条、通用名 1 条、已被收购迁移 2 条），唯一有字节的 `tool701`
已跳到 `poly.app`（另一个产品「Poly 云文件浏览器」）。

**结论不变且更强**：50 条待写工具页已连续 90 轮零翻转，建议直接下线，不再逐轮探测。

**本批产出转向教程页（273 → 293，可索引 233 → 253）**，20 条全部来自官方文档：
- DeepSeek 官方文档 15 条（Anthropic 端点模型名映射与静默忽略字段、思考档位六写法折四档、
  reasoning_content 回传规则、strict 模式 Schema 子集、传图三方式与四条体积线、图片 token 上限、
  Files API 过期与配额、搜索运算符与两个质量信号、QPS 与成功计费、Responses 事件族、
  不支持参数与固定值、并发与 user_id 隔离、七个状态码、token 换算、两个 beta 补全接口）
- 智谱官方文档 5 条（Python SDK 两个包名、Java SDK 坐标与 Java 8 下限、用户权益等级与积分、
  实名认证四种审核时长、GLM-Image 尺寸规则与文字渲染指标）

**新方法论 55**：`api-docs.deepseek.com` 是本站第二个高密度素材面——它的 guides 与 quick_start
共 20 余页，绝大多数页面的正文就是「边界/限制/不支持/固定值」型事实，天然难写成模板文，
且一次抓取成功率 13/13。此前只写过 3 条（pricing、kv_cache、json_mode），余量仍有
`guides/chat_prefix_completion` 之外的 news 若干与 `quick_start/agent_integrations/*`（7 条）。

**口径**：工具页 1127/1177 = 95.8%，待写 50；可索引页面合计 1127 + 253 教程 + 15 快讯 = 1395。

## 二十一、2026-11-18 人工授权执行记录

用户已授权并执行（HEAD `bbe2692c`）：

1. **博彩外链 3 条已下线**：`tool1333`（qy球友会）、`tool148`（BETWIN188）、`tool14961`（DegenCity Casino）。
2. **教程 40 篇已下架**：正文 <600 字的 40 条（145–284 字，来源为二手转载）从 `data/tutorials.json` 移除；均为 noindex，索引面无损。
3. **categories.json count 已按实际重算**（原滞后 30 条）。
4. **现状**：工具 1174（池 1127）｜ 教程 860（全部 ≥600 字）｜ tools.xml 1127 / tutorials.xml 860 / news.xml 15。
5. **剩余 47 条的清理清单已产出待人工确认**：见 `_tool_cleanup_review_2026-11-18.md`（合并 10 / 下线 35 / 暂缓 2）。
   该清单执行前，本文件的 ①② 待授权项按清单口径理解。

## 二十二、清理清单已执行（2026-11-18 19:54–20:05，HEAD 20bee447）

47 条清单全部落地：合并 10（301 已线上验证）+ 下线 35（线上 404）+ 暂缓 2（phind-com、ask-xiaoyuzhoufm-com 保留 noindex）。
工具 1174 → **1129**，索引覆盖率 ≈**99.8%**，可写池归零，本文 ①② 两项待授权至此**全部关闭**。

附带（自愈机制首次执行）：池内 578 条 toolNNNN 全部迁语义 slug 并同步 tool_profiles 键，_redirects 539 → 1126 条，
修复 18 条断链映射（12 条历史遗留）。全库 1129 条工具 slug 已全部语义化。

后续可做：`moyin-com` 现为魔音工坊（tool1924）的语义 slug，其 75 KB 官网素材可考虑并入现有正文增补（非新增页）。

## 二十三、第 200 批（2026-11-18 晚）：工具池已关闭，教程页首次开采插件体系层（860 → 880）

**一、工具页第 124 轮 0，且此后再无标的物**

清理清单执行后（HEAD `20bee447`），待写队列只剩 2 条，均为此前「暂缓」的 noindex 条目：

| slug | 实测（本批复核） | 判定 |
|---|---|---|
| `phind-com` | `www.phind.com` 403，title 为 Cloudflare 的「Just a moment...」，可见正文 50 字 | 挑战页，不可写 |
| `ask-xiaoyuzhoufm-com` | 200 但可见正文 23 字，纯 SPA 壳；名称「小宇宙推出的AI搜索产品」为描述式 | 名称硬约束排除 + 无素材 |

→ 工具页 1129 中 1127 已在池内（覆盖率 99.8%）。**任务模板里「工具页 15–20 条/批」的口径至此正式失效**，
可写池不是「变薄」而是「已空」，后续批次应直接跳过抓取与工具页撰写，把产能全部投向教程页。

**二、本批产出：教程页 20 条（860 → 880）**

素材首次系统开采 `docs.openclaw.ai/plugins/*`——这是 sitemap 里唯一完全未采过的大子树
（英文根路径 1487 条，未采 1328 条，其中 `plugins` 组 384 条、`gateway` 145 条、`tools` 106 条）。
40 个候选页用 `.md` 直取全部 200、正文 3.6k–74k，无一失败。

二十条主线（按素材页分组）：

- 加载管线三篇：入口越界 / world-writable / 归属不符三道门与内置包的就地 chmod 修复、被拒候选仍带 id；
  缓存代际（缺失也是事实、失败的原生 ESM 由 Node 留到进程结束）；
  激活规划四条收窄线与「all 推出空集就保持空」。
- provider 钩子四篇：清单 / 配置期 / 运行时三层与 `setup.providers[].envVars`、`providerAuthAliases`、`providerAuthChoices` 的分工；
  `normalizeModelId` 只派发一次而 `normalizeTransport` 有一条「未改动才试别家」的豁免；
  `catalog.order` 四档与 `discovery` 别名已于 2026.4.26 移除（注册它不发任何行）；
  `resolveUsageAuth` 的 token / `handled: true` / null 三态。
- 工具策略三篇：`block: true` 终结、`block: false` 等于不表态、每个 handler 看原始事件副本、首次审批冻结参数快照；
  `deviceId` 被转向即丢弃且缺失代表未证实；`resolve_exec_env` 的过滤名单（PATH 与 `LD_*` / 代理 / TLS 变量一律丢弃）。
- 依赖解析三篇：运行时绝不跑包管理器且两个安装根是状态不是缓存；`--preserve-symlinks` 导致嵌套依赖找不到、
  重装无效、诊断看 `gateway status` 与 Service file；`bundleRuntimeDependencies: false` 时补丁依赖必须点名否则打包停止。
- 审批与清单四篇：五道闸的分工（发现期 vs 每次调用）；title 80 / description 512 / timeout 120s→600s 上限；
  `scope` 纯展示且超界整段省略；`dangerousFlags` 的相对路径与通配。
- 其余三篇：SecretRef 的 capability owner 冷失败 vs route owner 保留上次可用值；
  清单管身份而 `activation` 块不替代 `register()`、注册表单向流；Slack 审批人三级名册与「换名单不撤回已发卡片」。

**三、新方法论 126：插件体系层是第十二层素材，写的是「扩展点契约」**

这一层不写功能也不写协议，写的是**哪句回答不需要加载代码、同一份返回里谁冻结谁、哪个别名已经不再发布**。
判据：一页里同时出现「一个已移除或已弃用的字段 + 一条只派发一次的限制 + 一个缺失即未证实的语义」，就能切 2–3 篇。
本批 3 页（`load-pipeline` / `provider-hooks` / `tool-policy`）切出 10 篇，与既有 207 篇 OpenClaw 教程词汇重合为 0。

**四、自检与提交**

1127 == `tools.xml` 1127（池内失败 0）；可索引教程 880 == `tutorials.xml` 880；20 个新 slug 全部在列；
14 字滑窗（仅计 ≥8 汉字）跨文 0、批内 0（五轮修正后归零）；红线词 0、金额 0；标签闭合 20/20；字数 713–1107。
提交 `0062deef`，push 成功（`ba3bbfd9..0062deef`），HEAD==origin/main，工作区干净。
仅动 `data/tutorials.json`、`public/tutorials.xml`。

**五、下一批建议**

`plugins/*` 仍余 364 条未采（`sdk-*` 与 `codex-harness-*` 两组几乎未动），`gateway/config-*` 一组 30 余页也未采；
这两处都不缺长度，缺的是切分角度。

## 二十四、第 204 批（2026-11-20）：工具簿记口径变了，教程首次开采控制台与云工人预热层（940 → 960）

**一、基线变了，必须先说清楚**

本批起始 HEAD 为 `7d449221`，其中包含一次内容导入：`70557aa0` 同步 ai-bot.cn 新收录工具 164 条。
于是工具总数从 1129 变为 **1293**，而原创内容池仍是 **1127**（评测 5 + 原创资料 1127，两者有重叠）。
`tools.xml` 仍为 1127 —— 也就是说**索引覆盖率从 99.8% 降到 87.2%**，池外 166 条
（164 条新导入 + 2 条暂缓）全部 `noindex`。

核对结果：池外 166 条里，164 条的正文纯文本为 **0 字**（只有描述与标签，没有任何正文段落），
2 条为历史暂缓项（`phind-com` 935 字挑战页、`ask-xiaoyuzhoufm-com` 775 字 SPA 壳）。
名称为不干净的 0 条。**这不是索引面故障，是内容缺口**：新导入的 164 条按 SOP 第二节本就不该进索引
（采集描述不构成索引依据），要提升覆盖率只有写原创资料一条路，本轮按任务要求未投入。

**二、本批产出：教程页 20 条（940 → 960，tutorials.xml 940 → 960）**

素材首次系统开采四个此前零采的子树，全部 `.md` 直取、无需代理：
`web/control-ui/*`（8 篇）、`gateway/cloud-workers/*`（7 篇）、`tools/browser/*`（3 篇）、
`plugins/knowledge/{retrieval,stores-and-access}`（2 篇）。

二十条主线：上下文分解的四类分项与字符估算口径 / 协作草稿的四赫兹、十秒降级与三十秒到期 /
侧聊的六十一律取消与每人独立线程 / 会话链接与文件链接的识别边界 / JSON 树与原始视图的复制保真 /
断线变更队列的接纳范围与内存边界 / 控制台图片的三条取法与链接图标的披露代价 /
预热镜像的捕获点必须早于节点注册 / 三个保留键与固定住的例外 / 预备池的每仓库一个与全局四个 /
四十五分钟是操作预算不是租期、五种续租失败码 / 机器消失后的抄本、工具调用与工作区三笔账 /
停止云设备的 draining 与 reclaimed / 每会话换系统与尺寸的排序规则 / 轻量浏览器的合格边界与 AGPL /
页签清理的归属与重启后的两种命运 / 纯文本主模型的截图描述与回退 / 知识检索的查询契约与无分词 /
被取代记录的跟随与三个可能为空的字段 / 会话读写授权的两档与一个不存在的只写档。

**三、自检与提交**

独立复算：工具池 1127，池内四条件通过 1127 == `tools.xml` 1127（池内未通过 0）；
教程 960、≥600 字 960 == `tutorials.xml` 960；快讯 15 == `news.xml` 15；
可索引合计 **1127 + 960 + 15 = 2102**。14 字滑窗（仅计 ≥8 汉字）跨文 0、批内 0（一次通过）；
红线词 0、金额 0；标签闭合 20/20；h2 3–7；字数 915–1261。
`categories.json` 的 count 按主分类（`categories[0]`）复算，15 个分类合计 1293 == 工具总数，无需重算。

**四、下一批建议**

`web/control-ui/*` 仍余 `settings`(99k)、`sessions-and-sidebar`(124k)、`panels`(35k)、`feature-reference`(49k)、
`asset-delivery`(14k)、`security-model` 后半（审批链接、头像与媒体路由）未切；
`gateway/cloud-workers/*` 余 `setup-and-bundle-installation`、`desktop`、`environment-file`、
`dispatching-a-session`、`per-project-default-profiles`、`verify-the-profile`、`security-model`；
`plugins/knowledge/*` 余 `records-and-ontology`、`scribes`、`maintenance`、`evidence`、`control-ui` 等 8 页；
`tools/browser/*` 余 `isolation`、`profiles`、`remote`、`existing-session`、`agent-tools`、`security`。
以上均为高密度未采素材，缺的是切分角度而非长度。

## 二十五、第 205 批（2026-11-21）：教程首次开采设置页与面板页，发现 meta description 模板含「实测」字样

**一、基线未变**

起始 HEAD `1c968a23`，工具 1293、原创池 1127（四条件 1127 == `tools.xml` 1127）、教程 960、快讯 15。
按任务口径未动工具页与 `news.json`。代理 `127.0.0.1:7897` 本轮不可用（返回 000），
`docs.openclaw.ai` 直连正常，37 个候选页 `.md` 直取 37/37 全部 200，属「代理通道缺失」而非「素材缺失」。

**二、本批产出：教程页 20 条（960 → 980，`tutorials.xml` 960 → 980）**

素材来自四棵此前未采的子树：`web/control-ui/sessions-and-sidebar`（6）、`web/control-ui/settings`（4）、
`web/control-ui/panels`（2）、`plugins/knowledge/{tools,scribes}`（3）、`gateway/cloud-workers`（3）、
`tools/browser/{existing-session,remote}`（2）。

二十条主线：侧边栏 300 条窗口与 4–5 秒随机刷新节流 / 归档的撤销窗口到通知消失才提交、嵌套会话两个选项 /
稍后处理的三种唤醒与「不停止运行」/ 新建会话标题预取的 1 秒—12 字符—1000 字符三个门槛 /
浏览器草稿 20 作用域—7 天—25 MiB 与隐身永不持久 / 移动会话的 draining 重试不重放回合 /
通道设置为何不自动保存（半截令牌会重启通道）/ 保存结果未知时暂停无关写入 / 外观偏好的三种作用域 /
四个会话来源开关两开两关 / 终端拖文件只粘路径从不回车 / 终端会话归连接还是归会话 /
知识库页面预算 12000 与 24000、只增不减 / 抄写员的八种状态与状态行 / 抄写员更新为何要发一个对话回合 /
云上两种运行时的职责分工 / devcontainer 只跑命令不起容器 / 云桌面无公网入口与票据单次 /
已登录浏览器的引用寿命 / 环回调试地址必须标 attachOnly。

**三、新方法论 60–61（已写入 SOP）**

设置页是第十七层素材，判据「一个与其他对象不同的保存时机 + 一条作用域归属 + 一个出厂值差异」；
面板与终端页的高产点在「PTY 归属」而非快捷键表，判据「一个所有权判定 + 一个超时或保留期 + 一类被明确拒绝的输入」。

**四、自检与提交**

独立复算：工具 1293、原创池 1127、四条件通过 1127 == `tools.xml` 1127（池外 166 条为 noindex）；
教程 980、≥600 字 980 == `tutorials.xml` 980；快讯 15 == `news.xml` 15；可索引合计 **2122**。
20 个新 slug 全部命中 `tutorials.xml`；14 字滑窗（仅计 ≥8 汉字）跨文 0、批内 0（一次通过）；
红线词 0、金额 0；标签闭合 20/20；h2 均 ≥7；字数 724–1202。
`categories.json` 的 count 按主分类复算，15 类合计 1293 == 工具总数，无需重算。

**五、体检发现（新，需决策）**

线上工具页的 meta description 由 `app/tools/[slug]/page.tsx` 统一拼接，其中含
**「TaoAI 编辑实测推荐」**。这与本 SOP 第一节「不虚构」中禁止的「实测」表述直接冲突，
且作用于全部 1293 个工具页的检索摘要。本批未改动（会一次性改变全站摘要，且属代码而非内容变更），
建议单独一批处理：把该短语换成「TaoAI 编辑收录」或等价的非体验性表述，重建后抽查 2–3 页。

**六、下一批建议**

`web/control-ui/*` 余 `asset-delivery`(14k)、`development`(23k)、`feature-reference`(49k)；
`gateway/cloud-workers` 余 `troubleshooting`(31k)、`setup-and-bundle-installation`(16k)、
`security-model`(9k)、`dispatching-a-session`(7k)、`per-project-default-profiles`(3.6k)、`verify-the-profile`(3.5k)；
`plugins/knowledge` 余 `records-and-ontology`(12k)、`maintenance`(7.5k)、`evidence`(6k)、`control-ui`(6.8k)、
`local-history`(4.3k)、`tools` 的声明与回执两节；`tools/browser` 余 `profiles`、`agent-tools`、`security`、
`isolation`、`troubleshooting`、`login`。

## 二十六、第 206 批（2026-11-22）：教程首次开采 SDK 概览层与运行时层（980 → 1000）

**一、基线未变**

起始 HEAD `7c88717d`（含两条新闻 cron 提交），工具 1293、原创池 1127（四条件 1127 == `tools.xml` 1127）、
教程 980、快讯 13、工作区干净。按任务口径未动工具页与 `news.json`。
`docs.openclaw.ai/sitemap.xml` 本轮 15574 条 `loc`、英文根路径 1471 条、未采 1242 条；
41 个候选页 `.md` 直取 41/41 全部 200，无需代理（代理本轮未使用）。

**二、本批产出：教程页 20 条（980 → 1000，`tutorials.xml` 980 → 1000）**

素材首次开采 `plugins/sdk-overview/*`（9 篇）与 `plugins/sdk-runtime/*`（8 篇）两棵子树，
另有 `gateway/cloud-workers/troubleshooting`、`plugins/knowledge/records-and-ontology` 各 1 篇、
`plugins/sdk-agent-harness/core-ownership` 未单独成篇（其事实并入 blind 与 profile 两篇的边界段）。

二十条主线：插件四个入口文件与两条禁止自引规则 / 命令收尾三去向与抄本留哪一条 /
widget 呈现器的唯一匹配与「失败是返回值」/ 存储 provider 永不覆盖与 512 字节键 /
云工人 destroy 要等物理拆除证明 / 决策 V1 边界返回 undefined 不凑概率 / 决策模型未配即关且无回退 /
目录清单 64 层与十万条抛错不截断 / SQLite 写准入准备可重入 / 请求者级 MCP 的五分钟窗口与无共享兜底 /
回执后工作的独立准入根与 close≠finish / 抄本读取器不建库不修表 /
OAuth 校验在刷新结算期拒绝会锁死代际 / 原生子代理 requestId 是身份 / blind 的四个删项与 fork 拒绝 /
档案只减权限且指令注册时快照 / 人员访问策略四种结果 / 模型目录 pending 不等于可用 /
worker 掉线续跑一次不重放工具 / 知识记录身份来自 id 且重复 id 可列不可查。

**三、新方法论 62–63（已写入 SOP）**

`sdk-overview` 与 `sdk-runtime` 为第十八层素材，写「面与面之间的所有权」，判据「一个准入判定 + 一处不可回退动作 +
一种必须由调用方保留的句柄或令牌」；「失败语义」是这层最值钱的切面，需把「重试是否安全」写成结论。

**四、自检与提交**

独立复算：工具 1293、原创池 1127、四条件通过 1127 == `tools.xml` 1127（池外 166 条为 noindex，
其中 164 条正文 0 字、2 条为历史暂缓）；教程 1000、≥600 字 1000 == `tutorials.xml` 1000；
快讯 13 == `news.xml` 13；可索引合计 **1127 + 1000 + 13 = 2140**。
20 个新 slug 全部命中 `tutorials.xml`；14 字滑窗（仅计 ≥8 汉字）跨文 0、批内 0（一次通过）；
红线词 0、金额 0（初稿一处「美元成本」已改为「计价结果」）；标签闭合 20/20；h2 均 ≥4；字数 987–1596。
`categories.json` 15 类 count 合计 1293 == 工具总数，无需重算。

**五、下一批建议**

`sdk-*` 仍未采尽：`sdk-overview` 余 0（已采完 9 页）、`sdk-runtime` 余 0（8 页已采完）、
`sdk-agent-harness` 余 8 页（core-ownership 已读未成篇，`sessions-and-results`、`attempt-runtime`、
`user-input-and-execution`、`selection-policy`、`runtime-config`、`registration`、`native-inventories` 未动）；
另有 `sdk-channel-inbound/outbound/ingress/gateway-ingress/testing/setup/subpaths` 7 页、
`plugins/manifest/*` 7 页、`plugins/hooks/*` 5 页、`tools/browser/*` 余 6 页、
`web/control-ui/{asset-delivery,development,feature-reference}` 3 页。
`plugins/reference/*` 188 条仍不建议整组开采（低密度卡片）。

## 二十七、第 207 批（2026-11-23）：教程首次开采清单能力/钩子/原生运行时层（1000 → 1021）

**一、基线**

起始 HEAD `1f52cc49`。工具 1293、原创池 1127（四条件通过 1127 == `tools.xml` 1127，池外 166 条为 noindex）、
教程 1000、快讯 14、工作区干净。按任务口径未动工具页与 `news.json`。
`docs.openclaw.ai/sitemap.xml` 本轮 15576 条 `loc`，英文根路径 1473 条、未采 1234 条；
43 个候选页 `.md` 直取 43/43 全部 200，代理本轮返回 000（端口未起），属「代理通道缺失」而非「素材缺失」。

**二、本批产出：教程页 21 条（1000 → 1021，`tutorials.xml` 1000 → 1021）**

素材来自五棵此前未采或只采过邻页的子树：`plugins/sdk-subpaths`（3）、`plugins/sdk-channel-outbound`（4）、
`plugins/hooks/prompt-and-session`（5）、`plugins/sdk-agent-harness/*`（3）、`plugins/manifest/models`（2）、
`plugins/sdk-setup`（1）、`web/control-ui/feature-reference`（1）等。

二十一条主线：能力目录出口的冷发现约束（不得查鉴权库/起会话，异步捕获为必填）/
回环判定解析 IP 字面量而非前缀、只读密钥的 blocked 与 missing 不可合并 /
脱敏匹配器的偏移量指当前字符串、捕获决定遮哪一段 / 30 分钟租约 + 5 分钟扫描 = 35 分钟上界 /
isNew 只表示插入行、保留期剪掉后再插入仍报真 / 回执只证明平台接受、线程冲突时聚合省略 /
未派发标记只许派发边界所有者抛、失败不等于换路径重发 / 回退链空数组即禁用、非字符串数组被当空 /
系统上下文单项限四分之一、截断留前缀并加固定标记 / 工具授权阶段只能返回两类上下文、指纹不是令牌 /
被拦轮次只留替换文本、内部原因按敏感处理 / 连续性三态与命令行八种失效原因 /
核心准备尝试、运行方不得选 provider、会话所有者是显式字段 / 安全拒绝名单的四个保留条件 /
子代理观察最多 128 条、原生标识不是取消句柄 / 来源绑定注入撤销为单向、批量逐项重验 /
输出用量按单次响应报、重试共享运行总量 / 外部目录水合只填空、显式 false 亦权威 /
命令行后端按厂商费率估算、本地部署显式关闭外部价 / 单账户提升的空数组是契约标记而非「不搬」 /
工具活动按调用计数而非事件计数。

**三、新方法论 64–65（已写入 SOP）**

- 64：`plugins/manifest/*` 与 `plugins/sdk-setup` 属「清单契约层」，写的是**省略与显式之间谁更严**：
  `activation.onStartup` 省略不再隐式启动、`singleAccountKeysToMove` 空数组才是退出旧式搬迁、
  `modelsDev` 只填 undefined 且显式 `false` 亦权威。判据：一页里同时出现「一个省略即改变行为的字段 +
  一个空数组/空值的新含义 + 一处只在发布期生效的校验」，就能切 2–3 篇。
- 65：`plugins/sdk-channel-outbound` 的产能来自「同一件事有两个时间口径」与「证据分层」：
  租约 30 分钟但最坏 35 分钟回收、待处理托管不是送达回执、未派发标记只属于派发边界所有者。
  判据：一页里同时出现「两个数相加减才等于真实等待 + 一份回执能证明到哪一步 + 一个不许跨层使用的断言」，
  就能切 3 篇以上。

**四、自检与提交**

独立复算：工具 1293、原创池 1127、四条件通过 1127 == `tools.xml` 1127；教程 1021、≥600 字 1021 ==
`tutorials.xml` 1021；快讯 14 == `news.xml` 14；可索引合计 **1127 + 1021 + 14 = 2162**。
21 个新 slug 全部命中 `tutorials.xml`；14 字滑窗（仅计 ≥8 汉字）跨文 0、批内 0（一次通过）；
红线词 0、金额 0；标签闭合 21/21；h2 均 ≥4；字数 893–1304。
`categories.json` 15 类 count 合计 1293 == 工具总数，无需重算。
提交 `f396db9b`，push 成功（`1f52cc49..f396db9b`），HEAD==origin/main。
线上复核：新页 200 且无 robots noindex，生产 `tutorials.xml` 1021 且含新 slug，`tools.xml` 1127。

**五、下一批建议**

`sdk-agent-harness` 余 `selection-policy`、`runtime-config`、`registration`、`native-inventories` 4 页；
`plugins/sdk-channel-{inbound,ingress,gateway-ingress,testing,subpaths}` 5 页；`plugins/manifest` 余
`capabilities`、`providers`、`package-json`、`setup-and-auth`、`surfaces` 5 页（`surfaces` 32k，含图标恢复与主题两节）；
`plugins/hooks/reference`(15k) 与 `plugins/hooks/{lifecycle,messages}` 仍有余量；
`gateway/cloud-workers/{setup-and-bundle-installation,security-model,dispatching-a-session}`、
`tools/browser/{profiles,agent-tools,troubleshooting}`、`web/control-ui/development` 亦未成篇。
`plugins/reference/*` 188 条继续整组跳过。
