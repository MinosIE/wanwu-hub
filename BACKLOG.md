# 可改进清单 · wanwu-hub（BACKLOG）

> 生成日期：2026-10-09。基于当前代码现状梳理「还能做什么」。
> 现状：Vite + TS + 零框架 + subject 插件化 SPA，8 个学科全部 `integrated`，由 `src/main.ts` 按 key 路由到各自 `mount`（`src/core/projects.ts`）。
> 既有规划 `PLAN.md`、Agent 规格 `agent.md`、说明 `readme.md` 均描述**旧版纯静态导航站**，与现状严重不符（见 §6）。

---

## 0. 现状速览（TL;DR）

两种实现范式并存：

| 类型            | 学科                                                     | 入口                                                     | 能力                                                          |
| --------------- | -------------------------------------------------------- | -------------------------------------------------------- | ------------------------------------------------------------- |
| **FULL**        | `dynasty / econ / mind / thought / earth / life`（6 个） | 自带 `template.ts` + `main.ts` + 独立 CSS                | 搜索 / 筛选 / refs / 详情 / 视图内主题·语言切换               |
| **LIGHTWEIGHT** | `physics / chem`（2 个）                                 | `src/subjects/subjectKit.ts` 的 `createSubject` 配置驱动 | hero + KPI + 模块卡 + 详情弹层 + footer，**无搜索/筛选/refs** |

工程：Vite 构建 + puppeteer SSG 预渲染（`build:ssg`）；GitHub Pages 自动部署（`.github/workflows/deploy.yml`）。
**测试：零覆盖**。文档：三份根文档均已过时。

---

## 1. 跨学科一致性（高优先，当前主线）

本轮已完成：physics/chem hero 中英文后缀、hero 副标题（sub-sub）移除、mind refs 布局对齐其它学科。

剩余缺口：

- [ ] **physics/chem 补齐搜索框**：FULL 有 `#search` + `search-results`（`econ/src/core/search.ts`）；subjectKit 当前无。可复用 `core` 搜索或注入。
- [ ] **physics/chem 补齐过滤器**：FULL 各模块有筛选逻辑（`src/subjects/*/src/modules/shared.ts`、`ui.ts`）。
- [ ] **physics/chem 补齐 refs / 来源区**：FULL 渲染 `sources.json`（`econ/src/main.ts` `renderRefs`）；physics/chem 无。
- [ ] **视图内主题 / 语言切换按钮**：FULL 内嵌 `.theme-btn` / `.lang-btn`；physics/chem 依赖全局顶栏，实测点击**未触发切换**（疑 bug，见 §5）。需统一交互或修复。
- [ ] **`heroSub` 死配置**：`subjectKit.ts:45` 定义 `heroSub`（`SubjectConfig`），但 `:122` 仅渲染 `intro`，`heroSub` 从未渲染（physics/chem `data.ts` 里也写了该字段）。要么渲染、要么从接口移除。
- [ ] **KPI / 详情 / footer 视觉对齐**：physics/chem 的 `sub-detail` / 简单 footer 与 FULL 风格统一。
- [ ] **首页学科计数口径对齐**：最近把首页简介改为「四大学科」，但顶栏/首页统计数字（学科数）需同步对齐，避免口径矛盾。

## 2. 物理/化学功能补齐（与 §1 重叠，需架构决策）

- **决策点：继续扩展 `subjectKit` 还是把 physics/chem 升级为 FULL 模板？**
  - 扩展 subjectKit：成本低，但能力越加越重，最终与 FULL 趋同、双轨维护。
  - 升级为 FULL：一致性强、可直接复用 search/filter/refs，但每个学科工作量更大。
  - 建议：先定范式，再批量落地，避免两套代码长期并存。
- [ ] **`soon.ts` 死代码 / fallback**：当前仅作未匹配 key 的兜底，无学科落入。可统一复用为「未接入学科」占位页，或从路由移除。

## 3. 内容扩充

- [ ] **physics/chem 种子内容深化**：`data.ts:7` 标注「示例性内容，持续扩充中」。physics 31 条 / chem 34 条，覆盖面偏浅，需加深度与广度。
- [ ] **econ 图表数据口径**：`i18n.json:92` 免责「示例性年度近似值，非实时数据」——补真实来源或明确标注。
- [ ] **mind 在建模块**：`i18n.ts:187` `ui.comingSoon` = 「该模块正在建设中，敬请期待」——推进在建模块。
- [ ] 各 `sources.json` / refs 来源补全与去重（已 10 个 FULL 文件含 `sources.json`）。

## 4. 工程化（中优先）

- [ ] **补测试**：当前零测试（`devDependencies` 无 vitest/jest，无 `*.test.*`）。建议 vitest 冒烟测试：构建产物、关键渲染、i18n 切换、路由分发。
- [x] **类型检查 / 数据校验进 CI**：新增 `npm run verify`（typecheck + check:json + dynasty 校验）与 `.github/workflows/ci.yml`（PR/push 跑 verify + build）。
- [x] **单一真相源 / 去重**：`src/core/subjects.json`（四脚本共享）、`src/core/dataKit.ts`（data.ts 工厂）、`s/build-index.mjs`（合并三份 index-builder）、GEO 域名统一为 minosie。
- [ ] **CloudStudio 部署**：项目记忆里有 CloudStudio 规则但未配置任何 CloudStudio 文件；如需多端部署可补，否则维持 GitHub Pages。

## 5. 体验 / 设计

- [ ] **全局跨科搜索**：目前搜索是学科内；可考虑壳层全局搜索跨所有学科。
- [ ] **主题 / 语言切换 bug 排查**：physics/chem 视图内切换点击无效（依赖全局顶栏）——确认全局顶栏在宿主壳里是否真正可用，修复或补充视图内按钮。
- [ ] **移动端适配一致性**：8 学科响应式核对（hero 高度本轮已统一收敛）。
- [ ] **加载态 / 骨架屏、错误边界**。
- [ ] **无障碍**：aria、键盘导航、对比度（hero 标题对比度本轮已修）。
- [ ] **收藏 / 书签、分享深链**：physics/chem 已支持 `#subject/physics/mod/id` 深链，可推广到 FULL 学科。

## 6. 文档更新（已基本完成）

> 状态更新：`readme.md` / `agent.md` / `docs/README.md` 已重写为当前 Vite + TS + subject SPA 现状，并补充了 `subjects.json` 单一真相源 / `dataKit` / GEO 生成器 / 派生索引重建 / CI 门禁 / 品牌与分析。`PLAN.md` 仍为收敛前的历史规划，保留作背景（可选：加一行指向本 BACKLOG 的“已完成”说明）。

- [x] **重写 `readme.md`**：技术栈、目录（含 `subjects.json`/`dataKit`/`_shared`/`scripts`）、本地预览与数据脚本、GEO 与品牌分析。
- [x] **重写 `agent.md`**：design tokens、新增学科流程（改 `subjects.json`）、§７ GEO/重建/CI。
- [ ] **更新 `PLAN.md`**：标记收敛已完成（可选，低优先）。
- [x] **新建 `docs/`**：`docs/README.md` 开发/内容贡献指南（含派生数据与 GEO 生成）。

## 7. 优先级总览

| 优先级 | 项                                                 | 价值                             |
| ------ | -------------------------------------------------- | -------------------------------- |
| **P0** | §1 physics/chem 搜索 / 筛选 / refs 补齐 + 切换按钮 | 跨学科一致性的最后缺口           |
| **P0** | §6 文档重写                                        | 当前文档误导，blocker for 协作者 |
| **P1** | §2 架构决策（subjectKit vs FULL）                  | 决定长期维护成本                 |
| **P1** | §3 内容深化（physics/chem/econ/mind）              | 内容质量                         |
| **P2** | §4 测试 / CI                                       | 稳定性                           |
| **P2** | §5 体验 / 设计                                     | polish                           |

---

### 附：本轮已落地（供追溯）

- `d824262` physics/chem hero 补中英文后缀（与其它学科 i18n 一致）
- `dfad0f3` 移除 physics/chem hero 副标题（sub-sub）
- `29d043c` mind refs 区块布局对齐其它学科（左对齐标题 + 多列网格 + 去虚线）
- `05fdcde` 首页简介学科数 六→四
