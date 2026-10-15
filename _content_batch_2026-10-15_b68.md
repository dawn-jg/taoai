# 第六十八批原创工具资料（2026-10-15 晚）

## 结果

- 工具总数 1177，原创池/可索引 `tools.xml`：1087 → **1106**（**+19**）
- 自检：独立复算四条件 `原创池 1106 == 四条件通过 1106 == tools.xml 1106` ✅（池内未通过 0、孤儿 profile 0）
- 待写：94 → **71**

## 本批新增 19 条（818–1064 字，每节均含工具名）

| slug | 名称 | 字数 | 来源 |
|---|---|---|---|
| tool482 | Tome | 939 | tome.app 存档 |
| museland-ai | Museland | 846 | museland.ai 存档 |
| tool3051 | Quest | 896 | quest.ai 存档 |
| tool10172 | Prism | 862 | fable.app/prism 存档 |
| tool2462 | Dora AI | 873 | dora.run/ai 存档 |
| tool11853 | Searcholic | 818 | searcholic.com 存档 |
| tool2106 | 字语智能 | 871 | getgetai.com 存档 |
| hsphoto-cn | 花生图像 | 821 | hsphoto.cn 存档 |
| visual-electric | Visual Electric | 876 | visualelectric.com 存档 |
| tool6316 | 晓语台 | 982 | xiaoyutai.com 存档 |
| tool5572 | 灵构笔记 | 948 | 88lingo.com/ai 存档 |
| baoyueai-com | 包阅AI | 899 | baoyueai.com 存档 |
| tool404 | MetaVoice | 960 | themetavoice.xyz 存档 |
| tool11443 | 海瑞智法 | 900 | hairuilegal.com 存档 |
| tool2404 | 爱创作 | 879 | ai.zaker.cn 存档 |
| tool302 | Zyro AI Background Remover | 967 | zyro.com 存档 |
| tool1965 | Splash | 1031 | **splashmusic.com 实时页** |
| tool3529 | Clipdrop Sketch to Image | 1000 | clipdrop.co/sketch-to-image 存档 |
| tool71587 | EasyClaw | 1064 | easyclaw.app 存档 |

## 名称/URL/描述修正 15 处（先改再写）

- 描述性/截断名 → 真实产品名：tool482 `AI销售助手`→Tome、museland-ai `沉浸式AI角色扮演产品`→Museland、
  tool3051 `AI将设计稿生成React代码，支持Ja`→Quest、tool10172 `AI动效设计和动画效果制作工具`→Prism、
  tool2462 `AI在线生成精美3D动画的网站`→Dora AI、tool11853 `AI驱动的电子书和文档搜索引擎`→Searcholic、
  tool2106 `一站式智能Office内容创作平台`→字语智能、tool404 `AI实时变声工具`→MetaVoice、
  tool11443 `一站式AI法律咨询助手`→海瑞智法、tool71587 `开源的 OpenClaw 一键安装工具`→EasyClaw。
- 品牌/产品名修正：tool5572 `灵构AI笔记`→灵构笔记、tool302 `Zyro`→Zyro AI Background Remover、
  tool1965 `输入文本提示快速生成歌曲和音乐`→Splash、tool3529 `Stable Doodle`→Clipdrop Sketch to Image。
- URL 修正 2 处：tool1965 `beatbot.fm`（410）→ `splashmusic.com`（官网当前可达，已改用实时页作来源）；
  tool3529 `/stable-doodle` → `/sketch-to-image`（官方改名后的路径）。
- 全部同步 description 与 tags；未改 category/subcategory，故 `categories.json` 计数无需重算。

## 本批素材通道（关键结论）

1. **本批唯一有效新通道＝ `web.archive.org` 官方页快照**。待写 90 条的存活域几乎为零：代理 curl 全量探测仅
   约 20 条回 200，其余 000/403/404；44 条直连复测只有 2 条回 200（其中 1 条是 39 字节空壳）。
2. **archive.org 有并发限流**：3 路并发的 66 条请求在第 9 条之后整批返回 000，改为**串行 + 每次 sleep 3 秒**后恢复正常。
   取快照时用 `https://web.archive.org/web/20240601000000/<原URL>`，落到最近一次快照。
3. **存档快照只有服务端渲染的旧页可用**：SPA 域名（humva.ai、noisee.ai、hitems.ai、voxcraft.ai、writingpal.ai、
   6pen.art、tool1957 AIDesign、tool67371、tool67775）快照正文只剩标题，一律作废。
4. `r.jina.ai`、WebFetch 本批未投入；代理 curl 仍只适用于官网主通道仍在的域名。

## 排除清单（本批新增判废信号）

- 同产品双条：`moyin-com`＝tool1924 魔音工坊、`duiyou-ai`＝xmyeditor-com 美图设计室、`tool150`＝tool73947 Stitch、
  `tool923`＝lumalabs-ai、`tool111`＝preview-devin-ai、`tool9412`＝tool9802 跃问、`tool67455`＝tool36409 稿易AI论文、
  `seelesai-go-link`＝tool14989、`tool8681`（reecho.ai 现为 Vocu AI）＝reecho、`tool11395`＝tool139 Flowith。
- 劫持/换主体：`tool14961`（DegenCity 博彩）、`tool58825`（KeoNhaCai）、`tool148`（冰淇淋店，magician.design）、
  `miaohui-jixueai-com`（创大产控）、`tool1989`（阿里云万网）、`tool6840`（360AI办公 空壳 + 名称不符）、
  `xanswer-com`（现为 Morphic）、`hotshot-co`（科技博客）、`tool1890` Neeva（新闻模板站）。
- 空壳/无正文：`ask-xiaoyuzhoufm-com`（29 字）、`instreet-coze-site`（"闭店装修"）、`yanqueai-com`（纯 JS 壳）、
  `tool6316` 除外其余 SPA 候选、`tool2106` 之外的 getgetai 类。
- 已停服/停运：`tool482` 之外的 Tome 系无、`tool14278` MidReal、`tool67418` GetDraft、`tool3006` LogoliveryAI、
  `tool596` Riffusion→Google Flow Music、`tool302`/`tool216` Zyro 并入 Hostinger、`tool3529` Sketch to Image 已下线
  （clipdrop.co 工具列表里已无此项）、`zhiyan-wondershare-cn` 万兴智演、`phind-com` Phind。
- 通用名/关键词堆砌名：`ai-bot`（AI工具集）、`tool67595`。
- 明确排除：`jianying`（url 指向即梦，数据错误未修正）。

## 去标签 14-gram 查重（既有语料 100.9 万 gram）

- 首检 8 条命中 → 逐条改写 → 终检 **仅剩 1 条，且属「名称型」而非「行文型」**：
  tool302 的名称含 18 字符 token `BackgroundRemover`，与既有条目 tool303（Hotpot AI Background Remover）、
  tool312（Quicktools Background Remover）天然重叠。**该重叠在既有语料中已存在**——tool303 与 tool312 两者之间
  就有 21 个共同 14-gram（全部来自名称 token），故按项目现状接受，未为规避而牺牲产品名准确性。
- 命中的行文型句式（已改写）：`官网列出的能力集中在/围绕/覆盖`、`官网把它描述为「`、`官网把它定位为「`、
  `官网当前展示的能力`、`配图：为文章、海报与社交媒体`、以及「<工具名> 的应用场景」后紧跟「电商…」的段落起手。

## 说明：本批来源为官方网站的历史存档

待写池中绝大多数产品的官网已不可访问，本批 19 条里有 18 条的 `sources[]` 填的是 **web.archive.org 上该产品官网的
快照 URL**（属于「产品官网」的历史版本，非第三方站点的采集正文），撰写时用编辑部语言重写，未引用页面上的用户评价、
销量与榜单数字，也未写具体价格。若此口径需要收紧，下一批可只保留官网实时可达的条目（按本批实测，这种条目每批约 1 条）。
