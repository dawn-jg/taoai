# AdSense「低价值内容」诊断报告

- 站点：taoai365.com（D:\ai-nav-site）
- 审计日期：2026-09-27
- 状态：**已通过投放后被政策警告**

---

## 一、结论

站点被判定为 **大规模生成的重复 / 采集内容**（Google 政策术语：*Scaled content abuse* + *Scraped content*），属于结构性判定，**不是偶发误判**。

推论：单纯在 AdSense 后台申诉或改文案不会通过，必须做结构性整改（减少低质页面 + 提升原创比例）。

---

## 二、实测证据

### 2.1 站点规模

| 项目 | 数量 |
|---|---|
| 工具详情页（/tools/*） | 1215 |
| 教程页（/tutorials/*） | 56 |
| 快讯（/news） | 12 条 |
| 分类页（/categories/*） | 15 |
| 静态页 | 8 |
| 构建后静态页总量 | 约 2465 |

### 2.2 内容质量分布（核心问题）

| 指标 | 实测 | 占比 | 风险 |
|---|---|---|---|
| 正文**完全未提到自身工具名**（疑似错配） | **637 / 1215** | **52.4%** | 极高 |
| 多个页面共用同一份正文 | 15 组指纹 → **101 页** | 8.3% | 高 |
| 正文纯文本 < 400 字（稀薄内容） | 163 | 13.4% | 高 |
| 存在无标题内容块（结构残缺） | 305 | 25.1% | 中 |
| 节标题未提及自身工具名 | 628 | 51.7% | 高 |
| 有编辑部原创评测 | **5** | **0.4%** | 极高 |
| 有页面截图 | 1 | 0.08% | 中 |

### 2.3 极端案例（内容错配实证）

| slug | 页面标题 | 实际显示的正文主题 |
|---|---|---|
| `perplexity` | Perplexity | **豆包**（"豆包是字节跳动公司推出的…"） |
| `chatglm` | 智谱清言 | **豆包** |
| `gamma-app` | Gamma | **豆包** |
| `kimi` / `canva-ai` / `pika` / `leonardo` / `tongyi-xiangma` / `wps-ai` … | 各自 | **豆包**（共 55 页）/ **Coze**（共 19 页） |

> 55 个页面的节标题完全相同：`豆包是什么 | 豆包的产品功能 | 如何使用豆包 | 豆包的客户端 | 常见问题`

**成因**：早期导入脚本 `_batch_content_v2.py` 通过「工具名搜索 ai-bot.cn」匹配页面，匹配失败时回退到错误结果且未做校验，导致内容被写到了错误的 slug 上。

### 2.4 内容来源合规性

`_extract_content.py` 文件头原文：

```
Extract detailed content from ai-bot.cn tool pages.
```

正文系**逐字抓取自第三方站点 ai-bot.cn**，未做改写或原创增量。
对应 AdSense 政策：**Scraped content** ——「从其他站点复制内容且未增加原创价值」。

### 2.5 全站重复文本

`app/tools/[slug]/page.tsx` 中 `toolFaqs` 为模块级常量，**3 条完全相同的问答被渲染到全部 1215 个工具页**：

```
这是免费的 AI 工具吗? / 适合哪些人使用? / 与其他同类 AI 工具相比如何?
```

这是最容易被算法直接识别为「模板批量生成」的信号。

### 2.6 其他一致性问题

| 问题 | 详情 |
|---|---|
| 元描述不实宣称 | 全站 description 称「每款工具附编辑部真实评测和优缺点分析」，实际仅 5 款有评测（0.4%）→ 有 *Misrepresentative content* 风险 |
| sitemap 与实库不一致 | `public/tools.xml` 收录 1197 条：**24 个真实页面未收录**，**6 条指向已不存在的页面**（tool56、tool13186、tool13064、tool72731、tool54501、tool906） |
| sitemap 含 404 | `public/news.xml` 的 12 条 `/news/<slug>` 链接**全部不存在**（站点只有 `/news` 列表页，没有详情路由）→ 直接产生「已提交网址未找到」 |
| 广告加载范围 | AdSense 脚本经 `app/layout.tsx` 全站加载（`ca-pub-7487483818971469`），低质页同样承载广告 → 放大风险 |

### 2.7 严重缺陷：全站 canonical 指向首页

`app/layout.tsx` 在 `<head>` 中硬编码了：

```html
<link rel="canonical" href="https://taoai365.com" />
```

并且根 metadata 的 `alternates.canonical` 也设为 `'/'`，而各动态路由均未覆盖。

实测构建产物（`out/tools/perplexity.html`）：

```
<link rel="canonical" href="https://taoai365.com"/>
<link rel="canonical" href="https://taoai365.com"/>
```

**全部 1215 个工具页都声明「本页的正规地址是首页」**（且各渲染出两条重复 canonical）。

后果：
1. Google 会把这些页面全部视为首页的副本并去重 —— **1215 个工具页实际上等于没有被索引**；
2. 于是站点在 Google 眼中退化为「一个首页 + 15 个分类列表 + 少量文章」，而首页/分类页本质是**链接列表**；
3. 这正是 AdSense 判定「低价值内容 / 缺乏原创实质内容」的典型形态。

> 这一条与 2.2 的内容错配互为因果：错配内容因 canonical 被隐藏，canonical 又让站点看起来只有一个链接列表页。

---

## 三、整改方案

### 阶段一 · P0（立即，不需要生产新内容）

| # | 动作 | 影响面 |
|---|---|---|
| 1 | **清除 637 个错配正文**，对应页面转为 `noindex, follow`（或补正确内容后再放开） | 637 页 |
| 2 | **删除复制到 1215 页的重复 FAQ**，改为按工具生成或仅在有原创评测时渲染 | 1215 页 |
| 3 | **稀薄页 noindex**：正文 < 400 字的 163 页 + 残缺页 305 页 | ≤468 页 |
| 4 | **修正元描述**中「每款工具附编辑部真实评测」的不实宣称 | 全站 |
| 5 | **修复 sitemap**：补 24 条、删 6 条陈旧项，保持与实际页面一致 | — |
| 6 | 完成后在 AdSense 后台提交**重新审核** | — |

### 阶段二 · P1（2–4 周）

| # | 动作 |
|---|---|
| 7 | **收缩索引面**：工具页仅在「有原创评测」或「有实质结构化内容」时 index，其余 `noindex, follow` |
| 8 | **为 TOP 100 工具补真实评测**：真实使用体验、优缺点、价格实测、替代方案对比（每篇 800 字以上原创） |
| 9 | **主入口转向**榜单 / 对比 / 教程类内容（如「2026 最佳 AI 写作工具」「A vs B 对比」），工具页退为支撑层 |
| 10 | 每篇内容配真实截图 + 作者署名 + 更新时间 + 评测标准链接 |

### 阶段三 · P2（长期）

| # | 动作 |
|---|---|
| 11 | **停止从第三方采集内容**，建立原创内容生产 SOP |
| 12 | 建设 E-E-A-T：作者介绍页、编辑流程、信息来源与引用规范 |

---

## 四、已执行的整改（2026-09-27）

执行路线：**A · 修缺陷 + 收缩索引**。

| # | 动作 | 落点 | 结果 |
|---|---|---|---|
| 1 | 清除错配与重复正文 | `scripts/fix-adsense-content.mjs` → `data/tools.json` | 676 页清空正文；剩余 539 页**零错配、零重复** |
| 2 | 正文清洗规则 | 同源脚本 | 重复组内若无归属者则整组剥离；归属方优先语义 slug |
| 3 | 全站撤回模板化填充正文 | `app/tools/[slug]/page.tsx` | 删除「什么是／主要功能／技术优势／如何使用／价格信息」伪内容块，改为诚实的简版条目 |
| 4 | 消除跨页重复 FAQ | `app/tools/[slug]/page.tsx` | 3 条全站相同问答 → 按工具自身定价/标签/同类工具生成**唯一问答**，且仅在可索引页输出 |
| 5 | 低质页 noindex | `app/tools/[slug]/page.tsx` + `lib/tools.ts` | 764 个工具页输出 `noindex, follow` |
| 6 | **修复 canonical** | `app/layout.tsx` + 工具页 metadata | 移除硬编码首页 canonical；根级改 `'./'`，工具页显式自引用 |
| 7 | 修正不实元描述 | `app/layout.tsx` | 删除「每款工具附编辑部真实评测」 |
| 8 | 重建 sitemap | `scripts/generate-sitemap.mjs` | 仅收录 451 个可索引工具页；移除全部 404 的 news 条目；修复 24 缺失/6 陈旧 |
| 9 | sitemap 与内容自动同步 | `package.json` | `build` 前置执行 sitemap 生成，避免再次漂移 |

### 判定规则（`lib/tools.ts` → `isToolIndexable`）

工具页**允许索引**需满足其一：

1. 有编辑部原创评测（当前 5 篇：deepseek / chatgpt / doubao / kimi / qwen）；或
2. 同时满足：名称干净（非抓取残留长标题） **且** 正文纯文本 ≥ 600 字 **且** 正文出现自身工具名。

> 该规则同时被 `scripts/generate-sitemap.mjs` 复用（JS 镜像实现），两处**必须同步修改**。

---

## 五、后续待办

> 本节为第一轮结束时的待办清单。**P1 / P2 的执行结果见第七、九节**，最新状态与残余风险见第八节。

### P1（2–4 周）
1. **给 764 个 noindex 条目补内容**：优先 featured（`muse-meta` 484 字、`lightx2v-studio` 0 字）与 TOP 100 工具，补真实评测后再逐个放开索引。
2. **压缩 `toolNNNN` 形式的 URL**：1145/1215 个 slug 是无语义的 `tool12345`，建议为高频工具迁移到语义 slug（保留 301）。
3. 主入口转向榜单/对比/教程类内容，工具页退为支撑层。
4. 每篇内容配真实截图（当前仅 1 个工具有截图）+ 作者署名 + 更新时间。

### P2（长期）
5. 停止从第三方采集内容，建立原创内容生产 SOP。
6. 建设 E-E-A-T：作者介绍页、编辑流程、来源引用规范。
7. 若需要 Google News 收录，先补齐真正的 `/news/[slug]` 资讯详情页，再恢复 news sitemap。

### 数据质量问题（本次发现，未处理）
- `doubao` 的 `url` 指向 `chat.sensetime.com`（商汤），名称与链接不符。
- `coze` 的 `url` 指向 `shengsuanyun.com`，同样不符。
- `tool23106` 的 `name` 是抓取残留的长标题串（`AiShort - AI提示词库 | …`）。
- 67 个工具未出现在 sitemap 的旧数据缺口已随本次重建消除，但**全库 slug/url 一致性尚未系统校验**。

---

## 六、验证方式

```bash
# 1. 内容层：错配与重复应为 0
node scripts/fix-adsense-content.mjs           # 试算模式，应显示剥离 0 页

# 2. 构建 + sitemap
CODEBUDDY_SAFE_DELETE_ENABLED=0 npm run build

# 3. 抽查 noindex 与 canonical
grep -c 'noindex' out/tools/<低质-slug>.html
grep -o '<link rel="canonical"[^>]*>' out/tools/perplexity.html

# 4. sitemap 条数应等于可索引页数
grep -c '<loc>' public/tools.xml
```

---

## 七、P0 / P1 / P2 执行记录（第二轮，2026-09-27）

### P0（收尾）

| # | 项 | 状态 |
|---|---|---|
| 1–5 | 清除错配正文 / 删重复 FAQ / 稀薄页 noindex / 修元描述 / 修 sitemap | ✅ 第一轮完成，本轮复核通过 |
| 6 | 在 AdSense 后台提交「重新审核」 | ⏳ **需人工操作**，整改不会自动触发复审 |

### P1（已执行）

| 项 | 落点 | 结果 |
|---|---|---|
| **数据质量修复** | `scripts/fix-data-quality.mjs` | `doubao.url`→doubao.com、`coze.url`→coze.cn；**36 条抓取残留脏名称**清理（37→0）；13 条带查询串的 `domain` 归一化；全库补 `updatedAt` |
| **语义 slug 迁移 + 301** | `scripts/migrate-slugs.mjs`、`data/slug_redirects.json`、`public/_redirects` | **515 个** `toolNNNN` → 语义 slug（两批 406 + 109），logo 文件同步重命名，生成 1030 行 301；剩余 630 个 `toolNNNN` 均为不可索引条目，无需迁移 |
| **内容补强首批** | `data/tool_profiles.json` + `scripts/apply-tool-profiles.mjs` | `muse-meta`（Muse，Meta 个人 AI 智能体，931 字）、`lightx2v-studio`（LightX2V Studio，810 字）——两个 featured 从 noindex 恢复为可索引 |
| **署名 / 更新时间 / 来源** | 工具页、教程页、快讯页 | 均输出「TaoAI 编辑部 · 收录时间 · 最后更新时间 · 信息来源」；`ToolSchema` 补 `dateModified`，`Review`/`Article` 作者改为 Organization |
| **索引面** | `lib/tools.ts` | 可索引工具页 **451 → 564** |

### P2（已执行）

| 项 | 落点 | 结果 |
|---|---|---|
| **E-E-A-T 页面** | `app/authors/`、`app/sources/` | 新增「编辑团队」（署名方式/领域分工/工作流程）与「来源与引用规范」（三类来源、四条红线、AI 使用披露、整改说明）；`/about`、`/editorial-policy` 补链接并新增「内容规模门槛」章节；Footer 补全 15 个分类与治理入口 |
| **快讯详情页 + sitemap** | `app/news/[slug]/`、`data/news_details.json` | 14 条详情页，每条含编辑部原创解读（「为什么值得关注」「对选型的提示」）+ 相关工具 + 原始来源；恢复 `public/news.xml`（**普通 urlset，不用 `news:` 命名空间**，那属于 Google News 出版方） |
| **原创内容 SOP** | `docs/original-content-sop.md` | 三条红线、四套索引门槛、生产流程、上线检查清单、踩坑记录 |

### 本轮新发现并修复的缺陷

| 缺陷 | 影响 | 处理 |
|---|---|---|
| **名称比对未去空白** | `plainText` 已删空白，用含空格的 `name`（`Kimi AI`、`Stable Diffusion`）比对永远失败 → **111 条正确正文被误删**，1 条被误判 noindex | 4 处实现统一改用 `normalizeName()`；`scripts/recover-stripped-content.mjs` 从 `88e1f455` 恢复 111 条并重新去重复校 |
| **教程页全是稀薄页却整批进 sitemap** | 56 篇正文均值 232 字（摘要 + 外链形态），是「低价值内容」的直接来源 | 新增 `isTutorialIndexable()`（≥600 字）→ **56 篇全部 noindex**，`tutorials.xml` 因无可收录页被移除 |
| **`domain` 带 `?utm_source=` 查询串** | `ToolLogo` 用它拼 `https://<domain>/favicon.ico`，会拼出非法地址 | 归一化 13 条 |
| **Footer 只列 12/15 个分类** | 3 个分类页缺少全站入口 | 改为 3 列覆盖全部 15 个 |
| **链接指向 `/tools`** | 该路由不存在（只有 `/tools/[slug]`）→ 404 | 改为 `/search` |
| 教程页缺 canonical / JSON-LD | 与工具页不一致 | 补 `alternates.canonical`、`BreadcrumbSchema`、`ArticleSchema` |

### 构建产物验证

```
工具页         noindex 647 / 1210，其余 563 与 tools.xml 条数一致
canonical      首页 1 条（https://taoai365.com）；工具页各 1 条且为自身地址
tools.xml      563 条，死链 0
news.xml       14 条，死链 0；详情页 noindex 0
tutorials.xml  已移除（0 条可收录）
tutorials      56 篇全部 noindex
static-pages   10 条（含 /authors、/sources）
_redirects     1045 行（520 条旧 slug × 2）
```

---

## 八、当前最大的残余风险（需人工决策）

**647 个保留正文的工具页，正文仍源自 ai-bot.cn 的逐字采集。**
本轮做的是「移除错配与重复」，并没有改变这些正文的**来源属性**——它们对 AdSense 而言仍属 *scraped content*。两条可选路线：

1. **保守**：先把这 651 页也置为 `noindex`，只保留 5 篇原创评测 + 2 篇原创资料 + 分类页 + 快讯 + 治理页参与索引，然后按 SOP 分批重写、写一批放一批。
2. **渐进**：保持现状（564 页可索引），按 `docs/original-content-sop.md` 优先重写 TOP 工具与有流量的页面，边写边替换。

> 建议先提交复审观察结果，再决定是否继续收缩；若复审仍被拒，直接切到路线 1。

---

## 九、全库 slug/url 一致性校验：重复条目合并（2026-09-27）

工具库中存在**同一产品被重复收录**的情况（同一官网 URL 出现多条记录）。这不只是数据脏，它直接制造重复页面——正是「低价值内容」的判定信号之一。新增 `scripts/dedupe-tools.mjs` 做系统校验。

### 已自动合并（判据：归一化 URL 与去空白名称都相同）

| 被合并 | 保留 | 名称 |
|---|---|---|
| `tool1737` | `wps-ai` | WPS AI |
| `pika` | `pika-art` | Pika |
| `claude-ai` | `claude` | Claude |
| `tool6492` | `removal-ai` | 抠抠图 |
| `tool60584` | `qoder-com` | QoderWork |

保留规则：有编辑部评测 > 可索引 > 语义 slug > 正文更长 > 评分更高。被合并的 slug 写入 `data/slug_redirects.json`，生成 301 指向保留方；logo 文件删除；`categories.json` 的 `count` 按实际重算。
**工具总数 1215 → 1210。**

### 仍需人工复核（未自动处理）

| 类型 | 组数 | 说明 | 例子 |
|---|---|---|---|
| 同名但 URL 不同 | 7 | 可能是 URL 填错，也可能是两个不同产品 | `stability-ai`(stability.ai) vs `stable-diffusion`(insmind.com)；`lemonaide-ai` vs `tool80`(soundraw.io) |
| 同 URL 但名称不同 | 56 | 同一产品被录了两遍，名称写法不同 | `jimeng` / `jianying`（都指向 jimeng.jianying.com，但剪映另有官网）；`perplexity` / `perplexity-ai`；`claude` / `claude-ai-2`；`chatglm` / `tool2005`；`trae` / `tool7582` |

复核方法：

```bash
node scripts/dedupe-tools.mjs     # 试算模式会打印这两份清单
```

> 这两个清单不建议自动合并：`jimeng` / `jianying` 这类是「第二个条目 URL 填错」而不是「重复收录」，直接合并会把本应保留的产品删掉。需要逐条核对官网后再决定是合并还是改 URL。

