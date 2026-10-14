# 第六十四批原创资料小结（2026-10-14 午）

## 一、本批产出（新增 3 条，可索引 1070 → 1073）

| # | slug | 名称 | 分类 | 字数 | 来源 |
|---|---|---|---|---|---|
| 1 | tool747 | Moxby | AI提示指令 / Prompt提示词库 | 1331 | https://moxby.com/ · https://moxby.com/ai-prompt-library |
| 2 | tool68863 | 笔面通 | AI办公工具 / AI文档处理 | 904 | https://bimiantong.com/ |
| 3 | world-liberty-financ | WorldClaw | AI开发平台 / 模型部署平台 | 1006 | https://worldclaw.ai/ |

逐条 4 节齐备、逐节含自身名；去标签 14-gram 对约 106.3 万既有 gram 查重终检 0 命中。

## 二、名称修正 3 处（先改名再写）

- `tool747`「免费的AI 提示词资源平台」→ **Moxby**（旧名是描述性名称，会让「含自身名」校验失效；页面实际是 Moxby Marketplace）
- `tool68863`「面试通: AI面试助手，史上最强面试辅助工具」→ **笔面通**（页面品牌为「笔面通」，旧名首字错为「面试通」）
- `world-liberty-financ`「World Liberty Financ」→ **WorldClaw**（旧名是被截断的团队名；页面产品为 WorldClaw）

三处的 `description` 同步改写（旧描述里嵌了旧名）；`categories` / `tags` 未动。

## 三、抓取与判定（素材池已见底）

对 107 条待写做「代理 curl 全量探测 → 直连复测 → WebFetch 官方页/文档」三轮实测：

- 代理 curl：200 仅约 20 条，其余 000（域名已死）或 403/404（Cloudflare / 停服）。
- 直连复测 44 条 000 域名：仅 1 条回 200 且为 39 字节空壳，其余全灭。
- 可写存量极低，本批 3 条已是该池当前正常水平。

### 判废 / 跳过清单（第一手）

- **域名已死（000）约 44 条**：noisee.ai、voxcraft.ai、hitems.ai、humva.ai、leewow.com、museland.ai、pagentia.com、
  hsphoto.cn、visualelectric.com、6pen.art、baoyueai.com、telehire.ai、writingpal.ai、xanswer.com、kaisouai.com、
  tool3051(quest.ai)、tool1890(neeva.com)、tool2676(175.fun)、tool12880、tool11443、tool11840、tool11853、tool13251、
  tool1333、tool1493、tool16079、tool2106、tool2404、tool2771、tool33149、tool5572、tool6316、tool67371、tool67775、
  tool7424、tool756、tool9412、zhiyan.wondershare.cn 等。
- **劫持成博彩站**：tool148（BETWIN188）、tool744（HABANERO188）、tool58825（KeoNhaCai）。
- **停服 / 清算 / 下架**：tool14278 MidReal（官网公告 sunset，团队转向 Macaron）、
  tool3006 LogoliveryAI（官网公告 Inc. 已清算）、tool67418 GetDraft（空壳）、
  zhiyan-wondershare-cn 万兴智演（官网公告 2026-01-01 停止下载）、phind-com Phind（2026-01-16 关停，phind.com 与 /search 均 404）。
- **名称—页面不符 / 主体换壳**：tool16669（DB「创一AI」/ 现「咔咔猩」）、miaohui-jixueai-com（「秒绘AI」/ 现「创大产控」）、
  duiyou-ai（「堆友AI」/ designkit.cn 实为美图设计室）、tool6840（「360智绘」/ aigc.360.com 现为 360AI办公）、
  tool59（「Magic Write」/ 笔灵AI写作）、tool1989（「阿里云智能logo设计」/ 现「阿里云万网」）、
  tool596（Riffusion / 现 Google Flow Music）、tool8681（reecho / 现 Vocu AI）、hotshot-co（现为科技导购博客）、
  vgoapp-com（现为 VGO 效率工具）、tool923（lumalabs 转视频生成）、tool140（you.com 转 Search API）。
- **同产品重复**：tool111（codeium → Devin，撞 preview-devin-ai）、tool150（usegalileo → Google Stitch，撞 tool73947）、
  seelesai-go-link（撞 tool14989 SeeleAgent）、tool67455（gaoyiai.com/paper_aigc 撞 tool36409）、tool3529（ClipDrop 系）。
- **脏数据（名称与 URL 所指产品不一致）**：tool162（DB「AI调色板生成工具」/ obviously.ai 实为 no-code AutoML 工具
  Obviously AI）——名称、分类、描述三层都对不上，按硬约束跳过；**建议下一批先把它改名为「Obviously AI」
  并迁到 AI训练模型/开发平台分类后再写**（官网 obviously.ai 正文充足、可直接抓取）。
- **通用名 / 描述性名 / 脏名**：ai-bot（AI工具集）、tool439（「简单免费的机器学习模型训练工具」）、
  tool1957（AIDesign，ailogo.qq.com 被 Cloudflare 拦截且可用来源只有第三方导航站）、
  tool14067（「商汤科技推出的可控人物视频生成AI模型」，sensetime.com 产品页 500）、
  ask-xiaoyuzhoufm-com（「小宇宙推出的AI搜索产品」，纯 SPA 仅 29 字）。
- **明确排除**：jianying（url 数据错误，未修正前不写）。

## 四、自检

- `node scripts/apply-tool-profiles.mjs`：tool747 1331 / tool68863 904 / world-liberty-financ 1006，均「含自身名:是」。
- 独立复算四条件：**原创池 1073 == 四条件通过 1073 == tools.xml 1073** ✅（池内未通过 0、孤儿 0）；3 条均出现在 `tools.xml`。
- 待写：1177 − 1073 = **104**。
