# 第 130 批原创资料生产记录（2026-10-31 晚间）

## 一、结论

**本次新增 0 条，因素材缺失跳过 52 条（全池逐条实抓，无一条具备可写素材）**。连续第 60 批零产出。
待写池 52 条不是「还没写」，而是**写不了**：22 条站点不可达、其余 30 条虽能打开但为
注销/停运/主体变更/名实不符/描述式名称/空壳页。按 SOP 红线「不虚构」，一条都不能动笔，
按 SOP §7.20「宁可少写、也不用空素材凑数」，本批不提交任何正文。

## 二、基线（可复算）

| 指标 | 数值 | 口径 |
|---|---|---|
| 工具条目总数 | 1177 | `data/tools.json` |
| 原创内容池 | 1125 | `editorials` 5 ∪ `tool_profiles.items` 1121，重叠 1 |
| 四条件可索引 | 1125 | 名称干净 + 正文 ≥600 + 含自身名 |
| 池内失败 | 0 / 0 / 0 | 名称 / 体量 / 含自身名 |
| `public/tools.xml` | 1125 | 与四条件完全一致 ✅ |
| 未进池（待写） | 52 | 1177 − 1125 |
| 索引覆盖率 | 95.6% | 1125 / 1177 |

- 复算注记（沿用 b127）：`deepseek` / `chatgpt` / `doubao` / `qwen` 四条正文由 `editorials.json` 提供，
  单独用 `tool_profiles.json` 复算会把它们误判为体量不足（240–310 字），按池内合并口径才正确。
- `node scripts/content-queue.mjs --top 24 --save`：24 条候选，名单自 b92 起 **37 批未变**，零 diff。
- 起始 HEAD `3f3422e5`，工作区干净，HEAD == `origin/main`。

## 三、本批取证：52 条一次性全量代理抓取（首次一整轮覆盖全池）

做法：对 pending 52 条**全部**走 `curl -sL --proxy http://127.0.0.1:7897 --tls-max 1.2
-H "Accept-Encoding: identity"`，4 路并发，记录 HTTP 状态、响应字节数、`<title>`。
代理健康度先以 `example.com` 校准（200 / 577 B），故所有 `000` 均为目标侧问题。

**状态分布**：200 × 23、000（连不上/超时）× 22、403 × 4、404 × 3。

### 3.1 能打开但不可写（200，按字节数降序）

| 条目 | 字节 | 页面 title | 判定 |
|---|---|---|---|
| `tool111` Reply Logo | 864990 | Devin Desktop \| Devin | 名实不符（codeium.com 实为 Devin） |
| `ai-bot` AI工具集 | 747231 | AI工具集官网 \| 1000+ AI工具集合 | 通用名 + 同类导航站 |
| `tool148` BW188 | 554634 | BETWIN188: Link Slot Gacor Hari Ini | **博彩站**，须移出 |
| `hotshot-co` Hotshot | 454598 | Hotshot \| AI Tools, Gadgets, Smart Home & How-To | 域名易主为数码博客 |
| `tool923` Luma | 306576 | Luma \| AI Agents for Creative Work | 产品在营，但 DB 名为描述句（改名后可写） |
| `tool216` Zyro Upscaler | 248176 | Zyro Website Builder Joins Forces With Hostinger | 产品线并入 Hostinger，原工具停运 |
| `seelesai-go-link` | 189129 | Best No-Code AI Game Maker for 2D/3D Games | go.link 短链落地页，名称为描述句 |
| `tool14278` MidReal | 84508 | MidReal - Free AI Story Generator | **首页即停运公告**，导流至后继产品 Macaron |
| `tool14961` Redirecting... | 51207 | DegenCity Casino New Zealand | **博彩站**，须移出 |
| `tool67595` | 43172 | 论文降aigc-论文aigc降重… | 名称 39 字超限（改名后可写） |
| `ask-xiaoyuzhoufm-com` | 28056 | 小宇宙 | 产品在营，名称为描述句（改名后可写） |
| `tool150` AI高保真原型设计 | 24672 | Stitch - Design with AI | 301 至 stitch.withgoogle.com，与 `tool73947` 重复 |
| `tool6840` 360智绘 | 20786 | 360AI办公 | 产品线更名，名实不符 |
| `moyin-com` 魔撰写作 | 9748 | 魔音工坊--短视频/有声书AI配音平台 | 名实不符 |
| `tool67455` 专注学术写作降AI率 | 5834 | 稿易 - AI论文写作指导平台 | 名称为描述句 |
| `humva-ai` Humva | 5600 | Redirecting... | 纯跳转页，正文 28 字 |
| `tool1890` Neeva | 5592 | Redirecting... | 已关停，跳转页正文 28 字 |
| `tool3006` LogoliveryAI | 2490 | LogoliveryAI — Free AI-powered Logo Generator | 首页正文 214 字，为**公司清算公告** |
| `tool67418` GetDraft | 921 | GetDraft | 纯 SPA 空壳 |
| `tool11395` / `tool1338` / `tool1079` / `tool701` | 698 / 633 / 201 / 87 | 空 | 无任何可引用文案 |

### 3.2 打不开（000 × 22、403 × 4、404 × 3）

- **000**：`voxcraft-ai`、`writingpal-ai`、`xanswer-com`、`persona` 类中文 SPA、`6pen-art`、
  `photonaiclub-com`、`photonaiclub-com-2`、`miaohui-jixueai-com`、`duiyou-ai`、`miantuan-knowfuture-com-cn`、
  `etna-7volcanoes-com`、`pagentia-com`、`tool1957`、`tool2676`、`tool33149`、`tool479`(404)、
  `tool67371`、`tool67775`、`tool7424`、`tool9412`、`tool13251`、`tool11840`、`telehire-ai`。
- **403 Cloudflare**：`flow-studio`（flowgpt.com）、`phind-com`、`tool58825`（dinq.io）、`tool1333`。
  其中 `phind-com` 与 `flow-studio` 另做渲染读取（`r.jina.ai`）复验：仍返回
  「Just a moment... / Performing security verification」与「Sorry, you have been blocked」，无正文。
- **404**：`yanqueai-com`、`tool479`（ai-code-reviewer.com）、`tool71074`（briefly.video，`Project not found`）。

## 四、本批定性升级（可直接执行的清理依据）

1. `tool14278` MidReal：由「社区告别公告」更正为**已停止服务**，官方页原文明确 "we've made the difficult
   decision to sunset MidReal"，并引导至后继产品 Macaron → 该条应下线或改指向，不可据停运页写正文。
2. `tool216` Zyro Image Upscaler：官方页标题即「Zyro Website Builder Joins Forces With Hostinger」，
   原 AI 图片放大工具随 Zyro 品牌一并停运 → 下线。
3. `tool3006` Logolivery：首页正文 214 字，为 "Logolivery, Inc. has been officially liquidated" → 下线。
4. `tool148`（magician.design）与 `tool14961`（fryderyk.ai）**均已变成境外博彩站**，属外链风险，
   应最高优先移出库（`tool148` 此前仅记为「名实不符」，本批拿到赌站标题）。
5. `yanqueai-com`、`tool71074` 返回 404，`tool479` 404，`tool701` 87 字节 → 归入「站点已死/空壳」。

## 五、自检与操作

- 四条件：1125 == `public/tools.xml` 1125 ✅；池内失败 0/0/0。
- **未执行** `apply-tool-profiles.mjs --apply` 与 `generate-sitemap.mjs`：无内容可合并，
  跑一次只会给 1121 个 URL 刷一遍 `lastmod`，对搜索引擎是噪声，也与「本次 0 新增」的事实不符。
- `.tmp_b130/`（52 个 HTML + 抓取脚本）、`.tmp_pending_b130.json`、`.tmp_audit_b130.mjs`
  在提交前全部清理，未入仓。

## 六、下批建议（口径同 b129，不再变化）

1. 若任务口径不变：只跑四条件自检 + 0 报告，**不抓取、不探针**——本批已把 52 条压到「一轮全量快照」，
   证据已饱和，再抓只是重复。
2. 唯一能放量的三件事（需人工授权，详见 `docs/pending-content-decisions.md`）：
   - **① 教程页 56 条补正文**（+56，1125 → 1181）：唯一成规模放量面，前置是先改 8 条「实测/亲测」标题口径。
   - **② 4 条改名后可写**（+4）：`tool923→Luma`、`ask-xiaoyuzhoufm-com→小宇宙 AI 搜索`、
     `tool111→Devin`、`tool67595` 待定名；改名须配 301。
   - **③ 52 条清理**：下线约 34（本批新增 `tool14278`、`tool216`、`tool3006`、`yanqueai-com`、`tool71074` 确证）、
     合并 5（含 `tool150 → tool73947`）、移出 2 个博彩外链（`tool148`、`tool14961`）。
3. **60 批零产出**：建议把本自动化降为每周一次巡检；或授权后把任务目标切换为 ①。
   继续按「每批 15–20 条」跑，产出恒为 0，只会持续给仓库写 0 报告 commit。
