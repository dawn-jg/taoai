# 第 76 批原创资料续写 · 素材筛查报告（2026-10-18）

> 任务：为 taoai365.com 工具页批量续写原创资料，目标 15–20 条。
> 结论：**新增 0 条**。待写池 53 条经全量存活探测后，可用素材仍为 0，未用空素材凑数。
> 这是连续第七批 0 产出（b70=3、b71=2、b72=0、b73=0、b74=0、b75=0、b76=0）。

---

## 一、基线（本次实测，非引用历史）

| 指标 | 数值 |
|---|---|
| 工具条目 | 1177 |
| 原创池（editorials 5 + tool_profiles 1120） | 1124 |
| 四条件通过 | 1124 |
| `public/tools.xml` 条目 | 1124 |
| 待写（无原创资料） | **53** |

自检（独立复算，镜像 `lib/tools.ts` 的 `isToolIndexable`）：池内未通过 0（短正文 0 / 缺名 0 / 脏名 0）、
「池内有但 sitemap 无」0、「sitemap 有但池内无」0。**索引面完全自洽。**

> ⚠️ 任务书描述的「工具约 1210 条 / 当前可索引 35 条 / 剩余待写约 1175 条」是整改初期快照，
> 与当前实际（1177 / 1124 / 53）严重偏离。本轮按实际状态执行。

---

## 二、方法

1. `content-queue.mjs --top 60 --json` 取全量 53 条待写（未覆盖 `data/content_queue.json`）。
2. `--top 24 --save` 正常生成队列（确认队列未变，仍为 b72 以来同一批 53 条）。
3. 全量存活探测：代理 `127.0.0.1:7897` + 浏览器 UA + `Accept-Encoding: identity` + `-m 25`，
   6 路并发，**每条独立临时文件**（避免 b75 踩到的 title 串行错位），取 `http_code / bytes / <title>`。
4. 对每条做「名称—页面主题」核对（title 是否还是 DB 里的那个产品）。
5. 仅当「页面存活 ∧ 主题一致 ∧ 名称合规 ∧ 官方正文可支撑 ≥700 字」同时成立才进入写作。

代理通道本身健康（`example.com` 200 / 0.37s），因此 23 条 `000` 属站点侧失效，不是通道问题。

---

## 三、53 条终判

| 判定 | 条数 |
|---|---|
| 域名不可达（DNS 失败 / 拒连 / 证书错误 / 空响应） | 23 |
| 页面仍在但主题已变（易主、转型、博彩/导购占位） | 15 |
| 产品停运 / 清算 / 站点未建成 | 5 |
| 同站或同产品重复（已有原创资料） | 4 |
| 名称或数据不合规（通用名、描述性名称、名称与 URL 不符） | 4 |
| HTTP 404 / Cloudflare 空壳 | 2 |
| **合计** | **53** |

### 3.1 域名不可达（23）

`voxcraft-ai`、`telehire-ai`、`6pen-art`、`miantuan-knowfuture-com-cn`、`pagentia-com`、`photonaiclub-com`、
`photonaiclub-com-2`、`humva-ai`、`writingpal-ai`、`xanswer-com`、`etna-7volcanoes-com`、`tool2676`、
`tool1333`、`tool1957`、`tool479`、`tool9412`、`tool11840`、`tool67775`、`tool66554`、`tool13251`、
`tool67371`、`tool33149`、`tool7424`

### 3.2 页面易主 / 主题不符（15，含探测到的实际 title）

| slug | DB 名称 | 实测首页 title |
|---|---|---|
| `tool58825` | AI人才发现与分析平台… | KeoNhaCai - Tỷ Lệ Kèo Nhà Cái 5（越南博彩） |
| `tool14961` | Redirecting...（脏名） | DegenCity Casino New Zealand |
| `tool148` | BW188（脏名） | The Ice Cream Boutique |
| `tool111` | Reply Logo（脏名） | Devin Desktop \| Devin |
| `tool216` | Zyro AI Image Upscaler | Zyro Website Builder Joins Forces With Hostinger |
| `hotshot-co` | Hotshot | Hotshot \| AI Tools, Gadgets, Smart Home & How-To |
| `miaohui-jixueai-com` | 秒绘AI | 创大产控 \| 科研经纪产业领军企业 |
| `duiyou-ai` | 堆友AI | 美图设计室 |
| `moyin-com` | 魔撰写作 | 魔音工坊 |
| `tool6840` | 360智绘 | 360AI办公 |
| `tool923` | AI 3D捕捉、建模和渲染 | Luma \| AI Agents for Creative Work |
| `tool150` | AI高保真原型设计 | Stitch - Design with AI |
| `tool701` | AI生成3D材质 | （87 字节空壳，Poly 已转型 AI 云文件浏览器） |
| `flow-studio` | Flow Studio | FlowGPT — The open platform for AI applications |
| `tool1338` | 全能AI助手，基于Qwen模型 | 渲染为「千问」，但域名为 `dis.chatdesks.cn` 第三方镜像，非阿里官方 |

### 3.3 产品停运 / 未建成（5）

- `tool14278` MidReal — 官网为 sunset 告别信
- `tool67418` GetDraft — "has ceased operations"
- `tool3006` LogoliveryAI — 官网自述已清算
- `tool1890` Neeva — 站点仅剩跳转
- `tool71074`（briefly.video）— title 为 "Build incomplete"

### 3.4 同站 / 同产品重复（4）

- `seelesai-go-link`（短链域）→ 与 `tool14989` 同产品 Seele
- `tool11395` → Flowith 镜像，且名称是描述句
- `tool67595` → 与 `tool14679` 同站（66paper），且名称 34 字超限
- `tool67455`（gaoyiai.com/paper_aigc）→ 与 `tool36409`（稿易AI论文）同站，名称是描述句

### 3.5 名称 / 数据不合规（4）

`ai-bot`（通用名「AI工具集」，会让「正文含自身名」校验失效，且官网本身是导航站）、
`ask-xiaoyuzhoufm-com`（描述句当名称，且只回落到小宇宙首页）、
`tool1079`（名称「阿里云登录」与 M6 主题不符）、
`tool8681`（reecho.ai 已更名 Vocu AI，DB 名称为描述句，可用事实不足 700 字）。

### 3.6 404 / 空壳（2）

`yanqueai-com`（HTTP 404）、`phind-com`（107 字节，Cloudflare 挑战）。

---

## 四、为什么不是「再努力一点就能写出来」

SOP 允许的素材只有三类：产品官网、官方文档、公开媒体原始报道。53 条里：
- 23 条官网已不存在 → 无第一类来源；
- 14 条官网活着但已不是 DB 里那个产品 → 写出来就是「内容与页面主题不符」，正是当年被判低价值的原因；
- 5 条产品已停运 → 写「怎么用」是虚构；
- 9 条与已有页面重复或名称本身不合法 → 即便写了也进不了索引。

因此本轮可写集合为空集，**0 条是正确结果，不是执行不足**。

---

## 五、建议（按优先级）

1. **把本自动化改向「教程页原创内容」。** `data/tutorials.json` 共 56 篇，实测全部 <600 字，
   `generate-sitemap.mjs` 输出 `tutorials.xml: 收录 0/56`，`public/tutorials.xml` 因此为空且未进 `sitemap-index.xml`。
   **这是一整块 56 页、当前完全空白的索引面**，提升空间远大于 53 条死链。
2. **对 53 条做数据清理，而不是续写。** 建议动作：23 条死域名 + 5 条停运 → 下线或替换；
   14 条易主 → 换 url 或改名；4 条重复 → 合并；`jianying` url 指向即梦仍待修。
   在清理完成前，这批条目会一直占住「待写 53」这个指标，让每次续写任务都空跑。
3. **修 3 处脏名称**（`tool111`「Reply Logo」、`tool14961`「Redirecting...」、`tool148`「BW188」），
   它们明显是抓取残留，不影响索引面（本就不在池内），但影响站内观感。

---

## 六、本轮变更

- `data/tool_profiles.json`、`data/tools.json`、`public/*.xml`：**均未修改**（无内容可合并，未跑 `--apply` / `generate-sitemap`）。
- 新增本报告；`data/content_queue.json` 由 `--save` 刷新（内容不变）。
