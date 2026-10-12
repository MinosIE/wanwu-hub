import { getLang, onLangChange, setLang } from "./i18n";
import { getTheme, onThemeChange, toggleTheme } from "./theme";

/**
 * 学科视图 hero 内自带的语言 / 主题按钮（`#langBtn` / `#themeBtn`）与顶栏统一状态源。
 * ------------------------------------------------------------
 * 各学科是从独立站点移植来的，hero 里保留了自己的切换按钮；若任其调用学科内部的
 * setLang / 主题写入，就会出现「视图换了、顶栏与别的学科没换」的分叉。
 * 这里在 root 的捕获阶段拦下点击（学科自身的监听器因此不再执行），改由主应用状态驱动，
 * 学科通过挂载时建立的桥接（onLangChange / onThemeChange）自然重渲染。
 *
 * @param root 学科根节点（`.xxx-root.subject-root`）
 * @param t    该学科的界面文案函数（用到 `langLabel` / `themeToDark` / `themeToLight`）
 * @returns    卸载时的清理函数
 */
export function bridgeViewControls(
  root: HTMLElement,
  t: (key: string) => string,
): () => void {
  const sync = (): void => {
    const langBtn = root.querySelector<HTMLElement>("#langBtn");
    const langLabel = root.querySelector<HTMLElement>("#langLabel");
    const themeBtn = root.querySelector<HTMLElement>("#themeBtn");
    const themeLabel = root.querySelector<HTMLElement>("#themeLabel");
    // 按钮文案描述「点击后会切到」的目标，与顶栏的「中 / EN」高亮保持一致
    const langName = getLang() === "zh" ? "EN" : "中文";
    if (langLabel) langLabel.textContent = langName;
    if (langBtn) langBtn.setAttribute("title", t("langLabel"));
    const themeName = t(getTheme() === "dark" ? "themeToLight" : "themeToDark");
    if (themeLabel) themeLabel.textContent = themeName;
    if (themeBtn) themeBtn.setAttribute("title", themeName);
  };
  const onClick = (e: Event): void => {
    const btn = (e.target as HTMLElement | null)?.closest?.<HTMLElement>(
      "#langBtn, #themeBtn",
    );
    if (!btn) return;
    e.preventDefault();
    e.stopPropagation();
    if (btn.id === "langBtn") setLang(getLang() === "zh" ? "en" : "zh");
    else toggleTheme();
  };
  sync();
  root.addEventListener("click", onClick, true);
  const offLang = onLangChange(sync);
  const offTheme = onThemeChange(sync);
  return () => {
    root.removeEventListener("click", onClick, true);
    offLang();
    offTheme();
  };
}
