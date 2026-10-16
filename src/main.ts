import { initLang, onLangChange } from "./core/i18n";
import { initTheme } from "./core/theme";
// 共享学科 UI 层提前随入口加载：各学科基础布局（hero/kpi/卡片/导航）不再随
// 懒加载分块迟到，避免「从王朝切到其他学科」时先出现无样式再补样式的闪烁。
import "./core/ui/ui.css";
import { parse, onRoute } from "./core/router";
import { beginProgress, endProgress } from "./core/progress";
import { renderLayout } from "./core/layout";
import { PROJECTS } from "./core/projects";
import { renderHome } from "./shell/home";
import * as soon from "./subjects/soon";

/**
 * 学科模块懒加载注册表：按 key 动态 import，Vite 各自切成独立 chunk，
 * 仅在进入该学科时才下载其 JS + CSS（dynasty 的脚本 / 样式尤其大）。
 * 统一签名：mount(view, sub?) => Promise<cleanup>
 */
type SubjectMount = (view: HTMLElement, sub?: string) => Promise<() => void>;
const SUBJECT_LOADERS: Record<string, () => Promise<{ mount: SubjectMount }>> =
  {
    dynasty: () => import("./subjects/dynasty"),
    econ: () => import("./subjects/econ"),
    mind: () => import("./subjects/mind"),
    thought: () => import("./subjects/thought"),
    earth: () => import("./subjects/earth"),
    life: () => import("./subjects/life"),
    physics: () => import("./subjects/physics"),
    chem: () => import("./subjects/chem"),
    mgmt: () => import("./subjects/mgmt"),
  };

const app = document.getElementById("app")!;
let currentCleanup: (() => void) | null = null;
// 每次导航自增；await 之后若已被更新的导航取代则放弃本次，避免竞态下双挂载。
let renderSeq = 0;

async function renderView(): Promise<void> {
  beginProgress();
  try {
    await renderViewInner();
  } finally {
    endProgress();
  }
}

async function renderViewInner(): Promise<void> {
  const view = document.getElementById("view")!;
  const seq = ++renderSeq;
  const route = parse();
  const key = route.name === "subject" ? route.key : "";
  const sub = route.name === "subject" ? route.sub : undefined;
  const loader =
    route.name === "subject" ? SUBJECT_LOADERS[route.key] : undefined;

  // 先异步取回目标学科模块，期间保留旧视图（含其作用域类）原样、仍带样式。
  // 关键：王朝把作用域类直接加在 #view 自身（view.className="dynasty-root"），若像
  // 以往那样在 await 之前就 view.className=""，则切往其他学科、下载其 chunk 的空档里，
  // #view 里残留的王朝 HTML 会因失去 .dynasty-root 作用域而「裸奔」（以新学科主题渲染
  // 无样式的旧结构）＝闪烁。故把「清理旧视图 + 复位 + 挂载新内容」整体延后到模块就绪后。
  let mod: { mount: SubjectMount } | undefined;
  if (loader) {
    mod = await loader();
    if (seq !== renderSeq) return; // 已被更新的导航取代，放弃本次
  }

  // 模块就绪后，同步完成「清理旧视图 + 复位容器 + 切换主题类 + 挂载新内容」，不留空帧。
  if (currentCleanup) {
    currentCleanup();
    currentCleanup = null;
  }
  // 路由切换时复位滚动位置（hash SPA 不会触发原生滚动复位）
  // 用 instant 覆盖 html 上的 scroll-behavior:smooth，避免带着旧内容做平滑动画
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  // 重置上个视图残留的容器状态与内容，避免样式串屏（如 dynasty-root 污染首页）
  view.className = "";
  view.innerHTML = "";
  view.removeAttribute("data-theme");
  Array.from(app.classList).forEach((c) => {
    if (c === "subject-mode" || c.startsWith("subject-"))
      app.classList.remove(c);
  });
  if (route.name === "home") {
    document.title = "万物通识系列 — 系列入口";
    renderHome(view);
    window.dispatchEvent(
      new CustomEvent("subject:change", { detail: { key: null } }),
    );
    return;
  }
  app.classList.add("subject-mode");
  app.classList.toggle("subject-dynasty", key === "dynasty");
  app.classList.toggle("subject-econ", key === "econ");
  app.classList.toggle("subject-mind", key === "mind");
  app.classList.toggle("subject-thought", key === "thought");
  app.classList.toggle("subject-earth", key === "earth");
  app.classList.toggle("subject-life", key === "life");
  app.classList.toggle("subject-physics", key === "physics");
  app.classList.toggle("subject-chem", key === "chem");
  app.classList.toggle("subject-mgmt", key === "mgmt");
  window.dispatchEvent(new CustomEvent("subject:change", { detail: { key } }));
  if (mod) {
    currentCleanup = await mod.mount(view, sub);
    return;
  }
  const p = PROJECTS.find((x) => x.key === key);
  soon.mount(view, p);
}

initLang();
initTheme();
renderLayout(app);
renderView();
onRoute(renderView);
// 语言切换：仅重渲染首页；subject（dynasty / econ / mind）内部自行响应 onLangChange
onLangChange(() => {
  if (parse().name === "home") {
    const view = document.getElementById("view");
    if (view) renderHome(view);
  }
});
