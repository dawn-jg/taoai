# 第 88 批原创资料（2026-10-21）

## 结论

**本次新增 0 条，因素材/名称/重复等硬性原因跳过 52 条**（待写池已见底，52 条即全部剩余）。

累计可索引 1125 条，剩余待写 52 条 —— 与第 77–87 批完全一致。

## 基线

| 项目 | 数值 |
|---|---|
| 工具总数 | 1177 |
| 原创池（editorials 5 ∪ profiles 1121） | 1125 |
| 四条件通过数 | 1125 |
| `public/tools.xml` locs | 1125 |
| 待写（pending） | 52 |

自检：四条件通过数 1125 == `tools.xml` 1125 ✅；`apply-tool-profiles.mjs` 试算 1121 条全过、未匹配 0。

## 本批流程（四轮，全部完成）

1. `node scripts/content-queue.mjs --top 60 --json` → 待写池 52 条（脚本按 top 24 --save 已落 `data/content_queue.json`）。
2. 代理 curl 并发 6 路抓 52 条首页（`-H "Accept-Encoding: identity"`、浏览器 UA、`-m 25`）：
   **25 条 000 / 3 条空文件 / 2 条 404**。
3. 对正文 <200 字的 41 条做直连 Node fetch 复探：**24 条 `fetch failed`**，其余多为 SPA 壳（0–177 字）。
   形成「代理 000 ∧ 直连失败」双一致判死。
4. 对域名在线且名称干净的 8 条走 `r.jina.ai` 渲染读取（串行、间隔 3s、不带 UA）：
   `flow-studio` 200 但渲染出的是 FlowGPT 通用 explore 页（无 Flow Studio 事实）；
   `voxcraft-ai` 504；`tool66554` 42206 空文件；其余 5 条 422/超时。

## 52 条逐条判定

| # | slug | 名称 | 分桶 | 证据 |
|---|---|---|---|---|
| 1 | ai-bot | AI工具集 | E | 通用名，正文 13104 字但「含自身名」校验无意义 |
| 2 | voxcraft-ai | VoxCraft | A | 000；直连 failed；jina 504 nginx |
| 3 | yanqueai-com | AI LOGO设计工具 | B | 404，且名称为描述性短语 |
| 4 | telehire-ai | 最轻量级的全领域AI面试官 | A | 000；直连 failed；名称为描述性短语 |
| 5 | 6pen-art | 6pen Art | A | 000；直连 failed（历史为告别页） |
| 6 | flow-studio | Flow Studio | F | flowgpt.com/flow-studio 渲染后落到 FlowGPT 通用首页，无该产品专属事实 |
| 7 | miaohui-jixueai-com | 秒绘AI | D | 000；b86 查实域名现为「上海创大产控集团」企业官网 |
| 8 | miantuan-knowfuture-com-cn | 面团AI | A | 000；jina 422 |
| 9 | duiyou-ai | 堆友AI | E | designkit.cn 为美图设计室，库内已有 `d-design` 条 |
| 10 | seelesai-go-link | 全球首个端到端AI 3D游戏生成工具 | E | 名称为描述性长句；SPA 正文 0 字 |
| 11 | pagentia-com | AI专利查新检索与撰写平台 | A | 000；直连 failed |
| 12 | phind-com | Phind | B | 代理 404；直连 403「Just a moment...」CF 挑战 |
| 13 | photonaiclub-com | 光子AI | A | 000；jina 422 |
| 14 | humva-ai | Humva | A | 000；jina 422（导航超时） |
| 15 | ask-xiaoyuzhoufm-com | 小宇宙推出的AI搜索产品 | F | 200 但正文仅 20 字（播客下载落地页），名称为描述性短语 |
| 16 | writingpal-ai | WritingPal | A | 000；jina 422 |
| 17 | xanswer-com | 支持生成思维导图的免费AI搜索工具 | A | 000；直连 failed |
| 18 | photonaiclub-com-2 | 光子AI抠图 | E | 000；与 #13 同域同产品，重复条目 |
| 19 | moyin-com | 魔撰写作 | D | 302 到魔音工坊（AI 配音），名称与页面不符 |
| 20 | etna-7volcanoes-com | Etna | A | NXDOMAIN |
| 21 | hotshot-co | Hotshot | D | 已改为「AI Tools, Gadgets, Smart Home」评测博客，非原视频工具 |
| 22 | tool6840 | 360智绘 | D | 302 到 bangong.360.cn 会员权益页，正文 87 字 |
| 23 | tool2676 | 175FUN | A | 000；直连 failed；jina 422 |
| 24 | tool1333 | 创作王 | D | aiapp.cc 直连返回「qy球友会」博彩页（1727 字） |
| 25 | tool1957 | AIDesign | C | 000；域名解析到非公网 IP，腾讯 AIDesign 已下线 |
| 26 | tool1890 | Neeva | C | neeva.com 仅「Redirecting...」，产品已停运并入 Snowflake |
| 27 | tool701 | AI生成3D材质 | D | withpoly.com 已转型为云文件浏览器，名称为描述性短语 |
| 28 | tool479 | AI代码检查 | B | ai-code-reviewer.com 404，名称为描述性短语 |
| 29 | tool1079 | 阿里云登录 | F | m6.aliyun.com 为登录页（177 字），非产品页 |
| 30 | tool9412 | 阶跃星辰推出的AI聊天机器人和智能体平台 | E | maopaoya.com 000；与 `qwen` 条镜像重复 |
| 31 | tool11840 | 结构化AI知识搜索引擎 | A | 000；直连 failed |
| 32 | tool67595 | 论文降aigc-…-论文ai降重 | E | 名称关键词堆砌（>30 字），且与 tool14679 为同一落地页双域名 |
| 33 | tool1338 | 全能AI助手，基于Qwen模型 | E | dis.chatdesks.cn 仅 633 字节壳；与 `qwen` 重复 |
| 34 | tool11395 | 一站式用GPT-5.5、Claude-4.7 | E | flowith.paluai.com 仅 698 字节壳；与 `flowith` 镜像重复 |
| 35 | tool67775 | 在线大模型训练微调及AI科研学习平台 | A | 000；直连 failed |
| 36 | tool66554 | 造次 | A | 200 但 0 字节；jina 42206「空文件」 |
| 37 | tool71074 | 长视频精华提炼，自动追踪频道中文推送 | B | briefly.video 404「Project not found」 |
| 38 | tool67455 | 专注学术写作降AI率的工具 | F | 稿易 200 但正文 115 字；名称为描述性短语 |
| 39 | tool13251 | 字节跳动旗下推出的AI虚拟交友聊天平台 | A | chatwiz.cn 000；名称为描述性短语 |
| 40 | tool923 | AI 3D捕捉、建模和渲染 | E | lumalabs.ai 在线 2733 字，但名称为描述性短语，且与 `lumalabs-ai` 同域 |
| 41 | tool150 | AI高保真原型设计 | D | usegalileo.ai 已变 Stitch，正文 0 字 |
| 42 | tool67371 | AI面试助手\|AI笔试助手 | A | aimianshibang.com 000；名称含分隔符 |
| 43 | tool58825 | AI人才发现与分析平台，精准识别AI精英 | D | dinq.io 已变越南博彩站（KeoNhaCai） |
| 44 | tool33149 | AI设计工具，支持AI抠图、消除、无损放大 | A | ibihun.com 000；直连 failed |
| 45 | tool148 | BW188 | D | magician.design 已变冰淇淋店官网（Bordentown, NJ） |
| 46 | tool67418 | GetDraft | C | 正文 0 字，官方公告已停止运营 |
| 47 | tool3006 | LogoliveryAI — Free AI | C | 正文 131 字，仅清算公告 |
| 48 | tool14278 | MidReal | C | 首页官方告别信，sunset 并导流 Macaron |
| 49 | tool14961 | Redirecting... | D | fryderyk.ai 已变 NZ 赌场站 DegenCity Casino（19315 字） |
| 50 | tool111 | Reply Logo | D | codeium.com 现为 Devin Desktop，DB 名与页面完全不符（脏数据） |
| 51 | tool7424 | XPaper AI | A | 130ai.com 000；直连 failed |
| 52 | tool216 | Zyro AI Image Upscaler | C | 302 到 Hostinger《Zyro joins forces with Hostinger》公告 |

分桶合计：A 不可达/空壳 17、B 404/403/CF 4、C 停运/清算 6、D 易主/主题不符 11、E 同站重复·名称不合规 10、F 活站素材不足 4 = **52**。

## 本批新增证据（相对 b87）

- `tool1333`（创作王 / aiapp.cc）直连返回 **「qy球友会」博彩页**，代理侧是 403 空 body —— 比历史上记的「不可达」更进一步，属垃圾域名。
- `tool1890` Neeva 从未被前批单独取证，本批确认只有跳转壳，产品已停运。
- `flow-studio` 是本批唯一「渲染能出 16KB 正文」的条目，但内容是 FlowGPT 的 Prompt/Character 商店首页，
  与 `flow-studio` 路径无关（该路径已回落），不可据以撰写 Flow Studio。
- `tool66554`（造次）本轮首次确认是「200 + 0 字节 + jina 42206 空文件」，属 A 类。

## 处置建议（未执行，需人工确认）

本次未改动 `data/tools.json`、`data/tool_profiles.json` 与任何 sitemap，也未跑 `--apply` / `generate-sitemap`（无内容可合并，避免刷 lastmod）。

建议下一轮把任务目标改为**数据清理**，一次性解决这 52 条：

- 下线（死链/停运/垃圾域名/空壳）：A 17 + B 4 + C 6 + D 中的 `tool1333`、`tool58825`、`tool14961`、`tool148`、`tool6840` = **32 条**
- 合并（同站重复）：`duiyou-ai`、`photonaiclub-com-2`、`tool9412`、`tool67595`、`tool1338`、`tool11395`、`tool923` = **7 条**
- 修数据后重估：`tool111`（名/url 不符）、`tool1079`（登录页）、`tool701`、`tool150`、`tool216`、`tool111` 一类脏数据 = **5 条**
- 名称不合规需改名或下线：`ai-bot`、`seelesai-go-link`、`tool67371`、`yanqueai-com`、`telehire-ai`、`tool11840`、`tool13251`、`tool33149`、`tool67455`、`tool1079` = **8 条**（与上表有交叉）

另：`tutorials.xml` 至今不存在（0/56），是唯一还有增量空间的索引面，建议单独排一批教程页原创内容。

## 自检

- 四条件通过 1125 == `public/tools.xml` 1125 ✅
- `apply-tool-profiles.mjs` 试算：1121 条全过、未匹配 0 ✅
- 池内短正文/缺名/脏名 0、孤儿 0（沿用既有口径）
- 本次新增文件仅本报告；未提交 `build_cron_2026-10-07.log`（历史遗留未跟踪文件）
