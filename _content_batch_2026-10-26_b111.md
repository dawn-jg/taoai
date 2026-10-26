# 第 111 批原创资料实测报告（2026-10-26 夜间）

## 一、基线（独立复算，与 b110 完全一致）

| 指标 | 数值 |
|---|---|
| 工具总数 | 1177 |
| 原创池 | 1125（editorials 5 ∪ profiles 1121，重叠 1） |
| 四条件通过 | 1125（名称失败 0 / 字数失败 0 / 含自身名失败 0） |
| `public/tools.xml` 条数 | 1125 |
| 双向差集 | 仅索引未进 xml 0 / 仅 xml 不在索引 0 ✅ |
| 待写 | 52 |
| 起始 HEAD | `fb829089` |

## 二、本批结论：新增 0 条（连续第 41 批）

- 队列 `--top 24 --save`：零 diff，名单自 b92 起 19 批未变。
- 52 条全量直连探针（6 并发，29.4s）：**200:23 / 403:1 / 404:2 / ERR:26**，与 b98–b110 十三批逐条零翻转。
- 23 条 200 逐条判读（本批全量重判，不引用旧结论）：**无一条可写**。
- `apply-tool-profiles.mjs` 试算：1121 条全部合并，未匹配 slug 0。未跑 `--apply` 与 `generate-sitemap`（无内容可合并，避免刷 lastmod）。

## 三、52 条待写池逐条判定表

| slug | 名称 | 状态 | 正文字符 | 桶 | 证据 |
|---|---|---|---|---|---|
| `ai-bot` | AI工具集 | 200 | 15227 | E | 通用名「AI工具集」，正文为导航聚合页，含自身名校验失效 |
| `moyin-com` | 魔撰写作 | 200 | 24 | 合并 | 标题已是「魔音工坊」，同站 tool1924 即该产品 |
| `miaohui-jixueai-com` | 秒绘AI | ERR:CERT_HAS_EXPIRED | 0 | D | b103 渲染确认域名易主为「创大产控」 |
| `tool67418` | GetDraft | 200 | 8 | C | 正文 8 字符，b110 渲染确认「has ceased operations」 |
| `tool14278` | MidReal | 200 | 1180 | C | 仅存告别信，已 sunset 转 Macaron |
| `tool1333` | 创作王 | 200 | 3382 | D | 标题为 HTML 实体编码的博彩站「qy球友会」 |
| `voxcraft-ai` | VoxCraft | ERR:CERT_HAS_EXPIRED | 0 | A | 直连 TLS 证书过期，无有效素材 |
| `photonaiclub-com` | 光子AI | ERR:ENOTFOUND | 0 | A | 域名 ENOTFOUND |
| `photonaiclub-com-2` | 光子AI抠图 | ERR:ENOTFOUND | 0 | A | 域名 ENOTFOUND |
| `6pen-art` | 6pen Art | ERR:CERT_HAS_EXPIRED | 0 | C | 证书过期；b103 渲染确认已迁 6pen.pro |
| `tool2676` | 175FUN | ERR:ENOTFOUND | 0 | A | 域名 ENOTFOUND |
| `tool66554` | 造次 | 200 | 0 | A | 200 但正文 0 字符 |
| `tool7424` | XPaper AI | ERR:ECONNREFUSED | 0 | A | ECONNREFUSED |
| `hotshot-co` | Hotshot | 200 | 9012 | D | 同名科技测评博客，非 AI 视频工具 |
| `etna-7volcanoes-com` | Etna | ERR:ENOTFOUND | 0 | A | 域名 ENOTFOUND |
| `humva-ai` | Humva | ERR:UNABLE_TO_GET_ISSUER | 0 | A | 证书链异常；b106 备用域名 humva.com 为第三方评测聚合站 |
| `tool67371` | AI面试助手\|AI笔试助手 | ERR:ENOTFOUND | 0 | A | ENOTFOUND + 描述性名称 |
| `telehire-ai` | 最轻量级的全领域AI面试官 | ERR:ENOTFOUND | 0 | A | 域名 ENOTFOUND（b105 已验代理 000） |
| `tool216` | Zyro AI Image Upscaler | 200 | 8781 | C | 落地 Hostinger 并购公告（Zyro 已被收购） |
| `tool6840` | 360智绘 | 200 | 105 | D | 302 至 360AI办公会员权益页，正文 105 字符壳 |
| `tool11395` | 一站式用GPT-5.5、Claude-4.7 | 200 | 0 | A | 200 但正文 0 字符 + 描述性名称 |
| `tool71074` | 长视频精华提炼，自动追踪频道中文推送 | 404 | 79 | B | 404「Project not found」+ 描述性名称 |
| `tool1338` | 全能AI助手，基于Qwen模型 | 200 | 0 | A | 200 但正文 0 字符 |
| `writingpal-ai` | WritingPal | ERR:UND_ERR_CONNECT_TIME | 0 | A | 连接超时（b105 代理亦 000） |
| `tool9412` | 阶跃星辰推出的AI聊天机器人和智能体平台 | ERR:ENOTFOUND | 0 | A | ENOTFOUND + 描述性名称 |
| `tool58825` | AI人才发现与分析平台，精准识别AI精英 | 200 | 6366 | D | 跳转终点 clepto.io 为越南语博彩站，dinq 出现 0 次 |
| `tool1890` | Neeva | ERR:UNABLE_TO_GET_ISSUER | 0 | A | 证书链异常；Neeva 已停运并入 Snowflake |
| `flow-studio` | Flow Studio | ERR:UND_ERR_CONNECT_TIME | 0 | A | 连接超时；b109 代理通但落地为 FlowGPT，名称不符 |
| `tool479` | AI代码检查 | 404 | 0 | B | 404 + 描述性名称 |
| `seelesai-go-link` | 全球首个端到端AI 3D游戏生成工具 | 200 | 42 | 合并 | 同域已有在池条目 tool14989 SeeleAgent（seeles.ai） |
| `tool13251` | 字节跳动旗下推出的AI虚拟交友聊天平台 | ERR:EAI_AGAIN | 0 | A | DNS EAI_AGAIN + 描述性名称 |
| `tool33149` | AI设计工具，支持AI抠图、消除、无损放大 | ERR:ENOTFOUND | 0 | A | ENOTFOUND + 描述性名称 |
| `miantuan-knowfuture-com-cn` | 面团AI | ERR:UND_ERR_CONNECT_TIME | 0 | A | 连接超时，无响应 |
| `duiyou-ai` | 堆友AI | 200 | 3525 | D | 落地为「美图设计室」，堆友出现 0 次 |
| `tool1957` | AIDesign | ERR:ENOENT | 0 | A | ENOENT（b105 代理亦 000） |
| `yanqueai-com` | AI LOGO设计工具 | 200 | 0 | A | 200 但正文 0 字符，纯前端空壳 |
| `tool111` | Reply Logo | 200 | 11130 | D | codeium.com 已 302 至 Devin Desktop |
| `tool14961` | Redirecting... | 200 | 22971 | D | DegenCity 博彩（New Zealand casino） |
| `pagentia-com` | AI专利查新检索与撰写平台 | ERR:ERR_TLS_CERT_ALTNAME | 0 | A | TLS 证书域名不匹配（ALTNAME） |
| `ask-xiaoyuzhoufm-com` | 小宇宙推出的AI搜索产品 | 200 | 29 | A | 200 但正文仅 29 字符空壳 |
| `xanswer-com` | 支持生成思维导图的免费AI搜索工具 | ERR:EAI_AGAIN | 0 | A | DNS EAI_AGAIN，解析失败 |
| `tool701` | AI生成3D材质 | 200 | 0 | A | 200 但正文 0 字符 |
| `tool3006` | LogoliveryAI — Free AI | 200 | 214 | C | 首页 214 字符为清算公告，公司已注销 |
| `phind-com` | Phind | 403 | 58 | B | 403 Cloudflare「Just a moment...」，渲染亦无法取证 |
| `tool67775` | 在线大模型训练微调及AI科研学习平台 | ERR:DEPTH_ZERO_SELF_SIGN | 0 | A | 自签名证书（DEPTH_ZERO_SELF_SIGNED_CERT） |
| `tool1079` | 阿里云登录 | 200 | 177 | D | 落地阿里云登录页，177 字符 |
| `tool67595` | 论文降aigc-论文aigc降重-AI痕迹降低-论文ai降重 | 200 | 2418 | E | 66paper 单页、含推广码，名称关键词堆砌且恰 30 字卡阈值 |
| `tool67455` | 专注学术写作降AI率的工具 | 200 | 135 | A | 正文 135 字符空壳 + 描述性名称 |
| `tool923` | AI 3D捕捉、建模和渲染 | ERR:UND_ERR_CONNECT_TIME | 0 | A | 连接超时 + 描述性名称 |
| `tool150` | AI高保真原型设计 | ERR:UND_ERR_CONNECT_TIME | 0 | A | 连接超时 + 描述性名称 |
| `tool148` | BW188 | ERR:AbortError | 0 | A | 请求中断（AbortError） |
| `tool11840` | 结构化AI知识搜索引擎 | ERR:UND_ERR_CONNECT_TIME | 0 | A | 连接超时 + 描述性名称 |

分桶合计：A 不可达/空壳 31、B 403/404 3、C 停运/并购 5、D 主题不符/易主/博彩 9、E 名称不合格 2、合并 2。


## 四、为什么本批仍然只能写 0 条

剩余 52 条的性质是**「条目本身已死」**，不是「抓取通道不够」：

1. 26 条域名层不可达（ENOTFOUND 10 / 证书异常 5 / 连接超时 8 / 拒绝 1 / 其他 2）。SOP §7.18 的三步兜底（直连 → 代理 curl → 渲染读取）在前 13 批已全部试尽，边际为 0。
2. 9 条 200 但正文 ≤ 214 字符，是纯前端空壳或登录页，凑不出 ≥700 字且不虚构的正文。
3. 6 条域名已被他人接管：4 个落地博彩站（`tool1333`、`tool14961`、`tool58825` 及同批越南语站）、1 个登录页、1 个并购公告页。
4. 4 条产品方明确停运/更名（MidReal sunset、Logolivery 清算、GetDraft ceased operations、Zyro 并入 Hostinger）。
5. 2 条与站内已有条目同产品，应合并而非另建页面（`seelesai-go-link`→`tool14989`、`moyin-com`→`tool1924`）。
6. 其余为通用名（`ai-bot`「AI工具集」）或描述性名称（如「最轻量级的全领域AI面试官」），按硬约束人工排除。

按 SOP 红线「不虚构」与第 2 节来源白名单，上述任一条都不允许据空素材编写正文。

## 五、真实增量所在（均需授权，本批未执行）

| 通道 | 口径 | 增量 |
|---|---|---|
| ① 52 条待写池清理 | 下线约 45（含 4 个博彩域名 + 1 个登录页）、合并 2、改名改 url 约 5 | 工具数 1177→约 1132，索引面不变 |
| ② 教程页 56 条补正文 | 现正文 145/232/316（min/avg/max），≥600 字 0 条，`public/tutorials.xml` 不存在 | **+56（1125→1181），唯一放量面** |

② 前需先把 8 条标题含「实测/亲测」的教程改口径（名单见 b108 报告），否则违反红线「不虚构」。

## 六、建议

工具页索引面已在 1125 封顶：池内 1125 条全部通过四条件，池外 52 条全部为不可写死条目。**按当前任务口径继续调度，每批产出必然为 0。**
建议把本自动化口径改为「② 教程页 56 条补正文」，或先授权执行「① 52 条清理」。
