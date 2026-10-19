# 第八十四批原创资料生产报告（2026-10-20）

## 一、基线（实测，非任务书口径）

| 指标 | 数值 |
|---|---|
| 工具总数 | 1177 |
| 原创池（editorials ∪ tool_profiles） | 1125 |
| 四条件通过（可索引） | 1125 |
| `public/tools.xml` 条数 | 1125 |
| 待写（不在原创池） | 52 |
| 完成度 | 95.6% |

> 任务书写「工具约 1210 条 / 可索引 35 条 / 待写约 1175 条」，与实际相差一个数量级。
> 该前提自第七十六批起已连续过期，且 `data/tools.json` 自 HEAD `f0b09810` 起无变动。

## 二、本批方法（三步，全部实跑）

1. **队列**：`content-queue.mjs --top 60 --json` → 52 条（队列只有 52 条，无第 53 条）。
2. **全量存活探测**：代理 `127.0.0.1:7897`（`example.com` 200/0.36s 健康）+ 浏览器 UA +
   `Accept-Encoding: identity` + `-m 25`，6 路并发、每条独立临时文件，约 2 分钟跑完 52 条。
3. **不可达复核**：对 19 条 `000`/空 body 走 `r.jina.ai` 渲染读取（串行 2 路、间隔 2.5s、**不带 UA**），
   全部返回 `422`/`504`/`42206 空文件`/`42203 域名无法解析`，无一复活。

## 三、52 条终判（本批实测，合计 52）

### A. 站点不可达／空壳（19 条）

| slug | 名称 | 证据 |
|---|---|---|
| voxcraft-ai | VoxCraft | 代理 000，jina「504 Gateway Time-out」 |
| telehire-ai | 最轻量级的全领域AI面试官 | jina `42203 Domain could not be resolved` |
| miaohui-jixueai-com | 秒绘AI | 代理 000，jina 超时 |
| miantuan-knowfuture-com-cn | 面团AI | jina `TimeoutError` |
| pagentia-com | AI专利查新检索与撰写平台 | jina 导航断言失败 |
| humva-ai | Humva | jina `TimeoutError` |
| writingpal-ai | WritingPal | jina `TimeoutError` |
| xanswer-com | 支持生成思维导图的免费AI搜索工具 | jina `42205 EAI_AGAIN` |
| photonaiclub-com-2 | 光子AI抠图 | 站内路径全站超时 |
| etna-7volcanoes-com | Etna | jina `42203` 无法解析 |
| tool2676 | 175FUN | jina `42203` 无法解析 |
| tool1957 | AIDesign | jina「Domain resolved to non-public IP」 |
| tool11840 | 结构化AI知识搜索引擎 | jina 页面错误 |
| tool67775 | 在线大模型训练微调及AI科研学习平台 | jina 页面错误 |
| tool66554 | 造次 | 200 但 body 0 字节，jina `42206 Unexpected empty file` |
| tool13251 | 字节跳动旗下推出的AI虚拟交友聊天平台 | jina `EAI_AGAIN` |
| tool67371 | AI面试助手\|AI笔试助手 | jina `42203` 无法解析 |
| tool33149 | AI设计工具，支持AI抠图、消除、无损放大 | jina `42203` 无法解析 |
| tool7424 | XPaper AI | jina 页面错误 |

### B. 官方 404／关站公告（7 条）

| slug | 名称 | 证据 |
|---|---|---|
| 6pen-art | 6pen Art | jina 返回「6pen - 致谢与新篇章」告别页 |
| phind-com | Phind | 官方 404（107 字节） |
| tool479 | AI代码检查 | 官方 404（0 字节） |
| tool71074 | 长视频精华提炼 | 404「Project not found」 |
| tool67418 | GetDraft | 921 字节，正文为停止运营说明 |
| tool3006 | LogoliveryAI | 正文＝「Logolivery, Inc. has been officially liquidated」 |
| tool14278 | MidReal | 标题正常，正文首屏是致社区告别信，导流 Macaron |

### C. 易主／主题不符／页面已非该产品（11 条）

| slug | 名称 | 实际情况 |
|---|---|---|
| hotshot-co | Hotshot | 消费科技博客，不是同名 AI 视频工具 |
| tool6840 | 360智绘 | 打开为「360AI办公」提示页，绘画产品线已撤 |
| tool1890 | Neeva | 仅「Redirecting...」 |
| tool701 | AI生成3D材质 | 87 字节空壳 |
| tool1079 | 阿里云登录 | 201 字节登录页 |
| tool150 | AI高保真原型设计 | usegalileo.ai 已跳转 Google「Stitch」 |
| tool58825 | AI人才发现与分析平台 | dinq.io 已变成越南博彩站 |
| tool148 | BW188 | magician.design 已变成冰淇淋店 |
| tool14961 | Redirecting... | fryderyk.ai 已变成赌场站 |
| tool111 | Reply Logo | codeium.com 已是「Devin Desktop」，名称与产品不符 |
| tool216 | Zyro AI Image Upscaler | 整站已并入 Hostinger，放大工具线撤除 |

### D. 同站／同产品重复（10 条，应合并或下线）

| slug | 名称 | 与库内哪条重复 |
|---|---|---|
| flow-studio | Flow Studio | flowgpt.com 全文已无「Flow Studio」，产品线并入主站 |
| duiyou-ai | 堆友AI | url 指向 designkit.cn（美图设计室），库内已有 6 条 d.design |
| seelesai-go-link | 全球首个端到端AI 3D游戏生成工具 | 与 tool14989（SeeleAgent）同站同产品 |
| moyin-com | 魔撰写作 | x.moyin.com 实为「魔音工坊」，即 tool1924 |
| tool1333 | 创作王 | 库内镜像条目 |
| tool11395 | 一站式用GPT-5.5、Claude-4.7 | 库内镜像条目（flowith.paluai.com） |
| tool9412 | 阶跃星辰推出的AI聊天机器人 | 与 tool9802（stepfun.com）同产品 |
| tool1338 | 全能AI助手，基于Qwen模型 | 第三方镜像，与 qwen 条目同产品 |
| tool67455 | 专注学术写作降AI率的工具 | 稿易，与 tool36409 同站同产品 |
| tool923 | AI 3D捕捉、建模和渲染 | lumalabs.ai 已转「AI Agents」，3D 采集线消失，且已有 lumalabs-ai |

### E. 名称不合规（4 条，命中「含自身名」校验会失效）

`ai-bot`（通用名「AI工具集」）、`yanqueai-com`（描述句且 404）、`photonaiclub-com`（描述句且全站超时）、
`tool67595`（关键词堆砌名，含连字符分隔的营销词组）。

### F. 有正文但无原创素材（1 条）

`ask-xiaoyuzhoufm-com`：ask.xiaoyuzhoufm.com 返回 200，但去标签后仅 23 字（「小宇宙 听播客，上小宇宙 主播后台 点击 下载 立即体验」），
是下载落地页，没有任何关于该 AI 搜索产品的官方说明，据空素材写 700 字必然虚构 → 跳过。

## 四、本批产出

- **新增原创资料：0 条**（连续第 14 批；b70=3、b71=2、b72–b76=0、b77=1、b78–b84=0）。
- 累计可索引 **1125 条**，剩余待写 **52 条**。
- `data/tool_profiles.json`、`data/tools.json`、`public/*.xml` **零改动**（无内容可合并，避免刷 `lastmod`），
  未执行 `apply --apply` 与 `generate-sitemap`。

## 五、自检

独立复算（镜像 `isToolIndexable`，正文取 `detailed_content[].html` 去标签去空白）：

```
工具总数 1177 | 原创池 1125 | 四条件通过 1125 | tools.xml 1125
池内未通过: short 0 / noname 0 / dirty 0
自检 PASS
```

> 注：`tools.json` 是根数组，正文在 `detailed_content[].html`（不是 `sections`）。本批先用错字段得到「1125 条全部短正文」的假告警，已修正。

## 六、结论与建议（第 14 次）

52 条失败原因中**没有一条**属于抓取技巧不足：19 条域名/站点不可达（含 8 条 DNS 已摘除）、7 条官方 404 或关站公告、
11 条易主或产品线消失、10 条同站同产品重复、4 条名称不合规、1 条仅落地页。
SOP §18 的三步兜底（直连 → 代理 curl → 渲染读取）本批全部走完，均无解。
**工具页索引面的现实上限就是 1125，本自动化按原任务重跑，产能恒为 0。**

真正还有空间的只有两处，都需要改任务方向：

1. **52 条数据清理**（不需素材、纯数据）：下线 37 条（A+B+C 中已明确失效者）+ 合并 10 条重复 + 修 4 条名称/url。
   好处是去掉 37 个死链/空壳页，减少 Google 抓取浪费与站点质量信号损耗。
2. **教程页原创内容**：`tutorials.xml` 至今不存在（0/56），是站内唯一还有 56 页空间、且完全空白的索引面。
   注意 56 篇 `content` 外链多为 CSDN 与 111cn，本身违反 SOP §1「不采集」。
