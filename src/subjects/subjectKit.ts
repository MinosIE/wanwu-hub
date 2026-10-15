import "./subjectKit.css";
import { getLang, onLangChange } from "../core/i18n";
import { mountNavDropdown } from "./_shared/mobileNav";

export type LStr = { zh: string; en: string };

/** 取当前语言的字段值（与主应用 i18n 共用同一语言状态）。 */
export const L = (o?: LStr | string): string => {
  if (!o) return "";
  if (typeof o === "string") return o;
  return getLang() === "en" ? o.en || o.zh : o.zh || o.en;
};

/** hero 标题：中文模式仅显示中文，英文模式显示 English（中文里不再夹英文副标题）。 */
export const heroTitleText = (o?: LStr): string => {
  if (!o) return "";
  if (getLang() === "en") return o.en || o.zh;
  return o.zh;
};

/** 难度等级文案：与 thought / earth / life 等学科的 ui.lvl1..3 用词一致。 */
const LEVELS: { level: number; label: LStr }[] = [
  { level: 1, label: { zh: "入门", en: "Intro" } },
  { level: 2, label: { zh: "进阶", en: "Intermediate" } },
  { level: 3, label: { zh: "拓展", en: "Advanced" } },
];
const levelLabel = (level?: number): string => {
  const hit = LEVELS.find((x) => x.level === level);
  return hit ? L(hit.label) : "";
};
/** 视图内小工具文案（轻量学科没有独立字典，故就地给中英对）。 */
const TXT = {
  all: { zh: "全部", en: "All" },
  level: { zh: "难度", en: "Level" },
  empty: {
    zh: "该难度暂无条目，换个筛选试试",
    en: "Nothing at this level yet",
  },
  noResult: { zh: "未找到匹配项", en: "No matches" },
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

/** 反应参与物/生成物的逐项释义。f 为化学式（受信，可含下标）；name/note 为纯文本（转义）。 */
export interface Sub {
  /** 化学式（含系数），如 "2KMnO₄" */
  f: string;
  /** 中文名 + 状态，如 "高锰酸钾（紫黑色固体）" */
  name: LStr;
  /** 在本反应中的角色/现象/用途说明 */
  note: LStr;
  /** 归属：l=反应物 / r=生成物 / c=条件·催化剂·介质 */
  role: "l" | "r" | "c";
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
  /** 反应参与物/生成物的逐项释义（仅详情面板展示，见 subsHTML）。 */
  subs?: Sub[];
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
  /** 可选自定义渲染：给定本模块的 .card-grid 容器，由学科自行提供交互内容
   * （如 chem 的 3D 分子查看器）。设置后 renderModule 调用它并跳过默认卡片；
   *  该字段是函数，数据导出器会忽略（仅按 items/kind 等序列化）。 */
  custom?: (grid: HTMLElement) => void;
}

/** 只要模块里有任何带难度的条目，就提供难度筛选条（与 FULL 学科一致）。 */
const hasLevels = (m: SubjectModule): boolean =>
  m.kind !== "periodic" && m.items.some((it) => it.level != null);

export interface SubjectRef {
  label: LStr;
  url?: string;
  type?: LStr;
}

export interface SubjectConfig {
  rootClass: string;
  accent: string;
  heroTitle: LStr;
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
/** 将生成/消耗的现象符号包为可动画节点：↑ 气体上浮、↓ 沉淀下落。 */
function markSides(s: string): string {
  return s
    .replace(/↑/g, '<i class="eq-up" aria-hidden="true">↑</i>')
    .replace(/↓/g, '<i class="eq-down" aria-hidden="true">↓</i>');
}

/** 根据反应条件推断现象类（火焰/加热/通电/光照/催化），供 CSS 微动效选择器。 */
function condFxClass(cond?: LStr): string {
  const c = L(cond);
  if (!c) return "";
  if (/点燃|ignite/i.test(c)) return " eq-fire";
  if (/通电|electrolysis/i.test(c)) return " eq-elec";
  if (/光照|叶绿体|light/i.test(c)) return " eq-light";
  if (/催化|catalys|cat\.|MnO₂/i.test(c)) return " eq-cat";
  if (/△|加热|heat|高温|high temp/i.test(c)) return " eq-heat";
  return "";
}

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
  const fx = condFxClass(e.cond);
  return `<span class="eq eq-${rel}${fx}"><span class="eq-side">${markSides(
    e.lhs,
  )}</span><span class="eq-rel">${relInner}</span><span class="eq-side">${markSides(
    e.rhs,
  )}</span></span>`;
}

/** 公式集：作为受信静态内容输出（仅开发者-authored，切勿传入用户输入）；无内容返回空串。
 *  animated=true（仅详情面板）：包上 .eq-anim 以启用反应动画（重放按钮由标题行提供）。 */
function eqHTML(eq?: Eq | Eq[], animated = false): string {
  if (!eq) return "";
  const arr = Array.isArray(eq) ? eq : [eq];
  const body = arr.map(eqOne).join("");
  return `<div class="eq-set${animated ? " eq-anim" : ""}">${body}</div>`;
}

/** 重放按钮（放在详情标题行右侧）；仅当条目含公式时渲染。 */
function replayBtn(eq?: Eq | Eq[]): string {
  if (!eq) return "";
  return `<button class="eq-replay" type="button">${esc(
    L({ zh: "↻ 重放", en: "↻ Replay" }),
  )}</button>`;
}

/** 反应物/生成物逐项释义：按 反应物 / 生成物 / 条件 分组展示（仅详情）。 */
const SUB_GROUPS: { role: "l" | "r" | "c"; label: LStr }[] = [
  { role: "l", label: { zh: "反应物", en: "Reactants" } },
  { role: "r", label: { zh: "生成物", en: "Products" } },
  {
    role: "c",
    label: { zh: "条件 · 催化/介质", en: "Conditions · Catalyst/Medium" },
  },
];
function subsHTML(subs?: Sub[]): string {
  if (!subs || !subs.length) return "";
  const groups = SUB_GROUPS.map((g) => {
    const items = subs.filter((s) => s.role === g.role);
    if (!items.length) return "";
    const lis = items
      .map(
        (s) =>
          `<li class="sub"><span class="sub-f">${s.f}</span><span class="sub-body"><b class="sub-n">${esc(
            L(s.name),
          )}</b><span class="sub-d">${esc(L(s.note))}</span></span></li>`,
      )
      .join("");
    return `<div class="sub-group" data-role="${g.role}"><h4 class="sub-h">${esc(
      L(g.label),
    )}</h4><ul class="sub-list">${lis}</ul></div>`;
  }).join("");
  return `<div class="sd-subs">${groups}</div>`;
}

const FEEDBACK_TEXT: LStr = {
  zh: "发现问题或有建议？欢迎通过 GitHub 提 Issue 或邮件反馈",
  en: "Found a problem or have a suggestion? File a GitHub issue or email us",
};
const MAIL_LABEL: LStr = { zh: "✉️ 邮件反馈", en: "✉️ Email" };

/** 生成预填主题/正文的 mailto 链接（与全站一致的反馈邮箱）。 */
function mailHref(): string {
  const subject = encodeURIComponent(
    L({ zh: "【万物通识·问题反馈】", en: "[Everything feedback]" }),
  );
  const body = encodeURIComponent(
    L({
      zh: "您好，我在浏览「万物通识」时发现以下问题 / 建议：\n\n",
      en: "Hi, I found the following issue / suggestion while browsing Everything:\n\n",
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
      ${item.level != null ? `<span class="lvl lvl-${item.level}">${esc(levelLabel(item.level))}</span>` : ""}
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
const PT_CATS: { key: string; zh: string; en: string; desc: LStr }[] = [
  {
    key: "alkali",
    zh: "碱金属",
    en: "Alkali",
    desc: {
      zh: "最外层只有 1 个电子：质地柔软、密度小，遇水剧烈反应放出氢气并生成碱，是最活泼的金属族，也是强还原剂。",
      en: "One outer electron: soft, low-density metals that react violently with water to release hydrogen and form alkalis — the most reactive metal group, and strong reducing agents.",
    },
  },
  {
    key: "alkaline",
    zh: "碱土金属",
    en: "Alkaline earth",
    desc: {
      zh: "最外层有 2 个电子：银白色金属，活泼性仅次于碱金属，燃烧时常发出特征焰色，是骨骼、合金与烟火的重要元素。",
      en: "Two outer electrons: silvery metals slightly less reactive than alkali metals, often giving characteristic flame colours when burned — key in bones, alloys and fireworks.",
    },
  },
  {
    key: "transition",
    zh: "过渡金属",
    en: "Transition",
    desc: {
      zh: "d 亚层未填满：化合价多变、化合物常有颜色，硬度高、熔点高、导电导热好，是结构材料与催化剂的主力（如铁、铜、铂）。",
      en: "Partially filled d-subshells: variable valence and coloured compounds, hard, high-melting and good conductors — the workhorses of structural materials and catalysts (iron, copper, platinum).",
    },
  },
  {
    key: "post",
    zh: "主族金属",
    en: "Post-transition",
    desc: {
      zh: "紧邻金属与非金属分界线的右侧：质地偏软、熔点较低，导电导热良好，常见如铝、锡、铅，多用于轻合金与焊料。",
      en: "Just right of the metal–metalloid line: relatively soft and low-melting yet good conductors — e.g. aluminium, tin and lead, widely used in light alloys and solder.",
    },
  },
  {
    key: "metalloid",
    zh: "类金属",
    en: "Metalloid",
    desc: {
      zh: "性质介于金属与非金属之间：导电性可被精确调控，是半导体与芯片的核心材料（如硅、锗）。",
      en: "Properties between metals and nonmetals: their tunable conductivity makes them the core of semiconductors and chips (silicon, germanium).",
    },
  },
  {
    key: "nonmetal",
    zh: "非金属",
    en: "Nonmetal",
    desc: {
      zh: "容易获得电子：多为气体或脆性固体，导热导电差，却是有机物与生命元素的主体（如碳、氢、氧、氮）。",
      en: "Tend to gain electrons: mostly gases or brittle, poor-conducting solids, yet the backbone of organic matter and life (carbon, hydrogen, oxygen, nitrogen).",
    },
  },
  {
    key: "halogen",
    zh: "卤素",
    en: "Halogen",
    desc: {
      zh: "最外层有 7 个电子：氧化性强，与金属化合即成盐，活泼性自上而下递减（氟最烈），广泛用于消毒、制冷剂与材料。",
      en: "Seven outer electrons: strongly oxidising, they form salts with metals; reactivity falls down the group (fluorine the fiercest) — used in disinfectants, refrigerants and materials.",
    },
  },
  {
    key: "noble",
    zh: "稀有气体",
    en: "Noble gas",
    desc: {
      zh: "最外层电子满壳：极难发生化学反应，通电时发出特征光，用作保护气、霓虹灯与低温冷却（如氦、氖、氩）。",
      en: "Full outer shells: almost inert, they glow with characteristic colours under electricity — used as shielding gases, neon lights and cryogenic coolants (helium, neon, argon).",
    },
  },
  {
    key: "lanthanide",
    zh: "镧系",
    en: "Lanthanide",
    desc: {
      zh: "4f 电子逐层填充：彼此性质极为相近，统称稀土元素，是强磁体、发光荧光与催化材料的关键（如钕、铕）。",
      en: "Filling 4f subshells: chemically very similar, collectively the rare earths — vital to strong magnets, phosphors and catalysts (neodymium, europium).",
    },
  },
  {
    key: "actinide",
    zh: "锕系",
    en: "Actinide",
    desc: {
      zh: "5f 电子逐层填充：全部具有放射性，钍、铀、钚是核能与核反应堆的核心燃料。",
      en: "Filling 5f subshells: all radioactive; thorium, uranium and plutonium are the core fuels of nuclear energy and reactors.",
    },
  },
  {
    key: "unknown",
    zh: "人工合成",
    en: "Synthetic",
    desc: {
      zh: "经核反应人工合成：原子序数极高、极不稳定、半衰期以毫秒计，目前仅用于基础科学研究。",
      en: "Made artificially in nuclear reactions: extremely high atomic numbers, highly unstable with half-lives in milliseconds — used only in fundamental research so far.",
    },
  },
];

/** 渲染完整周期表（2D 网格 + 图例）。镧系/锕系放在下方独立两行。 */
function periodicHTML(m: SubjectModule): string {
  const cells = m.items
    .map((it) => {
      const p = it.pt!;
      return `<button class="pt-cell cat-${p.cat} js-pt" style="grid-row:${p.row};grid-column:${p.col}" data-key="${esc(it.id)}" data-cat="${esc(p.cat)}" aria-label="${esc(L(it.term))}">
        <span class="pt-z">${p.z}</span>
        <span class="pt-sym">${esc(p.symbol)}</span>
        <span class="pt-name">${esc(it.term.zh)}</span>
      </button>`;
    })
    .join("");
  // 57–71 / 89–103 占位格做成可点击按钮：点击高亮并滚动定位到下方对应那一行镧系/锕系元素。
  const markers = `
    <button type="button" class="pt-cell pt-marker js-pt-marker" style="grid-row:6;grid-column:3" data-cat="lanthanide" aria-pressed="false" aria-label="${esc(L({ zh: "镧系 57–71", en: "Lanthanides 57–71" }))}">57–71</button>
    <button type="button" class="pt-cell pt-marker js-pt-marker" style="grid-row:7;grid-column:3" data-cat="actinide" aria-pressed="false" aria-label="${esc(L({ zh: "锕系 89–103", en: "Actinides 89–103" }))}">89–103</button>
    <div class="pt-spacer" style="grid-row:8;grid-column:1/-1"></div>`;
  // 图例居中；每项可点击，点击高亮对应分类的元素（再点取消）。
  const legend = `<div class="pt-legend" style="grid-row:11;grid-column:1/-1">${PT_CATS.map(
    (c) =>
      `<button type="button" class="pt-leg js-pt-leg" data-cat="${esc(c.key)}" aria-pressed="false"><i class="pt-swatch cat-${c.key}"></i>${esc(L({ zh: c.zh, en: c.en }))}</button>`,
  ).join("")}</div>`;
  const hint = `<p class="pt-hint" id="ptHint" style="grid-row:12;grid-column:1/-1" hidden></p>`;
  return cells + markers + legend + hint;
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

/**
 * 轻量学科的通用外壳。语言与主题都不在这里切换 —— 全站唯一入口是主应用顶栏
 * （src/core/layout.ts），本模块只通过 onLangChange 重渲染文案。
 */
export function createSubject(cfg: SubjectConfig) {
  return async (view: HTMLElement, sub?: string): Promise<() => void> => {
    const hasRefs = !!(cfg.refs && cfg.refs.length);
    view.innerHTML = `<div class="${cfg.rootClass} subject-root subject-kit" style="--accent:${cfg.accent};--hero:linear-gradient(155deg, color-mix(in srgb, ${cfg.accent} 72%, #06121a), color-mix(in srgb, ${cfg.accent} 40%, #06121a))">
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
        <div class="mnav-mount"></div>
        <div class="modules">${cfg.modules
          .map(
            (m, i) =>
              `<section class="module${i === 0 ? " active" : ""}" id="sm-${m.key}">
                <header class="mod-head"><h2>${esc(L(m.title))}</h2></header>
                ${hasLevels(m) ? `<div class="filters sm-filters" role="group" aria-label="${esc(L(TXT.level))}"></div>` : ""}
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
    /** 各模块当前的难度筛选（0 = 全部），与 FULL 学科的 mountGrid state.level 同义。 */
    const levelState = new Map<string, number>();
    const sectionOf = (m: SubjectModule): HTMLElement | null =>
      root.querySelector<HTMLElement>(`#sm-${m.key}`);
    const gridOf = (m: SubjectModule): HTMLElement | null =>
      sectionOf(m)?.querySelector<HTMLElement>(".card-grid") ?? null;
    /** 难度筛选条：chip 复用共享层样式；切换只重渲染本模块网格。 */
    const renderFilterBar = (m: SubjectModule): void => {
      const host = sectionOf(m)?.querySelector<HTMLElement>(".sm-filters");
      if (!host) return;
      const active = levelState.get(m.key) ?? 0;
      const shown = LEVELS.filter((x) =>
        m.items.some((it) => it.level === x.level),
      );
      host.innerHTML = [
        `<span class="fl-label">${esc(L(TXT.level))}</span>`,
        `<button type="button" class="chip${active === 0 ? " on" : ""}" data-lvl="0">${esc(L(TXT.all))}</button>`,
        ...shown.map(
          (x) =>
            `<button type="button" class="chip${active === x.level ? " on" : ""}" data-lvl="${x.level}">${esc(L(x.label))}</button>`,
        ),
      ].join("");
      host.querySelectorAll<HTMLElement>("[data-lvl]").forEach((node) => {
        node.addEventListener("click", () => {
          levelState.set(m.key, Number(node.dataset.lvl ?? 0));
          const grid = gridOf(m);
          if (grid) renderModule(m, grid);
        });
      });
    };

    /** 周期表图例 / 57–71 / 89–103 占位格的点击高亮：按分类聚焦元素，其余淡出；再次点击取消。 */
    const bindPeriodicInteractions = (grid: HTMLElement): void => {
      const cells = Array.from(
        grid.querySelectorAll<HTMLElement>(".js-pt[data-cat]"),
      );
      const legs = Array.from(grid.querySelectorAll<HTMLElement>(".js-pt-leg"));
      const markers = Array.from(
        grid.querySelectorAll<HTMLElement>(".js-pt-marker"),
      );
      const hint = grid.querySelector<HTMLElement>("#ptHint");
      let activeCat = "";
      const clearHi = () => {
        grid.classList.remove("pt-filtering");
        cells.forEach((c) => c.classList.remove("pt-match"));
        [...legs, ...markers].forEach((l) => {
          l.classList.remove("pt-on");
          l.setAttribute("aria-pressed", "false");
        });
        if (hint) {
          hint.hidden = true;
          hint.textContent = "";
        }
        activeCat = "";
      };
      const toggle = (cat: string, scroll: boolean) => {
        if (activeCat === cat) {
          clearHi();
          return;
        }
        clearHi();
        activeCat = cat;
        grid.classList.add("pt-filtering");
        cells.forEach((c) => {
          if (c.dataset.cat === cat) c.classList.add("pt-match");
        });
        const trigs = [...legs, ...markers].filter(
          (l) => l.dataset.cat === cat,
        );
        trigs.forEach((t) => {
          t.classList.add("pt-on");
          t.setAttribute("aria-pressed", "true");
        });
        if (hint) {
          const c = PT_CATS.find((x) => x.key === cat);
          hint.textContent = c
            ? `${L({ zh: c.zh, en: c.en })}｜${L(c.desc)}`
            : "";
          hint.hidden = !c;
        }
        if (scroll) {
          cells
            .find((c) => c.dataset.cat === cat)
            ?.scrollIntoView({
              behavior: "smooth",
              block: "center",
              inline: "center",
            });
        }
      };
      legs.forEach((l) =>
        l.addEventListener("click", () => toggle(l.dataset.cat!, false)),
      );
      markers.forEach((mk) =>
        mk.addEventListener("click", () => toggle(mk.dataset.cat!, true)),
      );
    };

    const renderModule = (m: SubjectModule, grid: HTMLElement) => {
      if (m.custom) {
        m.custom(grid);
        return;
      }
      if (m.kind === "periodic") {
        grid.innerHTML = periodicHTML(m);
        grid.querySelectorAll<HTMLElement>(".js-pt").forEach((el) => {
          const open = () => openDetail(m, el.dataset.key!);
          el.addEventListener("click", open);
          el.addEventListener("keydown", (e) => {
            if ((e as KeyboardEvent).key === "Enter") open();
          });
        });
        bindPeriodicInteractions(grid);
        return;
      }
      const level = levelState.get(m.key) ?? 0;
      const items = level
        ? m.items.filter((it) => Number(it.level) === level)
        : m.items;
      grid.innerHTML = items.length
        ? items.map(cardHTML).join("")
        : `<p class="empty">${esc(L(TXT.empty))}</p>`;
      grid.querySelectorAll<HTMLElement>(".js-item").forEach((el) => {
        const open = () => openDetail(m, el.dataset.key!);
        el.addEventListener("click", open);
        el.addEventListener("keydown", (e) => {
          if ((e as KeyboardEvent).key === "Enter") open();
        });
      });
      renderFilterBar(m);
    };

    let sdTimer = 0;
    const closeDetail = () => {
      const d = root.querySelector<HTMLElement>("#subDetail")!;
      if (d.hidden) return;
      d.classList.remove("open");
      document.body.classList.remove("sd-open");
      // 等滑出过渡（0.3s）结束后再真正隐藏并清空。
      window.clearTimeout(sdTimer);
      sdTimer = window.setTimeout(() => {
        d.hidden = true;
        d.innerHTML = "";
      }, 320);
    };
    const openDetail = (m: SubjectModule, id: string) => {
      const item = m.items.find((x) => x.id === id);
      if (!item) return;
      const d = root.querySelector<HTMLElement>("#subDetail")!;
      window.clearTimeout(sdTimer);
      d.classList.remove("open");
      d.innerHTML = `<div class="sd-backdrop"></div><div class="sd-panel" role="dialog" aria-modal="true">
        <div class="sd-head">
          <button class="sd-close" type="button" aria-label="关闭">×</button>
          <div class="sd-eyebrow">${esc(L(m.title))}${item.level != null ? ` · ${esc(levelLabel(item.level))}` : ""}</div>
          <div class="sd-title-row">
            <h2 class="sd-title">${esc(L(item.term))}</h2>
            ${replayBtn(item.eq)}
          </div>
        </div>
        <div class="sd-body">
          ${item.value ? `<div class="sd-value">${esc(L(item.value))}</div>` : ""}
          <div class="sd-lead">${esc(L(item.oneLiner))}</div>
          ${eqHTML(item.eq, true)}
          ${subsHTML(item.subs)}
          ${figureHTML(item.figure)}
          ${item.detail ? `<p class="sd-sec"><b>📘</b><span>${esc(L(item.detail))}</span></p>` : ""}
          ${item.example ? `<p class="sd-sec"><b>🧪</b><span>${esc(L(item.example))}</span></p>` : ""}
          ${item.tags && item.tags.length ? `<div class="sd-tags">${item.tags.map((t) => `<span class="tag">${esc(L(t))}</span>`).join("")}</div>` : ""}
        </div>
      </div>`;
      d.hidden = false;
      document.body.classList.add("sd-open");
      // 下一帧再加 .open，确保初始 translateX(102%) 已提交，从而触发滑入过渡。
      requestAnimationFrame(() =>
        requestAnimationFrame(() => d.classList.add("open")),
      );
      d.querySelector(".sd-close")!.addEventListener("click", closeDetail);
      d.querySelector(".sd-backdrop")!.addEventListener("click", closeDetail);
      // 重放：移除 .eq-anim 后强制回流再添加，重启 CSS 动画序列。
      d.querySelectorAll<HTMLElement>(".eq-replay").forEach((btn) => {
        btn.addEventListener("click", () => {
          const set = d.querySelector<HTMLElement>(".eq-anim");
          if (!set) return;
          set.classList.remove("eq-anim");
          void set.offsetWidth;
          set.classList.add("eq-anim");
        });
      });
    };

    cfg.modules.forEach((m, i) => renderModule(m, grids[i]));

    /** 切换当前模块：同步按钮态与下拉选中项，并滚到模块内容（而非无用的 hero 顶部）。 */
    const selectModule = (k: string): void => {
      root
        .querySelectorAll<HTMLElement>(".mod")
        .forEach((b) => b.classList.toggle("active", b.dataset.go === k));
      root
        .querySelectorAll<HTMLElement>(".module")
        .forEach((s) => s.classList.toggle("active", s.id === `sm-${k}`));
      navHandle?.setValue(k);
      root
        .querySelector<HTMLElement>(".module.active")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    const navHost = root.querySelector<HTMLElement>(".mnav-mount");
    const navHandle = navHost
      ? mountNavDropdown(navHost, {
          items: cfg.modules.map((m) => ({
            value: m.key,
            label: L(m.title),
            icon: m.icon,
          })),
          value: cfg.modules[0]?.key,
          label: L({ zh: "模块导航", en: "Module navigation" }),
          onSelect: selectModule,
        })
      : null;
    const mnavEl = navHandle?.el ?? null;
    root.querySelectorAll<HTMLElement>(".mod").forEach((btn) => {
      btn.addEventListener("click", () => selectModule(btn.dataset.go!));
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
        if (mnavEl) mnavEl.style.display = "";
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
      if (mnavEl) mnavEl.style.display = "none";
      modulesEl.style.display = "none";
      resultsEl.hidden = false;
      resultsEl.innerHTML = matches.length
        ? matches.map(({ it }) => cardHTML(it)).join("")
        : `<p class="sub-no-result">${esc(L(TXT.noResult))}</p>`;
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
      navHandle?.setItems(
        cfg.modules.map((m) => ({
          value: m.key,
          label: L(m.title),
          icon: m.icon,
        })),
      );
      root
        .querySelectorAll<HTMLElement>(".mod-head h2")
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
        navHandle?.setValue(k);
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
