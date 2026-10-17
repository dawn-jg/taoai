# 第 74 批原创资料续写 · 实测报告（2026-10-17）

## 一、结论先行

| 指标 | 数值 |
|---|---|
| 工具总数 | 1177 |
| 待写（缺原创资料） | 53 |
| 本批新增 | **0 条** |
| 因素材缺失/站点失效跳过 | 53 条（全部） |
| 累计可索引 | 1124（未变） |
| 剩余待写 | 53（未变） |

本批**没有向 `data/tool_profiles.json` / `data/tools.json` 写入任何内容**，因此未执行
`apply-tool-profiles --apply` 与 `generate-sitemap`（无内容可合并、sitemap 无变化）。
未达标不是产能问题，而是**待写池已经整体失效**：53 条里没有一条能拿到「与 DB 名称相符」的官网素材。

这是连续第五批产出 0（b70=3、b71=2、b72=0、b73=0、b74=0）。

## 二、本批做了什么（比前几批更彻底的一次全量核验）

前几批是「先筛名称 → 再抓素材」，本批改成**先跑全量存活探测，再判主题**，目的是彻底排除
「某一批只是运气不好、某些站今天刚好可访问」的可能：

1. `node scripts/content-queue.mjs --top 24 --save` → `data/content_queue.json`（pending 53）。
   另用 `--top 60 --json` 导出全部 53 条到 `.tmp_queue_all.json` 做全量核验（不覆盖队列文件）。
2. **53 条 URL 全部跑 curl 存活探测**（代理 `127.0.0.1:7897`、browser UA、`Accept-Encoding: identity`、
   `-m 20`、6 路并发），记录 HTTP 码 / 字节数 / `<title>`。
3. 对 21 条 `000`（超时/拒连）的条目**再做一轮直连复探**（不走代理、`-m 25`、5 路并发），
   避免「代理通道问题」被误判成「站点已死」。
4. 对返回 200 的条目逐条做**名称—页面主题核对**（用 `<title>` 与页面正文，不只看能否打开）。
5. 独立脚本复算索引面四条件（不复用 `lib/tools.ts`，避免自我确认）。

### 探测结果（53 条全覆盖）

- **20 条域名完全不可达**（代理与直连两轮均 `000`/0 字节）：
  `voxcraft-ai`、`telehire-ai`、`6pen-art`、`miantuan-knowfuture-com-cn`、`pagentia-com`、
  `photonaiclub-com`、`photonaiclub-com-2`、`humva-ai`、`writingpal-ai`、`xanswer-com`、
  `etna-7volcanoes-com`、`tool2676`、`tool1957`、`tool9412`、`tool11840`、`tool67775`、
  `tool13251`、`tool67371`、`tool33149`、`tool7424`。
- **33 条可访问但与 DB 条目不符 / 已停服**，其中 `<title>` 直接暴露的典型：
  `tool58825` → `KeoNhaCai - Tỷ Lệ Kèo Nhà Cái`（越南博彩）、
  `tool14961` → `DegenCity Casino New Zealand`、
  `tool148` → `The Ice Cream Boutique`、
  `miaohui-jixueai-com` → `创大产控 | 科研经纪产业领军企业`、
  `hotshot-co` → `Hotshot | AI Tools, Gadgets, Smart Home`（数码导购站）、
  `tool111` → `Devin Desktop`、`tool216` → `Zyro Website Builder Joins Forces With Hostinger`、
  `tool923` → `Luma | AI Agents for Creative Work`、
  `moyin-com` → `魔音工坊`（DB 名为「魔撰写作」）、
  `tool6840` → `360AI办公`（DB 名为「360智绘」）、
  `duiyou-ai` → `美图设计室`（designkit.cn，且与既有 `designkit-cn` 同站）、
  `yanqueai-com` 404、`tool71074` 404 `Build incomplete`、`tool479` 404、
  `phind-com` 403 / `r.jina.ai` 回 Cloudflare「Just a moment...」、
  `tool1079` 201 字节壳、`tool701` 87 字节、`tool1338` 633 字节、`tool11395` 698 字节、
  `tool66554` 0 字节、`tool1333` 403、`tool1890` 仅 `Redirecting...`、
  `tool67418` 921 字节（GetDraft 停运）、`tool3006` 2490 字节（LogoliveryAI 已清算）、
  `tool14278` 983 字（正文为「A Letter to Our MidReal Community」，明确 sunset 并转向 Macaron）。
- **未进入写作环节的两个结构性原因**（与素材无关，属数据侧）：
  - 名称不干净 / 描述性名称，正文无法自然出现整句名称：`ai-bot`（通用名「AI工具集」）、
    `seelesai-go-link`、`tool8681`、`tool67455`、`ask-xiaoyuzhoufm-com`、
    `tool67595`（34 字，超 30 字上限）。

## 三、索引面自检（独立复算，通过）

```
tools total   : 1177
original pool : 1124
pool in tools : 1124
four-cond pass: 1124
tools.xml locs: 1124
pool但未通过   : 0
孤儿(通过但不在池): 0
通过但缺 sitemap: 0
```

即「原创池 1124 == 四条件通过 1124 == `tools.xml` 1124」✅，三方一致，无双份实现漂移。

## 四、为什么不能再写（判断依据，供后续直接引用）

1. 待写池的 53 条**不是「没写」，而是「写不了」**：缺的不是文案能力，而是「与 DB 名称一致、
   且内容可核的官网页面」。
2. 本批已排除「代理抖动」这一解释：直连复探后 20 条依旧全灭，唯一复活的一条（`duiyou-ai`）
   打开是「美图设计室」，与 DB 名「堆友AI」不符。
3. 因此继续在工具页上投入，**期望产出恒为 0**；再跑一批只会重复第五次同样结论。

## 五、建议的下一步（按性价比排序）

1. **把本自动化改成「数据质量清理」**，先清掉这 53 条里的死数据，索引面才可能再增长：
   - 页面易主/被占用，应下线或改 url：`tool58825`、`tool14961`、`tool148`、
     `miaohui-jixueai-com`、`hotshot-co`、`tool1333`、`tool14961`、`tool111`、`tool216`、`tool923`。
   - 域名已失效（20 条，见上）应标记 `dead` 并不再从队列推荐。
   - 名称与站点不一致需改名或改 url：`moyin-com`（魔撰写作 vs 魔音工坊）、`tool6840`（360智绘 vs 360AI办公）、
     `tool1079`（阿里云登录 vs m6.aliyun.com）、`tool150`（→Stitch，与既有条目重复）。
   - 已知数据错误：`jianying` 的 url 指向即梦，修正前不要据此写内容。
2. **或改做「教程页原创内容」**：`generate-sitemap.mjs` 当前输出 `tutorials.xml: 收录 0/56`，
   即 56 个教程页全部因正文 < 600 字被 noindex。这是一块**完全空着的索引面**，比继续啃死池更值。
3. 若仍按原任务重跑：**不要再逐条抓取**，直接跑「域名存活探测 + 名称—主题核对」两连后如实上报 0 条。

## 六、本批的工程增量（可复用）

- 把「存活探测」做成可重复的两轮（代理 + 直连）+ 标题抓取，单批 53 条约 2 分钟可跑完，
  比逐条 `fetch-sources` 快一个数量级；**先探测后抓取**，避免在死站上浪费抓取配额。
- `.tmp_probe.tsv` 的 `slug / http_code / bytes / title` 四列就是「是否值得进入写作」的判据：
  `000` 或 `bytes < 600` 直接淘汰，`title` 与 DB 名不符直接淘汰。

---

**本批未产生任何原创资料条目，未用空素材凑数。** 依据：《原创内容 SOP》三条红线
（不采集 / 不套模板 / 不虚构）与本节第 3 步「抓不到有效素材一律跳过，禁止据空素材编造」。
