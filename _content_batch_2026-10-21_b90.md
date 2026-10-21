# 第九十批原创资料实测（2026-10-21 下午）

> 任务：按《原创内容 SOP》为工具页批量续写原创资料，目标 15–20 条。
> 结论：**新增 0 条，素材缺失/数据失效跳过 52 条**（连续第 20 批 0 产出）。工具页索引面已达现实上限 1125。

---

## 一、基线（HEAD `42caa213`）

| 指标 | 数值 |
|---|---|
| 工具总数 | 1177 |
| 原创池（editorials 5 ∪ profiles 1121） | 1125 |
| 四条件通过 == `public/tools.xml` 条数 | **1125 == 1125 == 1125 ✅** |
| 待写（池外） | **52** |
| 池内不合格（短正文/缺名/脏名/孤儿） | 0 |
| 教程页 | 56 条，正文最长 316 字，可索引 **0** |

独立复算脚本复现 `isToolIndexable` 四条件，池内 1125 条全部通过、0 条落入 `name/short/noname` 失败分支，与 `tools.xml` 的 1125 个 `<loc>` 完全一致，无双份实现漂移。

---

## 二、本批流程（约 3 分钟，未做四轮深挖）

`content-queue.mjs --top 60 --json` → 52 条候选 → 直连 `fetch` 6 并发 / 12s 超时，统计 HTTP 状态、正文去标签去空白字数、`<title>`、最终跳转 URL。

未再跑「代理 curl + `r.jina.ai` + 官方子页」三轮：b85–b89 已对同一批 52 条穷举过五轮、数百个 URL，命中 0；本批先用一次直连复探筛掉已恢复的域名，结果**无一条由死转活**。

---

## 三、52 条分桶（今日实测）

| # | slug | DB 名称 | 实测 | 桶 | 处置 |
|---|---|---|---|---|---|
| 1 | tool14961 | `Redirecting...` | 200 / 19315 字 / DegenCity Casino(NZ 博彩) | D | 下线（域名过期被抢注 + 脏名） |
| 2 | ai-bot | `AI工具集` | 200 / 13235 字 | E | 不下线，但通用名使「含自身名」校验失效，禁止据此写 |
| 3 | tool111 | `Reply Logo` | 200 / 10268 字 → `devin.ai/desktop` | D | 与 `preview-devin-ai` 同品牌，合并/下线 |
| 4 | tool216 | `Zyro AI Image Upscaler` | 200 / 7263 字 → Hostinger 博客并站公告 | C | 下线 |
| 5 | hotshot-co | `Hotshot` | 200 / 4890 字 / 导购博客 | D | 下线 |
| 6 | tool1333 | `创作王` | 200 / 1727 字 / `qy球友会` 博彩 | D | 下线 |
| 7 | tool67595 | 论文降aigc-…（36 字） | 200 / 1675 字 | E | 名称超 30 字；且与 `tool14679` 同落地页 → 合并 |
| 8 | tool14278 | `MidReal` | 200 / 944 字 / 官方告别信（转 Macaron） | C | 下线 |
| 9 | duiyou-ai | `堆友AI` | 200 / 255 字 → 美图设计室 Designkit | D | 下线 |
| 10 | tool1079 | `阿里云登录` | 200 / 177 字 / `m6.aliyun.com` 登录壳 | F | 下线（名称为登录页残留） |
| 11 | tool3006 | `LogoliveryAI — Free AI` | 200 / 131 字 | C | 下线（公司已清算） |
| 12 | tool67455 | 专注学术写作降AI率的工具 | 200 / 115 字 | E | 名称为描述性短语，先改名或下线 |
| 13 | tool6840 | `360智绘` | 200 / 87 字 → 360AI办公会员页 | C | 下线 |
| 14 | tool58825 | AI人才发现与分析平台… | 500 / 73 字 → `clepto.io` | D | 下线（已易主） |
| 15 | tool71074 | 长视频精华提炼… | 404 / `Project not found` | C | 下线 |
| 16 | phind-com | `Phind` | 403 / CF 挑战 | B | 复探确认下线后下线 |
| 17 | ask-xiaoyuzhoufm-com | 小宇宙推出的AI搜索产品 | 200 / 20 字 | F | 下线（SPA 壳 + 描述性名） |
| 18 | voxcraft-ai | `VoxCraft` | ERR | A | 下线 |
| 19 | telehire-ai | 最轻量级的全领域AI面试官 | ERR | A | 下线 |
| 20 | 6pen-art | `6pen Art` | ERR（已迁 6pen Pro） | C | 下线 |
| 21 | miaohui-jixueai-com | `秒绘AI` | ERR（域名转企业官网） | D | 下线 |
| 22 | yanqueai-com | AI LOGO设计工具 | 200 / 0 字 → `logoyq.com` | D | 下线 |
| 23 | pagentia-com | AI专利查新检索与撰写平台 | ERR | A | 下线 |
| 24 | miantuan-knowfuture-com-cn | `面团AI` | ERR | A | 下线 |
| 25 | seelesai-go-link | 全球首个端到端AI 3D游戏生成工具 | 200 / 0 字 → `seeles.ai/workspace` | E | 改名后方可写，否则下线 |
| 26 | xanswer-com | 支持生成思维导图的免费AI搜索工具 | ERR | A | 下线 |
| 27 | moyin-com | `魔撰写作` | 200 / 0 字 → 魔音工坊（AI 配音） | D | 下线 |
| 28 | etna-7volcanoes-com | `Etna` | ERR（NXDOMAIN） | A | 下线 |
| 29 | flow-studio | `Flow Studio` | ERR（此前 jina 回落通用 explore 页） | C | 下线 |
| 30 | tool2676 | `175FUN` | ERR（NXDOMAIN） | A | 下线 |
| 31 | photonaiclub-com | `光子AI` | ERR | A | 下线 |
| 32 | tool1957 | `AIDesign` | ERR（DNS→0.0.0.1） | A | 下线 |
| 33 | humva-ai | `Humva` | ERR | A | 下线 |
| 34 | writingpal-ai | `WritingPal` | ERR | A | 下线 |
| 35 | tool1890 | `Neeva` | ERR（并入 Snowflake） | C | 下线 |
| 36 | tool9412 | 阶跃星辰推出的AI聊天机器人… | ERR（NXDOMAIN） | A | 下线 |
| 37 | tool479 | `AI代码检查` | 404 | A | 下线 |
| 38 | tool1338 | 全能AI助手，基于Qwen模型 | 200 / 0 字 | E | 改名或下线 |
| 39 | tool11840 | 结构化AI知识搜索引擎 | ERR | A | 下线 |
| 40 | tool67775 | 在线大模型训练微调及AI科研学习平台 | ERR | A | 下线 |
| 41 | photonaiclub-com-2 | `光子AI抠图` | ERR | A | 下线（与 31 同站） |
| 42 | tool66554 | `造次` | 200 / 0 字节 | A | 下线 |
| 43 | tool11395 | 一站式用GPT-5.5、Claude-4.7 | 200 / 0 字 | E | 下线 |
| 44 | tool701 | AI生成3D材质 | 200 / 0 字 → `poly.app`（已转型文件浏览器） | E | 下线 |
| 45 | tool67371 | AI面试助手\|AI笔试助手 | ERR | A | 下线 |
| 46 | tool33149 | AI设计工具，支持AI抠图… | ERR | A | 下线 |
| 47 | tool67418 | `GetDraft` | 200 / 0 字（已停止运营，仅留导出至 2026-12-31） | C | 下线 |
| 48 | tool13251 | 字节跳动旗下推出的AI虚拟交友聊天平台 | ERR | E | 下线 |
| 49 | tool923 | AI 3D捕捉、建模和渲染 | ERR（与 `lumalabs-ai` 同域） | E | 合并 |
| 50 | tool150 | AI高保真原型设计 | ERR（已变 Stitch） | E | 下线 |
| 51 | tool148 | `BW188` | ERR（`magician.design` = 冰淇淋店） | D | 下线 |
| 52 | tool7424 | `XPaper AI` | ERR | A | 下线 |

**分桶合计**：A 不可达/空壳 20、B 403/CF 1、C 停运并站 9、D 易主主题不符 10、E 名称不合规 10、F 活站素材不足 2 = **52**。
**处置建议**：下线 42、合并 4（tool111、tool67595、tool923、photonaiclub-com-2 与同品牌合并）、先改名再议 4（tool67455、seelesai-go-link、tool1338、ai-bot 保留不写）。

---

## 四、本批新证据（相对 b86–b89）

1. **`tool111`（codeium.com）已 302 → `devin.ai/desktop`，页面标题「Devin Desktop | Devin」，正文 10268 字可直读** —— 是 52 条里唯一「素材充足且站点在线」的条目，但 DB 名是抓取残留的 `Reply Logo`（logo alt 文案），且库内已有 `preview-devin-ai`（Devin 品牌，已写）。**正确动作是合并/下线，不是改名后写**，否则站内会出现两条同品牌页。这条推翻了 b70 以来「tool111 素材不足」的旧记录。
2. **`ai-bot` 直连可取 13235 字**（此前多次记为 SPA 抓不到）。素材其实够写 700 字以上，**卡点是名称为通用名「AI工具集」**：正文若写「AI工具集支持…」，含自身名校验形同虚设，且页面主题是导航站而非工具，按 SOP 第 10 条人工排除。**素材充足 ≠ 可写**，这类条目只有改名才谈得上写。
3. **`tool14961` 名称本身是 `Redirecting...`**，指向的 `fryderyk.ai` 现为新西兰博彩站 DegenCity —— 域名过期后被抢注，属既脏名又易主，双重下线依据。
4. **`tool1333`（创作王）直连返回 `/qy球友会` 博彩页**，与 b88 记录一致（此前代理侧 403 空 body，本批直连取到实体），确认垃圾域名。

---

## 五、自检

- 四条件复算 **1125 == 1125 == `tools.xml` 1125** ✅；池内失败 0。
- `apply-tool-profiles.mjs` 未跑（本批无新条目可合并）；`generate-sitemap.mjs` 未跑（避免无意义刷 `lastmod`）。
- `data/tools.json`、`data/tool_profiles.json`、`public/*.xml` 本批**零改动**。

---

## 六、结论与建议（第 20 次）

**工具页原创资料的产能已经归零，不是抓取手法问题，是候选池本身只剩失效条目。**
52 条已 100% 取证到「域名/产品/名称」级别：20 条域名不可达或只剩空壳、9 条产品停运并站、10 条已易主或内容与主题完全不符、10 条名称本身不合规（通用名/描述性短语/抓取残留）、1 条 403、2 条活站素材不足。没有「素材可能没抓全」的余地。

**继续按原任务重跑，产出恒为 0。** 建议把该自动化改到下面两个目标之一：

1. **52 条数据清理**（不需素材、一次可完成）：按第三节表格执行下线 42 / 合并 4 / 改名 4。收益是 `tools.xml` 与页面数彻底自洽、站内不再有指向博彩站与死链的入口——这本身对 AdSense 审核是正向信号（低质量出站链接与死链会拉低整站评价）。
2. **教程页原创正文**（唯一还有增量空间的索引面）：`data/tutorials.json` 共 56 条，正文纯文本**最长 316 字、平均 193 字，可索引 0 条**。按工具页同一套门槛（≥600 字）补齐，理论上可把索引面从 1125 提到 **1181**。教程主题与工具不重复，素材可取自各工具官方文档，不存在与工具页争抢同一批失效域名的问题。

> 在此之前，若本自动化仍按「工具页续写 15–20 条」重跑，建议直接跳过抓取阶段输出 0——b77–b90 已连续 14 轮穷举，边际收益为零。
