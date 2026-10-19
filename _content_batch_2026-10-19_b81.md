# 第 81 批原创资料续写 · 实测报告（2026-10-19 上午）

## 一、结论

| 项 | 数值 |
|---|---|
| 本次新增原创资料 | **0 条** |
| 因素材缺失 / 页面失效跳过 | **52 条**（＝全部待写条目） |
| 累计可索引工具页 | **1125 条**（未变） |
| 剩余待写 | **52 条** |
| 推送 | 仅批次报告，数据文件零改动 |

这是**连续第 11 批零产出**（b70=3、b71=2、b72–b76=0、b77=1、b78–b81=0）。

任务书设定的「本次 15–20 条」在本数据状态下**不可能达成**，原因是结构性的：1177 条工具 ＝ 1125 条已在原创池 ＋ 52 条待写，
队列里不存在第 53 条候选。这 52 条已被 b72–b81 连续用同一套证据判死，本批再次全量复核，结论未变。

## 二、基线（HEAD `97635a43`）

- 工具条目：**1177** 条（`data/tools.json` 为根数组）
- 原创池（`editorials.json` 5 条 ∪ `tool_profiles.json.items` 1121 条）：**1125**
- `public/tools.xml`：**1125** 条
- `content-queue.mjs --top 60 --json`：`total 1177 / done 1125 / pending 52`

## 三、方法

1. **全量存活探测**：代理 `127.0.0.1:7897`（先行自检 `example.com` 200/0.39s）＋ 浏览器 UA ＋ `Accept-Encoding: identity`，
   `-m 25`，6 路并发，**每条独立临时文件**（避免 `<title>` 串行错位），取 `http_code / bytes / <title>`，52 条约 2 分钟跑完。
2. **兜底复核**：对 `000`、`200 但 0 字节`、`403` 三类走 `r.jina.ai`（串行、间隔 3s、不带 UA、`x-timeout: 25`）。
3. **名称—页面主题核对**：逐条比对 `<title>` / 正文与 DB 里的 `name`，不符即作废（SOP §7-18）。

## 四、52 条终判（逐条）

### A. 域名不可达（20）→ 建议下线或修 url

| 条目 | 实测 | 判定 |
|---|---|---|
| `voxcraft-ai` | 代理 000；jina 返回 **504 nginx Gateway Time-out** | 站点服务端不可用 |
| `telehire-ai` | 000；jina `42203 Domain could not be resolved` | 域名已从 DNS 摘除 |
| `6pen-art` | 代理 000；**jina 可读**，仍是 2024-08「新的篇章 · 是时候说再见了」致谢页，导流 6pen.pro（另查已关停） | 产品终止 |
| `miantuan-knowfuture-com-cn` | 000；jina 25s 超时 | 不可读 |
| `pagentia-com` | 000；jina `ERR_CERT_COMMON_NAME_INVALID` | 证书失效 |
| `photonaiclub-com` | 000；jina 25s 超时 | 不可读 |
| `photonaiclub-com-2` | 000 | 不可达 |
| `humva-ai` | 000；b80 jina 域名无法解析 | 域名停放 |
| `writingpal-ai` | 000；b80 jina 域名无法解析 | 不可达 |
| `xanswer-com` | 000；b80 jina 域名无法解析 | 不可达 |
| `etna-7volcanoes-com` | 000 | 不可达 |
| `tool2676`（175FUN） | 000 | 不可达 |
| `tool1957`（AIDesign） | 000 | 不可达 |
| `tool9412` | 000，且与 `tool9802` 同产品 | 不可达＋重复 |
| `tool11840` | 000 | 不可达 |
| `tool67775` | 000 | 不可达 |
| `tool13251` | 000（chatwiz.cn） | 不可达 |
| `tool67371` | 000（aimianshibang.com） | 不可达 |
| `tool33149` | 000（ibihun.com） | 不可达 |
| `tool7424`（XPaper AI） | 000（130ai.com） | 不可达 |

### B. HTTP 404 / 403（5）→ 建议下线

| 条目 | 实测 | 判定 |
|---|---|---|
| `yanqueai-com` | 404 nginx | 站点已撤 |
| `phind-com` | **404 / 107B** | Vercel `DEPLOYMENT_NOT_FOUND`，服务已停 |
| `tool479` | 404 / 0B | 站点已撤 |
| `tool71074` | 404 / 1.2KB | `Build incomplete` 占位页 |
| `tool1333` | 403 / 0B | b80 实为博彩站「球友会体育」 |

### C. 停运 / 清算 / 告别页（4）→ 建议下线

| 条目 | 实测 | 判定 |
|---|---|---|
| `tool67418`（GetDraft） | 200 壳；jina 正文＝「**GetDraft has ceased operations**」 | 已停运 |
| `tool3006`（LogoliveryAI） | 200 / 2.5KB，`<title>` 仍是产品名，正文＝「Logolivery, Inc. has been officially **liquidated**」 | 已清算 |
| `tool14278`（MidReal） | 200 / 84KB，`<title>` 仍是 legacy「Free AI Story Generator」，正文＝ A Letter to Our MidReal Community（sunset，转向 Macaron） | 已关停 |
| `tool1890`（Neeva） | 200 / 5.6KB，正文仅 `Redirecting...` | 早已停服 |

### D. 域名易主（4）→ 建议下线

| 条目 | 实测 title | 判定 |
|---|---|---|
| `miaohui-jixueai-com` | 创大产控 \| 科研经纪产业领军企业 | 易主为企业站 |
| `tool58825` | KeoNhaCai - Tỷ Lệ Kèo Nhà Cái 5 | 沦为越南博彩站 |
| `tool148` | The Ice Cream Boutique | 易主为冰淇淋店 |
| `tool14961` | DegenCity Casino New Zealand | 沦为赌场站 |

### E. 主题不符 / 产品线消失（7）→ 建议下线或换 url

| 条目 | 实测 | 判定 |
|---|---|---|
| `flow-studio` | 200 / 311KB，title＝FlowGPT；**全文检索无 "Flow Studio" 字样** | 该产品线已从官网消失（本批新增硬证据） |
| `duiyou-ai` | 200，title＝美图设计室 | 名称「堆友AI」与 designkit.cn 不是同一产品 |
| `hotshot-co` | 200 / 450KB，消费科技博客 | 非同名 AI 视频工具，实体不同 |
| `tool6840`（360智绘） | 200，title＝360AI办公 | 产品线改为 AI 办公 |
| `tool150` | 200，title＝Stitch | usegalileo 已并站到 Google Stitch |
| `tool111`（Reply Logo） | 200，title＝Devin Desktop | codeium.com 已转为 Devin |
| `tool216` | 200，Zyro Joins Forces With Hostinger | 图片放大工具线已撤 |

### F. 同站 / 同产品重复（7）→ 建议合并，不写新正文

| 条目 | 重复对象 | 说明 |
|---|---|---|
| `seelesai-go-link` | `tool14989` | 短链 302→`www.seeles.ai`，同产品已在池内 |
| `moyin-com`（魔撰写作） | `tool1924`（魔音工坊） | `x.moyin.com` 实测为魔音工坊 |
| `tool67455` | `tool36409` | 稿易，同产品已在池内 |
| `tool923` | `lumalabs-ai` | Luma 已转 AI Agents，3D 采集线下线 |
| `tool67595` | 66paper 同站 | 名称 30 字卡在门槛边缘，且同站重复 |
| `tool11395` | Flowith | `flowith.paluai.com` 为联盟镜像 |
| `tool1338` | — | `dis.chatdesks.cn` 为第三方镜像，非官方域名 |

### G. 名称 / 数据不合规（3）→ 建议修数据

| 条目 | 问题 |
|---|---|
| `ai-bot` | 通用名「AI工具集」，会让「正文含自身名」校验失效（任务书明令跳过） |
| `tool1079` | url 为阿里云登录页，名称「阿里云登录」属脏数据 |
| `tool701` | Poly 已转型 AI 云文件浏览器，「AI生成3D材质」无所指 |

### H. 无实质内容（2）→ 建议下线

| 条目 | 实测 | 判定 |
|---|---|---|
| `tool66554`（造次） | 200 但 **body 0 字节**；jina `42206 Unexpected empty file` | 服务端对一切抓取方返回空 |
| `ask-xiaoyuzhoufm-com` | 200，仅 App 下载落地页 | 无 AI 搜索功能说明，无可引用事实 |

## 五、自检

独立复算（镜像 `isToolIndexable`，不依赖脚本输出）：

- 原创池 **1125** ＝ 四条件通过 **1125** ＝ `public/tools.xml` **1125** ✅
- 池内未通过 0（短正文 0 / 缺名 0 / 脏名 0）
- `tools.xml` 有而池内无 0；池内通过但 sitemap 缺 0；池内孤儿 0
- 52 条失败原因全部为「不在原创池」，与预期一致

数据文件（`tools.json`、`tool_profiles.json`、`public/*.xml`、`content_queue.json`）**零改动**；
未跑 `apply --apply` 与 `generate-sitemap`（无内容可合并，跑只会刷 `lastmod`）。

## 六、⭐ 方法论修正（本批唯一新增认知）

**「代理 curl 返回 000」不能直接判死。** `6pen-art` 本批代理 000、直连也 000，但 `r.jina.ai` 却能正常读取到 2024-08 的
告别页——说明 000 混有「站点 TLS 抖动」「代理节点被墙」「服务端限流」多种原因。因此判死必须满足
**代理 000 ∧ 直连 000 ∧ jina 空/ERR/超时 三者一致**，且 jina 若拿到正文还要做一次「名称—主题」核对。
本批据此把 `6pen-art` 从「不可达」改判为「产品终止」——两者动作相同（下线），但证据等级不同。

另：`tool3006`、`tool14278` 这类「`<title>` 仍是产品名、正文已换成告别信」的页面最容易骗过自动核对，
**必须读正文首段**，不能只看 title 与字节数。

## 七、建议（第 11 次，方向已无争议）

1. **本自动化不应再按原任务重跑**。原始前提（1210 条 / 可索引 35 条 / 待写 1175 条）在 b76 已被证伪，
   当前是 1177 / 1125 / 52，可索引率 95.5%，剩余 52 条的「在运营 ∧ 名称干净 ∧ 无同站重复 ∧ 有官方可引页」交集为 **0**。
2. **可执行的两条真实增量路线**：
   - ① **数据清理**（可直接按本报告第四节执行）：A+B+C+D+E 共 **40 条下线**、F **7 条合并**、G **3 条修 name/url**。
     不增加可索引页数，但能消掉站内 40 个「点进去是博彩站/冰淇淋店/告别信」的死链，对 E-E-A-T 与人工审核是净收益。
   - ② **教程页原创内容**：`public/tutorials.xml` 至今**不存在**（56 篇全部正文 <600 字，`generate-sitemap` 收录 0/56，
     因此不生成该文件、也不进 `sitemap-index.xml`）。这是站内**唯一还有 56 页空间**的索引面，且现有 56 篇的 `content`
     外链多为 CSDN，本身违反 SOP §1「不采集」，属于必须整改的存量问题。
3. 若仍按原任务重跑：直接「52 条全量探测 → 三类兜底复核 → 名称主题核对 → 自检 → 如实上报 0 条」，
   预期恒 0，不要再投入存档通道（`web.archive.org` 近四批均不可用）与逐条深挖。
