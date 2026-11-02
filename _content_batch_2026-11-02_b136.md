# 第 136 批内容生产记录（2026-11-02 08:40）

## 一、基线（起始 HEAD `b412931a`，工作区干净，HEAD==origin/main）

| 指标 | 数值 |
|---|---|
| 工具条目 | 1177 |
| 原创池 | 1127（editorials 5 + profiles 1123，重叠 1） |
| 四条件可索引 | **1127** |
| `public/tools.xml` | **1127** |
| 线上 `taoai365.com/tools.xml` | **1127**（HTTP 200，321508 字节） |
| 待写 | 50 |
| 池内失败 | name 0 / len 0 / self 0 |
| 双向差集 | 只在本池 0 / 只在 sitemap 0 |
| 自检 | ✅ 1127 == 1127 == 线上 1127 |

`node scripts/content-queue.mjs --top 24 --save` 零 diff（名单自 b92 起第 42 批未变）。

## 二、产出：0 条（连续第 65 批）

本批**未沿用任何旧结论**，改用「一轮全量直连快照」覆盖**全部 50 条**（不再是 b135 的 33 + 22 两通道抽样），
6 路并发、15s 超时、`Accept-Encoding: identity`，一次性拿齐 HTTP 状态 + 字节数 + `<title>` + 正文纯文本长度。

| 状态 | 条数 | 说明 |
|---|---|---|
| 200 | 20 | 逐条定性后**全部作废**（见第三节） |
| 403 | 2 | `phind-com`「Just a moment...」（CF 挑战）、`tool58825`「Attention Required!」（CF） |
| 404 | 2 | `tool71074`「Project not found」、`tool479` |
| 传输层失败 | 26 | `ENOTFOUND` 6（photonaiclub ×2、tool2676、etna、telehire、tool33149、tool9412）、`EAI_AGAIN` 3、`CERT_HAS_EXPIRED` 2、`ECONNREFUSED` 1、`ECONNRESET` 2、`UND_ERR_CONNECT_TIMEOUT` 4、`ENOENT` 1、TLS 类 4、`EAI_AGAIN`/其它 3 |

## 三、20 条 200 的逐条定性（全部作废，无一可写）

| slug | DB 名 | 实测 | 定性 |
|---|---|---|---|
| `ai-bot` | AI工具集 | 747 KB，title「AI工具集官网 \| 1000+ AI工具集合…」 | 通用名 + 竞品导航站（亦是历史采集源），SOP §7.10 排除 |
| `hotshot-co` | Hotshot | 454 KB，title「AI Tools, Gadgets, Smart Home & How-To Guides」 | 域名已易主为数码博客 → 名实不符 |
| `tool14961` | — | 51 KB，title「DegenCity Casino New Zealand - Pokies…」 | **境外博彩站**，最高优先移出 |
| `tool1333` | — | 24.5 KB，title 为 HTML 实体编码的「qy球友会」 | **博彩站**（编码绕过），移出 |
| `tool216` | Zyro AI Image Upscaler | 248 KB，title「Zyro Website Builder Joins Forces With Hostinger」 | 品牌并入 Hostinger，原工具停运 |
| `seelesai-go-link` | 全球首个端到端AI 3D游戏生成工具 | 189 KB 服务端渲染，正文 35 字（全在 JS 壳外） | 与 `tool14989` SeeleAgent 同一产品 → **合并**，不补第二份正文 |
| `duiyou-ai` | 堆友AI | 434 KB，title「美图设计室-免费AI设计工具」 | 名实不符 + 与 `xmyeditor-com` 重复 |
| `tool14278` | MidReal | 84.5 KB，可见正文 983 字全为停运告别信 | 已停运（meta 仍宣传产品，**不可据 meta 取材**） |
| `tool67595` | 论文降aigc-…（30 字） | 43 KB，正文 2150 字，为 66paper 降 AIGC 子产品 | 与 `tool14679` 66AI论文 重复 → 合并 |
| `tool6840` | 360智绘 | 20.8 KB，title「360AI办公」 | 名实不符 + 与 `bangong-360-cn` 重复 |
| `moyin-com` | 魔撰写作 | 9.7 KB，title「魔音工坊」 | 名实不符 + 与 `tool1924` 重复 |
| `tool3006` | LogoliveryAI | 2.5 KB，正文 182 字「officially liquidated」 | 公司已清算，清理 |
| `tool1079` | — | 201 字节、正文 177 字 | 阿里云登录页，非工具页 |
| `tool67455` | — | 5.8 KB，正文 128 字，title「稿易」 | 与 `tool36409` 重复 |
| `ask-xiaoyuzhoufm-com` | 小宇宙推出的AI搜索产品 | 28 KB，正文 23 字，title「小宇宙」 | 描述式长名 + 纯 SPA |
| `yanqueai-com` | AI LOGO设计工具 | 6.0 KB，正文 0 字 | 纯 SPA + 描述式名 |
| `tool67418` | GetDraft | 921 字节，正文 8 字 | 空壳页 |
| `tool11395` | — | 698 字节，正文 0 字 | 空壳 / 分发镜像 |
| `tool1338` | — | 633 字节，正文 0 字 | 跳转页（→ 通义千问，重复） |
| `tool701` | — | 87 字节，正文 0 字 | 空壳；业务已迁至 `poly.app` |

## 四、本批唯一新增事实：教程页放量面已复算（供决策，不改内容）

`data/tutorials.json` 按 `isTutorialIndexable` 口径（`content` 去标签去空白）复算：

| 指标 | 数值 |
|---|---|
| 教程条目 | 56 |
| 正文纯文本最短 / 中位 / 最长 | 145 / **230** / **316** 字 |
| ≥600 字条目 | **0** |
| 最长 5 条 | `deepseek-v4-api-cost-guide` 316、`claude-code-vs-cursor-vs-codex` 291、`ai-video-generation-landscape-2026` 284、`thesis-ai-tools-2026-guide` 281、`openclaw-feishu-official-doc` 279 |

→ 与 2026-10-30 的记录（中位 232 / 最长 316 / ≥600 共 0 条）一致，**该面增量仍为 +56，是当前唯一可成规模放量的路径**，但需编辑部授权，且须先处置 8 条含「实测 / 亲测」的标题口径。

## 五、结论（第 65 次）

- 工具页索引面上限 = **1127（95.8%）**，可写池 = **0**。b77–b136 共 60 轮、十余类通道、50 条全部定性（23 条 ai-bot.cn 采集残留 + 12 条同产品重复页 + 约 34 条站点已死/停运，组间有交叉）。
- 本批把取证方式从「抽样两通道」升级为「全量单通道一次拿齐」，结论零翻转 —— **同一批条目不存在未被发现的通道差异**。
- 任务提示词仍写「1210 条 / 可索引 35 / 剩余 1175」，实况 1177 / 1127 / **50**，差距 1.03× / 32× / 23.5×，该段已失效。
- 不写是正确结果：剩余 50 条无任何可引用的官网事实，据空素材产出 15–20 条正文将同时违反红线一（采集）、三（虚构），并制造新的重复页。

## 六、待授权（第 65 次，未变）

| 项 | 内容 | 增量 | 前置 |
|---|---|---|---|
| ① | 教程页 56 条补正文 | 1127 → **1183**（+5.0%） | 需授权；先改 8 条「实测/亲测」标题 |
| ② | 改名后可写 | +1 条（`ask-xiaoyuzhoufm-com`） | 素材仍不足，暂不可行 |
| ③ | 50 条清理（下线≈34 + 合并 13 + 改名/改 URL 4） | 1177 → ≈1131，覆盖率 ≈99.6% | 需人工确认清单；优先移出 `tool14961`、`tool1333` 两个博彩外链 |
