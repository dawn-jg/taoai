# 第 153 批内容生产记录（2026-11-06 下午）

## 一、基线

| 项目 | 数值 |
|---|---|
| 工具总数 | 1177 |
| 原创池（profiles 1127 ∪ editorials 5，重叠 5，实际 1127） | 1127 |
| 四条件通过 / tools.xml | 1127 / 1127（一致） |
| 待写（不在原创池） | 50 |
| 教程 ≥600 字 / tutorials.xml | 25 / 25 |
| 起始 HEAD | `c3c8713e`（干净，HEAD == origin/main） |

`node scripts/content-queue.mjs --top 24 --save` 输出与上批完全一致（第 57 次零 diff），
仍为同一批 50 条。`content-queue.mjs --top 60 --json` 确认待写池就是这 50 条，没有新增条目。

## 二、工具页：第 77 轮增量仍为 0

本轮没有沿用「只抓队列前 24 条」的做法，而是**一次性探测全部 50 条**（8 并发 / 15s 超时），
再对返回 200 的条目逐条做「名称—页面」核对，对证书异常、403、超时的条目补跑代理 curl
（`-k --tls-max 1.2 -H "Accept-Encoding: identity"`）与渲染读取（`r.jina.ai`，带 `x-no-cache`）。

探测结果：`200 且正文 >500 字` 仅 7 条，其中 6 条为通用名、名实不符或博彩站；
证书/超时/域名消失 30 条；403 两条（Phind、FlowGPT）经渲染读取后，Phind 仍是 Cloudflare
挑战页，FlowGPT 落到首页且正文无一处提及「Flow Studio」，属名实不符。

### 50 条逐条定性

| # | slug | 名称 | 判定 | 证据 |
|---|---|---|---|---|
| 1 | ai-bot | AI工具集 | 通用名 | 首页 200 / 13348 字，但名称会让「含自身名」校验失效 |
| 2 | voxcraft-ai | VoxCraft | 官网不可达 | 直连与代理均 504，代理 curl 仅 160 B |
| 3 | yanqueai-com | AI LOGO设计工具 | 名实不符 + 描述性名 | 302 至 `logoyq.com`，落地页无正文 |
| 4 | telehire-ai | 最轻量级的全领域AI面试官 | 域名消失 | `ENOTFOUND`；渲染服务报 `Domain could not be resolved` |
| 5 | 6pen-art | 6pen Art | 停服 | 官网仅「致谢与新篇章 / 是时候说再见了」公告，导流到 6pen Pro |
| 6 | flow-studio | Flow Studio | 名实不符 | `flowgpt.com` 403；渲染后为首页，全文 0 次提及 Flow Studio |
| 7 | miaohui-jixueai-com | 秒绘AI | 证书过期 | `CERT_HAS_EXPIRED`，代理 `-k` 未取得正文 |
| 8 | miantuan-knowfuture-com-cn | 面团AI | 连接超时 | `UND_ERR_CONNECT_TIMEOUT` |
| 9 | duiyou-ai | 堆友AI | 名实不符 | 落地为「美图设计室」 |
| 10 | seelesai-go-link | 全球首个端到端AI 3D游戏生成工具 | 描述性名 | 302 至 `seeles.ai/workspace`，正文 35 字壳 |
| 11 | pagentia-com | AI专利查新检索与撰写平台 | 证书异常 | `ERR_TLS_CERT_ALTNAME_INVALID` |
| 12 | phind-com | Phind | 取不到正文 | 直连/代理 403，渲染服务返回「Just a moment...」 |
| 13 | photonaiclub-com | 光子AI | 域名消失 | `ENOTFOUND`；渲染服务 `EAI_AGAIN` |
| 14 | humva-ai | Humva | 域名已停放 | 落地页「This page has been created by ParkLogic」 |
| 15 | ask-xiaoyuzhoufm-com | 小宇宙推出的AI搜索产品 | SPA 壳 + 描述性名 | 正文 23 字 |
| 16 | writingpal-ai | WritingPal | 连接超时 | `UND_ERR_CONNECT_TIMEOUT`，渲染服务 `TimeoutError` |
| 17 | xanswer-com | 支持生成思维导图的免费AI搜索工具 | 域名消失 | `EAI_AGAIN` |
| 18 | photonaiclub-com-2 | 光子AI抠图 | 域名消失 | 同上（`EAI_AGAIN`） |
| 19 | moyin-com | 魔撰写作 | 名实不符 | `x.moyin.com` 302 至「魔音工坊」（配音产品），非写作产品 |
| 20 | etna-7volcanoes-com | Etna | 域名消失 | 渲染服务 `Domain 'etna.7volcanoes.com' could not be resolved` |
| 21 | hotshot-co | Hotshot | 已易主 | 现为「AI Tools, Gadgets, Smart Home & How-To Guides」数码站 |
| 22 | tool6840 | 360智绘 | 名实不符 + 重复 | 302 至 `bangong.360.cn`（360AI办公会员页） |
| 23 | tool2676 | 175FUN | 域名消失 | `ENOTFOUND`；渲染服务 42203 |
| 24 | tool1333 | 创作王 | 博彩外链 | 落地 `aiapp.cc` 标题为「qy球友会」，**建议下线** |
| 25 | tool1957 | AIDesign | 无响应 | `ailogo.qq.com` 直连 `ENOENT`，代理 curl 000 |
| 26 | tool1890 | Neeva | 停服 | 证书链不可信，产品已关停 |
| 27 | tool701 | AI生成3D材质 | 描述性名 | 302 至 `poly.app/browse/textures` |
| 28 | tool479 | AI代码检查 | 证书无效 | HTTP 526 Invalid SSL certificate |
| 29 | tool1079 | 阿里云登录 | 登录壳 | `m6.aliyun.com` 正文 177 字 |
| 30 | tool9412 | 阶跃星辰推出的AI聊天机器人和智能体平台 | 域名消失 | `ENOTFOUND`（`maopaoya.com`） |
| 31 | tool11840 | 结构化AI知识搜索引擎 | 连接被重置 | `ECONNRESET` |
| 32 | tool67595 | 论文降aigc-论文aigc降重-… | 关键词堆叠名 | 正文 1715 字，但名称为 SEO 堆词，不宜作页面名 |
| 33 | tool1338 | 全能AI助手，基于Qwen模型 | SPA 壳 + 描述性名 | 正文 0 字 |
| 34 | tool11395 | 一站式用GPT-5.5、Claude-4.7 | SPA 壳 + 描述性名 | 正文 0 字 |
| 35 | tool67775 | 在线大模型训练微调及AI科研学习平台 | 注册页 + 描述性名 | 自签名证书，落地 `/register` |
| 36 | tool66554 | 造次 | 证书过期 | 代理 `-k` 返回 0 字节 |
| 37 | tool71074 | 长视频精华提炼，自动追踪频道中文推送 | 站点消失 | 404 Project not found（Vercel） |
| 38 | tool67455 | 专注学术写作降AI率的工具 | 稀薄 + 描述性名 | 正文 128 字 |
| 39 | tool13251 | 字节跳动旗下推出的AI虚拟交友聊天平台 | 域名消失 | `EAI_AGAIN` |
| 40 | tool150 | AI高保真原型设计 | 停服 | `usegalileo.ai` 连接超时（Galileo 已被收购关停） |
| 41 | tool67371 | AI面试助手\|AI笔试助手 | 域名消失 + 脏名 | `ENOTFOUND`，名称含 `\|` 分隔符 |
| 42 | tool58825 | AI人才发现与分析平台，精准识别AI精英 | 名实不符 | 403 后落地 `clepto.io` |
| 43 | tool33149 | AI设计工具，支持AI抠图、消除、无损放大 | 域名消失 | `ENOTFOUND`（`ibihun.com`） |
| 44 | tool148 | BW188 | 连接中止 | `magician.design` AbortError |
| 45 | tool67418 | GetDraft | 停服 | 正文 8 字 |
| 46 | tool3006 | LogoliveryAI — Free AI | 停服 | 正文 182 字壳，服务已清盘 |
| 47 | tool14278 | MidReal | 停服 | 官网为《A Letter to our MidReal community》告别信 |
| 48 | tool14961 | Redirecting... | 已易主 | 落地 DegenCity 赌场站，**建议下线** |
| 49 | tool7424 | XPaper AI | 无法连接 | `ECONNREFUSED`（`130ai.com`） |
| 50 | tool216 | Zyro AI Image Upscaler | 产品并入 | 302 至 Hostinger 博客《Zyro joins forces with Hostinger》 |

统计：通用名/描述性名/关键词堆叠名 12 条；域名消失 11 条；停服或产品并入 8 条；
名实不符/已易主 8 条；证书或连接故障 8 条；SPA 壳/登录壳/注册页 5 条；
博彩外链 2 条（`tool1333`、`tool14961`）。

**结论：这 50 条没有一条能在「不虚构」的前提下写出 ≥700 字原创资料。** 按 SOP 第 20 条，
本批工具页宁可 0 条，也不用空素材凑数。工具页增量已连续 77 轮为 0（b77–b153）。

## 三、本批实际产出：教程页 9 条（25 → 34）

工具页路径闭合后，把产能放到「官方文档可取证」的教程页。素材全部来自官方站点，
`docs.openclaw.ai/<path>.md`、`cursor.com/docs/<path>.md` 直接返回干净 Markdown，
`llms.txt` 用于枚举路径（方法论第 29、31 条）。

| slug | 标题 | 正文字数 | 官方来源 |
|---|---|---|---|
| openclaw-feishu-official-doc | OpenClaw 飞书机器人配置教程：私聊策略、群策略与 @ 提及 | 1820 | `docs.openclaw.ai/channels/feishu/access-control` |
| openclaw-matrix-setup | OpenClaw 接 Matrix：homeserver 配置、autoJoin 与 E2EE 初始化 | 1761 | `docs.openclaw.ai/channels/matrix/setup` |
| openclaw-msteams-setup | OpenClaw 接 Microsoft Teams：teams CLI 注册、devtunnel 与 RSC 权限 | 1490 | `docs.openclaw.ai/channels/msteams/setup` |
| openclaw-wechat-plugin | OpenClaw 接入微信：腾讯官方 openclaw-weixin 插件的安装与扫码登录 | 1150 | `docs.openclaw.ai/channels/wechat` |
| openclaw-whatsapp-setup | OpenClaw 接 WhatsApp：插件安装、扫码配对与群策略 | 1000 | `docs.openclaw.ai/channels/whatsapp` |
| openclaw-security-audit | OpenClaw 安全审计：openclaw security audit 会查什么、怎么修 | 1291 | `docs.openclaw.ai/cli/security` |
| openclaw-memory-cli | OpenClaw 记忆管理：status、index、search、forget、promote 五条命令 | 1511 | `docs.openclaw.ai/cli/memory` |
| cursor-bugbot-guide | Cursor Bugbot 上手指南：PR 自动评审、检查状态与仓库接入 | 1275 | `cursor.com/docs/bugbot` |
| cursor-cli-guide | Cursor CLI 使用指南：交互模式、print 模式与会话续接 | 918 | `cursor.com/docs/cli/overview` |

其中 `openclaw-feishu-official-doc` 是**重写**而非新增：原正文 279 字，且 `url` 指向第三方镜像
`clawd.org.cn`（不在 SOP 允许的三类来源内），命令写成第三方的 `openclaw-cn`。本次改写为官方
`docs.openclaw.ai` 的访问控制与高级配置内容，标题、`url`、`thumbnail` 一并更正。

选择这类题目的理由：这 9 条都是「配置某个渠道 / 使用某个官方命令」的可验证主题，
每条都能在官方文档里找到具体命令、配置键与默认值，不需要任何使用体验叙述。
刻意避开了 `docs.openclaw.ai` 已标注为外部插件、且无正文页的 WeCom（正文仅 1183 B 导流页）。

## 四、自检

- 四条件通过 1127 == `tools.xml` 1127。
- 教程 ≥600 字 34 == `tutorials.xml` 34；`sitemap-index.xml` 含 `tutorials.xml`。
- 9 条新正文全部 ≥918 字，最短 918、最长 1820，均超过 600 门槛且远离边界。
- 20 字滑窗查重（语料 2377 篇 / 1,053,612 个窗口，**构造语料时排除待检条目自身**）：
  合计命中 102 个窗口，全部为命令名与配置键
  （`openclaw plugins install @openclaw/…`、`openclaw channels login --channel`、`per-account-channel-peer`），
  无整句重复。
- 红线词（实测 / 亲测 / 笔者 / 我们测试）：0；价格数字：0。
- 三处推断性表述已收紧：`session.dmScope` 那句改写、微信「换机扫码」与 WhatsApp「链接设备失效」
  改为机制描述 + 通常性表述，不写成结论。

## 五、口径

工具页 1127/1177 = 95.8%，待写 50 条，可索引页面合计 1127 + 34 + 15 = 1176。
本轮再次确认：**待写池不是「还没写」，而是「写不了」**。后续若仍按「工具页 15–20 条」派活，
产出会继续是 0；提示词里的「1210 / 35 / 1175」应改为实况「1177 / 1127 / 50」。
