import "./subjectKit.css";
import { getLang, onLangChange } from "../core/i18n";

export type LStr = { zh: string; en: string };

/** 取当前语言的字段值（与主应用 i18n 共用同一语言状态）。 */
export const L = (o?: LStr | string): string => {
  if (!o) return "";
  if (typeof o === "string") return o;
  return getLang() === "en" ? o.en || o.zh : o.zh || o.en;
};

export interface SubjectItem {
  id: string;
  icon?: string;
  term: LStr;
  level?: number;
  /** 关键常数等可用 value 显示数值 */
  value?: LStr;
  oneLiner: LStr;
  detail?: LStr;
  example?: LStr;
  tags?: LStr[];
  related?: string[];
}

export interface SubjectModule {
  key: string;
  icon: string;
  title: LStr;
  items: SubjectItem[];
}

export interface SubjectConfig {
  rootClass: string;
  accent: string;
  heroTitle: LStr;
  heroSub: LStr;
  intro?: LStr;
  modules: SubjectModule[];
}

function esc(s: string): string {
  return s.replace(
    /[&<>"]/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!,
  );
}

function cardHTML(item: SubjectItem): string {
  const value = item.value ? `<span class="card-val">${esc(L(item.value))}</span>` : "";
  return `<article class="sub-card js-item" data-key="${esc(item.id)}" tabindex="0" role="button" aria-label="${esc(L(item.term))}">
    <header class="card-h">
      <span class="card-ic">${item.icon ?? "•"}</span>
      <span class="card-t">${esc(L(item.term))}</span>
      ${item.level != null ? `<span class="lvl">L${item.level}</span>` : ""}
    </header>
    <p class="card-lead">${esc(L(item.oneLiner))}</p>
    <footer class="card-f">
      ${item.tags && item.tags.length ? `<span class="tag">${esc(L(item.tags[0]))}</span>` : ""}
      ${value}
      <span class="card-go">${esc(L({ zh: "查看", en: "View" }))}</span>
    </footer>
  </article>`;
}

/**
 * 生成一个轻量、可双语、可深链的学科视图挂载函数。
 * 复用主应用 i18n/主题（全局 CSS 变量），不自带 core，避免每个学科复制一套。
 */
export function createSubject(cfg: SubjectConfig) {
  return async (
    view: HTMLElement,
    sub?: string,
  ): Promise<() => void> => {
    view.innerHTML = `<div class="${cfg.rootClass}" style="--accent:${cfg.accent}">
      <div class="sub-wrap">
        <section class="sub-hero">
          <h1 class="sub-h1">${esc(L(cfg.heroTitle))}</h1>
          <p class="sub-sub">${esc(L(cfg.heroSub))}</p>
          ${cfg.intro ? `<p class="sub-intro">${esc(L(cfg.intro))}</p>` : ""}
        </section>
        <nav class="sub-nav" aria-label="模块导航">${cfg.modules
          .map(
            (m, i) =>
              `<button class="sub-mod${i === 0 ? " active" : ""}" data-go="${m.key}"><span class="sm-ic" aria-hidden="true">${m.icon}</span><span class="sm-label">${esc(L(m.title))}</span></button>`,
          )
          .join("")}</nav>
        <div class="sub-modules">${cfg.modules
          .map(
            (m, i) =>
              `<section class="sub-module${i === 0 ? " active" : ""}" id="sm-${m.key}">
                <header class="sm-head"><h2>${esc(L(m.title))}</h2><span class="sm-count"></span></header>
                <div class="sub-grid"></div>
              </section>`,
          )
          .join("")}</div>
      </div>
      <button class="sub-top" id="subTop" type="button" aria-label="返回顶部">↑</button>
      <div class="sub-detail" id="subDetail" hidden></div>
    </div>`;

    const root = view.querySelector<HTMLElement>(`.${cfg.rootClass}`)!;
    const grids = root.querySelectorAll<HTMLElement>(".sub-grid");

    const renderModule = (m: SubjectModule, grid: HTMLElement) => {
      grid.innerHTML = m.items.map(cardHTML).join("");
      grid.querySelectorAll<HTMLElement>(".js-item").forEach((el) => {
        const open = () => openDetail(m, el.dataset.key!);
        el.addEventListener("click", open);
        el.addEventListener("keydown", (e) => {
          if ((e as KeyboardEvent).key === "Enter") open();
        });
      });
      const sec = root.querySelector<HTMLElement>(`#sm-${m.key}`);
      if (sec) sec.querySelector<HTMLElement>(".sm-count")!.textContent = String(m.items.length);
    };

    const closeDetail = () => {
      const d = root.querySelector<HTMLElement>("#subDetail")!;
      d.hidden = true;
      d.innerHTML = "";
    };
    const openDetail = (m: SubjectModule, id: string) => {
      const item = m.items.find((x) => x.id === id);
      if (!item) return;
      const d = root.querySelector<HTMLElement>("#subDetail")!;
      d.innerHTML = `<div class="sd-backdrop"></div><div class="sd-panel" role="dialog" aria-modal="true">
        <button class="sd-close" type="button" aria-label="关闭">×</button>
        <div class="sd-eyebrow">${esc(L(m.title))}${item.level != null ? ` · L${item.level}` : ""}</div>
        <h2 class="sd-title">${esc(L(item.term))}</h2>
        ${item.value ? `<div class="sd-value">${esc(L(item.value))}</div>` : ""}
        <div class="sd-lead">${esc(L(item.oneLiner))}</div>
        ${item.detail ? `<p class="sd-sec"><b>📘</b><span>${esc(L(item.detail))}</span></p>` : ""}
        ${item.example ? `<p class="sd-sec"><b>🧪</b><span>${esc(L(item.example))}</span></p>` : ""}
        ${item.tags && item.tags.length ? `<div class="sd-tags">${item.tags.map((t) => `<span class="tag">${esc(L(t))}</span>`).join("")}</div>` : ""}
      </div>`;
      d.hidden = false;
      d.querySelector(".sd-close")!.addEventListener("click", closeDetail);
      d.querySelector(".sd-backdrop")!.addEventListener("click", closeDetail);
    };

    cfg.modules.forEach((m, i) => renderModule(m, grids[i]));

    root.querySelectorAll<HTMLElement>(".sub-mod").forEach((btn) => {
      btn.addEventListener("click", () => {
        const k = btn.dataset.go!;
        root.querySelectorAll(".sub-mod").forEach((b) => b.classList.toggle("active", b === btn));
        root
          .querySelectorAll<HTMLElement>(".sub-module")
          .forEach((s) => s.classList.toggle("active", s.id === `sm-${k}`));
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    });

    const top = root.querySelector<HTMLElement>("#subTop")!;
    const onScroll = () => top.classList.toggle("show", window.scrollY > 420);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    top.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

    const offLang = onLangChange(() => {
      const h1 = root.querySelector<HTMLElement>(".sub-h1");
      if (h1) h1.textContent = L(cfg.heroTitle);
      const sub = root.querySelector<HTMLElement>(".sub-sub");
      if (sub) sub.textContent = L(cfg.heroSub);
      const intro = root.querySelector<HTMLElement>(".sub-intro");
      if (intro && cfg.intro) intro.textContent = L(cfg.intro);
      root
        .querySelectorAll<HTMLElement>(".sub-mod .sm-label")
        .forEach((b, i) => (b.textContent = L(cfg.modules[i].title)));
      root
        .querySelectorAll<HTMLElement>(".sm-head h2")
        .forEach((h, i) => (h.textContent = L(cfg.modules[i].title)));
      cfg.modules.forEach((m, i) => renderModule(m, grids[i]));
      closeDetail();
    });

    if (sub) {
      const [k, id] = sub.split("/");
      const m = cfg.modules.find((x) => x.key === k);
      if (m) {
        root
          .querySelectorAll(".sub-mod")
          .forEach((b) => b.classList.toggle("active", (b as HTMLElement).dataset.go === k));
        root
          .querySelectorAll<HTMLElement>(".sub-module")
          .forEach((s) => s.classList.toggle("active", s.id === `sm-${k}`));
        if (id) openDetail(m, id);
      }
    }

    return () => {
      offLang();
      closeDetail();
    };
  };
}
