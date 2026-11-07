# 第 158 批 内容生产记录（2026-11-08）

## 一、基线

| 指标 | 数值 |
|---|---|
| 工具条数 | 1177 |
| 原创池（profiles 1127 ∪ editorials 5，重叠） | 1127 |
| 四条件通过 == tools.xml | 1127 == 1127 |
| 待写条目 | 50 |
| 教程 | 134（可索引 94） |
| 起始 HEAD | `f6401d8a`，工作区干净 |
| `content-queue --top 24 --save` | 零 diff（第 62 次） |

## 二、工具页：第 82 轮探测，仍为 0

网络状况与上一批一致：`127.0.0.1:7897` 代理 000、`r.jina.ai` 000、`baidu.com` 000；
`cursor.com/docs` 与 `docs.openclaw.ai` 直连 200。即「直连 + 代理 curl + 渲染读取」三步兜底全部失效。

50 条待写 URL 全量探测（8 并发 / 15s，200 共 17 条，逐条开箱后全部作废）：

| slug | 状态 | 开箱结论 |
|---|---|---|
| hotshot-co | 200 / 7505 字 | 站点已改为科技博客，非原 AI 视频产品 |
| tool216 Zyro | 200 / 6631 字 | 已并入 Hostinger，主题不符 |
| duiyou-ai 堆友AI | 200 / 2116 字 | 落地为「美图设计室」，名实不符 |
| tool67595 / tool1333 / tool14961 | 200 | 关键词堆砌名；`tool1333`、`tool14961` 已变博彩站 |
| ai-bot | 200 / 13530 字 | 通用名「AI工具集」，会让「含自身名」校验失效 |
| tool14278 MidReal | 200 / 983 字 | 产品 sunset 公告 |
| tool6840 360智绘 | 200 / 94 字 | 落地为「360AI办公」，名实不符 |
| tool479 | 526 | 证书无效 |
| tool58825 / phind-com | 403 | Cloudflare 挑战页 |
| 其余 33 条 | 000 / CERT / ENOTFOUND / Timeout | 域名消失或连接故障 |

结论固化：待写池 50 条在现有网络条件下不可写，禁止据空素材编造。

## 三、本批产出：教程页 16 条（134 → 150，可索引 94 → 110）

素材全部来自 `cursor.com/docs`（直连 200，单页正文 3.7–37 KB），均为官方文档改写。

| slug | 字数 | 来源页 |
|---|---|---|
| cursor-hooks-guide | 1719 | /docs/hooks |
| cursor-agent-skills-guide | 1403 | /docs/skills |
| cursor-subagents-delegation | 1329 | /docs/subagents |
| cursor-plugins-bundle | 1218 | /docs/plugins |
| origin-code-tours | 1467 | /docs/origin/code-tours |
| origin-clone-fast-ci | 2194 | /docs/origin/clonekit-ci |
| cursor-automations-triggers | 2188 | /docs/cloud-agent/automations |
| cursor-ios-app-remote-control | 1702 | /docs/cloud-agent/mobile |
| cloud-agent-runtime-choice | 1490 | /docs/cloud-agent/self-hosted/choose-runtime |
| cursor-jira-integration-setup | 1573 | /docs/integrations/jira |
| cursor-prompting-context-budget | 1459 | /docs/agent/prompting |
| cursor-rollouts-deploy-verify | 1927 | /docs/rollouts |
| cursor-pr-routing-approval | 1601 | /docs/approval-agents |
| cursor-tailscale-private-mcp | 1836 | /docs/integrations/tailscale |
| origin-mirror-github-repo | 1596 | /docs/origin/mirror-github |
| cursor-github-app-installation | 2008 | /docs/integrations/github |

## 四、自检

- 四条件 1127 == tools.xml 1127
- 教程 150 条、≥600 字 110、tutorials.xml 110，16 个新 slug 逐个在列
- sitemap-index 含 tutorials.xml；news.xml 15
- 20 字中文滑窗：与既有 134 条重复 **0**；批内互比 **0**（初检 6 个窗口来自
  Origin「早期测试阶段…」同一句套话，已把 `origin-mirror-github-repo` 首段改写）
- 红线词（实测/亲测/笔者/小编）0；价格数字 0

## 五、新方法论

38. **`cursor.com/docs` 的文档面远比想象的大**：`/docs` 首页的 `href="/docs/..."` 一次性枚举出 88 个路径，
   已写的 20 条只覆盖了其中约四分之一。未开采且事实密度高的面：`/docs/sdk/*`、`/docs/cli/{acp,using}`、
   `/docs/origin/{browse,git,create-repository,settings,pull-requests}`、`/docs/grok-bot/*`、
   `/docs/integrations/{slack,gitlab,bitbucket,azure-devops,jetbrains,xcode,microsoft-teams}`、
   `/docs/cloud-agent/{api/endpoints,settings,setup,best-practices}`、`/docs/models-and-pricing`（含价格，慎用）。
39. **抓取脚本必须自带 AbortController**：本批第一版抓取脚本没有超时，卡在
   `/docs/cloud-agent/api/endpoints`（超大页）上 7 分钟不动，整批后续页面全被堵住。
   改为 20s 超时后同一批 12 页 2 分钟内跑完；单页 `text` 3.7–37 KB，取 `<main id="main-content">` 区间即可。
40. **`origin` 系列页面普遍偏薄**：`/docs/origin` 2322 字、`/docs/origin/pull-requests` 2057 字，
   单独成篇会低于 700 字目标；但 `code-tours`(5996)、`clonekit-ci`(16146)、`mirror-github` 足够。
   选题前先看抓回的字数，别按标题想象内容量。

## 六、遗留

- 待写池 50 条维持「写不了」判定（b77–b158 共 82 轮零翻转），其中 `tool1333`、`tool14961` 为博彩外链，建议无条件下线。
- 提示词口径「1210/35/1175」应改为实况「1177/1127/50」。
- 教程侧余量：cursor docs 未开采面仍在（见方法论 38），下一批可继续；openclaw 侧已接近枯竭。
