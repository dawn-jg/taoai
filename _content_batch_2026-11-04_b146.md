# 第 146 批原创内容生产（2026-11-04）

## 一、本批结论

- **新增原创资料 3 条**：`deepseek`（1698 字）、`chatgpt`（1356 字）、`qwen`（1350 字）。
  三条均为全站评分最高的编辑精选（featured），此前进索引靠的是历史正文，不在 `tool_profiles.json` 里。
- **修复 2 处线上主题错配**：`chatgpt` 页正文原本写的是「AI Short 提示词平台」，
  `qwen`（通义千问）页正文原本写的是「智谱清言 AgentMore 智能体平台」。
  两者都能通过索引四条件（正文里顺带出现了 ChatGPT / 通义千问 字样），属于 AdSense「内容与页面主题错配」的典型形态，
  且落在全站流量最高的两个页面上。本批用官方资料来源重写后，错配文本已被整段替换。
- **可索引数不变**：1127（三条本来就在原创池内），索引面 1127 / 1177 = 95.8%。
- **待写仍 50 条**：本批对这 50 条做了第 75 轮复核，可写池依旧为 0（详见第三节）。

## 二、三条资料的来源与事实锚点

| slug | 来源 | 关键事实（均出自来源页面） |
|---|---|---|
| `deepseek` | `api-docs.deepseek.com/zh-cn/`、`.../quick_start/pricing`、`www.deepseek.com/news` | 兼容 OpenAI / Anthropic 两种接口格式，base_url 分别指向 `api.deepseek.com` 与 `api.deepseek.com/anthropic`；模型 `deepseek-flash`（V4.1-Flash-1017）与 `deepseek-v4-pro`（V4-Pro-0813）；上下文 1M、最大输出 384K；JSON Output / Tool Calls / Responses API / 前缀续写 Beta / FIM Beta（仅非思考）；图像理解仅 flash 支持；Search 与 Fetch 为独立 API 按成功请求计费；高峰时段为北京时间工作日 9:00–12:00、14:00–18:00。 |
| `chatgpt` | `openai.com/chatgpt/overview/`、`help.openai.com/.../what-is-chatgpt`、`openai.com/index/chatgpt/` | 2022-11-30 发布；当前按 Chat / Work / Codex 三种形态组织；功能含 Deep Research、Images、Voice、Plugins、Study Mode、Slides、Sites、Space；套餐分层 Free / Go / Plus / Pro / Business / Enterprise；帮助中心说明可在隐私门户关闭「用于训练」。 |
| `qwen` | `tongyi.aliyun.com`、`help.aliyun.com/zh/model-studio/`、`.../model-studio/models` | 品牌现写作「千问」，模型经阿里云百炼开放；档位 qwen3.8-max / qwen3.7-plus / qwen3.8-flash；能力覆盖文本与视觉理解、图像生成、视频生成与编辑、语音识别/合成/端到端语音、全模态、向量与重排序、决策模型、3D 生成；提供 OpenAI 兼容调用与 DASHSCOPE_API_KEY 认证。 |

按 SOP 要求，正文未写具体价格数字，只写「免费增值 / API 按量计费」这类概括标签；未使用「实测」「亲测」表述。

## 三、50 条待写的第 75 轮复核（三通道）

1. **直连 24 条**：200×6、403×1、其余为 TLS 或 DNS 错误。逐条定性后仍无可用素材：
   - `ai-bot`（通用名，按规则排除）、`seelesai-go-link`、`ask-xiaoyuzhoufm-com`（描述性名称，按规则排除）；
   - `duiyou-ai`（url 指向美图设计室）、`moyin-com`（实为魔音工坊）、`tool6840`（现为 360AI办公）——名实不符；
   - `hotshot-co`（域名已改为数码评测博客）、`tool1333`（博彩站「球友会」）。
2. **证书错误复核（本批新增判据）**：`voxcraft.ai` 504、`6pen.art` 已改为「致谢与新篇章」告别页、
   `miaohui.jixueai.com` 为「创大产控」、`pagentia.com` 403、`writingpal.ai` / `humva.ai` 连接失败。
   即 DeepSeek 式的「证书报错」并不能救回这些条目，逐条复核后仍全部不可写。
3. **渲染读取**：`www.doubao.com/chat/` 被区域限制拦截（跳 `doubao-region-ban`），取不到该产品本身资料，
   因此 `doubao` 未重写，保留其现有的豆包大模型文本（内容与主题一致，只是非 profiles 来源）。

**结论**：本批可写池 0 条新增，产出 3 条来自「已在池内但缺原创资料」的头部条目。

## 四、自检

- 四条件通过数 1127 == `public/tools.xml` 1127 == 线上 sitemap 1127。
- 三条字数：1698 / 1356 / 1350，均 ≥700；四节标题均含工具名，正文均出现工具名。
- 跨页重复句审计（≥18 字句子，全库 1127 页）：**跨页重复句组 0**，唯一的同页内重复在 `tool23013` 自身。
- 索引面中非 `tool_profiles.json` 来源的页面：仅剩 `doubao` 1 条（其余 1126 条均为编辑部原创资料）。

## 五、下一步建议（与之前一致，未变）

1. 教程页 56 条补正文是唯一还有成规模增量的方向（+56 → 1183），但需先统一 8 条「实测/亲测」标题口径。
2. 50 条待写建议转为「清理 + 死链巡检」任务（本轮又新增 6pen 告别页、hotshot 易主等证据）。
3. `tool1333`、`tool14961`、`tool58825` 三条外链指向博彩站，建议不等内容补齐直接下线。
