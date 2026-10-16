/**
 * 学科编排器工厂：由 earth / life / thought / econ 的 src/main.ts 收敛而来。
 * 把「模块切换 / 首页 KPI / 页脚 / 搜索 / 深链 / 语言主题联动」这套逐字节重复的编排
 * 逻辑上移为单一事实源；各科差异全部经 config + hooks 承载：
 *   - beforeInit      注入 i18n 后、initLang 前（econ 的 setI18n/setDataBase）
 *   - afterRender     首屏渲染后（thought 的 renderOverview）
 *   - onLangChangeExtra 语言切换重渲染后的补充同步（thought 的总览按钮文案）
 * instances / pending / current / loadingEl 等为工厂闭包私有，各科各持一份。
 */

import { provideApp } from "./app";
import type {
  DetailPayload,
  LObj,
  ModuleDef,
  ModuleInstance,
  OverviewFile,
} from "./types";

/** 搜索选中项：编排器只需模块 id 与条目 id 即可跳转，保持最小结构以兼容各搜索实现。 */
type PickFn = (entry: { m: string; id: string }) => void;

export interface SubjectAppI18n {
  initLang(): "zh" | "en";
  getLang(): "zh" | "en";
  setLang(next: "zh" | "en"): void;
  onLangChange(cb: (l: "zh" | "en") => void): void;
  applyStaticLang(): void;
  setI18nRoot(r: ParentNode): void;
  t(key: string, vars?: Record<string, string | number>): string;
  L<T = string>(o: LObj | undefined | null, key: string): T;
}

export interface SubjectAppConfig {
  logTag: string;
  modules: ModuleDef[];
  moduleByKey: (key: string) => ModuleDef | undefined;
  i18n: SubjectAppI18n;
  fetchData: <T>(file: string) => Promise<T>;
  esc: (value: unknown) => string;
  need: <T extends HTMLElement = HTMLElement>(
    sel: string,
    root?: ParentNode,
  ) => T;
  initDetail: () => void;
  openDetail: (payload: DetailPayload) => void;
  initSearch: (onPick: PickFn) => void;
  initTheme: (root?: ParentNode) => void;
  preloadRelated: () => Promise<void>;
  mail?: { user: string; domain: string };
  hooks?: {
    beforeInit?(): void;
    afterRender?(): void;
    onLangChangeExtra?(): void;
  };
}

export interface SubjectApp {
  boot(root?: ParentNode): void;
  activate(id: string, openKey?: string, scroll?: boolean): Promise<void>;
  setHistoryUpdate(v: boolean): void;
}

export function createSubjectApp(cfg: SubjectAppConfig): SubjectApp {
  const {
    logTag,
    modules,
    moduleByKey,
    i18n,
    fetchData,
    esc,
    need,
    initDetail,
    openDetail,
    initSearch,
    initTheme,
    preloadRelated,
  } = cfg;
  const {
    t,
    L,
    getLang,
    initLang,
    onLangChange,
    applyStaticLang,
    setI18nRoot,
  } = i18n;

  const hooks = cfg.hooks ?? {};
  const mail = cfg.mail;

  const instances = new Map<string, ModuleInstance>();
  const pending = new Map<string, Promise<void>>();
  let current = "m-home";
  let updateHistory = true;

  function setHistoryUpdate(v: boolean): void {
    updateHistory = v;
  }

  /** 按当前语言生成预填主题/正文的 mailto 链接，唤起默认邮箱客户端。 */
  function mailtoHref(): string {
    const subject = encodeURIComponent(t("mail.subject"));
    const body = encodeURIComponent(t("mail.body"));
    const user = mail?.user ?? "";
    const domain = mail?.domain ?? "";
    return `mailto:${user}@${domain}?subject=${subject}&body=${body}`;
  }

  function updateMailLinks(): void {
    if (!mail) return;
    const href = mailtoHref();
    document
      .querySelectorAll<HTMLAnchorElement>("#heroMailLink")
      .forEach((a) => {
        a.href = href;
      });
  }

  /* ---------------- 模块切换 / 加载提示 ---------------- */

  const loadingEl = document.createElement("div");
  loadingEl.id = "loading";
  loadingEl.className = "loading-overlay";
  loadingEl.hidden = true;
  loadingEl.innerHTML =
    '<span class="spinner" aria-hidden="true"></span><span class="loading-text"></span>';

  function showLoading(def: ModuleDef): void {
    const label = loadingEl.querySelector<HTMLElement>(".loading-text");
    if (label) label.textContent = t("ui.loading");
    const root = document.getElementById(def.id);
    if (root) root.appendChild(loadingEl);
    loadingEl.hidden = false;
  }
  function hideLoading(): void {
    loadingEl.hidden = true;
    loadingEl.remove();
  }

  function setActive(id: string, entryId?: string): void {
    current = id;
    document.querySelectorAll<HTMLElement>("#modNav .mod").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.go === id);
    });
    document.querySelectorAll<HTMLElement>(".module").forEach((sec) => {
      sec.classList.toggle("active", sec.id === id);
    });
    const def = modules.find((m) => m.id === id);
    const hash = def ? `#${entryId ? `${def.key}/${entryId}` : def.key}` : "";
    if (updateHistory) {
      history.replaceState(
        null,
        "",
        hash || location.pathname + location.search,
      );
    }
  }

  function flash(key: string): void {
    const node = document.querySelector<HTMLElement>(
      `#${current} [data-key="${key}"]`,
    );
    if (!node) return;
    node.scrollIntoView({ block: "center", behavior: "smooth" });
    node.classList.add("flash");
    window.setTimeout(() => node.classList.remove("flash"), 1600);
  }

  async function ensureModule(def: ModuleDef): Promise<void> {
    if (!pending.has(def.id)) {
      pending.set(
        def.id,
        (async () => {
          const root = document.getElementById(def.id);
          if (!root) return;
          try {
            const mod = await def.load();
            const inst = await mod.default({ root, openDetail });
            if (inst) instances.set(def.id, inst);
          } catch (err) {
            console.error(`${logTag} 模块渲染失败:`, def.id, err);
            root.innerHTML = `<p class="empty">${esc(t("ui.loadFail"))}</p>`;
          }
        })(),
      );
    }
    await pending.get(def.id);
  }

  async function activate(
    id: string,
    openKey?: string,
    scroll = false,
  ): Promise<void> {
    setActive(id, openKey);
    const def = modules.find((m) => m.id === id);
    if (!def) return;
    if (!instances.has(def.id)) showLoading(def);
    await ensureModule(def);
    hideLoading();
    if (openKey) {
      const inst = instances.get(id);
      if (!inst?.openById?.(openKey)) flash(openKey);
    }
    if (scroll) window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* ---------------- 首页 / KPI / 页脚 ---------------- */

  function renderHome(): void {
    const host = need("#homeGrid");
    host.innerHTML = modules
      .map(
        (m) => `<button class="entry" type="button" data-go="${m.id}">
      <span class="entry-ic" aria-hidden="true">${m.icon}</span>
      <span class="entry-t">${esc(t(`entry.${m.key}.t`))}</span>
      <span class="entry-d">${esc(t(`entry.${m.key}.d`))}</span>
      <span class="entry-go">${esc(t("ui.enter"))}</span>
    </button>`,
      )
      .join("");
    host.querySelectorAll<HTMLElement>("[data-go]").forEach((btn) => {
      btn.addEventListener(
        "click",
        () => void activate(btn.dataset.go ?? "m-home", undefined, true),
      );
    });
  }

  async function renderKpis(): Promise<void> {
    const host = need("#kpis");
    try {
      const ov = await fetchData<OverviewFile>("overview.json");
      host.innerHTML = ov.kpis
        .map(
          (k) => `<div class="kpi">
          <span class="kpi-ic" aria-hidden="true">${esc(k.icon)}</span>
          <span class="kpi-body"><b class="kpi-v">${esc(k.value)}</b><span class="kpi-l">${esc(t(`kpi.${k.key}`))}</span></span>
        </div>`,
        )
        .join("");
    } catch {
      host.innerHTML = "";
    }
  }

  async function renderRefs(): Promise<void> {
    const box = need("#refsBox");
    const list = need("#refList");
    try {
      const items = await fetchData<LObj[]>("sources.json");
      if (!items.length) {
        box.hidden = true;
        return;
      }
      const en = getLang() === "en";
      const [yOpen, yClose] = en ? [" (", ")"] : ["（", "）"];
      list.innerHTML = items
        .map((s) => {
          const label = `${esc(L<string>(s, "label"))}${s.year ? `${yOpen}${esc(s.year)}${yClose}` : ""}`;
          const text = s.url
            ? `<a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${label}</a>`
            : label;
          return `<li>${text}<span class="ref-type">${esc(L<string>(s, "type"))}</span></li>`;
        })
        .join("");
      box.hidden = false;
    } catch {
      box.hidden = true;
    }
  }

  function renderFooter(): void {
    const foot = need("#foot");
    foot.innerHTML = `
    <p class="foot-feedback">${esc(t("foot.feedback"))}：<a href="https://github.com/MinosIE/wanwu-hub/issues" target="_blank" rel="noopener noreferrer">GitHub Issues ↗</a> · <a id="heroMailLink" href="#">${esc(t("heroMail"))}</a></p>
    <p>${esc(t("foot.tip"))}</p>
    <p>${esc(t("foot.copy"))}</p>`;
  }

  /* ---------------- 深链 / 顶栏 ---------------- */

  function bindTop(): void {
    const top = need("#toTop");
    const onScroll = () => top.classList.toggle("show", window.scrollY > 420);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    top.addEventListener("click", () =>
      window.scrollTo({ top: 0, behavior: "smooth" }),
    );
  }

  function bindNav(): void {
    document.querySelectorAll<HTMLElement>("#modNav .mod").forEach((btn) => {
      btn.addEventListener(
        "click",
        () => void activate(btn.dataset.go ?? "m-home", undefined, true),
      );
    });
  }

  function deepLink(): void {
    const raw = decodeURIComponent(location.hash.replace(/^#/, ""));
    if (!raw) return;
    const [key, id] = raw.split("/");
    const def = moduleByKey(key);
    if (def) void activate(def.id, id || undefined);
  }

  /* ---------------- 启动 ---------------- */

  function boot(root: ParentNode = document): void {
    instances.clear();
    pending.clear();
    current = "m-home";
    if (window.self !== window.top) document.body.classList.add("embedded");

    setI18nRoot(root);
    hooks.beforeInit?.();
    initLang();
    applyStaticLang();
    initTheme(root);
    initDetail();
    void preloadRelated();

    renderHome();
    void renderKpis();
    void renderRefs();
    renderFooter();
    hooks.afterRender?.();
    updateMailLinks();
    bindNav();
    bindTop();

    initSearch((entry) => {
      void activate(entry.m, entry.id, true);
    });

    provideApp({
      switchModule: (id: string) => setActive(id),
      openTarget: (moduleId: string, key: string) =>
        void activate(moduleId, key, true),
      currentModule: () => current,
    });

    deepLink();

    onLangChange(() => {
      renderHome();
      renderFooter();
      void renderKpis();
      void renderRefs();
      updateMailLinks();
      if (current !== "m-home") {
        const def = modules.find((m) => m.id === current);
        pending.delete(current);
        instances.delete(current);
        if (def) void ensureModule(def);
      }
      hooks.onLangChangeExtra?.();
    });

    // 标题 / 描述 / 语言属性随语言切换
    onLangChange(() => {
      document.title = t("docTitle");
      document
        .querySelector('meta[name="description"]')
        ?.setAttribute("content", t("docDesc"));
    });
    document.title = t("docTitle");
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", t("docDesc"));
  }

  return { boot, activate, setHistoryUpdate };
}
