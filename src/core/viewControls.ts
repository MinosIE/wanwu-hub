import { getLang, onLangChange, setLang } from "./i18n";
import { getTheme, onThemeChange, toggleTheme } from "./theme";

/** 主题按钮文案：描述「点击后会切到」的目标，与学科自带逻辑的语义一致 */
const TXT: Record<"zh" | "en", Record<string, string>> = {
  zh: {
    lang: "切换语言 / Switch language",
    dark: "🌙 夜间",
    light: "☀️ 日间",
  },
  en: {
    lang: "Switch language",
    dark: "🌙 Night",
    light: "☀️ Day",
  },
};

/**
 * 把学科 hero 内自带的语言 / 主题按钮接到主应用的状态源上。
 * ------------------------------------------------------------
 * 顶栏是全站唯一的切换入口；只有中华王朝在 hero 里保留了这两枚按钮（深色渐变背景上的
 * 玻璃胶囊是它的招牌样式）。移植来的学科脚本会把点击绑到按钮自身、并写自己那套
 * localStorage（沙箱里还是内存桩），于是出现「视图换了、顶栏和别的学科没换」的分叉。
 * 这里在捕获阶段拦下点击并阻断继续传播（学科自身的监听器因此不执行），改由 core 的
 * setLang / toggleTheme 驱动；学科再通过挂载时建立的 onLangChange / onThemeChange 桥接
 * 重渲染，状态与顶栏自然一致。
 *
 * @param root 学科根节点（如 `.dynasty-root`）
 * @returns    卸载时的清理函数
 */
export function bridgeViewControls(root: HTMLElement): () => void {
  const sync = (): void => {
    const l = TXT[getLang()];
    const langBtn = root.querySelector<HTMLElement>("#langBtn");
    const themeBtn = root.querySelector<HTMLElement>("#themeBtn");
    const themeLabel = root.querySelector<HTMLElement>("#themeLabel");
    // 语言按钮文案交给学科自己维护（dynasty 的语义是「当前语言」，它在每次重渲染时刷新），
    // 这里只补 title；主题按钮文案则由本模块维护，因为学科只在自身被点击时才刷新图标。
    if (langBtn) langBtn.setAttribute("title", l.lang);
    const themeName = getTheme() === "dark" ? l.light : l.dark;
    if (themeLabel) themeLabel.textContent = themeName;
    else if (themeBtn) themeBtn.textContent = themeName;
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
