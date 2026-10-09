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
- `projects.ts`：`PROJECTS[]`（8 学科元信息）+ `statusLabel()`。

## 3. Design Tokens（CSS 变量）

基础变量在 `index.html` 的 `:root`（暗 / 亮双主题通过 `[data-theme]` 切换）：

| 变量 | 用途 |
|---|---|
| `--bg` | 页面背景 |
| `--card` | 卡片 / 面板背景 |
| `--text` | 主文字 |
| `--muted` | 次要 / 说明文字 |
| `--accent` | 强调色（各学科的基调色，由 `style="--accent:..."` 注入根节点） |
| `--teal` | 强调色（青） |
| `--border` | 边框 / 分割线 |

各 FULL 学科在 `src/subjects/<key>/src/styles/tokens.css` 进一步覆盖 `--link / --shadow / --faint / --card` 等；physics/chem 复用 `subjectKit.css`，由 `createSubject` 注入 `--accent`。

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

1. 在 `src/core/projects.ts` 的 `PROJECTS[]` 追加元信息（含 `key / zh / en / integrated / statusZh` 等）。
2. 在 `src/main.ts` 注册 `import` + `mount` 分发（参考现有 `physics` / `chem` 分支）。
3. 选择范式：
   - **轻量（推荐起步）**：新建 `src/subjects/<key>/index.ts` + `data.ts`，`createSubject(cfg)` 驱动；内容写在 `data.ts` 的 `modules`。
   - **完整**：复制某 FULL 学科结构（`template.ts` + `main.ts` + `styles/`），适配自己的数据与模块。
4. 内容数据放 `public/<key>-data/data/*.json`（若适用）。
5. 同步更新 `readme.md` 的学科清单与首页（如有静态列表）。
6. 本地 `npm run dev` 验证，提交前 `npm run build:ssg` 确保构建通过。
