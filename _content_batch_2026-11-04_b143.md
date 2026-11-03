# 第 143 批 原创内容生产记录（2026-11-04）

## 一、基线与自检

| 项目 | 数值 |
|---|---|
| 工具总数 | 1177 |
| 原创池（profiles 1123 ∪ editorials 5，重叠 1） | 1127 |
| 四条件通过数 | 1127（failName 0 / failLen 0 / failSelf 0） |
| `public/tools.xml` | 1127 |
| 线上 `taoai365.com/tools.xml` | 1127（200，321508 B，与本地逐字节同尺寸） |
| 待写 | 50（`content-queue --top 24 --save` 零 diff，第 48 批） |
| 起始 HEAD | `2030f5de`，工作区干净，HEAD == origin/main |

> 自检复算口径沿用 b140 修正：`detailed_content` 是**对象数组**，必须逐项取 `html` 再拼接；
> `normalizeName` 不做小写化。按此复算池内 1127 条全部通过，无一条失败。

## 二、本批产出：0 条（连续第 72 批）

三通道全量复核 50 条待写条目，**无一条可写出 ≥700 字且不虚构的原创正文**。

### 通道①　直连快照（50 条，6 路并发 / 15s / identity）

分布：200×19、403×2（`phind-com` CF 挑战页、`tool58825` CF 拦截）、404×2（`tool479`、`tool71074`）、
ERR×27。与 b142（200×19 / 403×2 / 404×3 / ERR×26）仅 `tool148` 由 404 转超时，无实质翻转。

200 但正文不足的典型：`tool6840` 94 字、`tool67455` 128 字、`tool1079` 177 字、
`tool67418` 8 字、`moyin-com` 24 字、`ask-xiaoyuzhoufm-com` 23 字、`seelesai-go-link` 35 字、
`tool701` 0 字（87 B）、`tool1338` / `tool11395` 0 字（600 B 级外壳）。

### 通道②　代理 + curl 复核 15 条超时项（`--tls-max 1.2`，先证代理可用）

`proxy_test=200` / `direct=200` 已先证网络与代理正常，故下列失败属站点侧：

- `flowgpt.com/flow-studio` → 403 Cloudflare「Attention Required」
- `withpoly.com/browse/textures` → 200 但仅 87 B（空壳）
- `telehire-ai` → **schannel TLS handshake failed**（服务端握手即失败）
- 其余 12 条（`miaohui`、`miantuan`、`pagentia`、`writingpal`、`ailogo.qq.com`、`maopaoya`、
  `explorer.globe.engineer`、`lab4ai.cn`、`chatwiz.cn`、`aimianshibang`、`ibihun`、`130ai.com`）→ 000

### 通道③　渲染读取（r.jina.ai + proxy + `--tls-max 1.2`，无浏览器 UA，串行 3s）

本批新增证据全部来自此通道：

| 条目 | 结果 | 判定 |
|---|---|---|
| `miaohui-jixueai-com`（秒绘AI） | 渲染出 **13112 B** 正文，标题「创大产控 \| 科研经纪产业领军企业」 | **域名已易主**，与 DB 名称/题材完全无关 → 应下线或改 URL |
| `miantuan-knowfuture-com-cn`（面团AI） | 42206 `ERR_CONNECTION_REFUSED` | 服务端拒连，下线候选 |
| `pagentia-com` | 42206 `ERR_CERT_COMMON_NAME_INVALID` | 证书域名不匹配，判死 |
| `writingpal-ai` | 42206 `TimeoutError` 25s | 不响应，判死 |
| `tool1957` AIDesign (`ailogo.qq.com`) | 40305 `Domain resolved to non-public IP: 0.0.0.1` | 域名已不指向公网服务，判死 |
| `tool7424` XPaper AI (`130ai.com`) | 42206 `ERR_CONNECTION_REFUSED` | 判死 |
| `tool66554` 造次 | 42206 `Unexpected empty file` | 二次确认（b142 同结论） |
| `moyin-com`（魔撰写作） | 渲染 **62524 B**，`x.moyin.com` 301 → `www.moyin.com`，标题「魔音工坊–短视频/有声书AI配音平台」 | **素材充足但名实不符**（详见下节） |
| `gaoyiai.com/paper_aigc`（tool67455） | 仅 1303 B 壳（「论文4.0版/5.0版、降AI率」） | 题材可写、素材仍不足 |

## 三、本批唯一可立即解锁的条目

`moyin-com` 是 50 条里**唯一「素材充足、只被名称挡住」**的条目：

- DB 现状：名称「魔撰写作」，url `https://x.moyin.com/`
- 站点现状：`x.moyin.com` 301 → `www.moyin.com`，标题「魔音工坊–达人热推的短视频/有声书AI配音平台」，
  渲染正文 62 KB，含配音功能清单、音色/软件配音分类等可引用事实
- 阻塞点：写作工具与配音平台是**两个不同产品**，若沿用「魔撰写作」写配音内容，正是 AdSense 判过的
  「内容与页面主题错配」，不能做
- 需授权动作：把名称改为「魔音工坊」、url 改为 `https://www.moyin.com/`，随后可产出 1 条 700 字以上原创资料

其余 49 条均属「下线 / 合并 / 改名」处置范畴，不是「待写」。

## 四、方法论补充（第 24 条）

同一批渲染失败要按错误码分流，不可一律记作「抓不到」：

- **42203 / 42205**（`could not be resolved` / `EAI_AGAIN`）= 公共 DNS 已无解析 → 域名消失，直接判死；
- **42206 + `ERR_CONNECTION_REFUSED`** = 域名仍解析、但服务端拒连 → 通常为产品下线/服务撤销；
- **42206 + `ERR_CERT_COMMON_NAME_INVALID`** = 证书与域名不匹配 → 通常为域名转手或证书过期未续；
- **40305 + `non-public IP 0.0.0.1`** = 域名被有意解析到黑洞地址（腾讯 `ailogo.qq.com` 即此类）→ 产品页已撤；
- **403 Cloudflare 挑战页** = 站点存活但拒绝机器人 → 只能判「不可写」，不能判死。

四类证据都不需要再跑三轮抓取，可直接进入「处置」清单。

## 五、收尾

- 未执行 `apply-tool-profiles --apply` / `generate-sitemap`：本批无内容合并，避免刷新 1123 条 lastmod，
  `git status` 证实 `data/` 与 `public/` 零改动
- 临时脚本与快照全部在系统 `Temp/b143/`
- 索引面上限仍为 **1127 / 1177 = 95.8%**；剩余 50 条全部需要「处置」而非「续写」
