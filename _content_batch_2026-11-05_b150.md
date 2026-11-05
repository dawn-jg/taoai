# 第 150 批内容生产记录（2026-11-05 晚）

## 一、基线复核

| 项目 | 数值 |
|---|---|
| 工具总数 | 1177 |
| 原创池（profiles 1127 ∪ editorials 5） | 1127 |
| 四条件通过 | 1127 |
| `public/tools.xml` | 1127 |
| 池内失败（名称/字数/含自身名） | 0 / 0 / 0 |
| 待写池（不命中原创池） | 50 |
| 教程页 ≥600 字 | 3 / 56 |
| 起始 HEAD | `09481940`（干净，HEAD == origin/main） |

`node scripts/content-queue.mjs --top 24 --save` 与既有队列**零 diff**（第 54 批）。

## 二、工具页：第 79 轮仍为 0

对队列 24 条做直连全量快照（6 路并发 / 15s 超时 / `Accept-Encoding: identity`）：
200×8、403×1（Phind，Cloudflare 挑战页）、ERR×15。逐条定性：

| 条目 | 实测 | 定性 |
|---|---|---|
| `ai-bot` | 200，13527 字 | 名称「AI工具集」为通用名，按 SOP 第 10 条排除 |
| `duiyou-ai` | 200 → 美图设计室 | 名实不符，且库内已有 `xmyeditor-com` |
| `moyin-com` | 200 → 魔音工坊 | 与 `tool1924` 重复（b148 已证伪改名方案） |
| `tool6840` | 200 → 360AI办公 | 与 `bangong-360-cn` 重复 |
| `hotshot-co` | 200，7505 字 | 域名已易主为数码评测站 |
| `tool1333` | 200，博彩站「球友会」 | 外链风险，清理第一档 |
| `yanqueai-com` | 200 / 5980 B / 0 字 | 301 至 logoyq.com，URL 失效 |
| `seelesai-go-link` / `ask-xiaoyuzhoufm` | 35 / 23 字 | SPA 空壳 + 描述性名称 |
| 其余 15 条 | ERR / 403 | 与 b140–b149 结论一致 |

**结论**：50 条待写池里不存在可写出合规原创资料的工具页。b77–b150 共 74 轮零翻转，
「原站取材 / 渲染读取 / 改名解锁」三条假设均已关闭（b149 定论）。按 SOP 第 20 条，
不以空素材凑数，工具页本批新增 **0** 条。

## 三、产能转向：教程页补 4 条官方文档原创正文

`tutorials.xml` 由 3 条增至 7 条。四条全部改写自产品官方文档，并同步把 `url` 从
CSDN / 腾讯新闻 / 111cn 等第三方地址换成官方页面（教程 `url` 在列表页是外链，
换掉即为切断「摘编外站」形态）。

| slug | 字数 | 官方来源 | 标题调整 |
|---|---|---|---|
| `deepseek-v4-api-cost-guide` | 1670 | `api-docs.deepseek.com/quick_start/pricing`、`/guides/thinking_mode` | 原「1元百万token」属未证实价格表述，改为「模型分工、计费结构与思考模式」 |
| `kimi-k26-deep-review-2026` | 1620 | `platform.kimi.com/docs/guide/kimi-k2-6-quickstart`、`/docs/models` | 原「深度测评…职场人必看」改为「能力梳理与迁移提醒」 |
| `openclaw-api-model-selection` | 2005 | `docs.openclaw.ai/providers/models`、`/concepts/model-providers/custom-providers` | 原「Kimi与DeepSeek实测指南」去掉「实测」 |
| `ai-agent-im-integration-2026` | 1465 | `docs.openclaw.ai/channels/wecom`、`/channels/feishu`、`/channels/slack/setup` | 原「微信/钉钉/飞书」改为「企业微信、飞书、Slack」（OpenClaw 无钉钉通道） |

### 关键事实来源（可复核）

- **DeepSeek**：模型仅 `deepseek-flash`（V4.1-Flash-1017）与 `deepseek-v4-pro`（V4-Pro-0813）；
  1M 上下文、最大输出 384K；视觉仅 flash 支持；并发 2500 / 500；峰值时段为 UTC 周一至周五
  01:00–04:00 与 06:00–10:00，其余含周末与法定节假日为低谷，低谷价为高峰一半；
  Search & Fetch 按成功请求独立计费。思考模式默认开启，`temperature` / `presence_penalty` /
  `frequency_penalty` 在思考模式下不生效且不报错；`top_p` 行为按模型不同。
- **Kimi K2.6**：官方模型列表已把 `kimi-k2.6` 列入「已下线模型」——停止向新注册用户开放、
  2026-11-01 前注册账号仍可用、预计 2026 年 12 月底全面下线；参数被固定为定值
  （temperature 1.0 / 0.6、top_p 0.95、n 1、两个 penalty 0.0），传其他值直接报错；
  视觉仅支持 base64、请求体上限 100M、图片建议 ≤4K 视频 ≤1080p。
- **OpenClaw 模型位**：`provider/model` 写法、`agents.defaults.model.primary` + `fallbacks`、
  认证轮换发生在 provider 内部、用户手动选模型为严格不回落、`utilityModel` / `decisionModel` /
  `imageModel` 三类旁路模型、`modelPolicy.allow` 与别名互不影响。
- **OpenClaw IM 通道**：企微走外部包 `@wecom/wecom-openclaw-plugin`（腾讯企微团队维护，
  不随核心包分发）；飞书走内置 `@openclaw/feishu`，默认 WebSocket，webhook 路径
  `/feishu/events` 共用 18789 端口；**官方无钉钉通道**。

### 素材可行性边界（本批新增经验）

- `docs.openclaw.ai` 与 `api-docs.deepseek.com` 支持 URL 追加 `.md`（或 `llms.txt` 索引）直出
  Markdown，正文干净、事实密集，是本次四条的主要来源形态。
- `www.volcengine.com/docs/*` 返回 1.2 MB 却是纯 SPA 导航壳（正文 2040 字，只有目录），
  Seedance 系列教程因此仍无法取证。
- `docs.midjourney.com` 经渲染读取服务返回的是 Zendesk 模板未展开的索引页
  （`<%= article.title %>` 占位符），不可用；`/hc/en-us/articles/...` 猜测路径为 404。
- `www.office-ai.cn/static/introductions/...` 为 325 B 跳转壳，不可用。

## 四、自检

- 工具四条件 1127 == `public/tools.xml` 1127（`tools.json` 未改动）。
- `public/tutorials.xml`：7 条；`sitemap-index.xml` 已含 `tutorials.xml`。
- 四条新正文 20 字滑窗对全库（56 教程）比对：**与任何其它页面重合 0 段**。
  现存 3 对重复均为未改动的历史条目（`openclaw-dingtalk-*` ×2、`thesis-ai-tools` 系列）。
- 红线词扫描（实测 / 亲测 / 编辑部 / 我们测试 / 实际体验）：四条均为 0。
- 本批改动仅 `data/tutorials.json`（16+/16−，4 条 ×4 字段）与 `public/tutorials.xml`。

## 五、待决策（第 79 次）

1. **50 条清理**：合并 19 + 下线约 30（本批无新增硬证据，仅复核）→ 索引面 ≈1127 / 1128，覆盖率 ≈99.6%。
2. **教程页余量**：56 条中已写 7 条。剩余 49 条里，官方文档可取证的大概还有 10–15 条
   （OpenClaw 其它通道、DeepSeek/Kimi 文档章节、Microsoft Learn 系列）；其余多为
   「横评 / 实测 / 心得」类，无官方事实支撑，只能换角度或下架。
3. **口径**：提示词「1210 工具 / 35 可索引 / 1175 待写」对实况「1177 / 1127 / 50」偏差
   1.03× / 32× / 23.5×。目标不改则第 151 批工具页必然仍为 0。
