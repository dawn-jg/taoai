# 第73批原创资料 · 素材筛查报告（0 条产出）

- 日期：2026-10-17（上午）
- 基线：工具 1177 条 / 原创池（可索引）1124 / 待写 53（HEAD `d4d9f229`）
- 本批产出：**0 条**
- 自检：原创池 1124 == 四条件通过 1124 == `public/tools.xml` 1124（池内未通过 0、孤儿 0）

## 一、结论

待写池仍为同一批 53 条（第 70/71/72 批已反复判死）。本批**重新独立复跑三条通道**（浏览器 UA 直连 → 代理 `curl` → 渲染读取服务），
并补做「域内同站重复」程序化比对，结论与前几批一致：**没有一条能拿到足以撰写 ≥700 字且不虚构的官方素材**。
按 SOP §7.20「宁可少写也不用空素材凑数」，本批不产出内容。数据文件未变动。

> ⚠️ 这是**连续第四批**（b70=3 条、b71=2 条、b72=0 条、b73=0 条）产出≈0。待写池已实质性耗尽，
> 建议本自动化改任务方向（见第六节）。

## 二、本批实测证据（可复用的通道状态）

| 通道 | 配置 | 结果 |
|---|---|---|
| ① 直连（Node fetch） | 浏览器 UA + `Accept-Encoding: identity`，15s 超时，5 并发 | 53 条中 **19 条成功**，且多为壳页（0 字节正文）；其余 `fetch failed` |
| ② 代理 curl | `--proxy http://127.0.0.1:7897`、浏览器 UA、identity 编码、20s、3 并发 | 代理本身可用（`example.com` 200/0.37s），但死站大量 `rc=000`；新增可用正文 **0 条** |
| ③ 渲染读取 `r.jina.ai` | 无 UA、串行 + 3s 间隔、`X-Return-Format: markdown` | 12 条中 **3 条 200**（tool1338 / tool11395 / tool701），其余 422 `TimeoutError`；3 条经名称—主题核对**全部作废**（见第三节） |

代理与渲染本轮均**不再是瓶颈**——瓶颈是「候选本身已死或主题不符」。

## 三、12 条「干净名候选」的本轮复核（全部判废）

| slug | 本轮实测 | 判废理由 |
|---|---|---|
| `6pen-art` | `rc=000` | 产品下线（告别页） |
| `tool67418` | 200 / 正文 8 字 | "GetDraft has ceased operations" |
| `tool14278` | 200 / 正文 1126 字实为告别信 | 官方公开信 "sunset MidReal"，转向 Macaron |
| `tool3006` | 200 / "officially liquidated" | 公司清算 |
| `tool1890` | `rc=000` | Neeva 已关停 |
| `voxcraft-ai` | `rc=000` | 域名不可达 |
| `humva-ai` | `rc=000` | 域名不可达 |
| `tool2676` | `rc=000` | 175.fun 不可达 |
| `tool7424` | `rc=000` | 130ai.com 不可达 |
| `tool1957` | `rc=000` | ailogo.qq.com 不可达，且与既有 qq.com 条目同站 |
| `miantuan-knowfuture-com-cn` | `rc=000` | 不可达 + 同站重复 |
| `photonaiclub-com` / `-2` | `rc=000` | 域名不可达 |

### 渲染通道 3 条命中，逐条作废
| slug | 渲染所得 | 作废理由 |
|---|---|---|
| `tool701` | Poly（"The Intelligent Cloud File Browser"） | **主题不符**：Poly 已从 3D 材质库转型为 AI 云文件浏览器，与 DB 名「AI生成3D材质」不符（SOP §7.18） |
| `tool1338` | 千问（Qwen）聊天页 | **来源不合规**：域 `dis.chatdesks.cn` 非阿里官方域名，属第三方嵌入页；且名称为描述性 |
| `tool11395` | Flowith（flowith.io） | **同站重复**：`flowith.paluai.com` 为联盟镜像页，产品已由 `tool139` 覆盖 |

## 四、页面易主 / 主题不符（本轮再次确认）

| slug | 现状 |
|---|---|
| `miaohui-jixueai-com` | 现为「创大产控 \| 科研经纪产业领军企业」 |
| `hotshot-co` | 现为数码导购博客 "Hotshot \| AI Tools, Gadgets, Smart Home & How-To Guides" |
| `tool6840` | aigc.360.com 标题「360AI办公」，无「智绘」字样；且同站重复 |
| `tool1333` | aiapp.cc 已被博彩站占用（标题为 HTML 实体编码的「球友会」） |
| `tool148` | magician.design 现为冰淇淋店 "The Ice Cream Boutique" |
| `tool58825` | dinq.io 现为越南博彩站 |
| `tool14961` | fryderyk.ai 现为新西兰赌场站 |
| `tool111` | codeium.com 现为 Devin Desktop；且同站重复 |
| `tool216` | zyro.com 现为 "Zyro Website Builder Joins Forces With Hostinger" 并购公告；且同站重复 |
| `tool923` | lumalabs.ai 现为 Luma（AI Agents for Creative Work）；且同站重复 |
| `tool150` | usegalileo.ai 现为 Stitch；且同站重复 |
| `moyin-com` | x.moyin.com 现为「魔音工坊」，与 DB 名「魔撰写作」不符；且同站重复 |

## 五、域内同站重复程序化比对（11 条）

按「候选 hostname × 既有 1124 条 profile hostname（子域↔父域视为同站）」比对，命中 **11/53**：

```
miantuan-knowfuture-com-cn ≈ xiaoin-com-cn, wuz-com-cn, loopit-com-cn, operator-gc-com-cn, tokera
duiyou-ai      ≈ designkit-cn, designkit-cn-2, designkit-cn-3
moyin-com      ≈ tool1924
tool6840       ≈ tool1714, tool11897
tool1957       ≈ tool37 等 15 条 qq.com 条目
tool1079       ≈ qwen, tongyi-lingma 等 14 条 aliyun.com 条目
tool67595      ≈ tool14679
tool11395      ≈ huiwa, fantasy-art, jurilu-paluai-com, tool14769, yuanbao-paluai-com
tool67455      ≈ tool36409
tool923        ≈ lumalabs-ai
tool216        ≈ tool302
```

另有「产品同、域名不同」的 `seelesai-go-link`（短链→seeles.ai，与 `tool14989` 同产品）应判废。

## 六、剩余 53 条的处置建议（本批未执行，供决策）

剩余条目已无内容可写，但其中多条属**数据质量问题**，建议转到「数据质量清理」任务处理：

| 类型 | 条目 | 建议动作 |
|---|---|---|
| 通用名 | `ai-bot`（"AI工具集"） | 改名或排除 |
| 名称与 URL 所指不符 | `tool1079`（"阿里云登录" → m6.aliyun.com） | 补真实产品名或下线 |
| 页面已易主 | `hotshot-co`、`miaohui-jixueai-com`、`tool1333`、`tool148`、`tool58825`、`tool14961` | 下线或换 url |
| 已知数据错误 | `jianying`（url 指向即梦） | 修正 url（本批未涉及，仍待处理） |
| 品牌改名 | `tool8681`（reecho.ai 现为 Vocu AI，可用事实仅 554 字） | 改名/换 url 后另行评估 |
| 描述性名称 | `telehire-ai`、`pagentia-com`、`xanswer-com`、`tool11840` 等约 30 条 | 若官方站恢复可达，补真实产品名后再写 |

> 另注：本轮 `generate-sitemap.mjs` 输出显示 **tutorials.xml 收录 0/56 个教程页**——教程页索引面为空，
> 与工具页整改无关但同样是索引面问题，建议单独跟进。

## 七、可索引面自检

```
tools 总数:            1177
原创池 slug 数:        1124
池内存在于 tools 的:   1124
四条件通过:            1124
tools.xml 条数:        1124
池内未通过:            0
孤儿(池中无对应工具):  0
池外待写:              53
```

`sitemap.xml` / `tools.xml` 重建后与提交前逐字节一致（无 diff），说明本批未破坏索引面一致性。

## 八、本批变更

- `data/tool_profiles.json`、`data/tools.json`、`public/*.xml` **均未改动**
- 仅新增本报告文件
