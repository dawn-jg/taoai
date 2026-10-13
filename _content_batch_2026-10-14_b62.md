# 第六十二批原创资料批次小结（2026-10-14）

## 结果

- 基线：工具 1177 条，原创池/可索引 `tools.xml` 均 **1058**，待写 119（HEAD `0c4bbe82`）。
- 本批新增 **6** 条；累计可索引 **1064**；剩余待写 **113**。
- 自检：`原创池 1064 == 四条件通过 1064 == tools.xml 1064` ✅（池内未通过 0、孤儿 profile 0），6 条全部出现在 `tools.xml`。

## 本批 6 条（字数 = 去标签去空白）

| slug | 名称（修正后） | 字数 | 来源 |
|---|---|---|---|
| tool736 | Gemini | 981 | deepmind.google/technologies/gemini |
| tool393 | Writer | 752 | writer.com |
| tool772 | AirOps | 737 | www.airops.com |
| tool124 | Resemble AI | 751 | www.resemble.ai |
| tool151 | 改图鸭 | 755 | www.gaituya.com + /aiimg |
| tool726 | Adobe Firefly | 820 | adobe.com/products/firefly.html + firefly.adobe.com |

去标签 14-gram 查重：对站内约 99.7 万个既有 gram 查重，**0 命中**；逐节均含自身名。

## 关键判废结论（第一手复核）

对全部 119 条待写做了「代理 curl 直取 + 官方 sitemap 路径穷举 + r.jina.ai 渲染读取 + WebFetch」多轮实测，可写余量已见底：

- **域名已死（curl 000 / jina could not resolve）**：noisee-ai、voxcraft-ai、telehire-ai、6pen-art、baoyueai-com、zhiyan-wondershare-cn、hsphoto-cn、visual-electric、miantuan、pagentia、museland-ai、hitems-ai、humva-ai、leewow、writingpal-ai、xanswer-com、etna、tool2404、tool2676、tool1493、tool2771、tool9412、tool11840、tool71587、tool5572、tool6316、tool938、tool12880、tool7424、tool16079、tool10172、tool3051、tool13251 等。
- **域名被劫持成博彩站**：tool744（HABANERO188）、tool58825（KeoNhaCai）、tool148（BETWIN188）、tool14961（DegenCity）、tool1333、tool747。
- **已停服/归档/被收购**：tool439 Lobe、tool162 Obviously AI（现 Zams，站点归档）、tool14278 MidReal（sunset）、tool67418 GetDraft、tool3006 LogoliveryAI、tool302/tool216 Zyro（并入 Hostinger）、tool596 Riffusion（→ Google Flow Music）、tool140 you.com（转 Search API）、tool1890 Neeva。
- **同名产品重复（同产品第二/三条）**：tool923（lumalabs.ai，站内已有 `lumalabs-ai`）、tool8681（reecho.ai，已有 `reecho`）、tool111（codeium.com 现为 Devin，已有 `preview-devin-ai`）、tool67455（gaoyiai.com，已有 `tool36409` 稿易AI论文）、tool150（usegalileo.ai → Google Stitch，已有 `tool73947`）、tool3529（ClipDrop 系，已有 tool221/220/299）、duiyou-ai（designkit.cn 为美图设计室，已有 `xmyeditor-com`）、tool59（ibiling.cn 为笔灵AI写作，已有 3 条）。
- **名称—页面不符**：tool68863（笔面通/DB 面试通）、tool16669（咔咔猩/DB 创一AI）、tool6840（360AI办公/DB 360智绘）、tool151 原 DB 名 Stockimg AI 实为改图鸭（本批核对后按官网改名）。
- **门户/SPA 只剩壳**：instreet-coze-site（闭店装修，仅 83 字）、tool6840、tool16669、tool1338、tool66554、tool71074（briefly.video 构建缺失）等。

## 数据质量修正（随盘提交）

1. **6 条名称/URL 修正**（先改名再写，避免正文与页面主题不符）：
   - tool736 `Gemini 3.5` → `Gemini`（官网为 Gemini 模型家族页，不再标注 3.5 版本号）；
   - tool393 `Writer推出的AI内容检测工具` → `Writer`，分类 `ai-detection` → `ai-writing`；
   - tool772 `AI SQL语句生成和修改` → `AirOps`，分类 `ai-coding` → `ai-writing`；
   - tool124 `AI人声生成工具` → `Resemble AI`；
   - tool151 `Stockimg AI` → `改图鸭`；
   - tool726 url 由第三方 `ai-bot.cn/lumi`（炉米Lumi）改回官方 `www.adobe.com/products/firefly.html`，domain 同步 `adobe.com`。
2. 上述改名同步更新了 `description` 与 `tags`，并按 `dedupe-tools.mjs` 口径重算 `categories.json` 的 count（ai-writing 103→105、ai-coding 80→79、ai-detection 33→32）。

## 抓取经验（供后续批次）

- **Adobe 系（adobe.com / firefly.adobe.com）curl 与 r.jina.ai 均被拦（403 / AbuseAlleviationError），但 WebFetch 可以拿到完整产品页文案。** 大厂被墙站点优先试 WebFetch。
- **`r.jina.ai` 对已死域名只会返回 `could not resolve hostname`，对中文 SPA 常 `TimeoutError`**；本轮 8+5 次调用仅 FlowGPT 一次成功。
- **代理 curl 仍是主力**（`--proxy http://127.0.0.1:7897 -H "Accept-Encoding: identity"`），直连全部 000。
- 待写池 119 条里，**回 200 的约 25 条，其中绝大多数是劫持站/停服页/名称不符**；"扩大候选池"已无意义，产出按实际素材量如实上报。
