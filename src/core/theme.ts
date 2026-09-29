import { onLangChange } from "./i18n";

export type Theme = "light" | "dark";

const listeners: ((t: Theme) => void)[] = [];

export function initTheme(): void {
  let theme: Theme;
  try {
    const saved = localStorage.getItem("theme");
    theme =
      saved === "light" || saved === "dark"
        ? saved
        : matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
  } catch {
    theme = "light";
  }
  document.documentElement.setAttribute("data-theme", theme);
}

export function getTheme(): Theme {
  return document.documentElement.getAttribute("data-theme") === "dark"
    ? "dark"
    : "light";
}

export function toggleTheme(): void {
  const next: Theme = getTheme() === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  try {
    localStorage.setItem("theme", next);
  } catch {
    /* ignore */
  }
  listeners.forEach((cb) => cb(next));
}

export function onThemeChange(cb: (t: Theme) => void): () => void {
  listeners.push(cb);
  return () => {
    const i = listeners.indexOf(cb);
    if (i !== -1) listeners.splice(i, 1);
  };
}

// 主题切换按钮的图标随语言刷新
onLangChange(() => {
  const btn = document.getElementById("themeBtn");
  if (btn) {
    const t = getTheme();
    btn.textContent = t === "dark" ? "☀️" : "🌙";
  }
});
