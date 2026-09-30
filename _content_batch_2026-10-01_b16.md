# 第十六批工具页原创资料续写记录（2026-10-01）

- 站点：taoai365.com（本地仓库 `D:\ai-nav-site`）｜依据：`docs/original-content-sop.md`
- 基线：工具 1177 条，原创池 305，可索引 305，待写 872
- 结果：**新增 19 条**，因素材缺失/名称脏跳过 0 条（改换条目即可）→ 可索引 **324**，待写 853
- 复算自检：原创池 324 == 四条件通过数 324 == `public/tools.xml` `<loc>` 324（池内未通过 0）
- 提交：`6c0e8eb2`（`4574eb31..6c0e8eb2`）→ `origin/main` 推送成功，CF Pages 自动部署

## 本批 19 条（正文 826–1026 字，试算全部「含自身名:是」）

| # | slug | 工具名 | 字数 | 素材来源（官网） |
|---|---|---|---|---|
| 1 | fronty-com | Fronty | 911 | https://fronty.com |
| 2 | tool139 | Flowith | 1026 | https://flowith.io/pricing |
| 3 | tool1157 | Miro 思维导图 | 869 | https://miro.com/mind-map |
| 4 | tool49483 | 稿定AI文案 | 894 | https://www.gaoding.com/tools-ai-writer |
| 5 | tool59730 | 掌桥科研AI论文 | 919 | https://www.zhangqiaokeyan.com/ai/journalthesis.html |
| 6 | tool67481 | 笔灵AI 论文降重 | 869 | https://ibiling.cn/paper-pass |
| 7 | tool411 | StudyCorgi ChatGPT 检测 | 916 | https://studycorgi.com/free-writing-tools/chat-gpt-detector |
| 8 | tool121 | IBM Watson文字转语音 | 870 | https://www.ibm.com/cloud/watson-text-to-speech |
| 9 | tool246 | 讯飞配音 | 839 | https://peiyin.xunfei.cn/ |
| 10 | tool5368 | Grok | 905 | https://x.ai/ |
| 11 | tool22232 | 火山引擎 | 915 | https://ai.volcengine.com/model |
| 12 | nolibox-com | 图宇宙 | 902 | https://www.nolibox.com/introduction |
| 13 | youyan3d-com | 有言 | 867 | https://www.youyan3d.com/ |
| 14 | tool22626 | 笔灵AI小说 | 850 | https://ibiling.cn/novel-workbench/ |
| 15 | tool306 | Cutout.Pro抠图 | 938 | https://www.cutout.pro/zh-cn/remove-background |
| 16 | tool222 | Media.io AI Image Upscaler | 931 | https://www.media.io/image-upscaler.html |
| 17 | tool213 | Nero Image Upscaler | 882 | https://ai.nero.com/image-upscaler |
| 18 | tool299 | Relight | 835 | https://clipdrop.co/relight |
| 19 | lets-enhance | Let’s Enhance | 826 | https://letsenhance.io/ |

## 流程要点（本批环境明显恶化）

1. `content-queue --top 900 --json`（872 条）→ 名称干净度预筛 **286** → 严格过滤 **169**，其中缓存有效仅 **9** 条。
2. 直连 `--force` 抓 169 条（成功 117）→ 代理 + curl 补抓 167 条（116 条有效 HTML，解析 113）。
3. **代理抓回的 113 条里只有 2 条达到 200 字**：剩余候选绝大多数是 SPA，首页只有 title + description。
4. 关键补充手段：**代理探测官方子页**（`/pricing`、`/docs`、`/model`、`/introduction`、`/make` 等），
   50 条探到 49 条，产出 4 条可写素材，是本批能否成篇的决定因素。
5. 自检拦下 7 处：4 处为 S2/S3 散文句漏工具名；3 处为同后缀产品名（两个 Image Upscaler）造成的
   14 字重复片段，改写句式后 0 问题。

## 本批新识别脏数据（勿再据以撰文）

- `tool148`：域名被劫持为 BETWIN188 博彩站
- `tool1149`：excelformularizer.com 已成韩国债务重组站
- `tool7050` Krea AI：首页 textSample 全是 CSS class 噪声，`/features` 已 404
- `tool140` YouChat AI：页面已变为 You.com 搜索 API
- `tool302` Zyro：跳转 Hostinger 合并公告
- `tool64875`「千页小说AI」与 `tool72610`「超级小说家」确认为同一页（撞页）
- `tool736` Gemini 3.5：素材几乎全是页面栏目名
