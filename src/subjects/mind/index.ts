import { TEMPLATE } from "./template";
import "./src/main";
import { boot, activate, setHistoryUpdate } from "./src/core/app";
import { setLang as mindSetLang, setI18nRoot } from "./src/core/i18n";
import { onLangChange as onMainLang } from "../../core/i18n";
import { onThemeChange as onMainTheme, getTheme } from "../../core/theme";

/**
 * 把原 mind.html 独立子应用挂载进主应用 #view，移除 iframe。
 * 复用其 JSON 数据 + 模块注册表，仅把全局查询收敛到 .mind-root，
 * 并把语言/主题桥接到主应用顶栏。
 */
export async function mount(
  view: HTMLElement,
  sub?: string,
): Promise<() => void> {
  view.innerHTML = `<div class="mind-root">${TEMPLATE}</div>`;
  const root = view.querySelector<HTMLElement>(".mind-root");
  if (!root) return () => {};

  // 初始主题同步到 mind 根（mind 暗色令牌挂在 .mind-root[data-theme] 上）
  root.setAttribute("data-theme", getTheme());

  // 静态文案收敛到 mind 根；内嵌时关闭历史写入，避免污染主路由 URL
  setI18nRoot(root);
  setHistoryUpdate(false);

  await boot(root);

  // 主应用切换语言/主题时，驱动 mind 内部重新渲染
  const offLang = onMainLang((l) => mindSetLang(l));
  const offTheme = onMainTheme(() =>
    root.setAttribute("data-theme", getTheme()),
  );

  // 深链：#/subject/mind/<module> -> mind 内部模块
  if (sub) {
    const id = sub.startsWith("m-") ? sub : `m-${sub}`;
    activate(id, false);
  }

  return () => {
    offLang();
    offTheme();
  };
}
