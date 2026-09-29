import { onLangChange, t } from './i18n';

type Theme = 'light' | 'dark';

export function currentTheme(): Theme {
  return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
}

function syncLabel(): void {
  const label = document.getElementById('themeLabel');
  const btn = document.getElementById('themeBtn');
  if (!label || !btn) return;
  // 按钮文案描述「点击后会切到」的主题
  const next = currentTheme() === 'light' ? 'dark' : 'light';
  label.textContent = next === 'dark' ? t('themeToDark') : t('themeToLight');
  btn.setAttribute('title', next === 'dark' ? t('themeToDark') : t('themeToLight'));
}

export function initTheme(root: ParentNode = document): void {
  const btn = root.querySelector<HTMLElement>('#themeBtn');
  // 主应用内嵌时 #themeBtn 已被主应用顶栏接管，econ 自身的按钮隐藏，此处直接跳过绑定
  if (!btn) return;
  const sync = (): void => {
    const label = root.querySelector<HTMLElement>('#themeLabel');
    if (!label || !btn) return;
    const next = currentTheme() === 'light' ? 'dark' : 'light';
    label.textContent = next === 'dark' ? t('themeToDark') : t('themeToLight');
    btn.setAttribute('title', next === 'dark' ? t('themeToDark') : t('themeToLight'));
  };
  btn.addEventListener('click', () => {
    const next: Theme = currentTheme() === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem('theme', next);
    } catch {
      /* 隐私模式下忽略 */
    }
    sync();
  });
  // 系统主题跟随（用户未手动选择时）
  const mq = matchMedia('(prefers-color-scheme: dark)');
  mq.addEventListener?.('change', (ev) => {
    try {
      if (localStorage.getItem('theme')) return;
    } catch {
      /* ignore */
    }
    const next: Theme = ev.matches ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
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
        label.textContent = next === "dark" ? t("themeToLight") : t("themeToDark");
    }
  });
} catch {
  /* ignore */
}
