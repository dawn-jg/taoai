# 第 149 批内容生产记录（2026-11-05 下午）

## 一、基线（起始 HEAD `063aea23`，工作区干净，HEAD==origin/main）

| 指标 | 值 |
|---|---|
| 工具总数 | 1177 |
| 原创池（profiles 1127 ∪ editorials 5） | 1127 |
| 四条件通过数 | 1127（名称 0 失败 / 字数 0 失败 / 含自身名 0 失败） |
| `public/tools.xml` | 1127 |
| 待写（未进池） | 50 |
| 教程页 | 56 条，此前 ≥600 字 **0 条**，`tutorials.xml` 未生成 |

`node scripts/content-queue.mjs --top 24 --save` 与前 52 批逐条一致，`git status` 零 diff。

## 二、工具页待写池：第 78 轮，仍为 0 条

对队列前 24 条走直连（15s / identity / 浏览器 UA）快照，结果与 b148 一致：
`ai-bot` 200（通用名，SOP 第 10 条排除）、`yanqueai-com` 301→`www.logoyq.com`（0 字）、
`duiyou-ai` 301→`designkit.cn`（美图设计室）、`seelesai-go-link` 301→`seeles.ai/workspace`、
`ask-xiaoyuzhoufm-com` 200（描述性名称）、`moyin-com` 301→`www.moyin.com`（魔音工坊）、
`hotshot-co` 200（域名已易主为数码评测站）、`tool6840` 301→`bangong.360.cn`、`tool1333` 200（博彩站「球友会」）、
`phind-com` 403 CF 挑战页，其余 14 条 fetch failed / aborted。

**本批新增结论：把「改名后可写」这条假设逐条证伪。** b141/b143 留下的 6 个改名候选，
在库内全部已有对应的同名/同产品条目，改名只会制造跨页重复：

| 待写条目 | 站点实际产品 | 库内已存在 | 结论 |
|---|---|---|---|
| `seelesai-go-link`（全球首个端到端AI 3D游戏生成工具） | Seele（`seeles.ai`） | `tool14989` SeeleAgent @`www.seeles.ai` | 重复 → 合并/移除，不写 |
| `tool6840`（360智绘） | 360AI办公（`bangong.360.cn`） | `bangong-360-cn` @`bangong.360.cn` | 重复 → 合并/移除 |
| `duiyou-ai`（堆友AI） | 美图设计室（`designkit.cn`） | `xmyeditor-com` 美图设计室 @`design.meitu.com` | 重复 → 合并/移除 |
| `tool67455`（专注学术写作降AI率的工具） | 稿易（`gaoyiai.com`） | `tool36409` 稿易AI论文 @`gaoyiai.com` | 重复 → 合并/移除 |
| `tool67595`（论文降aigc-…） | 66AI论文（`66paper.cn`） | `tool14679` 66AI论文 | 重复 → 合并/移除 |
| `moyin-com`（魔撰写作） | 魔音工坊（`www.moyin.com`） | `tool1924` 魔音工坊 @`www.moyin.com` | 重复 → 合并/移除 |

至此，工具页增量的三条假设（原站取材、渲染读取、改名解锁）全部关闭：
**50 条待写里没有任何一条能写出合规原创资料**，只能清理，不能补写。

## 三、新增体检：索引面主题一致性（1127 页全量）

四条件拦不住「拿别家正文顶替」（b146 的 chatgpt/qwen 即此例），因此本批补了一个可复算的启发式：
对每条 profiles 页面，统计**自身名出现次数**与**其他库内工具名出现次数的最大值**，
标出「他名 ≥ max(3, 自身名×2) 且自身名 ≤3」的页面。

结果：**可疑 3 条，逐条读后均为描述性名称条目，正文主题其实正确**：

| slug | 名称 | 自身名 | 高频他名 | 判读 |
|---|---|---|---|---|
| `tool62159` | 美团推出的大模型API服务平台 | 2 | LongCat 5 | 正文讲的就是 LongCat，属名称问题，非错配 |
| `tool12491` | 谷歌推出的AI云端开发和代码编辑器 | 1 | Gemini 3 | 同品牌关联词，主题一致 |
| `tool21562` | 谷歌推出的AI笔记应用，5分钟生成一段对话播客 | 1 | Gemini 3 | 同上 |

结论：b146 那类「整段正文属于别的产品」的错配，在 1127 页里已清零；这 3 条归入
第十九节「198 条句子式名称」的改名清单，不需要重写正文。

## 四、本批产出：3 条教程页补原创正文（`tutorials.xml` 0 → 3）

工具页已无增量，教程页是站内唯一还存在「摘要 + 第三方外链」形态的内容面。本批按 SOP 四节标准，
只挑**官方文档可直接取证**的 3 条改写，不动标题、不动 slug、不动 `date`：

| slug | 正文字数 | 来源（`url` 已从第三方改为官方） |
|---|---|---|
| `openclaw-local-setup-5min` | 1433 | `https://docs.openclaw.ai/install` |
| `openclaw-feishu-config` | 1175 | `https://docs.openclaw.ai/channels/feishu/setup` |
| `microsoft-365-copilot-create` | 894 | `https://learn.microsoft.com/zh-cn/copilot/microsoft-365/microsoft-365-copilot-overview` |

写法要点：
- 全部事实来自上述官方页（Node 版本要求 24.16.0+/26.1.0+、安装脚本与 `--no-onboard`、
  `openclaw channels login --channel feishu`、2026.5.29 版本门槛、WebSocket 默认 / webhook 18789 与
  `/feishu/events`、webhook 时间戳 ±1 小时重放防护、`oc_`/`ou_` ID 前缀；Word/PowerPoint/Excel/OneNote
  能力边界与两档授权差异），**无一句「实测」「亲测」，无具体价格**。
- 原文 `url` 全部是 CSDN / cnblogs / 111cn / QQ 新闻等第三方页，本批改为官方文档地址，
  避免教程页继续呈现「摘编外站」形态。
- 未写的 53 条：标题含「实测/亲测」（红线）12 条；主题为模型版本横评（DeepSeek V4 Pro、Kimi K2.6、
  Seedance 2.0 等）而官方文档不可考的 30 余条；`docs.cursor.com` 三页返回同一 SPA 空壳（5525 字、标题完全相同），
  `docs.midjourney.com` 直连与走代理均 403，均无法取证 → 一律不写。

## 五、自检

- 工具页：四条件 **1127 == `tools.xml` 1127**，与开始前一致（`data/tools.json` 未改）。
- 教程页：`tutorials.xml: 收录 3/56`；`sitemap-index.xml` 已含 `tutorials.xml`（此前缺失）。
- 跨页重复：3 条新正文按 20 字滑窗对全库（1177 工具页 + 53 条教程）比对，命中 0；
  唯一重复片段是安装命令里的 `https://openclaw.ai/install.sh`（事实性命令，非文案）。
- 改动面：`data/tutorials.json` 仅 6 行（3 条 content + 3 条 url），`public/*.xml` 由脚本重建。
- 临时脚本与抓取页全部在系统 `Temp/b149/`，未入仓。

## 六、待决策（第 78 轮，仍未授权）

1. **50 条待写池的清零方式**：本批新增 6 条「改名候选实为重复项」证据，加上此前约 44 条的判死/易主证据，
   建议按「合并 19 + 下线约 30 + 移出博彩外链 3」处理，工具总数 1177 → ≈1128，覆盖率 ≈99.9%。
   这一步只提升**比例**，不增加索引条数。
2. **教程页 53 条余量**：本批已验证「官方文档可取证就能写」这条路可行（3 条全过 600 字门槛）。
   若要成规模，建议先按「是否有官方文档」筛出可写的 20 条左右，再按本批格式补齐；
   标题含「实测/亲测」的 12 条需先改角度。
3. **提示词口径已失效**：`1210 / 35 / 1175` 对实况 `1177 / 1127 / 50` 偏差 1.03× / 32× / 23.5×，
   「15–20 条工具页/批」的前提不存在，建议把自动化目标改为「教程页补正文 + 索引面体检」。
