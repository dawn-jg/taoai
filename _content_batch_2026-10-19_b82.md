# 第 82 批原创资料续写 · 实测报告（2026-10-19 下午）

## 一、结论

| 项 | 数值 |
|---|---|
| 本次新增原创资料 | **0 条** |
| 因素材缺失 / 页面失效 / 同站重复跳过 | **52 条**（＝全部待写条目） |
| 累计可索引工具页 | **1125 条**（未变） |
| 剩余待写 | **52 条** |
| 推送 | 仅本报告，数据文件与 sitemap 零改动 |

这是**连续第 12 批零产出**（b70=3、b71=2、b72–b76=0、b77=1、b78–b82=0）。

任务书设定的「本次 15–20 条」在本数据状态下**结构性不可达**：1177 条工具 ＝ 1125 条已在原创池 ＋ 52 条待写，
队列里不存在第 53 条候选。任务书「工具约 1210 条 / 可索引 35 条 / 待写约 1175 条」的前提在 b76 已被证伪，
当前口径为 **1177 / 1125 / 52**（可索引率 95.5%）。

## 二、基线（HEAD `cf1fe6b6`）

- `data/tools.json`：**1177** 条（根数组）
- 原创池（`editorials.json` 5 条 ∪ `tool_profiles.json.items` 1121 条）：**1125**
- `public/tools.xml`：**1125** 条
- `content-queue.mjs`：`total 1177 / done 1125 / pending 52`

## 三、本批方法

1. **全量存活探测**：代理 `127.0.0.1:7897`（先自检 `example.com` 200/0.48s）＋ 浏览器 UA ＋ `Accept-Encoding: identity`，
   `-m 25`，6 路并发，每条独立临时文件，取 `http_code / bytes / <title>`，52 条约 2 分钟跑完。
2. **兜底复核**：对全部 20 条 `000` 走渲染读取（`r.jina.ai`，串行、间隔 2–3s、不带 UA、`x-timeout: 25`）。
3. **名称—页面主题核对**：逐条比对 `<title>`／正文与 DB `name`，不符即作废（SOP §7-18）。
4. **官网寻址**：对「名称所指产品可能已换域名」的 2 条做站外检索，只用于确认官方域名，不作为正文来源。

## 四、52 条终判

### A. 域名不可达（18）— 代理 000，渲染读取 422 / 空

| 条目 | 实测 |
|---|---|
| `voxcraft-ai` | 000；jina 200 但仅 261B（nginx 504 错误页） |
| `telehire-ai`、`xanswer-com`、`writingpal-ai`、`humva-ai`、`etna-7volcanoes-com` | 000；jina `422` 域名无法解析 |
| `pagentia-com` | 000；jina 422（证书域名不匹配） |
| `photonaiclub-com`、`photonaiclub-com-2` | 000；jina 422 |
| `miantuan-knowfuture-com-cn` | 000；jina 422 |
| `tool11840`（Globe Explorer） | 000；jina 422，域名已摘除 |
| `tool1957`（AIDesign） | 000；jina 403 |
| `tool2676`、`tool7424`、`tool67775`、`tool33149`、`tool67371`、`tool13251` | 000；jina 422 |

### B. HTTP 404 / 403（5）

| 条目 | 实测 |
|---|---|
| `phind-com` | 404 / 107B（Vercel `DEPLOYMENT_NOT_FOUND`） |
| `yanqueai-com` | 404 / 555B |
| `tool479` | 404 / 0B |
| `tool71074` | 404 / 1.2KB（`Build incomplete`） |
| `tool1333` | 403 / 0B（b80 实为博彩站） |

### C. 停运 / 清算 / 告别页（5）

| 条目 | 实测 |
|---|---|
| `6pen-art` | 代理 000，但 jina 200/1423B＝2024-08 告别页，导流 `6pen.pro`（已关停） |
| `tool67418`（GetDraft） | 200 / 921B；正文「ceased operations」 |
| `tool3006`（Logolivery） | 200 / 2.5KB；正文「officially liquidated」 |
| `tool14278`（MidReal） | 200 / 84KB；正文为 sunset 信 |
| `tool1890`（Neeva） | 200 / 5.6KB；正文仅 `Redirecting...`（早已停服） |

### D. 域名易主 / 主题不符（10）

| 条目 | 实测 title |
|---|---|
| `miaohui-jixueai-com` | 创大产控 \| 科研经纪产业领军企业 |
| `tool58825` | KeoNhaCai（越南博彩） |
| `tool148` | The Ice Cream Boutique |
| `tool14961` | DegenCity Casino New Zealand |
| `flow-studio` | FlowGPT（全文已无 "Flow Studio"） |
| `hotshot-co` | Hotshot \| AI Tools, Gadgets, Smart Home（消费科技博客） |
| `tool6840`（360智绘） | 360AI办公 |
| `tool150` | Stitch（usegalileo 并站 Google Stitch） |
| `tool111` | Devin Desktop（codeium 已转 Devin） |
| `tool216` | Zyro Joins Forces With Hostinger |

### E. 同站 / 同产品重复（8）— 应合并，不写新正文

| 条目 | 重复对象（均已在原创池） | 本批证据 |
|---|---|---|
| `duiyou-ai`（堆友AI） | `d-design`（堆友AI反应堆）等 6 条 `d.design` 条目 | 官方站为 `https://d.design/`（实测 200），库内 url 误指向美图设计室 `designkit.cn`；**b81 归为「主题不符」，本批修正为「同站重复」** |
| `seelesai-go-link` | `tool14989`（SeeleAgent，seeles.ai） | 200 / 188KB，title＝Best No-Code AI Game Maker for 2D/3D Games |
| `moyin-com`（魔撰写作） | `tool1924`（魔音工坊） | 200 / 9.7KB，title＝魔音工坊 |
| `tool67455` | `tool36409`（稿易AI论文） | 200 / 5.8KB，同一产品 |
| `tool923` | `lumalabs-ai` | 200，Luma 已转 AI Agents |
| `tool11395` | `tool139`（Flowith，flowith.io） | `flowith.paluai.com` 为联盟镜像 |
| `tool1338` | `qwen` | `dis.chatdesks.cn` 为第三方镜像 |
| `tool9412` | `tool9802`（阶跃星辰） | `maopaoya.com` 非官方域名 |

### F. 名称 / 数据不合规（4）

| 条目 | 问题 |
|---|---|
| `ai-bot` | 通用名「AI工具集」，会使「正文含自身名」校验失效（任务书明令跳过） |
| `tool1079` | url 为阿里云登录页，名称「阿里云登录」属脏数据 |
| `tool701` | Poly 已转型 AI 云文件浏览器，「AI生成3D材质」无所指 |
| `tool67595` | 名称 30 字、含抓取残留结构，且与 66paper 同站重复 |

### G. 空壳 / 无实质内容（2）

| 条目 | 实测 |
|---|---|
| `tool66554`（造次） | 200 但 body 0 字节；jina `42206` 空文件 |
| `ask-xiaoyuzhoufm-com` | 200 / 28KB，仅 App 下载落地页 |

> 每条只归一类，合计 18 + 5 + 5 + 10 + 8 + 4 + 2 ＝ **52**，无遗漏无重复。

## 五、自检（独立复算，镜像 `isToolIndexable`）

```
tools.json        : 1177
pool              : 1125
4-cond pass       : 1125
tools.xml         : 1125
pool-fail 短正文  : 0
pool-fail 缺名    : 0
pool-fail 脏名    : 0
xml有池内无(孤儿) : 0
池内通过xml缺     : 0
tutorials.xml     : 不存在(0/56)
```

- 「原创池四条件通过数 == `tools.xml` 条数」＝ **1125 == 1125** ✅
- `generate-sitemap.mjs` 输出 `tools.xml 收录 1125/1177`、`tutorials.xml 0/56`、`news.xml 15/15`；
  仅 3 个 xml 的 `lastmod` 变动，已 `git checkout -- public/` 回退（沿用 b75 口径，不提交纯日期变动）。
- 52 条失败原因全部为「不在原创池」，与预期一致。

## 六、本批唯一新增认知

1. **「同站重复」比「主题不符」更常见，且两者的处置不同。** `duiyou-ai` 的 name 是真实产品（堆友AI），
   只是 url 被错配到美图设计室；一旦把 url 改回官方 `d.design`，它会与库内已有的 6 条 `d.design` 条目撞车——
   这类条目**不能靠「改名换 url」救活**（b77 手法的第三条失效证据），只能合并或下线。
2. **`jianying` 的 url 已修正为 `https://www.jianying.com/` 且在池内**，历史记录里的「指向即梦」已过期，本批据实更新认知。
3. **渲染读取对「死域名」的判据稳定**：本批 20 条 `000` 中 18 条 jina 返回 `422`（域名无法解析），
   仅 `6pen-art`（告别页）与 `voxcraft-ai`（504 页）返回内容且均不可写 → 与 b81 的三一致判死标准吻合。

## 七、建议（第 12 次）

1. **本自动化按原任务重跑，预期恒为 0**。待写池 52 条已被 b72–b82 用同一套证据连续判死，
   其中 40 条应下线 / 换 url、8 条应合并、4 条应修脏数据，**没有一条能写成合规原创资料**。
2. **真实增量只有两块，都不是「续写工具页」**：
   - ① **数据清理**：按第四节 A–D 共 **40 条下线**、E **8 条合并**、F **4 条修 name/url**。
     不增加可索引页，但能消掉 40 个「点进去是博彩站 / 冰淇淋店 / 告别信」的死链，对人工审核与 E-E-A-T 是净收益。
   - ② **教程页原创内容**：`public/tutorials.xml` 至今不存在（56 篇正文全部 <600 字，`generate-sitemap` 收录 0/56），
     且现有 56 篇 `content` 的外链多为 CSDN / 111cn / 腾讯新闻，属 SOP §1「不采集」的存量违规，
     是站内唯一还有 56 页空间的索引面。注意：其中「实测 / 横评」类选题（如 Seedance 2.0、GLM-5.1、Kimi K2.6 等）
     涉及未经验证的产品版本，改写时必须先核实产品是否真实存在，否则同样踩「不虚构」红线。
3. 若仍按原任务重跑：**直接做「52 条全量探测 → 渲染复核 → 名称主题核对 → 自检 → 如实上报 0 条」**，
   约 10 分钟出结论；不要再投入存档通道（`web.archive.org` 近五批均不可用）与逐条深挖。
