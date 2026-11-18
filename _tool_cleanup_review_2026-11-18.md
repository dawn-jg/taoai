# 工具清理清单（剩余 47 条 · 待人工确认后执行）

> 生成时间：2026-11-18
> 基线：HEAD `bbe2692c`（博彩外链 3 条已下线 + 40 篇教程已下架之后的状态）
> 工具总数 **1174** ｜ 原创池 **1127** ｜ 待写 **47**（全为 noindex，不在 sitemap）
> 证据来源：`docs/pending-content-decisions.md`（b77–b141 共 65 轮、四通道取证饱和）及 `_content_batch_2026-11-02_b*.md`

---

## 一、建议处置总览

| 处置 | 条数 | 理由 |
|---|---|---|
| **合并**（删除本条 + 301 到承接条目） | **10** | 同一产品的重复页，给重复产品写第二份资料正是 scaled content abuse 形态（b149 已逐条证伪「改名可写」，全部归入合并） |
| **下线**（直接移除，URL 自然 404） | **35** | 站点死 / 停运 / 主体更换 / 域名判死 / 博彩残留 / 名实不符 |
| **暂缓**（保留 noindex，不动） | **2** | 产品疑似在营，仅因反爬取不到素材；下架可能误伤真实产品 |

执行后：工具 **1174 → 1129**，索引覆盖率 **1127/1129 ≈ 99.8%**，可写池彻底归零（b149 已确认三条解锁假设全部关闭）。

---

## 二、合并清单（10 条 · 删除 + 301 重定向到承接条目）

| # | slug | 现名 | 承接条目（池内已写） | 证据 |
|---|---|---|---|---|
| 1 | `moyin-com` | 魔撰写作 | `tool1924` 魔音工坊 | x.moyin.com 实为魔音工坊（b132/b137 双证） |
| 2 | `duiyou-ai` | 堆友AI | `xmyeditor-com` 美图设计室 | designkit.cn title「美图设计室」（b128） |
| 3 | `tool67455` | 学术降AI率工具 | `tool36409` 稿易AI论文 | 同产品重复页（b132） |
| 4 | `tool67595` | 论文降aigc… | `tool14679` 66AI论文 | aigc.66paper.cn 为 66paper 子产品（b131/b132） |
| 5 | `seelesai-go-link` | 端到端AI 3D游戏生成 | `tool14989` SeeleAgent | 分享短链渲染到 seeles.ai，品牌词 81 次（b135） |
| 6 | `tool11395` | 一站式GPT/Claude | `tool139` Flowith | flowith.paluai.com 为分销镜像（b132） |
| 7 | `tool6840` | 360智绘 | `bangong-360-cn` 360AI办公 | aigc.360.com 已更名 360AI办公（b128） |
| 8 | `tool216` | Zyro AI Image Upscaler | `tool302` Zyro | 301 → Hostinger 并购博文，产品实体消失（b139） |
| 9 | `tool1338` | 全能AI助手(Qwen) | `qwen` 通义千问 | 633 B 跳转页直通通义千问（b136） |
| 10 | `tool150` | AI高保真原型设计 | `tool73947` Google Stitch | usegalileo.ai 301 → stitch.withgoogle.com（b127） |

> 合并执行时须同步：`data/slug_redirects.json` 增加映射 → 重跑 `migrate-slugs.mjs --apply` 重建 `_redirects`。

## 三、下线清单（34 条 · 直接移除）

### 3.1 产品已停运 / 清算（5）
| # | slug | 名称 | 证据 |
|---|---|---|---|
| 1 | `tool67418` | GetDraft | 官网「GetDraft has ceased operations」（b137 升级确认） |
| 2 | `tool14278` | MidReal | 停运告别信 1180 字，导流 Macaron（b135/b138） |
| 3 | `tool3006` | LogoliveryAI | 「officially liquidated」清算公告（b127/b135） |
| 4 | `tool1890` | Neeva | 产品关停；域名现出售停放（b134/最新） |
| 5 | `6pen-art` | 6pen Art | 2024-08-15 关停公告，仅剩导流入口（b134/b138） |

### 3.2 域名已死 / 无法解析（13）
| # | slug | 名称 | 证据 |
|---|---|---|---|
| 6 | `photonaiclub-com` | 光子AI | 公共 DNS 无此域名（b128） |
| 7 | `photonaiclub-com-2` | 光子AI抠图 | 同上 |
| 8 | `tool2676` | 175FUN | 42203 域名无解析 + DoH NXDOMAIN（b127/b137 双通道） |
| 9 | `etna-7volcanoes-com` | Etna | 42203 域名无解析（b137） |
| 10 | `xanswer-com` | XAnswer | 42205 域名无公共解析（b134/b138） |
| 11 | `tool7424` | XPaper AI | 130ai.com 连接拒绝（b128） |
| 12 | `tool9412` | 阶跃星辰AI聊天 | maopaoya.com 42203（b144 记录） |
| 13 | `tool33149` | AI设计工具 | ibihun.com 42203（b144 记录） |
| 14 | `tool67371` | AI面试助手 | aimianshibang.com 42205（b144 记录） |
| 15 | `tool13251` | 字节AI虚拟交友 | chatwiz.cn 42205（b144 记录） |
| 16 | `telehire-ai` | AI面试官 | 42203（b134） |
| 17 | `tool11840` | 结构化AI搜索 | ERR_CONNECTION_CLOSED（b144 记录） |
| 18 | `tool71074` | 长视频提炼 | 404 Project not found（b130/b139） |

### 3.3 站点不可达 / 空壳 / 停放（10）
| # | slug | 名称 | 证据 |
|---|---|---|---|
| 19 | `writingpal-ai` | WritingPal | 25s 渲染超时（b142 记录） |
| 20 | `miantuan-knowfuture-com-cn` | 面团AI | 直连失败、代理超时（b128/b137） |
| 21 | `voxcraft-ai` | VoxCraft | 504 + 证书过期，多批次不可达；b145 提示 504 属站点自身故障，**执行前可最后复访一次**，若恢复则转暂缓（b142/b145） |
| 22 | `tool1957` | AIDesign | 解析至黑洞地址 0.0.0.1（b128/b137） |
| 23 | `tool479` | AI代码检查 | 404 空响应（b139） |
| 24 | `tool66554` | 造次 | 0 字节空文件（b137） |
| 25 | `humva-ai` | Humva | ParkLogic 域名停放（b134/b137/b140 三证） |
| 26 | `yanqueai-com` | AI LOGO设计 | 原域 301 → logoyq.com，不再做独立站点（b140） |
| 27 | `tool701` | AI生成3D材质 | 业务迁 poly.app，站内无承接条目（b136） |
| 28 | `tool67775` | 大模型训练平台 | ERR_CERT_AUTHORITY_INVALID 证书故障（b144 记录） |

### 3.4 名实不符 / 非工具页（5）
| # | slug | 名称 | 证据 |
|---|---|---|---|
| 29 | `tool1079` | 阿里云登录 | 201 字节，实为登录页非工具页（b136） |
| 30 | `miaohui-jixueai-com` | 秒绘AI | 主体已换为「创大产控」公司官网（b128/b137） |
| 31 | `hotshot-co` | Hotshot | 已转型科技博客（b127/b134） |
| 32 | `tool58825` | AI人才发现平台 | dinq.io 已变**越南语博彩站 KeoNhaCai**，外链风险第一档（b145 升级） |
| 33 | `pagentia-com` | AI专利检索 | 证书域名不匹配 + 导航失败（b142 记录） |
| 34 | `ai-bot` | AI工具集 | 通用名 + 竞品导航站（本站数据源本身），保留有自我引用嫌疑（b134） |
| 35 | `flow-studio` | Flow Studio | `/flow-studio` 产品页已撤除、301 回落 flowgpt 首页且全文无「Studio」→ 名实不符（b144 升级） |

## 四、暂缓清单（2 条 · 建议保留 noindex 不动）

| slug | 名称 | 理由 |
|---|---|---|
| `phind-com` | Phind | 产品在营（AI 搜索引擎），仅因 Cloudflare 拦截取不到素材；b145 明确「403 CF = 存活但不可写，不可判死」 |
| `ask-xiaoyuzhoufm-com` | 小宇宙AI搜索 | 产品在营，ask 站仅 SPA 壳；若日后拿到官方素材可改名重写 |

> 暂缓 2 条对索引面零影响（noindex、不进 sitemap），只是留在「未写」名单里。
>
> 另：b147 发现 24 条 noindex 待写页正文仍挂 ai-bot.cn 采集内容（含对方外链图与 utm 推广参数）——
> 本清单执行完毕后这批页面即被移除，**无需单独改写**（其中 22 条站点已死或易主）。

---

## 五、执行步骤（确认后我可直接做）

1. **下线 34 条**：从 `data/tools.json` 移除；URL 自然 404（均为 noindex 历史页，无索引价值）。
2. **合并 10 条**：从 `tools.json` 移除 + 向 `data/slug_redirects.json` 写入 `/tools/<old>` → `/tools/<new>` 映射 + 重跑 `migrate-slugs.mjs --apply` 重建 `public/_redirects`。
3. **重算 `categories.json` count** → 重跑 `generate-sitemap.mjs`（预期 tools.xml 仍为 1127）。
4. 自洽校验（池 = 四条件 = xml）→ commit + push → 线上抽验重定向与 404。
5. 更新 `docs/pending-content-decisions.md` 与自动化提示词口径（工具侧彻底收口，任务转为教程/巡检）。
