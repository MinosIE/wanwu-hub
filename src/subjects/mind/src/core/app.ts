import { t, L, onLangChange, initLangSwitch, setI18nRoot, applyStaticLang } from "./i18n";
import { esc } from "./dom";
import { loadJson } from "./data";
import { initTheme } from "./theme";
import { initSearch } from "./search";
import { mountList, openDetailGlobal } from "../modules/shared";
import { listModules } from "../modules/index";
import { mountDemos } from "../modules/demos";
import { mountBigFive } from "../modules/bigfive";
import { mountSelfRating } from "../modules/selfrating";
import type { LObj } from "./types";

/** 列表模块由注册表推导，自定义挂载模块在此登记 */
const CUSTOM_MODULES = ["m-demos", "m-bigfive", "m-selfrating"];
const BUILT = new Set([
  "m-home",
  ...listModules.map((m) => `m-${m.id}`),
  ...CUSTOM_MODULES,
]);

function modFromHash(): string | null {
  const id = decodeURIComponent(location.hash.replace(/^#/, ""));
  return id && BUILT.has(id) ? id : null;
}

export function activate(id: string, smooth = true): void {
  document
    .querySelectorAll<HTMLElement>(".module")
    .forEach((s) => s.classList.toggle("active", s.id === id));
  document
    .querySelectorAll<HTMLElement>(".modnav .mod")
    .forEach((b) => b.classList.toggle("active", b.dataset.go === id));
  window.scrollTo({ top: 0, behavior: smooth ? "smooth" : "auto" });
}

let updateHistory = true;
export function setHistoryUpdate(v: boolean): void {
  updateHistory = v;
}

function go(id: string): void {
  activate(id);
  if (updateHistory && modFromHash() !== id) history.pushState(null, "", `#${id}`);
}

function mountNav(): void {
  document
    .querySelectorAll<HTMLElement>(".modnav .mod")
    .forEach((b) => b.addEventListener("click", () => go(b.dataset.go!)));
}

async function mountOverview(): Promise<void> {
  let ov: LObj = {};
  const render = () => {
    const kpisEl = document.getElementById("kpis");
    if (kpisEl) {
      // 复用共享 UI 层的 KPI 结构（.kpi-ic / .kpi-body / .kpi-v / .kpi-l），
      // 图标取自同 id 的 entries（kpi.file 去掉 .json 即 entry.id）。
      const iconById = new Map<string, string>(
        (ov.entries || []).map(
          (e: any): [string, string] => [String(e.id), String(e.icon || "•")],
        ),
      );
      kpisEl.innerHTML = (ov.kpis || [])
        .map((k: any) => {
          const id = String(k.file || "").replace(/\.json$/, "");
          const icon = iconById.get(id) || "•";
          return `<div class="kpi"><span class="kpi-ic" aria-hidden="true">${esc(icon)}</span><span class="kpi-body"><b class="kpi-v">${esc(k.count ?? "—")}</b><span class="kpi-l">${esc(t(k.titleKey))}</span></span></div>`;
        })
        .join("");
    }
    const grid = document.getElementById("homeGrid");
    if (grid) {
      grid.innerHTML = (ov.entries || [])
        .map(
          (e: any) =>
            `<button class="home-card" data-go="m-${esc(e.id)}">
               <div class="emoji">${esc(e.icon)}</div>
               <h3>${esc(t(e.titleKey))}</h3>
               <p>${esc(t(e.descKey))}</p>
             </button>`,
        )
        .join("");
      grid
        .querySelectorAll<HTMLElement>(".home-card")
        .forEach((b) => b.addEventListener("click", () => go(b.dataset.go!)));
    }
    const refsBox = document.getElementById("refsBox");
    const refList = document.getElementById("refList");
    if (refsBox && refList) {
      if (ov.refs && ov.refs.length) {
        refsBox.hidden = false;
        refList.innerHTML = ov.refs
          .map((s: any) => {
            const label = `${esc(s.label)}${s.year ? `（${esc(s.year)}）` : ""}`;
            const text = s.url
              ? `<a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${label}</a>`
              : label;
            return `<li>${text}${s.type ? `<span class="ref-type">${esc(s.type)}</span>` : ""}</li>`;
          })
          .join("");
      } else {
        refsBox.hidden = true;
      }
    }
  };

  const kpisEl = document.getElementById("kpis");
  if (kpisEl) kpisEl.innerHTML = `<p class="count">${esc(t("ui.loading"))}</p>`;
  try {
    ov = await loadJson("overview.json");
    render();
    onLangChange(render);
  } catch {
    if (kpisEl)
      kpisEl.innerHTML = `<p class="count">${esc(t("ui.loadFail"))}</p>`;
  }
}

function mountPlaceholders(): void {
  const boxes: HTMLElement[] = [];
  document.querySelectorAll<HTMLElement>(".module").forEach((s) => {
    if (!BUILT.has(s.id)) {
      const box = s.querySelector<HTMLElement>(".placeholder");
      if (box) boxes.push(box);
    }
  });
  const render = () =>
    boxes.forEach((b) => (b.textContent = t("ui.comingSoon")));
  render();
  onLangChange(render);
}

function mountToTop(): void {
  const btn = document.getElementById("toTop");
  if (!btn) return;
  const onScroll = () => btn.classList.toggle("show", window.scrollY > 400);
  window.addEventListener("scroll", onScroll, { passive: true });
  btn.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" }),
  );
}

function mountHeroMail(): void {
  const a = document.getElementById("heroMailLink") as HTMLAnchorElement | null;
  if (!a) return;
  const subject = encodeURIComponent(t("mail.subject"));
  const body = encodeURIComponent(t("mail.body"));
  a.href = `mailto:417913012@qq.com?subject=${subject}&body=${body}`;
}

export async function boot(root: ParentNode = document): Promise<void> {
  if (window.self !== window.top) document.body.classList.add("embedded");
  setI18nRoot(root);
  applyStaticLang();
  document.title = t("docTitle");
  initTheme(root);
  initLangSwitch();
  mountNav();
  mountPlaceholders();
  // 深链：带 #m-xxx 刷新/直接访问时定位到对应模块；后退/前进跟随历史
  const initial = modFromHash();
  if (initial && initial !== "m-home") activate(initial, false);
  window.addEventListener("popstate", () => {
    const id = modFromHash() ?? "m-home";
    activate(id, false);
  });
  mountToTop();
  mountHeroMail();
  await mountOverview();
  listModules.forEach((m) => mountList(m));
  mountDemos();
  mountBigFive();
  mountSelfRating();
  initSearch(openDetailGlobal);
}
