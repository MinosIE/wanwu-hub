# 可改进清单 · wanwu-hub（BACKLOG）

> 生成日期：2026-10-09。基于当前代码现状梳理「还能做什么」。
> 现状：Vite + TS + 零框架 + subject 插件化 SPA，8 个学科全部 `integrated`，由 `src/main.ts` 按 key 路由到各自 `mount`（`src/core/projects.ts`）。
> 既有规划 `PLAN.md`、Agent 规格 `agent.md`、说明 `readme.md` 均描述**旧版纯静态导航站**，与现状严重不符（见 §6）。

---

## 0. 现状速览（TL;DR）

两种实现范式并存：

| 类型            | 学科                                                     | 入口                                                     | 能力                                                    |
| --------------- | -------------------------------------------------------- | -------------------------------------------------------- | ------------------------------------------------------- |
| **FULL**        | `dynasty / econ / mind / thought / earth / life`（6 个） | 自带 `template.ts` + `main.ts` + 独立 CSS                | 搜索 / 筛选 / refs / 详情（语言与主题由顶栏统一切换）   |
| **LIGHTWEIGHT** | `physics / chem`（2 个）                                 | `src/subjects/subjectKit.ts` 的 `createSubject` 配置驱动 | hero + KPI + 搜索 + 难度筛选 + 模块卡 + 详情弹层 + refs |

工程：Vite 构建 + puppeteer SSG 预渲染（`build:ssg`）；GitHub Pages 自动部署（`.github/workflows/deploy.yml`）。
数据门禁：`npm run verify` = typecheck + `check:json` + `links:check`（死链/双语/派生索引/overview 计数）+ `data:check`（physics/chem 导出防漂移）+ dynasty 校验。
**测试：零覆盖**。文档：`readme.md` / `agent.md` / `docs/` 已对齐现状，`PLAN.md` 仍为历史规划。

---

## 1. 跨学科一致性（本轮已收尾）

本轮已完成：physics/chem hero 中英文后缀、mind refs 布局对齐、**subjectKit 难度筛选 chip**、**学科 hero 内的语言/主题按钮移除（顶栏为唯一切换入口），仅中华王朝保留并桥接到主应用状态（`src/core/viewControls.ts`）**、**physics/chem 去掉其他学科没有的 hero 副标语 `.hero-tag` 与自定义模块标题行 `.sm-head`（含右侧计数），改用共享 `.mod-head`**、physics/chem 机器可读 JSON 导出与 `links:check`/`data:check` 入门禁。

- [x] **physics/chem 搜索框**：`subjectKit` 已带 `#search` + 跨模块结果区（`.sub-results`）。
- [x] **physics/chem 过滤器**：模块内新增「难度」chip（入门/进阶/拓展，复用共享 `.filters/.chip`），仅当该模块有 `level` 数据时渲染（原「共 N 条」计数行已随 `.sm-head` 一并移除）。
- [x] **physics/chem refs / 来源区**：`SubjectConfig.refs` 已渲染（physics 4 条，KPI 同步）。
- [x] **视图内主题 / 语言切换按钮**：与顶栏重复，已从 thought / earth / life / mind / econ 的 hero 模板与 subjectKit（physics / chem）里移除，并同步摘掉各学科 `main.ts` 里对 `#langBtn` 的强依赖（`need()` 会抛错）与共享层 `.icon-btn` 死样式。**例外：中华王朝保留**（深色渐变上的玻璃胶囊是它的招牌样式），其点击由 `src/core/viewControls.ts` 在捕获阶段接管、改走 core `setLang` / `toggleTheme`，因此与顶栏同源；`dynasty.css` 里原有的 `display:none` 已删除。
- [x] **hero 副标语 `.hero-tag`（原 `heroSub`）**：其他学科 hero 只有一行导语，这行小字副标语是 physics/chem 独有的，已删除；`SubjectConfig.heroSub` 字段、physics/chem `data.ts` 里的取值、`scripts/export-data.mjs` 导出的 `heroSub`/`heroSubEn` 与 `subjectKit.css` 样式一并清理（overview.json 需重跑 `npm run data:export`）。
- [x] **模块标题行 `.sm-head`**：与其他学科的 `.mod-head` 功能重叠但长相不同（左对齐 + 右侧计数徽章），已改用共享 `.mod-head`（居中标题），subjectKit.css 里的 `.sm-head`/`.sm-count` 自定义规则与 `setCount()` 全部删除。
- [x] **详情面板难度文案**：徽标与 eyebrow 由 `L1/L2/L3` 改为中文等级词（入门/进阶/拓展），与 thought 等学科用词一致。
- [x] **`level` 数据覆盖面**：已补齐。physics 130/130、chem 非周期表 114/114 条均有难度（周期表 118 条按 `kind: "periodic"` 不参与难度筛选，`subjectKit` 的 `hasLevels()` 已排除）。难度按中国课标进入时点人工判定（1 入门 / 2 进阶 / 3 拓展），非机械填充。浏览器实测：chem 15 个模块中 14 个、physics 16 个模块全部出现难度筛选条。
- [ ] **KPI / 详情 / footer 视觉对齐**：physics/chem 的 `sub-detail` / 简单 footer 与 FULL 风格统一。
- [ ] **首页学科计数口径对齐**：顶栏/首页统计数字（学科数）需同步对齐，避免口径矛盾。

## 2. 物理/化学功能补齐（与 §1 重叠，需架构决策）

- **决策点：继续扩展 `subjectKit` 还是把 physics/chem 升级为 FULL 模板？**
  - 扩展 subjectKit：成本低，但能力越加越重，最终与 FULL 趋同、双轨维护。
  - 升级为 FULL：一致性强、可直接复用 search/filter/refs，但每个学科工作量更大。
  - 建议：先定范式，再批量落地，避免两套代码长期并存。
- [ ] **`soon.ts` 死代码 / fallback**：当前仅作未匹配 key 的兜底，无学科落入。可统一复用为「未接入学科」占位页，或从路由移除。

## 3. 内容扩充

- [ ] **physics/chem 种子内容深化**：（本条原记的「`data.ts:7` 标注『示例性内容，持续扩充中』」与「physics 31 条 / chem 34 条」均已失真：全仓无该标注（只有 econ 的「示例性年度近似值」），实际为 physics 130 条 / chem 232 条，其中 118 条是完整周期表。当前双语字段无缺失、难度字段已全覆盖；仍偏浅的是**每模块条目的广度**（physics 最少的 methods / fluids / relativity / waves / tech 各 4-5 条，chem 的 energy / electrochem 各 5 条），以及 physics 16 个模块、chem 15 个模块尚未覆盖力、热以外的专题（如近代物理实验、化学与工程、环境化学）。
- [x] **econ 补「骗局与泡沫」模块与金融大事件**：新增 `bubbles.json`（16 条中英双语：郁金香、南海、庞氏、亨特兄弟、巴林、LTCM、互联网泡沫、安然、银广夏、麦道夫、LIBOR、PlusToken、Wirecard、LUNA、FTX 等）与新视图 `m-bubbles`（`template.ts` section + 导航按钮 + `s/build-econ-index.mjs` 登记 + i18n 双语键）；`events.json` 22→31（黑色星期一、黑色星期三/索罗斯做空英镑、俄罗斯违约、欧元区主权债务危机、闪电崩盘、2015 A 股异常波动、瑞郎脱钩、英国迷你预算、硅谷银行）。econ 模块 16→17、条目 207→232，overview 计数/KPI 与四份 GEO 文档已同步。
- [x] **econ 图表数据口径**：先摸底发现数据层早已说清（每张图标题带「（示意）」、`note`/`noteEn` 逐图免责、`sources` 标「近似整理」，`charts.ts` 已渲染，`llms-full.txt` 也带）；真正缺的是两件事，已修：① 口径标到 **SVG 本体**（`svg.chart .c-mark`，文案新增 `ui.chartMark`：「示意 · 非实测数据」/ “Schematic · not measured”），卡片被截图外传时口径不会随之丢失；② `charts.ts` 原本自己拼接 `src.label`，**英文界面漏中文**，改为复用 `core/detail.ts` 导出的 `srcLabel()`（单一真相源，年份括号随语言）。实测 7/7 张图双语均正常。**不换为真实数值序列**：本仓无法核验数据源，把近似值改扮成可引用统计比口径不清更糟。
- [x] **mind 在建模块**：本条前提失真——mind 模板的 15 个 section 已全部建成（11 个 `listModules` + `m-demos` / `m-bigfive` / `m-selfrating` 三个自定义模块），模板里 `class="placeholder"` 元素 0 个，`mountPlaceholders()` 与 `ui.comingSoon`（`i18n.ts:187`）是**永远不会命中的兜底路径**，无在建模块可推进。保留这段兜底代码（成本为零，可防未来新增 section 时漏挂载），本条关闭。
- [x] **mind 双语补齐并进默认门禁**：`links:check` 默认清单加入 mind（原为六科）。落地内容：① mind 此前完全不支持来源英文，`types.ts` 的 `RefSource` 加 `labelEn/type/typeEn`，`detail.ts` 导出与 econ 同构的 `srcLabel()`（labelEn 优先、年份括号随语言），`app.ts` 页脚 refs 与详情面板共用一份；② 数据补 63 处 `labelEn` + 5 处 `typeEn`（来源缺英文 68 → 0）、50 处 `categoryEn` + 6 处 `eraEn`（英文态分类筛选条与流派年代不再漏中文，实测 biases/everyday/experiments/myths/schools 五模块全英化且筛选仍准确）；③ 修掉进门禁时爆出的 5 个真错：`experiments.json` 与 `glossary.json` 的 `cognitive-dissonance` **id 重名**（mind 的 `related.ts` 用扁平 Map 注册，重名会静默覆盖跳转目标）→ 实验条目改名 `festinger-dissonance`，并按其自引的 `Festinger & Carlsmith (1959)` 把 `year` 1957 纠正为 1959；`psychologists.json` 3 条死链 → `carl-rogers` 的 `self-concept` 改指已有条目 `self`，`aaron-beck` 的 `cognitive-distortion`、`vygotsky` 的 `scaffolding` **直接删除**（仓内无对应条目，挂到「认知失调」「学习」都是错的，宁缺不凑）；`myths.json → left-right-brain` 的 `oneLinerEn` 里漏着中文“分工”→ 改写。现 mind 错误 0 / 告警 0，`npm run verify` 通过。
- [ ] **mind `overview.json` 迁移到新 schema**：它仍是早期移植的 `{kpis:[{file,titleKey,count}], entries, refs}`，没有 `counts`，因此 `links:check` 的分类计数校验对 mind 自动跳过（`check-links.mjs` 已加 `hasCounts` 守卫，否则 `canon(undefined)` 会直接崩溃）。迁移需连 `app.ts` 的 `mountOverview()` KPI/入口渲染一起改，属独立工作量。
- [ ] 各 `sources.json` / refs 来源补全与去重（已 10 个 FULL 文件含 `sources.json`）。mind 的来源双语已于本轮补齐并进门禁（见上条），其余学科的 `sources.json` 仍未逐条核校。

## 4. 工程化（中优先）

- [x] **代码风格与静态检查统一**：现由 **Biome**（`biome.json` + `@biomejs/biome` 入 devDependencies）一手承担格式化 + lint；新增 `lint` / `lint:fix` / `lint:ci` 三条脚本，`lint:ci`（`biome check --diagnostic-level=error`）已接进 `verify` 取代原 `format:check`。口径沿用先前实测结论：lineWidth 80、2 空格、双引号、尾逗号，**唯一例外 `src/subjects/mind/**` 单引号**（逐目录数过字面量，仅 mind 单引号占优 1436:699）；`quoteProperties: "preserve"` 保住 dynasty builder 里含间隔号的中文键引号；**`assist.organizeImports` 关闭**（import 顺序承载模块求值顺序，各学科 `index.ts` 先引 template/CSS 再引 `main`）；屏蔽 `public`、physics/chem `data.ts`、`**/*.html`。不存在“替换 ESLint”——本仓从未有 ESLint，Biome 带来的是从未有过的 lint 层。迁移代价实测很小：在已被 Prettier 全量格式化过的代码上，Biome 仅与 4 个文件口径不同（`router.ts` 联合类型换行、mind 3 个 CSS 的属性选择器引号）。顺手清掉的真问题：3 处 `(x ??= []).push()` 表达式内赋值、`build-geo.mjs` 未使用的 `PUBLIC` import、`add-classics.cjs` 的 `node:` 协议；`useIterableCallbackReturn` 降为 warn（63 处移植树写法）。验证：`verify` 全绿、builder 重跑输出与迁移前逐字节一致、`build:ssg` 产物零漂移、首页 + 16 个学科视图（8 学科 × 2 语言）浏览器实测 0 报错。
- [x] **修复 econ 派生索引陈旧**：`public/econ-data/data/search.json` / `related.json` 里 `china-stock-volatility-2015` 还挂着旧标题「2015 年中国股市异常波动」，而源数据 `events.json` 早已改为「中国股市异常波动」；重跑 `econ:build-index` 后对齐。已做 A/B 证明是旧欠债而非本次迁移引入（迁移前的 builder 产出同样差异）。教训进 `agent.md`：改完源数据必须 `index:rebuild`，门禁查不出这类陈旧。
- [x] **清掉 lint 里的真缺陷**（202 → 155 warnings）：`noUnusedImports` 15 处全清（其中 mind 10 个模块是因为 `card: (it, L) => …` 的**参数名遮蔽了同名 import**，属于移植时的残留冗余，`typecheck` 可兜底验证），`noGlobalIsNan` 3 处改 `Number.isNaN`（先逐个确认入参恒为 number：`startYear()` 走 `+tok`、锚定演示走 `parseInt`，否则 `isNaN(null)===true` 而 `Number.isNaN(null)===false` 会默默改掉语义；`dynasty:validate` 输出逐行比对一致）。这两类修复是 **unsafe fix**，`lint:fix` 默认不动，得 `--only=<rule> --write --unsafe` 限定单条跑。
- [x] **CSS 刻意写法按目录豁免**：`overrides` 对 `src/subjects/**/*.css` 关掉 `noImportantStyles`（11）与 `noDescendingSpecificity`（16），共消 27 条 —— 学科样式的 `.xxx-root` 分层覆盖本就依赖这个写法；`src/core/ui/ui.css` 里 `prefers-reduced-motion` 的两处 `!important` 不跟目录豁免，改用就地 `biome-ignore` 注释（那是无障碍兜底，且 hub 侧仍需该规则）。已做对照：去掉 override 为 182 warnings，带上为 155，差值刚好 27。
- [ ] **清剩余 lint 存量**：现 155 warnings + 53 infos，均不阻断门禁——`useIterableCallbackReturn` 63（已降级，改写完可恢复 error）、`noExplicitAny` 29、`noNonNullAssertion` 29、`useOptionalChain` 18、`useTemplate` 50 infos（`lint:fix` 会自动修，但会造大 diff，宜随功能改动顺手换）、`noCommaOperator` 4、`noConfusingVoidType` 4、`noUnusedVariables` 6。
- [ ] **补测试**：当前零测试（`devDependencies` 无 vitest/jest，无 `*.test.*`）。建议 vitest 冒烟测试：构建产物、关键渲染、i18n 切换、路由分发。
- [x] **类型检查 / 数据校验进 CI**：新增 `npm run verify`（typecheck + check:json + dynasty 校验）与 `.github/workflows/ci.yml`（PR/push 跑 verify + build）。
- [x] **单一真相源 / 去重**：`src/core/subjects.json`（四脚本共享）、`src/core/dataKit.ts`（data.ts 工厂）、`s/build-index.mjs`（合并三份 index-builder）、GEO 域名统一为 minosie。
- [ ] **CloudStudio 部署**：项目记忆里有 CloudStudio 规则但未配置任何 CloudStudio 文件；如需多端部署可补，否则维持 GitHub Pages。

## 5. 体验 / 设计

- [ ] **全局跨科搜索**：目前搜索是学科内；可考虑壳层全局搜索跨所有学科。
- [x] **主题 / 语言切换 bug 排查**：根因是学科内按钮走学科自己的 `setLang`/主题写入（dynasty 的 localStorage 还是沙箱内存桩），与顶栏不同源；index.html 因此直接隐藏了它们。现结论收敛为「顶栏是唯一切换入口」：除中华王朝外按钮已从模板移除，dynasty 的按钮由 `src/core/viewControls.ts` 桥接（捕获阶段 `stopPropagation` → 改调 core `setLang`/`toggleTheme`）。实测 8 科：顶栏切换对 8 科全部生效，dynasty hero 两枚按钮与顶栏双向同步，0 控制台报错。
- [ ] **重复 id 隐患**：顶栏 `#themeBtn` 与中华王朝 hero `#themeBtn` 同页共存（HTML 无效）；主应用已改为 `header #themeBtn` 作用域查询规避，彻底清理需重命名移植模板里的 id（并入 §2 范式决策）。
- [ ] **移动端适配一致性**：8 学科响应式核对（hero 高度本轮已统一收敛）。
- [ ] **加载态 / 骨架屏、错误边界**。
- [ ] **无障碍**：aria、键盘导航、对比度（hero 标题对比度本轮已修）。
- [ ] **收藏 / 书签、分享深链**：physics/chem 已支持 `#subject/physics/mod/id` 深链，可推广到 FULL 学科。

## 6. 文档更新（已基本完成）

> 状态更新：`readme.md` / `agent.md` / `docs/README.md` 已重写为当前 Vite + TS + subject SPA 现状，并补充了 `subjects.json` 单一真相源 / `dataKit` / GEO 生成器 / 派生索引重建 / CI 门禁 / 品牌与分析。`PLAN.md` 仍为收敛前的历史规划，保留作背景（可选：加一行指向本 BACKLOG 的“已完成”说明）。

- [x] **重写 `readme.md`**：技术栈、目录（含 `subjects.json`/`dataKit`/`_shared`/`scripts`）、本地预览与数据脚本、GEO 与品牌分析。
- [x] **重写 `agent.md`**：design tokens、新增学科流程（改 `subjects.json`）、§７ GEO/重建/CI。
- [x] **更新 `PLAN.md`**：已标记「收敛已完成」并指向本 BACKLOG（`PLAN.md:4`）。
- [ ] **physics/chem 状态位**：`src/core/subjects.json` 仍标 `status: "wip"`（首页显示「接入中」），但两科已具备搜索/筛选/详情/refs/机器可读 JSON + GEO。是否改 `online` 需你拍（会同步影响首页徽标、预渲染页与 `llms.txt` 口径）。
- [x] **新建 `docs/`**：`docs/README.md` 开发/内容贡献指南（含派生数据与 GEO 生成）。

## 7. 优先级总览

| 优先级 | 项                                                     | 价值                                 |
| ------ | ------------------------------------------------------ | ------------------------------------ |
| ~~P0~~ | ~~§1 physics/chem 搜索 / 筛选 / refs 补齐 + 切换按钮~~ | ✅ 本轮已完成（见 §1）               |
| **P0** | §6 文档重写                                            | ✅ 已基本完成，仅 `PLAN.md` 待标历史 |
| **P1** | §2 架构决策（subjectKit vs FULL）                      | 决定长期维护成本                     |
| **P1** | §3 内容深化（chem `level` 覆盖面 / earth / life）      | 内容质量                             |
| **P2** | §4 测试                                                | 稳定性（CI 门禁已接 links/data）     |
| **P2** | §5 体验 / 设计                                         | polish                               |

---

### 附：本轮已落地（供追溯）

- `d824262` physics/chem hero 补中英文后缀（与其它学科 i18n 一致）
- `dfad0f3` 移除 physics/chem hero 副标题（sub-sub）
- `29d043c` mind refs 区块布局对齐其它学科（左对齐标题 + 多列网格 + 去虚线）
- `05fdcde` 首页简介学科数 六→四
- thought 新增 5 类视图（术语/时间线/思想实验/中西对比/误区），共 10 视图 184 条，索引 87→184
- `scripts/export-data.mjs`：physics/chem `data.ts` → `public/<x>-data/data/*.json`（+ llms/robots/sitemap），`data:check` 防漂移
- `scripts/check-links.mjs` 新增「派生索引覆盖」检查；earth/life 24 处 related 死链与 overview 计数清零
- `scripts/jsonStyle.mjs`：`fmt-json` 与 `export-data` 共用同一排版器（导出产物天生即为仓库规范风格）
- `src/core/viewControls.ts`（dynasty hero 按钮桥接）+ `subjectKit` 难度筛选：8 科顶栏语言/主题切换实测生效，dynasty 双向同步（puppeteer 0 报错）
- 学科 hero 语言/主题按钮移除：顶栏样式改为 `.toolbar` 作用域（原先裸 `.theme-btn{width:38px}` 泄进学科 hero，把胶囊压成竖排圆钮）
