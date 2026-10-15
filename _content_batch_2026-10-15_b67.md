# 第六十七批原创资料小结（2026-10-15）

## 结果
- 新增 **4 条**原创工具资料：TigerBot（tool2771）、Learning Prompt（tool744）、Kiro CLI（tool114）、Lobe（tool439）
- 可索引：1083 → **1087**；`原创池 1087 == 四条件通过 1087 == tools.xml 1087` ✅（池内未通过 0、孤儿 profile 0）
- 待写：94 → **90**（完成度 92.4%）
- 实际抓取素材 4 条全部写成；其余 90 条按红线判定「素材缺失」跳过，未据空素材编造

## 条目与来源
| slug | 名称 | 字数 | 来源 |
|---|---|---|---|
| tool2771 | TigerBot | 1760 | https://github.com/TigerResearch/TigerBot（官方仓库 README）+ https://huggingface.co/TigerResearch + https://modelscope.cn/organization/TigerResearch |
| tool744 | Learning Prompt | 1287 | https://github.com/thinkingjimmy/Learning-Prompt（官方仓库 README） |
| tool114 | Kiro CLI | 1488 | https://kiro.dev/cli/（官网产品页）+ 官方开源前身仓库 https://github.com/aws/amazon-q-developer-cli 与 https://github.com/withfig/autocomplete |
| tool439 | Lobe | 1036 | https://github.com/lobe/lobe（官方仓库）+ https://github.com/lobe（官方组织页） |

未使用任何第三方导航站或媒体转述，未引用用户评价、销量与具体价格。

## 名称 / URL / 描述修正 4 处（先改再写）
- `tool2771`：「虎博科技推出的AI对话聊天机器人，基于T」（截断描述名）→ **TigerBot**；url 由已失效的 `tigerbot.com` 改为官方开源仓库；pricing `freemium` → `free`
- `tool744`：「免费的AI提示词学习平台」（通用描述名）→ **Learning Prompt**；url 由**已被博彩页劫持**的 `learningprompt.wiki` 改为官方开源仓库
- `tool114`：「下一代命令行工具（内置AI终端命令自动补全）」（描述名）→ **Kiro CLI**；url 由失效的 `fig.io` 改为当前官方产品页（产品线：Fig → Q Developer 命令行工具 → Kiro CLI）
- `tool439`：「简单免费的机器学习模型训练工具」（描述名）→ **Lobe**；url 由 `www.lobe.ai`（跳 GitHub）改为官方仓库
- 四处 `description` / `tags` / `domain` / `pricing` 同步改写；未改动 category/subcategory，故 `categories.json` 计数无需重算

## 本批判废判定（94 条全量四轮实测）
- **代理 curl 全量探测**：回 200 约 49 条，`000` 计 44 条
- **直连复测 44 条 `000`**：仅 1 条回 200（`xiaoyutai.com`，仍是 SPA 空壳），其余全灭 → 判定域名失效
- **DNS 核查（DoH）**：16 条 `000` 域名其实有 A 记录（`humva.ai`、`voxcraft.ai`、`writingpal.ai`、`6pen.art`、`leewow.com` 等），但代理隧道建立后 TLS 握手中断、`r.jina.ai` 亦全部 422/超时 → 服务端已无可用站点
- **`r.jina.ai` 渲染读取 94 条**：仅 13 条返回 >2.5KB，且逐条核对后全部为「已被劫持的博彩页 / 域名易主后的别家产品页 / 名称与页面不符」
  - 劫持：`learningprompt.wiki`（HABANERO188）、`magician.design`、`dinq.io`、`hotshot.co`（已成科技博客）、`neeva.com`（已成新闻模板站）
  - 停服/清算/并入：6pen Art（官网「是时候说再见了」）、6pen Pro（「网站已关闭」）、MidReal（sunset 公告）、LogoliveryAI（已清算）、GetDraft、Instreet（闭店装修）、万兴智演、Phind、Noisee AI（2026-04 停运）、Zyro（并入 Hostinger）、ClipDrop Stable Doodle、Tome
  - 名称与页面不符 / 主体换壳：`tool6840`（360AI办公 vs 360智绘）、`tool1989`（万网 vs 智能logo）、`tool701`（withpoly 已成云文件浏览器）、`tool923`、`tool150`（Galileo → 已被 Google 收编为 Stitch）、`tool111`、`ask-xiaoyuzhoufm-com`（渲染到小宇宙播客首页，无 AI 搜索产品）
- **同产品双条**：`duiyou-ai`（designkit.cn）＝ 既有 `xmyeditor-com` 美图设计室；`seelesai-go-link` ＝ 既有 `tool14989`；`moyin-com` ＝ 既有 `tool1924` 魔音工坊；`tool923` ＝ 既有 `lumalabs-ai`；`tool11395` ＝ 既有 `tool139` Flowith；`tool67455` ＝ 既有 `tool36409` 稿易；`tool150` ＝ 既有 `tool73947` Stitch；`tool596` ＝ 既有 `google-flow-music`
- **通用名 / 描述名按红线跳过**：`ai-bot`（AI工具集）、`tool67595`（关键词堆砌名 + 论文降 AIGC 服务，不做收录）
- **明确排除**：`jianying`（url 指向即梦，数据错误未修正）

## 抓手结论
- **本批唯一稳定通道是「官方开源仓库 README（`raw.githubusercontent.com`）＋官方产品页」**：4 条全部由此取得，`TigerBot` 的 44KB README 事实密度最高
- 代理 curl 只对「官网主通道仍在」的域名有效；`r.jina.ai` 本轮对 SPA **命中率 0**（63/94 已完成部分仅 2 条 >5KB 且均不可用）
- **WebFetch 本轮对 `explorer.globe.engineer`、`photonaiclub.com`、`hsphoto.cn`、`leewow.com` 全部 fetch failed**，仅 `lobe.ai`、`aigc.360.com` 可用
- `getent hosts` 在本环境不可用于判 DNS（沙箱无本地解析），需用 DoH（`dns.google/resolve`）核对
- 待写 90 条已高度见底：「域名失效 / 已停服 / 已劫持 / 同产品重复 / 名称—页面不符」五类占绝大多数；下一步只能靠开放源码仓库与官方文档站继续找，**按实际素材量如实上报，不预设条数**

## Git
见本轮 commit（内容 + 本小结），显式 add 7 个文件，未使用 `git add -A`（工作区另有未跟踪 `build_cron_2026-10-07.log`）。
