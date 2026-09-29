import { initLang, onLangChange, getLang } from "./core/i18n";
import { initTheme, onThemeChange } from "./core/theme";
import { parse, onRoute } from "./core/router";
import { renderLayout } from "./core/layout";
import { PROJECTS } from "./core/projects";
import { renderHome } from "./shell/home";
import * as soon from "./subjects/soon";
import * as dynasty from "./subjects/dynasty";
import * as econ from "./subjects/econ";

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
  app.classList.remove("subject-mode", "subject-dynasty");
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
  if (key === "dynasty") {
    currentCleanup = await dynasty.mount(view);
    return;
  }
  if (key === "econ") {
    currentCleanup = await econ.mount(view, route.sub);
    return;
  }
  if (key === "mind") {
    const sub = route.sub ? `#${route.sub}` : "";
    view.innerHTML = `<iframe class="subject-frame" src="${import.meta.env.BASE_URL}mind.html${sub}" title="mind"></iframe>`;
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
