# 第 119 批原创资料生产记录（2026-10-29 凌晨）

## 一、基线自检（起始 HEAD `8d4ad5c4`，工作区干净）

| 指标 | 数值 |
|---|---|
| 工具条目总数 | 1177 |
| 原创内容池 | **1125**（editorials 5 ∪ tool_profiles 1121，重叠 1） |
| 四条件通过数 | **1125** |
| `public/tools.xml` 条数 | **1125** |
| 双向差集 | 0 / 0 |
| 池内四项失败（名称/字数/含名） | 0 / 0 / 0 |
| 待写（未入池） | **52** |

结论：`1125 == 1125 == 1125`，索引面自洽。`content-queue.mjs --top 24 --save` 零 diff，待写名单自 b92 起 **26 批未变**。

## 二、产出

**本次新增 0 条，因素材缺失/名称不可用跳过 52 条。**（连续第 49 批零产出）

`data/tools.json`、`data/tool_profiles.json`、`public/*.xml` 均零改动；本批未跑 `--apply` 与 `generate-sitemap`（无内容可合并，避免无谓刷新 lastmod）。

## 三、本批实测（新证据）

按 SOP §7.18 的三步兜底（直连 → 代理 curl + `--tls-max 1.2` → 渲染读取服务）对 12 个条目做了一轮实测，`--top 60` 取全量 52 条候选。代理通道确认可用（`google.com` 200）。

| 条目 | 实测结果 | 判定 |
|---|---|---|
| `tool67418` GetDraft | `r.jina.ai` 读到官网原文：**"GetDraft has ceased operations"** 停机公告，仅剩作品导出与退款/迁移入口 | 停运，不可写（**本批新发现**） |
| `6pen-art` 6pen Art | 渲染读取到官网告别页「是时候说再见了」（发布日 2024-08-15） | 停运，不可写 |
| `etna-7volcanoes-com` Etna | Cloudflare DoH `Status=3`（**NXDOMAIN**） | 域名已注销（**本批新确证**） |
| `tool2676` 175FUN | Cloudflare DoH `Status=3`（**NXDOMAIN**） | 域名已注销（**本批新确证**） |
| `tool7424` XPaper AI | 解析正常（182.16.68.99），但本机直连/代理均 000；第三方视角 `ERR_CONNECTION_REFUSED` | 服务已关闭（**本批新确证**） |
| `voxcraft-ai` VoxCraft | 解析正常（154.85.57.84），HTTP **504** | 网关无上游，不可写 |
| `humva-ai` Humva | 200 但正文仅 24 字，title = `Redirecting...` | 跳转壳，素材不足 |
| `tool923` Luma | 200 / 306 KB / 正文 2795 字（Luma Agents、Ray 3.2），产品存活 | 卡在 DB 名 `AI 3D捕捉、建模和渲染`（描述名，SOP §7.10），且官网已转向「创意智能体」，照旧名写即写过期事实 |
| `phind-com` Phind | 403（Cloudflare 拦截） | 无素材 |
| `tool479` AI 代码检查 | 404（Cloudflare） | 无素材 |
| `getdraft.ai` 全部子路径 | `/blog` `/docs` `/help` `/pricing` `/sitemap.xml` 均返回同一个 921 字节 SPA 壳 | 无服务端渲染内容可抓 |

补充：`ai-code-reviewer.com` 的 DNS 指向 Cloudflare（172.67.183.185 / 104.21.56.92），但页面 404，属已下线而非 DNS 问题。

## 四、52 条待写的处置分桶（沿用 b116/b117 口径 + 本批新证）

| 桶 | 条数 | 说明 |
|---|---|---|
| A 撞页·应合并入既有条目 | 5 | 如 `moyin-com`→`www.moyin.com`(tool1924)、`seelesai-go-link`→`tool14989`、`tool111`(名「Reply Logo」实为 Devin Desktop)、`tool6840`(aigc.360.com→bangong.360.cn)、`tool150`(usegalileo→Stitch) |
| B 名称本身不可用（语义层天然不可写） | 14 | 描述性名称 10 条（如「最轻量级的全领域AI面试官」「字节跳动旗下推出的AI虚拟交友聊天平台」）、通用名 2 条（`ai-bot`「AI工具集」、`yanqueai-com`「AI LOGO设计工具」）、关键词堆砌残留 `tool67595`、抓取残留 `tool3006` |
| C 已停运 / 空壳 / 易主 / 被拦 | 18 | 含本批新增 GetDraft 停运、6pen 告别页、MidReal 转 Macaron、zyro→hostinger、dinq.io→clepto.io 等 |
| D 域名已注销或不可达 | 11 | 含本批 NXDOMAIN 确证的 Etna、175FUN，及 ERR_CONNECTION_REFUSED 的 XPaper AI |
| E 博彩/诈骗落地页（合规风险） | 4 | `tool58825`→clepto.io（越南 KeoNhaCai）、`tool148`→magician.design、`tool14961`→fryderyk.ai（DegenCity）、`tool1333`→aiapp.cc（qy球友会） |
| **合计** | **52** | |

其中 A+B 共 19 条（37%）属**离线性不可写**——即使网络恢复也写不出合规正文；C+D+E 共 33 条的存活率已在 b113–b119 共 6 轮抓取中逐条证伪，23 次复核 0 次翻转。

## 五、结论与待决策

1. **工具页索引面 1125（95.6%）是双重封顶**：语义层 37% 的待写条目名称本身就违反 SOP §7.10；网络层余量已被 6 类通道（直连 / 代理 curl / 渲染读取 / 官方子页 / sitemap 枚举 / Wayback 归档）逐条耗尽。
2. **按当前任务口径重跑，产能恒为 0。** b77–b119 共 43 轮零产出，本批新增的 5 个硬证据（1 个停运公告、2 个 NXDOMAIN、1 个 CONNECTION_REFUSED、1 个 404）**全部指向「下线」而非「可写」**。
3. **唯一能继续抬升索引面的路径不在工具页**：
   - ① **教程页 56 条补正文**（+56，1125→1181）。现状 min/med/max = 145/232/316 字，≥600 为 **0**，且无 `tutorials.xml`；另有 8 条标题含「实测/亲测」需先改口径。这是目前唯一成规模的增量面。
   - ② 2 条改名后可写（`tool923`→`Luma`、`ask-xiaoyuzhoufm-com`→`小宇宙 AI 搜索`，+2）。
   - ③ 52 条清理（下线约 40 / 合并 5 / 博彩 4 强制下线，1177→约 1132），可顺带移出现网 4 个博彩外链——这是**合规优先级高于 SEO 优先级的动作**。
4. 以上三项均为数据/范围变更，需授权后执行。若维持现任务不变，建议把本自动化降为**每周一次巡检**（只跑第一节四条件自检），避免持续空跑。
