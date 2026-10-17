# 第 75 批原创资料续写（2026-10-17 晚）

## 结论

**新增 0 条**。待写池 53 条全部作废，未使用任何空素材凑数（SOP §1「不虚构」）。

- 工具总数 1177；原创池 1124；可索引 `tools.xml` 1124；待写 **53**（与第 74 批完全一致，池子无新增）。
- 本批数据文件（`data/tool_profiles.json`、`data/tools.json`、`public/*.xml`）均无实质变更。

## 本批做了什么

### 1. 索引面自检（独立复算，不复用 `lib/tools.ts`）

按「命中原创池 ∧ 名称干净（≤30 字、无 ` | ` / `&#` / `--`）∧ 正文去标签去空白 ≥600 字 ∧ 正文含自身名（比对前去空白）」逐条复算工具库：

| 指标 | 值 |
|---|---|
| 工具总数 | 1177 |
| 原创池（profiles 1120 + editorials 4） | 1124 |
| 池内通过四条件 | 1124 |
| `public/tools.xml` 条数 | 1124 |
| 池内未通过 | 0（短正文 0 / 缺自身名 0 / 名称不干净 0） |
| 孤儿 profile（无对应工具） | 0 |

结果：**原创池 1124 == 四条件通过 1124 == tools.xml 1124** ✅，`generate-sitemap.mjs` 亦输出 `收录 1124/1177`，自洽。

### 2. 存活探测（53 条全量）

代理 `curl`（浏览器 UA + `Accept-Encoding: identity` + `-m 18`，6 路并发）跑完 53 个 URL：

- **HTTP 000（不可达）21 条**：`voxcraft.ai`、`humva.ai`、`writingpal.ai`、`telehire.ai`、`photonaiclub.com`（含两条子路径）、`xanswer.com`、`lab4ai.cn`、`chatwiz.cn`、`6pen.art` 等。
- **403 / Cloudflare 挑战 9 条**：`phind.com`、`pagentia.com`（Just a moment）、`aigc.360.com`、`175.fun`、`aiapp.cc`、`ailogo.qq.com`、`aigc.66paper.cn`、`seelesai.go.link`（200 但正文仍是挑战页）。
- **200 但主题已变 12 条**：`codeium.com`→Devin Desktop、`zyro.com`→Hostinger 并购公告、`magician.design`→冰淇淋店、`hotshot.co`→数码导购站、`dinq.io`→博彩、`midreal.ai`→sunset 告别信、`getdraft.ai`/`logolivery.ai`→停运或清算、`x.moyin.com`→魔音工坊（与 DB 名「魔撰写作」不符）、`miaohui.jixueai.com`→创大产控。
- **名称不合规不进入写作 11 条**：`ai-bot`（通用名「AI工具集」）、`tool67595`（34 字超限），及 `yanqueai-com`、`tool150`、`tool923`、`tool479`、`tool13251`、`tool71074`、`tool67775`、`tool33149`、`tool67371` 等描述性名称（整句名称无法在正文里自然出现，且按 SOP §7.10 需先补真实产品名）。

### 3. 四通道抓素材（本轮实测，供下批直接引用）

| 通道 | 状态 | 结果 |
|---|---|---|
| 直连 `fetch`/curl | 大部分域名 000 | 0 条可用正文 |
| 代理 `curl`（7897） | 通道本身正常（`example.com` 200/0.7s） | 存活域名多为壳页或主题不符 |
| `r.jina.ai` 渲染 | 正常返回（`phind.com` 200/798B、`x.moyin.com` 200/1.5KB、`zaoci.tv` 422） | `phind.com` 仍是 CF 挑战页；`moyin` 是配音平台（名称不符）；`zaoci.tv` 空文件 → 0 条 |
| `web.archive.org` | **本批曾短暂可用，随后被限流** | 见下 |

**存档通道是本批唯一新变量**：`/web/` 回放首次尝试返回 302（可跟随），CDX 一度返回数据，但 ① 按域名批量扫 53 条时，前 4 条成功后**其余全部 `CDX FAIL`**，此后连精确 URL 查询也返回空；② 回放随即变成 **429 + 620 字节**的 `Your request is being blocked`；③ `20230601id_/phind.com` 拿到 403/7KB，但正文是 `Just a moment...`（该快照抓取时站点本身就带 CF 挑战）。

**CDX 唯一有效产出**（均不足以写作）：`ai-bot.cn` 236KB 快照（通用名，不用）、`photonaiclub.com` 6848 字节（域名已死、产品不可核验）、`telehire.ai` 4958 字节（低于 5000 门槛）、`voxcraft.ai` 25 行无大快照。

→ 沿用 SOP §7.5 判据「CDX 无 >5000 字节非静态快照即不进抓取」，本批 0 条可写。

## 连续战绩

| 批次 | b70 | b71 | b72 | b73 | b74 | **b75** |
|---|---|---|---|---|---|---|
| 新增 | 3 | 2 | 0 | 0 | 0 | **0** |

可索引面：1119 → 1122 → 1124 → 1124 → 1124 → **1124**。

## 建议（本批第六次提出）

1. **待写池已实质清空**，工具页续写产能恒为 0。53 条里真正"产品仍在运营 + 名称干净 + 有可引用官方页"的交集为 **0**，继续投入抓取无边际收益。
2. **建议把本自动化改为「数据质量清理」**：`ai-bot` 通用名、`tool1079` 名称「阿里云登录」与 M6 不符、`jianying` url 指向即梦（已知错误）、`hotshot-co`/`miaohui-jixueai-com`/`tool1333`/`tool148`/`tool58825` 页面易主需下线或换 url；`telehire-ai`/`pagentia-com`/`xanswer-com`/`tool150`/`tool923` 等描述性名称先补真实产品名（补名后才有写作可能）。
3. **或改做「教程页原创内容」**：`generate-sitemap.mjs` 本批仍输出 `tutorials.xml: 收录 0/56` —— 56 个教程页全部因正文 <600 字退出索引，是一整块空着的索引面，收益远大于啃 53 条死条目。
4. 若仍按原任务重跑：**先做「域名比对（含子域↔父域）+ 存活探测」两连，直接如实上报 0 条**，不要逐条抓取。
