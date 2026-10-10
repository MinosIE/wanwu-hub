import "./subjectKit.css";
import { getLang, onLangChange } from "../core/i18n";

export type LStr = { zh: string; en: string };

/** 取当前语言的字段值（与主应用 i18n 共用同一语言状态）。 */
export const L = (o?: LStr | string): string => {
  if (!o) return "";
  if (typeof o === "string") return o;
  return getLang() === "en" ? o.en || o.zh : o.zh || o.en;
};

/** hero 标题：中文模式显示「中文 · English」，英文模式仅 English（与其它学科的 i18n 表现一致）。 */
export const heroTitleText = (o?: LStr): string => {
  if (!o) return "";
  if (getLang() === "en") return o.en || o.zh;
  return `${o.zh}${o.en ? ` · ${o.en}` : ""}`;
};

export interface PeriodicCell {
  /** 网格行（周期；镧系=9，锕系=10） */
  row: number;
  /** 网格列（族 1–18） */
  col: number;
  symbol: string;
  /** 原子序数 */
  z: number;
  /** 分类键，对应 .cat-* 与 PT_CATS */
  cat: string;
  /** 相对原子质量 */
  mass?: string;
}

/** 结构化公式：化学方程式 / 物理定律等。lhs、rhs 为受信内容（可含 <sub>/<sup> 等标记，不转义）。 */
export interface Eq {
  /** 等号左侧（反应物 / 因变量） */
  lhs: string;
  /** 等号右侧（生成物 / 表达式） */
  rhs: string;
  /** 关系符上方标注（如反应条件：点燃 / △ / 催化剂） */
  cond?: LStr;
  /** 连接样式：reaction=长双等号（默认，化学）/ equal=等号 / arrow=箭头 / equilibrium=可逆箭头 ⇌ */
  rel?: "reaction" | "equal" | "arrow" | "equilibrium";
}

export interface SubjectItem {
  id: string;
  icon?: string;
  term: LStr;
  level?: number;
  /** 关键常数等可用 value 显示数值 */
  value?: LStr;
  oneLiner: LStr;
  detail?: LStr;
  example?: LStr;
  tags?: LStr[];
  related?: string[];
  /** 可选示意图：内联 SVG。字符串=中英共用；{zh,en}=按语言各取一张。
   *  详情面板将其作为受信静态内容原样渲染（不经 HTML 转义），仅供开发者-authored 使用。 */
  figure?: string | LStr;
  /** 结构化公式（受信渲染，见 eqHTML）；单条或数组。 */
  eq?: Eq | Eq[];
  /** 周期表单元专用：提供后该条目按 2D 网格渲染 */
  pt?: PeriodicCell;
}

export interface SubjectModule {
  key: string;
  icon: string;
  title: LStr;
  items: SubjectItem[];
  /** 渲染方式：cards（默认）或 periodic（完整周期表 2D 网格） */
  kind?: "cards" | "periodic";
}

export interface SubjectRef {
  label: LStr;
  url?: string;
  type?: LStr;
}

export interface SubjectConfig {
  rootClass: string;
  accent: string;
  heroTitle: LStr;
  heroSub: LStr;
  intro?: LStr;
  modules: SubjectModule[];
  /** 可选来源区（教材 / 著作 / 机构 / 科普…） */
  refs?: SubjectRef[];
}

function esc(s: string): string {
  return s.replace(
    /[&<>"]/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!,
  );
}

/** 示意图：作为受信静态 SVG 原样输出（不转义）；无内容则返回空串。
 *  仅用于开发者-authored 的 data.ts 常量，切勿传入用户输入。 */
function figureHTML(fig?: string | LStr): string {
  if (!fig) return "";
  const raw = typeof fig === "string" ? fig : L(fig);
  return raw && raw.trim() ? `<div class="sd-figure">${raw}</div>` : "";
}

/** 单条公式：lhs [条件置于关系符上方] rhs。lhs/rhs 为受信 HTML（不转义）；cond 为纯文本（转义）。 */
const EQ_OP_CHAR: Record<string, string> = {
  arrow: "→",
  equal: "=",
  equilibrium: "⇌",
};
function eqOne(e: Eq): string {
  const rel = e.rel ?? "reaction";
  const op =
    rel === "reaction"
      ? `<span class="eq-line"></span>`
      : `<span class="eq-op">${EQ_OP_CHAR[rel]}</span>`;
  // 有条件：上下各铺一层（下方为空镜像），使关系符始终垂直居中；无条件：不渲染 cond。
  const relInner = e.cond
    ? `<span class="eq-cond">${esc(L(e.cond))}</span>${op}<span class="eq-cond"></span>`
    : op;
  return `<span class="eq eq-${rel}"><span class="eq-side">${e.lhs}</span><span class="eq-rel">${relInner}</span><span class="eq-side">${e.rhs}</span></span>`;
}

/** 公式集：作为受信静态内容输出（仅开发者-authored，切勿传入用户输入）；无内容返回空串。 */
function eqHTML(eq?: Eq | Eq[]): string {
  if (!eq) return "";
  const arr = Array.isArray(eq) ? eq : [eq];
  return `<div class="eq-set">${arr.map(eqOne).join("")}</div>`;
}

const FEEDBACK_TEXT: LStr = {
  zh: "发现问题或有建议？欢迎通过 GitHub 提 Issue 或邮件反馈",
  en: "Found a problem or have a suggestion? File a GitHub issue or email us",
};
const MAIL_LABEL: LStr = { zh: "✉️ 邮件反馈", en: "✉️ Email" };

/** 生成预填主题/正文的 mailto 链接（与全站一致的反馈邮箱）。 */
function mailHref(): string {
  const subject = encodeURIComponent(
    L({ zh: "【万物通识·问题反馈】", en: "[Wanwu Tongsheng feedback]" }),
  );
  const body = encodeURIComponent(
    L({
      zh: "您好，我在浏览「万物通识」时发现以下问题 / 建议：\n\n",
      en: "Hi, I found the following issue / suggestion while browsing Wanwu Tongsheng:\n\n",
    }),
  );
  return `mailto:417913012@qq.com?subject=${subject}&body=${body}`;
}

function cardHTML(item: SubjectItem): string {
  const value = item.value
    ? `<span class="card-val">${esc(L(item.value))}</span>`
    : "";
  return `<article class="card js-item" data-key="${esc(item.id)}" tabindex="0" role="button" aria-label="${esc(L(item.term))}">
    <header class="card-h">
      <span class="card-ic">${item.icon ?? "•"}</span>
      <span class="card-t">${esc(L(item.term))}</span>
      ${item.level != null ? `<span class="lvl lvl-${item.level}">L${item.level}</span>` : ""}
    </header>
    ${item.eq ? `<div class="card-eq">${eqHTML(Array.isArray(item.eq) ? item.eq[0] : item.eq)}</div>` : ""}
    <p class="card-lead">${esc(L(item.oneLiner))}</p>
    <footer class="card-f">
      ${item.tags && item.tags.length ? `<span class="tag">${esc(L(item.tags[0]))}</span>` : ""}
      ${value}
      <span class="card-go">${esc(L({ zh: "查看", en: "View" }))}</span>
    </footer>
  </article>`;
}

/**
 * 生成一个轻量、可双语、可深链的学科视图挂载函数。
 * hero / 搜索 / 模块导航 / 卡片 / 来源 / 页脚 均复用共享 UI 层（src/core/ui/ui.css），
 * 不自带一份副本；仅详情面板与联机搜索结果为学科专属实现。
 */
function kpisInner(cfg: SubjectConfig): string {
  const total = cfg.modules.reduce((n, m) => n + m.items.length, 0);
  const kpis: { icon: string; value: string; label: LStr }[] = [
    {
      icon: "🧩",
      value: String(total),
      label: { zh: "核心概念", en: "Concepts" },
    },
    {
      icon: "📚",
      value: String(cfg.modules.length),
      label: { zh: "知识模块", en: "Modules" },
    },
    {
      icon: "📎",
      value: String(cfg.refs?.length ?? 0),
      label: { zh: "参考来源", en: "References" },
    },
    {
      icon: "🌐",
      value: "中 / EN",
      label: { zh: "中英双语", en: "Bilingual" },
    },
  ];
  return kpis
    .map(
      (k) =>
        `<div class="kpi"><span class="kpi-ic" aria-hidden="true">${esc(k.icon)}</span><span class="kpi-body"><b class="kpi-v">${esc(k.value)}</b><span class="kpi-l">${esc(L(k.label))}</span></span></div>`,
    )
    .join("");
}

/** 周期表分类（键与 .cat-* 颜色类、与数据 cat 字段一一对应）。 */
const PT_CATS: { key: string; zh: string; en: string }[] = [
  { key: "alkali", zh: "碱金属", en: "Alkali" },
  { key: "alkaline", zh: "碱土金属", en: "Alkaline earth" },
  { key: "transition", zh: "过渡金属", en: "Transition" },
  { key: "post", zh: "主族金属", en: "Post-transition" },
  { key: "metalloid", zh: "类金属", en: "Metalloid" },
  { key: "nonmetal", zh: "非金属", en: "Nonmetal" },
  { key: "halogen", zh: "卤素", en: "Halogen" },
  { key: "noble", zh: "稀有气体", en: "Noble gas" },
  { key: "lanthanide", zh: "镧系", en: "Lanthanide" },
  { key: "actinide", zh: "锕系", en: "Actinide" },
  { key: "unknown", zh: "人工合成", en: "Synthetic" },
];

/** 渲染完整周期表（2D 网格 + 图例）。镧系/锕系放在下方独立两行。 */
function periodicHTML(m: SubjectModule): string {
  const cells = m.items
    .map((it) => {
      const p = it.pt!;
      return `<button class="pt-cell cat-${p.cat} js-pt" style="grid-row:${p.row};grid-column:${p.col}" data-key="${esc(it.id)}" aria-label="${esc(L(it.term))}">
        <span class="pt-z">${p.z}</span>
        <span class="pt-sym">${esc(p.symbol)}</span>
        <span class="pt-name">${esc(it.term.zh)}</span>
      </button>`;
    })
    .join("");
  const markers = `
    <div class="pt-cell pt-marker" style="grid-row:6;grid-column:3">57–71</div>
    <div class="pt-cell pt-marker" style="grid-row:7;grid-column:3">89–103</div>
    <div class="pt-spacer" style="grid-row:8;grid-column:1/-1"></div>`;
  const legend = `<div class="pt-legend" style="grid-row:11;grid-column:1/-1">${PT_CATS.map(
    (c) =>
      `<span class="pt-leg"><i class="pt-swatch cat-${c.key}"></i>${esc(L({ zh: c.zh, en: c.en }))}</span>`,
  ).join("")}</div>`;
  return cells + markers + legend;
}

function refsInner(refs: SubjectRef[]): string {
  const items = refs
    .map((r) => {
      const label = esc(L(r.label));
      const text = r.url
        ? `<a href="${esc(r.url)}" target="_blank" rel="noopener noreferrer">${label}</a>`
        : label;
      return `<li>${text}${r.type ? `<span class="ref-type">${esc(L(r.type))}</span>` : ""}</li>`;
    })
    .join("");
  return `<h2>${esc(L({ zh: "主要参考资料与数据来源", en: "Key References & Sources" }))}</h2>
    <ul class="ref-list">${items}</ul>`;
}

export function createSubject(cfg: SubjectConfig) {
  return async (view: HTMLElement, sub?: string): Promise<() => void> => {
    const hasRefs = !!(cfg.refs && cfg.refs.length);
    view.innerHTML = `<div class="${cfg.rootClass} subject-root" style="--accent:${cfg.accent};--hero:linear-gradient(155deg, color-mix(in srgb, ${cfg.accent} 72%, #06121a), color-mix(in srgb, ${cfg.accent} 40%, #06121a))">
      <div class="wrap">
        <section class="hero">
          <h1>${esc(heroTitleText(cfg.heroTitle))}</h1>
          ${cfg.intro ? `<p class="hero-sub">${esc(L(cfg.intro))}</p>` : ""}
          <div class="kpis" id="kpis">${kpisInner(cfg)}</div>
        </section>
        <div class="search">
          <input id="search" class="search-input" type="search" autocomplete="off"
            placeholder="${esc(L({ zh: "搜索：概念 / 术语 / 关键词…", en: "Search: concepts / terms / keywords…" }))}"
            aria-label="${esc(L({ zh: "搜索", en: "Search" }))}" />
        </div>
        <nav class="modnav" aria-label="模块导航">${cfg.modules
          .map(
            (m, i) =>
              `<button class="mod${i === 0 ? " active" : ""}" data-go="${m.key}"><span class="sm-ic" aria-hidden="true">${m.icon}</span><span class="sm-label">${esc(L(m.title))}</span></button>`,
          )
          .join("")}</nav>
        <div class="modules">${cfg.modules
          .map(
            (m, i) =>
              `<section class="module${i === 0 ? " active" : ""}" id="sm-${m.key}">
                <header class="sm-head"><h2>${esc(L(m.title))}</h2><span class="sm-count"></span></header>
                <div class="card-grid${m.kind === "periodic" ? " pt-grid" : ""}"></div>
              </section>`,
          )
          .join("")}</div>
        <div class="sub-results" id="subResults" hidden></div>
        ${hasRefs ? `<section class="refs" id="refs">${refsInner(cfg.refs!)}</section>` : ""}
        <footer class="foot">
          <p class="foot-feedback">${esc(L(FEEDBACK_TEXT))}：<a href="https://github.com/MinosIE/wanwu-hub/issues" target="_blank" rel="noopener noreferrer">GitHub Issues ↗</a> · <a id="heroMailLink" href="${mailHref()}">${esc(L(MAIL_LABEL))}</a></p>
          <p class="foot-copy">© 2026 万物通识 · MIT License</p>
        </footer>
      </div>
      <button class="to-top" id="toTop" type="button" aria-label="返回顶部">↑</button>
      <div class="sub-detail" id="subDetail" hidden></div>
    </div>`;

    const root = view.querySelector<HTMLElement>(`.${cfg.rootClass}`)!;
    const grids = root.querySelectorAll<HTMLElement>(".card-grid");

    const renderModule = (m: SubjectModule, grid: HTMLElement) => {
      if (m.kind === "periodic") {
        grid.innerHTML = periodicHTML(m);
        grid.querySelectorAll<HTMLElement>(".js-pt").forEach((el) => {
          const open = () => openDetail(m, el.dataset.key!);
          el.addEventListener("click", open);
          el.addEventListener("keydown", (e) => {
            if ((e as KeyboardEvent).key === "Enter") open();
          });
        });
        const sec = root.querySelector<HTMLElement>(`#sm-${m.key}`);
        if (sec)
          sec.querySelector<HTMLElement>(".sm-count")!.textContent = String(
            m.items.length,
          );
        return;
      }
      grid.innerHTML = m.items.map(cardHTML).join("");
      grid.querySelectorAll<HTMLElement>(".js-item").forEach((el) => {
        const open = () => openDetail(m, el.dataset.key!);
        el.addEventListener("click", open);
        el.addEventListener("keydown", (e) => {
          if ((e as KeyboardEvent).key === "Enter") open();
        });
      });
      const sec = root.querySelector<HTMLElement>(`#sm-${m.key}`);
      if (sec)
        sec.querySelector<HTMLElement>(".sm-count")!.textContent = String(
          m.items.length,
        );
    };

    const closeDetail = () => {
      const d = root.querySelector<HTMLElement>("#subDetail")!;
      d.hidden = true;
      d.innerHTML = "";
    };
    const openDetail = (m: SubjectModule, id: string) => {
      const item = m.items.find((x) => x.id === id);
      if (!item) return;
      const d = root.querySelector<HTMLElement>("#subDetail")!;
      d.innerHTML = `<div class="sd-backdrop"></div><div class="sd-panel" role="dialog" aria-modal="true">
        <button class="sd-close" type="button" aria-label="关闭">×</button>
        <div class="sd-eyebrow">${esc(L(m.title))}${item.level != null ? ` · L${item.level}` : ""}</div>
        <h2 class="sd-title">${esc(L(item.term))}</h2>
        ${item.value ? `<div class="sd-value">${esc(L(item.value))}</div>` : ""}
        <div class="sd-lead">${esc(L(item.oneLiner))}</div>
        ${eqHTML(item.eq)}
        ${figureHTML(item.figure)}
        ${item.detail ? `<p class="sd-sec"><b>📘</b><span>${esc(L(item.detail))}</span></p>` : ""}
        ${item.example ? `<p class="sd-sec"><b>🧪</b><span>${esc(L(item.example))}</span></p>` : ""}
        ${item.tags && item.tags.length ? `<div class="sd-tags">${item.tags.map((t) => `<span class="tag">${esc(L(t))}</span>`).join("")}</div>` : ""}
      </div>`;
      d.hidden = false;
      d.querySelector(".sd-close")!.addEventListener("click", closeDetail);
      d.querySelector(".sd-backdrop")!.addEventListener("click", closeDetail);
    };

    cfg.modules.forEach((m, i) => renderModule(m, grids[i]));

    root.querySelectorAll<HTMLElement>(".mod").forEach((btn) => {
      btn.addEventListener("click", () => {
        const k = btn.dataset.go!;
        root
          .querySelectorAll(".mod")
          .forEach((b) => b.classList.toggle("active", b === btn));
        root
          .querySelectorAll<HTMLElement>(".module")
          .forEach((s) => s.classList.toggle("active", s.id === `sm-${k}`));
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    });

    // 搜索：跨模块过滤卡片，命中项汇总到结果区
    const allItems = cfg.modules.flatMap((m) =>
      m.items.map((it) => ({ m, it })),
    );
    const searchInput = root.querySelector<HTMLInputElement>("#search");
    const resultsEl = root.querySelector<HTMLElement>("#subResults")!;
    const navEl = root.querySelector<HTMLElement>(".modnav")!;
    const modulesEl = root.querySelector<HTMLElement>(".modules")!;

    const onSearch = () => {
      const q = (searchInput?.value ?? "").trim().toLowerCase();
      if (!q) {
        resultsEl.hidden = true;
        navEl.style.display = "";
        modulesEl.style.display = "";
        cfg.modules.forEach((m, i) => renderModule(m, grids[i]));
        return;
      }
      const matches = allItems.filter(({ it }) => {
        const hay = [
          L(it.term),
          L(it.oneLiner),
          it.value ? L(it.value) : "",
          ...(it.tags ?? []).map((t) => L(t)),
        ]
          .join(" ")
          .toLowerCase();
        return hay.includes(q);
      });
      navEl.style.display = "none";
      modulesEl.style.display = "none";
      resultsEl.hidden = false;
      resultsEl.innerHTML = matches.length
        ? matches.map(({ it }) => cardHTML(it)).join("")
        : `<p class="sub-no-result">${esc(L({ zh: "未找到匹配项", en: "No matches" }))}</p>`;
      resultsEl.querySelectorAll<HTMLElement>(".js-item").forEach((el) => {
        const hit = allItems.find((x) => x.it.id === el.dataset.key);
        if (!hit) return;
        const open = () => openDetail(hit.m, hit.it.id);
        el.addEventListener("click", open);
        el.addEventListener("keydown", (e) => {
          if ((e as KeyboardEvent).key === "Enter") open();
        });
      });
    };
    searchInput?.addEventListener("input", onSearch);

    const top = root.querySelector<HTMLElement>("#toTop")!;
    const onScroll = () => top.classList.toggle("show", window.scrollY > 420);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    top.addEventListener("click", () =>
      window.scrollTo({ top: 0, behavior: "smooth" }),
    );

    const offLang = onLangChange(() => {
      const h1 = root.querySelector<HTMLElement>(".hero h1");
      if (h1) h1.textContent = heroTitleText(cfg.heroTitle);
      const intro = root.querySelector<HTMLElement>(".hero-sub");
      if (intro && cfg.intro) intro.textContent = L(cfg.intro);
      const kpisEl = root.querySelector<HTMLElement>("#kpis");
      if (kpisEl) kpisEl.innerHTML = kpisInner(cfg);
      root
        .querySelectorAll<HTMLElement>(".mod .sm-label")
        .forEach((b, i) => (b.textContent = L(cfg.modules[i].title)));
      root
        .querySelectorAll<HTMLElement>(".sm-head h2")
        .forEach((h, i) => (h.textContent = L(cfg.modules[i].title)));
      cfg.modules.forEach((m, i) => renderModule(m, grids[i]));
      const ml = root.querySelector<HTMLAnchorElement>("#heroMailLink");
      if (ml) ml.href = mailHref();
      if (searchInput)
        searchInput.placeholder = L({
          zh: "搜索：概念 / 术语 / 关键词…",
          en: "Search: concepts / terms / keywords…",
        });
      if (!resultsEl.hidden) onSearch();
      const refsEl = root.querySelector<HTMLElement>("#refs");
      if (refsEl && cfg.refs && cfg.refs.length)
        refsEl.innerHTML = refsInner(cfg.refs);
      closeDetail();
    });

    if (sub) {
      const [k, id] = sub.split("/");
      const m = cfg.modules.find((x) => x.key === k);
      if (m) {
        root
          .querySelectorAll(".mod")
          .forEach((b) =>
            b.classList.toggle("active", (b as HTMLElement).dataset.go === k),
          );
        root
          .querySelectorAll<HTMLElement>(".module")
          .forEach((s) => s.classList.toggle("active", s.id === `sm-${k}`));
        if (id) openDetail(m, id);
      }
    }

    return () => {
      offLang();
      window.removeEventListener("scroll", onScroll);
      closeDetail();
    };
  };
}
