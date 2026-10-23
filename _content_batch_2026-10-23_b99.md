# 第 99 批原创资料生产记录（2026-10-23 夜间）

## 一、基线（HEAD `1c87b94e`，工作区干净）

| 指标 | 数值 |
|---|---|
| 工具总数 | 1177 |
| 原创内容池 | 1125（editorials 5 ∪ tool_profiles.items 1121） |
| 四条件通过（可索引） | **1125** |
| `public/tools.xml` 条数 | **1125** |
| 自检 | 1125 == 1125 == 1125 ✅ |
| 池内失败（脏名 / 短正文 / 不含自身名） | 0 / 0 / 0 |
| 待写（不在原创池） | **52** |

`node scripts/content-queue.mjs --top 24 --save` 已执行（`data/content_queue.json` 内容与 HEAD 一致，无 diff）；
`--top 60 --json` 输出 pending=52，名单自第 92 批起 **7 批未变**，与 b96–b98 逐条相同。

## 二、本批产出：0 条（连续第 29 批）

对 52 条做直连 6 并发全量探针（Node `fetch`，18s 超时，同时解析 CNAME）：

| 响应 | 条数 |
|---|---|
| 200 | 21 |
| 连接失败 / 超时（`TypeError`） | 27 |
| 404 | 2（tool71074 `Project not found`、tool479） |
| 403 | 1（phind-com，Cloudflare `Just a moment...`） |
| 500 | 1（tool58825） |

21 条 200 的逐条判定与 b98 报告完全一致（b98「200 条逐条判定」表可直接沿用，本批未出现任何状态翻转），
没有一条同时满足「名称合规 + 主题一致 + 素材足以写 ≥700 字」。

## 三、本批新增确证（三项，均为可执行结论）

1. **`hotshot-co` 域名已彻底改作普通科技博客**。今日落地正文首屏即为
   `Hotshot | AI Tools, Gadgets, Smart Home & How-To Guides`，栏目为 AI Tools / Comparisons / Gadgets / Gears /
   Guides Research / How-To / Smart Home，正文 7439 字符全部是导购与测评文章列表（最新文章日期就是 2026-10-23）。
   原 AI 视频工具 Hotshot 无任何产品信息残留 → **D 桶（主题不符），不可写**。
2. **`tool216`（Zyro AI Image Upscaler）确认为 301 链路**：`zyro.com/tools/image-upscaler` →
   `www.hostinger.com/blog/zyro-joins-forces-with-hostinger/`，落点是并购公告 + 促销横幅（7364 字符几乎全是
   「Biggest deals of the year」循环）。**C 桶（产品并入 Hostinger / 功能下线），不可写**。
3. **`scripts/apply-tool-profiles.mjs` 试算的「含自身名」判定存在误报**：该脚本用 `plain(html).includes(tool.name)`
   直接比对，未走 `normalizeName()`，因此名称内含空格的 2 条 (`tool15865`「链企AI ｜ 链企智能」、
   `tool68309`「8200 +专业AI提示词模板｜灵活{变量}定制，免费试用」) 打印 `含自身名:否`，
   但按 `lib/tools.ts` 的真实门槛（去空白后比对）二者均通过，实际索引面不受影响。
   —— 这正是 SOP 第七节第 2 条记录的老坑在试算脚本里的残留，**仅影响读数，不影响线上判定**，本批未改动该脚本。

## 四、52 条分桶（互斥，沿用 b97/b98 取证结果）

| 桶 | 含义 | 条数 |
|---|---|---|
| A | 域名不可达 / 证书失效 / 空壳（<150 字符） | 29 |
| B | 403 / 404 / 500 | 4 |
| C | 停运、并购、告别页 | 1（tool216） |
| D | 易主 / 主题不符 / 博彩跳转 / 名称与产品不一致 | 8 |
| E | 名称不合规（通用名或描述性名称，含自身名校验失效） | 10 |

## 五、自检与推送

- `apply-tool-profiles.mjs`（试算）跑通：1121 条全部合并，`profiles 未匹配 slug = 0`；字数 min 602 / median 873 /
  avg 897 / max 1760，其中 <700 字 35 条（均 ≥600，达标）。
- **未跑** `--apply` 与 `generate-sitemap.mjs`：本批无新增资料，`data/tools.json` 与 `public/*.xml` 零改动（`git status` 干净），
  跑一次只会产生无意义的重写。
- 提交仅含本报告文件（不用 `git add -A`，避开 build_cron 日志）。

## 六、结论与建议（第 29 次）

**工具页索引面上限 = 1125，按本任务重跑产能恒为 0。** b77–b99 共 23 轮、数百个 URL，命中 0；
52 条已在「域名 → 产品 → 名称」三级完成 100% 取证，且本批第三次复核未发现任何站点复活。

真实增量只剩两条路，都超出「续写工具页」这一任务定义：

1. **52 条死链清理（纯数据，无内容风险）**：下线 A/B/C 桶 34 条 + D 桶易主/博彩 6 条；合并 2 条
   （`tool111`「Reply Logo」落地实为 Devin Desktop → 并入已存在的 `preview-devin-ai`；
   `photonaiclub-com-2` 与 `photonaiclub-com` 同站 → 并入后者）；E 桶 10 条需先改名再谈内容
   （如 `tool923`「AI 3D捕捉、建模和渲染」→ Luma AI，`tool148`「BW188」→ 真实产品名）。
   —— 注意：清理不增加索引页，只消除站内死链与错配，属质量整改。
2. **教程页 56 条补正文（唯一放量面，+56）**：实测 56 条教程正文 145 / 229 / 316（min / avg / max），
   ≥600 字 **0 条**，`public/tutorials.xml` 至今不存在，且 **8 条标题含「实测 / 亲测」**（不符合 SOP 红线三，
   必须先改口径再补正文）。
   建议下一轮任务改为「教程页原创正文补写」，工具页任务转入死链清理。
