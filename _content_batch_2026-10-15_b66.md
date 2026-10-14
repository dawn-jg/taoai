# 第六十六批原创资料小结（2026-10-15）

## 结果
- 新增 **4 条**原创工具资料：剪映AI（jianying）、Vimi（tool14067）、百度超级助理（tool6290）、Happycapy（tool71899）
- 可索引：1079 → **1083**；`原创池 1083 == 四条件通过 1083 == tools.xml 1083` ✅（池内未通过 0、孤儿 profile 0）
- 待写：98 → **94**

## 条目与来源
| slug | 名称 | 字数 | 来源 |
|---|---|---|---|
| jianying | 剪映AI | 1034 | https://www.jianying.com/ |
| tool14067 | Vimi | 751 | https://www.sensetime.com/cn/product-detail?categoryId=51134571&scene=2 |
| tool6290 | 百度超级助理 | 725 | https://qianfanmarket.baidu.com/product/detail/4b24447a-70b9-49c4-95a9-f2bbfda4dae3 |
| tool71899 | Happycapy | 984 | https://happycapy.ai/ + https://docs.happycapy.ai/ |

未使用任何第三方导航站或媒体转述，未引用用户评价与销量数字。

## 名称 / URL 修正 3 处（先改再写）
- `tool14067`：「商汤科技推出的可控人物视频生成AI模型」→ **Vimi**；url 去掉失效的 `&gioNav=1` 参数，改为可达的官方产品页
- `tool6290`：「百度智能云发布的基于文心一言的AI原生应」（截断描述名）→ **百度超级助理**；url 由 404 的 `cloud.baidu.com/product/infoflow.html` 改为官方千帆应用商店页
- `tool71899`：DB 名是脏数据「Sign Up」→ **Happycapy**；url 由 `/signup` 改为官网首页
- 三处 `description` / `tags` / `domain` 同步改写；未改动 category/subcategory，故 `categories.json` 计数无需重算

## 推理判废（本批实测 98 条全量）
- **代理 curl 探测**：200 共 36 条，000 共 44 条；直连复测 44 条 000 仅 1 条回 200（晓语台空壳）
- **同产品双条**：`tool67455`（gaoyiai.com）＝ 既有 `tool36409` 稿易AI论文；`moyin-com`（x.moyin.com→魔音工坊）＝ 既有 `tool1924`；`tool8681` reecho.ai ＝ 既有 `reecho`；`tool923` lumalabs.ai ＝ 既有 `lumalabs-ai`；`tool11395` ＝ 既有 `tool139` Flowith；`tool9412` maopaoya.com ＝ 既有 `tool9802` 跃问（stepfun.com）
- **停服 / 清算 / 出售**：MidReal（sunset→Macaron）、LogoliveryAI（Inc. 已清算）、Tome（2025-04-30 关停，tome.app 404）、Lobe（微软 2023-01 弃用，下载跳 GitHub）、GetDraft（关停公告）、creatie.ai/stylized.ai（域名挂牌出售）、InStreet（闭店装修）
- **被劫持**：tool744/148/14961/58825 等为博彩页；tool1333 qy球友会
- **名称—页面不符**：tool6840（360AI办公 vs 360智绘）、tool1989（万网 vs 智能logo）、tool701（withpoly 已成云文件浏览器）、tool150/923/111 等
- **通用名 / 描述名按红线跳过**：ai-bot（AI工具集）、seelesai-go-link、ask-xiaoyuzhoufm-com
- **官方域名不可达、仅存第三方转述**：AIDesign（ailogo.qq.com 解析到非公网 IP）、ChitChop、灵构AI笔记（88lingo 域名已无法解析）

## 抓手结论
- 本批唯一有效通道仍是 **代理 curl 抓官网 + `r.jina.ai` 渲染读取 SPA 官网**（剪映、Vimi、Happycapy 均由后者/前者取得完整正文）
- **WebFetch 本轮失效**：sensetime 产品页、ailogo.qq.com 均报错；`r.jina.ai` 对已死域名只回 could not resolve hostname
- 待写池已高度见底，「按实际素材量如实上报、不预设条数」仍是唯一正确策略

## Git
见本轮 commit（内容 + 本小结），均显式 add，未使用 `git add -A`（工作区另有未跟踪 `build_cron_2026-10-07.log`）。
