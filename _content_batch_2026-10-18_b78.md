# 第 78 批原创资料续写 · 素材筛查报告（2026-10-18 下午）

> 任务：为 taoai365.com 工具页批量续写原创资料，目标 15–20 条。
> 结论：**新增 0 条**。52 条待写条目经「直连 / 代理 curl / 渲染读取 / 域名解析」四路核验后，
> 无一同时满足「页面存活 ∧ 主题一致 ∧ 名称合规 ∧ 官方正文可支撑 ≥700 字」，未用空素材凑数。
> 这是连续第八批低产出（b70=3、b71=2、b72=0、b73=0、b74=0、b75=0、b76=0、b77=1、**b78=0**）。

---

## 一、基线（本次实测）

| 指标 | 数值 |
|---|---|
| 工具条目 | 1177 |
| 原创池（editorials 5 + tool_profiles 1120） | 1125 |
| 四条件通过 | 1125 |
| `public/tools.xml` 条目 | 1125 |
| 待写（不在原创池） | **52** |

自检（独立复算，镜像 `lib/tools.ts` → `isToolIndexable`）：池内未通过 0（脏名 0 / 短正文 0 / 缺名 0）、
「池内有但 sitemap 无」0、「sitemap 有但池内无」0。`generate-sitemap.mjs` 输出 `tools.xml: 收录 1125/1177`，
与复算一致，**索引面自洽**。

> 任务书口径「约 1210 条 / 可索引 35 条 / 待写约 1175 条」为整改初期快照，实际为 **1177 / 1125 / 52**（可索引率 95.6%）。

---

## 二、方法（四路核验，比 b76 多一路 DNS 判定）

1. `content-queue.mjs --top 60 --json` 取全量 52 条（输出到 `.tmp_b78/`，未污染 `data/content_queue.json`）；
   另按任务书跑 `--top 24 --save`，生成结果与 HEAD 中的 `data/content_queue.json` **逐字节一致**，说明队列未变。
2. **代理 curl 全量探测**（`127.0.0.1:7897` + 浏览器 UA + `Accept-Encoding: identity` + `-m 25`，5 路并发，
   每条独立临时文件避免 b75 的 title 串行错位）：取 `http_code / bytes / <title>`。代理健康（`example.com` 200/0.40s）。
3. **直连复探** 22 条 `000`：全部仍为 `000`。`curl -v` 显示 `CONNECT` 隧道 200、随后 `schannel: failed to receive handshake`，
   且直连时报 `Could not resolve host` —— 属站点侧 DNS/TLS 已失效，不是通道问题。
4. **渲染读取服务复核**（`r.jina.ai`，去掉浏览器 UA、串行 + 2s 间隔，规避 SOP §19 的两处限流坑）：
   明确返回 `Domain could not be resolved` 的 7 条（`etna.7volcanoes.com`、`chatwiz.cn`、`neeva.com`、`175.fun`、
   `ibihun.com`、`aimianshibang.com`、`maopaoya.com`）——域名已从 DNS 摘除，属永久失效；
   其余为 `TimeoutError`（目标站不可渲染）。
5. 仅当「存活 ∧ 主题一致 ∧ 名称合规 ∧ 官方正文 ≥700 字」四项同时成立才进入写作。

---

## 三、52 条终判分布

| 判定 | 条数 | 代表条目 |
|---|---|---|
| 域名不可达（DNS/TLS 失效） | 22 | `telehire-ai`、`xanswer-com`、`pagentia-com`、`humva-ai`、`tool13251`、`tool9412` |
| 页面易主 / 主题不符 | 13 | `hotshot-co`→导购站、`miaohui-jixueai-com`→创大产控、`tool148`→冰淇淋店、`tool58825`→博彩、`tool111`→Devin、`tool216`→Hostinger 并购公告、`tool150`→Stitch |
| 产品停运 / 未建成 | 7 | `6pen-art`、`tool3006`(清算)、`tool14278`(sunset)、`tool67418`、`tool71074`(Build incomplete)、`yanqueai-com`(404)、`tool479`(404) |
| 同站 / 同产品重复 | 5 | `duiyou-ai`↔`designkit-cn*`、`seelesai-go-link`↔`tool14989`、`tool923`↔`lumalabs-ai`、`tool67455`↔`tool36409`、`tool11395` |
| 名称或数据不合规 | 3 | `ai-bot`(通用名)、`tool1079`(「阿里云登录」非产品名)、`tool67595`(34 字超限) |
| 403 / CF 挑战 / 空壳 | 2 | `phind-com`、`flow-studio`、`tool6840`、`tool66554`(0 字节) |

---

## 四、本批新增的判定性证据

1. **`6pen-art` 的「继任产品」也关了。** 官网 `6pen.art` 只剩《致谢与新篇章》并导流 `6pen.pro`；
   渲染读取 `6pen.pro` 返回「**网站已关闭 / 本网站已停止服务**」（2024 年版权）。此前未记录此点，
   意味着 b77「改名换 url 救活条目」的手法在 6pen 上**不可用**，该条应按下线处理而非补写。
2. **`tool923` 与 `lumalabs-ai` 是同站同产品，不能各写一份。** `lumalabs.ai` 现已完全转向
   「AI Agents for Creative Work」+ Ray 3.2 视频模型（官网仍有 pricing / api / ray 三个内容丰富的服务端渲染页），
   但库内 `lumalabs-ai`（`/dream-machine`）已于 2026-10-07 写过原创资料并在池内；
   `tool923` 的名称「AI 3D捕捉、建模和渲染」所指的 3D 采集产品线在官网已不存在。
   → 既不能按原名写（主题已消失），也不能改名写（必然与 `lumalabs-ai` 重复），只能列入「合并/下线」候选。
3. **`tool9412`（url 指向第三方 `maopaoya.com`）实为阶跃星辰产品，而 `tool9802` 已覆盖 `stepfun.com` 同款产品**，
   属重复条目，不应再补写。
4. **渲染读取服务的错误码可当 DNS 探针用**：`42203 SubmittedDataMalformedError: Domain could not be resolved`
   出现即判定域名已注销，比 curl 的 `000` 更可信（`000` 还混有 TLS 握手失败、代理抖动），建议后续批次固定用这一步做终判。

---

## 五、自检与提交

- 复算：原创池 1125 == 四条件通过 1125 == `tools.xml` 1125 ✅；池内未通过 0、孤儿 0。
- `generate-sitemap.mjs` 本次仅改 3 个 xml 的 `lastmod`（内容零变化），按 b75 口径 `git checkout --` 回退，
  **不提交纯日期变动**。
- 数据文件（`data/tool_profiles.json`、`data/tools.json`、`public/*.xml`、`data/content_queue.json`）本批**零改动**。
- 清理 `.tmp_b78/`、`.tmp_queue_b78.json` 后提交本报告。

---

## 六、结论与建议（第八次）

52 条待写里「产品仍在运营 ∧ 名称干净 ∧ 无同站重复 ∧ 有可引用官方页」的交集为 **0**，
且本轮新增证据显示其中若干条的「救活路径」已被堵死（6pen 继任产品关停、Luma 3D 产品线消失）。
**继续按本任务重跑，产出仍将恒为 0。** 建议下一批改做以下两件事之一：

1. **53→52 条待写池的「数据清理」**：22 条死域名 + 7 条停运（建议下线并 301 到分类页）、
   5 条同站重复（合并到既有条目）、3 条名称/url 脏数据（`ai-bot`、`tool1079`、`tool67595`、`jianying` 的 url 指向即梦）。
   这能把「1177 条工具 / 52 条永远 noindex 的僵尸页」清成自洽的数据集。
2. **教程页原创内容**：`generate-sitemap.mjs` 仍报 `tutorials.xml: 收录 0/56`，
   56 篇教程全部因正文 <600 字退出索引，是当前唯一还有真实增量空间的索引面。
