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
│   │   └── projects.ts     # 8 个学科元信息（PROJECTS[]）+ 状态标签
│   ├── shell/home.ts       # 首页：学科卡片网格
│   ├── main.ts             # 入口：初始化 i18n/theme、路由分发到各 subject.mount
│   └── subjects/
│       ├── dynasty/ econ/ mind/ thought/ earth/ life/   # FULL 学科
│       │   ├── template.ts + main.ts/index.ts + styles/{base,components,tokens}.css
│       │   └── public/<key>-data/data/*.json 为内容数据
│       ├── physics/ chem/  # LIGHTWEIGHT 学科
│       │   └── index.ts → createSubject(subjectKit) + data.ts
│       ├── subjectKit.ts    # 轻量学科通用渲染器（hero+KPI+模块卡+详情+搜索+来源）
│       └── soon.ts          # 未接入学科的兜底占位页
├── public/<key>-data/data/ # 各学科内容 JSON（overview.json / sources.json 等）
├── s/prerender.mjs         # SSG 预渲染（puppeteer）
└── .github/workflows/deploy.yml  # GitHub Pages 自动部署
```

### 两种学科实现范式

| 类型 | 学科 | 实现 | 能力 |
|---|---|---|---|
| **FULL** | dynasty / econ / mind / thought / earth / life | 各自 `template.ts` + `main.ts` + 独立 CSS | 搜索 / 筛选 / refs / 详情 / 视图内主题·语言切换 |
| **LIGHTWEIGHT** | physics / chem | `subjectKit.ts` 的 `createSubject` 配置驱动 | hero + KPI + 模块卡 + 详情 + 搜索 + 来源区（复用通用渲染器） |

> 主题与语言切换由 `layout.ts` 的**全局顶栏**统一提供（`.lang-btn` / `#themeBtn`），所有学科共用，无需学科内重复实现。

## 本地预览

```bash
npm install
npm run dev          # 开发服务器（Vite）
npm run build        # 生产构建到 dist/
npm run preview      # 预览构建产物
npm run build:ssg    # vite build + puppeteer 预渲染（生成静态 HTML，利于 SEO/首屏）
```

dynasty 另有专用数据构建脚本：`npm run dynasty:validate` / `dynasty:build-search` / `dynasty:rebuild` 等（见 `package.json`）。

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
