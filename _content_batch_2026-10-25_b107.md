# 第 107 批原创资料实测（2026-10-25 夜间）

> 任务：taoai365.com 工具页原创资料批量续写（目标 15–20 条）
> 结论：**新增 0 条**（连续第 37 批）。工具页索引面上限 = 1125，待写池 52 条已全部取证完毕，按现任务口径无新增可能。

---

## 一、基线（独立复算，未依赖历史结论）

| 指标 | 数值 |
|---|---|
| `data/tools.json` 工具总数 | 1177 |
| `data/editorials.json` 评测 | 5 |
| `data/tool_profiles.json` items | 1121 |
| 原创内容池（并集去重） | **1125** |
| 四条件通过数 | **1125** |
| `public/tools.xml` `<loc>` 条数 | **1125** |
| 池内四项失败（名称/字数/含自身名） | 0 / 0 / 0 |
| 待写（工具 − 原创池） | **52** |

自检等式：`1125 == 1125 == 1125` ✅

复算口径要点（沿用第 100 批教训）：`plainText` 只取 `detailed_content[].html` 拼接后剥标签去空白，**不得拼接 `description`/`summary`**，否则全库误判为短。

## 二、本批动作

1. `node scripts/content-queue.mjs --top 24 --save` → 24 条，`git status` 对 `data/content_queue.json` **零 diff**（名单自第 92 批起 15 批未变）。
2. 52 条全量直连探针（6 并发，9s 超时）：**200:23 / 403:1 / 404:2 / ERR:26**，与 b98–b106 十批逐条一致，**零翻转**。
3. 对 23 条 200 逐条核对 `<title>` 与正文体量，并按「名称—页面」一致性复核。
4. 未投代理 / 渲染读取 / 官方子页：五类通道已在 b77–b106 试尽，边际为 0。本批仅对 1 条历史为 404 的条目做了终点核验（见第四节）。

## 三、52 条逐条判定表（本批证据刷新，可直接引用）

分桶：A 不可达/证书/空壳 **31**、B 403/404 **3**、C 停运/易主并入 **4**、D 主题不符/博彩/登录页 **9**、E 名称不合格 **3**、同站重复应合并 **2**。

| # | slug | 名称 | 探针 | 正文 | 落地标题 / 证据 | 桶 | 建议 |
|---|---|---|---|---|---|---|---|
| 1 | ai-bot | AI工具集 | 200 | 743KB / 14995 | AI工具集官网 \| 1000+ AI工具集合 | E | 通用名，排除（含自身名校验失效） |
| 2 | tool67418 | GetDraft | 200 | 921B / 8 | GetDraft（已公告停运） | C | 下线 |
| 3 | tool14278 | MidReal | 200 | 84KB / 1180 | MidReal - Free AI Story Generator（首页告别信，已转 Macaron） | C | 下线 |
| 4 | moyin-com | 魔撰写作 | 200 | 9.7KB / 24 | **魔音工坊**（配音产品，非「魔撰写作」） | D | 改名或下线 |
| 5 | writingpal-ai | WritingPal | ERR | AbortError | 域名无响应 | A | 下线 |
| 6 | tool1333 | 创作王 | 200 | 24KB / 3382 | `&#113;&#121;球友会`（HTML 实体编码的博彩站） | D | 下线 |
| 7 | tool7424 | XPaper AI | ERR | ECONNREFUSED | 连接被拒 | A | 下线 |
| 8 | miaohui-jixueai-com | 秒绘AI | ERR | CERT_HAS_EXPIRED | 证书过期 | A | 下线 |
| 9 | photonaiclub-com | 光子AI | ERR | ENOTFOUND | 域名不解析（确证过期） | A | 下线 |
| 10 | voxcraft-ai | VoxCraft | ERR | CERT_HAS_EXPIRED | 证书过期 | A | 下线 |
| 11 | photonaiclub-com-2 | 光子AI抠图 | ERR | ENOTFOUND | 同上，域名过期 | A | 下线（与 #9 同站） |
| 12 | 6pen-art | 6pen Art | ERR | CERT_HAS_EXPIRED | 已迁 6pen.pro，旧域证书失效 | A | 下线或改 url |
| 13 | tool6840 | 360智绘 | 200 | 20KB / 105 | **360AI办公**（`bangong.360.cn` 会员权益页，正文仅 105 字符壳） | D | 改名或下线 |
| 14 | tool2676 | 175FUN | ERR | ENOTFOUND | 域名到期停放 | A | 下线 |
| 15 | tool216 | Zyro AI Image Upscaler | 200 | 278KB / 8781 | Zyro **Joins Forces With Hostinger**（正文为促销横幅循环） | C | 下线（产品并入 Hostinger） |
| 16 | tool66554 | 造次 | 200 | 0 | body 0 字节 | A | 下线 |
| 17 | flow-studio | Flow Studio | ERR | AbortError | 超时，且已并入 FlowGPT 主站 | A | 下线（兼重复） |
| 18 | hotshot-co | Hotshot | 200 | 452KB / 9026 | **Hotshot \| AI Tools, Gadgets…How-To Guides**（已成科技博客，导购文章） | D | 下线 |
| 19 | humva-ai | Humva | ERR | UNABLE_TO_GET_ISSUER_CERT | 证书链不可取 | A | 下线 |
| 20 | etna-7volcanoes-com | Etna | ERR | ENOTFOUND | 域名不解析 | A | 下线 |
| 21 | miantuan-knowfuture-com-cn | 面团AI | ERR | AbortError | 超时 | A | 下线 |
| 22 | tool67371 | AI面试助手\|AI笔试助手 | ERR | ENOTFOUND | 域名不解析；名称亦为拼接式 | A | 下线 |
| 23 | telehire-ai | 最轻量级的全领域AI面试官 | ERR | ENOTFOUND | 域名不解析 | E/A | 下线 |
| 24 | tool58825 | AI人才发现与分析平台… | 200 | 369KB / 6366 | 无 `<title>`，跳转终点 **clepto.io**（越南语博彩，`dinq` 出现 0 次） | D | 下线 |
| 25 | tool71074 | 长视频精华提炼… | 404 | 1260 | Project not found | B | 下线 |
| 26 | tool11395 | 一站式用GPT-5.5、Claude-4.7 | 200 | 698B | 仅跳转壳；落地重复 Flowith | A | 下线（兼重复） |
| 27 | seelesai-go-link | 全球首个端到端AI 3D游戏生成工具 | 200 | 188KB | 短链已复活 → **`www.seeles.ai/workspace`**（与已索引 `tool14989` SeeleAgent 同站同产品） | 合并 | 合并至 `tool14989` |
| 28 | tool1338 | 全能AI助手，基于Qwen模型 | 200 | 633B | 第三方壳页；实质重复通义千问 `qwen` | A | 下线（兼重复） |
| 29 | tool13251 | 字节跳动旗下推出的AI虚拟交友聊天平台 | ERR | EAI_AGAIN | DNS 间歇失败 | A | 下线 |
| 30 | tool9412 | 阶跃星辰推出的AI聊天机器人和智能体平台 | ERR | ENOTFOUND | 域名不解析 | A | 下线 |
| 31 | tool1890 | Neeva | ERR | UNABLE_TO_GET_ISSUER_CERT | 产品已停运并入 Snowflake | A | 下线 |
| 32 | tool479 | AI代码检查 | 404 | — | 404 | B | 下线 |
| 33 | tool111 | Reply Logo | 200 | 864KB / 11130 | **Devin Desktop**（`codeium.com` 302 → `devin.ai/desktop`） | D | 下线（与 `preview-devin-ai` 重复） |
| 34 | duiyou-ai | 堆友AI | 200 | 98KB / 346 | **美图设计室**（`designkit.cn` 已整体易主） | D | 改 url 或下线 |
| 35 | yanqueai-com | AI LOGO设计工具 | 200 | 5.9KB / 0 | 无标题、无正文；名称本身是功能描述 | E/A | 下线 |
| 36 | tool33149 | AI设计工具，支持AI抠图、消除、无损放大 | ERR | ENOTFOUND | 域名不解析 | A | 下线 |
| 37 | tool3006 | LogoliveryAI — Free AI | 200 | 2490B / 214 | Logolivery, Inc. **has been officially liquidated**（清算公告） | C | 下线 |
| 38 | tool150 | AI高保真原型设计 | ERR | AbortError | 超时 | A | 下线 |
| 39 | tool923 | AI 3D捕捉、建模和渲染 | ERR | AbortError | 超时；且与已索引 `lumalabs-ai` 同站 | A | 下线（兼重复） |
| 40 | tool1957 | AIDesign | ERR | ENOENT | 连接失败 | A | 下线 |
| 41 | tool701 | AI生成3D材质 | 200 | 87B / 0 | `withpoly.com` 已变「Intelligent Cloud File Browser」 | A | 下线 |
| 42 | tool148 | BW188 | ERR | AbortError | 域名已被他用（冰淇淋店） | A | 下线 |
| 43 | tool14961 | Redirecting... | 200 | 51KB / 22971 | **DegenCity Casino New Zealand - Pokies, Bonuses**（博彩站） | D | 下线 |
| 44 | pagentia-com | AI专利查新检索与撰写平台 | ERR | TLS_ALTNAME_INVALID | 证书 CN 不匹配 | A | 下线 |
| 45 | ask-xiaoyuzhoufm-com | 小宇宙推出的AI搜索产品 | 200 | 28KB / 29 | `<title>` = 小宇宙，SPA 仅 29 字符壳 | A | 下线 |
| 46 | xanswer-com | 支持生成思维导图的免费AI搜索工具 | ERR | EAI_AGAIN | DNS 失败 | A | 下线 |
| 47 | tool11840 | 结构化AI知识搜索引擎 | ERR | ECONNRESET | 连接重置 | A | 下线 |
| 48 | phind-com | Phind | 403 | 5588 | `Just a moment...`（Cloudflare 挑战，无法取证；另据历史已停运） | B | 下线 |
| 49 | tool67775 | 在线大模型训练微调及AI科研学习平台 | ERR | DEPTH_ZERO_SELF_SIGNED_CERT | 自签证书；历史快照为「平台关停公告」 | A | 下线 |
| 50 | tool1079 | 阿里云登录 | 200 | 201B / 177 | 登录页，无产品正文 | D | 下线 |
| 51 | tool67455 | 专注学术写作降AI率的工具 | 200 | 5.8KB / 135 | 稿易；同域 `gaoyiai.com` 已有已索引 `tool36409` | 合并 | 合并至 `tool36409` |
| 52 | tool67595 | 论文降aigc-论文aigc降重-AI痕迹降低-论文ai降重 | 200 | 43KB / 2418 | 66paper 单页，名称关键词堆砌 | E | 下线 |

> 说明：E 桶 3 条（#1、#23、#52）在**代码层面均判为「名称干净」**（≤30 字、无 ` | `/`&#`/`--`），但语义上不适合作为页面标题——即使抓到素材也会写出「『论文降aigc-论文aigc降重…』是什么」这类废标题。故需人工处理，不应通过改代码放宽门槛。

## 四、本批唯一新确证

`seelesai-go-link` 在 b101 记录为「短链 expired（404）」，本批实测**已复活**：302 终点 `https://www.seeles.ai/workspace`，200、188KB、`<title>` = “Best No-Code AI Game Maker for 2D/3D Games”，正文提及 `seele` 78 次。

但这不是「新增可写素材」，而是**确证重复**：`seeles.ai` 域已有在池条目 `tool14989`（SeeleAgent，`https://www.seeles.ai/`，已索引）。同域同产品再写一页只会造出重复页 → 归「合并」桶。这也再次验证 SOP 第七节第 18 条：状态翻转必须先核对落地终点，而非直接当作可写信号。

## 五、自检

- 四条件：`1125 == 1125 == 1125` ✅（池内四项失败 0）
- `apply-tool-profiles.mjs` 试算：应用 1121 条、未匹配 slug **0** ✅
- 未执行 `--apply` 与 `generate-sitemap`：无内容可合并，执行只会刷新 lastmod 而无实际变更（沿用 b99 起做法）
- 未改动 `data/tools.json` / `data/tool_profiles.json` / `public/*.xml`
- 提交前清理 `.tmp_b107_*` 临时文件

## 六、结论与建议（第 37 次）

**工具页索引面已到硬上限 1125。** b77–b107 共 31 轮、五类通道（直连 / 代理 curl / 渲染读取 / 官方子页+sitemap / 备用域名猜测）累计数百 URL，仅 b77 命中 1 条。52 条待写已 11 次复核、零翻转，每一条都有域名级或页面级证据。

**按现任务口径重跑产能恒为 0，建议尽快改任务方向。** 真实增量只有两处：

1. **52 条死链清理**（纯数据操作）：下线约 43 条（A31/B3/C4/D9 中可下线者）、合并 2 条（#27→`tool14989`、#51→`tool36409`）、E 桶 3 条待人工定名。工具数 1177 → 约 1132。**索引面不变，但对 AdSense 人工复核有正向价值**——现网还挂着 4 个博彩域名（#6、#24、#43，及 #29 系壳页）与 1 个登录页，属明显质量风险。
2. **教程页 56 条补正文**（唯一放量面，+56 → 1125 变 1181）：现状 56 条正文 min/median/max = 145/232/316，≥600 字 0 条，`public/tutorials.xml` 不存在；另有 8 条标题含「实测/亲测」需先改口径。

> 两项均涉及破坏性数据操作或任务范围变更，需人工授权后执行，本批未擅自实施。
