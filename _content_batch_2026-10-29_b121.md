# 第 121 批原创资料生产记录（2026-10-29 午间）

## 一、基线自检（起始 HEAD `ce584f6a`，工作区干净）

| 指标 | 数值 |
|---|---|
| 工具条目总数 | 1177 |
| 原创内容池 | **1125**（editorials 5 ∪ tool_profiles 1121，重叠 1） |
| 四条件通过数 | **1125** |
| `public/tools.xml` 条数 | **1125** |
| 双向差集（xml 多 / 池多） | 0 / 0 |
| 池内四项失败（名称 / 字数 / 含名） | 0 / 0 / 0 |
| `apply-tool-profiles` 试算 | 应用 1121 条，未匹配 slug 0 |
| 待写（未入池） | **52** |

结论：`1125 == 1125 == 1125`，索引面自洽。`content-queue.mjs --top 24 --save` **零 diff**，待写名单自 b92 起 **28 批未变**（`generatedAt` 仍为 2026-10-29，total 1177 / done 1125 / pending 52）。

## 二、产出

**本次新增 0 条，因素材缺失 / 名称不可用跳过 52 条。**（连续第 51 批零产出）

`data/tools.json`、`data/tool_profiles.json`、`public/*.xml` 均零改动；本批**未跑** `--apply` 与 `generate-sitemap`（无内容可合并，避免无谓刷新 lastmod）。

## 三、本批实测：51 个唯一域名做 Cloudflare DoH 全量存活复核

b119 只抽样 12 条，本批**首次对全部待写条目的落地域名做完整复核**（51 个唯一域名，`https://cloudflare-dns.com/dns-query`，经代理 + `--tls-max 1.2`）。

| 结果 | 条数 | 含义 |
|---|---|---|
| `Status=0` 解析正常 | **43** | 域名仍存在，瓶颈不在 DNS |
| `Status=3` NXDOMAIN | **6** | 公共 DNS 已无此域名（注销硬证据） |
| `Status=2` SERVFAIL | **2** | 权威 NS 有记录但解析失败 |

NXDOMAIN 6 个：`175.fun`、`etna.7volcanoes.com`、`aimianshibang.com`、`telehire.ai`、`maopaoya.com`、`ibihun.com`。
SERVFAIL 2 个：`chatwiz.cn`、`xanswer.com`。

**与历次记录的差异（本批新增/变更）**：

1. **新增 NXDOMAIN 2 个**：`maopaoya.com`（`tool9412` 阶跃星辰…）、`ibihun.com`（`tool33149` AI设计工具…）——两条名称本就属描述性不可写，**不影响索引面**。
2. **`xanswer.com` 状态恶化**：b117 记为 `EAI_AGAIN`，本批为 SERVFAIL（NS 在、解析失败），从「疑似注销」改为「解析异常」，性质仍是不可抓取。
3. **`photonaiclub.com` 由 `EAI_AGAIN` 变为 `Status=0`（无 A 记录返回）**：b117 判其「公共 DNS 已不存在」**不成立**，只能确认「当前无可用 A 记录」，不构成站点存活证据。
4. **`ailogo.qq.com` 解析到 `0.0.0.1`**：空路由，即腾讯侧已主动摘除该子域（`tool1957` AIDesign）。
5. **0 个域名复活**：43 个解析正常的域名里，没有一个是此前判「已死」后又恢复可用的。**「已死即死」结论第 24 次成立，本批未获得任何新可写候选。**

## 四、52 条待写条目完整清单（离线名称判定 × DNS 现状）

离线判定为脚本粗筛（名称长度 / 残留符号 / 通用名 / 品类名 / 堆砌残留正则），**逐条仍需人工复核，见第五节修正**。

| slug | 名称 | 域名 | DNS | 离线名称判定 |
|---|---|---|---|---|
| `ai-bot` | AI工具集 | ai-bot.cn | 200 解析 | 通用名 |
| `ask-xiaoyuzhoufm-com` | 小宇宙推出的AI搜索产品 | ask.xiaoyuzhoufm.com | 200 解析 | 描述性/品类名 |
| `moyin-com` | 魔撰写作 | x.moyin.com | 200 解析 | 描述性/品类名 |
| `pagentia-com` | AI专利查新检索与撰写平台 | pagentia.com | 200 解析 | 描述性/品类名 |
| `seelesai-go-link` | 全球首个端到端AI 3D游戏生成工具 | seelesai.go.link | 200 解析 | 描述性/品类名 |
| `telehire-ai` | 最轻量级的全领域AI面试官 | telehire.ai | **NXDOMAIN** | 描述性/品类名 |
| `tool1079` | 阿里云登录 | m6.aliyun.com | 200 解析 | 抓取残留；描述性/品类名 |
| `tool11395` | 一站式用GPT-5.5、Claude-4.7 | flowith.paluai.com | 200 解析 | 描述性/品类名；堆砌残留 |
| `tool11840` | 结构化AI知识搜索引擎 | explorer.globe.engineer | 200 解析 | 描述性/品类名 |
| `tool13251` | 字节跳动旗下推出的AI虚拟交友聊天平台 | chatwiz.cn | SERVFAIL | 描述性/品类名 |
| `tool1338` | 全能AI助手，基于Qwen模型 | dis.chatdesks.cn | 200 解析 | 描述性/品类名 |
| `tool14961` | Redirecting... | fryderyk.ai | 200 解析 | 抓取残留 |
| `tool150` | AI高保真原型设计 | usegalileo.ai | 200 解析 | 描述性/品类名 |
| `tool33149` | AI设计工具，支持AI抠图、消除、无损放大 | ibihun.com | **NXDOMAIN** | 描述性/品类名 |
| `tool58825` | AI人才发现与分析平台，精准识别AI精英 | dinq.io | 200 解析 | 描述性/品类名 |
| `tool67371` | AI面试助手 / AI笔试助手 | aimianshibang.com | **NXDOMAIN** | 描述性/品类名 |
| `tool67455` | 专注学术写作降AI率的工具 | gaoyiai.com | 200 解析 | 描述性/品类名 |
| `tool67595` | 论文降aigc-论文aigc降重-AI痕迹降低-论文ai降重 | aigc.66paper.cn | 200 解析 | 堆砌残留 |
| `tool67775` | 在线大模型训练微调及AI科研学习平台 | lab4ai.cn | 200 解析 | 描述性/品类名 |
| `tool71074` | 长视频精华提炼，自动追踪频道中文推送 | briefly.video | 200 解析 | 描述性/品类名 |
| `tool923` | AI 3D捕捉、建模和渲染 | lumalabs.ai | 200 解析 | 描述性/品类名 |
| `tool9412` | 阶跃星辰推出的AI聊天机器人和智能体平台 | maopaoya.com | **NXDOMAIN** | 描述性/品类名 |
| `xanswer-com` | 支持生成思维导图的免费AI搜索工具 | xanswer.com | SERVFAIL | 描述性/品类名 |
| `yanqueai-com` | AI LOGO设计工具 | yanqueai.com | 200 解析 | 描述性/品类名 |
| `6pen-art` | 6pen Art | 6pen.art | 200 解析 | 名称可用 |
| `duiyou-ai` | 堆友AI | designkit.cn | 200 解析 | 名称可用 |
| `etna-7volcanoes-com` | Etna | etna.7volcanoes.com | **NXDOMAIN** | 名称可用 |
| `flow-studio` | Flow Studio | flowgpt.com | 200 解析 | 名称可用 |
| `hotshot-co` | Hotshot | hotshot.co | 200 解析 | 名称可用 |
| `humva-ai` | Humva | humva.ai | 200 解析 | 名称可用 |
| `miantuan-knowfuture-com-cn` | 面团AI | miantuan.knowfuture.com.cn | 200 解析 | 名称可用 |
| `miaohui-jixueai-com` | 秒绘AI | miaohui.jixueai.com | 200 解析 | 名称可用 |
| `phind-com` | Phind | phind.com | 200 解析 | 名称可用 |
| `photonaiclub-com` | 光子AI | photonaiclub.com | 200 解析 | 名称可用 |
| `photonaiclub-com-2` | 光子AI抠图 | photonaiclub.com | 200 解析 | 名称可用 |
| `tool111` | Reply Logo | codeium.com | 200 解析 | 名称可用 |
| `tool1333` | 创作王 | aiapp.cc | 200 解析 | 名称可用 |
| `tool14278` | MidReal | midreal.ai | 200 解析 | 名称可用 |
| `tool148` | BW188 | magician.design | 200 解析 | 名称可用 |
| `tool1890` | Neeva | neeva.com | 200 解析 | 名称可用 |
| `tool1957` | AIDesign | ailogo.qq.com | 200 解析 | 名称可用 |
| `tool216` | Zyro AI Image Upscaler | zyro.com | 200 解析 | 名称可用 |
| `tool2676` | 175FUN | 175.fun | **NXDOMAIN** | 名称可用 |
| `tool3006` | LogoliveryAI — Free AI | logolivery.ai | 200 解析 | 名称可用 |
| `tool479` | AI代码检查 | ai-code-reviewer.com | 200 解析 | 名称可用 |
| `tool66554` | 造次 | zaoci.tv | 200 解析 | 名称可用 |
| `tool67418` | GetDraft | getdraft.ai | 200 解析 | 名称可用 |
| `tool6840` | 360智绘 | aigc.360.com | 200 解析 | 名称可用 |
| `tool701` | AI生成3D材质 | withpoly.com | 200 解析 | 名称可用 |
| `tool7424` | XPaper AI | 130ai.com | 200 解析 | 名称可用 |
| `voxcraft-ai` | VoxCraft | voxcraft.ai | 200 解析 | 名称可用 |
| `writingpal-ai` | WritingPal | writingpal.ai | 200 解析 | 名称可用 |

统计：粗筛**名称不可用 24 条 / 名称可用 28 条**。

## 五、人工修正：粗筛的 7 处偏差（写进授权包的执行口径）

| 类型 | 条目 | 修正 |
|---|---|---|
| 误报（实为产品名） | `moyin-com` 魔撰写作 | 尾部「写作」误触发品类名规则 → **名称可用** |
| 漏报（纯品类名） | `tool701` AI生成3D材质（withpoly.com）、`tool479` AI代码检查（ai-code-reviewer.com） | 名称就是功能描述，正文「含自身名」校验会失去意义 → **不可写** |
| 漏报（抓取残留） | `tool3006` LogoliveryAI — Free AI | 破折号 +「Free AI」是抓取拼接残留 → **不可写** |
| 漏报（名称与落地不符） | `tool148` BW188（落地 magician.design）、`tool111` Reply Logo（落地 codeium.com） | 名称与落地产品对不上，属脏数据 → **不可写** |
| 同域名重复 | `photonaiclub-com-2` 光子AI抠图 与 `photonaiclub-com` 光子AI | 同域名同产品两条 → **合并为一条**（且该域名当前无可用 A 记录） |

修正后口径：**离线不可写 29 条**（通用名/描述名/残留/脏数据/重复），**名称可用但必须网络取证 23 条** —— 这 23 条已在此前 b113–b120 六轮抓取中逐条证伪（直连 / 代理 curl + `--tls-max 1.2` / 渲染读取 / 官方子页 / sitemap 枚举 / DoH），23 次复核 0 次翻转。本批 51 域名 DoH 全量复核同样**未出现任何复活**。

## 六、自检与守恒

- `1125 == 1125 == 1125` ✅，双向差集 0 / 0，池内四项失败 0 / 0 / 0
- `apply-tool-profiles` 试算：1121 全匹配、未匹配 0 ✅
- 未跑 `--apply` / `generate-sitemap`（无内容可合并）
- `git add -A` 仅新增本文件；`.tmp_b121_*`、`.tmp_cq_before_b121.json`、`.tmp_fix_pipe.mjs` 提交前已清

## 七、结论与待授权三项

**⚠ 结论（第 51 次）：工具页索引面上限 = 1125（95.6%），按原任务重跑产能恒为 0。**

本批把「死链/空壳」的判定从抽样升级为**全量 DNS 复核**，结论与 b119 一致且更硬：43 个域名仍然解析，站点不是「连不上」，而是「上线了但没内容 / 已停运 / 已易主 / 被 CF 拦」；6 个已注销。**瓶颈是条目本身，不是抓取通道。**

待授权三项（第 51 次提出，仍未执行）：

1. **52 条清理**：下线约 40 条、合并 5 条、改名后可写 4 条，1177 → 约 1132。其中**现网仍可点的博彩类落地已核减为 2 个**：`tool14961`→`fryderyk.ai`、`tool1333`→`aiapp.cc`（均 noindex，不影响索引面但有可见外链，**清理优先级最高**）。⚠ 修正历次记录：此前称的第三个 `clepto.io` **已不在当前数据中**（`tool58825` 现指向 `dinq.io`），b116–b120 的「3–4 个博彩落地」口径有误。
2. **2 条改名后立刻可写**：`tool923` → `Luma`（官网已转创意智能体，须先改 `fix-data-quality.mjs` 的 `NAME_FIXES`）、`ask-xiaoyuzhoufm-com` → `小宇宙 AI 搜索`，**+2 条**。
3. **教程页 56 条补正文**：现状正文 min/med/max = 145/232/316、≥600 字 0 条、无 `tutorials.xml`，8 条标题含「实测/亲测」需先改口径，补齐后 **+56 条（1125 → 1181）**，是唯一成规模放量面。

⚠ 51 批 0 产出。三项都不授权的情况下，建议**立即**把本自动化降为每周一次巡检（只跑四条件自检），或直接把任务目标改为第 3 项。
