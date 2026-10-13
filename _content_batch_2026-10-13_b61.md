# 第六十一批原创资料（2026-10-13）

> 站点：taoai365.com（`D:\ai-nav-site`）｜ 依据 `docs/original-content-sop.md`
> 目标：AdSense「低价值内容 / scaled content abuse」整改的内容生产

## 结果概览

| 指标 | 数值 |
|---|---|
| 本批新增原创资料 | **6 条** |
| 因素材缺失/判废跳过 | **119 条**（全量待写 125 条经四轮抓取后大多为死域名/劫持站/名称—页面不符） |
| 累计可索引工具页 | **1058 条**（上批 1052） |
| 剩余待写 | **119 条** |
| 自洽校验 | 原创池 1058 == 四条件通过 1058 == `public/tools.xml` 1058 ✅（池内未通过 0、孤儿 profile 0） |
| Git | commit `bee79c44`，push main 成功（`98823dfd..bee79c44`） |

## 本批 6 条明细

| slug | 名称 | 字数 | 来源 |
|---|---|---|---|
| mastergo-com | MasterGo AI | 1070 | `mastergo.com/ai` |
| tool68088 | 言笔AI | 722 | `www.yanbiai.com/tools/paper-pass` |
| tool1520 | DeepSpeed | 842 | `www.deepspeed.ai/`、GitHub 官方仓库 README |
| tool72406 | Scholar Search（切问学术） | 730 | `qiewenpaper.com/zh` |
| tool1444 | ShowMeAI | 750 | `www.showmeai.tech/` |
| tool68533 | 猫头鹰智能网页订阅 | 787 | `www.mtywatch.com/` |

每篇均按 SOP 四节结构撰写（是什么 / 主要功能 / 如何使用 / 应用场景），每节均出现工具名，
正文纯文本字符数 722–1070（门槛 600，稳妥线 700）。

## 名称修正（脏名 / 抓取残留 → 品牌名）

| slug | 原 DB 名 | 修正为 |
|---|---|---|
| mastergo-com | AI实验室 | MasterGo AI |
| tool68088 | 研笔AI | 言笔AI（站点品牌为「言笔AI」） |
| tool1520 | Latest News | DeepSpeed |
| tool1444 | 人工智能领域的资料库和学习社区 | ShowMeAI |
| tool68533 | 一句话搞定任意网页的内容监控 | 猫头鹰智能网页订阅 |

## 抓取与判废记录

- **四轮实测**：直连 HTTP 探测（125 条，仅 76 条回 200）→ 代理 curl 重试 49 条 → `r.jina.ai` 渲染 46 条 → WebFetch 子页/官网。
- **确认已死域名**（`r.jina.ai` 报 could not resolve hostname）：noisee.ai、museland.ai、hitems.ai、visual-electric.com、boba.video、pagentia.com、telehire.ai、voxcraft.ai、yanqueai.com、photonaiclub.com、hsphoto.cn、xanswer.com、writingpal.ai、leewow.com、humva.ai、tool2676(175.fun)、tool1890(neeva)、tool2106(getgetai)、tool12880、tool1444 以外多项等。
- **域名劫持成博彩站**：tool744（HABANERO188）、tool148（BETWIN188）、tool58825（KeoNhaCai）、tool1333（qy球友会）。
- **停服 / 已下架**：6pen.art（「致谢与新篇章」迁移 6pen Pro）、resemble.ai/voice-cloning（Product Notice：该产品已不再提供，与 DB 名「AI人声生成工具」不符）、creatie.ai（域名挂牌 10 万美元出售）、tool3006(LogoliveryAI)、tool67418(GetDraft)、tool14278(MidReal)、tool1965(Beatbot)。
- **名称—页面不符 / 脏数据**：tool16669（创一AI→咔咔猩）、tool150（usegalileo→Google Stitch）、tool923（lumalabs 转视频）、tool140（you.com 转 Search API）、tool59（Magic Write→笔灵）、tool726（DB 名 Adobe Firefly / 页面为炉米 Lumi）、tool151（DB 名 Stockimg AI / 页面为改图鸭）、tool1989（DB 名 阿里云智能logo设计 / 页面为阿里云万网）、tool68863（面试通→笔面通）、tool8681（与既有 reecho 为同产品）、world-liberty-financ、hotshot-co（导购博客）、tool596（Riffusion→Google Flow Music）、duiyou-ai（堆友AI→美图设计室）。
- **纯第三方导航描述、无官方来源**（按红线跳过）：xanswer-com、baoyueai-com、telehire-ai、pagentia-com、leewow、humva-ai、writingpal-ai、miaohui-jixueai-com、miantuan-knowfuture-com-cn、ask-xiaoyuzhoufm-com、tool2404、tool1890、tool11853、tool16079、tool174 等。
- **通用名 / 描述性名称**：ai-bot（AI工具集）、tool67595（名称超 30 字）、tool6316、tool68863 等按红线跳过。

## 自检记录

- 官方试算：6/6 含自身名；字数 722–1070。
- 去标签 14-gram 跨条目查重：**终检 0 命中**。首检 18 处全部集中在 `tool1444`（ShowMeAI）与既有 `udacity` 的**枚举串**（「机器学习、深度学习、计算机视觉、自然语言处理」「Python、机器学习、深度学习」），改写为「机器学习与深度学习两大主干，并向计算机视觉、自然语言处理等方向延伸」后清零。
- 独立复算四条件（原创池 ∩ 名称干净 ∩ ≥600 字 ∩ 含自身名）== `tools.xml` 条数 == 1058。

## 下一批提示（待写 119 条）

- 本批把 125 条全量四轮实测完毕，**剩余 119 条基本是「域名已死 / 被劫持 / 已停服 / 名称—页面不符 / 纯第三方描述」五类**，可写余量极低（本批 6 条已低于上批 9 条）。
- 有效抓手排序：① 代理 curl 抓产品官网/子页（直连几乎全挂）；② WebFetch 读官方文档中心与官网（本批 ShowMeAI、MasterGo、切问、猫头鹰均由 WebFetch 拿到可用正文）；③ GitHub raw README（仅限开源项目且 DB 名非截断）；④ `r.jina.ai` 渲染（本批仅对少量站点有效，且已死域名只报 resolve 失败）。
- 固定动作：写作前先核对「DB 名能否自然嵌入正文 / url 是否为产品官网」，脏名先改再写；写完跑两道自检（逐节复算门槛 + 去标签 14-gram 查重）；按实际素材量如实上报，不为凑数放宽「名称—页面相符」底线。
