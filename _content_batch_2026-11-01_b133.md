# 第 133 批内容生产记录（2026-11-01）

## 一、基线（起始 HEAD `b286d87d`，工作区干净，HEAD==origin/main）

| 指标 | 数值 |
|---|---|
| 工具条目 | 1177 |
| 原创池 | 1127（editorials 5 + profiles 1123，重叠 1） |
| 四条件可索引 | **1127**（池内失败 0/0/0） |
| `public/tools.xml` | **1127** |
| 待写 | 50 |
| 自检 | ✅ 1127 == 1127 |

`node scripts/content-queue.mjs --top 24 --save` 执行成功，`data/content_queue.json` 零 diff（名单自 b92 起 39 批未变）。

## 二、产出：0 条（第 62 批）

本批对全部 50 条待写做了 **四通道实测**（未沿用旧结论）：

| 通道 | 覆盖 | 结果 |
|---|---|---|
| 直连 `fetch` | 47 条 | 17 条返回 200，其中 12 条正文 <200 字（SPA 空壳）；其余 `fetch failed` |
| 代理 `curl --tls-max 1.2`（`example.com` 200/577B 校准） | 24 条 | **22 条 000**，1 条 403，2 条 200（见下） |
| 渲染读取 `r.jina.ai`（不带浏览器 UA、2 路、间隔 3s） | 8 条 | phind 仍 CF「Just a moment」；voxcraft 504；humva 为 ParkLogic 停放页；etna 42203 域名不可解析；photonaiclub 42205 `EAI_AGAIN`；writingpal 导航超时 |
| 站内同根域重复比对 | 全部 50 条 | 命中 12 条（与 b132 一致） |

代理侧三个 200：`tool148` 554 KB / title「BETWIN188」赌站；`tool150` 301 至 Stitch（重复）；`tool14961` DegenCity Casino。

## 三、⚠ 本批决定性发现：待写的「现成正文」100% 是 ai-bot.cn 采集残留

此前批次只知这 50 条**不在原创池**，却无法解释「其中 19–23 条本来就有 600 字以上正文」。
本批对每条正文做了来源指纹比对（正文 HTML 内是否含 `ai-bot.cn` 站内链接）：

| 分类 | 条数 |
|---|---|
| 正文 ≥300 字 | 23 |
| 其中含 `ai-bot.cn` 采集链接 | **23** |
| 非采集（本可视为原创） | **0** |

示例：`yanqueai-com` 正文含 `https://ai-bot.cn/best-ai-logo-makers/`；`voxcraft-ai` 含 `https://ai-bot.cn/sites/9468.html`，
并保留原站 `<img decoding="async">`、`<div class="paragraph">`、`rel="noopener nofollow"` 等结构。

**结论**：这 23 条正是被 AdSense 判定为「低价值内容」的那批采集正文，`detailed_content` 留着但未进原创池。
按红线一（不采集），不能「改写几个词」后入池；按红线三（不虚构），无官网素材时不能重写。因此它们**不是待写，而是待清理**。

这也解释了 62 批 0 产出的机制：**索引门槛（命中原创池）正在正确工作**——剩下的 50 条恰恰是唯一没有原创来源的那批。

## 四、名实不符与死站（本批复验，均维持原判）

| slug | DB 名 | 实测结果 |
|---|---|---|
| `tool14278` | MidReal | 直连 200/84 KB，正文是「A Letter to Our MidReal Community」停运告别信，导流 Macaron（b130 判断正确） |
| `hotshot-co` | Hotshot | title「Hotshot \| AI Tools, Gadgets, Smart Home & How-To Guides」，实为科技博客，非视频模型 |
| `tool216` | Zyro AI Image Upscaler | title「Zyro Website Builder Joins Forces With Hostinger」，产品并入 Hostinger |
| `tool701` | AI生成3D材质 | title「Poly: The Intelligent Cloud File Browser」，整站转为云文件浏览器 |
| `duiyou-ai` | 堆友AI | title「美图设计室」，且同域已有 `designkit-cn`×3 三个已写页 |
| `moyin-com` | 魔撰写作 | title「魔音工坊」，同产品已有 `tool1924`（880 字） |
| `tool6840` | 360智绘 | title「360AI办公」，产品线更名 |
| `tool3006` | LogoliveryAI | 214 字符，仍为清算公告 |
| `tool1333` | 创作王 | title 为 `&#113;&#121;...` 编码的博彩站 |

## 五、自检

- 四条件 1127 == `public/tools.xml` 1127 ✅
- 未跑 `--apply` / `generate-sitemap`（无内容可合并，避免给 1123 个 URL 刷 lastmod）
- `.tmp_b133/`（24 个 HTML + 抓取脚本）提交前已删除
- `git add -A` 仅本文件与 `docs/pending-content-decisions.md`

## 六、下批建议（不变）

工具页索引面上限 = 1127（95.8%），待写 50 条已 100% 定性：**23 条采集残留 + 12 条同产品重复 + 约 34 条死站/停运（有交叉）**。
继续对该批做抓取不再产生任何新信息。可放量的只有两条路，均需授权：
① 教程页 56 条补正文（+56，先统一 8 条「实测/亲测」标题口径）；
② 50 条清理（下线/合并/移出 2 个博彩外链）。
