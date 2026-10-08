import { initLang, onLangChange, getLang } from "./core/i18n";
import { initTheme, onThemeChange } from "./core/theme";
import { parse, onRoute } from "./core/router";
import { renderLayout } from "./core/layout";
import { PROJECTS } from "./core/projects";
import { renderHome } from "./shell/home";
import * as soon from "./subjects/soon";
import * as dynasty from "./subjects/dynasty";
import * as econ from "./subjects/econ";
import * as mind from "./subjects/mind";
import * as thought from "./subjects/thought";
import * as earth from "./subjects/earth";
import * as life from "./subjects/life";
import * as physics from "./subjects/physics";
import * as chem from "./subjects/chem";

const app = document.getElementById("app")!;
let currentCleanup: (() => void) | null = null;

async function renderView(): Promise<void> {
  const view = document.getElementById("view")!;
  if (currentCleanup) {
    currentCleanup();
    currentCleanup = null;
  }
  const route = parse();
  // 路由切换时复位滚动位置（hash SPA 不会触发原生滚动复位）
  // 用 instant 覆盖 html 上的 scroll-behavior:smooth，避免带着旧内容做平滑动画
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  // 切换视图前，重置上个视图残留的容器状态，避免样式串屏（如 dynasty-root 污染首页）
  view.className = "";
  view.removeAttribute("data-theme");
  Array.from(app.classList).forEach((c) => {
    if (c === "subject-mode" || c.startsWith("subject-")) app.classList.remove(c);
  });
  if (route.name === "home") {
    document.title = "万物通识系列 — 系列入口";
    renderHome(view);
    return;
  }
  app.classList.add("subject-mode");
  const key = route.key;
  app.classList.toggle("subject-dynasty", key === "dynasty");
  app.classList.toggle("subject-econ", key === "econ");
  app.classList.toggle("subject-mind", key === "mind");
  app.classList.toggle("subject-thought", key === "thought");
  app.classList.toggle("subject-earth", key === "earth");
  app.classList.toggle("subject-life", key === "life");
  app.classList.toggle("subject-physics", key === "physics");
  app.classList.toggle("subject-chem", key === "chem");
  if (key === "dynasty") {
    currentCleanup = await dynasty.mount(view);
    return;
  }
  if (key === "econ") {
    currentCleanup = await econ.mount(view, route.sub);
    return;
  }
  if (key === "mind") {
    currentCleanup = await mind.mount(view, route.sub);
    return;
  }
  if (key === "thought") {
    currentCleanup = await thought.mount(view, route.sub);
    return;
  }
  if (key === "earth") {
    currentCleanup = await earth.mount(view, route.sub);
    return;
  }
  if (key === "life") {
    currentCleanup = await life.mount(view, route.sub);
    return;
  }
  if (key === "physics") {
    currentCleanup = await physics.mount(view, route.sub);
    return;
  }
  if (key === "chem") {
    currentCleanup = await chem.mount(view, route.sub);
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
