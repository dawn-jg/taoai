# 第 79 批原创资料续写 · 实测报告（2026-10-18 晚）

## 一、结论

| 项 | 数值 |
|---|---|
| 本次新增原创资料 | **0 条** |
| 因素材缺失 / 页面失效跳过 | **52 条**（＝全部待写条目） |
| 累计可索引工具页 | **1125 条**（未变） |
| 剩余待写 | **52 条** |
| 推送 | 见文末（仅批次报告，无内容变更） |

待写池已连续 9 批（b71 之后 8 批 + 本批）无法产出。本批做的是**穷尽式证据复核**，结论与 b72–b78 一致，且新增了 4 条此前未记录的失效证据（见第四节）。

## 二、基线（HEAD `d966a7a8`）

- 工具条目：**1177** 条（任务书写的「约 1210 条」已过期，勿按此口径估算产能）
- 原创池（`editorials.json` ∪ `tool_profiles.json.items`）：**1125**
- `public/tools.xml`：**1125** 条 —— 三者在 b76 之后保持不变
- `node scripts/content-queue.mjs --top 60 --save` → `done 1125 / pending 52`

## 三、本批方法（一次性全量存活探测，约 90 秒）

代理 `127.0.0.1:7897`（健康：`example.com` 200/0.38s）＋浏览器 UA ＋ `Accept-Encoding: identity`（Git Bash curl 8.0.1 不支持 `--compressed`），
6 路并发、每 URL 独立临时文件（避免 `<title>` 串行错位），取 `http_code / bytes / title`。
随后对全部 `000` 条目做**直连复探**，对 `200 但 0 字节` 条目做 `r.jina.ai` 渲染复核。

## 四、52 条终判分布

| 类别 | 条数 | 说明 |
|---|---|---|
| 域名完全不可达（代理＋直连双 `000`） | 20 | 见下「死站清单」 |
| 403 / Cloudflare 挑战 | 2 | `flow-studio`(flowgpt.com/flow-studio)、`tool1333`(aiapp.cc 已被博彩站占用) |
| 官方 404（站点仍在，页面已撤） | 4 | 见下「新增证据」 |
| 200 但正文为 0 字节空壳 | 8 | 纯前端站/已停运，无可引用正文 |
| 200 有正文但主题不符 / 同站重复 / 通用名 | 18 | 见下「判废清单」 |

### 死站清单（20）
`6pen-art`、`etna-7volcanoes-com`、`humva-ai`、`miantuan-knowfuture-com-cn`、`pagentia-com`、
`photonaiclub-com`、`photonaiclub-com-2`、`telehire-ai`、`tool11840`(explorer.globe.engineer)、
`tool13251`(chatwiz.cn)、`tool1957`(ailogo.qq.com)、`tool2676`(175.fun)、`tool33149`(ibihun.com)、
`tool67371`(aimianshibang.com)、`tool67775`(lab4ai.cn)、`tool7424`(130ai.com)、`tool9412`(maopaoya.com)、
`voxcraft-ai`、`writingpal-ai`、`xanswer-com`

> 注：本机 DNS 处于 fake-ip 模式（全部解析到 `198.18.0.x`），`dns.resolve4` 恒「成功」，**不能用来判死**。
> 判死依据只用「代理 curl 000 ＋ 直连 000 ＋ r.jina.ai 422/空响应」三者一致。

### 200 空壳（8）
`moyin-com`(x.moyin.com 实为「魔音工坊」，与 DB 名「魔撰写作」不符，且返回 14 字节)、
`tool66554`(造次/zaoci.tv：308→`www` 200 但 **body 0 字节**，`r.jina.ai` 返回 `42206 Unexpected empty file`)、
`tool1079`(m6.aliyun.com 215B 登录壳)、`tool11395`(flowith 联盟镜像)、`tool1338`(第三方 Qwen 镜像 `dis.chatdesks.cn`)、
`tool701`(withpoly.com 101B)、`tool67418`(GetDraft 停运空壳)、`tool3006`(Logolivery 清算公告页)

### 判废清单（主题不符 / 重复 / 通用名，18）
`ai-bot`(「AI工具集」通用名)、`hotshot-co`(数码导购站)、`miaohui-jixueai-com`(现为「创大产控」)、
`duiyou-ai`(designkit.cn＝美图设计室，与池内 `designkit-cn` 同站)、`seelesai-go-link`(同产品短链)、
`tool111`(codeium.com→Devin)、`tool216`(zyro.com→Hostinger)、`tool148`(magician.design→冰淇淋店)、
`tool14961`(fryderyk.ai→赌场站)、`tool150`(usegalileo.ai→Google Stitch)、`tool1890`(neeva.com→Redirecting)、
`tool58825`(dinq.io→越南博彩)、`tool6840`(aigc.360.com→360AI办公)、`tool923`(Luma 3D 采集线已下线、与 `lumalabs-ai` 同站)、
`tool14278`(MidReal sunset 告别信)、`tool67455`(稿易，与 `tool36409` 同站同产品)、
`tool67595`(66paper 名称 30 字且同站重复)、`ask-xiaoyuzhoufm-com`(只有导航、无产品说明)

## 五、本批新增的 4 条证据（此前批次未记录）

1. **`phind-com` 已确认关停**：`www.phind.com` 现返回 **404 `DEPLOYMENT_NOT_FOUND`（Vercel）**，不再是 b76 记录的 Cloudflare 挑战页；
   公开报道一致指向 2026-01-16 停止服务、2026-01-30 清空用户数据。→ 永久判废。
2. **`yanqueai-com` 返回 nginx 404**（`www.yanqueai.com` 569B），不是超时，属页面被撤。
3. **`tool479`（ai-code-reviewer.com）返回 404**，且名称为通用描述「AI代码检查」，双重不可用。
4. **`tool71074`（briefly.video）不再是「Build incomplete」占位页**（1284B 404），彻底无内容。

另：本批用 `r.jina.ai` 单独复核 `zaoci.tv`，拿到的是 `42206 Unexpected empty file`——**该站服务端对任何抓取方都返回空 body**，
说明它是「活着但不可读」，属引擎侧也无法解决的情况，不必再试。

## 六、自检（独立复算，镜像 `isToolIndexable`）

```
工具 1177 / 原创池 1125 / 四条件通过 1125 / tools.xml 1125
池内未通过：短正文 0、缺自身名 0、脏名 0
池内通过但缺 sitemap 0；sitemap 有但池内无 0
generate-sitemap: tools.xml 收录 1125/1177；tutorials.xml 收录 0/56；news.xml 14/14
```

`generate-sitemap` 仅改动 3 个 xml 的 `lastmod`，已 `git checkout --` 回退（沿用 b75 口径，不提交纯日期变动）。

## 七、建议（第 9 次提出，且已成为唯一能提升索引面的动作）

工具页续写在本自动化上**产能已恒为 0**：52 条里「在运营 ∧ 名称干净 ∧ 无同站重复 ∧ 有官方可引页」的交集为 **0**，
且 b77 唯一奏效的「改名换 url」手法在剩余条目上已逐一证伪（`6pen.art`→`6pen.pro` 已停服、`humva.ai` 域名停放、
`midreal.ai` 自述 sunset、`phind.com` 部署已被删除）。

建议按下列顺序切换任务（不改动现有索引面，只做减法与新增）：

1. **52 条数据清理**（约 1 次即可完成，收益＝消除 20 个死链页 + 5 组重复页 + 4 条脏名称／错 url，减少爬虫空转与「薄页」信号）
   - 下线：死站 20 条 + 停运 7 条（`6pen-art`、`tool67418`、`tool14278`、`tool3006`、`tool1890`、`tool150`、`tool923`）
   - 合并（同站同产品，需人工确认保留哪条）：`duiyou-ai`→`designkit-cn`、`seelesai-go-link`→`tool14989`、
     `tool11395`→`tool139`、`tool67455`→`tool36409`、`tool923`→`lumalabs-ai`
   - 修数据：`jianying` url 指向即梦、`tool1079` 名称「阿里云登录」、`ai-bot` 通用名
2. **教程页原创内容**（`tutorials.xml` **0/56**，是一整块空着的索引面；56 篇现有正文全部 <600 字，
   且 `content` 的外链多为 CSDN 等第三方，与 SOP §1「不采集」冲突，属结构性待整改项）。

> 若下一批仍按「工具页续写」原任务重跑，请预期 0 条：直接做「52 条存活探测 → 名称主题核对 → 自检 → 如实上报」即可，
> 不要再投入抓取与存档通道（`web.archive.org` 近四批均不可用）。
