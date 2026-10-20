# 第 85 批原创资料生产（2026-10-20）

## 一、基线（HEAD `a79e1cd1`）

| 指标 | 数值 |
|---|---|
| 工具总数 | 1177 |
| 原创池（editorials 5 ∪ tool_profiles 1121） | 1125 |
| 四条件通过（可索引） | 1125 |
| `public/tools.xml` 条数 | 1125 |
| 待写（未命中原创池） | 52 |

复算口径：`data/tools.json` 正文取 `detailed_content[].html`；`editorials.json` 为**根数组**（非 `items`）；
`tool_profiles.json` 取 `Object.keys(items)`。四条件＝命中原创池 ∧ 名称干净（≤30 字、无 ` | `/`&#`/`--`）∧ 正文去标签去空白 ≥600 ∧ 正文含去空白后的自身名。

> ⚠️ 任务模板中的「工具约 1210 条 / 可索引 35 条 / 剩余约 1175 条」为过期基线。当前真实状态：可索引 1125（95.6%），剩余 52。

## 二、本批方法（比前几批更硬的一轮）

1. 按 SOP §18 三步兜底执行，不跳步：
   - ① 代理 `127.0.0.1:7897`（健康 200/0.57s）+ 浏览器 UA + `Accept-Encoding: identity`，6 路并发、`-m 25`，52 条全量抓取；
   - ② 对 000/404 条目做**直连**复探（不走代理），排除代理故障；
   - ③ 对仍有 IP 解析的域名走 `r.jina.ai` 渲染读取（2 路、间隔 3s、不带 UA）。
2. 抓回来的 HTML 一律剥 `<script>/<style>` 后取纯文本，逐条核对 `<title>` 与 DB `name` 是否同指一个产品。
3. 结论判定沿用「双 000 即判死」，并用 DNS 解析把「本地网络不可达」与「站点已下线」区分开——本轮 3 条经 jina 复核确认为站点侧故障（`voxcraft.ai` 504 nginx、`humva.ai`/`writingpal.ai` 导航超时），不是本地网络问题。

## 三、产出

**新增 0 条，素材缺失跳过 52 条。**

52 条**没有一条**能写出 ≥700 字且不虚构的正文。原因全部落在「站点死亡 / 产品停运 / 数据错误」三类，与抓取技巧无关：

| 桶 | 数量 | 含义 |
|---|---|---|
| A 站点不可达 / 空壳 | 25 | 双 000、DNS 不解析、200 但 0 字节或 <700 字节壳页 |
| B 404 / 403 / 登录页 / CF 挑战 | 7 | 页面已不存在，或只剩 Cloudflare 挑战页 |
| C 停运 / 清算 / 域名易主 | 8 | 官网改卖博彩、赌场、冰淇淋，或只剩告别信/清算公告 |
| D 同站重复 / 主题不符 | 4 | 与库内既有条目同站，或 url 所指产品与名称不符 |
| E 名称不合规 | 4 | 通用名、描述性名称、关键词堆砌 |
| F 活站但素材不足 | 4 | 纯前端壳页，正文 8–135 字 |

### A 类（25）— 站点不可达 / 空壳

| slug | 名称 | 证据 |
|---|---|---|
| xanswer-com | 支持生成思维导图的免费AI搜索工具 | DNS EAI_AGAIN，直连/代理双 000 |
| voxcraft-ai | VoxCraft | 双 000；jina 返回 504 nginx（站点侧故障） |
| humva-ai | Humva | 双 000；jina TimeoutError |
| writingpal-ai | WritingPal | 双 000；jina TimeoutError |
| telehire-ai | 最轻量级的全领域AI面试官 | DNS ENOTFOUND |
| pagentia-com | AI专利查新检索与撰写平台 | 双 000（39.108.181.255 有解析但无响应） |
| tool11840 | 结构化AI知识搜索引擎 | explorer.globe.engineer 双 000 |
| tool67775 | 在线大模型训练微调及AI科研学习平台 | lab4ai.cn 双 000 |
| tool67371 | AI面试助手\|AI笔试助手 | aimianshibang.com DNS ENOTFOUND |
| tool2676 | 175FUN | 175.fun DNS ENOTFOUND |
| 6pen-art | 6pen Art | 双 000（此前已见「致谢与新篇章」告别页） |
| miaohui-jixueai-com | 秒绘AI | 双 000 |
| photonaiclub-com | 光子AI | 双 000 |
| photonaiclub-com-2 | 光子AI抠图 | 双 000 |
| tool1890 | Neeva | 已停运，双 000 |
| tool1957 | AIDesign | ailogo.qq.com 双 000（jina 报 non-public IP） |
| tool9412 | 阶跃星辰推出的AI聊天机器人和智能体平台 | maopaoya.com 双 000 |
| tool13251 | 字节跳动旗下推出的AI虚拟交友聊天平台 | chatwiz.cn 双 000 |
| tool33149 | AI设计工具，支持AI抠图、消除、无损放大 | ibihun.com 双 000 |
| tool7424 | XPaper AI | 130ai.com 双 000 |
| tool66554 | 造次 | zaoci.tv 返回 200 但 0 字节 |
| tool1338 | 全能AI助手，基于Qwen模型 | 200 但仅 633 字节空壳 |
| tool11395 | 一站式用GPT-5.5、Claude-4.7 | 200 但仅 698 字节空壳 |
| etna-7volcanoes-com | Etna | 双 000 |
| miantuan-knowfuture-com-cn | 面团AI | 双 000 |

### B 类（7）— 404 / 403 / 登录页 / CF 挑战

| slug | 名称 | 证据 |
|---|---|---|
| tool1333 | 创作王 | aiapp.cc 403 |
| tool479 | AI代码检查 | ai-code-reviewer.com 404 |
| yanqueai-com | AI LOGO设计工具 | 404 |
| tool71074 | 长视频精华提炼，自动追踪频道中文推送 | 404 `Project not found` |
| tool1079 | 阿里云登录 | 指向阿里云登录页（201 字节），非产品页 |
| tool701 | AI生成3D材质 | withpoly.com 跳 `poly.app`，仅 87 字节，且名称为描述性短语 |
| phind-com | Phind | 双域名均 404；jina 只得 `Just a moment...` 挑战页，取不到任何事实 |

### C 类（8）— 停运 / 清算 / 域名易主

| slug | 名称 | 证据 |
|---|---|---|
| tool14278 | MidReal | 正文首屏即 `A Letter to Our MidReal Community` 告别信（title 仍正常，易骗过自动核对） |
| tool3006 | LogoliveryAI — Free AI | 正文仅 `Logolivery, Inc. has been officially liquidated.` |
| tool216 | Zyro AI Image Upscaler | title 已变 `Zyro Website Builder Joins Forces With Hostinger`，工具线整体撤除 |
| tool58825 | AI人才发现与分析平台，精准识别AI精英 | dinq.io 已变为越南博彩站 |
| tool14961 | Redirecting... | fryderyk.ai 已变为 NZ 赌场站 |
| tool148 | BW188 | magician.design 已变为冰淇淋店 |
| tool6840 | 360智绘 | aigc.360.com 仅 105 字提示页，产品名不符 |
| hotshot-co | Hotshot | hotshot.co 已改为「AI Tools, Gadgets, Smart Home」评测博客，原 AI 视频编辑器产品线消失 |

### D 类（4）— 同站重复 / 主题不符

| slug | 名称 | 证据 |
|---|---|---|
| duiyou-ai | 堆友AI | designkit.cn＝美图设计室，与库内既有 `d.design`（6 条）同站重复 |
| moyin-com | 魔撰写作 | x.moyin.com 实为「魔音工坊」配音产品，与名称不符 |
| tool111 | Reply Logo | codeium.com 现为 Devin 官网（`Devin Desktop | Devin`），与名称不符 |
| flow-studio | Flow Studio | flowgpt.com/flow-studio 抓回的是 FlowGPT 提示词广场首页，无 Flow Studio 产品信息 |

### E 类（4）— 名称不合规

| slug | 问题 |
|---|---|
| ai-bot | 通用名「AI工具集」，会让「含自身名」校验失效 |
| seelesai-go-link | 描述性名称「全球首个端到端AI 3D游戏生成工具」+ 正文 42 字 |
| tool923 | Luma 站点**在线且正文 3291 字**，但名称为描述性短语「AI 3D捕捉、建模和渲染」，非品牌名 |
| tool67595 | 名称为关键词堆砌且超 30 字（「论文降aigc-论文aigc降重-AI痕迹降低-论文ai降重」） |

### F 类（4）— 活站但素材不足

| slug | 名称 | 正文纯文本 |
|---|---|---|
| ask-xiaoyuzhoufm-com | 小宇宙推出的AI搜索产品 | 29 字 |
| tool150 | AI高保真原型设计 | 23 字 |
| tool67418 | GetDraft | 8 字 |
| tool67455 | 专注学术写作降AI率的工具 | 135 字 |

## 四、改动与自检

- `data/tool_profiles.json` / `data/tools.json`：**零改动**（无内容可合并，故未跑 `apply-tool-profiles --apply`）。
- `public/*.xml`：未重跑 `generate-sitemap`，避免仅刷新 `lastmod` 造成噪声（沿用 b75 口径）。
- 独立复算：可索引 1125 == 原创池 1125 == `tools.xml` 1125 ✅；池内短正文 0、缺名 0、脏名 0、孤儿 0。
- 本批仅新增本报告。

## 五、结论与建议

**第 15 次确认：工具页索引面的现实上限 = 1125（1177 中的 95.6%），原创资料生产阶段已终结。**
剩余 52 条不是「还没写」，而是「写不了」——41 条页面已死 / 已易主、4 条与既有条目重复、7 条是脏数据。
继续按原任务重跑，产能恒为 0；SOP §18 的三步兜底对这 52 条已无解。

真正还能提升站点质量与索引面的两件事：

1. **52 条数据清理**（纯数据操作，不需素材，一次可完成）：下线 41 条、合并 4 条、改数据 7 条。
   下线后本站将不再对外输出 40+ 个死链/博彩站跳转，对 AdSense 质量评估是正向信号。**需用户确认后执行**（涉及删除记录）。
2. **教程页原创内容**：`public/tutorials.xml` 当前 0 条 / 56 个教程页全部不可索引，是站内唯一还有空间的索引面。

建议把本自动化（`6ca66ff3`）的任务目标改为上述 ① 或 ②，否则后续每批都只会重复本报告。
