# 第 151 批内容生产记录（2026-11-06）

## 一、基线

| 指标 | 数值 |
|---|---|
| 工具总数 | 1177 |
| 原创池 | 1132（profiles 1127 + editorials 5，editorials 的键是数组下标 0–4，与工具 slug 全不重叠，实际有效池 1127） |
| 四条件通过 | 1127 |
| `public/tools.xml` | 1127 |
| 待写 | 50 |
| 教程 ≥600 字 | 7 / 56（本批前） |
| 起始 HEAD | `73c45e99`，工作区干净，HEAD == origin/main |

`node scripts/content-queue.mjs --top 24 --save` 与 b140–b150 逐字节一致（第 55 批零 diff）。

## 二、工具页：第 80 轮仍为 0

直连 `fetch-sources.mjs --force` 24 条：成功 8 / 403 1 / fetch failed 15。

8 条 200 逐条核对后全部作废：

| slug | 抓到的标题 | 作废原因 |
|---|---|---|
| `ai-bot` | AI工具集官网 \| 1000+ AI工具集合 | 通用名，含自身名校验失去意义 |
| `duiyou-ai` | 美图设计室-免费AI设计工具 | 名实不符（DB 名为「堆友AI」），且库内已有美图相关条目 |
| `seelesai-go-link` | Best No-Code AI Game Maker for 2D/3D Games | 描述性长名，且与 `tool14989` 重复 |
| `ask-xiaoyuzhoufm-com` | 小宇宙 | 页面是播客产品首页，非 AI 搜索；名称亦为描述性长名 |
| `hotshot-co` | Hotshot \| AI Tools, Gadgets, Smart Home | 域名已易主为数码评测站 |
| `moyin-com` | 魔音工坊 | 与库内 `www.moyin.com` 条目重复（b148 已证） |
| `tool1333` | qy球友会-qy球友会体育 | 博彩站，外链风险 |
| `tool6840` | 360AI办公 | 名实不符（DB 名为「360智绘」），且与 `bangong-360-cn` 重复 |

`yanqueai-com` 返回 SPA 壳（未解析到有效内容）。未再跑代理与渲染：22 条已有硬证据，余 2 条为
CF 挑战页与区域限制，b145/b148/b150 已各有结论。

**本批工具页新增 0 条。** `tool1333` 的博彩外链建议优先下线，不需等清理批次。

## 三、教程页：补 8 条（`tutorials.xml` 7 → 15）

判断依据：工具页已闭合，剩余唯一有增量的面是教程页；49 条未写教程里多为 CSDN/腾讯新闻/111cn
的摘编稿（标题含「实测/亲测」属红线），必须换官方文档重写并把 `url` 换成官方地址。

| slug | 字数 | 官方来源 |
|---|---|---|
| `hands-on-cursor-10min` | 917 | `cursor.com/docs/get-started/quickstart`、`/agent/overview` |
| `cursor-agent-mode-deep-dive` | 793 | `cursor.com/docs/agent/overview`、`/agent/agents-window` |
| `claude-code-vs-cursor-vs-codex` | 1276 | `docs.claude.com/.../claude-code/overview`、`cursor.com/docs/cli/overview`、`github.com/openai/codex` |
| `ai-prompt-engineering-master` | 923 | `cursor.com/docs/agent/prompting`、`/rules`、Claude Code overview |
| `clawdbot-to-openclaw-upgrade` | 1197 | `docs.openclaw.ai/cli/migrate`、`/install/migrating` |
| `vibe-coding-complete-flow-guide` | 949 | `cursor.com/docs/cloud-agent/setup`、`/cloud-agent/best-practices` |
| `midjourney-starter-guide` | 884 | `docs.midjourney.com/.../32023408776205-Prompt-Basics` |
| `midjourney-usage-detailed` | 952 | `docs.midjourney.com/.../32859204029709-Parameter-List` |

全部 ≥700 字（门槛 600），八条互不相同，也与此前 7 条无重叠（20 字滑窗比对：涉及新内容的重复段 0）。

## 四、自检

- 四条件 1127 == `tools.xml` 1127 ✅
- 教程 ≥600 字 15 == `tutorials.xml` 15 ✅，`sitemap-index.xml` 含 `tutorials.xml` ✅
- 红线词（实测/亲测/我试/小编）0；价格数字 0 ✅
- 20 字滑窗跨页重复：全库 60 段，**涉及本批 8 条的为 0**（全部是历史遗留的
  `openclaw-deploy-2026-quick` ↔ `openclaw-deploy-aliyun-10min`、`openclaw-dingtalk-tutorial` ↔
  `openclaw-dingtalk-segmentfault` 两组）
- 本次未跑 `apply-tool-profiles --apply`（`tool_profiles.json` 与 `tools.json` 零改动）

## 五、方法论更新

29. **Cursor 文档已迁到 `cursor.com/docs/*`，加 `.md` 后缀即返回干净 Markdown**，
    `cursor.com/llms.txt` 可枚举全部路径；`docs.cursor.com` 与它的 `llms.txt` 都是 585 KB 的
    Next.js 空壳，JSON 里没有正文，旧域不要再取。
30. **纠正 b150 的「Midjourney 文档不可用」结论**：渲染读取服务必须带 `x-no-cache: true`，
    否则会命中上一次失败渲染的缓存（表现为返回 `<%= article.title %>` 这类 Zendesk 模板占位符）。
    带上之后 `docs.midjourney.com` 的 Prompt Basics（23 KB）与 Parameter List（25 KB）都能完整取回，
    这是教程余量里最大的一块（6 条 Midjourney 教程）。

## 六、待决策（不变）

1. 50 条待写池清理：合并 19 条重复项 + 下线约 30 条（其中 3 条为博彩外链，建议立即下线）。
2. 教程余量：56 条已写 15，剩余 41 条中官方可取证的多为 Midjourney（4 条）、Cursor 系列与
   OpenClaw 其它文档章节，其余为横评/心得类，缺官方支撑。
3. 提示词口径「1210 / 35 / 1175」应改为实况「1177 / 1127 / 50」。
