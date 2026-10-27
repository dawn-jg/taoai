# 第 115 批原创资料生产记录（2026-10-28 凌晨）

> 任务口径：为 taoai365.com 批量续写工具页原创资料，目标 15–20 条。
> 实际产出：**0 条**（连续第 45 批）。本文说明为什么是 0，并把「52 条死条目」整理成一份可直接执行的处置清单。

---

## 一、基线（独立复算，与 b114 一致）

| 指标 | 数值 |
|---|---|
| 工具总数 | 1177 |
| 原创池（editorials 5 ∪ profiles 1121，重叠 1） | 1125 |
| 四条件通过 = 可索引 | **1125** |
| `public/tools.xml` 条数 | **1125** ✅ 双向差集 0 / 0 |
| 池内四项失败（名称不干净 / 正文 <600 / 不含自身名） | 0 / 0 / 0 |
| 待写（不在原创池） | **52** |

复算严格照抄 `lib/tools.ts`：`detailed_content[].html` 拼接 → 去标签 → 去空白 → ≥600 → 含 `normalizeName(name)`（只去空白、不改大小写）。
起始 HEAD `42aec2a8`；`content-queue.mjs --top 24 --save` 后 `data/content_queue.json` **零 diff**，名单自 b92 起 22 批未变。
`apply-tool-profiles.mjs` 试算：1121 条全部匹配、未匹配 0。

> 本批未跑 `--apply`、未跑 `generate-sitemap`——无内容可合并，跑只会刷 `lastmod` 制造假更新信号。

## 二、本批新增：第 6 类通道实测 —— Wayback 归档（此前 5 类通道未包含）

b77–b114 试过的是：直连 / 代理 curl / 渲染读取（r.jina.ai）/ 官方子页 / sitemap 枚举。本批首次把 **Internet Archive 快照**当第 6 类通道。

| 环节 | 结果 |
|---|---|
| 直连 `archive.org` | 超时（exit 28），不可用 |
| 经代理 `127.0.0.1:7897` | **可用**（baidu 与代理本批均 200，通道未挂） |
| 9 个候选域名查询 `/wayback/available` | 9/9 都有 2024–2026 的 200 快照 |
| 抓取 `phind.com` 2026-01-30 快照 | 234KB 拿到，但**去标签后正文仅 240 字符**（SPA 壳只留下拉项） |
| 可写条目 | **0** |

结论：归档通道**技术可用**，但对这批条目不解决问题，原因不是「取不到页面」：

1. 快照正文同样只剩首屏壳（Phind 240 字，够不到 700 字门槛；硬写就只能凭记忆补功能，违反「不虚构」）；
2. 更根本的是这些条目**现在的站点已不提供该产品**：本批 52 条实测中 19 条 TLS 握手失败 / 证书过期、4 条 404、9 条重定向到别家产品。归档里的旧文案描述的是一个今天已不存在（或已易主）的服务，写成「当前功能」同样是误导。

## 三、本批新增确证：9 条重定向的落地地址（逐条打开核对）

```
moyin-com      x.moyin.com              → www.moyin.com（魔音工坊，站内已有 tool1924）
tool6840       aigc.360.com             → bangong.360.cn（360 AI 办公会员页，站内已有 bangong-360-cn）
tool216        zyro.com/tools/…         → hostinger.com/blog（《Zyro joins forces with Hostinger》公告）
flow-studio    flowgpt.com/flow-studio  → flowgpt.com 首页（落地是 FlowGPT，非 Flow Studio）
tool58825      dinq.io                  → clepto.io（越南博彩 KeoNhaCai 5，博彩域名仍在现网）
tool111        codeium.com              → devin.ai/desktop（Codeium 已并入 Devin）
tool150        usegalileo.ai            → stitch.withgoogle.com（Galileo 并入 Google Stitch）
tool701        withpoly.com/…           → poly.app（Poly 已迁新域，旧路径失效）
tool148        magician.design          → theicecreamboutique.com（无关电商站占用域名）
```

本批唯一「正向」信号：**`tool923`（Luma AI，lumalabs.ai 200/306KB）与 `ask-xiaoyuzhoufm-com`（小宇宙 AI 搜索，200/28KB）两个产品是活的**，卡住的只是条目名——DB 里分别叫「AI 3D捕捉、建模和渲染」「小宇宙推出的AI搜索产品」，属描述性名称，会让「正文含自身名」校验失去意义。**这两条只要先改名为「Luma AI」「小宇宙 AI 搜索」，就能立刻写成原创页**（+2）。改名属数据变更，本批未动。

## 四、52 条处置清单（本批实测，可直接作为清理工单）

处置分布：**下线 44 / 合并 4 / 改名后可写 2 / 暂挂 2**。执行后工具数 1177 → 约 1133，可顺带移除现网博彩域名（clepto.io ← dinq.io、magician.design 已易主、fryderyk.ai、aiapp.cc）。

| # | slug | 名称 | URL | 本批实测 | 处置建议 |
|---|---|---|---|---|---|
| 1 | `tool67418` | GetDraft | https://getdraft.ai/ | 200 921B（GetDraft 已公告停止运营） | 下线（noindex → 移出 tools.json） |
| 2 | `tool14278` | MidReal | https://midreal.ai/ | 307 15B（MidReal 停运告别信（团队转向 Macaron）） | 下线（noindex → 移出 tools.json） |
| 3 | `moyin-com` | 魔撰写作 | https://x.moyin.com/ | 重定向 → www.moyin.com（魔音工坊） 162B | 合并 → tool1924（魔音工坊） |
| 4 | `tool7424` | XPaper AI | https://www.130ai.com/ | TLS 握手失败 | 下线（noindex → 移出 tools.json） |
| 5 | `photonaiclub-com` | 光子AI | https://www.photonaiclub.com/sh/ZgN25IHnBJY | TLS 握手失败 | 下线（noindex → 移出 tools.json） |
| 6 | `tool1333` | 创作王 | https://aiapp.cc/ | 403（历史为博彩落地页） | 下线（noindex → 移出 tools.json） |
| 7 | `miaohui-jixueai-com` | 秒绘AI | https://miaohui.jixueai.com/ | 证书过期（域名已易主为「创大产控」，非原产品页） | 下线（noindex → 移出 tools.json） |
| 8 | `photonaiclub-com-2` | 光子AI抠图 | https://www.photonaiclub.com/workspace/cutout | TLS 握手失败 | 下线（noindex → 移出 tools.json） |
| 9 | `voxcraft-ai` | VoxCraft | https://voxcraft.ai/ | 证书过期 | 下线（noindex → 移出 tools.json） |
| 10 | `6pen-art` | 6pen Art | https://6pen.art/ | 证书根不受信（官方公告站点已关闭） | 下线（noindex → 移出 tools.json） |
| 11 | `tool2676` | 175FUN | https://175.fun/ | TLS 握手失败 | 下线（noindex → 移出 tools.json） |
| 12 | `tool6840` | 360智绘 | https://aigc.360.com/ | 重定向 → bangong.360.cn（360 AI 办公会员页） 162B | 合并 → bangong-360-cn（360 AI 办公） |
| 13 | `tool216` | Zyro AI Image Upscaler | https://zyro.com/tools/image-upscaler | 重定向 → hostinger.com/blog（Zyro 并入 Hostinger 公告） 167B（缓存正文为 Hostinger 全站导航，无图像放大内容） | 下线（noindex → 移出 tools.json） |
| 14 | `tool66554` | 造次 | https://www.zaoci.tv/ | 200（200 但 0 字节（空响应）） | 下线（noindex → 移出 tools.json） |
| 15 | `flow-studio` | Flow Studio | https://flowgpt.com/flow-studio | 重定向 → flowgpt.com 首页（落地为 FlowGPT，非 Flow Studio） 1B | 下线（noindex → 移出 tools.json） |
| 16 | `hotshot-co` | Hotshot | https://hotshot.co/ | 200 704033B（域名易主为 2026 科技内容博客） | 下线（noindex → 移出 tools.json） |
| 17 | `etna-7volcanoes-com` | Etna | https://etna.7volcanoes.com/ | TLS 握手失败 | 下线（noindex → 移出 tools.json） |
| 18 | `humva-ai` | Humva | https://humva.ai/ | 200 5604B（ParkLogic 停放页） | 下线（noindex → 移出 tools.json） |
| 19 | `tool67371` | AI面试助手/AI笔试助手 | https://aimianshibang.com/ | TLS 握手失败 | 下线（noindex → 移出 tools.json） |
| 20 | `telehire-ai` | 最轻量级的全领域AI面试官 | https://www.telehire.ai/ | TLS 握手失败 | 下线（noindex → 移出 tools.json） |
| 21 | `tool58825` | AI人才发现与分析平台，精准识别AI精英 | https://dinq.io/ | 重定向 → clepto.io（越南博彩 KeoNhaCai 5） 167B | 下线（noindex → 移出 tools.json） |
| 22 | `ai-bot` | AI工具集 | https://ai-bot.cn | 200 744973B | 暂挂（通用名，需先人工定名） |
| 23 | `tool71074` | 长视频精华提炼，自动追踪频道中文推送 | https://briefly.video/ | 404 1260B | 下线（noindex → 移出 tools.json） |
| 24 | `tool11395` | 一站式用GPT-5.5、Claude-4.7 | https://flowith.paluai.com/aibot | 200 698B（698 字节空壳） | 下线（noindex → 移出 tools.json） |
| 25 | `seelesai-go-link` | 全球首个端到端AI 3D游戏生成工具 | https://seelesai.go.link/kw8uW | 302 49B | 合并 → tool14989（SeeleAgent） |
| 26 | `tool1338` | 全能AI助手，基于Qwen模型 | https://dis.chatdesks.cn/chatdesk/tyaibot.html | 200 633B（633 字节空壳） | 下线（noindex → 移出 tools.json） |
| 27 | `tool1890` | Neeva | https://neeva.com/ | 200 5607B（Neeva 已于 2023 年被 Snowflake 收购并停运） | 下线（noindex → 移出 tools.json） |
| 28 | `tool9412` | 阶跃星辰推出的AI聊天机器人和智能体平台 | https://maopaoya.com/ | TLS 握手失败 | 下线（noindex → 移出 tools.json） |
| 29 | `tool111` | Reply Logo | https://www.codeium.com | 重定向 → devin.ai/desktop（Codeium 已并入 Devin） 15B | 合并 → preview-devin-ai（Devin） |
| 30 | `tool479` | AI代码检查 | https://ai-code-reviewer.com | 404 | 下线（noindex → 移出 tools.json） |
| 31 | `tool13251` | 字节跳动旗下推出的AI虚拟交友聊天平台 | https://chatwiz.cn/h5/feely | TLS 握手失败 | 下线（noindex → 移出 tools.json） |
| 32 | `tool33149` | AI设计工具，支持AI抠图、消除、无损放大 | https://ibihun.com | TLS 握手失败 | 下线（noindex → 移出 tools.json） |
| 33 | `yanqueai-com` | AI LOGO设计工具 | https://www.yanqueai.com | 404 555B（nginx 504/404，站点无页面） | 下线（noindex → 移出 tools.json） |
| 34 | `tool3006` | LogoliveryAI — Free AI | https://logolivery.ai/ | 200 2490B（2490 字节空壳） | 下线（noindex → 移出 tools.json） |
| 35 | `tool150` | AI高保真原型设计 | https://www.usegalileo.ai | 重定向 → stitch.withgoogle.com（Galileo 并入 Google Stitch） 30B | 下线（noindex → 移出 tools.json） |
| 36 | `duiyou-ai` | 堆友AI | https://www.designkit.cn/ | 200 426628B | 下线（designkit.cn 实为美图设计室，已由 xmyeditor-com 收录） |
| 37 | `tool923` | AI 3D捕捉、建模和渲染 | https://lumalabs.ai | 200 306185B（lumalabs.ai 存活，但条目名为描述性名称「AI 3D捕捉、建模和渲染」） | 改名「Luma AI」后可写（官网 lumalabs.ai 存活 306KB） |
| 38 | `tool1957` | AIDesign | https://ailogo.qq.com/ | TLS 握手失败（ailogo.qq.com 已下线） | 下线（noindex → 移出 tools.json） |
| 39 | `tool701` | AI生成3D材质 | https://withpoly.com/browse/textures | 重定向 → poly.app（Poly 已迁新域） 167B | 下线（noindex → 移出 tools.json） |
| 40 | `tool148` | BW188 | https://magician.design | 重定向 → theicecreamboutique.com（域名已被无关电商占用） 167B | 下线（noindex → 移出 tools.json） |
| 41 | `writingpal-ai` | WritingPal | https://writingpal.ai/ | 连接超时 | 下线（noindex → 移出 tools.json） |
| 42 | `xanswer-com` | 支持生成思维导图的免费AI搜索工具 | https://www.xanswer.com/ | TLS 握手失败 | 下线（noindex → 移出 tools.json） |
| 43 | `pagentia-com` | AI专利查新检索与撰写平台 | https://pagentia.com/ | 证书域名不符 | 下线（noindex → 移出 tools.json） |
| 44 | `tool14961` | Redirecting... | https://fryderyk.ai/ | 200 51207B（域名被赌场站占用（DegenCity）） | 下线（noindex → 移出 tools.json） |
| 45 | `ask-xiaoyuzhoufm-com` | 小宇宙推出的AI搜索产品 | https://ask.xiaoyuzhoufm.com/ | 200 28056B（200 存活，但条目名为描述性名称） | 改名「小宇宙 AI 搜索」后可写（200 存活 28KB） |
| 46 | `tool11840` | 结构化AI知识搜索引擎 | https://explorer.globe.engineer/ | TLS 握手失败 | 下线（noindex → 移出 tools.json） |
| 47 | `phind-com` | Phind | https://www.phind.com/ | 404 107B | 暂挂（站点存活但 CF 反爬，归档仅 240 字事实） |
| 48 | `tool67775` | 在线大模型训练微调及AI科研学习平台 | https://www.lab4ai.cn/register | TLS 握手无效 | 下线（noindex → 移出 tools.json） |
| 49 | `tool1079` | 阿里云登录 | https://m6.aliyun.com/# | 200 201B（阿里云登录页（非工具页）） | 下线（noindex → 移出 tools.json） |
| 50 | `tool67455` | 专注学术写作降AI率的工具 | https://gaoyiai.com/paper_aigc | 200 5834B（5834 字节，正文不提自身名） | 下线（noindex → 移出 tools.json） |
| 51 | `tool67595` | 论文降aigc-论文aigc降重-AI痕迹降低-论文 | https://aigc.66paper.cn/AI_A2E1C09 | 200 43164B（脏名（含多重连字符）） | 下线（noindex → 移出 tools.json） |
| 52 | `miantuan-knowfuture-com-cn` | 面团AI | https://miantuan.knowfuture.com.cn/ | 连接超时 | 下线（noindex → 移出 tools.json） |

## 五、自检

- 四条件 1125 == `tools.xml` 1125 ✅，池内四项失败 0/0/0；双向差集 0/0
- `apply-tool-profiles.mjs` 试算 1121 全匹配、未匹配 0；未跑 `--apply`、未跑 `generate-sitemap`
- 工作区仅本报告一个新增文件；`.tmp_b115_*`、`.tmp_raw_b115/` 提交前已清

## 六、结论（第 45 次同结论）

**工具页索引面上限 = 1125；按本任务口径重跑，产能恒为 0。** 剩余 52 条不是「素材难抓」，而是「条目本身已死」：19 条证书/握手失败、9 条重定向到别家、4 条 404、其余为空壳或名称不合格。

三个能放量的动作，全部需要一次授权（本批已把 ① 的工单做好，见第四节）：

1. **52 条清理**：下线 44 / 合并 4（moyin-com→tool1924、tool6840→bangong-360-cn、tool111→preview-devin-ai、seelesai-go-link→tool14989），逐条证据见上表。
2. **2 条改名后可写**：`tool923`→Luma AI、`ask-xiaoyuzhoufm-com`→小宇宙 AI 搜索（官网均确认存活，改名即可产 2 条原创页）。
3. **教程页 56 条补正文**（+56，1125 → 1181，唯一成规模放量面）：现状 min/med/max = 145/232/316、≥600 为 0、无 `tutorials.xml`；8 条「实测/亲测」标题须先改口径。

若三项都不授权，本自动化的正确形态是**每周一次巡检**，而不是每批重跑——45 批零产出已足够证明这一点。
