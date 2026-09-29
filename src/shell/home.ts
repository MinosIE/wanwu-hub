import { getLang, t, onLangChange } from "../core/i18n";
import { PROJECTS } from "../core/projects";

export function renderHome(view: HTMLElement): void {
  const lang = getLang();

  const card = (p: (typeof PROJECTS)[number], featured = false) => {
    const name = lang === "en" ? p.en : p.zh;
    const sub = lang === "en" ? p.subEn : p.subZh;
    const desc = lang === "en" ? p.descEn : p.descZh;
    const tags = (lang === "en" ? p.tagsEn : p.tagsZh)
      .map((x) => `<span class="chip">${x}</span>`)
      .join("");
    let action = p.integrated
      ? `<a class="btn stretched-link" href="#/subject/${p.key}">进入浏览 →</a>`
      : `<a class="btn disabled" href="#">敬请期待</a>`;






    const cardInner = `
      <h3>${name}</h3>
      <div class="sub-en">${sub}</div>
      <p class="desc">${desc}</p>
      <div class="tags">${tags}</div>
      ${action}`;
    return `<div class="card ${p.integrated ? "" : "soon"}${featured ? " featured" : ""}">
      <div class="emoji">${p.emoji}</div>
      <div class="card-main">${cardInner}</div>
    </div>`;
  };

  view.innerHTML = `
    <div class="hero">
      <h1 data-i18n="brand">${t("brand")}</h1>
      <p class="subtitle" data-i18n="subtitle">${t("subtitle")}</p>
      <p class="intro" data-i18n="intro">${t("intro")}</p>
    </div>
    <section class="section" id="all">
      <h2 data-i18n="sec_all">${t("sec_all")}</h2>
      <div class="card-grid">${PROJECTS.map((p) => card(p)).join("")}</div>
    </section>
    <div class="note" data-i18n="note">${t("note")}</div>
  `;

  // 整卡可点击（仅对站内可浏览的 integrated 卡片生效）
  view.querySelectorAll<HTMLElement>(".card:not(.soon)").forEach((c) => {
    const link = c.querySelector<HTMLAnchorElement>("a.stretched-link");
    if (!link) return;
    const href = link.getAttribute("href");
    if (!href) return;
    const overlay = document.createElement("a");
    overlay.href = href;
    overlay.className = "card-overlay";
    overlay.style.cssText =
      "position:absolute;inset:0;z-index:1;";
    overlay.setAttribute("aria-hidden", "true");
    c.style.position = "relative";
    c.appendChild(overlay);
  });
}

// 语言切换时重渲染当前首页
onLangChange(() => {
  if (location.hash === "" || location.hash === "#/" || location.hash === "#")
    renderHome(document.getElementById("view")!);
});
