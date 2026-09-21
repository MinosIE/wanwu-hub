# MinosIE · 万物通识系列（wanwu-hub）

> 一个入口，看尽万物 —— 系列聚合导航站。

## 本仓库定位

`wanwu-hub` 是「万物通识」系列的**聚合入口站**，汇总系列下所有子项目的导航，让用户一处抵达历史脉络与六大学科。

本仓库是一个**纯静态页面**（单个 `index.html`，内联 CSS，无构建步骤、无依赖）。

## 系列结构

系列沿两条命名主线展开：

| 主线 | 命名规则 | 示例 |
| --- | --- | --- |
| 历史 · 脉络线 | `[主题]-[形态]` | `chinese-dynasty-timeline` |
| 万物线 | `[主题]-everything` | `econ-everything` |

### 子项目

| 项目 | 仓库 | 主线 | 状态 |
| --- | --- | --- | --- |
| 中华王朝 · 千年脉络 | `chinese-dynasty-timeline` | 历史 · 脉络线 | 已上线 |
| 万物经济学 | `econ-everything` | 万物线（系列首作） | 已上线 |
| 万物心理学 | `mind-everything` | 万物线 | 已上线 |
| 万物哲学 | `thought-everything` | 万物线 | 已上线 |
| 万物地理 | `earth-everything` | 万物线 | 已上线 |
| 万物生物 | `life-everything` | 万物线 | 已上线 |
| 万物物理 | `physics-everything` | 万物线 | 已上线 |
| 万物化学 | `chem-everything` | 万物线 | 已上线 |

## 本地预览

直接用浏览器打开 `index.html` 即可；或启动一个静态服务器：

```bash
python3 -m http.server 8000
# 然后访问 http://localhost:8000
```

## 维护指南

- **新增子项目**：在对应主线 `section` 下复制一个 `.card` 块，填写 emoji、中英文站名、仓库名、状态徽章、关键词标签与仓库链接。
- **整卡可点击**：卡片的跳转由 `.btn.stretched-link` 的 `::after` 伪元素覆盖实现，卡片内**不要**再嵌套 `<a>`（HTML 不允许 `<a>` 套 `<a>`）。
- **状态徽章**：`.status.online`（已上线，青色）、`.status.first`（系列首作，金色）、`.status.soon`（规划中，灰色）。
- **线上站点**：若子项目另有 GitHub Pages 等线上地址，可在卡片内补充"访问站点"按钮。

仓库默认归属 GitHub 组织/用户 `MinosIE`，链接形如 `https://github.com/MinosIE/<repo>`。
