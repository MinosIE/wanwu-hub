import { TEMPLATE } from "./template";
import "./src/styles/index.css";
import { boot, activate, setHistoryUpdate } from "./src/main";
import { setLang as thoughtSetLang } from "./src/core/i18n";
import { onLangChange as onMainLang } from "../../core/i18n";
import { onThemeChange as onMainTheme, getTheme } from "../../core/theme";

/**
 * 把 thought 子应用挂载进主应用 #view，移除 iframe。
 * 复用其 JSON 数据 + 模块注册表，仅把全局查询收敛到 .thought-root，
 * 并把语言/主题桥接到主应用顶栏。
 */
export async function mount(
  view: HTMLElement,
  sub?: string,
): Promise<() => void> {
  view.innerHTML = `<div class="thought-root">${TEMPLATE}</div>`;
  const root = view.querySelector<HTMLElement>(".thought-root");
  if (!root) return () => {};

  // 初始主题同步到 thought 根（暗色令牌挂在 .thought-root[data-theme] 上）
  root.setAttribute("data-theme", getTheme());

  // 内嵌时关闭历史写入，避免污染主路由 URL
  setHistoryUpdate(false);
  boot(root);

  // 主应用切换语言/主题时，驱动 thought 内部重新渲染
  const offLang = onMainLang((l) => thoughtSetLang(l));
  const offTheme = onMainTheme(() =>
    root.setAttribute("data-theme", getTheme()),
  );

  // 深链：#/subject/thought/<module>/<entry> -> thought 内部模块/条目
  if (sub) {
    const [mod, entry] = sub.split("/");
    void activate(`m-${mod}`, entry || undefined);
  }

  return () => {
    offLang();
    offTheme();
  };
}
