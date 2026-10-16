# 第72批原创资料 · 素材筛查报告（0 条产出）

- 日期：2026-10-17
- 基线：工具 1177 条 / 原创池（可索引）1124 / 待写 53（HEAD `1cdd7772`）
- 本批产出：**0 条**
- 自检：原创池 1124 == 四条件通过 1124 == `public/tools.xml` 1124（池内未通过 0、孤儿 0）

## 一、结论

待写池 53 条已进入「不可写尾部」。其中 34 条因**名称不干净**（1 条通用名 + 33 条描述性名称）按 SOP §7.10 人工排除；
剩余 19 条干净名候选，经「域名比对 → 直连 → 代理 curl → 渲染读取 → 备用官方域名」全部通道实测后，
**无一条能拿到足够撰写 ≥700 字且不虚构的官方素材**。本批不产出内容，也未用空素材凑数。

## 二、19 条干净名候选的失效明细

### 产品下线 / 公司清算（5）
| slug | 证据 |
|---|---|
| `6pen-art` | 官网改为告别页「6pen - 致谢与新篇章」，引导用户迁移至 6pen Pro |
| `tool67418` | GetDraft 官网顶栏 "Shutdown notice"，正文 "GetDraft has ceased operations" |
| `tool14278` | MidReal 官网公开信 "we've made the difficult decision to sunset MidReal"，转向 Macaron |
| `tool3006` | LogoliveryAI 官网 "Logolivery, Inc. has been officially liquidated" |
| `tool1890` | Neeva 域名不可达，服务已关停 |

### 页面易主 / 名称与页面不符（5）
| slug | 证据 |
|---|---|
| `miaohui-jixueai-com` | 域名现指向「创大产控 \| 科研经纪产业领军企业」，非「秒绘AI」 |
| `hotshot-co` | 页面为数码导购博客 "Hotshot \| AI Tools, Gadgets, Smart Home & How-To Guides" |
| `tool6840` | aigc.360.com 任意路径均返回同一 SPA 壳，标题为「360AI办公」，无「智绘」字样 |
| `tool1333` | aiapp.cc 域名被博彩站占用 |
| （旁证） | 备用域名 `writingpal.com` 实为 2000 年成立的 Writing.Com，非 WritingPal |

### 域名不可达 / 失效（9）
`voxcraft-ai`（504，证书过期）、`tool2676`（175.fun DNS ENOTFOUND）、`tool7424`（130ai.com 拒绝连接）、
`tool1957`（ailogo.qq.com 超时）、`humva-ai`、`writingpal-ai`、`etna-7volcanoes-com`（域名不可解析）、
`miantuan-knowfuture-com-cn`、`photonaiclub-com` / `photonaiclub-com-2`

### 同站同产品重复（已在更早批次写过，本轮不重复）
`duiyou-ai`(designkit.cn)、`moyin-com`、`tool67595`(66paper.cn)、`tool11395`(paluai.com)、
`tool67455`(gaoyiai.com)、`tool923`(lumalabs.ai)、`tool216`(zyro.com)、`tool111`(codeium.com)、
`seelesai-go-link`(seeles.ai)

## 三、通道实测（供后续批次直接引用）

1. Node 直连：17 条候选仅 4 条成功（其余为 SPA 或不可达）。
2. 代理 + curl：`export HTTPS_PROXY=http://127.0.0.1:7897`，必须 `-H "Accept-Encoding: identity"`
   （Git Bash curl 8.0.1 不支持 `--compressed`）；死站大量 rc=28 超时、证书过期站 rc=35。
3. 渲染读取 `https://r.jina.ai/<url>`：不带浏览器 UA、串行 + 4s 间隔时 —— 死站返回 422
   `TimeoutError` / `ERR_CONNECTION_REFUSED`；`phind.com` 返回 Cloudflare「Just a moment...」；
   `ailogo.qq.com` 返回 403 `Domain resolved to non-public IP`。
4. **`web.archive.org` 本会话完全不可用**：CDX 与 `/web/` 回放均 `code=000` 超时（对照组 example.com 同样失败）。
5. 备用官方域名核验：搜索引擎快照里的域名正文可能是旧缓存，**须逐条核对现存活页面主题**——
   `humva.com` 实为域名停放页（`window.location.href="/lander"`），不可采信。

## 四、下批建议

继续按原任务重跑「原创资料续写」，产能将恒为 0；建议改为数据质量清理后再恢复写作：

1. 通用名：`ai-bot`（AI工具集）。
2. 名称与 url 不符：`tool1079`（名称「阿里云登录」指向 m6.aliyun.com）、`jianying`（url 指向即梦）。
3. 页面易主需换 url 或下线：`hotshot-co`、`miaohui-jixueai-com`、`tool1333`(aiapp.cc)、`tool6840`(aigc.360.com)。
4. 描述性名称建议补真实产品名（如 telehire-ai→Telehire、pagentia-com→Pagentia、xanswer-com→XAnswer）后再撰写正文。
