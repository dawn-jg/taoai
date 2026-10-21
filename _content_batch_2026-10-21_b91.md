# 第 91 批原创资料实写记录（2026-10-21 晚）

## 结论

- **新增 0 条**（连续第 21 批零产出；b70=3、b71=2、b72–b76=0、b77=1、b78–b91=0）。
- 因素材缺失 / 产品停运 / 主题不符跳过 **52 条**（待写池全量）。
- 累计可索引 **1125** 条（= `public/tools.xml` 1125 条），剩余待写 **52** 条。
- 数据与 sitemap **零改动**，未跑 `apply-tool-profiles --apply` 与 `generate-sitemap`（无内容可合并，避免刷 lastmod）。

## 一、基线复核（HEAD `c2b4ac08`）

| 指标 | 值 |
|---|---|
| `data/tools.json` 工具总数 | 1177 |
| `data/editorials.json` 评测（根数组） | 5 |
| `data/tool_profiles.json` items | 1121 |
| 原创池（并集） | 1125 |
| 四条件通过（池命中 + 名称干净 + 正文≥600 + 含自身名） | **1125** |
| `public/tools.xml` `<loc>` 条数 | **1125** |
| 池内 slug 不在 tools.json | 0（无孤儿） |
| 池内短正文 / 脏名 / 缺自身名 | 0 / 0 / 0 |
| 待写（未进原创池） | 52 |

自检结论：**1125 == 1125**，sitemap 与页面判定自洽。

## 二、本批实测手法（约 6 分钟）

1. `node scripts/content-queue.mjs --top 60 --json` → `.tmp_queue91.json`（`pending: 52`，一次取全，未覆盖 `data/content_queue.json`）。
2. `.tmp_probe91.mjs`：Node 原生 fetch 直连、6 路并发、12s 超时，统计 status / 去标签正文字数 / title / finalUrl，一次跑完 52 条。
3. 直连失败的 8 条再用渲染读取服务复探（`r.jina.ai`，不带浏览器 UA、串行、间隔 3s）。**注意：本机直连 `r.jina.ai` 返回 000，必须加 `--proxy http://127.0.0.1:7897`；代理本身正常（baidu 200）。**
4. **若在后台任务（run_in_background）里跑 curl，`-o` 写文件会报 `No such file or directory`（沙箱拒绝后台写入），抓取命令必须前台执行。**

## 三、52 条分桶与逐条证据

### A 类：域名/网络不可达（27 条）

fetch failed、`AbortError` 或代理 curl 000，三通道（直连 / 代理 curl / 渲染读取）一致性失败：

`voxcraft-ai`（jina 504 nginx Gateway Time-out）、`telehire-ai`、`6pen-art`、`flow-studio`、`miaohui-jixueai-com`、`miantuan-knowfuture-com-cn`、`pagentia-com`、`photonaiclub-com`、`photonaiclub-com-2`（jina 42206 networkidle 超时）、`humva-ai`（42206）、`writingpal-ai`（42206）、`xanswer-com`、`etna-7volcanoes-com`、`tool6840`、`tool2676`、`tool1957`、`tool1890`、`tool701`、`tool9412`、`tool11840`、`tool1338`、`tool11395`、`tool67775`、`tool66554`、`tool13251`、`tool923`、`tool150`、`tool67371`、`tool33149`、`tool148`、`tool7424`

> 其中 `6pen-art` 渲染成功但内容为官方告别页《致谢与新篇章》（"是时候说再见了"，引导迁移 6pen Pro）→ 产品已停运；
> `flow-studio` 渲染到的是 FlowGPT 通用 explore 页（`/flow-studio` 路径已回落），与 DB 名称不符 → 作废。

### B 类：HTTP 错误（3 条）

| slug | 状态 | 说明 |
|---|---|---|
| `phind-com` | 403 | Cloudflare "Just a moment..." 挑战页，36 字 |
| `tool71074`（briefly.video） | 404 | Lovable "Project not found"，51 字 |
| `tool479`（ai-code-reviewer.com） | 404 | 页面不存在，0 字 |

### C 类：产品停运 / 公司清算（5 条）

`6pen-art`（告别页，迁 6pen Pro）、`tool14278`（MidReal，官方 sunset 通告，团队转 Macaron）、`tool67418`（GetDraft，"ceased operations"，仅留导出至 2026-12-31）、`tool3006`（LogoliveryAI，公司已清算，131 字）、`tool1890`（Neeva，产品并入 Snowflake，仅剩跳转壳）

### D 类：域名易主 / 主题与名称不符（7 条）

| slug | DB 名称 | 实际页面 |
|---|---|---|
| `tool14961` | Redirecting... | `fryderyk.ai` 已为新西兰博彩站 DegenCity（19350 字） |
| `tool1333` | 创作王 | `aiapp.cc` 返回博彩页（HTML 实体编码的「qy球友会」，3081 字） |
| `tool216` | Zyro AI Image Upscaler | 302 到 Hostinger 博客《Zyro joins forces with Hostinger》，原工具页不存在 |
| `hotshot-co` | Hotshot | 已变导购博客（AI 工具 / 数码 / 智能家居），非 AI 视频工具 |
| `duiyou-ai` | 堆友AI | `designkit.cn` 现为「美图设计室 Designkit」，255 字 |
| `moyin-com` | 魔撰写作 | `x.moyin.com` 现为「魔音工坊」AI 配音平台，主题不符 |
| `tool1079` | 阿里云登录 | `m6.aliyun.com/#` 为阿里云登录页，177 字，非独立工具 |

### E 类：名称不合规 / 同站重复，素材再多也不能写（8 条）

| slug | 名称 | 判定 |
|---|---|---|
| `ai-bot` | AI工具集 | **通用名**，直连可取 13256 字，但「含自身名」校验失去意义 → 不写 |
| `tool111` | Reply Logo（codeium.com） | 302→`devin.ai/desktop`，10388 字可读；名称为抓取残留，且库内已有 `preview-devin-ai` → **应合并** |
| `tool67595` | 论文降aigc-论文aigc降重-AI痕迹降低…（>30 字） | 与 `tool14679`（www.66paper.cn 同路径 `/AI_A2E1C09`）为同站重复 → **应合并** |
| `tool923` | AI 3D捕捉、建模和渲染 | 描述性名称，`lumalabs.ai` 与 `lumalabs-ai` 同域 → **应合并** |
| `ask-xiaoyuzhoufm-com` | 小宇宙推出的AI搜索产品 | 描述性名称 + 正文 20 字 |
| `seelesai-go-link` | 全球首个端到端AI 3D游戏生成工具 | 描述性名称 + 0 字（短链跳转壳） |
| `yanqueai-com` | AI LOGO设计工具 | 描述性名称 + 0 字 |
| `tool67455` | 专注学术写作降AI率的工具 | 描述性名称 + 115 字 |

### F 类：活站但素材不足（2 条）

`photonaiclub-com-2`（光子AI抠图，工作区页需登录态，42206）、`xanswer-com`（需 JS 渲染，三通道无正文）

## 四、本批新查实 / 修正

1. **`r.jina.ai` 在本机必须走代理**：直连 `000`，加 `--proxy http://127.0.0.1:7897` 后正常返回 200/422。此前批次把它当作"直连可用"的口径需要修正。
2. **后台任务不能写文件**：`run_in_background: true` 下 curl `-o` 一律 `No such file or directory`，抓取必须前台跑（这会决定下批流水线怎么写）。
3. `tool14278` MidReal 今日仍为官方 sunset 告别通告页（955 字），确认不是抓取失败，而是产品下线。
4. `tool216` 的 `zyro.com/tools/image-upscaler` 已是 Hostinger 博客页，7403 字全是并站说明，**不是**该工具的功能介绍，不能作为 `sources`。

## 五、自检

- 独立复算：原创池 1125、四条件通过 1125、`tools.xml` 1125 → **1125 == 1125 == 1125** ✅
- 池内失败项：短正文 0 / 脏名 0 / 缺自身名 0 / 孤儿 0 ✅
- `apply-tool-profiles.mjs` 试算与 `generate-sitemap.mjs` 均未执行（无内容可合并，避免无意义刷新 lastmod）
- 未用 `git add -A`（避开周期性 `build_cron_*.log`），仅提交本报告

## 六、⚠ 结论（第 21 次）：工具页索引面上限 = 1125

52 条待写池已连续 15 轮（b77–b91）取证到「域名 / 产品 / 名称」级别，四轮以上数百个 URL 命中 0。
**按本任务原目标（工具页原创资料）继续重跑，产能恒为 0，边际收益为零。**

剩余可增量索引面只有一处：**教程页**。`data/tutorials.json` 56 条，正文最长 316 字、平均 229 字、可索引 **0**（≥600 字者 0 条），`public/tutorials.xml` 至今不存在。把教程正文补到 ≥600 字（`TUTORIAL_MIN_CONTENT_CHARS`），可把站点索引面从 1125 提到 **1181（+56）**，而且这批页面本来就已存在、有真实搜索需求，比继续挖死链更有价值。

建议二选一改任务目标：
1. **教程页原创正文补齐**（56 条，门槛 600 字，`lib/tools.ts` 已有现成判定）；
2. **52 条死链数据清理**（下线 / 合并，纯数据操作，不需素材，一次可达标），顺带解决导航站收录 52 个死站的质量信号问题。
