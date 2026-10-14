# 第六十三批原创资料小结（2026-10-14 早）

## 一、基线

| 项 | 值 |
|---|---|
| 工具总数 | 1177 |
| 起始可索引（原创池 = tools.xml） | 1064 |
| 起始待写 | 113（HEAD `af45260c`） |
| 本批目标 | 15–20 条 |

## 二、本批产出（6 条）

| slug | 名称 | 分类 | 正文字数 | 主要来源 |
|---|---|---|---|---|
| tool1825 | Alpaca | AI设计工具 | 1494 | `docs.alpacaml.com`（welcome / classic.imagine / classic.fill / classic.doodling / classic.installing / home.faq） |
| tool2610 | Boxy | AI编程工具 | 975 | `codesandbox.io/blog/meet-boxy-ai-coding-assistant` + 3 篇官方 changelog |
| ai-mianshiya-com | 面多多 | AI办公工具 | 883 | `ai.mianshiya.com` |
| tool3973 | Stable Chat | AI聊天助手 | 926 | `stability.ai/news-updates/stable-chat-research-defcon-ai-village` |
| tool938 | Sketch2Code | AI编程工具 | 959 | `azure.microsoft.com` 官方博客 + `learn.microsoft.com` 归档博客 + `github.com/Microsoft/ailab/tree/master/Sketch2Code` |
| tool4963 | PromptPerfect | AI提示指令 | 1024 | `promptperfect.jina.ai/zh-CN` + `/api` |

全部为官方来源（产品官网 / 官方文档 / 官方博客 / 官方开源仓库），未使用任何第三方导航或媒体转述；未引用页面上的用户评价与销量榜单数字。

## 三、本批名称/URL/描述修正（6 条，先改再写）

| slug | 原名 | 新名 | 其它同步修正 |
|---|---|---|---|
| tool1825 | 将生成式AI集成到Photoshop图像设计中 | Alpaca | url 由已挂牌出售的 `getalpaca.io` 改为 `docs.alpacaml.com`，domain 同步；补 tags/description |
| tool2610 | CodeSandbox推出的AI编程助手 | Boxy | url 由博客单页改为 `codesandbox.io`；补 tags/description |
| ai-mianshiya-com | 沉浸式AI模拟面试平台 | 面多多 | 补 tags/description（旧 detailed_content 为采集正文，已被原创资料覆盖） |
| tool3973 | Stable Chat（名不变） | Stable Chat | url 由已失效的 `research.stability.ai/chat` 改为官方公告页；domain 同步 |
| tool938 | 微软AI Lab推出的将手绘草图转换成HTML代码工具 | Sketch2Code | url 由已下线的 `sketch2code.azurewebsites.net` 改为官方开源仓库；domain 同步；pricing → free |
| tool4963 | PromptPerfect 是一款专业好... | PromptPerfect | url 由已失效的 `promptperfect.jinaai.cn` 改为 `promptperfect.jina.ai`；pricing → freemium |

## 四、抓取与判定过程

1. **全量 113 条代理 curl 探测（含 title 核对）+ 68 条非 200 二次直连复测**：直连复测只多找回 3 个可达域名（`yanqueai.com` 空壳、`ai.mianshiya.com`、`xiaoyutai.com` 空壳），其余仍是 000 / 403 / 404。
2. **可达的 45 条里，绝大多数是已判废四类**：劫持成博彩站、停服公告、名称—页面不符、同产品双条。
3. **本轮抓取抓手实测**：`WebFetch` 对官方文档站最有效（`docs.alpacaml.com`、`learn.microsoft.com`、`azure.microsoft.com` 全文可得）；代理 curl 对中文 SPA 基本失效；`r.jina.ai` 对已死域名只回 resolve 失败、对中文 SPA 回 422，**已彻底退化为不可用**；`archive.org` 的 availability 接口本轮无响应。
4. **抓不到素材而跳过（含新判废信号）**：
   - **域名挂牌出售**：`getalpaca.io`（Afternic 停放页）、`creatie.ai`、`stylized.ai`；
   - **官网已下线但仅剩官方文档**：`alpacaml.com` 根路径 404（本批仍据其官方文档收录 Alpaca，url 指向文档站）；
   - **官方公告已终止服务**：`promptperfect.jina.ai` FAQ 明确「Jina AI 于 2025-10 被 Elastic 收购，2026-09-01 后不再提供」——本批仍按其官方页面如实记录并存续状态，未粉饰；
   - **同产品双条**：`seelesai-go-link`（= 既有 `tool14989` SeeleAgent，同 url）、`tool11395`（= 既有 `tool139` Flowith）、`tool8681`（= 既有 `reecho`，`reecho.ai` 现跳 `vocu.ai`）；
   - **名称—页面不符**：`world-liberty-financ`（现为 WorldClaw）、`tool6840`（360AI办公）、`duiyou-ai`（美图设计室）、`tool16669`（咔咔猩）、`miaohui-jixueai-com`（创大产控）、`tool1989`（万网/形状结合）、`tool68863`（笔面通）、`tool747`（Moxby）；
   - **纯 SPA / 需登录 / 只有 tagline**：`zaoci.tv`（造次，首页客户端渲染，仅拿到一句官方 tagline，不足以支撑 ≥700 字）、`yizhuan5.com`（易撰登录页）、`chuangyi.taobao.com`（悉语登录页）、`ai.mianshiya.com` 之外的中文站点；`codesandbox.io` 博客与 `phind.com` 被 Cloudflare 403 拦截（Boxy 正文经官方博客检索取得）；
   - **通用名/长名/截断名**：`ai-bot`（AI工具集）、`tool2921`（控制台）、`tool67595`（50+ 字）、`tool2771`（虎博截断名）；
   - **域名已死**：其余约 47 条（noisee.ai、voxcraft.ai、visualelectric.com、humva.ai、hitems.ai、xanswer.com、museland.ai、dora.run、fable.app、explorer.globe.engineer、lab4ai.cn、hairuilegal.com、kaisouai.com、searcholic.com、88lingo.com、briefly.video、175.fun、6pen.art、pagetia.com、telehire.ai、baoyueai.com、pagentia.com 等）。
5. **明确排除**：`jianying`（url 指向即梦，数据错误未修正）；`tool71587` EasyClaw（`easyclaw.app` 已 404，GitHub 上同名「EasyClaw」仓库至少两个且互不相关，主体指向不明）。

## 五、两道自检

- **逐条复算真实门槛**：6/6 PASS（4 节齐备、`<p>/<ul>/<li>/<ol>` 开闭配对、逐节均含自身名、字数 883–1494）；官方脚本 `apply-tool-profiles.mjs` 亦逐条打印「含自身名:是」。
- **去标签 14-gram 跨条目查重（对约 88.4 万既有 gram）**：首检 2 处命中，均为 `Stable Chat 是 Stability AI 推出的…` 与既有 `stable-audio` / `tool1861` 撞车，改写为「对外开放的…」后**终检 0 命中**。

## 六、结果与推送

- 可索引 1064 → **1070**；独立复算 `原创池 1070 == 四条件通过 1070 == tools.xml 1070` ✅（池内未通过 0、孤儿 profile 0），6 条全部出现在 `public/tools.xml`。
- 待写 113 → **107**。
- Git：commit `1eeba72d`，push main 成功（`af45260c..1eeba72d`），`## main...origin/main` 无 ahead。显式 add 6 个文件（`data/tool_profiles.json`、`data/tools.json`、`public/tools.xml`、`public/sitemap-index.xml`、`public/sitemap.xml`、`public/static-pages.xml`），未用 `git add -A`（工作区另有未跟踪的 `build_cron_2026-10-07.log`）；提交前 `rm -rf .tmp_*`。

## 七、下一批提示（待写 107 条）

1. 本批把 113 条做了「代理 curl + 直连复测 + WebFetch/官方文档 + r.jina.ai」多轮实测，**可写余量已极低**，6 条属该池当前正常水平，**不要为凑数放宽「名称—页面相符」底线**。
2. **WebFetch 是本轮唯一稳定抓手**，优先试官方文档站与官方博客（`docs.*`、`learn.microsoft.com`、`*.microsoft.com`、`about.*`）；代理 curl 只剩「官网主通道」作用；`r.jina.ai` 可不再投入。
3. 写作前先核对「DB 名能否自然嵌入正文 / url 是否为官网且可达」，脏名先改再写（连带改 description、tags、pricing），并同步 `domain`。
4. 固定跑两道自检：逐条复算真实门槛 + 去标签 14-gram 查重（本轮再次用 14-gram 顺带确认了 3 组「同产品双条」）。
5. 剩余 107 条多为「域名已死 / 被劫持 / 已停服 / 名称不符 / 纯 SPA」五类；继续按实际素材量如实上报。
