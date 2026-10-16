/**
 * 主题工厂：由各学科 core/theme.ts 收敛而来。
 * 内嵌模式下主题多由主应用顶栏驱动，本模块的按钮绑定/存储监听主要用于独立运行形态，行为保持原样。
 */

type Theme = "light" | "dark";

export interface SubjectThemeDeps {
  t: (key: string, vars?: Record<string, string | number>) => string;
  onLangChange: (cb: (l: "zh" | "en") => void) => void;
}

export interface SubjectTheme {
  currentTheme(): Theme;
  initTheme(root?: ParentNode): void;
}

export function createSubjectTheme(deps: SubjectThemeDeps): SubjectTheme {
  const { t, onLangChange } = deps;

  function currentTheme(): Theme {
    return document.documentElement.getAttribute("data-theme") === "dark"
      ? "dark"
      : "light";
  }

  function initTheme(root: ParentNode = document): void {
    const btn = root.querySelector<HTMLElement>("#themeBtn");
    // 主应用内嵌时 #themeBtn 已被主应用顶栏接管，学科自身的按钮隐藏，此处直接跳过绑定
    if (!btn) return;
    const sync = (): void => {
      const label = root.querySelector<HTMLElement>("#themeLabel");
      if (!label || !btn) return;
      const next = currentTheme() === "light" ? "dark" : "light";
      label.textContent =
        next === "dark" ? t("themeToDark") : t("themeToLight");
      btn.setAttribute(
        "title",
        next === "dark" ? t("themeToDark") : t("themeToLight"),
      );
    };
    btn.addEventListener("click", () => {
      const next: Theme = currentTheme() === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", next);
      try {
        localStorage.setItem("theme", next);
      } catch {
        /* 隐私模式下忽略 */
      }
      sync();
    });
    // 系统主题跟随（用户未手动选择时）
    const mq = matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener?.("change", (ev) => {
      try {
        if (localStorage.getItem("theme")) return;
      } catch {
        /* ignore */
      }
      const next: Theme = ev.matches ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", next);
      sync();
    });
    onLangChange(sync);
    sync();
  }

  // 嵌入（iframe）模式下，与宿主 wanwu 顶栏同步主题（共享 localStorage）
  try {
    window.addEventListener("storage", (e: StorageEvent) => {
      if (e.key === "theme" && e.newValue) {
        const next = e.newValue === "dark" ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", next);
        const label = document.getElementById("themeLabel");
        if (label)
          label.textContent =
            next === "dark" ? t("themeToLight") : t("themeToDark");
      }
    });
  } catch {
    /* ignore */
  }

  return { currentTheme, initTheme };
}
