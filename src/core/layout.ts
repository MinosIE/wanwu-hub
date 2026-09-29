import { getLang, setLang, t, onLangChange } from "./i18n";
import { toggleTheme, getTheme, onThemeChange } from "./theme";

/** 渲染统一外壳：顶栏（品牌 + 语言/主题切换 + 返回首页）+ 内容容器 #view。 */
export function renderLayout(app: HTMLElement): void {
  app.innerHTML = `
    <header class="topbar">
      <a href="#/" class="brand" data-i18n="brand">${t("brand")}</a>
      <div class="toolbar">
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
}
