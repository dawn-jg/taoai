# 第 89 批原创资料（2026-10-21 上午）

## 结论

**本次新增 0 条，跳过 52 条**（待写池已见底，52 条即全部剩余）。

累计可索引 1125 条，剩余待写 52 条 —— 与第 77–88 批完全一致。**这是连续第 19 批 0 产出。**

本批的新增价值只有一项：把此前 12 轮"素材不足"的判定，逐条升级为**可执行的处置证据**（域名已死 / 已易主 / 产品下线 / 名称不合规），其中 12 条是本批首次取到确证。

## 基线（HEAD `d756a0e0`）

| 项目 | 数值 |
|---|---|
| 工具总数 | 1177 |
| 原创池（editorials 5 ∪ profiles 1121） | 1125 |
| 四条件通过数 | 1125 |
| `public/tools.xml` locs | 1125 |
| 待写（pending） | 52 |

自检：四条件通过数 1125 == `tools.xml` 1125 ✅；`apply-tool-profiles.mjs` 试算 1121 条全过、未匹配 0 ✅。

## 本批流程

1. `node scripts/content-queue.mjs --top 60 --json` → 确认 pending 52（`data/content_queue.json` 未被覆盖，输出到 `.tmp_q89.json`）。
2. 代理 curl 20 条名称干净的候选首页（2 路并发、浏览器 UA、`-H "Accept-Encoding: identity"`）：**3 条 200、2 条 404、15 条 000**。
3. 15 条 000 全部串行复探（`--http1.1`、`-m 40`）：仍 000，`curl (28) Connection timed out` —— 代理本身正常（baidu 200），是目标站点侧不可达。
4. 对其中 21 条走 `r.jina.ai` 渲染读取（串行、间隔 3s、不带浏览器 UA）：
   6pen-art 取到正文、tool6840 取到 638 字、ask.xiaoyuzhoufm 取到回落页，其余为 42203 域名无法解析 / 42206 networkidle 超时 / 504。

## 本批首次取到的新证据（12 条）

| slug | 名称 | 实测结果 |
|---|---|---|
| `tool148` | BW188 | `magician.design` 200，标题「The Ice Cream Boutique — 216 Farnsworth Ave」，已是**实体冰淇淋店官网**；DB 名 BW188 亦为脏名 → 下线 |
| `tool58825` | AI人才发现与分析平台 | `dinq.io` 200，标题「KeoNhaCai - Tỷ Lệ Kèo Nhà Cái 5」，**越南博彩站**，域名已易主 → 下线 |
| `phind-com` | Phind | `www.phind.com` 返回 Vercel「DEPLOYMENT_NOT_FOUND」，`phind.com` 根域 404 `NOT_FOUND`（blog/about/pricing 同）→ 产品已下线，非抓取失败 |
| `tool71074` | 长视频精华提炼 | `briefly.video` 404「Project not found · Lovable」，应用已撤除 → 下线 |
| `yanqueai-com` | AI LOGO设计工具 | 404 `nginx/1.16.1`，站点已摘除 → 下线 |
| `tool1957` | AIDesign | `ailogo.qq.com` DNS 解析到 `0.0.0.1`（jina 40305 同证），腾讯侧域名已下线 → 下线 |
| `tool2676` | 175FUN | `175.fun` 无法解析（NXDOMAIN），域名已注销 → 下线 |
| `tool33149` | AI设计工具（抠图/消除/放大） | `ibihun.com` 域名无法解析 → 下线 |
| `tool67371` | AI面试助手\|AI笔试助手 | `aimianshibang.com` 域名无法解析 → 下线（名称另含 `\|`） |
| `tool9412` | 阶跃星辰聊天机器人 | `maopaoya.com` 域名无法解析 → 下线（第三方镜像站，非官网） |
| `tool6840` | 360智绘 | `aigc.360.com` 现标题「360AI办公」，与 DB 名不符，正文 638 字且是另一产品线 → 改数据或下线 |
| `hotshot-co` | Hotshot | `hotshot.co` 200 但已是「AI Tools, Gadgets, Smart Home & How-To Guides」导购博客，非 AI 视频产品 → 下线 |

## 本批复核确认的旧结论（40 条，摘录关键几条）

| slug | 名称 | 结论 |
|---|---|---|
| `6pen-art` | 6pen Art | 官网已是告别页「致谢与新篇章」，主产品迁至 6pen Pro（原站停更）→ 下线 |
| `voxcraft-ai` | VoxCraft | jina 504 Gateway Time-out，代理/直连均不可达 → 下线 |
| `humva-ai` / `writingpal-ai` / `photonaiclub-com` / `miantuan-*` / `tool67775` / `tool7424` / `pagentia-com` | Humva / WritingPal / 光子AI / 面团AI / lab4ai / XPaper AI / AI专利检索 | 代理 curl 28 超时 ∧ jina 42206 networkidle 超时，双通道一致不可达 → 下线 |
| `ask-xiaoyuzhoufm-com` | 小宇宙推出的AI搜索产品 | 渲染回落「小宇宙播客」主站，无 AI 搜索产品页；名称为描述性短语 → 下线 |
| `ai-bot` | AI工具集 | 通用名，正文 13104 字但「含自身名」校验无意义 → 排除 |
| `tool923` / `tool150` | Luma / Galileo | 产品线已变（Luma→AI Agents、Galileo→Stitch），DB 名为描述性短语，且与 `lumalabs-ai` 同域 → 合并后下线 |
| `tool67595` / `tool14679` | 论文降AIGC | 同一落地页两域名，同站重复 → 合并 |
| 其余（`miaohui-*`、`duiyou-ai`、`moyin-com`、`etna-*`、`tool1333`、`tool1890`、`tool14278`、`tool67418`、`tool3006`、`tool216`、`tool111`、`tool14961`、`tool1079`、`tool479`、`tool66554`、`tool67775` 等） | — | 与 b86–b88 判定一致（停运 / 易主 / 博彩劫持 / 空壳 / 脏名），本批复探无一复活 |

## 处置建议（与 b88 相同，本批证据更完整）

1. **下线 43 条**（域名已死、产品停运、已易主为无关站点）：其中 `tool148`（冰淇淋店）、`tool58825`（博彩站）、`tool1333`（博彩页）属**必须立即下线**——把用户导向博彩/无关站点的死链本身就是 AdSense 质量风险。
2. **合并 5 条**：`tool67595`+`tool14679`；`tool923`+`lumalabs-ai`；`tool150`+`tool?(galileo→stitch)`。
3. **修数据 4 条**：`tool6840`（360智绘→360AI办公）、`tool1079`（阿里云登录，脏名）、`tool67371`（含 `\|` 分隔符）、`jianying`（URL 指向即梦，已知错误）。
4. 处理后工具总数将从 1177 降至约 1129，**待写池归零，`tools.xml` 与 `tools.json` 自然自洽**，不再需要内容生产环节。

## ⚠️ 结论（第 19 次）

工具页索引面现实上限 = 1125。按本自动化原任务（"写 15–20 条工具页"）重跑，产能恒为 0：
剩余 52 条不是"还没写"，而是**不具备写的前提**（站点已死 / 产品已停 / 名称为通用名或描述性短语）。

**建议把本自动化目标改为二者之一**（都可一次做完，且真正提升 AdSense 合规）：

- **A. 52 条数据清理**：下线 43 / 合并 5 / 修数据 4（纯数据改动，不需要素材，一次可达标）。
- **B. 教程页原创内容**：`tutorials.xml` 目前 **0 条**可索引（56 篇全部低于 600 字门槛），是站内唯一还有增量空间的索引面。

若仍按原任务重跑，下一批预计输出仍为 0。
