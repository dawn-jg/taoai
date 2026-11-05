# 第 148 批原创内容生产（2026-11-05）

## 一、基线

| 项目 | 数值 |
|---|---|
| 工具总数 | 1177 |
| 原创池 | 1127（profiles 1127 + editorials 5，重叠 5，并集 1127） |
| 四条件通过 | 1127 |
| `public/tools.xml` | 1127（✅ 与四条件一致） |
| 待写队列 | 50 |
| 起始 HEAD | `fc0f46d6`（干净，HEAD == origin/main） |

`content-queue --top 24 --save` 输出的 24 条与前 52 批逐条一致（零 diff）：仍是同一批已被证伪的域名。

## 二、待写队列：24 条三通道复核，可写 0 条

**通道 ① 直连（`--force` 强制重抓 24 条）**：成功 8 条，逐条核对后全部不可用。

| slug | 返回 | 定性 |
|---|---|---|
| `ai-bot` | 200 | 通用名「AI工具集」，硬约束排除项（会让「含自身名」校验失效） |
| `duiyou-ai` | 200 | 站点实为「美图设计室」，与 DB 名「堆友AI」不符 |
| `ask-xiaoyuzhoufm-com` | 200 | 仅 23 字壳页（「听播客，上小宇宙」） |
| `moyin-com` | 200 | 仅 24 字；`x.moyin.com` 实为「魔音工坊」，而同站已有 `www.moyin.com` 的「魔音工坊」条目，属重复 |
| `hotshot-co` | 200 | 域名已易主为数码评测博客（1232 字导航正文） |
| `tool1333` | 200 | 已变博彩站「qy球友会」，清理第一档 |
| `tool6840` | 200 | 94 字「无痕模式」提示壳，title 已是「360AI办公」，与 DB 名「360智绘」不符 |
| `seelesai-go-link` | 200 | 跳转短链，落点正文仅 35 字 |

其余 16 条 `fetch failed`（`phind-com` 为 403 Cloudflare 挑战页），与前 6 批记录一致，无翻转。

**通道 ② 代理 + curl（`--tls-max 1.2`，proxy_test=204）**：15 个 URL → 200×0、403×2（`phind-com`、`flow-studio`，均为 CF 挑战页）、
404×1（`yanqueai-com`，站点已撤）、000×12。与 b145 的 21×000 相比无实质变化。

**通道 ③ 渲染读取（`r.jina.ai`，2 路 3 秒间隔，不带 UA）**：12 个 URL，全部拿到定性结论。

| slug | 返回 | 定性 |
|---|---|---|
| `humva-ai` | ParkLogic 停放页 | **本批新增硬证据**：域名停放待售（b145 记「24 字符跳转壳」→ 现升级为易主/停放） |
| `voxcraft-ai` | 504 Gateway Time-out | 站点故障，**不判死** |
| `xanswer-com` | 42205 `EAI_AGAIN` | 无公共解析（b145 已判死） |
| `photonaiclub-com` | 42205 `EAI_AGAIN` | 无公共解析（b145 已判死） |
| `telehire-ai` / `etna-7volcanoes-com` / `tool2676` | 42203 | 域名无法解析（b145 已判） |
| `6pen-art` | 1422 B「致谢与新篇章」 | 已下线告别页（b146 已判） |
| `miaohui-jixueai-com` | 「创大产控」科研经纪 | 子域被挪用，名实不符（b146 已判） |
| `miantuan-knowfuture-com-cn` / `writingpal-ai` | 42206 超时/导航失败 | 站点不响应，不判死 |
| `pagentia-com` | 42206 `ERR_CERT_AUTHORITY_INVALID` | 证书不匹配，不判死 |

> 结论：待写池 50 条逐条均有定性，**新增工具页 0 条**（连续第 77 批）。

## 三、本批实质产出：三条错误 URL 修正（索引面内）

按「url 形态」对全库 1177 条做一次扫描（`.exe/.dmg/.apk`、埋点短链 `/r/xxx`、联盟域名 `partnerlinks`、
`go.link`、带 `#/` 的登录页等），定位到 3 条**指向错误目的地**且已在索引面内的条目：

| slug | 原 url | 新 url | 依据 |
|---|---|---|---|
| `tool26420` | `ima-app.image.myqcloud.com/win_channel/ima.copilot_win_x64_…_3835.exe` | `https://ima.qq.com/` | 原值是 Windows 安装包直链，用户点击即下载；`ima.qq.com` 实测 200，title「ima - 腾讯AI知识管家」，与该页正文、`sources[]` 一致 |
| `tool3433` | `kebuxi.datasink.sensorsdata.cn/r/dF` | `https://fabrie.com/` | 原值是神策埋点短链；`fabrie.com` 实测 200，title「Fabrie - Online collaboration platform for designers」 |
| `tool9548` | `deepgram.partnerlinks.io/ai-bot` | `https://deepgram.com/` | 原值是带 `ai-bot` 后缀的联盟跳转域（疑从第三方搬运时带入）；`deepgram.com` 实测 200，与该页 `sources[]` 一致 |

同步修正 3 条的 `domain` 字段并更新 `updatedAt`，共 9 处字段变更（`git diff --stat`：9 insertions / 9 deletions，仅此 3 条）。

**顺带核销一条疑点**：`muse-meta` 的 url 是 `muse.ai`、`sources[]` 却是 `ai.meta.com/muse/`，看似名实不符。
实测两个地址都是 Meta 的同一产品（`muse.ai` title「Muse — Your Personal AI Agent」，`ai.meta.com/muse/` title
「Muse: Meta's personal AI agent」），**url 无需修改**，后续批次不必再查。

## 四、本批新发现：索引面内 198 条「句子式名称」

复核四条件时注意到一个它们**结构上拦不住**的问题：门槛只校验「名称长度/脏字符」，不校验「名称是不是产品名」。
全库统计（仅统计已进索引面、且有原创资料的条目）：

- 名称含「推出的 / 一款 / 的AI / 免费…的」等描述性句式的：**198 条**
- 名称以「工具 / 平台 / 系统」结尾且长度 ≥9 的：**196 条**（与上组高度重叠）

典型样本：`lumalabs-ai`=「Luma AI推出的AI视频生成工具」、`tool7012`=「高效的AI PPT生成工具」、
`tool66082`=「夸克团队推出的AI PPT生成工具」、`tool12586`=「免费的AI视频生成和图像创作平台」。

这类名称在索引面里占比约 17.6%，页面 `<title>`/H1 读起来是一句关键词描述而非产品名，
且多页共用同一句式（「…推出的AI…工具」），正是 AdSense 判定「scaled content」时会看的模式特征。
它们能通过四条件，是因为正文当初就是照着这个名字写的（正文里确实出现了这个长名）。

**处置建议（需授权，属改名而非补内容）**：按 50 条/批分批把 `name` 改为真实产品名，并同步替换正文首段的
「「<长名>」指的是…」句式；不改 slug，不动 url，索引面数量不变（改名后仍满足四条件）。
前置校验：改名后 `正文是否含新名` 需重算，`apply-tool-profiles` 试算可用于逐条确认。

## 五、自检

| 项目 | 结果 |
|---|---|
| 工具总数 | 1177（未变） |
| 原创池 | 1127 |
| 四条件通过 | 1127 |
| `public/tools.xml` | 1127 ✅（1127 == 1127） |
| 池内失败 | 名称 0 / 字数 0 / 含自身名 0 |
| 新增正文 | 0 条（无 `tool_profiles.json` 变更） |
| `data/tools.json` 变更 | 3 条 × 3 字段（url / domain / updatedAt） |

`--apply` 与 `apply-tool-profiles` 未执行：本批没有新增原创资料，`tool_profiles.json` 零改动。

## 六、结论（第 77 次）

- 工具页可写池 **0**，索引面上限 1127/1177 = **95.8%**，b77–b148 共 72 轮无翻转。
- 待写 50 条中：博彩/易主/停放 6 条（`tool1333`、`tool148`、`tool14961`、`tool58825`、`hotshot-co`、`humva-ai`），
  域名已无解析 8 条，停运/告别页 3 条，重复项 3 条（`tool150`、`tool67595`、`moyin-com`），
  名实不符/脏数据 6 条，纯空壳或 CF 拦截其余。
- 后续唯一能改变索引面数字的两条路：① 教程页 56 条补正文（`tutorials.xml` 现收录 0，需先改 8 条「实测/亲测」标题口径）；
  ② 50 条清理（下线后分母降到 ≈1127，覆盖率 ≈100%）。
- 本批的实际价值在「不再新增空转」：3 条错链修复 + 198 条句子式名称的量化 + `humva-ai` 停放定性。
