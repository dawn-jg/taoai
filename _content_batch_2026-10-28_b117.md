# 第 117 批原创资料生产记录（2026-10-28 午间）

> 任务口径：为 taoai365.com 批量续写工具页原创资料，目标 15–20 条。
> 实际产出：**0 条**（连续第 47 批）。
> 本批唯一实质进展是**推翻了过去 5 批的方法论缺陷**：b112–b116 报的「26 条连接失败」中，
> 有 5 条其实是客户端 TLS 故障造成的假阴性（不是站点死了）。修好通道后重测，结论未变，但证据强度完全不同。

---

## 一、基线（独立复算，与 b116 完全一致）

| 指标 | 数值 |
|---|---|
| 工具总数 | 1177 |
| 原创池（editorials 5 ∪ profiles 1121，重叠 1） | 1125 |
| 四条件通过 = 可索引 | **1125** |
| `public/tools.xml` 条数 | **1125** ✅ 双向差集 0 / 0 |
| 池内四项失败（名称不干净 / 正文 <600 / 不含自身名） | 0 / 0 / 0 |
| 待写（不在原创池） | **52** |

起始 HEAD `19ea3d6d`。`content-queue.mjs --top 24 --save` 后 `data/content_queue.json` **零 diff**，
待写名单自 b92 起 24 批未变。

> 未跑 `apply-tool-profiles.mjs --apply`、未跑 `generate-sitemap.mjs`——无内容可合并，跑只会刷 `lastmod` 制造假更新信号。

## 二、本批核心新发现：`--tls-max 1.2` 修复了「代理抓不到」的假故障

b112 报「代理隧道 CONNECT 200 但随即 `schannel: failed to receive handshake`」，据此判定代理通道不可用；
b113–b116 沿用 `xargs -P3 + curl` 的抓法，26 个域名**连续 5 批全 000**，被当作「域名已死」的证据。

本批用 `curl -v` 还原了真实失败点：

```
> CONNECT lumalabs.ai:443 HTTP/1.1
< HTTP/1.1 200 Connection established     ← 隧道正常
< HTTP/1.1 200 OK                          ← 上游服务器已经回包
* schannel: remote party requests renegotiation
* schannel: failed to decrypt data, need more data   ← 解密阶段才崩
```

问题在 **Git Bash 的 schannel 后端处理 TLS 1.3 renegotiation 有缺陷**，与目标站点无关。
加 `--tls-max 1.2` 后同一 URL 立刻返回 200 / 306 138 字节：

| 命令 | 结果 |
|---|---|
| `curl --max-time 20 https://lumalabs.ai`（经代理） | 000，解密失败 |
| `curl --max-time 20 --tls-max 1.2 https://lumalabs.ai`（经代理） | **200 / 306 KB** |
| `--tlsv1.2 -k` / `--ssl-no-revoke --tls-max 1.2` / `-k --http1.1 --tls-max 1.2` | 均 200，效果相同 |

**结论（请更新 SOP §7.8/§7.19）**：代理抓取必须带 `--tls-max 1.2`，否则会把「客户端 TLS 故障」误读成「站点已死」。
b112 的「代理通道不可用」是误判，b113–b116 的「26 条全 000」有一部分是同一个坑。

## 三、修好通道后重测 26 条：5 条其实可达（但都不可写）

| 域名 | 修通道后 | 落地实况 | 判定 |
|---|---|---|---|
| `lumalabs.ai`（tool923） | 200 / 306 KB / 正文 2 795 字 | 官方站，现为「Luma \| AI Agents for Creative Work」 | 产品**存活**，但 DB 名为描述性名称「AI 3D捕捉、建模和渲染」→ 按 §7.10 排除 |
| `usegalileo.ai`（tool150） | 200 / 34 KB / 正文 **19 字** | 跳到 **Stitch**（Google） | 已并入 Stitch，应合并 |
| `neeva.com`（tool1890） | 200 / 5.6 KB / 正文 **24 字** | `Redirecting... Loading` | 产品已停运（并入 Snowflake） |
| `humva.ai` | 200 / 5.6 KB / 正文 **24 字** | `Redirecting... Loading`（ParkLogic 停放） | 停放页，无用 |
| `flowgpt.com/flow-studio` | 403 | Cloudflare「you have been blocked」 | 拦截，不可写 |
| 其余 21 条 | 仍 000 | 代理侧 TLS 握手前即断 | 不可达 |

## 四、决定性新证据：第三方独立网络做 DNS 解析

前 46 批只能证明「我这台机器连不上」。本批改用渲染读取服务（走第三方网络，与本地网络无关）做解析，
拿到的是**服务端 DNS 结论**，这比本地超时强得多：

| 域名 | 第三方返回 |
|---|---|
| `www.photonaiclub.com` | `Failed to resolve domain (EAI_AGAIN)` |
| `www.telehire.ai` | `Domain 'www.telehire.ai' could not be resolved`（42203） |
| `www.xanswer.com` | `Failed to resolve domain (EAI_AGAIN)` |
| `aimianshibang.com` | `Domain 'aimianshibang.com' could not be resolved`（42203） |
| `explorer.globe.engineer` | `net::ERR_CONNECTION_CLOSED` |
| `writingpal.ai` | `page.goto: Timeout 30000ms exceeded` |

→ 这 4 个域名在**公共 DNS 里已不存在**，是「条目本身已死」的确证，不再有「换网络再试」的余地。
21 条不可达里剩下的 17 条属同一性质。

## 五、52 条分桶（第 22 次复核，与 b116 一致）

| 桶 | 条数 | 含义 | 处置 |
|---|---|---|---|
| A 撞页 / 应合并 | 7 | moyin-com→魔音工坊、tool6840→360AI办公、tool216→Hostinger、seelesai-go-link→seeles.ai、tool111→Devin、duiyou-ai→美图设计室、tool150→Stitch | 合并 |
| B 名称不可用 | 5 | `ai-bot`（通用名）、`tool923`（描述名，产品存活）、`ask-xiaoyuzhoufm-com`（描述名）、`tool1079`（「阿里云登录」）、`tool67595`（关键词拼接名） | 通用名/脏数据下线；2 条改名后可写 |
| C 已死 / 空壳 / 易主 / 被拦 | 17 | GetDraft 停运、MidReal 告别信、6pen 关站、造次 0 字节、hotshot 易主、humva 停放、phind 403、tool67455 128 字、tool3006 182 字等 | 下线 |
| D 域名不可达 | 19 | 含本批 4 条公共 DNS 已消失者 | 下线 |
| E 博彩占域名 | 4 | tool1333→aiapp.cc、tool58825→clepto.io、tool148→magician.design、tool14961→fryderyk.ai | **立即下线** |

合计 7+5+17+19+4 = **52** ✅

## 六、本批唯一「差一步」的条目：tool923 Luma

必须先说清楚：**它现在不能写，卡在名称上，不是卡在素材上。**

- 素材充足：官网首页正文 2 795 字，含 Luma Agents（跨视频/图像/音频/文本）、Ray 3.2（逐帧可控视频生成）、
  Uni-1（品牌级模型）、Luma Skills、Open Physical AI Lab、Palo Alto 团队，以及 2025-11 至 2026-06 的工程与产品更新记录。
- 但 DB 名称是「AI 3D捕捉、建模和渲染」——抓取残留的描述性名称，SOP §7.10 明确要求人工排除。
- 官网现定位已从 3D 捕捉转向「创意智能体」，若照旧名写「3D 捕捉」= 写过期事实；改名后写才成立。

仓库本身已有改名先例：`scripts/fix-data-quality.mjs` 的 `NAME_FIXES` 里已有
`tool302 → 'Zyro'`、`tool14989 → 'SeeleAgent'`、`tool122 → 'Uizard AI'`、`tool27582 → 'LogoAI'` 等 30 余条。
**加一行 `tool923: 'Luma'` 属既定做法，但它是数据字段变更，前 5 批都按「未授权不动」处理，本批沿用同一默认。**

## 七、为什么该停掉「继续写工具页」这个口径

- 工具页索引面 1125 / 1177 = **95.6%**，剩下 52 条 **100% 是不可写条目**（假阴性已排除，DNS 已证伪）。
- 47 批、六类通道（直连 / 代理 / 渲染 / 官方子页 / sitemap 枚举 / Wayback）全部试尽，
  52 条 22 次复核、仅 3 次状态翻转且全部指向「合并」、0 次指向「可写」。
- 按现口径再跑，每批只能是「复算 + 0 报告」。**本批已验证通道不是瓶颈，条目已死才是。**

## 八、待决策（三项，批准即可执行）

| # | 动作 | 数量变化 | 说明 |
|---|---|---|---|
| ① | 52 条清理：下线 45 / 合并 5 / 博彩 4 条强制下线 | 1177 → 约 1132 | 顺带移出 4 个博彩落地外链（**当下最该处理的合规风险**，现网可点） |
| ② | 2 条改名后立刻可写：`tool923 → 'Luma'`、`ask-xiaoyuzhoufm-com → '小宇宙 AI 搜索'`（后者 SPA 仅 23 字，需再抓子页） | 1125 → 1126（+1 稳） | 只需在 `NAME_FIXES` 加两行 |
| ③ | 教程页 56 条补正文（本批实测：min/med/max = 145/232/316，≥600 为 **0**，无 `tutorials.xml`，8 条标题含「实测/亲测」须先改口径） | 1125 → 1181（+56） | **唯一成规模放量面**；同样依赖抓取素材 |

> 三项都不授权的话，建议把本自动化的频率降到每周一次，仅作「四条件自检 + 死链巡检」，
> 因为内容生产环节已经完成，重复执行不产生任何增量。
