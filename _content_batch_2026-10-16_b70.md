# 第七十批原创工具资料（2026-10-16）

## 产出 3 条

| slug | 名称 | 字数 | 来源 |
|---|---|---|---|
| tool1989 | 阿里云智能logo设计 | 1053 | 官方存档页 `logo.aliyun.com`（2022-07-08） |
| zhiyan-wondershare-cn | 万兴智演 | 992 | 官方存档页 `zhiyan.wondershare.cn`（2024-03-29） |
| tool16079 | Trytoby | 902 | 官方存档页 `trytoby.com`（2025-11-01） |

- 逐条 4 节齐备、逐节含自身名；去标签 14-gram 对约 101 万既有 gram 终检 **0 命中**（首检 1 命中：`填写品牌名称、所属行业与偏好` 撞 logosc-cn-2，已改写）。
- 字段修正 1 处：`tool16079` 子分类 `ai-office-doc` → `ai-office-meeting`（实时口译与「AI文档处理」不符）。未动 category，`categories.json` 无需重算。

## 本批通道实测

1. **代理 curl 全量重探（默认 UA）58 条**：200 计 21 条、000 计 31 条、403/404 计 6 条。
2. **⭐ 浏览器 UA 复探是本批第一个抓手**：默认 UA 下 `flowgpt.com` 返回 403，换浏览器 UA 后 200/311KB。
   结论：**以后探测必须用浏览器 UA**，否则会把 Cloudflare 保护下的存活官网误判为死域。
3. **`r.jina.ai` 渲染 58 条**：可读结果全部是壳页 / 别家产品页 / 关停公告，零可用。
4. **CDX 按 length 挑快照（域名级）**：`matchType=domain` 会把 JS chunk 排在前面，**必须先过滤 `.js/.css/图片` 再按 length 排序**，否则整批下载的是打包产物。
5. **CDX 限流**：连续请求会返回空（脚本表现为 `cdx fail`），需 2.6s 间隔 + 重试。

## ⚠ 关键发现：待写池剩余 55 条已实质见底

### 判废（本批第一手新增）
- **域名被劫持**：`fryderyk.ai`→新西兰赌场页；`dinq.io`→越南博彩页（原 DINQ 官网存档仍在，2025-12）；
  `magician.design`→冰淇淋店；`hotshot.co`→科技博客；`codeium.com`→Devin Desktop（与既有条目重复）。
- **关停/停服**：`lab4ai.cn` 快照标题即「Lab4AI 平台关停公告」；`getdraft.ai` 首页「Shutdown notice」；
  `midreal.ai` 首页告别信（转 Macaron，且存档正文多为 UGC 故事列表，不可作素材）；
  `phind.com` 现返回 404；`6pen.art`「致谢与新篇章」。
- **产品并入他处**：`logo.aliyun.com` 现 302 至 `wanwang.aliyun.com`（万网），`阿里云智能logo设计` 独立入口已消失；
  `zhiyan.wondershare.cn` 已不可达且不在 `wondershare.cn` 产品列表中。**两条仅能凭官方存档页取材**（见下"口径"）。
- **名称—页面不符**：`miaohui.jixueai.com` 现为「创大产控」（原秒绘AI）；`photonaiclub.com` 首页仅 13 字壳。
- **SPA 壳（正文 < 100 字）**：`trytoby.com` 实时、`voxcraft.ai`、`telehire.ai`、`writingpal.ai`、`huma.ai`、
  `pagentia.com`、`jixueai.com`（存档快照亦为壳）、`aiapp.cc`、`aimianshibang.com`、`briefly.video`。

### ⚠ 口径提示（需用户确认）
`tool1989`、`zhiyan-wondershare-cn`、`tool16079` 三条的 `sources[]` 均为**产品官网的历史存档 URL**，
实时官网已不可达或已跳转。这属于 SOP 第 2 节允许的「产品官网」范畴（非第三方采集正文），
撰写时用编辑部语言重写、未引用页面上的人物证言与价格数字。
**若要求收紧为「官网实时可达才可写」，本批可写量约 0 条**，请确认下一批口径。

### ⭐ 浏览器 UA 通道的潜力
本批用浏览器 UA 复活了 `flowgpt.com`（默认 UA 下 403）。但该条目 DB 名为「Flow Studio」、
分类为 `ai-video`、描述称「AI 长视频生成工具」，与官网实际形态（提示词 / 角色商店，且首页以成人向角色扮演为主）
完全不符，改写它需要同时动 name + url + category + subcategory + description 五处，且内容邻近成人向社区，
**在 AdSense 整改语境下风险偏高，本批放弃**。建议下一批先做数据质量清理（改分类或下架），不要为凑数硬写。

## 自检结果
- 独立复算四条件：`原创池 1122 == 四条件通过 1122 == tools.xml 1122` ✅（池内未通过 0、孤儿 profile 0）。
- 可索引 1119 → **1122**；3 条全部出现在 `public/tools.xml`。剩余待写 **55**。
- `git status` 仅 6 个跟踪文件变更（data/tool_profiles.json、data/tools.json、public/tools.xml、
  public/sitemap.xml、public/sitemap-index.xml、public/static-pages.xml）。
