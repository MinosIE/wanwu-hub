export type Lang = "zh" | "en";
type Dict = Record<string, string>;

const base: Record<Lang, Dict> = {
  zh: {
    brand: "万物通识",
    subtitle: "一个入口，看尽万物 —— 系列聚合导航站",
    intro:
      "万物通识是一组围绕「通识教育 + 可视化」构建的开源项目集合：从中华千年历史脉络，延伸到心理、哲学、地理、生物四大学科。这里汇总所有子项目的入口，方便你一处抵达。",
    sec_all: "全部系列",
    btn_site: "访问站点 ↗",
    btn_repo: "GitHub 仓库 ↗",
    btn_soon: "敬请期待",
    st_online: "已上线",
    st_first: "系列首作",
    st_soon: "敬请期待",
    st_wip: "接入中",
    back: "返回首页",
    theme_dark: "🌙",
    theme_light: "☀️",
    lang_zh: "中",
    lang_en: "EN",
    nav_subjects: "学科",
  },
  en: {
    brand: "Wanwu Tongsheng",
    subtitle: "One hub to explore everything — the series portal",
    intro:
      "Wanwu Tongsheng is a collection of open-source projects built around 'general education + visualization': from millennia of Chinese history to four disciplines — psychology, philosophy, geography, and biology. This hub gathers every sub-project's entry point in one place.",
    sec_all: "All Series",
    btn_site: "Visit Site ↗",
    btn_repo: "GitHub Repo ↗",
    btn_soon: "Coming Soon",
    st_online: "Online",
    st_first: "First Work",
    st_soon: "Coming Soon",
    st_wip: "Integrating",
    back: "Home",
    theme_dark: "🌙",
    theme_light: "☀️",
    lang_zh: "中",
    lang_en: "EN",
    nav_subjects: "Subjects",
  },
};

const extra: Record<Lang, Dict> = { zh: {}, en: {} };

function lookup(lang: Lang, key: string): string {
  return (
    extra[lang][key] ?? base[lang][key] ?? base.zh[key] ?? key
  );
}

/** 供各 subject 注册自己的界面词表（合并进全局字典）。 */
export function register(dict: Record<Lang, Dict>): void {
  (["zh", "en"] as Lang[]).forEach((l) =>
    Object.assign(extra[l], dict[l] || {}),
  );
}

function detect(): Lang {
  try {
    const q = new URLSearchParams(location.search).get("lang");
    if (q) return q === "en" ? "en" : "zh";
    const stored = localStorage.getItem("lang");
    if (stored) return stored === "en" ? "en" : "zh";
    return (navigator.language || "zh").toLowerCase().startsWith("en")
      ? "en"
      : "zh";
  } catch {
    return "zh";
  }
}

let lang: Lang = detect();
const listeners: ((l: Lang) => void)[] = [];

export function initLang(): Lang {
  lang = detect();
  applyStaticLang();
  return lang;
}
export function getLang(): Lang {
  return lang;
}
export function onLangChange(cb: (l: Lang) => void): () => void {
  listeners.push(cb);
  return () => {
    const i = listeners.indexOf(cb);
    if (i !== -1) listeners.splice(i, 1);
  };
}
export function setLang(next: Lang): void {
  if (next === lang) return;
  lang = next;
  try {
    localStorage.setItem("lang", lang);
  } catch {
    /* ignore */
  }
  document.documentElement.lang = lang === "en" ? "en" : "zh-CN";
  document.documentElement.setAttribute("data-lang", lang);
  applyStaticLang();
  listeners.forEach((cb) => cb(lang));
}
export function t(key: string, vars?: Record<string, string | number>): string {
  let s = lookup(lang, key);
  if (vars) {
    for (const [k, v] of Object.entries(vars))
      s = s.replace(new RegExp(`\\{${k}\\}`, "g"), String(v));
  }
  return s;
}
/** 取数据字段：en 模式优先 `keyEn`，缺失回退中文原字段。 */
export function L<T = string>(o: any, key: string): T {
  if (!o) return undefined as unknown as T;
  if (lang === "en") {
    const v = o[key + "En"];
    if (v !== undefined && v !== null && v !== "") return v as T;
  }
  return o[key] as T;
}
export function applyStaticLang(): void {
  document.querySelectorAll<HTMLElement>("[data-i18n]").forEach((el) => {
    const k = el.dataset.i18n;
    if (k) el.textContent = t(k);
  });
}
