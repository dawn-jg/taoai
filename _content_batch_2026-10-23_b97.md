# 第 97 批原创资料生产报告（2026-10-23）

## 一、结论

**本批新增 0 条**（连续第 27 批 0 产出：b70=3、b71=2、b72–b76=0、b77=1、b78–b97=0）。
工具页索引面维持 **1125 条封顶**，剩余 **52 条**待写池中，本批对两个「疑似复活」的条目做了全量核对，均被证伪，
52 条仍无一条满足「素材充足 + 名称合规 + 主题一致」三项前置条件。

## 二、基线（HEAD `93b59ba2`，工作区干净）

| 指标 | 数值 |
|---|---|
| 工具总数 | 1177 |
| 原创池 | 1125（editorials 5 ∪ profiles 1121） |
| 四条件通过数 | 1125 |
| `public/tools.xml` 条数 | 1125 |
| 待写（pending） | 52 |
| 自检 | **PASS**（1125 == 1125，池内脏名/短正文/缺自身名 均为 0） |

## 三、本批流水线（约 14 分钟）

1. `node scripts/content-queue.mjs --top 60 --json` → `.tmp_q97.json`：total 1177 / done 1125 / pending 52，
   名单与 b92–b96 **逐条一致**（52 条不变，无新增候选）。
2. `.tmp_probe97.mjs`：直连 fetch 全量 52 条（6 并发、14s 超时），同时对每个 host 做 **CNAME 解析**，
   一次拿到「连通性 + 上游真实状态」两类证据。
3. 对「200 且 >800 字节」的 17 条逐条核对 `<title>` 与正文主题，找出两个疑似复活项（MidReal、360智绘），
   落地全文核对。
4. 三重兜底复探（直连 → 代理 curl → 渲染读取 `r.jina.ai`）用于 `phind-com`、`tool1957`；
   代理健康以 `baidu=200` 校准。

## 四、分桶（互斥，合计 52）

| 桶 | 判定 | 条数 |
|---|---|---|
| A | 域名不可达 / 证书失效 / 空壳（0–900 字节或仅 title） | 33 |
| B | 404 / 403(Cloudflare) / 500 | 4 |
| C | 停运、清算、告别页 | 3 |
| D | 易主 / 主题不符 / 博彩站 | 6 |
| E | 名称不合规（通用名 / 描述性短语 / 抓取残留） | 6 |

## 五、本批新增确证（可直接用于数据清理）

1. **`tool14278` MidReal：标题恢复常规，但正文仍是停运告别页。** 首屏 `<title>` 已变回
   `MidReal - Free AI Story Generator`（b95 记为「标题恢复常规」），但 200 后 302 落
   `/a-letter-to-our-midreal-community`，正文 983 字符明确写「we've made the difficult decision to sunset
   MidReal」、「introduce you to Macaron」。**结论：标题不能作为存活证据，必须以落地全文为准，维持 C 桶（停运）。**
2. **`tool6840` 360智绘：已并入 360AI办公，且是空壳。** `aigc.360.com` 302 →
   `bangong.360.cn/ai-tools/member-benefits.html?src=360_imagevip`，正文仅 94 字符
   （「当前功能不支持在无痕模式下使用」「网络出故障了，请稍后重试」），无任何产品说明。DB 名「360智绘」虽合规，
   **素材侧为 0，不可写**。
3. **`phind-com`：三重兜底已尽，仍被 Cloudflare 拦截。** 直连 403、代理 curl 403（`baidu=200` 说明代理健康）、
   `r.jina.ai` 渲染仅回「Performing security verification / Verification successful. Waiting for www.phind.com
   to respond」挑战页。判 B 桶，**素材缺失，不写**。
4. **`tool1957` 腾讯 AIDesign（`ailogo.qq.com`）：域名侧已废。** 直连 `ENOENT`、代理 `000`，
   渲染服务直接报 `Domain resolved to non-public IP: 0.0.0.1`——该域名已解析到保留地址，产品页面不复存在。
5. **新增「TLS 证书失效」判死证据类型（3 条）**：`voxcraft-ai`（`CERT_HAS_EXPIRED`）、
   `6pen-art`（证书过期，CNAME 仍指 `6pen.art.cdn.dnsv1.com.cn`）、`miaohui-jixueai-com`（证书过期）；
   另有 `pagentia-com` `ERR_TLS_CERT_ALTNAME_INVALID`、`tool67775` `DEPTH_ZERO_SELF_SIGNED_CERT`、
   `tool1890` `UNABLE_TO_GET_ISSUER_CERT_LOCALLY`。**证书类错误与 CNAME 互证时，可作为下批首选判据（比抓正文快）。**
6. **`moyin-com` 名称与站点不符**：`x.moyin.com` 200 但 `<title>` 为「魔音工坊——短视频/有声书AI配音平台」，
   DB 名为「魔撰写作」。属 D 桶（主题不符），非素材问题，改名/下线需人工确认。
7. **`tool1338` / `tool11395` 为空壳**：分别 633 / 682 字节，仅剩登录壳与脚本，无产品文案（此前未记字节数的推测已坐实）。

## 六、口径与方法论沉淀

- **`<title>` 不代表存活**：MidReal 是本批反例（标题正常、正文为告别信）。凡 200 且有字节者，一律以落地全文主题判定。
- **CNAME + TLS 双判据可替代正文抓取**：52 条里 33 条的「不可达」本批均有可解释的机械原因
  （ENOTFOUND / 证书 / 超时 / 0.0.0.1 / `expired.hichina.com`），无需再逐条渲染。
- **`--from-dir` 的 url 陷阱仍在**（SOP 第 13 条），本批未产生新素材，未触及。

## 七、产能结论（第 27 次重复同一结论）

b77–b97 共 21 轮、数百 URL，命中 0。**工具页索引面上限 = 1125，按当前任务反复重跑，产能恒为 0。**
52 条已在五轮内 100% 取证到「域名 / 产品 / 名称」级，不存在「素材没抓全」的余地。

真实增量只剩两条路，均需任务方授权：

| 路径 | 可增量 | 前置条件 |
|---|---|---|
| ① 52 条死链数据清理 | 索引面不变，但清除 52 条 noindex 垃圾页与死链信号 | 需人工确认下线约 43 / 合并 4 / 改名 5（本报告第五节已给逐条依据） |
| ② 教程页原创正文补齐 | **+56**（唯一放量面） | `data/tutorials.json` 56 条，正文 min/avg/max = 145/229/316 字，**≥600 字者 0 条**，`public/tutorials.xml` 不存在；另 8 条标题含「实测/亲测」，扩写前须先改口径（「不虚构」红线） |

## 八、自检

- 原创池四条件通过 **1125** == `public/tools.xml` **1125** ✅
- 池内失败：脏名 0 / 短正文 0 / 缺自身名 0 ✅
- `apply-tool-profiles.mjs --apply`、`generate-sitemap.mjs` **均未运行**（无内容可合并，避免无谓刷 `lastmod`）
- `data/*.json` 与 `public/*.xml` 零改动；仅新增本报告
