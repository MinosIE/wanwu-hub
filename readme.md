# MinosIE · 万物通识系列（wanwu-hub）

> 一个入口，看尽万物 —— 系列聚合导航站 + 各学科内容站。

## 本仓库定位

`wanwu-hub` 是「万物通识」系列的**统一站**：既是聚合入口（首页导航 8 个学科），也是各学科内容的承载站。所有学科统一进本仓库，单一 Vite 工程构建、单一 GitHub Pages 部署。

技术栈：**Vite + TypeScript + 零 UI 框架**（沿用 econ/mind 的「零框架 + 数据驱动 + 中英双语」模式）。

## 架构

```
wanwu-hub/
├── index.html              # 外壳：顶栏(主题/语言切换)、首页、footer，内联全局 <style>
├── src/
│   ├── core/               # 共享基建
│   │   ├── i18n.ts         # 双语字典 + getLang/setLang/onLangChange + L() 取值
│   │   ├── theme.ts        # 明暗主题 + toggleTheme/onThemeChange
│   │   ├── router.ts       # hash 路由（#/subject/<key>[/<module>/<id>]）
│   │   ├── layout.ts       # 顶栏/导航/footer 外壳
│   │   ├── subjects.json   # 8 学科元信息「唯一数据源」（TS 与各脚本共享）
│   │   ├── projects.ts     # import subjects.json → PROJECTS[] + 状态标签
│   │   └── dataKit.ts      # createDataLoader 工厂（各 FULL 学科 data.ts 委托它）
│   ├── shell/home.ts       # 首页：学科卡片网格
│   ├── main.ts             # 入口：初始化 i18n/theme、路由分发到各 subject.mount
│   └── subjects/
│       ├── dynasty/ econ/ mind/ thought/ earth/ life/   # FULL 学科
│       │   ├── template.ts + main.ts/index.ts + styles/{base,components,tokens}.css
│       │   └── public/<key>-data/data/*.json 为内容数据
│       ├── physics/ chem/  # LIGHTWEIGHT 学科
│       │   └── index.ts → createSubject(subjectKit) + data.ts
│       ├── subjectKit.ts    # 轻量学科通用渲染器（hero+KPI+模块卡+详情+搜索+来源）
│       ├── _shared/          # scaffold 三科（earth/life/thought）共享 CSS
│       └── soon.ts          # 未接入学科的兜底占位页
├── public/<key>-data/data/ # 各学科内容 JSON（overview.json / sources.json 等）
├── public/<key>-data/      # 各学科 per-subject GEO（llms.txt / robots.txt / sitemap.xml）
├── public/{llms,robots,sitemap}.* # 站点根 hub GEO（由脚本生成，勿手改）
├── scripts/               # gen-sitemap.mjs / gen-geo.mjs / check-json.mjs / dynasty/*
├── s/                   # build-index.mjs（scaffold 派生索引）/ build-econ-index.mjs / prerender.mjs
├── s/prerender.mjs       # SSG 预渲染（puppeteer，ROUTES 读 subjects.json）
├── .github/workflows/deploy.yml  # GitHub Pages 自动部署
└── .github/workflows/ci.yml      # CI 门禁：verify + build
```

### 两种学科实现范式

| 类型            | 学科                                           | 实现                                        | 能力                                                         |
| --------------- | ---------------------------------------------- | ------------------------------------------- | ------------------------------------------------------------ |
| **FULL**        | dynasty / econ / mind / thought / earth / life | 各自 `template.ts` + `main.ts` + 独立 CSS   | 搜索 / 筛选 / refs / 详情 / 视图内主题·语言切换              |
| **LIGHTWEIGHT** | physics / chem                                 | `subjectKit.ts` 的 `createSubject` 配置驱动 | hero + KPI + 模块卡 + 详情 + 搜索 + 来源区（复用通用渲染器） |

> 主题与语言切换由 `layout.ts` 的**全局顶栏**统一提供（`.lang-btn` / `#themeBtn`），所有学科共用，无需学科内重复实现。

## 本地预览

```bash
npm install
npm run dev          # 开发服务器（Vite）
npm run build        # 生产构建到 dist/
npm run preview      # 预览构建产物
npm run verify       # 类型检查 + 全量 JSON 校验 + dynasty 数据/i18n 校验
npm run build:ssg    # gen:geo + gen:sitemap + vite build + puppeteer 预渲染（静态 HTML，利于 SEO/首屏）
```

常用数据 / 资产脚本（见 `package.json`）：

- `npm run gen:sitemap` / `npm run gen:geo`：重生站点根与 per-subject 的 `sitemap.xml` / `llms*.txt` / `robots.txt`（域名统一为 `https://minosie.github.io/wanwu-hub/`）；`build:ssg` 已自动前置这两步。
- `npm run index:rebuild`：一次重建全部学科派生索引（`search.json` / `related.json`）——scaffold 三科用 `s/build-index.mjs`、econ 用 `s/build-econ-index.mjs`、dynasty 用 `dynasty:build-search`。改源数据后需重跑。
- dynasty 另有专用数据构建脚本：`npm run dynasty:validate` / `dynasty:rebuild` 等。

## GEO 与抓取资产

面向搜索引擎 / AI 爬虫的静态资产分两层，**均由脚本生成、不要手改**：

- **站点根 hub**：`public/llms.txt` / `llms-en.txt` / `robots.txt` / `sitemap.xml`，由 `scripts/gen-geo.mjs` + `scripts/gen-sitemap.mjs` 产出（sitemap 覆盖首页 + 8 学科页 + 全部数据文件）。
- **per-subject**：`public/<key>-data/{llms.txt,llms-en.txt,robots.txt,sitemap.xml}`，scaffold 三科由 `gen-geo.mjs` 生成，econ/mind/dynasty 各自维护。
- 学科清单以 `src/core/subjects.json` 为唯一真相源：`projects.ts`（TS import）与 `gen-sitemap.mjs` / `gen-geo.mjs` / `prerender.mjs`（node 读取）四方共享，避免多处手写清单漂移。

## 品牌与分析

- 根品牌素材 `public/favicon.svg` / `public/og-cover.svg` 为「万物通识」hub 风格（地球脉络标记 + 青→蓝渐变）；`index.html` 通过 `<link rel="icon">` 与 `og:image` 引用（Vite 构建自动 rebase 到 `/wanwu-hub/`）。
- 百度统计代码内联在 `index.html` 的 `<head>`（站点 ID 在脚本 URL 中）。

## 路由

- `/` 或 `#/` → 首页学科导航
- `#/subject/<key>` → 进入某学科
- `#/subject/<key>/<module>/<id>` → 深链到某学科某模块的具体条目（physics/chem 已支持）

## 双语与主题

- 中 / 英双语：全局 `.lang-btn`（顶栏），状态存 `localStorage`；URL `?lang=en` 可强制英文。
- 明暗主题：全局 `#themeBtn`（顶栏），状态存 `localStorage`。
- CSS 变量在 `index.html :root` 定义基础色（`--bg/--card/--text/--muted/--accent/--teal/--border`），各 FULL 学科在 `tokens.css` 覆盖 `--link/--border/--shadow/--faint` 等。

## 部署

GitHub Pages：push 到 `main` 触发 `.github/workflows/deploy.yml`（`npm run build:ssg` → 上传产物 → 部署）。Vite `base` 为 `/wanwu-hub/`。

## 相关文档

- `agent.md`：Agent / 协作者规格（修改约束、新增学科流程）。
- `PLAN.md`：收敛规划（历史背景）。
- `BACKLOG.md`：可改进清单 / 待办（优先级排序）。
- `docs/`：开发指南与内容贡献指南。

仓库默认归属 GitHub 组织 / 用户 `MinosIE`。
