/**
 * 界面词表工厂：由各学科 core/i18n.ts 收敛而来。
 * 每个学科 shim 用自己的 wordbook 实例化一份，保留独立的 lang / listeners / i18nRoot 状态，
 * 杜绝跨科串扰。键对齐由泛型约束（en 缺键在学科 shim 传入处编译报错）。
 */

import type { Lang, LObj } from "./types";

type Dict = Record<string, string>;

export interface SubjectI18n<Z extends Dict> {
  I18N: Record<Lang, Z>;
  initLang(): Lang;
  getLang(): Lang;
  setLang(next: Lang): void;
  onLangChange(cb: (l: Lang) => void): void;
  t(key: string, vars?: Record<string, string | number>): string;
  L<T = string>(o: LObj | undefined | null, key: string): T;
  applyStaticLang(): void;
  setI18nRoot(r: ParentNode): void;
}

export function createSubjectI18n<Z extends Dict>(wb: {
  zh: Z;
  en: Z;
}): SubjectI18n<Z> {
  const zh = wb.zh;
  const en: Z = wb.en;
  const I18N: Record<Lang, Z> = { zh, en };

  let lang: Lang = "zh";
  const listeners: ((l: Lang) => void)[] = [];

  /** 内嵌时静态文案只应作用在学科自己的根节点下，否则会覆盖主应用顶栏/页脚的 data-i18n 文本。 */
  let i18nRoot: ParentNode = document;

  function detectLang(): Lang {
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

  function initLang(): Lang {
    lang = detectLang();
    return lang;
  }

  function getLang(): Lang {
    return lang;
  }

  function onLangChange(cb: (l: Lang) => void): void {
    listeners.push(cb);
  }

  /** 取界面文案：当前语言缺失时回退中文，再回退 key 本身。 */
  function t(key: string, vars?: Record<string, string | number>): string {
    const dict = I18N[lang] as Dict;
    const base = zh as Dict;
    let s = dict[key] ?? base[key] ?? key;
    if (vars) {
      for (const [k, v] of Object.entries(vars))
        s = s.replace(new RegExp(`\\{${k}\\}`, "g"), String(v));
    }
    return s;
  }

  /** 取数据字段：en 模式优先 `key+'En'`，缺失回退中文原字段。 */
  function L<T = string>(o: LObj | undefined | null, key: string): T {
    if (!o) return undefined as unknown as T;
    if (lang === "en") {
      const v = o[key + "En"];
      if (v !== undefined && v !== null && v !== "") return v as T;
    }
    return o[key] as T;
  }

  /** 把 `data-i18n` / `data-i18n-attr` 节点按当前语言重写（仅限学科根内）。 */
  function applyStaticLang(): void {
    i18nRoot.querySelectorAll<HTMLElement>("[data-i18n]").forEach((el) => {
      const key = el.dataset.i18n;
      if (key) el.textContent = t(key);
    });
    i18nRoot.querySelectorAll<HTMLElement>("[data-i18n-attr]").forEach((el) => {
      const spec = el.dataset.i18nAttr || "";
      spec.split(",").forEach((pair) => {
        const [attr, key] = pair.split(":").map((s) => s.trim());
        if (attr && key) el.setAttribute(attr, t(key));
      });
    });
  }

  function setI18nRoot(r: ParentNode): void {
    i18nRoot = r;
  }

  function applyLang(next: Lang): void {
    lang = next;
    document.documentElement.lang = next === "en" ? "en" : "zh-CN";
    document.documentElement.setAttribute("data-lang", next);
    applyStaticLang();
    listeners.forEach((cb) => cb(lang));
  }

  function setLang(next: Lang): void {
    if (next === lang) return;
    lang = next;
    try {
      localStorage.setItem("lang", lang);
    } catch {
      /* 隐私模式下忽略 */
    }
    document.documentElement.lang = next === "en" ? "en" : "zh-CN";
    document.documentElement.setAttribute("data-lang", lang);
    applyStaticLang();
    listeners.forEach((cb) => cb(lang));
  }

  // 嵌入（iframe）模式下，与宿主 wanwu 顶栏同步语言（共享 localStorage）
  try {
    window.addEventListener("storage", (e: StorageEvent) => {
      if (e.key === "lang" && e.newValue) {
        const next = e.newValue === "en" ? "en" : "zh";
        if (next !== lang) applyLang(next);
      }
    });
  } catch {
    /* ignore */
  }

  return {
    I18N,
    initLang,
    getLang,
    setLang,
    onLangChange,
    t,
    L,
    applyStaticLang,
    setI18nRoot,
  };
}
