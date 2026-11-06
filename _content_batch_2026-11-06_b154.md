# 第 154 批内容生产记录（2026-11-06 晚）

## 一、基线

| 项目 | 数值 |
|---|---|
| 工具总数 | 1177 |
| 原创池（profiles 1127 ∪ editorials 5，重叠 5，实际 1127） | 1127 |
| 四条件通过 / tools.xml | 1127 / 1127（一致） |
| 待写（不在原创池） | 50 |
| 教程 ≥600 字 / tutorials.xml | 34 / 34 → 49 / 49 |
| 起始 HEAD | `40658446`（干净，HEAD == origin/main） |

`node scripts/content-queue.mjs --top 24 --save` 输出与上批完全一致（第 58 次零 diff），
`data/content_queue.json` 生成时间仍为 2026-11-06，本批 24 条与前批同一批。

## 二、工具页：本批增量 0（不做全量重探）

b153 已对同一批 50 条做过一次性全量探测与逐条定性（8 并发 / 15s 超时，
证书与超时类补跑代理 curl + `-k --tls-max 1.2`，403 补跑渲染读取），结论是
「没有一条能在不虚构前提下写出 ≥700 字」。本批只对「名称干净且产品可能仍存活」的
少数候选做了定向复探，避免重复消耗在已确认消失的域名上：

| slug | 名称 | 复探动作 | 结果 |
|---|---|---|---|
| `tool1957` | AIDesign | `ailogo.qq.com`、`aidesign.qq.com` 直连 | 均 000，无法取得正文 |
| `phind-com` | Phind | `www.phind.com` 直连 | 403（Cloudflare），与 b153 渲染读取结论一致 |
| `voxcraft-ai` / `writingpal-ai` / `miantuan-…` | — | 沿用 b153 代理 curl 结果 | 504 / 超时 / 超时，无正文 |

结论：工具页增量连续第 78 轮为 0（b77–b154），**待写池 50 条不是「还没写」而是「写不了」**，
其中 `tool1333`（落地 qy球友会）、`tool14961`（落地 DegenCity 赌场）为博彩外链，建议无条件下线。

## 三、本批实际产出：教程页 15 条（34 → 49）

工具页路径闭合后，产能继续投到「官方文档可取证」的教程页。素材全部取自
`docs.openclaw.ai/<path>.md`（直接返回干净 Markdown），本批开采的是此前未覆盖的
访问控制、加密、运维命令与发布规范四个面。

| slug | 标题 | 正文字数 | 官方来源 |
|---|---|---|---|
| openclaw-telegram-access-control | OpenClaw 接 Telegram：私聊策略、群白名单与 @ 提及门控 | 2371 | `/channels/telegram/access-control` |
| openclaw-access-groups | OpenClaw accessGroups：跨渠道复用同一份发件人白名单 | 2094 | `/channels/access-groups` |
| openclaw-pairing-flow | OpenClaw 配对机制：私聊配对码与设备节点配对怎么走 | 2134 | `/channels/pairing` |
| openclaw-discord-access-control | OpenClaw 接 Discord：私聊策略、服务器白名单与频道表变白名单的坑 | 2191 | `/channels/discord/access-control` |
| openclaw-slack-access-control | OpenClaw 接 Slack：频道白名单要用 ID 写，群私聊还有一层限制 | 1919 | `/channels/slack/access-control` |
| openclaw-matrix-encryption | OpenClaw 接 Matrix 加密房间：交叉签名、设备验证与密钥备份 | 2368 | `/channels/matrix/encryption` |
| openclaw-imessage-private-api | OpenClaw 的 iMessage 私有 API 模式：SIP、库校验与 helper 注入 | 1877 | `/channels/imessage/private-api` |
| openclaw-doctor-cli | openclaw doctor 怎么用：六种姿态、退出码与只读诊断的边界 | 1795 | `/cli/doctor/running` |
| openclaw-hooks-writing | 给 OpenClaw 写内部钩子：HOOK.md、handler 契约与事件字段 | 1794 | `/automation/hooks/writing-hooks` |
| openclaw-standing-orders | OpenClaw 常设指令：把「每周五出报表」写成可执行的授权边界 | 1616 | `/automation/standing-orders` |
| openclaw-approvals-cli | openclaw approvals：在命令行处理执行审批与常设授权 | 1835 | `/cli/approvals` |
| openclaw-browser-cli | openclaw browser 命令详解：配置文件、生命周期与排错顺序 | 1849 | `/cli/browser` |
| clawhub-publishing | 在 ClawHub 发布技能：分类、话题与待审发布的工作方式 | 1629 | `/clawhub/publishing` |
| openclaw-agents-cli | openclaw agents：多智能体的工作区、角色模板与绑定关系 | 1495 | `/cli/agents` |
| openclaw-backup-cli | openclaw backup：归档、SQLite 快照与 Git 历史三种备份路径 | 1592 | `/cli/backup` |

选题原则：每条都能在官方文档里查到具体取值、命令或默认行为（四档 dmPolicy、
配对码 8 位 1 小时过期、每账号 3 条待批、`requireMentionInBotThreads`、
`plugins.allow` 缺 browser 导致命令消失、allow-always 绑定工作目录、
ClawHub 最多 3 分类 5 话题等），不需要任何使用体验叙述。

`/cli/doctor` 本身已改成索引页（7 个子页），正文太薄，改抓 `/cli/doctor/running`
（36 KB，含姿态表与退出码规则），`sources` 如实填该 URL。

## 四、自检

- 四条件通过 1127 == `tools.xml` 1127；教程 ≥600 字 49 == `tutorials.xml` 49；
  `sitemap-index.xml` 含 `tutorials.xml`。
- 15 条正文 1495–2371 字，全部远离 600 门槛。
- 20 字滑窗查重（语料 74 篇旧教程 / 51,703 个窗口，**构造语料时排除全部 15 条待检条目**）：
  命中 91 个窗口，除 2 个外全部是命令名（`openclaw channels status --probe`、
  `openclaw hooks disable`）；仅有的 2 个中文窗口来自 matrix 加密篇的一句推断性表述，
  已改写为「一旦最后一次保存失败或者进程非正常结束，OpenClaw 就会拒绝由另一个加密所有者接手」，
  复检后 CJK 整句重复为 0。
- 红线词（实测 / 亲测 / 笔者 / 我们测试 / 亲身体验）：0；价格数字：0；15 条 `url` 全部为
  `https://docs.openclaw.ai/` 域名下的实际抓取页。

## 五、口径

可索引页面 1127（工具）+ 49（教程）+ 15（快讯）= 1191；工具页覆盖 1127/1177 = 95.8%。

再次确认提示词里的「1210 / 35 / 1175」应改为实况「1177 / 1127 / 50」。若后续仍按
「工具页 15–20 条」派活，产出会继续是 0；可写素材只能从官方文档侧开采。
