import { getLang, setLang, t, onLangChange } from "./i18n";
import { setTheme, toggleTheme, getTheme, onThemeChange } from "./theme";
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
        <div class="view-menu">
          <button class="view-menu-btn" id="viewMenuBtn" type="button" aria-haspopup="true" aria-expanded="false" aria-label="语言与主题">☰<span class="vm-caret">▾</span></button>
          <div class="view-panel" hidden role="menu">
            <div class="vp-sec">
              <div class="vp-label" data-vp="lang">语言</div>
              <div class="vp-opts">
                <button class="vp-lang" data-lang="zh" type="button">中文</button>
                <button class="vp-lang" data-lang="en" type="button">English</button>
              </div>
            </div>
            <div class="vp-sec">
              <div class="vp-label" data-vp="theme">主题</div>
              <div class="vp-opts">
                <button class="vp-theme" data-set-theme="light" type="button">☀️<span data-vp="light">浅色</span></button>
                <button class="vp-theme" data-set-theme="dark" type="button">🌙<span data-vp="dark">深色</span></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
    <main id="view"></main>
  `;

  const syncLang = () => {
    document
      .querySelectorAll<HTMLButtonElement>("header .lang-btn")
      .forEach((b) =>
        b.classList.toggle("active", b.dataset.lang === getLang()),
      );
  };
  const syncTheme = () => {
    // 用 header 作用域取按钮：dynasty 的 hero 里也有一个同 id 的 #themeBtn
    const btn = document.querySelector<HTMLElement>("header #themeBtn");
    if (btn) btn.textContent = getTheme() === "dark" ? "☀️" : "🌙";
  };

  document
    .querySelectorAll<HTMLButtonElement>("header .lang-btn")
    .forEach((b) =>
      b.addEventListener("click", () =>
        setLang(b.dataset.lang === "en" ? "en" : "zh"),
      ),
    );
  document
    .querySelector<HTMLElement>("header #themeBtn")
    ?.addEventListener("click", () => toggleTheme());

  // 移动端「语言 + 主题」图标菜单：桌面隐藏，≤640px 取代 lang-switch / theme-btn
  const viewMenuBtn = app.querySelector<HTMLButtonElement>("#viewMenuBtn");
  const viewPanel = app.querySelector<HTMLElement>(".view-panel");
  const setViewOpen = (open: boolean) => {
    if (!viewMenuBtn || !viewPanel) return;
    viewMenuBtn.setAttribute("aria-expanded", String(open));
    viewPanel.hidden = !open;
  };
  const syncView = () => {
    const lang = getLang();
    const theme = getTheme();
    app
      .querySelectorAll<HTMLButtonElement>(".vp-lang")
      .forEach((b) => b.classList.toggle("active", b.dataset.lang === lang));
    app
      .querySelectorAll<HTMLButtonElement>(".vp-theme")
      .forEach((b) =>
        b.classList.toggle("active", b.dataset.setTheme === theme),
      );
  };
  const i18nView = () => {
    const en = getLang() === "en";
    viewMenuBtn?.setAttribute(
      "aria-label",
      en ? "Language & theme" : "语言与主题",
    );
    const set = (key: string, zh: string, enText: string) => {
      const el = app.querySelector<HTMLElement>(`[data-vp="${key}"]`);
      if (el) el.textContent = en ? enText : zh;
    };
    set("lang", "语言", "Language");
    set("theme", "主题", "Theme");
    set("light", "浅色", "Light");
    set("dark", "深色", "Dark");
  };
  viewMenuBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    setViewOpen(viewPanel ? viewPanel.hidden : true);
  });
  app.querySelectorAll<HTMLButtonElement>(".vp-lang").forEach((b) =>
    b.addEventListener("click", () => {
      setLang(b.dataset.lang === "en" ? "en" : "zh");
      setViewOpen(false);
    }),
  );
  app.querySelectorAll<HTMLButtonElement>(".vp-theme").forEach((b) =>
    b.addEventListener("click", () => {
      setTheme(b.dataset.setTheme === "dark" ? "dark" : "light");
      setViewOpen(false);
    }),
  );
  syncView();
  i18nView();
  onLangChange(() => {
    syncView();
    i18nView();
  });
  onThemeChange(syncView);

  syncLang();
  syncTheme();
  onLangChange(syncLang);
  onLangChange(syncTheme);
  onThemeChange(syncTheme);

  // 学科下拉菜单：跨科导航，列表随语言刷新
  const subjectsPanel = app.querySelector<HTMLElement>(".subjects-panel");
  const subjectsToggle =
    app.querySelector<HTMLButtonElement>(".subjects-toggle");
  let currentKey: string | null = null;
  const applyCurrent = () => {
    const lbl = document.getElementById("subjToggleLabel");
    const p = currentKey ? PROJECTS.find((x) => x.key === currentKey) : null;
    if (lbl)
      lbl.textContent = p
        ? getLang() === "en"
          ? p.en
          : p.zh
        : t("nav_subjects");
    subjectsPanel
      ?.querySelectorAll<HTMLElement>(".subject-item")
      .forEach((a) =>
        a.classList.toggle(
          "current",
          a.getAttribute("href") === `#/subject/${currentKey}`,
        ),
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
    if ((e.target as HTMLElement).closest(".subject-item"))
      setSubjectsOpen(false);
  });
  document.addEventListener("click", (e) => {
    if (!app.querySelector(".subjects-menu")?.contains(e.target as Node))
      setSubjectsOpen(false);
    if (!app.querySelector(".view-menu")?.contains(e.target as Node))
      setViewOpen(false);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      setSubjectsOpen(false);
      setViewOpen(false);
    }
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
