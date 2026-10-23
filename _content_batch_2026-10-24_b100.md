# 第 100 批原创资料生产记录（2026-10-24 凌晨）

## 一、基线（HEAD `bd2f0ba5`，工作区干净）

| 指标 | 数值 |
|---|---|
| 工具总数 | 1177 |
| 原创内容池 | 1125（editorials 5 ∪ tool_profiles.items 1121） |
| 四条件通过（可索引） | **1125** |
| `public/tools.xml` 条数 | **1125** |
| 自检 | 1125 == 1125 == 1125 ✅ |
| 池内失败（脏名 / 短正文 / 不含自身名） | 0 / 0 / 0 |
| 待写（不在原创池） | **52** |
| 池内正文长度 min / median / avg / max | 602 / 873 / 905 / 3906，<700 字 35 条（均达标） |

`node scripts/content-queue.mjs --top 24 --save` 已执行，`data/content_queue.json` 与 HEAD **零 diff**（名单稳定）；
`--top 60 --json` 输出 pending=52，自第 92 批起 **8 批未变**。

## 二、本批产出：0 条（连续第 30 批）

抓取按 SOP 第七节第 18 条的三步兜底走完前两步，未跳步：

1. **直连探针**（Node `fetch`，12s 超时，6 并发，52/52 全部返回）：
   200 → 22、连接失败/超时/证书 → 26、404 → 2、403 → 1、500 → 1。
2. **代理复抓**（`http://127.0.0.1:7897` 实测健康：baidu=200、google=200）对 26 条失败项全部重试：
   **5 条复活**（`flow-studio` 311KB、`tool923` 306KB、`tool148` 27KB、`tool150` 26KB、`tool1890` 5.6KB），
   其余 21 条仍 `000`。5 条复活项逐条落地核对后**全部不可写**（见下表），故未进入第 3 步渲染兜底。

**本批新确证（5 条，均为首次拿到落地正文）**

| slug | 库内名称 | 代理落地页实际标题 | 判定 |
|---|---|---|---|
| `flow-studio` | Flow Studio | `FlowGPT — The open platform for AI applications` | D：302 回 FlowGPT 首页，无 Flow Studio 产品页，正文 686 字符全是 prompt 商店栏目 |
| `tool923` | AI 3D捕捉、建模和渲染 | `Luma — AI Agents for Creative Work` | D：与已收录且已索引的 `lumalabs-ai`（/dream-machine）同站重复；旧名亦不合规 |
| `tool148` | BW188 | `The Ice Cream Boutique — The sweetest and happiest spot in town` | D：域名已改作美式冰淇淋店官网（正文 6068 字符，含门牌电话），与原条目无任何关系 |
| `tool150` | AI高保真原型设计 | `Stitch - Design with AI`（正文仅 23 字符） | D：已并入 Google Stitch，库内 `tool73947` 已收录同一产品；且为空壳 |
| `tool1890` | Neeva | `Redirecting... Loading . . .`（正文 28 字符） | C：仅剩跳转壳，产品已停运 |

> 方法论沿用 b97 的结论：**`<title>` 不能作为存活证据，必须看落地正文**——`tool148`、`flow-studio`
> 两次翻车都发生在「title 看着像、正文完全无关」的情况。

## 三、52 条分桶（按「首个决定性因素」互斥归类）

| 桶 | 含义 | 条数 |
|---|---|---|
| A | 域名不可达 / 证书失效 / 200 空壳（正文 <150 字符） | **27** |
| B | 403 / 404 / 500 | **4**（`phind-com`、`tool479`、`tool71074`、`tool58825`） |
| C | 停运 / 清算 / 并购 / 告别页 | **5**（`tool216`、`tool3006`、`tool14278`、`tool6840`、本批新增 `tool1890`） |
| D | 易主 / 主题不符 / 博彩跳转 / 同站重复 | **13** |
| E | 名称不合规（通用名或描述性名称，含自身名校验失效） | **3**（`ai-bot`、`tool67595`、`tool67455`） |

> 名称层面的问题跨桶分布（通用名 `ai-bot`、描述性名 `tool1338`/`tool11395`、含 `\|` 的 `tool67371`、
> 名称与站点完全无关的 `tool148`/`tool111`），因此 E 桶只有 3 条不代表「名称合规问题只有 3 条」。
> **能抓到素材 ≠ 可写**（b95 已记录）：本批 5 条复活项的素材都足够，但全部倒在名称或主题一致性上。

## 四、52 条清理判定表（本批新增交付物，可直接执行）

证据来源：本批直连探针 + 代理复抓（`status` / 落地标题），以及 b96–b99 已确证的域名级事实。
**执行前需人工确认**（下线 = 从 `data/tools.json` 移除或标记不可达；合并 = 指向已存在的同产品条目）。

| # | slug | 库内名称 | 证据 | 建议 |
|---|---|---|---|---|
| 1 | `ai-bot` | AI工具集 | 200 / 13331 字符，站名即通用名 | 下线（E：通用名，含自身名校验无意义） |
| 2 | `voxcraft-ai` | VoxCraft | `CERT_HAS_EXPIRED`，代理仍 000 | 下线（A） |
| 3 | `yanqueai-com` | AI LOGO设计工具 | 200 / 0 字符，无 `<title>` | 下线（A+E） |
| 4 | `telehire-ai` | 最轻量级的全领域AI面试官 | `ENOTFOUND` | 下线（A，名称亦描述性） |
| 5 | `6pen-art` | 6pen Art | `CERT_HAS_EXPIRED` | 下线（A） |
| 6 | `flow-studio` | Flow Studio | 代理落地 FlowGPT 首页 | 下线（D，主题不符） |
| 7 | `miaohui-jixueai-com` | 秒绘AI | `CERT_HAS_EXPIRED` | 下线（A） |
| 8 | `miantuan-knowfuture-com-cn` | 面团AI | 连接超时 | 下线（A） |
| 9 | `duiyou-ai` | 堆友AI | 200 / `designkit.cn` 落地「美图设计室」 | 下线（D，域名已指别家产品） |
| 10 | `seelesai-go-link` | 全球首个端到端AI 3D游戏生成工具 | 200 / 35 字符短链跳转页 | 下线（D+E） |
| 11 | `pagentia-com` | AI专利查新检索与撰写平台 | `ERR_TLS_CERT_ALTNAME_INVALID` | 下线（A） |
| 12 | `phind-com` | Phind | 403，Cloudflare `Just a moment...`（代理同） | 下线（B，长期不可取证） |
| 13 | `photonaiclub-com` | 光子AI | 超时；CNAME = `expired.hichina.com` | 下线（A，域名过期） |
| 14 | `humva-ai` | Humva | 超时，代理仍 000 | 下线（A） |
| 15 | `ask-xiaoyuzhoufm-com` | 小宇宙推出的AI搜索产品 | 200 落地小宇宙首页，无该产品 | 下线（D+E） |
| 16 | `writingpal-ai` | WritingPal | 超时，代理仍 000 | 下线（A） |
| 17 | `xanswer-com` | 支持生成思维导图的免费AI搜索工具 | `EAI_AGAIN`，代理仍 000 | 下线（A） |
| 18 | `photonaiclub-com-2` | 光子AI抠图 | 与 #13 同站，域名过期 | 合并至 #13 后一并下线 |
| 19 | `moyin-com` | 魔撰写作 | 200 / `x.moyin.com` 标题「魔音工坊」 | 下线（D，名称与产品不符） |
| 20 | `etna-7volcanoes-com` | Etna | `ENOTFOUND` | 下线（A） |
| 21 | `hotshot-co` | Hotshot | 200 / 7534 字符，已成科技导购博客 | 下线（D，主题不符） |
| 22 | `tool6840` | 360智绘 | 302 → `bangong.360.cn` 会员页，正文 94 字符 | 下线（C，功能并入 360AI办公） |
| 23 | `tool2676` | 175FUN | `ENOTFOUND`，代理 000 | 下线（A） |
| 24 | `tool1333` | 创作王 | 200 / 标题实体编码后为「qy球友会」，博彩站 | 下线（D，博彩跳转） |
| 25 | `tool1957` | AIDesign | `ailogo.qq.com` 域名侧废（jina 报 0.0.0.1） | 下线（A） |
| 26 | `tool1890` | Neeva | 代理 200 但仅跳转壳 28 字符 | 下线（C，产品停运） |
| 27 | `tool701` | AI生成3D材质 | 200 / 0 字符 | 下线（A，空壳） |
| 28 | `tool479` | AI代码检查 | 404 | 下线（B） |
| 29 | `tool1079` | 阿里云登录 | 200 / 177 字符，阿里云登录页 | 下线（D，指向登录页） |
| 30 | `tool9412` | 阶跃星辰推出的AI聊天机器人和智能体平台 | `ENOTFOUND` | 下线（A+E） |
| 31 | `tool11840` | 结构化AI知识搜索引擎 | `ECONNRESET`，代理 000 | 下线（A） |
| 32 | `tool67595` | 论文降aigc-论文aigc降重-AI痕迹降低-论文ai降重 | 200 / 2149 字符，名称恰 30 字关键词堆砌 | 下线（E） |
| 33 | `tool1338` | 全能AI助手，基于Qwen模型 | 200 / 0 字符 | 下线（A+E） |
| 34 | `tool11395` | 一站式用GPT-5.5、Claude-4.7 | 200 / 0 字符 | 下线（A+E） |
| 35 | `tool67775` | 在线大模型训练微调及AI科研学习平台 | `DEPTH_ZERO_SELF_SIGNED_CERT` | 下线（A） |
| 36 | `tool66554` | 造次 | 200 / 0 字节 | 下线（A，空壳） |
| 37 | `tool71074` | 长视频精华提炼，自动追踪频道中文推送 | 404 `Project not found` | 下线（B+E） |
| 38 | `tool67455` | 专注学术写作降AI率的工具 | 200 / 128 字符，落地「稿易」 | **暂缓**：名称须改为「稿易」，且站点为薄壳，补正文前不上线 |
| 39 | `tool13251` | 字节跳动旗下推出的AI虚拟交友聊天平台 | `EAI_AGAIN` | 下线（A+E） |
| 40 | `tool923` | AI 3D捕捉、建模和渲染 | 代理落地 Luma 官网，与 `lumalabs-ai` 同站 | 合并至 `lumalabs-ai` |
| 41 | `tool150` | AI高保真原型设计 | 代理落地 Google Stitch（23 字符） | 合并至 `tool73947`（Stitch） |
| 42 | `tool67371` | AI面试助手\|AI笔试助手 | `ENOTFOUND`；名称含 `\|` 脏字符 | 下线（A+E） |
| 43 | `tool58825` | AI人才发现与分析平台，精准识别AI精英 | 500 | 下线（B+E） |
| 44 | `tool33149` | AI设计工具，支持AI抠图、消除、无损放大 | `ENOTFOUND` | 下线（A+E） |
| 45 | `tool148` | BW188 | 代理落地「The Ice Cream Boutique」冰淇淋店 | 下线（D，域名已他用） |
| 46 | `tool67418` | GetDraft | 200 / 921 字节，正文 8 字符 | 下线（A，空壳） |
| 47 | `tool3006` | LogoliveryAI — Free AI | 200 / 182 字符 | 下线（C，官网公告已清算） |
| 48 | `tool14278` | MidReal | 200 / 983 字符，正文为 sunset 告别信 | 下线（C，停运导流 Macaron） |
| 49 | `tool14961` | Redirecting... | 200 / 19404 字符，落地 `DegenCity Casino` | 下线（D，博彩站） |
| 50 | `tool111` | Reply Logo | 200 / 9325 字符，落地 `Devin Desktop`（`codeium.com`） | 合并至 `preview-devin-ai`（并改名 Devin） |
| 51 | `tool7424` | XPaper AI | `ECONNREFUSED` | 下线（A） |
| 52 | `tool216` | Zyro AI Image Upscaler | 301 → Hostinger 并购公告（7445 字符促销循环） | 下线（C，功能并入 Hostinger） |

**汇总：下线 47 条、合并 4 条（#18 随 #13 下线，实际移出 48 条）、暂缓 1 条（#38 改名后再定）。**
注意：清理**不增加**索引页，只消除站内死链与错配，属质量整改而非内容增量。

## 五、自检

- `node .tmp_baseline100b.mjs` 独立复算（按 `lib/tools.ts` 同一规则）：tools 1177 / pool 1125 / PASS **1125** /
  `tools.xml` locs **1125** → 1125 == 1125 == 1125 ✅；池内四项失败 0。
- `node scripts/apply-tool-profiles.mjs`（试算）：应用 1121 条，`profiles 未匹配 slug = 0`；与 b99 读数一致。
- **未跑** `--apply` 与 `generate-sitemap.mjs`：本批无新增资料，`data/tools.json` 与 `public/*.xml` 零改动，
  跑一次只会重写文件并刷新 `lastmod`，对线上无意义。
- 提交只含本报告文件（不用 `git add -A`，避开 build_cron 日志）；`.tmp_*`、`.tmpp100_*` 已在提交前清理。

## 六、结论与建议（第 30 次）

**工具页索引面上限 = 1125，按本任务定义重跑产能恒为 0。** b77–b100 共 24 轮、数百个 URL 命中 0；
52 条已在「域名 → 产品 → 名称」三级完成取证，本批第四次复核，仅 5 条经代理复活，且无一可写。

真实增量只剩两条，都超出「续写工具页」这一任务定义：

1. **52 条死链清理**（本批已给出可直接执行的逐条判定表，见第四节）：移出 48 条、合并/暂缓 4 条。
2. **教程页 56 条补正文（唯一放量面，+56）**：本批复核 56 条正文 145 / 229 / 316（min / avg / max），
   ≥600 字 **0 条**，`public/tutorials.xml` 至今不存在，且 **8 条标题含「实测 / 亲测」**（触 SOP 红线三，
   须先改口径再补正文）。补齐后索引面 1125 → 1181。

建议下一轮把定时任务改为「教程页原创正文补写」，工具页任务转入死链清理；否则继续按本任务定义运行，
产出恒为 0 报告。
