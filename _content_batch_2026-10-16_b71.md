# 第 71 批原创工具资料（2026-10-16 傍晚）

## 结果概览

| 指标 | 数值 |
|---|---|
| 本次新增 | **2 条** |
| 因素材缺失/重复跳过 | 53 条（见下） |
| 累计可索引（四条件通过） | 1122 → **1124** |
| `public/tools.xml` 收录 | **1124**（四条件复算一致 ✅） |
| 剩余待写 | **53** |

本次写入条目：

| slug | 名称 | 正文字数 | 来源类型 |
|---|---|---|---|
| `instreet-coze-site` | InStreet | 1350 | 产品官网 + 公开媒体报道（36氪/智东西） |
| `leewow` | Leewow | 1276 | 产品官网历史存档（站点现不可达） |

两条均通过：4 节齐备、逐节含自身名、去标签去空白字数 ≥700、去标签 14-gram 跨页查重 0 命中。

## 本轮渠道实测（真实数字）

1. **存活预检**：55 条待写全部跑一遍（浏览器 UA + 代理），`200` 共 29 / `000` 21 / `404` 4 / `403` 1；
   29 个「200」里绝大多数是别家产品页、停服公告、维护页或纯壳（详见判废清单）。
2. **首页抓取**：29 个 200 站点正文长度中位数十几个字符（`instreet.coze.site` 83、`ask.xiaoyuzhoufm.com` 29、
   `tool150` 23、`moyin-com` 24、`tool8681` 554 …），能写正文的只有 `tool67595`（2000 字）一处，
   而 `tool67595` 经域名比对与既有 `tool14679`（66paper.cn）同站 → DROP。
3. **官方存档通道（本轮主力，但被限流）**：`web.archive.org` 的 CDX 接口正常，`/web/` 回放被
   「suspected abusive bot traffic」拦截（返回 620 字节拦截页，仅 5 处成功）。
   `r.jina.ai` 访问 `web.archive.org` 被 `AbuseAlleviationError` 拒绝（直至 19:16 GMT+8），
   解禁后重试仍整批拒绝。第三方中继（codetabs / allorigins 522、corsproxy 401）全部不可用。
   → 存档通道本轮只捞到 `leewow` 一条。
4. **公开媒体检索**：36氪/量子位/机器之心/钛媒体范围内检索 Seele、InStreet、光子AI、小宇宙 AI 搜索、
   字节 Feely、七火山 Etna、Leewow 等，命中 2 条（InStreet、Leewow 旁证）；
   `seelesai-go-link`（SEELE AI）虽素材极丰富（官网 /about 1.8 万字），但经域名比对与既有 `tool14989`
   （SeeleAgent，seeles.ai）同产品 → DROP。
5. **官方发布会通稿**：`etna.7volcanoes.com` 已死，`7volcanoes.com` 不可达；
   投资方超讯通信官网（sts.cn）新闻页确认「七火山于会上发布 Etna 文生视频模型」，
   但创新点以图片形式呈现，可用于正文的事实不足 700 字 → 跳过（不据空素材凑数）。

## 跳过清单（53 条，按原因分类）

- **同站/同产品重复（10）**：`seelesai-go-link`（→ tool14989 seeles.ai）、`tool67595`（→ tool14679 66paper.cn）、
  `duiyou-ai`（→ designkit-cn）、`moyin-com`（→ tool1924）、`tool67455`（→ tool36409）、`tool923`（→ lumalabs-ai）、
  `tool216`（→ tool302）、`tool150`（→ Stitch）、`tool111`（→ Devin）、`tool11395`（→ tool139 Flowith）。
  ⚠️ 其中 `seelesai-go-link`、`tool67595` 素材质量很高，是**域名比对**拦下的，再次说明第 0.5 步不可省。
- **域名不可达且官网存档无可用正文（28）**：voxcraft-ai、yanqueai-com、telehire-ai、6pen-art、
  miantuan-knowfuture-com-cn、pagentia-com、photonaiclub-com、photonaiclub-com-2、humva-ai、writingpal-ai、
  xanswer-com、etna-7volcanoes-com、tool6840、tool2676、tool1957、tool1890、tool701、tool479、tool1079、
  tool11840、tool1338、tool67775、tool66554、tool71074、tool13251、tool67371、tool33149、tool7424
  （另 phind-com、tool14278、tool67418、tool3006 见下）。
- **产品下线/停服/清算（4）**：`tool3006` LogoliveryAI（官网公告公司已清算）、`tool67418` GetDraft（关停）、
  `tool14278` MidReal（首页告别信，转向 Macaron）、`tool67775` lab4ai（关停公告）。
- **页面主体已变更、与 DB 名称不符（9）**：`hotshot-co`（现为科技博客）、`miaohui-jixueai-com`（创大产控）、
  `tool6840`（aigc.360.com 现为 360AI 办公）、`tool1079`（阿里云统一登录）、`tool701`（withpoly 已改形态）、
  `tool148`（magician.design 现为冰淇淋店）、`tool14961`（fryderyk.ai 现为博彩页）、`tool58825`（dinq.io 现为越南博彩页）、
  `tool1333`（aiapp.cc 403，已非原产品）。
- **名称本身不可自然复现（1）**：`ai-bot`（「AI工具集」通用名，会让「含正文自身名」校验失去意义）。
- **官方页面只有导航/落地组件，事实不足以写 700 字（1）**：`ask-xiaoyuzhoufm-com`
  （`ask.xiaoyuzhoufm.com` 渲染后仅是「听播客，上小宇宙」落地页与页脚链接链，未描述其 AI 检索服务）。

## 下一批提示（剩余 53 条）

1. 剩余条目基本属于「域名已死 + 官网无存档正文」与「产品主体已变更」两类，**可写余量已接近 0**；
   建议下一批直接对 53 条跑「域名存活预检 + CDX 查大快照」，若无 ≥5000 字节的非静态资源快照就跳过，
   不要投入渲染服务。
2. **存档回放限流是硬约束**：`web.archive.org` 的 `/web/` 路径按 IP 限流，且本次跨小时仍未解除；
   CDX 接口不受影响。若需长期依赖存档，建议每批只取少量快照并间隔 ≥10 秒，或改用其它可用存档源。
3. `instreet-coze-site` 站点当前为「闭店装修」，已在正文中如实注明，**建议下次复查时确认社区是否恢复**，
   若长期停运应改为 noindex 处理。
4. 数据质量修正建议（本轮未做，避免与写作混在一起）：`ai-bot`（通用名）、`tool1079`（名称「阿里云登录」与 M6 模型不符）、
   `flow-studio`（name/url/category/描述与官网形态五处不符，且内容邻近成人向社区）建议单独做一次清理提交。
