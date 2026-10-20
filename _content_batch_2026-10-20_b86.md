# 第 86 批原创资料生产记录（2026-10-20 下午）

## 一、基线与自检

| 项 | 数值 |
|---|---|
| 工具总数（`data/tools.json`） | 1177 |
| 原创池（editorials 5 ∪ tool_profiles 1121） | 1125 |
| 四条件实际通过数 | 1125 |
| `public/tools.xml` 收录数 | 1125 ✅ 一致 |
| 池内孤儿（有档案但 tools.json 无此 slug） | 0 |
| 待写（pool 之外的工具页） | 52 |

HEAD：`57eef508`（第 85 批报告）。

## 二、本批产出

**新增原创资料 0 条**（连续第 16 批零产出）。因素材缺失/站点失效跳过 **52** 条。

本批没有跑 `apply-tool-profiles.mjs --apply` 与 `generate-sitemap.mjs`——没有内容可合并，跑一次只会无谓刷新 sitemap 的 lastmod。

## 三、本批探测路径与结果

对 52 条中「名称合规 + 站点看似在线」的 25 条做了完整四轮探测（直连 fetch → 代理 curl → 渲染读取 `r.jina.ai` → 官方子页），逐条结论如下。

### 3.1 本批新查实的失效证据（此前批次未确认到具体原因）

| slug | 名称 | 实测结果 | 判定 |
|---|---|---|---|
| `miaohui-jixueai-com` | 秒绘AI | `miaohui.jixueai.com` 现为「上海创大产控高新技术集团」企业官网（科研经纪/产业园），与该 AI 绘画工具无任何关系 | 易主，URL 指向别家 |
| `duiyou-ai` | 堆友AI | `designkit.cn` 现为「美图设计室 Designkit」，页面自称美图旗下 AI 设计工具 | 品牌不符，需改数据 |
| `tool6840` | 360智绘 | `aigc.360.com` 302 至 `bangong.360.cn/ai-tools/member-benefits.html`，正文件仅 94 字 | 已并入 360AI办公，素材不足 |
| `tool14278` | MidReal | `midreal.ai` 首页为官方告别信：宣布 sunset MidReal，团队转向 Macaron | 已下线 |
| `tool67418` | GetDraft | 首页标题「GetDraft has ceased operations」，仅保留导出与退款通道至 2026-12-31 | 已关停 |
| `tool3006` | LogoliveryAI | 首页仅一句：Logolivery, Inc. 已正式清算（liquidated） | 已关停 |
| `tool216` | Zyro AI Image Upscaler | `zyro.com/tools/image-upscaler` 302 至 Hostinger 博客《Zyro joins forces with Hostinger》，原工具页不存在 | 产品线并入 Hostinger |
| `moyin-com` | 魔撰写作 | `x.moyin.com` 302 至 `moyin.com` 魔音工坊（AI 配音），非写作工具 | URL 错误 |
| `etna-7volcanoes-com` | Etna | 域名无法解析（NXDOMAIN） | 域名失效 |
| `tool66554` | 造次 | `zaoci.tv` 返回 200 但响应体 0 字节 | 空壳 |
| `tool150` | AI 高保真原型设计 | `usegalileo.ai` 现标题「Stitch - Design with AI」，正文 19 字 | 站点变更 + 名称为描述性短语 |
| `tool923` | AI 3D捕捉、建模和渲染 | `lumalabs.ai` 在线，正文 2785 字（Luma 已定位为「AI Agents for Creative Work」，Ray 3.2） | 素材充足，但 DB 名为描述性短语，「含自身名」校验无意义 |

### 3.2 其余条目（沿第 85 批结论，本批复核仍不通过）

- **不可达**：`6pen-art`、`tool2676`(175.fun)、`tool1957`(ailogo.qq.com)、`photonaiclub-com(-2)`、`tool7424`(130ai.com)、`tool11840`、`tool67371`、`tool33149`、`tool1333`(aiapp.cc，403)、`flow-studio`(flowgpt.com，403)、`miantuan-knowfuture-com-cn`(渲染超时)、`writingpal-ai`(渲染超时)、`xanswer-com`(域名无法解析)、`voxcraft-ai`(nginx 504)。
- **名称不合规（描述性/堆砌/含分隔符）**：`ai-bot`、`yanqueai-com`、`telehire-ai`、`seelesai-go-link`、`pagentia-com`、`ask-xiaoyuzhoufm-com`、`tool67595`、`tool9412`、`tool1338`、`tool11395`、`tool67775`、`tool71074`、`tool67455`、`tool13251`、`tool151`、`tool67371`、`tool58825`、`tool33149`、`tool479`、`tool701`、`tool1079`、`tool14961`、`tool111`、`tool148`。
- **同站重复**：`photonaiclub-com` 与 `photonaiclub-com-2` 同域；`tool1890`(Neeva) 服务已于 2023 年关停。

## 四、结论与建议（第 16 次重申）

1. **工具页索引面的现实上限就是 1125**。剩余 52 条不是「还没写」，而是「没有可写的对象」：域名失效、站点关停、品牌易主、垃圾域名，或名称本身是描述性短语（写出来也过不了「含自身名」校验）。
2. 本自动化按原任务目标（批量续写 15–20 条）重跑，产能恒为 0。若要继续提升可索引页面数量，只有两个方向：
   - **数据清理**：把 3.1 / 3.2 中确认失效或易主的条目下线，把描述性名称改成真实产品名（如 `tool923` → Luma，`tool150` 需先确认新主体），把 `jianying` 的错误 URL 修正——这些属于数据治理，不是内容生产；
   - **教程页原创内容**：`tutorials.xml` 至今不存在（0/56），这是当前唯一还有增量空间的索引面。
3. 下一步建议把本自动化的目标改为上述两者之一，否则每次运行只会重复本报告。
