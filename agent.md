# Agent 规格 · wanwu-hub

面向 AI Agent / 协作者的项目规格文档。改动前请先通读本文件，保持与现有约定一致。

## 1. 概览

- **角色**：「万物通识」系列统一站（聚合入口 + 各学科内容）。
- **技术栈**：**Vite + TypeScript + 零 UI 框架**（纯 DOM 渲染，无 React/Vue）。
- **入口文件**：`index.html`（外壳：顶栏 / 首页 / footer + 内联全局 `<style>`）+ `src/main.ts`。
- **默认归属**：GitHub 组织 / 用户 `MinosIE`，外链形如 `https://github.com/MinosIE/<repo>`。

## 2. 目录与模块

关键共享模块在 `src/core/`：

- `i18n.ts`：`getLang() / setLang() / onLangChange()` + `L(o)`（取 `{zh,en}` 当前语言值）。新增文案优先走各学科的 `i18n.json` / `i18n.ts` 字典。
- `theme.ts`：`getTheme() / toggleTheme() / onThemeChange()`。
- `router.ts`：hash 路由（`parse() / navigate() / onRoute()`）。
- `layout.ts`：顶栏（含全局 `.lang-btn` / `#themeBtn` 主题·语言切换）与 footer。
- `subjects.json`：**学科清单唯一真相源**（8 学科元信息数组）；`projects.ts`（TS）与 `gen-sitemap.mjs` / `gen-geo.mjs` / `prerender.mjs`（node）均从此读取，**不要**再在别处硬编码学科清单。
- `projects.ts`：`import subjects.json` → `PROJECTS[]`（收窄断言 `as Project[]`）+ `statusLabel()`；`Project` 接口在此定义。
- `dataKit.ts`：`createDataLoader(baseDir)` 工厂，提供 `dataUrl/fetchData/peekData`（带缓存）；各 FULL 学科 `data.ts` 仅委托它，**勿再拷贝一份 21 行 loader**。

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

各 FULL 学科在 `src/subjects/<key>/src/styles/tokens.css` 进一步覆盖 `--link / --shadow / --faint / --card` 等；physics/chem 复用 `subjectKit.css`，由 `createSubject` 注入本地 `--accent` 并桥接到规范契约 `--brand`（见 §3.1）。

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
- 本地令牌 + 别名桥：mind / physics / chem 内部沿用 `--accent` 系列（`--accent` / `--accent-2` / `--accent-strong` / `--accent-soft` 等本地多档色阶，其中 `--accent-2` 语义是「金」而非「主色」），但**必须**通过别名桥暴露规范契约：`--brand: var(--accent); --gold: var(--accent-2);`（见 `mind/src/styles/tokens.css`、`subjectKit.css`）。
- 因此不要为「统一命名」去重命名 mind / subjectKit 的 `--accent` 家族：它们是与 `--brand` 语义不同的本地色阶，强改会破坏 mind 的 gold/soft 派生且无功能收益。`--accent` 仅作为学科本地实现细节或全局顶栏色存在，不与 `--brand` 并列。

**hero 角部光晕规范（必须遵守）**：

- `.hero::after` 的 `radial-gradient` **禁止写死金色**（历史遗留 `rgba(199,154,58,0.34)`），必须跟随本学科点缀金：`color-mix(in srgb, var(--gold, #c79a3a) 34%, transparent)`。
- 该光晕共 **5 处**定义，改动需同步：共享规则 `src/core/ui/ui.css` 的 `.subject-root .hero::after`（econ / mind / physics / chem 复用），以及 `thought` / `life` / `earth` 各自 `base.css` 与 `dynasty/dynasty.css` 里的同名覆盖规则。

## 4. 学科实现范式

### FULL 学科（dynasty / econ / mind / thought / earth / life）

- 自带 `template.ts`（HTML 骨架，含 `data-i18n` 文案键）、`main.ts` / `index.ts`（渲染 + 交互）、`styles/{base,components,tokens}.css`。
- 内容数据在 `public/<key>-data/data/*.json`（如 `overview.json`、`sources.json`）。
- 通常含：搜索框、模块筛选、refs / 来源区、详情面板、视图内主题·语言切换。

### LIGHTWEIGHT 学科（physics / chem）

- `index.ts` 调用 `createSubject(cfg)`（`src/subjects/subjectKit.ts`），`cfg` 来自 `data.ts`（`SubjectConfig`：`heroTitle / heroSub / intro / modules / refs`）。
- 通用渲染器已提供：hero（标题含「中文 · English」）、KPI、模块导航、卡片网格、详情弹层、搜索框、来源区、footer。
- 新增 / 调整 physics/chem **优先改 `data.ts`**，无需动模板；需要新交互能力时再扩展 `subjectKit.ts`。

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
   - **完整**：复制某 FULL 学科结构（`template.ts` + `main.ts` + `styles/`），适配自己的数据与模块。
4. 内容数据放 `public/<key>-data/data/*.json`（若适用）。
5. 同步更新 `readme.md` 的学科清单与首页（如有静态列表）；新增学科后重跑 `npm run gen:sitemap && npm run gen:geo`（或直接 `npm run build:ssg`）以更新 GEO 与预渲染 ROUTES。
6. 本地 `npm run dev` 验证，提交前 `npm run verify && npm run build:ssg` 确保门禁与构建通过。

## 7. GEO 抓取资产・数据重建·CI 门禁（维护约定）

- **GEO 两层**：站点根 hub（`public/llms*.txt` / `robots.txt` / `sitemap.xml`）与 per-subject（`public/<key>-data/*`）；均**由脚本生成、勿手改**。域名统一为 `https://minosie.github.io/wanwu-hub/`（与 Vite `base=/wanwu-hub/` 一致）。
- **生成器**：`scripts/gen-sitemap.mjs`（爬 `public` 出全量 URL）、`scripts/gen-geo.mjs`（scaffold 三科 per-subject GEO + 根 hub）；`build:ssg` 已前置 `gen:geo && gen:sitemap`，防产物陈旧。
- **派生索引**：改学科源数据后需 `npm run index:rebuild`（scaffold 用 `s/build-index.mjs <subject>`、econ 用 `s/build-econ-index.mjs`、dynasty 用 `dynasty:build-search`）。新增 builder 必须对既有 committed 输出 `git diff` 为 0（逐字节忠实）方可采信。
- **门禁**：`npm run verify` = `typecheck` + `check:json`（`scripts/check-json.mjs` 全量 JSON）+ `dynasty:validate` + `dynasty:check-i18n`；`.github/workflows/ci.yml` 在 PR/push 到 main 时跑 `verify` + `build`，任一失败即阻断（早于 deploy）。
- **品牌与分析**：根 `favicon.svg` / `og-cover.svg` 为 hub 风格并在 `index.html` 接线（`<link rel=icon>` + `og:image`）；百度统计内联于 `index.html` `<head>`。
