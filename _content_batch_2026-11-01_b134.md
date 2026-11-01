# 第 134 批内容生产记录（2026-11-01 20:20）

## 一、基线（起始 HEAD `9d9f36a5`，工作区干净，HEAD==origin/main）

| 指标 | 数值 |
|---|---|
| 工具条目 | 1177 |
| 原创池 | 1127（editorials 5 + profiles 1123，重叠 1） |
| 四条件可索引 | **1127** |
| `public/tools.xml` | **1127** |
| 待写 | 50 |
| 自检 | ✅ 1127 == 1127 |

`node scripts/content-queue.mjs --top 24 --save` 零 diff（名单自 b92 起第 40 批未变）。

## 二、产出：0 条（连续第 63 批）

本批未沿用旧结论，对队列 24 条重新做了四通道实测；对队列外余量 26 条做了名称/归属复核。

| 通道 | 覆盖 | 结果 |
|---|---|---|
| 直连 `fetch`（15s 超时，5 路） | 24 条 | **9 条 200**：ai-bot 14.8 KB、hotshot-co 8.9 KB、tool1333 1.9 KB、duiyou-ai 265 字、tool6840 105 字、seelesai 42 字、ask-xiaoyuzhoufm 29 字、moyin 24 字、yanqueai 0 字；phind 403「Just a moment」；其余 14 条 `fetch failed` |
| 代理 `curl --tls-max 1.2`（`example.com` 200/577B 校准） | 13 条 | **12 条 000**，flowgpt 403（CF） |
| 渲染读取 `r.jina.ai`（无浏览器 UA、串行间隔 3s） | 8 条 | telehire 42203 域名不可解析、xanswer 42205 `EAI_AGAIN`、humva 为 ParkLogic 停放页、voxcraft 504、6pen 为 2024-08-15 关停告别信、pagentia/miantuan 导航错误、miaohui 渲染到「创大产控」 |
| 站内同根域重复比对 + 名称干净度 | 全部 50 条 | 12 条重复页、8 条名含 `&#`/`|`/描述性长名（名称门槛即失败） |

## 三、9 条 200 的逐条定性（全部作废，无一可写）

| slug | DB 名 | 实测页面 | 定性 |
|---|---|---|---|
| `ai-bot` | AI工具集 | ai-bot.cn 导航站 14.8 KB | 通用名 + 竞品导航站；名称校验失效，SOP 第 10 条明令排除 |
| `hotshot-co` | Hotshot | title「Hotshot \| AI Tools, Gadgets, Smart Home & How-To」，正文「Your everyday tech guide」 | 已转型科技博客，非原 AI 视频工具 → 名实不符 |
| `tool1333` | 创作王 | aiapp.cc 跳赌博落地页（「领取优惠」「体育」）+ 企业新闻混杂 | 高风险外链，不可写，应清理 |
| `duiyou-ai` | 堆友AI | 实际 title「美图设计室」，designkit.cn | 名实不符，且与 `xmyeditor-com` 重复 |
| `tool6840` | 360智绘 | 301 → bangong.360.cn「360AI办公」 | 与 `bangong-360-cn` 重复 |
| `moyin-com` | 魔撰写作 | title「魔音工坊」 | 与 `tool1924` 重复 |
| `seelesai-go-link` | 全球首个端到端AI 3D游戏生成工具 | 正文 42 字（SPA） | 描述性长名 + 素材不足 |
| `ask-xiaoyuzhoufm-com` | 小宇宙推出的AI搜索产品 | 正文 29 字 | 描述性长名 + 素材不足 |
| `yanqueai-com` | AI LOGO设计工具 | 200 但正文 0 字 | 纯 SPA + 描述性名 |

## 四、新增硬证据（可直接用于清理）

- `telehire-ai`、`xanswer-com`：第三方网络返回 42203/42205「could not be resolved」→ 域名已无公共解析，**站点下线**（SOP 第 22 条：本机超时不作依据，此为硬证据）。
- `humva-ai`：ParkLogic 停放页，域名待售。
- `6pen-art`：2024-08-15「致谢与新篇章」关停公告，服务已终止。
- `voxcraft-ai`：504 Gateway Timeout。

## 五、复核方法说明

「已有正文」的 23 条为 ai-bot.cn 采集残留（b133 已按来源指纹定性），本批未再逐条复算，仅确认队列名单未变。

## 六、自检

- 四条件可索引 1127 == `public/tools.xml` 1127 ✅
- 无内容可合并，故未跑 `--apply` / `generate-sitemap`（避免刷新 1123 个 lastmod）
- 临时探测脚本与抓取产物在系统临时目录 `Temp/b134/`，`.tmp_b134/` 提交前已删
- 本批仅提交本文件与 `docs/pending-content-decisions.md` 两处文档

## 七、结论（第 63 次）

工具页索引面上限 **1127（95.8%）**，可写池 **0**。63 批、四类通道、50 条已 100% 定性
（23 采集残留 + 12 重复页 + 约 34 停运/下线 + 4 名实不符，类别间有交叉）。**继续抓取不再产生新信息。**

唯一成规模放量面仍是 `docs/pending-content-decisions.md` 第四节所列两项（教程页 56 条补正文 / 50 条清理），
均需人工授权，本自动化无权自行执行。
