# 「同 URL 不同名」56 组复核与处置报告

日期：2026-09-29 ｜ 仓库：`D:\ai-nav-site` ｜ 站点：taoai365.com

## 一、背景与根因

`scripts/dedupe-tools.mjs` 的保守策略只自动合并「URL 与名称都相同」的条目，
「同 URL 不同名」的 56 组一直被挂起待人工复核。

逐组核查后确认，这 56 组是**同一个抓取缺陷的产物**：
早期从 ai-bot.cn 采集时，把 **A 卡片的「描述句」当成了工具名**，又把 **B 卡片的链接**
当成了它的官网，于是出现「名称与 URL 互相矛盾」的条目。表现为两类：

1. **描述句当名称**：如 `tool7582` 名称=「开源的支持多款大模型的AI编程助手」、`tool2005`=「智谱推出的全能AI助手」；
   其 `description` 也是由这个假名称套模板生成的（「×××是一款……AI工具」），标签被截断成「AI聊天助」。
2. **名称与官网错配**：名称是真实产品（Writesonic / Jasper / Copy.ai …），URL 却是另一个中国产品的域名。

两类条目**均不在原创池**（`noindex`），但会原样出现在**可索引的分类列表页**（`getToolsByCategory`
不做可索引过滤），属于必须清掉的低价值内容。每组里都有一个「名称与 URL 相符」的正主。

判定方法：逐组抓取该 URL 的真实页面标题（56 个 URL 全部实抓），据此确定 URL 的归属产品；
再对被错配的工具用官网页面标题**逐个核验**其正确网址（不凭记忆写 URL）。

## 二、处置结果

| 动作 | 数量 | 说明 |
|---|---|---|
| **合并**（301 → 正主并移除） | 32 | 同一产品的重复条目 |
| **修正 URL** | 44 | 名称是真产品、URL 被错配；全部经页面标题核验 |
| **改名** | 14 | 描述句 → 真实产品名 |
| **工具总数** | 1209 → **1177** | |
| **可索引** | 205（不变） | 被移除的 32 条原本全部 `noindex` |

### 2.1 合并（32 条，301 后移除）

| 被合并 | 并入 | 依据 |
|---|---|---|
| tool2005 / perplexity-ai / tianyin-163-com | chatglm / perplexity / cloudmusic-xiaowei | 同产品的描述句名 |
| tool61400 · tool6474 · liblib-art · liblib-art-2/-3/-4 | d-design / liblibai | 同一产品的功能页/描述句 |
| meijian-com-2 / ihuiwa-com-2 / loomy-xunfei-cn | meijian-com / ihuiwa-com / loomy | 同上 |
| tool32344 · tool32253 | **pic-copilot** | Pic Copilot（原库中已有正主，且在原创池） |
| tool2029 / tool4257 / tool2198 | gaoding-art / tiangong-cn / chat-baidu-com | 同产品描述句 |
| tool252 / tool67911 / tool4841 / tool6519 / tool163 | lovo-ai / tool69212 / doubao / office-raccoon / tool14769 | 同产品/同站点 |
| stable-diffusion / tool1608 / pexo-ai / tool87 | stability-ai / tool13 / pexo-ai-2 / removal-ai | 同产品（库中已有正主） |
| wenxin-yige | chat-baidu-com | 二者官网均为「百度文心助手」（`yige.baidu.com` 已并入），
上次改名后形成的新重复 |
| tool7582 | trae | 名称是 DevChat 描述、URL `devchat.ai` 已是**停放域名**（死链），纯垃圾条目 |
| tool12663 | **tool4453** | 百小医（原库中已有正主） |
| tool141 / tool13002 / tongyi-xiangma | tool14 / kling / tongyi-aliyun-com | 同产品（Jasper Chat ⊂ Jasper；可灵；通义万相） |

### 2.2 修正 URL（44 条，全部实抓核验）

TRAE→trae.ai ｜ 剪映AI→jianying.com ｜ HuggingChat→huggingface.co/chat ｜ ContentBot→contentbot.ai
｜ Writesonic→writesonic.com ｜ HyperWrite→hyperwriteai.com ｜ Jenni→jenni.ai ｜ Moonbeam→gomoonbeam.com
｜ Copy.ai→copy.ai ｜ Jasper→jasper.ai ｜ 魔撰写作→x.moyin.com ｜ Cohesive→cohesive.so
｜ Typeface AI→typeface.ai ｜ 美图设计室→design.meitu.com ｜ Canva AI图像生成→canva.cn
｜ Visual Electric→visualelectric.com ｜ 码上飞→codeflying.net ｜ Pi→pi.ai ｜ 书生大模型→intern-ai.org.cn
｜ Bing新必应→bing.com/chat ｜ Character.AI→character.ai ｜ Replika→replika.com ｜ Neeva→neeva.com
｜ Forefront→forefront.ai ｜ YouChat AI→you.com ｜ 秒哒→miaoda.baidu.com ｜ Wordware→wordware.ai
｜ 星流AI→xingliu.art ｜ 阿里云智能logo设计→logo.aliyun.com ｜ 腾讯AIDesign→ailogo.qq.com
｜ SearchGPT→openai.com/index/searchgpt ｜ 讯飞星辰MaaS→maas.xfyun.cn ｜ GPT-4→openai.com/index/gpt-4
｜ DALL·E 3→openai.com/index/dall-e-3 ｜ ColossalChat→chat.colossalai.org ｜ Inworld→inworld.ai
｜ Open Assistant→open-assistant.io ｜ 01Agent→01agent.net ｜ Riffusion / WellSaid / Soundraw（见 2.3）

### 2.3 改名（14 条）

| slug | 原名 | 新名 |
|---|---|---|
| chat-baidu-com | 百度AI助手 | 百度文心助手 |
| longcat-chat | 美团推出的自研大模型AI对话平台 | LongCat |
| tool5368 | 马斯克旗下xAI推出的人工智能助手 | Grok |
| tool459 | 问答社区Quora推出的问答机器人工具 | Poe |
| tool5533 | 基于孟子GPT大模型的AI对话机器人 | 孟子GPT |
| gaoding-art | 稿定推出的设计Agent和AI创意社区 | 稿定AI |
| tool1924 | 魔音工坊- | 魔音工坊 |
| tool106 | AI调色盘生成工具 | Khroma |
| tool108 | AI生成精美App图标 | AppIcons.AI |
| tool596 | Google Flow Music（URL 实为 riffusion.com） | Riffusion |
| tool398 | AI文本转语音工具（URL 实为 wellsaid.io） | WellSaid Labs |
| tool80 | AI音乐生成工具（URL 实为 soundraw.io） | Soundraw |
| naturalreaders-com | AI文本转语音工具 | NaturalReader |
| lemonaide-ai | AI音乐生成工具 | Lemonaide |

> 注：`removal-ai`（抠抠图）经核查其**原创正文明确写明「其官方站点为 Removal.AI」**，
> 属有意命名，未改动，仅把重复的 `tool87` 并入。

## 三、校验

- **复核清单全部归零**：同 URL 同名 0 组；同名不同 URL **0 组**；同 URL 不同名 **0 组**。
- **索引一致性**：工具 1177 ｜ 原创池命中 205 ｜ 四条件通过 205 ｜ `tools.xml` 205 ｜ **逐条相符**。
- 无悬空池成员（`tool_profiles.json` / `editorials.json` 的键均有对应工具）。
- `public/_redirects`：累计 **554** 条旧 slug → 1108 行 301；`migrate-slugs` 检测到计划外迁移 0 条。
- 其他数据文件（`news_details.json` / `editorials.json` / `tool_profiles.json` / `tutorials.json`）
  对被移除 slug 均无引用；`content_queue.json` 已重新生成。

## 四、遗留

1. **logo 未同步**：本次修正 URL 的 44 条，其本地图标仍是**旧（错误）站点**的图标，
   与名称不再匹配，建议用 `taoai-logo-sync` 按新 URL 重新抓取。
2. `gaoding-art` 等少量条目的 URL 仍带 utm/跟踪路径（如 `gaoding.art/utms/...`），可后续统一清洗。
3. 这批条目**仍不在原创池**，因此仍为 `noindex`；若要恢复索引，需按 SOP 撰写原创资料。
