import { getLang, setLang, t, onLangChange } from "./i18n";
import { toggleTheme, getTheme, onThemeChange } from "./theme";
import { PROJECTS } from "./projects";

/** 渲染统一外壳：顶栏（品牌 + 语言/主题切换 + 返回首页）+ 内容容器 #view。 */
export function renderLayout(app: HTMLElement): void {
  app.innerHTML = `
    <header class="topbar">
      <a href="#/" class="brand"><span class="mark">🌐</span><span data-i18n="brand">${t("brand")}</span></a>
      <div class="toolbar">
        <div class="subjects-menu">
          <button class="subjects-toggle" type="button" aria-haspopup="true" aria-expanded="false">
            <span id="subjToggleLabel">${t("nav_subjects")}</span><span class="caret">▾</span>
          </button>
          <div class="subjects-panel" hidden role="menu"></div>
        </div>
        <div class="lang-switch">
          <button class="lang-btn" data-lang="zh">中</button>
          <button class="lang-btn" data-lang="en">EN</button>
        </div>
        <button class="theme-btn" id="themeBtn" aria-label="切换明暗主题">${getTheme() === "dark" ? "☀️" : "🌙"}</button>
      </div>
    </header>
    <main id="view"></main>
    <footer class="site-footer" data-i18n="footer">${t("footer")}</footer>
  `;

  const syncLang = () => {
    document
      .querySelectorAll<HTMLButtonElement>(".lang-btn")
      .forEach((b) =>
        b.classList.toggle("active", b.dataset.lang === getLang()),
      );
  };
  const syncTheme = () => {
    const btn = document.getElementById("themeBtn");
    if (btn) btn.textContent = getTheme() === "dark" ? "☀️" : "🌙";
  };

  document.querySelectorAll<HTMLButtonElement>(".lang-btn").forEach((b) =>
    b.addEventListener("click", () =>
      setLang(b.dataset.lang === "en" ? "en" : "zh"),
    ),
  );
  document
    .getElementById("themeBtn")
    ?.addEventListener("click", () => toggleTheme());

  syncLang();
  syncTheme();
  onLangChange(syncLang);
  onLangChange(syncTheme);
  onThemeChange(syncTheme);

  // 学科下拉菜单：跨科导航，列表随语言刷新
  const subjectsPanel = app.querySelector<HTMLElement>(".subjects-panel");
  const subjectsToggle = app.querySelector<HTMLButtonElement>(".subjects-toggle");
  let currentKey: string | null = null;
  const applyCurrent = () => {
    const lbl = document.getElementById("subjToggleLabel");
    const p = currentKey ? PROJECTS.find((x) => x.key === currentKey) : null;
    if (lbl) lbl.textContent = p ? (getLang() === "en" ? p.en : p.zh) : t("nav_subjects");
    subjectsPanel?.querySelectorAll<HTMLElement>(".subject-item").forEach((a) =>
      a.classList.toggle("current", a.getAttribute("href") === `#/subject/${currentKey}`),
    );
  };
  const renderSubjects = () => {
    if (!subjectsPanel) return;
    const lang = getLang();
    subjectsPanel.innerHTML = PROJECTS.map((p) => {
      const title = lang === "en" ? p.en : p.zh;
      return `<a class="subject-item" role="menuitem" href="#/subject/${p.key}">
        <span class="si-emoji">${p.emoji}</span>
        <span class="si-text"><span class="si-title">${title}</span></span>
      </a>`;
    }).join("");
    applyCurrent();
  };
  window.addEventListener("subject:change", (e) => {
    currentKey = ((e as CustomEvent).detail?.key as string) || null;
    applyCurrent();
  });
  const setSubjectsOpen = (open: boolean) => {
    if (!subjectsToggle || !subjectsPanel) return;
    subjectsToggle.setAttribute("aria-expanded", String(open));
    subjectsPanel.hidden = !open;
  };
  subjectsToggle?.addEventListener("click", (e) => {
    e.stopPropagation();
    setSubjectsOpen(subjectsPanel ? subjectsPanel.hidden : true);
  });
  subjectsPanel?.addEventListener("click", (e) => {
    if ((e.target as HTMLElement).closest(".subject-item")) setSubjectsOpen(false);
  });
  document.addEventListener("click", (e) => {
    if (!app.querySelector(".subjects-menu")?.contains(e.target as Node)) setSubjectsOpen(false);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setSubjectsOpen(false);
  });
  renderSubjects();
  onLangChange(renderSubjects);

  // 滚动时给顶栏加阴影（毛玻璃吸顶后的层次感）
  const topbarEl = app.querySelector<HTMLElement>(".topbar");
  if (topbarEl) {
    const onScroll = () =>
      topbarEl.classList.toggle("scrolled", window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }
}
