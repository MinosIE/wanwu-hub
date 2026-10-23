# Agent 规格 · wanwu-hub

面向 AI Agent / 协作者的项目规格文档。改动前请先通读本文件，保持与现有约定一致。

## 1. 概览

- **角色**：「万物通识」系列统一站（聚合入口 + 各学科内容）。
- **技术栈**：**Vite + TypeScript + 零 UI 框架**（纯 DOM 渲染，无 React/Vue）。
- **入口文件**：`index.html`（外壳：顶栏 / 首页 / footer + 内联全局 `<style>`）+ `src/main.ts`。
- **默认归属**：GitHub 组织 / 用户 `MinosIE`，外链形如 `https://github.com/MinosIE/<repo>`。

## 2. 目录与模块

关键共享模块在 `src/core/`：

- `i18n.ts`：`getLang() / setLang() / onLangChange()` + `L(o)`（取 `{zh,en}` 当前语言值）。新增文案优先走各学科的 `i18n.json` / `i18n.ts` 字典。**注意 `L()` 的回退方向**：en 模式先取 `o[key+'En']`、缺失才回退 `o[key]`，因此对已是英文名的字段写 `L(it,'termEn')` 会回退成 `termEn` 本身，与 `L(it,'term')` 拿到同一串（标题 / 副标题撞车）。该写法在 mind 11 个模块与 thought/econ 多模块有 25+ 调用点，**修法是在渲染层判同串则不输出副行**，不逐点改写（改写会把 CJK 泄进英文态，与 `links:check` 要求 `*En` 纯 ASCII 的口径冲突）。
- `theme.ts`：`getTheme() / toggleTheme() / onThemeChange()`。
- `router.ts`：hash 路由（`parse() / navigate() / onRoute()`）。
- `layout.ts`：顶栏（含全局 `.lang-btn` / `#themeBtn` 主题·语言切换）与 footer。
- `subjects.json`：**学科清单唯一真相源**（9 学科元信息数组）；`projects.ts`（TS）与 `gen-sitemap.mjs` / `gen-geo.mjs` / `prerender.mjs`（node）均从此读取，**不要**再在别处硬编码学科清单。
- `projects.ts`：`import subjects.json` → `PROJECTS[]`（收窄断言 `as Project[]`）+ `statusLabel()`；`Project` 接口在此定义。
- `dataKit.ts`：`createDataLoader(baseDir)` 工厂，提供 `dataUrl/fetchData/peekData`（带缓存）；各 FULL 学科 `data.ts` 仅委托它，**勿再拷贝一份 21 行 loader**。
- `ui/text.ts`：`splitProse / yearText / proseHTML` 共享文本格式化。**公元前年份（数据里存负数）一律走 `yearText(year, en)`** 转「前 450 年」/「450 BCE」，正数保持裸数字原样（不加「年」/CE，以免扰动既有已核校的渲染）；条目来源标签、首页参考清单、人物著作年均共用它，勿再各处自写（thought `timeline.ts` 的本地 `yearText` 与之同口径）。

## 3. Design Tokens（CSS 变量）

基础变量在 `index.html` 的 `:root`（暗 / 亮双主题通过 `[data-theme]` 切换）：

| 变量       | 用途                                                                                 |
| ---------- | ------------------------------------------------------------------------------------ |
| `--bg`     | 页面背景                                                                             |
| `--card`   | 卡片 / 面板背景                                                                      |
| `--text`   | 主文字                                                                               |
| `--muted`  | 次要 / 说明文字                                                                      |
| `--accent` | 外壳顶栏强调色（全局 shell token，**不是**学科基调色；学科基调见 §3.1 的 `--brand`） |
| `--teal`   | 强调色（青）                                                                         |
| `--border` | 边框 / 分割线                                                                        |

各 FULL 学科在 `src/subjects/<key>/src/styles/tokens.css` 进一步覆盖 `--link / --shadow / --faint / --card` 等；physics/chem/mgmt 复用 `subjectKit.css`，由 `createSubject` 注入本地 `--accent` 并桥接到规范契约 `--brand`（见 §3.1）。

### 3.1 学科级 Design Tokens（各 subject 根节点）

共享 UI 层 `src/core/ui/ui.css` 只认一套规范词表，**学科基调色的对外契约是 `--brand`（不是 `--accent`）**：

| 变量                                                     | 用途                                                                   | 契约                           |
| -------------------------------------------------------- | ---------------------------------------------------------------------- | ------------------------------ |
| `--brand`                                                | 学科基调色（卡片 hover 边框、链接、按钮、`.card-go` 等由 ui.css 消费） | 每个学科**必须**在根节点提供   |
| `--brand-d` / `--brand-l` / `--brand-50` / `--brand-100` | 基调色的深 / 浅 / 背景档                                               | 按需                           |
| `--gold`                                                 | 学科点缀金（hero 光晕、强调边线）                                      | 每个学科**必须**提供           |
| `--hero`                                                 | hero 三段渐变，中段应与 `--brand` 同色相；暗色为更深的同色相版本       | 每个学科**必须**提供，明暗成对 |

**命名统一约定**（对外只有一个名字：`--brand`）：

- 直接作者化：thought / life / earth / econ / dynasty 在各自 `tokens.css` 直接写 `--brand: <色>`。
- 本地令牌 + 别名桥：mind / physics / chem / mgmt 内部沿用 `--accent` 系列（`--accent` / `--accent-2` / `--accent-strong` / `--accent-soft` 等本地多档色阶，其中 `--accent-2` 语义是「金」而非「主色」），但**必须**通过别名桥暴露规范契约：`--brand: var(--accent); --gold: var(--accent-2);`（见 `mind/src/styles/tokens.css`、`subjectKit.css`）。
- 因此不要为「统一命名」去重命名 mind / subjectKit 的 `--accent` 家族：它们是与 `--brand` 语义不同的本地色阶，强改会破坏 mind 的 gold/soft 派生且无功能收益。`--accent` 仅作为学科本地实现细节或全局顶栏色存在，不与 `--brand` 并列。

**hero 角部光晕规范（必须遵守）**：

- `.hero::after` 的 `radial-gradient` **禁止写死金色**（历史遗留 `rgba(199,154,58,0.34)`），必须跟随本学科点缀金：`color-mix(in srgb, var(--gold, #c79a3a) 34%, transparent)`。
- 该光晕共 **5 处**定义，改动需同步：共享规则 `src/core/ui/ui.css` 的 `.subject-root .hero::after`（econ / mind / physics / chem / mgmt 复用），以及 `thought` / `life` / `earth` 各自 `base.css` 与 `dynasty/dynasty.css` 里的同名覆盖规则。

## 4. 学科实现范式

### FULL 学科（dynasty / econ / mind / thought / earth / life）

- 自带 `template.ts`（HTML 骨架，含 `data-i18n` 文案键）、`main.ts` / `index.ts`（渲染 + 交互）、`styles/{base,components,tokens}.css`。
- 内容数据在 `public/<key>-data/data/*.json`（如 `overview.json`、`sources.json`）。
- 通常含：搜索框、模块筛选、refs / 来源区、详情面板（语言与主题由顶栏统一切换，仅中华王朝在 hero 另留按钮）。

#### 共享框架层 `src/core/subject/`（earth / life / thought / econ 单一事实源）

这四科的「框架」已上移为共享层，学科侧文件退化为 re-export shim，**改横切逻辑只动共享层一处**：

- `types.ts`：`Lang / LObj / SourceRef / DetailSection / DetailPayload / OverviewFile / SearchEntry / ModuleDef / ModuleRender / AppApi` 等契约。学科 `core/types.ts` = `export * from core/subject/types`。
- `dom` 复用既有 `src/core/ui/dom.ts`（学科 `core/dom.ts` = re-export）。
- `app.ts`：服务定位器 `provideApp/app()`（内嵌时同时只有一个学科挂载，boot 重新 provide，共享单例安全）。
- `i18n.ts` / `detail.ts` / `related.ts` / `theme.ts`：**工厂返回实例**（`createSubjectI18n/L`、`createSubjectDetail`、`createRelated`、`createSubjectTheme`）。学科 shim 用自己的 `wordbook/data/dom/app` 各实例化一份 → `lang`/`root`/`table` 状态独立，杜绝跨科串扰。i18n 的 `en`/`zh` 键对齐由泛型约束保留（en 缺键在 shim 传入处编译报错）。
- `appKit.ts`：`createSubjectApp(cfg)` 抽取 `main.ts` 的编排逻辑（模块切换 / 首页 KPI / refs / footer / mail / 搜索 / 深链 / 语言·主题联动 / 服务定位）。学科 `main.ts` 退化为装配 `createSubjectApp({...})` 并 `export { boot, activate, setHistoryUpdate }`。学科差异经 `config.logTag` + `hooks`（`beforeInit` / `afterRender` / `onLangChangeExtra`）承载，例：thought 用 `afterRender` 注入总览图、econ 用 `beforeInit` 注入共享 ui 的 `setI18n/setDataBase` 且 `initSearch` 走选项对象适配器。

**例外**：`mind` 是另一代框架（`ListModule` / `openDetailGlobal`、`DetailView`/`RefSource` 契约、`el` 为「查询」语义、自带 `loadJson`），**不并入** `createSubjectApp`；仅复用等价的 `esc`。`dynasty` 走自包含脚本注入，独立于本框架层。

### LIGHTWEIGHT 学科（physics / chem / mgmt）

- `index.ts` 调用 `createSubject(cfg)`（`src/subjects/subjectKit.ts`），`cfg` 来自 `data.ts`（`SubjectConfig`：`heroTitle / intro / modules / refs`）。
- 通用渲染器已提供：hero（标题含「中文 · English」+ 一段导语）、KPI、模块导航、模块标题（直接用共享 `.mod-head`，居中标题，不带计数）、卡片网格、详情弹层、搜索框、来源区、footer。
- KPI 首屏约定：**除中华王朝外，每科 hero 的 KPI 固定 4 个**（移动端 `.kpis` 为两列，4 个正好两行；更多会把搜索框与模块卡顶出首屏）。全量分类统计放 `overview.json` 的 `counts`，`kpis` 只挑最有辨识度的四项（如 econ：概念 / 词典 / 发展史 / 骗局与泡沫）。`links:check` 对超过 4 项告警；physics/chem/mgmt 例外——它们的 `overview.json` 是 `data:export` 产物，hero KPI 由 `subjectKit` 的 `kpisInner()` 现算。
- 新增 / 调整 physics/chem/mgmt **优先改 `data.ts`**，无需动模板；需要新交互能力时再扩展 `subjectKit.ts`。
- 详情面板已渲染 `related`（仅 mgmt 的 item 有此字段）：`subjectKit` 的 `openDetail` 把 id 跨同科全部模块解析成芯片（`.detail-rel` + `.rel-chips`，解不到的丢弃），点击先关面板、跨模块时先 `selectModule` 再开新详情。样式全走共享 `ui.css`（容器本就是 `.detail-root#subDetail`，淡入靠 `.detail-root.open`），**无需新增 CSS**；physics/chem 无此字段则关联区自然不出现。

## 5. 修改约束（重要）

- **零框架**：不要引入 React/Vue 等框架或打包型依赖；保持纯 DOM + TS。
- **不要重复造基建**：i18n / theme / 路由只用 `src/core` 的，不要各 subject 内再写一套。
- **双语同步**：新增可见文案要同时给 `zh` 与 `en`（用 `LStr` / `data-i18n` 机制），不要只写中文。
- **全局切换键**：主题 / 语言切换由 `layout.ts` 的全局 `.lang-btn` / `#themeBtn` 提供，所有学科共用，**不要**在学科内重复渲染同语义的切换按钮（会造成重复 / 冲突）；如学科需视图内按钮，使用独立 class / id。
- **样式隔离**：学科样式用各自根 class（如 `.physics-root` / `.sub-wrap`）作用域隔离；切换视图时 `main.ts` 会清理 `app` 的 `subject-*` class 防止串屏。
- **禁止 `<a>` 套 `<a>`**（历史约束，卡片可点击用 `::after` 覆盖实现）。

## 6. 如何新增一个学科

1. 在 `src/core/subjects.json` 追加学科对象（含 `key / zh / en / emoji / subZh / subEn / descZh / descEn / repo / line / integrated / statusZh / statusEn / tagsZh / tagsEn` 等）；`projects.ts` 会自动 import。若需类型化 JSON import，`tsconfig.json` 已开 `resolveJsonModule`。
2. 在 `src/main.ts` 注册 `import` + `mount` 分发（参考现有 `physics` / `chem` 分支）。
3. 选择范式：
   - **轻量（推荐起步）**：新建 `src/subjects/<key>/index.ts` + `data.ts`，`createSubject(cfg)` 驱动；内容写在 `data.ts` 的 `modules`。
   - **完整**：优先接 `src/core/subject/appKit` 的 `createSubjectApp`（照抄 earth/life 的 `main.ts` 装配 + 各 `core/*` shim，仅换 `wordbook`/`MODULES`/`data` 目录/`logTag`），新学科即免费获得统一抽屉 / i18n / 主题 / 编排；只有与 earth 范式不兼容时才自带独立 `main.ts`（如 mind / dynasty）。
4. 内容数据放 `public/<key>-data/data/*.json`（若适用）。
5. 同步更新 `readme.md` 的学科清单与首页（如有静态列表）；新增学科后重跑 `npm run gen:sitemap && npm run gen:geo`（或直接 `npm run build:ssg`）以更新 GEO 与预渲染 ROUTES。
6. 本地 `npm run dev` 验证，提交前 `npm run verify && npm run build:ssg` 确保门禁与构建通过。

## 7. GEO 抓取资产・数据重建·CI 门禁（维护约定）

- **GEO 两层**：站点根 hub（`public/llms*.txt` / `robots.txt` / `sitemap.xml`）与 per-subject（`public/<key>-data/*`）；均**由脚本生成、勿手改**。域名统一为 `https://minosie.github.io/wanwu-hub/`（与 Vite `base=/wanwu-hub/` 一致）。
- **生成器**：`scripts/gen-sitemap.mjs`（爬 `public` 出全量 URL）、`scripts/gen-geo.mjs`（thought/earth/life 三科 + physics/chem/mgmt 导出产物的 per-subject GEO + 根 hub）；`build:ssg` 已前置 `gen:geo && gen:sitemap`，防产物陈旧。
- **派生索引**：改学科源数据后需 `npm run index:rebuild`（scaffold 用 `s/build-index.mjs <subject>`、econ 用 `s/build-econ-index.mjs`、dynasty 用 `dynasty:build-search`）。新增 builder 必须对既有 committed 输出 `git diff` 为 0（逐字节忠实）方可采信。反例已踩过一次：econ 某事件改名后未重建索引，`search.json` / `related.json` 里长期留着旧标题（门禁查不出，只有重跑 builder 才暴露），因此**动过源数据就把 `index:rebuild` 当作收尾必做项**。
- **语言判定优先级**：`?lang=` > `localStorage.lang` > `navigator.language`，三处实现必须保持一致（`index.html` 防闪烁启动脚本、`src/core/i18n.ts` 的 `detect()`、各 FULL 学科 `src/subjects/<s>/src/core/i18n.ts` 的 `detectLang()`）。`<html lang>` 与 `data-lang` 只由 `index.html` 启动脚本和 `setLang()` 写，学科 `initLang()` 只更新模块内语言、不写属性；因此任何一处优先级写错都会造成“内容是英文、但 `<html lang="zh-CN">`”的错误声明（影响阅读器/SEO）。直链 `?lang=` 只读不写 `localStorage`，不得覆写访客的长期偏好。
- **门禁**：`npm run verify` = `typecheck` + `lint:ci` + `check:json`（全量 JSON）+ `links:check`（`scripts/check-links.mjs`：related 死链 / 双语成对 / 来源条目 `label`·`type` 双语成对 / 英文字段混中文 / 派生索引覆盖 / `overview` 计数）+ `data:check`（`scripts/export-data.mjs --check`，physics/chem/mgmt 导出防漂移）+ `dynasty:validate` + `dynasty:check-i18n` + `chem:validate`；`.github/workflows/ci.yml` 在 PR/push 到 main 时跑 `verify` + `build`，任一失败即阻断（早于 deploy）。
- **chem 专有三道闸（写入 `src/subjects/chem/data.ts` 后必跑）**：`npm run chem:validate`（已在 `verify` 链里，默认扫全库、可跟模块名）逐条校方程式原子+电荷守恒（解析器覆盖半反应 `M − ne⁻ →`、变系数 `x`/`n`、水合点 `·xH₂O`、结构式 `= ≡`、电子 `2e⁻`）、双语字段结构、`subs` role、SVG 标签配对与 viewBox 越界、`detail` 禁含 markdown 标记与错字巡检串，并自带 MUST_FAIL / MUST_PASS 反向对照（脚本自身不报错就等于没在工）；`npm run chem:stats` 打印内容实测账（条目数、无 `detail`、`detail` 长短、方程式/`subs`/SVG 计数）；`npm run chem:smoke [模块名…]` 是浏览器冒烟，自己起/关 `vite preview --port 4399 --strictPort`，中英 × 明暗四组合逐条点开，断言期望值全部从 `public/chem-data/data/*.json` 推导而非硬编码（需本机 Chrome，所以故意不进 `verify`）。`detail` 经 `esc()` 渲染进单个 `<p>`，**不支持换行/HTML/markdown**，纯表格内容必须走内联 `figure` SVG。**两道闸的次序约定**：`chem:smoke` 自己起的是 `vite preview`，服务的是 `dist/` 产物，所以 `data:export` 之后必须先 `npm run build` 再冒烟，否则新增的正文在旧产物里根本不存在，会成片假报「详情正文未渲染」（已踩过一次：25 条 fail=100，build 后归零）；同理，临时脚本与临时 JSON 不要落在仓库根目录，`biome check` 会把它们计入 `lint:ci` 而直接弄挂 `verify`（`dist/` 在 `.gitignore` 里、又被 `vcs.useIgnoreFile` 排除，且 `vite build` 会清掉，是临时工场的安全位置）。**交叉引用的验收口径**：中文「…」指针必须与导出 JSON 的 `term` 逐字相等，英文 `(see …)` 必须与 `termEn` 逐字相等；校 `termEn` 的脚本不能按 ` and ` 切分（大量合法条目名内含 and / & / 逗号 / 冒号，如 `Combustion and Firefighting`、`Separation and Purification: Method Matched to Apparatus`），而要把全部 `termEn` 按长度降序做贪心匹配，否则既误报真引用、又漏报多写一个词的假引用（实例：`term` 「化学平衡状态」的 `termEn` 只是 `Chemical Equilibrium`，而 `Hall–Héroult` 用的是 en-dash 不是连字符）。
- **代码格式与静态检查统一由 Biome 负责**（配置 `biome.json`，`@biomejs/biome` 入 `devDependencies`；**本仓从未有 ESLint，也不需再引入**）。三个入口：`npm run lint` 看全量诊断、`npm run lint:fix` 一键修正、`npm run lint:ci` 是门禁口径（= `biome check --diagnostic-level=error .`，只让 error 级阻断，避免上百条 warn 淹没真问题）。格式化口径：lineWidth 80、2 空格、双引号、尾逗号、LF；**唯一例外是 `src/subjects/mind/**` 用单引号**（该树移植自独立项目，1436 处单引号 vs 699 处双引号，改全局风格会制造整树噪音）。两处非默认选项有原因：`quoteProperties: "preserve"` 保住 `scripts/dynasty/*` 里 `"思想·文人"`、`"航海·探索"` 这类含间隔号的中文键引号（Biome 默认的 `as-needed` 会摘掉引号并与本仓既有排版冲突）；**`assist.organizeImports` 刻意关闭**——本仓 import 顺序承载模块求值顺序（各学科 `index.ts` 先引 `template`/CSS 再引 `main`），自动重排会挪动副作用顺序，收益不抵风险。
- **lint 用 `recommended` 预设，只降级一条**：`suspicious/useIterableCallbackReturn` → `warn`（`els.forEach(el => el.classList.toggle(x))` 这种「回调返回值被丢弃」全仓 63 处、集中在移植树，逐处改写语义风险大于收益）。其余 warn / info 不阻断，但 `npm run lint` 每次可见。**CSS 的两条刻意写法已按目录豁免**：`overrides` 对 `src/subjects/**/*.css` 关掉 `noImportantStyles` 与 `noDescendingSpecificity`（学科样式靠 `.xxx-root` 前缀分层 + 少量 `!important` 完成作用域覆盖，逐处改写会引入视觉回归风险）；`src/core/ui/ui.css` 里 `prefers-reduced-motion` 那两处 `!important` 则用就地 `/* biome-ignore lint/complexity/noImportantStyles: … */` 抑制，因为那是无障碍兜底、不能去掉优先级，所以规则在 hub 侧仍然生效。当前存量 155 warnings / 53 infos（大头：`useIterableCallbackReturn` 63、`noExplicitAny` 29、`noNonNullAssertion` 29、`useOptionalChain` 18；`noUnusedImports` 15 与 `noGlobalIsNan` 3 已清零）。**测量口径有个坑**：`biome check --only=<rule>` 会把该规则强制打开（配置里设成 `off` 也会被改回 error/warn），因此判断某条规则是否真被豁免不能靠 `--only`，要看完整 `check` 的规则汇总表（或对照去掉 override 前后的总数差）。另：`noUnusedImports` / `noGlobalIsNan` 的修复属于 **unsafe fix**，`lint:fix` 不会动它们，需 `--only=<rule> --write --unsafe` 限定单条规则执行，并以 `typecheck` 作为“删错的 import”的兜底。**`biome.json` 的 `files.includes` 屏蔽部分不得交给 Biome**：`public`（学科数据与 GEO 资产的排版由 `fmt:json` / `jsonStyle.mjs` / `gen:geo` / `dynasty:build-*` 负责，展开成上千行噪音并破坏按行定位键的批量脚本）、physics/chem/mgmt 的 `data.ts`（内联 `term: { zh, en }` 词条表，且是 `export-data.mjs` 的解析对象）、`**/*.html`（Biome 2 的 HTML formatter 会重排 `index.html`）。`*.md` 不属 Biome 语言范围，中文排版交给作者；`node_modules` / `dist` 由 `vcs.useIgnoreFile` 跟 `.gitignore` 拿掉。新增依赖固定排版的数据类文件，同步往 `files.includes` 加一条。IDE 请用工作区 Biome（`.vscode/settings.json` 已配），否则 IDE 与 CLI 版本不一致会来回重排。
- **`links:check` 默认覆盖 earth / life / thought / physics / chem / econ / mind / mgmt 八科**（dynasty 走自己的 `dynasty:validate`）。两点例外要记住：① mind 的 `overview.json` 是早期移植的旧 schema（`kpis[].file/titleKey/count`、无 `counts`），因此首屏分类计数校验对它自动跳过——mind 也没有 `search.json`/`related.json`（搜索为客户端现建），派生索引校验同样触不到；② `id` 唯一性只豁免 physics/chem/econ/mgmt（以模块为命名空间），mind 的 `related.ts` 用扁平 `Map` 按 id 注册，跨模块重名会**静默覆盖**跳转目标，所以 mind 必须保持 id 全局唯一。
- **语言 / 主题状态源**：只允许顶栏（`src/core/layout.ts`）持有状态，学科 hero 内不放语言/主题按钮，新增学科不得在视图内自写 `setLang`/主题分支。唯一例外是 dynasty：它保留 hero 内的两枚按钮，由 `src/core/viewControls.ts` 的 `bridgeViewControls(root)` 在捕获阶段接管。顶栏控件样式必须锁在 `.toolbar` 作用域内，否则裸 `.theme-btn` / `.lang-btn` 会泄进学科内容。
- **品牌与分析**：根 `favicon.svg` / `og-cover.svg` 为 hub 风格并在 `index.html` 接线（`<link rel=icon>` + `og:image`）；百度统计内联于 `index.html` `<head>`。
