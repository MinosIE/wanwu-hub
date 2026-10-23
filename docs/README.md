# 开发与内容贡献指南 · wanwu-hub

本目录补充 `readme.md` 与 `agent.md`，面向需要**扩展学科内容**或**改动渲染器**的开发者 / 协作者。

## 1. 本地环境

```bash
npm install
npm run dev          # 开发（Vite，带 HMR）
npm run build        # 生产构建 → dist/
npm run build:ssg    # 构建 + puppeteer 预渲染（静态 HTML，利于 SEO/首屏）
```

类型检查：`npm run typecheck`（`tsc --noEmit`）。
数据校验：`npm run verify` = typecheck + `check:json`（全量 JSON）+ `links:check`（`scripts/check-links.mjs`：related 死链 / 双语成对 / 英文字段混中文 / 派生索引覆盖 / `overview` 计数）+ `data:check`（physics/chem 导出防漂移）+ dynasty 校验。
机器可读导出：physics/chem 的 `data.ts` 是单一真相源，`npm run data:export` 用 esbuild 转译并导出为 `public/<x>-data/data/*.json`（中英拆为 `字段` + `字段En`，与中文相同的 `*En` 省略）；改 `data.ts` 后必须重跑，否则 `data:check` 失败。
JSON 排版：`npm run fmt:json [学科…]`（`--check` 只报告），与导出器共用 `scripts/jsonStyle.mjs`（2 空格、≤80 列内联、不转义中文）。
CI：`.github/workflows/ci.yml` 在 PR / push 到 main 时跑 `verify` + `build`（任一失败即阻断，早于 deploy）。

## 2. 共享基建（不要重复造）

所有学科共用 `src/core/`：

- `i18n.ts`：`getLang() / setLang() / onLangChange()` + `L(o)`（取 `{zh,en}` 当前语言值）。
- `theme.ts`：`getTheme() / toggleTheme() / onThemeChange()`。
- `router.ts`：`parse() / navigate() / onRoute()`（hash 路由）。
- `layout.ts`：顶栏（**全局**主题 / 语言切换）+ footer。
- `subjects.json`：**学科清单唯一真相源**；`projects.ts` 与 `gen-sitemap.mjs` / `gen-geo.mjs` / `prerender.mjs` 均从此读取。
- `projects.ts`：`import subjects.json` → `PROJECTS[]` + `statusLabel()`。
- `dataKit.ts`：`createDataLoader(baseDir)` 工厂（dataUrl/fetchData/peekData），各 FULL 学科 `data.ts` 委托它，勿再拷贝。

## 3. 学科范式

### 3.1 FULL 学科（dynasty / econ / mind / thought / earth / life）

结构：`template.ts`（HTML 骨架 + `data-i18n` 文案键）+ `main.ts`/`index.ts`（渲染/交互）+ `styles/{base,components,tokens}.css`。
内容数据：`public/<key>-data/data/*.json`（`overview.json`、`sources.json` 等）。
适合：需要自定义布局、搜索、筛选、来源区的学科。

### 3.2 LIGHTWEIGHT 学科（physics / chem / mgmt）

结构：`index.ts` 调用 `createSubject(cfg)`（`src/subjects/subjectKit.ts`），`cfg` 来自 `data.ts`。
**调整 physics/chem/mgmt 优先改 `data.ts`**，一般无需改模板。

#### `SubjectConfig` 数据格式

```ts
export const physicsData: Omit<SubjectConfig, "rootClass" | "accent"> = {
  heroTitle: { zh: "万物物理", en: "Physics of Everything" }, // 中文模式渲染「中文 · English」
  intro: { zh: "…", en: "…" }, // hero 内唯一一段导语
  modules: [
    {
      key: "concepts",
      icon: "⚛️",
      title: { zh: "核心概念", en: "Core Concepts" },
      items: [
        {
          id: "newton-laws",
          icon: "📐",
          term: { zh: "牛顿运动定律", en: "Newton's Laws" },
          level: 1, // 可选，显示 L1 徽标
          value: { zh: "F=ma", en: "F=ma" }, // 可选，卡片上显示数值
          oneLiner: { zh: "…", en: "…" },
          detail: { zh: "…", en: "…" }, // 详情面板
          example: { zh: "…", en: "…" }, // 详情面板示例
          tags: [{ zh: "经典力学", en: "Classical" }],
          related: ["momentum", "energy-conservation"], // 可选，指向同科其他条目 id（mgmt 用；physics/chem 无此字段）
        },
      ],
    },
  ],
  refs: [
    // 可选：来源区
    {
      label: { zh: "《费曼物理学讲义》", en: "Feynman Lectures" },
      url: "https://…",
      type: { zh: "教材", en: "Textbook" },
    },
  ],
};
```

字段说明：

- `term` / `oneLiner` / `detail` / `example` / `title` / `heroTitle` 等文案字段均为 `LStr`（`{ zh, en }`），**双语必须同步**。
- `refs[].type` 为可选项，渲染为类型角标（教材 / 著作 / 机构 / 科普…）。
- `icon` 用 emoji 即可。

#### 新增一个 physics/chem 条目

1. 在 `src/subjects/<key>/data.ts` 对应 `module.items` 追加对象（复制上面结构）。
2. 保证 `id` 在该 module 内唯一（用于深链 `#/subject/<key>/<module>/<id>`）。
3. `npm run dev` 验证渲染与中 / 英切换。

#### 新增一个模块

在 `modules` 数组追加 `{ key, icon, title, items: [] }`，`key` 全局唯一即可。

#### 新增来源（refs）

在 `SubjectConfig.refs` 追加 `{ label, url?, type? }`；渲染器会自动在 footer 上方显示「主要参考资料与数据来源」。

## 4. 样式与主题

- 基础变量在 `index.html :root`（`--bg/--card/--text/--muted/--accent/--teal/--border`），明暗主题通过 `[data-theme]` 切换。
- FULL 学科在 `tokens.css` 覆盖 `--link/--shadow/--faint/--card` 等。
- LIGHTWEIGHT 学科样式在 `src/subjects/subjectKit.css`，由 `createSubject` 注入 `--accent`。
- 新增样式请作用域到学科根 class，避免串屏。

## 5. 部署

GitHub Pages：`push` 到 `main` 触发 `.github/workflows/deploy.yml`（`npm run build:ssg` → 部署）。Vite `base` 为 `/wanwu-hub/`。

## 6. 派生数据与 GEO 生成

- **派生索引重建**（改源数据后必须重跑）：`npm run index:rebuild` 一次重建全部——scaffold 三科（earth/life/thought）走 `s/build-index.mjs <subject>`，econ 走 `s/build-econ-index.mjs`（内含 17 模块 field→摘要映射），dynasty 走 `npm run dynasty:build-search`。产物为 `public/<key>-data/data/{search,related}.json`；mind 无派生索引。验证纪律：新 builder 对既有 committed 输出 `git diff` 应为 0。新增分类时记得往 `s/build-index.mjs` 的 `EXTRA` 规格表补一行，否则 `links:check` 会以「派生索引覆盖」报错阻断。
- **语言 / 主题单一状态源**：顶栏（`src/core/layout.ts`）是全站唯一切换入口，学科 hero 内不再放语言/主题按钮（新增学科也不得在视图内自写 `setLang` / 主题分支）。例外是中华王朝——它的深色渐变 hero 保留了两枚玻璃胶囊按钮，由 `src/core/viewControls.ts` 的 `bridgeViewControls(root)` 在捕获阶段接管点击（改调 core 状态，学科自身监听器不再执行），学科再通过挂载时的 `onLangChange` / `onThemeChange` 桥接重渲染。另：顶栏自身的样式必须写在 `.toolbar` 作用域下，裸 `.theme-btn` / `.lang-btn` 会泄进学科内容。
- **GEO 生成**：`npm run gen:sitemap`（爬 `public` 出根 `sitemap.xml`）与 `npm run gen:geo`（thought/earth/life 三科 + physics/chem 导出产物的 per-subject GEO + 根 hub `llms*.txt`/`robots.txt`/`sitemap.xml`）。根 hub 与 per-subject 两层 GEO 均**脚本生成、勿手改**；`build:ssg` 已前置这两步。域名统一 `https://minosie.github.io/wanwu-hub/`。
- **预渲染**：`s/prerender.mjs` 的 ROUTES 从 `subjects.json` 派生（首页 + 全部 integrated 学科），新增学科自动纳入。

## 7. 品牌与分析（`index.html`）

- 根品牌素材 `public/favicon.svg` / `public/og-cover.svg`（hub 风格）由 `index.html` 通过 `<link rel="icon">` + `og:image` 引用；Vite 构建自动将 `/favicon.svg` rebase 为 `/wanwu-hub/favicon.svg`。
- 百度统计片段内联在 `index.html` 的 `<head>`（`hm.baidu.com/hm.js?<ID>`），修改时保留其在防闪主题脚本之后、`</head>` 之前。
