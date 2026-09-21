# Agent 规格 · wanwu-hub

面向 AI Agent / 协作者的项目规格文档。改动前请先通读本文件，保持与现有约定一致。

## 1. 概览

- **角色**：「万物通识」系列聚合入口导航站。
- **技术栈**：纯静态 HTML + 内联 `<style>` CSS，**无** JavaScript 框架、**无**构建步骤、**无**外部依赖。
- **入口文件**：`index.html`（单文件承载全部内容与样式）。
- **默认归属**：GitHub 组织/用户 `MinosIE`，外链形如 `https://github.com/MinosIE/<repo>`。

## 2. 目录结构

```
wanwu-hub/
├── index.html   # 入口页面（结构 + 样式 + 内容）
├── readme.md    # 人类可读的项目说明
└── agent.md     # 本文件（Agent 规格）
```

## 3. 设计 Tokens（CSS `:root` 变量）

| 变量 | 值 | 用途 |
| --- | --- | --- |
| `--bg` | `#0f1419` | 页面背景（深色） |
| `--card` | `#1a2028` | 卡片背景 |
| `--text` | `#e6e6e6` | 主文字 |
| `--muted` | `#9aa5b1` | 次要/说明文字 |
| `--accent` | `#d4a556` | 强调色（金色） |
| `--teal` | `#2dd4bf` | 强调色（青色） |
| `--border` | `#2a3441` | 边框/分割线 |

视觉风格：暗色主题、青→金渐变标题、卡片悬浮上浮 3px。

## 4. 页面区块结构

1. `<header>` — 标题 + slogan + 系列简介 + 统计（8 子项目 / 6 学科 / 2 命名主线）。
2. `<nav class="nav">` — 锚点快速导航（历史·脉络线 / 万物线）。
3. `#line-timeline` — 历史·脉络线项目网格。
4. `#line-wanwu` — 万物线项目网格。
5. `.note` — 维护说明。
6. `<footer>`。

## 5. 卡片数据模型

每个子项目对应一个 `.card`，字段如下：

| 字段 | 选择器 | 说明 |
| --- | --- | --- |
| emoji | `.card .emoji` | 学科图标（emoji） |
| 中文站名 | `.card h3` | 仅中文，作主标题 |
| 英文站名 | `.card .sub-en` | 英文/全称，muted 副标题 |
| 仓库名 + 状态 | `.card .repo` | 等宽字体；内嵌 `.status` 徽章 |
| 描述 | `.card .reason` | 一句话定位与内容规划 |
| 关键词 | `.card .tags > .chip` | 2–4 个内容关键词 |
| 跳转 | `a.btn.stretched-link` | 仓库链接，`target="_blank"` |

### 状态徽章

- `.status.online` — 已上线（青色）
- `.status.first` — 系列首作（金色，目前仅 `econ-everything`）
- `.status.soon` — 规划中（灰色；当前无使用，保留以备扩展）

## 6. 修改约束（重要）

- **禁止 `<a>` 套 `<a>`**：整卡可点击由 `.btn.stretched-link::after { position:absolute; inset:0 }` 覆盖实现。卡片内部**不要**再放其他 `<a>` 包裹整卡，否则 HTML 非法且点击行为异常。
- **新增项目**：复制一个现有 `.card` 块粘贴到对应主线 section，替换上述字段即可，样式自动套用。
- **链接 owner**：默认 `MinosIE`；若某仓库归属不同，仅改该卡片 `href`，不要全局替换。
- **保持纯静态**：不要引入打包工具、框架或外部 CDN 资源，维持"打开即用"。

## 7. 如何新增一个子项目

1. 在 `#line-timeline` 或 `#line-wanwu` 下粘贴一个 `.card` 块。
2. 填写 emoji / `h3` 中文 / `.sub-en` 英文 / `.repo` 仓库名 / `.status` 徽章 / `.reason` / `.tags` 关键词。
3. 将 `a.btn.stretched-link` 的 `href` 指向 `https://github.com/MinosIE/<repo>`。
4. 同步更新 `readme.md` 的子项目表格与顶部统计数字。
