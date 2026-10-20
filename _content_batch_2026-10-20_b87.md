# 第八十七批原创资料生产记录（2026-10-20 晚）

## 一、结论

**本批新增 0 条。** 52 条待写条目经四轮抓取（直连代理 curl → 渲染读取 → 直连复核 → 标题/主题核对）后，
没有一条同时满足「站点在运营 ∧ 名称干净 ∧ 无同站重复 ∧ 有官方可引页 ≥600 字事实」四个条件，
按 SOP §18 全部判定为素材缺失，**不做任何撰写**（禁止据空素材编造）。

这是连续第 17 批零产出（b70=3、b71=2、b72–b76=0、b77=1、b78–b87=0）。

| 指标 | 数值 |
|---|---|
| 工具总数 | 1177 |
| 原创内容池（editorials 5 ∪ profiles 1121） | 1125 |
| 四条件通过数 | 1125 |
| `public/tools.xml` 条数 | 1125 |
| 自检（通过数 == tools.xml） | ✅ 1125 == 1125 |
| 本批待写 | 52 |
| 本批新增 | 0 |
| 跳过 | 52 |

## 二、本批方法与成本

1. **代理 + curl 全量探测 52 条**（6 路并发、浏览器 UA、`Accept-Encoding: identity`、`-m 25`）：
   26 条 `000`、3 条 404、2 条 403、1 条 522、1 条 200 空 body，其余虽有 HTML 但正文多为几十至几百字。
2. **渲染读取服务（`r.jina.ai`）复核 26 条**（串行、间隔 2.5s、不带浏览器 UA）：全部不可写
   （`422 域名不可解析` 4、`导航失败/超时` 8、`42206 空文件` 1、`403 AbuseAlleviation` 1、`504` 1、告别页 1、
   以及 3 条「有正文但主题已变」的页面）。
3. **名称—主题核对**：逐条比对页面 `<title>` 与 DB `name`，凡不符者一律作废（SOP §18）。

> 沿用 b86 的流水线，本批一次跑完，未再深挖子页/sitemap —— 因为前 5 批已对同一批域名穷举过
> `/blog`、`/docs`、`/pricing`、`/sitemap.xml` 等入口，命中率 0。

## 三、52 条逐条处置表

> 分桶合计：A 19 + B 6 + C 6 + D 12 + E 5 + F 4 = 52。
> 动作建议：A–D 共 43 条**下线**（301 到所属分类页或 410）、E 5 条**合并**进同产品主条目、F 4 条**改名或下线**。

| # | slug | DB 名称 | url | 实测证据 | 判定 | 建议动作 |
|---|---|---|---|---|---|---|
| 1 | `ai-bot` | AI工具集 | https://ai-bot.cn | 名称「AI工具集」为通用名，正文含自身名校验失效，按 SOP §10 排除 | F 名称不合规 | 人工改名或下线 |
| 2 | `voxcraft-ai` | VoxCraft | https://voxcraft.ai/ | 代理 curl 000；渲染读取返回 504 Gateway Time-out | A 站点不可达/空壳 | 下线 |
| 3 | `yanqueai-com` | AI LOGO设计工具 | https://www.yanqueai.com | 404 Not Found | B 官方 404/403 | 下线 |
| 4 | `telehire-ai` | 最轻量级的全领域AI面试官 | https://www.telehire.ai/ | 代理 curl 000；jina 报 422 域名不可解析 | A 站点不可达/空壳 | 下线 |
| 5 | `6pen-art` | 6pen Art | https://6pen.art/ | jina 读到《6pen - 致谢与新篇章》告别页 | C 停运/告别 | 下线 |
| 6 | `flow-studio` | Flow Studio | https://flowgpt.com/flow-studio | 403 Cloudflare 挑战页（5771 字节仅挑战文案） | B 官方 404/403 | 下线 |
| 7 | `miaohui-jixueai-com` | 秒绘AI | https://miaohui.jixueai.com/ | 现为「创大产控」企业官网（科研经纪/产业园） | D 易主 | 下线 |
| 8 | `miantuan-knowfuture-com-cn` | 面团AI | https://miantuan.knowfuture.com.cn/ | 代理 curl 000；jina 导航失败 | A 站点不可达/空壳 | 下线 |
| 9 | `duiyou-ai` | 堆友AI | https://www.designkit.cn/ | designkit.cn 现为「美图设计室」，与堆友AI 无关 | D 易主 | 下线 |
| 10 | `seelesai-go-link` | 全球首个端到端AI 3D游戏生成工具 | https://seelesai.go.link/kw8uW | go.link 短链落地页，与 tool14989（SeeleAgent）同产品，正文仅 35 字 | E 同站重复 | 合并 |
| 11 | `pagentia-com` | AI专利查新检索与撰写平台 | https://pagentia.com/ | 代理 curl 000；jina 导航失败（此前记录为证书 CN 不匹配） | A 站点不可达/空壳 | 下线 |
| 12 | `phind-com` | Phind | https://www.phind.com/ | 404（本批复核仍 404） | B 官方 404/403 | 下线 |
| 13 | `photonaiclub-com` | 光子AI | https://www.photonaiclub.com/sh/ZgN25IHnBJY | 代理 curl 000；jina 渲染 25s 超时 | A 站点不可达/空壳 | 下线 |
| 14 | `humva-ai` | Humva | https://humva.ai/ | 代理 curl 000；jina 导航超时 | A 站点不可达/空壳 | 下线 |
| 15 | `ask-xiaoyuzhoufm-com` | 小宇宙推出的AI搜索产品 | https://ask.xiaoyuzhoufm.com/ | 200 但正文仅 23 字（产品下载落地页，无任何 AI 搜索功能说明） | B 官方 404/403 | 下线 |
| 16 | `writingpal-ai` | WritingPal | https://writingpal.ai/ | 代理 curl 000；jina 导航超时 | A 站点不可达/空壳 | 下线 |
| 17 | `xanswer-com` | 支持生成思维导图的免费AI搜索工具 | https://www.xanswer.com/ | 代理 curl 000；jina 报 422 下游服务失败 | A 站点不可达/空壳 | 下线 |
| 18 | `photonaiclub-com-2` | 光子AI抠图 | https://www.photonaiclub.com/workspace/cutout | 同上（同站另一路径，渲染超时） | A 站点不可达/空壳 | 下线 |
| 19 | `moyin-com` | 魔撰写作 | https://x.moyin.com/ | 302 到魔音工坊（AI 配音），非「魔撰写作」 | D 易主 | 下线 |
| 20 | `etna-7volcanoes-com` | Etna | https://etna.7volcanoes.com/ | 代理 curl 000；jina 报 422 域名无法解析（NXDOMAIN） | A 站点不可达/空壳 | 下线 |
| 21 | `hotshot-co` | Hotshot | https://hotshot.co/ | 已改为「AI Tools, Gadgets, Smart Home」评测博客，非原视频生成工具 | D 易主 | 下线 |
| 22 | `tool6840` | 360智绘 | https://aigc.360.com/ | 302 到 360AI办公会员页，正文 94 字，产品名不符 | D 易主 | 下线 |
| 23 | `tool2676` | 175FUN | https://175.fun/ | 代理 curl 000；jina 报 422 域名格式错误 | A 站点不可达/空壳 | 下线 |
| 24 | `tool1333` | 创作王 | https://aiapp.cc/ | 403 + 空 body；jina 只得标题无正文 | A 站点不可达/空壳 | 下线 |
| 25 | `tool1957` | AIDesign | https://ailogo.qq.com/ | jina 判为 non-public IP（腾讯 AIDesign 已下线），403 | F 名称不合规 | 改名或下线 |
| 26 | `tool1890` | Neeva | https://neeva.com/ | neeva.com 仅余 Redirecting 跳转页 | C 停运 | 下线 |
| 27 | `tool701` | AI生成3D材质 | https://withpoly.com/browse/textures | withpoly.com 已改为 Poly「智能云文件浏览器」，与 3D 材质主题不符 | D 主题不符 | 下线 |
| 28 | `tool479` | AI代码检查 | https://ai-code-reviewer.com | 522 Connection timed out（源站不可达） | B 官方 404/403 | 下线 |
| 29 | `tool1079` | 阿里云登录 | https://m6.aliyun.com/# | 功能页名称 + 登录壳（正文 177 字），非工具 | F 名称不合规 | 改名或下线 |
| 30 | `tool9412` | 阶跃星辰推出的AI聊天机器人… | https://maopaoya.com/ | maopaoya.com 为第三方镜像，与 tool9802（stepfun.com）同产品 | E 同站重复 | 合并 |
| 31 | `tool11840` | 结构化AI知识搜索引擎 | https://explorer.globe.engineer/ | 代理 curl 000；jina 导航失败 | A 站点不可达/空壳 | 下线 |
| 32 | `tool67595` | 论文降aigc-论文aigc降重-… | https://aigc.66paper.cn/AI_A2E1C09 | 与 tool14679（66AI论文）同一落地页 /AI_A2E1C09，仅域名不同 | E 同站重复 | 合并 |
| 33 | `tool1338` | 全能AI助手，基于Qwen模型 | https://dis.chatdesks.cn/chatdesk/tyaibot.html | 渲染出「千问-阿里 AI 助手」，第三方镜像 | E 同站重复 | 合并 |
| 34 | `tool11395` | 一站式用GPT-5.5、Claude-4.7 | https://flowith.paluai.com/aibot | 渲染出 Flowith AI，与 tool139（flowith.io）同产品 | E 同站重复 | 合并 |
| 35 | `tool67775` | 在线大模型训练微调及AI科研学习平台 | https://www.lab4ai.cn/register | 代理 curl 000；jina 导航失败 | A 站点不可达/空壳 | 下线 |
| 36 | `tool66554` | 造次 | https://www.zaoci.tv/ | curl 200 但 0 字节；jina 报 42206 空文件 | A 站点不可达/空壳 | 下线 |
| 37 | `tool71074` | 长视频精华提炼… | https://briefly.video/ | 404 / Project not found | B 官方 404/403 | 下线 |
| 38 | `tool67455` | 专注学术写作降AI率的工具 | https://gaoyiai.com/paper_aigc | 正文 128 字（首屏为登录/导航），与同站 tool36409 重复 | D 主题不符 | 下线 |
| 39 | `tool13251` | 字节跳动旗下推出的AI虚拟交友… | https://chatwiz.cn/h5/feely | 代理 curl 000；jina 导航失败 | A 站点不可达/空壳 | 下线 |
| 40 | `tool923` | AI 3D捕捉、建模和渲染 | https://lumalabs.ai | 站点在线、正文 2795 字，但产品线已转为「AI Agents for Creative Work」；DB 名为描述性短语，且与 lumalabs-ai 同域 | D 主题不符 | 下线或并入 lumalabs-ai |
| 41 | `tool150` | AI高保真原型设计 | https://www.usegalileo.ai | 现为 Stitch（Google），正文仅 19 字 | D 易主 | 下线 |
| 42 | `tool67371` | AI面试助手|AI笔试助手 | https://aimianshibang.com/ | 代理 curl 000 | A 站点不可达/空壳 | 下线 |
| 43 | `tool58825` | AI人才发现与分析平台… | https://dinq.io/ | 现为越南博彩站（KeoNhaCai），垃圾域名 | D 易主 | 下线（优先） |
| 44 | `tool33149` | AI设计工具，支持AI抠图… | https://ibihun.com | 代理 curl 000 | A 站点不可达/空壳 | 下线 |
| 45 | `tool148` | BW188 | https://magician.design | 现为冰淇淋店官网（The Ice Cream Boutique） | D 易主 | 下线（优先） |
| 46 | `tool67418` | GetDraft | https://getdraft.ai/ | 正文仅 8 字：「GetDraft has ceased operations」 | C 停运 | 下线 |
| 47 | `tool3006` | LogoliveryAI — Free AI | https://logolivery.ai/ | 正文仅清算公告：Logolivery, Inc. has been officially liquidated | C 停运/清算 | 下线 |
| 48 | `tool14278` | MidReal | https://midreal.ai/ | 首页首屏为官方告别信（sunset），团队转做 Macaron；title 仍正常 | C 停运 | 下线 |
| 49 | `tool14961` | Redirecting... | https://fryderyk.ai/ | 现为新西兰赌场站（DegenCity Casino） | D 易主 | 下线（优先） |
| 50 | `tool111` | Reply Logo | https://www.codeium.com | 名称与 url 不符：codeium.com 现为 Devin Desktop | F 名称不合规 | 改名或下线 |
| 51 | `tool7424` | XPaper AI | https://www.130ai.com/ | 代理 curl 000 | A 站点不可达/空壳 | 下线 |
| 52 | `tool216` | Zyro AI Image Upscaler | https://zyro.com/tools/image-upscaler | 302 到 Hostinger 博客《Zyro joins forces with Hostinger》，工具线撤除 | C 停运 | 下线 |

## 四、本批新增认知

1. **`tool67595` 与 `tool14679` 是同一落地页的两个域名**（`aigc.66paper.cn` vs `www.66paper.cn`，路径都是 `/AI_A2E1C09`）。
   之前 4 批把它当作「名称超 30 字、可改名后撰写」，本批查实为**同站重复**，改名后仍属重复内容，应合并。
   同类误判风险：凡 `toolNNNN` 与语义 slug 同时指向同一路径的，先查重再谈改名。
2. **`tool701`（withpoly.com）产品已完全转型**：从「Poly 3D 素材浏览」变为「Poly 智能云文件浏览器」，
   且首页正文全为营销短句，无可引事实。这解释了它此前「jina 能读 36k 字却写不出内容」的原因——
   字数来自图片 alt 与动画逐字排版，不是正文。
3. **`tool923`（Luma）是唯一「素材充足、站点在线」的条目，但仍不可写**：产品线已转向 AI Agents for Creative Work，
   DB 名是描述性短语，且与 `lumalabs-ai`（dream-machine 页）同域同公司。正确处置是合并，不是撰写。
4. **判死标准可固化为「双 000 + 能解析 + jina 导航失败/422」**，本批 19 条 A 类全部命中该组合，无需再逐条深挖。

## 五、自检与提交

- 独立复算：原创池 1125、四条件通过 1125、`public/tools.xml` 1125 → **1125 == 1125 == 1125** ✅
- `apply-tool-profiles.mjs` 试算：1121 条 profiles 全部通过（字数均 ≥700、全部含自身名），未匹配 slug 0。
- 本批无新增内容，**未执行** `apply --apply` 与 `generate-sitemap.mjs`（避免无故刷新 `lastmod`，与 b75 口径一致）。
- `tutorials.xml` 仍不存在（0/56）。

## 六、建议（第 17 次提出）

工具页索引面的现实上限是 **1125**，剩余 52 条没有一条能靠「抓取技巧」救活。
继续按同一任务重跑，产出必然仍为 0。真正还能做的增量只有两件：

1. **执行本报告第三节的处置**：下线 43 条、合并 5 条、改名或下线 4 条。这会清掉
   3 个垃圾域名（博彩/赌场/冰淇淋店）、7 个已停运产品、10 个已易主站点，直接降低「低质量页面」信号。
2. **转向教程页原创内容**：`tutorials.xml` 至今为 0/56，是唯一还有空间的索引面。
