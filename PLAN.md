# 收敛规划 · 万物通识系列统一站

> 目标：把各子项目内容**全部收敛进 `wanwu-hub` 单一仓库 / 站点**，形成「一个入口，看尽万物」的真正统一站。
> 当前状态（2026-10）：**收敛已完成**——8 个学科全部 `integrated` 并统一进 `wanwu-hub`（单一 Vite 工程 + 单一 GitHub Pages 部署）。本文件保留作为历史背景与设计决策记录；后续待办见 `BACKLOG.md`。

---

## 1. 现状盘点（已收敛）

全部 8 个学科均已接入 `wanwu-hub`，由 `src/main.ts` 按 key 路由到各自 `mount`（`src/core/projects.ts`）：

| 学科 | key | 状态 | 实现范式 |
|---|---|---|---|
| 中华王朝 · 千年脉络 | dynasty | online | FULL（template + main + CSS） |
| 万物经济学 | econ | online | FULL |
| 万物心理学 | mind | online | FULL |
| 万物哲学 | thought | online | FULL |
| 万物地理 | earth | online | FULL |
| 万物生物 | life | online | FULL |
| 万物物理 | physics | wip（内容种子化） | LIGHTWEIGHT（subjectKit） |
| 万物化学 | chem | wip（内容种子化） | LIGHTWEIGHT（subjectKit） |

> 本地实际已有内容的子项目即上述 8 个，统一进 `wanwu-hub` 后旧仓库可归档。

---

## 2. 收敛原则（已落地）

1. **单一仓库、单一站点**：所有学科内容进入 `wanwu-hub`，旧子项目仓库收敛后归档。
2. **共享基建复用**：i18n（中 / 英）、明暗主题、路由只写一份（`src/core`）。
3. **学科插件化**：每个学科 = 一个 `subjects/<name>/`，可插拔。
4. **保留既有能力**：双语、明暗主题、关键词导航必须延续。
5. **零框架优先**：沿用 econ/mind 的「零框架 + Vite + TS」路线，不引入 React/Vue。

---

## 3. 架构（已采用：统一 Vite 单站）

`wanwu-hub` 升级为 Vite 工程，当前导航页成为「壳（shell）」，各学科作为 subject 挂载。详见 `readme.md` 架构图。

- `src/core/`：共享基建（i18n / theme / router / layout / projects）。
- `src/shell/home.ts`：首页学科导航。
- `src/subjects/<name>/`：各学科（FULL 或 LIGHTWEIGHT）。

### 入口 / 路由行为

- `/` 或 `#/` → 首页导航
- `#/subject/<key>` → 进入学科
- `#/subject/<key>/<module>/<id>` → 深链到具体条目

---

## 4. 两种实现范式（关键决策）

收敛过程中形成了**双轨**，需在后续明确走向：

- **FULL**：dynasty / econ / mind / thought / earth / life。自带 `template.ts` + `main.ts` + 独立 CSS，能力最完整（搜索 / 筛选 / refs / 详情 / 视图内切换）。
- **LIGHTWEIGHT**：physics / chem。用 `src/subjects/subjectKit.ts` 的 `createSubject` 配置驱动，复用通用渲染器（hero + KPI + 模块卡 + 详情 + 搜索 + 来源区）。

**待决策（见 `BACKLOG.md` §2）**：长期是「继续扩展 subjectKit 让轻量学科追平 FULL」还是「把 physics/chem 升级为 FULL 模板、收敛为单一范式」。这决定后续每个学科的维护成本。

---

## 5. 分阶段路线图（历史）

- 阶段 0 — 规划确认 ✅
- 阶段 1 — 搭建统一工程（Vite/TS + `src/core`）✅
- 阶段 2–4 — 迁入 dynasty / econ / mind ✅
- 阶段 5 — 补齐 thought / earth / life / physics / chem ✅（physics/chem 以 subjectKit 轻量范式接入，内容与功能待深化）
- 阶段 6 — 统一部署（GitHub Pages 单站）✅

---

## 6. 后续工作

收敛完成后的待办、优先级与跨科一致性缺口，统一见 **`BACKLOG.md`**（P0 含：物理/化学搜索·来源区补齐、文档重写；P1 含：subjectKit vs FULL 架构决策、内容深化；P2 含：测试/CI、体验设计）。
