# 第 103 批原创资料生产报告（2026-10-24 夜间）

> 任务：为工具页批量续写原创资料，本批目标 15–20 条
> 结果：**新增 0 条**，素材缺失/不可写跳过 52 条（全池），累计可索引 **1125 条**，剩余待写 **52 条**

---

## 一、基线自检

| 指标 | 数值 |
|---|---|
| `data/tools.json` 工具总数 | 1177 |
| 原创内容池（editorials 5 ∪ tool_profiles 1121，重叠 1） | 1125 |
| 四条件通过数（命中原创池 + 名称干净 + 纯文本 ≥600 + 含自身名） | **1125** |
| `public/tools.xml` 条数 | **1125** |
| 一致性 | ✅ 1125 == 1125 == 1125（slug 双向差集均为空） |
| 池内四项失败 | 0 |
| 待写 | 52 |
| HEAD | `f7fcadc9`（较 b102 无新提交，名单自 b92 起 12 批未变） |

本批复算脚本按 `scripts/generate-sitemap.mjs` 的 `toolPlainText()` 口径实现：纯文本只取
`detailed_content[].html` 拼接后剥标签去空白，**不拼接** `description`/`summary`（b100 曾因拼接
description 得到 PASS=0 的错误结论）。

---

## 二、本批实际执行

1. `node scripts/content-queue.mjs --top 24 --save` → 写入 `data/content_queue.json`，**零 diff**（24 条仍是同一批），
   52 条待写与本批独立复算的差集为空。
2. 直连探针 52 条（8 并发、12s 超时、`Accept-Encoding: identity`）：
   **200×21 / 连接失败×27 / 404×2 / 403×1 / abort×1**，与 b98–b102 逐条一致，**零状态翻转**。
3. 对 16 条「名称干净且疑似仍在运营」的站点走**代理 + 渲染读取**（`r.jina.ai`，经 `http://127.0.0.1:7897`，
   串行、间隔 2s、不带浏览器 UA）——这是本批唯一新投入的通道，命中 3 条新确证，但**无一可写**：
   - `tool14278` MidReal：首页是《A Letter to Our MidReal Community》告别信，产品已 sunset，团队转向 Macaron；
   - `6pen-art` 6pen：首页仅《致谢与新篇章》，服务已迁至 6pen Pro（`6pen.pro`）；
   - `tool3006` LogoliveryAI：官网公告「Logolivery, Inc. has been officially liquidated」，公司已清算；
   - 另 `miaohui-jixueai-com` 渲染结果为「创大产控｜科研经纪产业领军企业」，域名已彻底他用；
   - `phind-com` 直连 403，渲染读取同样返回 Cloudflare 挑战页，**无法取证**；
   - 其余 11 条渲染服务返回 422（下游不可达）。
4. 未运行 `apply-tool-profiles.mjs --apply` 与 `generate-sitemap.mjs`：本批无内容可合并，
   空跑只会刷新 `lastmod`、给出虚假的「内容有更新」信号。

---

## 三、52 条待写池判定表（可逐条执行）

分桶：**A（不可达/空壳/反爬）15 · B（403/404）3 · C（已停运/并购）5 · D（易主/主题不符）11 · E（名称不合规）13 · 合并 5**

汇总建议：**下线 43 条 · 合并 5 条 · 更名后再议 12 条（其中 1 条 `ai-bot` 建议直接排除不撰写）**。
执行后工具总数 1177 → 约 1129，**索引面仍为 1125（不变）**，但对 AdSense 人工复核有利：
站内不再存在 43 个指向赌场站/停运公告/别家产品的死链条目。

| slug | 名称 | 状态/正文 | 桶 | 证据 | 建议 |
|---|---|---|---|---|---|
| `tool14961` | Redirecting... | 200 / 22865 | D | 落地为 DegenCity 赌场站 | 下线 |
| `ai-bot` | AI工具集 | 200 / 14983 | E | 名称通用（“AI工具集”本身即品类词），含自身名校验失效 | 排除，不撰写 |
| `tool111` | Reply Logo | 200 / 11008 | 合并 | 落地 Devin Desktop，与 preview-devin-ai 同站 | 合并至 preview-devin-ai |
| `hotshot-co` | Hotshot | 200 / 8827 | D | 域名已变为导购博客（AI Tools/Gadgets/How-To），与条目主题不符 | 下线 |
| `tool216` | Zyro AI Image Upsc… | 200 / 8606 | C | 301 至 Hostinger 并购公告，原产品线已并入 Hostinger | 下线 |
| `tool58825` | AI人才发现与分析平台，精准识别AI… | 200 / 6254 | D | 跳转终点为越南语博彩站（6368 字符，无 dinq 字样） | 下线 |
| `tool67595` | 论文降aigc-论文aigc降重-A… | 200 / 1947 | E | 名称达 30 字且为关键词堆砌 | 更名后再议 |
| `tool14278` | MidReal | 200 / 1081 | C | 本批新确证：首页为告别信，MidReal 已 sunset，团队转向 Macaron | 下线 |
| `duiyou-ai` | 堆友AI | 200 / 305 | D | designkit.cn 已整体变为“美图设计室” | 改 url 或下线 |
| `tool1079` | 阿里云登录 | 200 / 177 | A | 落在阿里云登录页 | 下线 |
| `tool67455` | 专注学术写作降AI率的工具 | 200 / 119 | 合并 | 同域名 gaoyiai.com 已有已索引 tool36409「稿易AI论文」 | 合并至 tool36409 |
| `tool6840` | 360智绘 | 200 / 97 | D | 302 至 360AI办公权益页，正文仅 107 字符壳 | 下线 |
| `tool71074` | 长视频精华提炼，自动追踪频道中文推送 | 404 / 61 | B | 404 Project not found | 下线 |
| `phind-com` | Phind | 403 / 41 | A | Cloudflare 挑战页，渲染读取同样被挡，无法取证 | 暂缓（无法取证） |
| `ask-xiaoyuzhoufm-com` | 小宇宙推出的AI搜索产品 | 200 / 25 | D | 落地为小宇宙 App 下载页（25 字符） | 下线 |
| `miaohui-jixueai-com` | 秒绘AI | TypeError / 0 | D | 本批新确证：域名已易主为“创大产控 科研经纪产业” | 下线 |
| `photonaiclub-com` | 光子AI | TypeError / 0 | A | 站点不可达 | 下线 |
| `photonaiclub-com-2` | 光子AI抠图 | TypeError / 0 | A | 站点不可达，且与上条同域名重复 | 合并后下线 |
| `moyin-com` | 魔撰写作 | 200 / 0 | D | x.moyin.com 实际为“魔音工坊”，与名称“魔撰写作”不符 | 改 url 或下线 |
| `voxcraft-ai` | VoxCraft | TypeError / 0 | A | 本批渲染亦 504 | 下线 |
| `6pen-art` | 6pen Art | TypeError / 0 | C | 本批新确证：首页仅“致谢与新篇章”，服务已迁至 6pen Pro | 改 url 至 6pen.pro 或下线 |
| `tool67418` | GetDraft | 200 / 0 | C | 官网仅有停运公告（导出服务至 2026-12-31） | 下线 |
| `tool2676` | 175FUN | TypeError / 0 | A | 站点不可达 | 下线 |
| `tool66554` | 造次 | 200 / 0 | A | 站点不可达 | 下线 |
| `tool1333` | 创作王 | TypeError / 0 | A | 站点不可达 | 下线 |
| `tool7424` | XPaper AI | TypeError / 0 | A | 站点不可达 | 下线 |
| `etna-7volcanoes-com` | Etna | TypeError / 0 | A | 站点不可达 | 下线 |
| `tool67371` | AI面试助手|AI笔试助手 | TypeError / 0 | E | 名称含抓取残留分隔符“ | ” | 更名后再议 |
| `telehire-ai` | 最轻量级的全领域AI面试官 | TypeError / 0 | E | 描述性名称（“最轻量级的全领域AI面试官”） | 更名后再议 |
| `tool1338` | 全能AI助手，基于Qwen模型 | 200 / 0 | 合并 | 第三方壳页，标题“千问-阿里 AI 助手”，与 qwen 重复 | 合并至 qwen |
| `seelesai-go-link` | 全球首个端到端AI 3D游戏生成工具 | 200 / 0 | E | 短链落地为 AI 游戏生成器，但名称为描述性长句 | 改名 Seele 后再议 |
| `tool11395` | 一站式用GPT-5.5、Claude… | 200 / 0 | 合并 | 落地 flowith.io，与已索引 tool139 Flowith 同产品 | 合并至 tool139 |
| `writingpal-ai` | WritingPal | TypeError / 0 | A | 站点不可达 | 下线 |
| `tool9412` | 阶跃星辰推出的AI聊天机器人和智能体… | TypeError / 0 | E | 描述性名称 | 更名后再议 |
| `tool1890` | Neeva | TypeError / 0 | A | Neeva 已关停，仅剩重定向页 | 下线 |
| `tool13251` | 字节跳动旗下推出的AI虚拟交友聊天平… | TypeError / 0 | E | 描述性名称 | 更名后再议 |
| `flow-studio` | Flow Studio | TypeError / 0 | D | 311KB 落地为 FlowGPT 提示词商店首页，非 Flow Studio | 下线 |
| `tool33149` | AI设计工具，支持AI抠图、消除、无… | TypeError / 0 | E | 描述性名称 | 更名后再议 |
| `tool479` | AI代码检查 | 404 / 0 | B | 404 | 下线 |
| `humva-ai` | Humva | TypeError / 0 | A | 站点不可达 | 下线 |
| `yanqueai-com` | AI LOGO设计工具 | 200 / 0 | B | 渲染 404，直连仅空壳 | 下线 |
| `tool1957` | AIDesign | TypeError / 0 | A | 403，渲染亦被拒 | 下线 |
| `miantuan-knowfuture-com-cn` | 面团AI | TypeError / 0 | A | 站点不可达 | 下线 |
| `pagentia-com` | AI专利查新检索与撰写平台 | TypeError / 0 | E | 描述性名称，站点不可达 | 更名后再议 |
| `xanswer-com` | 支持生成思维导图的免费AI搜索工具 | TypeError / 0 | E | 描述性名称，站点不可达 | 更名后再议 |
| `tool701` | AI生成3D材质 | 200 / 0 | D | withpoly.com 已变为“Intelligent Cloud File Browser” | 下线 |
| `tool67775` | 在线大模型训练微调及AI科研学习平台 | TypeError / 0 | E | 描述性名称，站点不可达 | 更名后再议 |
| `tool11840` | 结构化AI知识搜索引擎 | TypeError / 0 | E | 描述性名称，站点不可达 | 更名后再议 |
| `tool3006` | LogoliveryAI — Fre… | TypeError / 0 | C | 本批新确证：官网公告 Logolivery, Inc. 已清算 | 下线 |
| `tool923` | AI 3D捕捉、建模和渲染 | TypeError / 0 | 合并 | 落地 Luma 官网，与已索引 lumalabs-ai 重复 | 合并至 lumalabs-ai |
| `tool150` | AI高保真原型设计 | TypeError / 0 | E | 描述性名称（落地 Galileo，仅 23 字符壳） | 更名后再议 |
| `tool148` | BW188 | AbortError / 0 | D | magician.design 已易主为冰淇淋店官网 | 下线 |

---

## 四、结论与建议（第 33 次）

**工具页索引面上限 = 1125，按原任务重跑，产能恒为 0。**

- b77–b103 共 27 轮，累计数百个 URL，四类通道（直连 / 代理 curl / 渲染读取 / 官方子页与 sitemap）全部试过，
  仅 b77 命中 1 条；
- 52 条已在本批完成**第五次复核**，且首次对全部 52 条一次性出判定表（见上），证据链（域名 / 落地页标题 / 正文长度 /
  是否出现工具名）齐备，下批**无需再抓取**；
- 待写池里剩下的要么打不开，要么打开了不是这个产品，要么名称本身过不了「含自身名」校验——
  这不是素材不足，是**候选池已被写尽**。

**真实增量只有两处，需授权后执行：**

| 方向 | 规模 | 说明 |
|---|---|---|
| ① 清理 52 条死链 | 下线 43 · 合并 5 | 纯数据改动，不动内容；索引面不变，但消除站内死链与错配页 |
| ② 教程页 56 条补正文 | **+56（1125 → 1181）** | 唯一放量面 |

② 的现状（本批复核）：

- `data/tutorials.json` 共 **56** 条，正文纯文本 min 145 / avg 232 / max 316 字，**≥600 字 0 条**；
- 因此 `public/tutorials.xml` **不存在**，`/tutorials/*` 全部 noindex，是当前最大的一块「有页面、没索引」的沉没资产；
- 其中 **8 条标题含「实测 / 亲测」**，与 SOP 红线三（不虚构）冲突，补正文前必须先改口径：
  `ai-coding-6-models-review`、`deepseek-v4-vs-glm51-vibe-coding`、`ai-video-models-apr-2026`、
  `kling-3-vector-engine-review`、`kling-ai-hands-on-review`、`llm-benchmark-may-2026`、
  `openclaw-api-model-selection`、`kling-26-sound-review`。

**下批若任务仍不改：只跑「队列确认 + 自检 + 0 报告」，不要再投任何抓取。**
