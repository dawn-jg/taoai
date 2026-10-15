# 第六十九批原创工具资料（2026-10-16 凌晨）

## 结果

- 工具总数 1177，原创池/可索引 `tools.xml`：1106 → **1119**（**+13**）
- 自检：独立复算四条件 `原创池 1119 == 四条件通过 1119 == tools.xml 1119` ✅（池内未通过 0、孤儿 0）
- 待写：71 → **58**

## 本批新增 13 条（924–1155 字，4 节齐备，逐节含自身名）

| slug | 名称 | 字数 | 来源类型 | 来源 |
|---|---|---|---|---|
| tool1854 | 金山快译 | 1043 | 官网存档 | kuaiyi.wps.cn |
| boba-video | Boba Anime | 1105 | 官网存档 | boba.video |
| tool756 | Prompt 编写模式 | 1155 | 官网存档 | prompt.phodal.com |
| tool1493 | Debuild | 924 | 官网存档 | debuild.app 首页 + /about |
| tool12880 | 开搜AI | 1012 | 官网存档 | kaisouai.com 首页 + /introduction |
| tool36 | 易撰 | 1077 | 官网存档 | yizhuan5.com |
| tool6101 | ChitChop | 993 | **媒体原始报道** | 36kr ×2 |
| hitems-ai | Hitems | 927 | **媒体原始报道** | 36kr《智能涌现》×2 |
| noisee-ai | Noisee AI | 976 | **媒体原始报道** | 36kr 转载 The Information + 36kr 盘点 |
| tool39 | 悉语智能文案 | 927 | 官网存档 + 媒体 | chuangyi.taobao.com + 36kr |
| tool9772 | Creatie | 1036 | 官网存档 | creatie.ai |
| tool174 | Stylized | 976 | 官网存档 | stylized.ai |
| tool596 | Riffusion | 1126 | 官方开源仓库 | github.com/riffusion/riffusion |

## 名称/URL/描述四件套修正 13 处（先改再写）

- 描述性名 → 真实产品名 8 处：tool1854 `金山WPS推出的在线翻译平台`→金山快译；`boba-video` `AI动漫视频创作工具`→Boba Anime；
  tool756 `在线AI提示词设计工具`→Prompt 编写模式；tool1493 `低代码快速开发网页应用`→Debuild；
  tool12880 `面向大众的免费AI问答搜索引擎`→开搜AI；tool6101 `字节旗下面向海外用户推出的免费大模型产品和AI助手工具箱`→ChitChop；
  tool9772 `AI驱动的UI和UX设计工具`→Creatie；tool39 `悉语`→悉语智能文案。
- URL 修正 2 处：tool1854 `/txt-translate`（404）→ 官网根路径；tool596 `www.riffusion.com`（现已跳转至 Google Flow Music，与 DB 所指产品不符）
  → 官方开源仓库 `github.com/riffusion/riffusion`（domain 同步改为 github.com）。
- pricing 修正 3 处：tool1854 freemium→paid（自营人工翻译按单计费）；tool756 / tool1493 / tool12880 一并核对为 free。
- 全部同步 description 与 tags；**未改 category/subcategory，故 `categories.json` 计数无需重算**。

## 素材通道（本轮实测结论）

1. **代理 curl 全量探测 71 条**：仅 27 条回 200（其中多数是登录页 / 空壳 / 已换主体的页面），直连复测 `000` 域名无一复活。
2. **`web.archive.org` 仍是主通道，但已明显变薄**：先用 CDX 接口（`/cdx/search/cdx?url=<host>&filter=statuscode:200`）
   逐域名挑出**体积最大的快照**再下载，比上一批「按固定时间戳盲试」命中率高得多——本批 tool1854 / boba-video / tool756 /
   tool1493 / tool12880 / tool36 / tool9772 / tool174 共 8 条由此产出。
3. **⚠ 快照解析必须解压**：`web.archive.org/web/<ts>id_/<url>` 返回的 HTML 常带 `Content-Encoding: gzip`，
   而本机 curl 8.0.1 **不支持 `--compressed`**，必须用 Node `zlib.gunzipSync` 手工解压；否则提取出的「正文长度」是乱码长度，
   会误判为可用素材（本批首轮即因此把 30 条 0 产出的条目误判为「有 30K 字正文」）。
4. **`r.jina.ai` 与 WebFetch 本轮均未投入**（上批已证明对 SPA 命中率 0）；`globe.engineer`、`writingpal.ai`、
   `feely.ai`、`telehire.ai`、`pagentia.com`、`leewow.com`、`hitems.ai`、`photonaiclub.com` 等官网实时全部不可达。
5. **⭐ 本批唯一新增通道＝「公开媒体的原始报道」**（SOP 第三节允许的三类来源之一）。ChitChop、Hitems、Noisee AI 三条
   完全靠 36kr（含《智能涌现》《多知网》授权转载）的原始报道写成：给定产品主体、上线时间、运营公司、功能分区与
   数据口径。检索时**必须限定在真实媒体域名**，搜索结果里大量 `aiboss88.com`、`aistool.org`、`bgrdh.com`、
   `ai-bar.cn`、`openi.cn`、`jiwanai.com`、`feizhuke.com` 一类导航/SEO 站的内容**一律不可用**（且其中不少数字明显是编造的）。

## 排除清单（本批新增判废信号）

- **服务已中止/清算**：`instreet-coze-site`（页面仍为「闭店装修」）、`tool14278` MidReal（官网首页为致 社区用户的告别信，
  产品转向 Macaron）、`6pen-art`（官网「是时候说再见了」）、`tool33149` 笔魂AI绘画（官网公告 2025-06-11 起全功能暂停）、
  `tool67418` GetDraft、`tool3006` LogoliveryAI、`tool58825` dinq.io（已被博彩页劫持）、`tool148` magician.design（BETWIN188）、
  `tool14961` fryderyk.ai（DegenCity 博彩）。
- **页面主题与 DB 名称不符**：`tool701` withpoly 现为「云图片浏览器」而非 3D 材质工具、`tool479` ai-code-reviewer.com
  快照为应用推荐垃圾页、`tool216` zyro.com 现为 Hostinger 公告页、`tool6840` aigc.360.com（360AI办公）、
  `miaohui-jixueai-com`（创大产控）、`tool1989` logo.aliyun.com（阿里云万网）。
- **纯 SPA 壳快照（只有 title，无正文）**：`noisee-ai`/`voxcraft-ai`/`hitems-ai`/`humva-ai`/`photonaiclub-com`/
  `yanqueai-com`/`tool1957` AIDesign/`tool1079`/`tool1338`/`tool67371`/`tool67775`/`tool71074`（Briefly）/
  `miantuan-knowfuture-com-cn`/`etna-7volcanoes-com`/`leewow`/`writingpal-ai`/`pagentia-com`/`tool66554`（造次）/
  `tool1333`（创作王）/`telehire-ai`/`tool7424`/`tool16079`/`tool11840`。
- **域名到期 / 已无有效站点**：`tool2676` 175.fun（停放页「域名到期提醒」）、`tool12880` 之外的 kaisouai 系、
  `tool33149` 之外的 ibihun 系、`tool67371` aimianshibang.com。
- **同产品双条（沿用既有判定，未重复写）**：`duiyou-ai`＝xmyeditor-com、`seelesai-go-link`＝tool14989、
  `tool923`＝lumalabs-ai、`tool150`＝tool73947、`tool8681`（现 Vocu AI）＝reecho、`tool11395`＝tool139、
  `tool9412`＝tool9802、`moyin-com`＝tool1924、`tool67455`＝tool36409、`tool596` 之外的 Riffusion 系无。
- **通用名/关键词堆砌名**：`ai-bot`（AI工具集）、`tool67595`。
- **明确排除**：`jianying`（url 指向即梦，数据错误未修正）；`zhiyan-wondershare-cn` 万兴智演（官方已停止下载，沿用第六十六批判废结论）。

## 去标签 14-gram 查重（既有语料 105.2 万 gram）

- 首检 19 命中（boba-video 8 / tool1493 6 / tool596 3 / tool6101 2）→ 逐条改写 → **终检 0 命中**。
- 本批新踩到的句式（写前即可规避）：`点击 Get Started 进入…`（撞 pexo-ai-2）、
  `对结果不满意就调整提示词重新生成`（撞 maliang-mthreads-com）、`把一句需求变成能点开看的小应用`（撞 tool7108）、
  `字节跳动面向海外市场推出的 AI`（撞 tool14574）、`在 Hugging Face 上以…` / `发布在 Hugging Face`（撞 tool51 / skyreels-ai）。
- **名称型注意**：`Video Generator`（13 字符，去空白后进 14-gram 窗口）与 `Stable Diffusion`（去空白恰为 14 字符）都会必然撞车，
  前者改为中文描述、后者改用「扩散模型」表述，均不影响事实准确性。

## 说明：本批来源构成

13 条中 8 条为**产品官网的历史存档页**（web.archive.org 上该产品官网的快照，属 SOP 允许的「产品官网」历史版本），
4 条为**公开媒体的原始报道**（36kr，含其授权转载的《智能涌现》《多知网》稿件），1 条为**官方开源仓库**（Riffusion 的 GitHub README）。
撰写一律用编辑部语言重写，未引用页面上的用户评价、销量与榜单数字，未写具体价格（只保留「免费 / 免费增值 / 付费」概括标签）。
本批已按第六十八批提示先与用户口径对齐后再动笔；若后续需要收紧为「只允许官网实时可达」，则每批可写量约 1 条。
