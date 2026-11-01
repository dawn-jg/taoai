# 第 132 批内容生产记录（2026-11-01）

## 一、基线（起始 HEAD `e4023333`，工作区干净，HEAD==origin/main）

| 指标 | 数值 |
|---|---|
| 工具条目 | 1177 |
| 原创池 | 1127（editorials 5 + profiles 1123，重叠 1） |
| 四条件可索引 | **1127**（池内失败 0/0/0） |
| `public/tools.xml` | **1127** |
| 待写 | 50 |
| 自检 | ✅ 1127 == 1127，池内名称/字数/自身名失败均为 0 |

`node scripts/content-queue.mjs --top 24 --save` 执行成功，`data/content_queue.json` 零 diff（名单自 b92 起 38 批未变）。

## 二、本批抓取（四通道，全部实测，非沿用旧结论）

| 通道 | 覆盖 | 结果 |
|---|---|---|
| 直连 fetch | 25 条 | 仅 6 条返回 200，其中 4 条是 SPA 空壳（正文 0–135 字） |
| 代理 curl `--tls-max 1.2` | 15 条 | 代理以 `example.com` 200/577B 校准；9 条 000，2 条 404 |
| 渲染读取 `r.jina.ai`（2 路、间隔 3s、不带浏览器 UA） | 10 条 | 4 条拿到正文，4 条导航超时，2 条返回 42205 `EAI_AGAIN` |
| 站内同域/同品牌比对（新增通道） | 全部 50 条 | 见第四节 |

**代理与客户端均已排除**：同代理下 `example.com` 200/577B、`flowith.io` 200/14.8KB、
`seeles.ai` 渲染 15.7KB 成功。故所有 000/超时均为目标站点侧问题。

## 三、产出：0 条（第 61 批）

没有一条能同时满足「素材可核实 + 名称与页面一致 + 不与已写条目同产品」。
按红线三（不虚构），不为凑数写正文。

## 四、⚠ 本批唯一新发现：待写 50 条里有 12 条是「同一产品的重复页」

此前 60 批把「抓不到素材」当唯一原因，本批新增一条此前从未做过的机器校验：
**按主域 + 官网 `<title>` 反查该待写条目是否已有同产品的已写页**。

| 待写 slug | DB 现名 | 实测官网 title / 最终地址 | 已写的同产品条目 |
|---|---|---|---|
| `moyin-com` | 魔撰写作 | 「魔音工坊--达人热推的短视频/有声书AI配音平台」(x.moyin.com) | `tool1924` 魔音工坊（880 字） |
| `duiyou-ai` | 堆友AI | 「美图设计室-免费AI设计工具」(designkit.cn) | `xmyeditor-com` 美图设计室（836 字） |
| `tool67455` | 专注学术写作降AI率的工具 | 「稿易 - AI论文写作指导平台」 | `tool36409` 稿易AI论文（704 字） |
| `tool67595` | 论文降aigc-论文aigc降重-… | `aigc.66paper.cn`，与 `www.66paper.cn` 同品牌降 AIGC 子产品 | `tool14679` 66AI论文（871 字） |
| `seelesai-go-link` | 全球首个端到端AI 3D游戏生成工具 | 渲染最终地址 `https://www.seeles.ai/workspace` | `tool14989` SeeleAgent（797 字） |
| `tool11395` | 一站式用GPT-5.5、Claude-4.7 | `flowith.paluai.com` 为分销镜像，真实产品 `flowith.io` | `tool139` Flowith |
| `tool6840` | 360智绘 | `aigc.360.com` 301 → `bangong.360.cn/ai-tools`，title「360AI办公」 | `bangong-360-cn` 360AI办公（719 字） |
| `tool216` | Zyro AI Image Upscaler | 同域 zyro.com，品牌已并入 Hostinger | `tool302` Zyro AI Background Remover（967 字） |
| `tool1338` | 全能AI助手，基于Qwen模型 | 渲染最终地址为通义千问网页版 | `qwen` 通义千问 |
| `tool150` | AI高保真原型设计 | 301 → `stitch.withgoogle.com`（b127 确证） | `tool73947` |
| `photonaiclub-com` | 光子AI | 同站两入口，渲染 42205 `EAI_AGAIN` | `photonaiclub-com-2`（互为重复） |
| `photonaiclub-com-2` | 光子AI抠图 | 同上 | `photonaiclub-com` |

**意义**：这些条目不是「还没写」，而是**不该有独立页面**——给同一产品写第二份 400–700 字的资料，
正是 AdSense 判定 scaled content abuse 的形态。此前的「跳过」判断是对的，但归因错了：
不是素材缺失，是重复页。补齐它们不是产出，是风险。

## 五、其余 38 条的现状（本批实测，与 b130 全量快照一致，零翻转）

- **站点已死 / 000 或空壳（≈28 条）**：`telehire-ai`、`chatwiz.cn`(`tool13251`)、`maopaoya.com`(`tool9412`)、
  `ibihun.com`(`tool33149`)、`pagentia.com`、`xanswer.com`、`explorer.globe.engineer`(`tool11840`)、
  `lab4ai.cn`(`tool67775`)、`aimianshibang.com`(`tool67371`)、`writingpal.ai`、`etna.7volcanoes.com`、
  `humva.ai`、`voxcraft.ai`(504)、`zaoci.tv`(`tool66554`)、`130ai.com`(`tool7424`)、`getdraft.ai`(`tool67418`) 等。
- **本次新增硬证据 3 条**：`ai-code-reviewer.com`(`tool479`) 404；`yanqueai.com` 404；
  `briefly.video`(`tool71074`) 404「Project not found」；`dinq.io`(`tool58825`) Cloudflare 403 拦截页。
- **名实不符 2 条**：`withpoly.com`(`tool701`) 已改为 `poly.app`「The Intelligent Cloud File Browser」，
  3D 材质业务不在首页任何位置；`hotshot.co` 仍为数码博客（今日正文 9014 字）。
- **脏外链 2 条（优先移出）**：`tool148`(magician.design → BETWIN188 博彩站)、`tool14961`(fryderyk.ai → DegenCity Casino)。
- **非工具页 2 条**：`tool1079`（m6.aliyun.com 为阿里云登录页）、`ai-bot`（通用名「AI工具集」）。

## 六、结论

1. 工具页索引面上限 = **1127 / 1177 = 95.8%**，这一轮用「重复页」维度再次确认上限不可通过继续写正文突破。
2. b77–b132 共 **56 轮**、十余类通道、30 次以上复核，0 翻转；本轮新增的重复度维度把剩余 50 条全部归因闭合。
3. 想提高绝对索引数，只剩教程页（56 条、中位 232 字、≥600 字 0 条）这一条路，属 `docs/pending-content-decisions.md` ① 项，待授权。
4. 想提高覆盖率，则执行 ③ 项清理：分母 1177 → 约 1140，覆盖率 95.8% → ≈98.9%。
