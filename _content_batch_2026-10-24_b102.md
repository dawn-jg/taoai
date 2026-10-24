# 第 102 批原创资料执行报告（2026-10-24 傍晚）

## 一、基线

| 指标 | 数值 | 说明 |
|---|---|---|
| 工具总数 | 1177 | — |
| 原创池 | 1125 | `editorials.json` 5 篇（deepseek / chatgpt / doubao / kimi-com / qwen）∪ `tool_profiles.json` 1121 条，重叠 1 |
| 四条件通过 | 1125 | 名称干净 / 正文 ≥600 字 / 含自身名；**池内四项失败 0** |
| `public/tools.xml` | 1125 | 与四条件通过数一致 ✅ |
| 待写（不在池） | 52 | 名单自第 92 批起 11 批未变 |
| 本批新增 | **0** | 连续第 32 批 0 产出 |

HEAD `5ac3a7a5`（b101），工作区干净。

## 二、本批流程（约 8 分钟）

1. 独立复算脚本 `.tmp_check102.mjs`：以 `detailed_content[].html` 为准剥标签去空白，复算四条件 =
   1125，池内失败 0，非池差集 52 —— 与 `content-queue` 的 total 1177 / done 1125 / pending 52 完全吻合。
2. `node scripts/content-queue.mjs --top 24 --json` 核对队列：52 条名单与 b92–b101 逐条一致（`ai-bot` 起、`tool67595` 止）。
3. `.tmp_probe102.mjs` 直连 6 并发探测 52 条（10s 超时）：
   **200:21 / ERR:27 / 404:2 / 403:1 / 短链:1**，与 b98–b101 四次结果逐条相同，无任何状态翻转。
4. 错误码分布：`AbortError` 10、`ENOTFOUND` 6、`CERT_HAS_EXPIRED` 3、`EAI_AGAIN` 2，
   其余 `ECONNREFUSED` / `ENOENT` / `ECONNRESET` / `UNABLE_TO_GET_ISSUER_CERT_LOCALLY` /
   `ERR_TLS_CERT_ALTNAME_INVALID` / `DEPTH_ZERO_SELF_SIGNED_CERT` 各 1（合计 27）。
5. 对 3 条「200 但需核实主题」的条目落地核对正文。**按 b101 结论，本批不再投渲染读取与官方子页**
   —— 四类通道（直连 / 代理 curl / 渲染 / 子页+sitemap）已在 b70–b101 累计数百 URL 上验证完毕，边际产出为 0。

## 三、本批新增证据（3 条，均改变判定或补强证据）

| # | slug | 库内名称 | 落地事实 | 结论 |
|---|---|---|---|---|
| 1 | `tool58825` | AI人才发现与分析平台，精准识别AI精英 | 直连 200 / 367KB，跳转终点 **`clepto.io`**，正文 6368 字符为越南语博彩站（「Kèo Nhà Cái 5」「Soi Kèo」），`dinq` 出现 0 次 | **域名易主 + 博彩（D 桶）**，此前仅记为「200 无标题」 |
| 2 | `tool6840` | 360智绘 | 302 → `bangong.360.cn/ai-tools/member-benefits.html?src=360_imagevip`，正文仅 107 字符「无痕模式」提示壳，`360智绘` 出现 0 次，`<title>` 已是「360AI办公」 | **空壳 + 产品改名（A 桶）**，非「素材不足」可补写项 |
| 3 | `duiyou-ai` | 堆友AI | `designkit.cn` 直连 200 / 82KB，标题与正文主体为**「美图设计室」**（AI PPT / AI海报 / AI商品图），`堆友` 出现 0 次 | **同域名易主为姊妹产品（D 桶）**，须修正 url 或合并，不能按「堆友AI」撰写 |

其余 49 条判定与 b100 清理表、b101 新增条目一致，无变化。

## 四、52 条分桶（按首个决定性因素）

| 桶 | 条数 | 代表条目 |
|---|---|---|
| A 不可达 / 证书 / 空壳 | 26 | `tool150`(AbortError)、`6pen-art`(CERT_HAS_EXPIRED)、`tool66554`(0 字节)、`tool67418`(921 字节停运公告)、`tool11395`(682 字节)、`tool1079`(177 字节«阿里云登录»)、**`tool6840`(107 字符壳)** |
| B 404 / 403 / 500 / 短链失效 | 5 | `tool71074`(Project not found)、`tool479`(404)、`seelesai-go-link`(短链过期)、`phind-com`(403 CF) |
| C 停运 / 清算 / 告别页 | 3 | `tool3006`(官网写明已清算)、`tool14278`(MidReal sunset 信)、`tool216`(Zyro 并入 Hostinger 的促销博文) |
| D 易主 / 主题不符 / 博彩 | 12 | **`tool58825`(博彩)**、**`duiyou-ai`(美图设计室)**、`hotshot-co`(科技博客)、`tool14961`(DegenCity 赌场)、`moyin-com`(魔音工坊≠魔撰写作)、`tool701`(Poly→云文件浏览器)、`tool111`(Codeium→Devin Desktop) |
| E 名称不合规 | 6 | `ai-bot`(通用名)、`tool67595`(恰 30 字关键词堆砌)、`tool67455`/`tool67371`/`telehire-ai`/`tool58825` 类描述性名称 |
| 合并（同站重复） | 3 | `tool67455`→`tool36409` 稿易、`tool1338`→`qwen` 千问、`tool923`→`lumalabs-ai` |

说明：`tool58825` 同时命中 D 与 E，按首个决定性因素计入 D。

## 五、自检

- 四条件通过 1125 == `public/tools.xml` 1125 == 原创池 1125 ✅
- 池内四项失败 0；`apply-tool-profiles.mjs` 试算：合并 1121 条、未匹配 slug 0
- **未跑** `--apply` 与 `generate-sitemap.mjs`（本批无内容可合并，跑只会刷新 lastmod 制造无意义 diff）
- 本批 data/*.json 与 public/*.xml 零改动，仅新增本报告

## 六、结论与建议（第 32 次同样结论）

工具页索引面上限 = **1125**，按「工具页原创资料续写」这一目标重跑，产能恒为 0：
b77–b102 共 26 轮、四类通道累积数百 URL，仅 b77 命中 1 条可写素材。剩余 52 条已 4 次复核，
100% 取证到「域名 / 产品 / 名称」三级，且本批 3 条新证据全部指向「不可写」（博彩、空壳、易主）。

真实增量只有两条，均需任务口径变更授权：

1. **52 条死链清理**（纯数据，工具数 1177→约 1130，索引面不变但对 AdSense 人工复核有利）：
   下线约 43 条、合并 3 条、`duiyou-ai` 等 3 条须改 url 或改名后重议。
2. **教程页 56 条补正文（+56，1125→1181，唯一放量面）**：现正文 145/229/316（min/avg/max），
   ≥600 字者 0 条，`public/tutorials.xml` 尚未生成；其中 8 条标题含「实测/亲测」须先改口径。

若下批目标仍不变，建议只跑「队列确认 + 自检 + 0 报告」，跳过全部抓取。
