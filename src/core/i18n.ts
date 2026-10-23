export type Lang = "zh" | "en";
type Dict = Record<string, string>;

const base: Record<Lang, Dict> = {
  zh: {
    brand: "万物通识",
    subtitle: "一个入口，看尽万物 —— 系列聚合导航站",
    intro:
      "万物通识是一组围绕「通识教育 + 可视化」构建的开源项目集合：从中华千年历史脉络，到心理、哲学、地理、生物、物理、化学与管理学——把每个学科的核心概念、发展脉络与经典框架，整理成可漫游、可检索、可深链的双语知识库。",
    kicker: "万物通识 · 开源通识知识库",
    slogan: "把复杂的世界，讲成你看得懂的样子",
    hero_h1_a: "把复杂的世界",
    hero_h1_b: "讲成你看得懂的样子",
    hero_badge: "已上线 {n} 大学科 · 2,000+ 条目",
    hero_note: "无需注册 · 免费浏览 · 中英双语",
    hero_mock_url: "wanwu-hub / explore",
    hero_mock_search: "供需 · 认知偏差 · 元素周期表",
    hero_type_words: "认知偏差 | 王朝更替 | 元素周期表 | 化学键",
    hero_mock_ai: "AI 可检索",
    trust_label: "覆盖学科",
    sec_all: "全部学科",
    sec_all_desc:
      "从千年王朝到心理、哲学、地理、生物、物理、化学与管理学，一处抵达。",
    stat_subjects: "通识学科",
    stat_items: "知识条目",
    stat_langs: "中英双语",
    stat_free: "开源免费",
    cta_explore: "开始探索",
    enter_subject: "进入浏览 →",
    search_ph: "搜索学科、概念或关键词…",
    filter_all: "全部",
    cat_humanities: "人文社科",
    cat_mindlife: "心智生命",
    cat_nature: "自然科学",
    filter_empty: "没有匹配的学科，换个关键词试试。",
    footer_note:
      "开源、双语、可视化的通识知识库。内容以结构化数据与静态页面公开，欢迎引用、检索与共建。",
    footer_copy: "内容持续更新 · 对 AI 检索开放",
    features_eyebrow: "为什么是万物",
    features_h2: "不是另一本百科，而是一张能走通的地图",
    features_desc:
      "每个学科都用「概念 · 脉络 · 经典」组织，配合可视化与双语，适合自学、备课与随手查证。",
    feat1_tag: "结构化",
    feat1_t: "一条主线，而不是一堆词条",
    feat1_d: "从概念到脉络再到经典框架，按理解顺序铺开，不用在碎片里自己拼图。",
    feat1_s1: "概念",
    feat1_s2: "脉络",
    feat1_s3: "经典",
    feat1_s4: "应用",
    feat1_s1d: "先弄清定义与边界",
    feat1_s2d: "按时间与因果串起演变",
    feat1_s3d: "对照经典框架与原文",
    feat1_s4d: "回到现实问题中验证",
    feat2_tag: "可视化",
    feat2_t: "图表、时间线、方程式",
    feat2_d: "王朝时间轴、心理实验、元素周期表与反应式，抽象知识直接看得见。",
    feat3_tag: "双语",
    feat3_t: "中英切换，术语对齐",
    feat3_d: "同一套内容两种语言，适合双语阅读、备课与课堂分享。",
    feat4_tag: "深链",
    feat4_t: "每个条目都有稳定链接",
    feat4_d: "直达具体概念，方便引用、收藏与课堂投屏。",
    feat5_tag: "开放数据",
    feat5_t: "对 AI 与开发者友好",
    feat5_d:
      "llms.txt、结构化 JSON 与 Sitemap 全部开放，便于检索、引用与二次开发。",
    feat6_tag: "开源",
    feat6_t: "完全开源，持续更新",
    feat6_d: "内容与代码都在 GitHub 公开，欢迎纠错、补充与共建。",
    audience_eyebrow: "适用人群",
    audience_h2: "不管你为什么打开它，都能带走一点东西",
    audience_desc: "9 个学科共用同一套结构，适合不同目的的阅读与使用。",
    aud1_ico: "🎓",
    aud1_t: "自学与备考",
    aud1_d: "把零散知识点接成一条主线，先懂框架，再补细节。",
    aud2_ico: "🧑‍🏫",
    aud2_t: "教师与备课",
    aud2_d: "双语术语、时间线与图表，可直接用于课堂投屏与讲义。",
    aud3_ico: "✍️",
    aud3_t: "写作与查证",
    aud3_d: "每条内容都有稳定链接，引用具体概念时不再只给一个首页。",
    aud4_ico: "💻",
    aud4_t: "开发者与 AI",
    aud4_d: "结构化 JSON、llms.txt 与 Sitemap 开放，方便检索与二次开发。",
    steps_eyebrow: "使用方式",
    steps_h2: "三步，从「随便看看」到「真的用上」",
    steps_desc: "不用注册，也没有学习计划；按自己的节奏读，需要时再深入。",
    step1_tag: "第一步",
    step2_tag: "第二步",
    step3_tag: "第三步",
    step1_t: "选一个学科",
    step1_d: "从感兴趣的方向进入，9 个学科共用一套阅读结构。",
    step2_t: "沿主线读完",
    step2_d: "概念、脉络、经典依次展开，配合图表与时间线建立框架。",
    step3_t: "收藏、引用、共建",
    step3_d: "复制深链收藏或引用；发现错误可到 GitHub 提 issue。",
    faq_eyebrow: "常见问题",
    faq_h2: "你可能想知道的事",
    faq_desc: "没找到答案？到 GitHub 提问，或直接写邮件给我们。",
    faq1_q: "使用需要付费或注册吗？",
    faq1_a: "不需要。全部内容免费浏览，无需账号，也没有广告或付费墙。",
    faq2_q: "内容是怎么整理的？",
    faq2_a:
      "基于公开史料、经典著作与教材整理，再用统一结构重写；各学科会列出参考来源。",
    faq3_q: "可以引用到文章或课堂吗？",
    faq3_a:
      "可以。每个条目都有稳定链接，引用时附上对应链接即可；批量使用请先查看仓库说明。",
    faq4_q: "英文内容完整吗？",
    faq4_a: "学科内容与界面都提供中英双语，术语保持对齐；翻译仍在持续校对中。",
    faq5_q: "支持 AI 检索吗？",
    faq5_a:
      "支持。站点提供 llms.txt、llms-full.txt 与 sitemap.xml，便于大模型与开发者读取。",
    faq6_q: "发现错误或有建议怎么办？",
    faq6_a: "到 GitHub 提 issue 或直接发邮件，我们会在后续更新中修订。",
    subjects_eyebrow: "学科地图",
    cta_eyebrow: "开始探索",
    cta_h2: "把世界读薄一点，从今天开始",
    cta_desc: "挑一个学科进入，或先看看我们如何组织内容。",
    cta_secondary: "了解设计原则",
    footer_col_subjects: "学科",
    footer_col_resources: "资源",
    footer_col_about: "关于",
    footer_design: "设计原则",
    footer_contrib: "参与共建",
    footer_feedback: "问题反馈",
    footer_top: "返回顶部 ↑",
    footer_copyright: "© 2026 万物通识 · 内容持续更新",
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
    kicker: "Everything · Open general knowledge",
    slogan: "A complex world, made clear.",
    hero_h1_a: "A complex world,",
    hero_h1_b: "made clear.",
    hero_badge: "{n} disciplines live · 2,000+ entries",
    hero_note: "No sign-up · Free to browse · Bilingual",
    hero_mock_url: "wanwu-hub / explore",
    hero_mock_search: "supply & demand · cognitive bias · periodic table",
    hero_type_words:
      "cognitive bias | dynasty timeline | periodic table | supply curves",
    hero_mock_ai: "AI-ready",
    trust_label: "Disciplines covered",
    sec_all: "All Disciplines",
    sec_all_desc:
      "From dynastic history to psychology, philosophy, geography, biology, physics, chemistry and management — all in one place.",
    stat_subjects: "Disciplines",
    stat_items: "Entries",
    stat_langs: "Languages",
    stat_free: "Open & free",
    cta_explore: "Start exploring",
    enter_subject: "Explore →",
    search_ph: "Search disciplines, concepts or keywords…",
    filter_all: "All",
    cat_humanities: "Humanities & Social",
    cat_mindlife: "Mind & Life",
    cat_nature: "Natural Sciences",
    filter_empty: "No matching disciplines. Try another keyword.",
    footer_note:
      "An open-source, bilingual, visual general-knowledge library. Content is published as structured data and static pages — free to cite, search and build on.",
    footer_copy: "Continuously updated · Open for AI retrieval",
    features_eyebrow: "Why wanwu",
    features_h2: "Not another encyclopedia — a map you can walk",
    features_desc:
      "Every discipline is organised as concept → thread → classic, with visuals and bilingual text for self-study, teaching and quick reference.",
    feat1_tag: "Structure",
    feat1_t: "One thread, not a pile of entries",
    feat1_d:
      "Concepts, context and classic frameworks laid out in the order you actually learn them.",
    feat1_s1: "Concept",
    feat1_s2: "Thread",
    feat1_s3: "Classic",
    feat1_s4: "Apply",
    feat1_s1d: "Start with definitions and boundaries",
    feat1_s2d: "Follow the timeline and cause-effect",
    feat1_s3d: "Compare classic frameworks and sources",
    feat1_s4d: "Test it against real questions",
    feat2_tag: "Visual",
    feat2_t: "Charts, timelines, equations",
    feat2_d:
      "Dynastic timelines, psychology experiments, the periodic table and reaction equations — visible, not just described.",
    feat3_tag: "Bilingual",
    feat3_t: "Switch languages, keep the terms",
    feat3_d:
      "The same content in Chinese and English, aligned for bilingual reading and teaching.",
    feat4_tag: "Deep link",
    feat4_t: "Every entry has a stable link",
    feat4_d:
      "Jump straight to a concept for citations, bookmarks and classroom screens.",
    feat5_tag: "Open data",
    feat5_t: "Built for AI and developers",
    feat5_d:
      "llms.txt, structured JSON and sitemaps are open for search, citation and reuse.",
    feat6_tag: "Open source",
    feat6_t: "Fully open, always growing",
    feat6_d:
      "Content and code live on GitHub — corrections, additions and contributions are welcome.",
    audience_eyebrow: "Who it's for",
    audience_h2: "Whatever brings you here, you leave with something",
    audience_desc:
      "Nine disciplines share one structure, for reading and working at different depths.",
    aud1_ico: "🎓",
    aud1_t: "Self-study & exams",
    aud1_d:
      "Turn scattered facts into one thread — grasp the framework first, then the details.",
    aud2_ico: "🧑‍🏫",
    aud2_t: "Teaching & lesson prep",
    aud2_d:
      "Bilingual terms, timelines and charts, ready for slides and handouts.",
    aud3_ico: "✍️",
    aud3_t: "Writing & fact-checking",
    aud3_d:
      "Every entry has a stable link, so citations point to the exact concept, not a homepage.",
    aud4_ico: "💻",
    aud4_t: "Developers & AI",
    aud4_d:
      "Structured JSON, llms.txt and sitemaps are open for retrieval and reuse.",
    steps_eyebrow: "How to use it",
    steps_h2: "Three steps from browsing to actually using it",
    steps_desc:
      "No sign-up, no study plan — read at your own pace and go deeper when you need to.",
    step1_tag: "Step 1",
    step2_tag: "Step 2",
    step3_tag: "Step 3",
    step1_t: "Pick a discipline",
    step1_d:
      "Start where your interest is. All nine disciplines share one reading structure.",
    step2_t: "Follow the thread",
    step2_d:
      "Concepts, context and classics in order, with charts and timelines to anchor them.",
    step3_t: "Save, cite, contribute",
    step3_d:
      "Copy a deep link to save or cite it; open a GitHub issue when something is wrong.",
    faq_eyebrow: "FAQ",
    faq_h2: "Things you might want to know",
    faq_desc: "Still have a question? Open a GitHub issue or send us an email.",
    faq1_q: "Is it free? Do I need an account?",
    faq1_a:
      "Free. Everything is open to browse without an account, with no ads or paywalls.",
    faq2_q: "Where does the content come from?",
    faq2_a:
      "Public histories, classics and textbooks, rewritten into a consistent structure. Each discipline lists its references.",
    faq3_q: "Can I cite it in articles or class?",
    faq3_a:
      "Yes. Every entry has a stable link — include it when you cite. For bulk reuse, check the repository notes first.",
    faq4_q: "Is the English content complete?",
    faq4_a:
      "Both content and interface are bilingual with aligned terminology; translations are still being proofread.",
    faq5_q: "Can AI tools read the site?",
    faq5_a:
      "Yes. llms.txt, llms-full.txt and sitemap.xml are published for models and developers.",
    faq6_q: "How do I report a mistake?",
    faq6_a:
      "Open a GitHub issue or send an email — corrections are folded into later updates.",
    subjects_eyebrow: "Discipline map",
    cta_eyebrow: "Get started",
    cta_h2: "Start reading the world, one thread at a time",
    cta_desc:
      "Pick a discipline to explore, or see how we structure the content.",
    cta_secondary: "How it works",
    footer_col_subjects: "Disciplines",
    footer_col_resources: "Resources",
    footer_col_about: "About",
    footer_design: "Design principles",
    footer_contrib: "Contribute",
    footer_feedback: "Feedback",
    footer_top: "Back to top ↑",
    footer_copyright: "© 2026 Everything · Always growing",
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
