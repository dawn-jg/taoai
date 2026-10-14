# 第六十五批原创资料（2026-10-14）

## 产出：6 条

| slug | 名称 | 分类 | 字数 | 来源 |
|---|---|---|---|---|
| vgoapp-com | VGO | ai-office | 1170 | https://vgoapp.com/ |
| tool16669 | 咔咔猩 | ai-writing | 829 | https://www.kakaxing.com/ |
| tool162 | Obviously AI | ai-platform | 932 | https://www.obviously.ai |
| tool59 | 笔灵AI写作 | ai-writing | 829 | https://ibiling.cn/ |
| tool140 | You.com | ai-search | 778 | https://you.com/ |
| tool2921 | 象寄翻译 | ai-office | 767 | https://www.xiangjifanyi.com/ |

均为四节结构（是什么 / 主要功能 / 如何使用 / 应用场景），逐节含自身名，去标签 14-gram 查重 0 命中。

## 名称 / URL / 分类修正（先改再写）

- vgoapp-com：`字符狂飙` → `VGO`（页面已改为 VGO 工具工作室官网），分类 ai-writing → ai-office，描述/标签/subcategory 同步。
- tool16669：`创一AI` → `咔咔猩`（URL 由 creatifyone.com 改为官方 kakaxing.com），描述/标签同步。
- tool162：`AI调色板生成工具` → `Obviously AI`（无代码 AutoML），分类 ai-design → ai-platform（模型训练平台）。
- tool59：`Magic Write` → `笔灵AI写作`（URL 指向 ibiling.cn 笔灵官网，原名称属 Canva 产品，系脏数据）。
- tool140：`YouChat AI` → `You.com`（已转型 Web 搜索 API），分类 ai-chat → ai-search。
- tool2921：`控制台` → `象寄翻译`（URL 改为官网首页），描述/标签同步。

分类计数按 `categories.json` 口径重算：ai-writing 105→104、ai-office 211→212、ai-design 93→92、ai-platform 86→87、ai-chat 69→68、ai-search 45→46。

## 结果

- 可索引 1073 → **1079**（+6）。
- 独立复算四条件：原创池 1079 == 四条件通过 1079 == tools.xml 1079 ✅（池内未通过 0、孤儿 profile 0）。
- 待写 **98**。

## 素材判定（本批实测）

- 代理 curl 全量探测 104 条：回 200 约 41 条，其余 000/402/403/404/410/500/503/525。
- 直连复测 44 条 000：仅 2 条回 200（tool2921 官网、tool6316 晓语台），其余域名已死。
- 有效抓手：① 代理 curl 抓官网首页（VGO、咔咔猩、Obviously AI）；② `r.jina.ai` 渲染读取中文 SPA 官网（咔咔猩、象寄翻译；晓语台 422/超时）。
- 判废：MidReal（sunset → Macaron）、GetDraft（Shutdown notice）、Poly（域名已变为云文件浏览器）、ClipDrop 已下线 Stable Doodle、Zyro（并入 Hostinger）、Riffusion（→ Google Flow Music）、Flow Studio（flowgpt 页为平台首页，名称不符）、Hotshot（现为科技博客）、Instreet（闭店装修中）、晓语台（SPA 空壳/渲染超时）、易撰（登录页）。

## 本批新增提示

1. **代理 curl 全量探测仍是最省时的第一道筛子**：一次 104 条即可把死域、劫持站、登录页剔掉。
2. **`r.jina.ai` 对「仍存活的中文 SPA 官网」偶有奇效**（咔咔猩、象寄翻译由此取到可用正文），但对已死域名与无响应站点无效；用它之前务必先确认域名可达。
3. **名称—URL 三层不一致的脏数据是本批主要可写来源**：VGO、咔咔猩、You.com、象寄翻译、笔灵AI写作 均属此类，先改名再写。
4. 剩余待写池已高度见底，写作前务必先核对「DB 名能否自然嵌入正文 / URL 是否为官网 / 是否与既有条目同产品」。
