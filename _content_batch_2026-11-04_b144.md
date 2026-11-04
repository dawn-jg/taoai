# 第 144 批原创内容生产记录（2026-11-04）

> 任务口径：按 `docs/original-content-sop.md` 批量续写工具页原创资料，目标 15–20 条。
> 本批实际产出：**0 条**（连续第 73 批）。原因见第三、四节，属素材池结构性枯竭，不是脚本故障。

## 一、基线（起始 HEAD `2b34f770`，工作区干净，HEAD == origin/main）

| 指标 | 数值 |
|---|---|
| 工具总数 | 1177 |
| 原创池（profiles 1123 + editorials 5，重叠 1） | 1127 |
| 四条件通过数 | 1127 |
| `public/tools.xml` 条数 | 1127 |
| 线上 `taoai365.com/tools.xml` | 1127（321508 B，与本地同尺寸） |
| 池内失败（缺名 / 缺字数 / 缺自身名） | 0 / 0 / 0 |
| 待写（不在原创池） | 50 |

四条件自检：`1127 == 1127 == 线上 1127` ✅。队列名单与 b140–b143 逐条一致（第 49 批）。

> 提示词中的「工具约 1210 / 可索引 35 / 剩余约 1175」与实况「1177 / 1127 / 50」偏差 1.03× / 32× / 23.5×，
> 目标规模已不成立（详见 `docs/pending-content-decisions.md` 第四节）。

## 二、三通道抓取（50 条全量重跑，不沿用旧结论）

### 通道 ① 直连（`fetch-sources.mjs --force`，38 条失败/短素材条目）

成功 8 / 尝试 38，逐条定性后**全部不可写**：

| slug | 结果 | 定性 |
|---|---|---|
| `ask-xiaoyuzhoufm-com` | 200 / 23 字符 | SPA 壳，无事实 |
| `tool1333`（创作王） | 200 / title「qy球友会-qy球友会体育」 | **域名已易主为博彩站** |
| `moyin-com` | 200 / 魔音工坊 | 名称「魔撰写作」与题材分属两产品，待授权改名 |
| `tool6840`（360智绘） | 200 /「360AI办公」94 字符 | 产品线更名，DB 名称不符 |
| `tool67455` / `tool3006` / `tool1079` / `tool67418` | 128 / 182 / 26 / 8 字符 | 登录页、注销公告，无可引用事实 |

失败 30 条：`fetch failed` ×26、`403` ×1（phind）、`404` ×2（tool479、tool71074）、SPA 壳 ×2（tool11395、tool1338）。

### 通道 ② 代理 + curl（`--tls-max 1.2`，28 个 URL；先验证 `proxy_test=200` 网络正常）

- 200 ×3：`tool150`（24 KB，实为 usegalileo 的 JS 壳）、`tool11395`（698 B，JS 跳 `flowith.io`）、`tool1338`（633 B，随机跳 `qianwenweb`）——均无正文。
- 403 ×2：`flowgpt.com/flow-studio`、`phind.com`（Cloudflare 挑战页）。
- 404 ×2：`yanqueai.com`、`briefly.video`。
- 000 ×21（连接失败，与 b143 一致，非 schannel 误判，已带 `--tls-max 1.2`）。

### 通道 ③ 渲染读取（`r.jina.ai`，去掉浏览器 UA、2 路串行、间隔 3–4 s）

| slug | 返回 | 定性 |
|---|---|---|
| `voxcraft-ai` | 504 Gateway Time-out | 服务端长期不可用（与 b141 一致） |
| `telehire-ai` | 42203 域名无解析 | 下线 |
| `tool9412`（maopaoya.com） | 42203 域名无解析 | **下线（新增硬证据）** |
| `tool33149`（ibihun.com） | 42203 域名无解析 | **下线（新增硬证据）** |
| `tool67371`（aimianshibang.com） | 42205 解析失败 EAI_AGAIN | **下线（新增硬证据）** |
| `tool13251`（chatwiz.cn） | 42205 解析失败 EAI_AGAIN | **下线（新增硬证据）** |
| `tool1890`（neeva.com） | 301 → `headlinelogic.com`，标题「HeadlineLogic News Portal」 | **域名已出售停放（新增硬证据）** |
| `yanqueai-com` | 404 nginx/1.16.1 | **站点已撤除（新增硬证据）** |
| `tool11840`（explorer.globe.engineer） | 42206 `ERR_CONNECTION_CLOSED` | 存活但拒连 |
| `tool67775`（lab4ai.cn） | 42206 `ERR_CERT_AUTHORITY_INVALID` | 证书不受信 |
| `flow-studio` | `/flow-studio` 已下线，301 到 `flowgpt.com` 首页，首页全文无 “Studio” 字样 | **产品页撤除，名实不符** |
| `phind-com` | Cloudflare「Just a moment...」 | 存活但不可写（不判死） |

## 三、本批新增判死 / 定性证据（10 条）

1. `tool9412` maopaoya.com —— 42203 域名无解析（此前仅 `fetch failed`）
2. `tool33149` ibihun.com —— 42203 域名无解析
3. `tool67371` aimianshibang.com —— 42205 EAI_AGAIN
4. `tool13251` chatwiz.cn —— 42205 EAI_AGAIN
5. `tool1890` neeva.com —— 域名出售，已停放为新闻聚合站
6. `yanqueai-com` yanqueai.com —— 404，站点撤除
7. `tool1333` aiapp.cc —— **定性升级**：原「企业官网」，现为博彩站「球友会」，须优先移除外链
8. `flow-studio` flowgpt.com/flow-studio —— 产品页撤除，301 到首页
9. `tool11840` —— 错误码细化：42206 `ERR_CONNECTION_CLOSED`
10. `tool67775` —— 错误码细化：42206 `ERR_CERT_AUTHORITY_INVALID`

累计：50 条待写中，**已取得下线/停运/域名易主硬证据的约 40 条**，其余为 Cloudflare 拦截或 SPA 空壳（不可写）。

## 四、结论

1. **可写池 = 0**。50 条待写全部为「站点已死 / 域名易主 / 采集残留 / 名实不符」，
   按 SOP 三条红线（不采集、不套模板、不虚构）**没有任何一条能写出 ≥700 字且不虚构的正文**。
2. 索引面上限仍为 **1127**（1177 的 95.8%），b77–b144 共 **68 轮零翻转**。
3. 继续按「工具页 15–20 条/批」执行，产出必然恒为 0。**真正能解锁的只有两件事，都需人工授权**：
   - ① 教程页 56 条补正文（+56 → 1183）——唯一成规模的面，且不受本批素材约束；
   - ② 50 条清理（下线约 30 + 合并 13 + 改名/改 URL 4）→ 分母降至 ≈1131，覆盖率升至 ≈99.6%，
     同时移出 `tool1333`（博彩）、`tool14961`（博彩）两条高风险外链。
4. 本批未执行 `apply-tool-profiles.mjs --apply` 与 `generate-sitemap.mjs`：无内容合并，
   避免给 1123 条已上线资料刷 `lastmod`。`git status` 证 `data/` 与 `public/` 零改动。
