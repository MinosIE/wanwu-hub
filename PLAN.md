# 收敛规划 · 万物通识系列统一站

> 目标：把 `index.html` 中链接的各子项目内容**全部收敛进 `wanwu-hub` 单一仓库/站点**，不再各自独立部署，形成"一个入口，看尽万物"的真正统一站。

---

## 1. 现状盘点

本地实际存在内容的子项目只有 3 个（`/Users/wedo/Study/` 下）：

| 项目 | 技术栈 | 数据 | 渲染 | 状态 |
| --- | --- | --- | --- | --- |
| `chinese-dynasty-timeline` | 纯静态（无构建） | `data/` 40 JSON | `scripts/` 10 .mjs | 已上线 GitHub Pages |
| `econ-everything` | 零框架 + Vite + TS | `public/` 20 JSON | `src/core`+`src/modules` | 已上线 GitHub Pages |
| `mind-everything` | 零框架 + Vite + TS | `public/` 12 JSON | `src/core`+`src/modules` | 本地有，未确认上线 |

`index.html` 里列的另外 5 个（thought / earth / life / physics / chem）**本地未找到目录**，远端可能仅有空仓库或尚无内容。

**重要结论**：econ/mind 已是"零框架 + Vite + 数据驱动 + 中英双语"的成熟模式，与 chinese 同构。收敛不是简单复制页面，而是统一工程、共享基建。

---

## 2. 收敛原则

1. **单一仓库、单一站点**：所有学科内容进入 `wanwu-hub`，旧子项目仓库收敛后归档。
2. **共享基建复用**：i18n（中/英）、明暗主题、布局、路由只写一份（`core`）。
3. **学科插件化**：每个学科 = 一个 `subjects/<name>/`，自带 `data/` + `modules/`，可插拔。
4. **保留既有能力**：双语、明暗主题、关键词导航（当前 `index.html` 已有）必须延续。
5. **零框架优先**：沿用 econ/mind 的"零框架 + Vite + TS"路线，不引入 React/Vue，降低体积与维护成本。

---

## 3. 推荐架构：统一 Vite 单站（零框架）

`wanwu-hub` 升级为 Vite 工程，当前导航页成为"壳（shell）"，各学科作为 subject 挂载。

### 推荐目录结构

```
wanwu-hub/
├── index.html              # 入口 shell（加载 src/main.ts）
├── package.json            # vite + typescript（沿用 econ/mind）
├── vite.config.ts
├── tsconfig.json
├── src/
│   ├── core/               # 共享基建（从 econ/mind 抽取合并）
│   │   ├── i18n.ts         # 双语字典 + 切换
│   │   ├── theme.ts        # 明暗主题 + localStorage
│   │   ├── router.ts       # 路径/hash 路由
│   │   └── layout.ts       # 顶栏/导航/卡片模板
│   ├── shell/
│   │   └── home.ts         # 首页：学科导航（即当前 index.html 内容）
│   └── subjects/
│       ├── dynasty/        # 原 chinese-dynasty-timeline
│       │   ├── data/       # 40 JSON
│       │   ├── modules/    # 渲染模块
│       │   └── main.ts
│       ├── econ/           # 原 econ-everything
│       │   ├── data/       # 20 JSON（来自 public/）
│       │   ├── modules/    # 来自 src/modules
│       │   └── main.ts
│       └── mind/           # 原 mind-everything
│           ├── data/
│           ├── modules/
│           └── main.ts
├── public/                 # 共享静态资源（favicon、og 等）
├── readme.md / agent.md / PLAN.md
```

### 入口/路由行为

- `/` 或 `#/` → 首页导航（学科网格，即现在的入口站）
- `/econ`、`/mind`、`/dynasty`（或对应 hash）→ 进入各学科内容视图
- 各 subject 复用 `core/layout`，顶部共享语言/主题切换

---

## 4. 备选方案（供决策）

| 方案 | 说明 | 取舍 |
| --- | --- | --- |
| **A. 统一 Vite 单站（推荐）** | 上述架构，单一工程、共享 core、subject 插件化 | 最统一、长期好维护；需一次性搭建工程 |
| **B. 纯静态多页（MPA）** | 保持无构建，每学科一个 `*.html` + 共享 `common.js/css` | 最简单、零构建；但 econ/mind 的 TS 需先编译/改 JS，复用差 |
| **C. Monorepo 多包** | wanwu-hub 为壳，各子项目仍为独立包 | 内容仍分散，不符合"收敛内容"诉求，不推荐 |

---

## 5. 分阶段路线图

- **阶段 0 — 规划确认**：本文档 + 下方决策点拍板。
- **阶段 1 — 搭建统一工程**：`wanwu-hub` 加 Vite/TS；抽取 `core`（i18n/theme/router/layout）；把当前 `index.html` 导航页迁移为 `shell/home.ts`。
- **阶段 2 — 迁入 econ**：最成熟，验证共享 core 能承载其 modules/data。
- **阶段 3 — 迁入 mind**：结构同 econ，低成本。
- **阶段 4 — 迁入 dynasty**：把纯静态 `data/` JSON 与 `scripts/` 逻辑转成同模式 subject。
- **阶段 5 — 补齐其余 5 学科**：thought/earth/life/physics/chem 按同一 `subject` 模板逐个补数据+module（目前本地无内容，需先产出）。
- **阶段 6 — 统一部署**：GitHub Pages 只部署 `wanwu-hub` 单站；归档旧子项目仓库（内容已迁入）。

---

## 6. 待你拍板的关键决策

> 这些决定影响目录结构与工作量，确认后我才进入阶段 1 的代码实施。

1. **工程形态**：采用方案 A（统一 Vite 单站，推荐）还是 B（纯静态 MPA）？
2. **路由方式**：path 路由（`/econ`）还是 hash 路由（`/#/econ`）？—— hash 对 GitHub Pages 免配置，推荐。
3. **部署策略**：收敛后是否**只保留 `wanwu-hub` 一个 GitHub Pages 站**，旧仓库归档/删除？还是暂时并存？
4. **收敛范围**：本轮先收敛本地已有的 3 个（dynasty/econ/mind），其余 5 个留接口后续补？还是现在就要把 5 个空壳也建好？
5. **原仓库处置**：内容迁入后，原 `econ-everything` / `mind-everything` / `chinese-dynasty-timeline` 仓库如何处理（保留归档 / 删除）？
6. **双语与主题**：确认沿用现有的中/英切换 + 明暗主题，并统一到 `core`（默认预期：是）。

---

## 7. 风险与注意

- econ/mind 的 TS 源码（core/modules）需合并去重，避免三份 i18n/theme 逻辑。
- chinese 是纯静态、无构建，迁入时需把 `.mjs` 逻辑改写成统一 `core` 调用的 module。
- 数据 JSON 格式三项目可能不一致，收敛时需对齐为统一 schema（或在各 subject 内保留自身格式 + 适配层）。
- 部署到 GitHub Pages 时，Vite `base` 需设为 `/wanwu-hub/`（或自定义域）。
