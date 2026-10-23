export type Lang = "zh" | "en";
type Dict = Record<string, string>;

const base: Record<Lang, Dict> = {
  zh: {
    brand: "万物通识",
    subtitle: "一个入口，看尽万物 —— 系列聚合导航站",
    intro:
      "万物通识是一组围绕「通识教育 + 可视化」构建的开源项目集合：从中华千年历史脉络，到心理、哲学、地理、生物、物理、化学与管理学——把每个学科的核心概念、发展脉络与经典框架，整理成可漫游、可检索、可深链的双语知识库。",
    kicker: "开源 · 双语 · 可视化通识库",
    slogan: "把复杂的世界，讲成你看得懂的样子",
    sec_all: "全部学科",
    sec_all_desc:
      "从千年王朝到心理、哲学、地理、生物、物理、化学与管理学，一处抵达。",
    stat_subjects: "通识学科",
    stat_items: "知识条目",
    stat_langs: "中英双语",
    stat_free: "开源免费",
    cta_explore: "开始探索",
    enter_subject: "进入浏览 →",
    pillar1_t: "一条主线",
    pillar1_d: "每个学科用「概念 · 脉络 · 经典」串成一张可漫游的知识地图。",
    pillar2_t: "看得见",
    pillar2_d: "图表、方程式、时间线与交互，把抽象知识变成可视化。",
    pillar3_t: "中英双语",
    pillar3_d: "同一套内容两种语言随时切换，适合自学、备课与分享。",
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
    brand: "Everything",
    subtitle: "One hub to explore everything — the series portal",
    intro:
      "Everything is an open-source collection built around general education and visualization: from millennia of Chinese history to psychology, philosophy, geography, biology, physics, chemistry and management — each discipline's core ideas, history and classic frameworks organised into a browsable, searchable, deep-linkable bilingual knowledge base.",
    kicker: "Open-source · Bilingual · Visual general knowledge",
    slogan: "A complex world, made clear.",
    sec_all: "All Disciplines",
    sec_all_desc:
      "From dynastic history to psychology, philosophy, geography, biology, physics, chemistry and management — all in one place.",
    stat_subjects: "Disciplines",
    stat_items: "Entries",
    stat_langs: "Languages",
    stat_free: "Open & free",
    cta_explore: "Start exploring",
    enter_subject: "Explore →",
    pillar1_t: "One thread",
    pillar1_d:
      "Each subject threads concepts, history and classics into a walkable map of knowledge.",
    pillar2_t: "Made visible",
    pillar2_d:
      "Charts, equations, timelines and interaction turn abstract ideas into something you can see.",
    pillar3_t: "Bilingual",
    pillar3_d:
      "The same content in two languages, switchable anytime — for self-study, teaching and sharing.",
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
  return extra[lang][key] ?? base[lang][key] ?? base.zh[key] ?? key;
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
