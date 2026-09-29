import { t } from './i18n';

export function initTheme(): void {
  const btn = document.getElementById('themeBtn');
  const label = document.getElementById('themeLabel');
  if (!btn || !label) return;

  const sync = () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    label.textContent = t(isDark ? 'themeToLight' : 'themeToDark');
    btn.setAttribute('aria-label', isDark ? '切换为日间' : '切换为夜间');
  };
  sync();

  btn.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem('theme', next);
    } catch {
      /* 隐私模式忽略 */
    }
    sync();
  });
}

// 嵌入（iframe）模式下，与宿主 wanwu 顶栏同步主题（共享 localStorage）
try {
  window.addEventListener("storage", (e: StorageEvent) => {
    if (e.key === "theme" && e.newValue) {
      const next = e.newValue === "dark" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", next);
    }
  });
} catch {
  /* ignore */
}
