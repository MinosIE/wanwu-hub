import { getLang, t, onLangChange } from "../core/i18n";
import { PROJECTS } from "../core/projects";

// 学科别名词：首页检索用。英文名多为「X of Everything」，
// 补上学名后，搜「psychology」「历史」这类常用词也能命中。
const SEARCH_ALIASES: Record<string, string[]> = {
  dynasty: ["history", "china", "历史", "中国史", "朝代"],
  econ: ["economics", "economy", "经济", "经济学"],
  mind: ["psychology", "psych", "心理", "心理学"],
  thought: ["philosophy", "哲学", "思想"],
  earth: ["geography", "地理", "地理学"],
  life: ["biology", "生物", "生物学", "生命"],
  physics: ["physics", "物理", "物理学"],
  chem: ["chemistry", "化学"],
  mgmt: ["management", "business", "管理", "管理学"],
};

export function renderHome(view: HTMLElement): void {
  const lang = getLang();
  const escapeAttr = (s: string) =>
    s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  // 首页分类筛选：仅用于首页展示分组，不改 subjects.json 的既有字段。
  const cats = [
    {
      key: "humanities",
      label: t("cat_humanities"),
      keys: ["dynasty", "thought", "econ", "mgmt"],
    },
    { key: "mindlife", label: t("cat_mindlife"), keys: ["mind", "life"] },
    {
      key: "nature",
      label: t("cat_nature"),
      keys: ["earth", "physics", "chem"],
    },
  ];
  const catOf = (key: string) =>
    cats.find((c) => c.keys.includes(key))?.key ?? "other";

  const card = (p: (typeof PROJECTS)[number], i = 0, featured = false) => {
    const name = lang === "en" ? p.en : p.zh;
    const sub = lang === "en" ? p.subEn : p.subZh;
    const desc = lang === "en" ? p.descEn : p.descZh;
    const tags = (lang === "en" ? p.tagsEn : p.tagsZh)
      .map((x) => `<span class="chip">${x}</span>`)
      .join("");
    const action = p.integrated
      ? `<a class="btn stretched-link" href="#/subject/${p.key}">${t("enter_subject")}</a>`
      : `<a class="btn disabled" href="#">${t("btn_soon")}</a>`;
    // 中英字段一并入索引，英文界面也能用中文关键词检索（反之亦然）。
    const searchBlob = escapeAttr(
      [
        p.key,
        p.zh,
        p.en,
        p.subZh,
        p.subEn,
        p.descZh,
        p.descEn,
        ...p.tagsZh,
        ...p.tagsEn,
        ...(SEARCH_ALIASES[p.key] ?? []),
      ]
        .join(" ")
        .toLowerCase(),
    );

    const head = `
      <div class="emoji">${p.emoji}</div>
      <div class="card-titles">
        <h3>${name}</h3>
        ${sub ? `<div class="sub-en">${sub}</div>` : ""}
      </div>`;
    const body = `
      <p class="desc">${desc}</p>
      <div class="tags">${tags}</div>
      ${action}`;
    return `<div class="card ${p.integrated ? "" : "soon"}${featured ? " featured" : ""}" data-key="${p.key}" data-cat="${catOf(p.key)}" data-search="${searchBlob}" style="--i:${i}">
      <div class="card-head">${head}</div>
      <div class="card-main">${body}</div>
    </div>`;
  };

  const statItems = [
    {
      num: String(PROJECTS.length),
      count: PROJECTS.length,
      suffix: "",
      label: t("stat_subjects"),
    },
    { num: "2,000+", count: 2000, suffix: "+", label: t("stat_items") },
    { num: "2", count: 2, suffix: "", label: t("stat_langs") },
    { num: "100%", count: 100, suffix: "%", label: t("stat_free") },
  ];

  // Hero 右侧产品预览：展示前 4 个学科的检索结果样式。
  const mockRows = PROJECTS.slice(0, 4)
    .map((p) => {
      const name = lang === "en" ? p.en : p.zh;
      const tags = (lang === "en" ? p.tagsEn : p.tagsZh)
        .slice(0, 3)
        .join(" · ");
      return `<div class="hv-row">
        <span class="hv-ico" aria-hidden="true">${p.emoji}</span>
        <div class="hv-meta"><b>${name}</b><i>${tags}</i></div>
        <span class="hv-go" aria-hidden="true">→</span>
      </div>`;
    })
    .join("");

  view.innerHTML = `
    <div class="hero">
      <div class="hero-copy">
        <span class="kicker"><i class="dot" aria-hidden="true"></i>${t("hero_badge", { n: PROJECTS.length })}</span>
        <h1><span class="h1-line"><span class="h1-line-in">${t("hero_h1_a")}</span></span><span class="h1-line"><span class="h1-line-in h1-accent">${t("hero_h1_b")}</span></span></h1>
        <p class="intro home-lead">${t("intro")}</p>
        <div class="home-cta">
          <button class="cta cta-primary" type="button" data-scroll="all">${t("cta_explore")} <span aria-hidden="true">↓</span></button>
          <a class="cta cta-ghost" href="https://github.com/MinosIE/wanwu-hub" target="_blank" rel="noopener">${t("btn_repo")}</a>
        </div>
        <p class="hero-note">${t("hero_note")}</p>
      </div>
      <div class="hero-visual" aria-hidden="true">
        <div class="hv-window">
          <div class="hv-bar">
            <span class="hv-dots"><i></i><i></i><i></i></span>
            <span class="hv-url">${t("hero_mock_url")}</span>
          </div>
          <div class="hv-body">
            <div class="hv-search">
              <span class="s-ico">⌕</span><span class="hv-query" data-words="${t("hero_type_words")}">${t("hero_mock_search")}</span>
            </div>
            <div class="hv-chips">
              <span class="on">${t("filter_all")}</span>
              <span>${t("cat_humanities")}</span>
              <span>${t("cat_mindlife")}</span>
              <span>${t("cat_nature")}</span>
            </div>
            <div class="hv-list">${mockRows}</div>
          </div>
        </div>
        <div class="hv-float hv-float-a"><b>2,000+</b><span>${t("stat_items")}</span></div>
      </div>
    </div>

    <section class="metrics" aria-label="${t("stat_subjects")}">
      ${statItems
        .map(
          (s) =>
            `<div class="metric"><div class="num" data-count="${s.count}" data-suffix="${s.suffix}">${s.num}</div><div class="label">${s.label}</div></div>`,
        )
        .join("")}
    </section>

    <section class="subject-strip" aria-label="${t("trust_label")}">
      <span class="strip-label">${t("trust_label")}</span>
      <div class="strip-list">
        ${PROJECTS.map(
          (p) =>
            `<span class="strip-item"><i aria-hidden="true">${p.emoji}</i>${lang === "en" ? p.en : p.zh}</span>`,
        ).join("")}
      </div>
    </section>

    <section class="features" id="features">
      <header class="sec-head">
        <span class="sec-eyebrow">${t("features_eyebrow")}</span>
        <h2>${t("features_h2")}</h2>
        <p>${t("features_desc")}</p>
      </header>
      <div class="bento">
        <article class="bento-card bento-main">
          <span class="bento-tag">${t("feat1_tag")}</span>
          <h3>${t("feat1_t")}</h3>
          <p>${t("feat1_d")}</p>
          <div class="bento-timeline" aria-hidden="true">
            <div class="tl-item"><i></i><div class="tl-body"><b>${t("feat1_s1")}</b><span>${t("feat1_s1d")}</span></div></div>
            <div class="tl-item"><i></i><div class="tl-body"><b>${t("feat1_s2")}</b><span>${t("feat1_s2d")}</span></div></div>
            <div class="tl-item"><i></i><div class="tl-body"><b>${t("feat1_s3")}</b><span>${t("feat1_s3d")}</span></div></div>
            <div class="tl-item"><i></i><div class="tl-body"><b>${t("feat1_s4")}</b><span>${t("feat1_s4d")}</span></div></div>
          </div>
        </article>
        <article class="bento-card">
          <span class="bento-tag">${t("feat2_tag")}</span>
          <h3>${t("feat2_t")}</h3>
          <p>${t("feat2_d")}</p>
          <div class="bento-chart" aria-hidden="true">
            <i style="--h: 34%"></i><i style="--h: 56%"></i><i style="--h: 44%"></i><i style="--h: 72%"></i><i style="--h: 58%"></i><i style="--h: 88%"></i><i style="--h: 66%"></i>
          </div>
        </article>
        <article class="bento-card">
          <span class="bento-tag">${t("feat3_tag")}</span>
          <h3>${t("feat3_t")}</h3>
          <p>${t("feat3_d")}</p>
          <div class="bento-lang" aria-hidden="true">
            <div class="segs"><span class="on">中</span><span>EN</span></div>
            <i style="width: 88%"></i><i style="width: 64%"></i>
          </div>
        </article>
        <article class="bento-card">
          <span class="bento-tag">${t("feat4_tag")}</span>
          <h3>${t("feat4_t")}</h3>
          <p>${t("feat4_d")}</p>
          <div class="bento-url" aria-hidden="true">#/subject/chem/periodic-table-full/el-c</div>
        </article>
        <article class="bento-card">
          <span class="bento-tag">${t("feat5_tag")}</span>
          <h3>${t("feat5_t")}</h3>
          <p>${t("feat5_d")}</p>
          <pre class="bento-code" aria-hidden="true"><b>llms.txt</b>
/llms-full.txt
/sitemap.xml</pre>
        </article>
        <article class="bento-card">
          <span class="bento-tag">${t("feat6_tag")}</span>
          <h3>${t("feat6_t")}</h3>
          <p>${t("feat6_d")}</p>
          <div class="bento-repo" aria-hidden="true"><span class="dot-live"></span><span>MinosIE / wanwu-hub</span><span class="hv-go">→</span></div>
        </article>
      </div>
    </section>
    <section class="audience" id="audience">
      <header class="sec-head">
        <span class="sec-eyebrow">${t("audience_eyebrow")}</span>
        <h2>${t("audience_h2")}</h2>
        <p>${t("audience_desc")}</p>
      </header>
      <div class="aud-grid">
        ${[1, 2, 3, 4]
          .map(
            (n) =>
              `<article class="aud-card">
          <span class="aud-ico" aria-hidden="true">${t(`aud${n}_ico`)}</span>
          <h3>${t(`aud${n}_t`)}</h3>
          <p>${t(`aud${n}_d`)}</p>
        </article>`,
          )
          .join("")}
      </div>
    </section>
    <section class="section" id="all">
      <header class="sec-head">
        <span class="sec-eyebrow">${t("subjects_eyebrow")}</span>
        <h2><span data-i18n="sec_all">${t("sec_all")}</span><span class="sec-count" id="allCount">${PROJECTS.length}</span></h2>
        <p class="sec-desc" data-i18n="sec_all_desc">${t("sec_all_desc")}</p>
      </header>
      <div class="explore-tools">
        <label class="explore-search">
          <span class="s-ico" aria-hidden="true">🔍</span>
          <input id="subjSearch" type="search" autocomplete="off" placeholder="${t("search_ph")}" aria-label="${t("search_ph")}" />
        </label>
        <div class="chips-filter" role="group" aria-label="${t("filter_all")}">
          <button class="filter-chip is-active" type="button" data-cat="all" aria-pressed="true">${t("filter_all")}<em>${PROJECTS.length}</em></button>
          ${cats
            .map(
              (c) =>
                `<button class="filter-chip" type="button" data-cat="${c.key}" aria-pressed="false">${c.label}<em>${PROJECTS.filter((p) => c.keys.includes(p.key)).length}</em></button>`,
            )
            .join("")}
        </div>
      </div>
      <div class="card-grid">${PROJECTS.map((p, i) => card(p, i)).join("")}</div>
      <p class="no-result" hidden>${t("filter_empty")}</p>
    </section>
    <section class="steps" id="steps">
      <header class="sec-head">
        <span class="sec-eyebrow">${t("steps_eyebrow")}</span>
        <h2>${t("steps_h2")}</h2>
        <p>${t("steps_desc")}</p>
      </header>
      <ol class="steps-list">
        ${stepCard(1)}
        ${stepCard(2)}
        ${stepCard(3)}
      </ol>
    </section>
    <section class="faq" id="faq">
      <div class="faq-wrap">
        <div class="faq-intro">
          <header class="sec-head">
            <span class="sec-eyebrow">${t("faq_eyebrow")}</span>
            <h2>${t("faq_h2")}</h2>
          </header>
          <p class="faq-more">${t("faq_desc")} <a href="mailto:417913012@qq.com">${t("footer_feedback")} →</a></p>
        </div>
        <div class="faq-list">
          ${[1, 2, 3, 4, 5, 6]
            .map(
              (n) =>
                `<details class="faq-item">
            <summary><span>${t(`faq${n}_q`)}</span><i aria-hidden="true">+</i></summary>
            <p>${t(`faq${n}_a`)}</p>
          </details>`,
            )
            .join("")}
        </div>
      </div>
    </section>
    <section class="cta-band">
      <span class="sec-eyebrow">${t("cta_eyebrow")}</span>
      <h2>${t("cta_h2")}</h2>
      <p>${t("cta_desc")}</p>
      <div class="home-cta">
        <button class="cta cta-primary" type="button" data-scroll="all">${t("cta_explore")} <span aria-hidden="true">↓</span></button>
        <button class="cta cta-ghost" type="button" data-scroll="features">${t("cta_secondary")}</button>
      </div>
    </section>
    <footer class="site-footer">
      <div class="sf-top">
        <div class="sf-brand">
          <span class="sf-logo">${t("brand")}</span>
          <p>${t("footer_note")}</p>
          <span class="sf-badge"><i class="dot" aria-hidden="true"></i>${t("footer_copy")}</span>
        </div>
        <nav class="sf-col sf-subjects" aria-label="${t("footer_col_subjects")}">
          <h4>${t("footer_col_subjects")}</h4>
          ${PROJECTS.map(
            (p) =>
              `<a href="#/subject/${p.key}">${p.emoji} ${lang === "en" ? p.en : p.zh}</a>`,
          ).join("")}
        </nav>
        <nav class="sf-col" aria-label="${t("footer_col_resources")}">
          <h4>${t("footer_col_resources")}</h4>
          <a href="llms.txt" target="_blank" rel="noopener">llms.txt</a>
          <a href="llms-full.txt" target="_blank" rel="noopener">llms-full.txt</a>
          <a href="sitemap.xml" target="_blank" rel="noopener">Sitemap</a>
          <a href="https://github.com/MinosIE/wanwu-hub" target="_blank" rel="noopener">GitHub ↗</a>
        </nav>
        <nav class="sf-col" aria-label="${t("footer_col_about")}">
          <h4>${t("footer_col_about")}</h4>
          <button type="button" data-scroll="features">${t("footer_design")}</button>
          <a href="https://github.com/MinosIE/wanwu-hub" target="_blank" rel="noopener">${t("footer_contrib")}</a>
          <a href="mailto:417913012@qq.com">${t("footer_feedback")}</a>
          <button type="button" data-scroll="top">${t("footer_top")}</button>
        </nav>
      </div>
      <div class="sf-bottom">
        <span>${t("footer_copyright")}</span>
        <span>${t("brand")} · wanwu-hub</span>
      </div>
    </footer>
  `;

  // 整卡可点击（仅对站内可浏览的 integrated 卡片生效）
  view.querySelectorAll<HTMLElement>(".card:not(.soon)").forEach((c) => {
    const link = c.querySelector<HTMLAnchorElement>("a.stretched-link");
    if (!link) return;
    const href = link.getAttribute("href");
    if (!href) return;
    const overlay = document.createElement("a");
    overlay.href = href;
    overlay.className = "card-overlay";
    overlay.style.cssText = "position:absolute;inset:0;z-index:1;";
    overlay.setAttribute("aria-hidden", "true");
    c.style.position = "relative";
    c.appendChild(overlay);
  });

  // 首页学科检索 + 分类筛选：纯前端过滤卡片，不改路由、不影响学科页。
  const searchInput = view.querySelector<HTMLInputElement>("#subjSearch");
  const grid = view.querySelector<HTMLElement>(".card-grid");
  const countEl = view.querySelector<HTMLElement>("#allCount");
  const emptyEl = view.querySelector<HTMLElement>(".no-result");
  const chips = Array.from(
    view.querySelectorAll<HTMLButtonElement>(".filter-chip"),
  );
  const cards = Array.from(view.querySelectorAll<HTMLElement>(".card"));
  let activeCat = "all";

  const applyFilter = () => {
    const tokens = (searchInput?.value ?? "")
      .trim()
      .toLowerCase()
      .split(/\s+/)
      .filter(Boolean);
    let shown = 0;
    for (const c of cards) {
      const inCat = activeCat === "all" || c.dataset.cat === activeCat;
      const hay = c.dataset.search ?? "";
      const hit = tokens.every((tk) => hay.includes(tk));
      c.classList.toggle("is-hidden", !(inCat && hit));
      if (inCat && hit) shown++;
    }
    grid?.classList.toggle(
      "filtering",
      activeCat !== "all" || tokens.length > 0,
    );
    if (countEl) countEl.textContent = String(shown);
    if (emptyEl) emptyEl.hidden = shown > 0;
  };

  searchInput?.addEventListener("input", applyFilter);
  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      activeCat = chip.dataset.cat ?? "all";
      chips.forEach((c) => {
        const on = c === chip;
        c.classList.toggle("is-active", on);
        c.setAttribute("aria-pressed", String(on));
      });
      applyFilter();
    });
  });

  mountHomeMotion(view);
  mountHomeToTop(view);

  // 首屏 / CTA 的滚动按钮：用 JS 而非 `href="#all"`，
  // 避免改动 location.hash 干扰 hash 路由。
  view.querySelectorAll<HTMLElement>("[data-scroll]").forEach((el) => {
    el.addEventListener("click", () => {
      const target = el.dataset.scroll;
      if (target === "top") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      document
        .getElementById(target ?? "")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

// 三步使用：线性图标 + 水印序号 + 底部递进进度条。
const STEP_ICONS = [
  // 选一个学科：四格入口
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3.6" y="3.6" width="7" height="7" rx="2"/><rect x="13.4" y="3.6" width="7" height="7" rx="2"/><rect x="3.6" y="13.4" width="7" height="7" rx="2"/><rect x="13.4" y="13.4" width="7" height="7" rx="2"/></svg>`,
  // 沿主线读完：一条竖线上的三个节点（概念 → 脉络 → 经典）
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M6.4 4.4v15.2"/><circle cx="6.4" cy="7.6" r="1.9"/><circle cx="6.4" cy="12" r="1.9"/><circle cx="6.4" cy="16.4" r="1.9"/><path d="M11.2 7.6H19M11.2 12h5.4M11.2 16.4H19"/></svg>`,
  // 收藏、引用、共建：书签
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M6.6 4.4h10.8a1 1 0 0 1 1 1v14.2l-6.4-3.9-6.4 3.9V5.4a1 1 0 0 1 1-1Z"/></svg>`,
];

function stepCard(n: number): string {
  const no = String(n).padStart(2, "0");
  return `<li class="step">
        <span class="step-ghost" aria-hidden="true">${no}</span>
        <span class="step-ico">${STEP_ICONS[n - 1]}</span>
        <span class="step-tag">${t(`step${n}_tag`)}</span>
        <h3>${t(`step${n}_t`)}</h3>
        <p>${t(`step${n}_d`)}</p>
        <span class="step-bar" aria-hidden="true"><i></i></span>
        ${n < 3 ? `<i class="step-line" aria-hidden="true"></i>` : ""}
      </li>`;
}

// 首页滚动入场与数字增长：只在首页生效，重复渲染时先断开旧观察器，
// 并尊重系统的「减少动态效果」设置。
let homeReveal: IntersectionObserver | null = null;
let homeCount: IntersectionObserver | null = null;
let homeTyper: number | null = null;

function mountHomeMotion(view: HTMLElement): void {
  homeReveal?.disconnect();
  homeCount?.disconnect();
  homeReveal = null;
  homeCount = null;
  if (homeTyper !== null) {
    clearTimeout(homeTyper);
    homeTyper = null;
  }
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  mountTyper(view);

  const revealEls = view.querySelectorAll<HTMLElement>(
    ".sec-head, .bento-card, .aud-card, .step, .faq-item",
  );
  if (revealEls.length) {
    revealEls.forEach((el) => el.classList.add("reveal"));
    homeReveal = new IntersectionObserver(
      (entries, io) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    revealEls.forEach((el) => homeReveal?.observe(el));
  }

  const metrics = view.querySelector<HTMLElement>(".metrics");
  const nums = Array.from(
    view.querySelectorAll<HTMLElement>(".metric .num[data-count]"),
  );
  if (!metrics || !nums.length) return;
  homeCount = new IntersectionObserver(
    (entries, io) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      io.disconnect();
      nums.forEach(runCountUp);
    },
    { threshold: 0.4 },
  );
  homeCount.observe(metrics);
}

function runCountUp(el: HTMLElement): void {
  const target = Number(el.dataset.count ?? "0");
  const suffix = el.dataset.suffix ?? "";
  if (!Number.isFinite(target)) return;
  const duration = 900;
  const start = performance.now();
  const frame = (now: number) => {
    const p = Math.min(1, (now - start) / duration);
    const eased = 1 - (1 - p) ** 3;
    const value = Math.round(target * eased).toLocaleString("en-US");
    el.textContent = `${value}${suffix}`;
    if (p < 1) requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
}

// Hero 预览搜索框的打字机：轮播几个示例检索词，纯装饰（父容器 aria-hidden）。
function mountTyper(view: HTMLElement): void {
  const el = view.querySelector<HTMLElement>(".hv-query");
  const words = (el?.dataset.words ?? "")
    .split("|")
    .map((w) => w.trim())
    .filter(Boolean);
  if (!el || words.length < 2) return;
  // 先清空静态兜底文案，避免从完整句子突然变成一个字。
  el.textContent = "";
  let index = 0;
  let chars = 0;
  let deleting = false;
  const tick = () => {
    const word = words[index];
    if (deleting) {
      chars -= 1;
      if (chars <= 0) {
        chars = 0;
        deleting = false;
        index = (index + 1) % words.length;
      }
    } else {
      chars += 1;
      if (chars >= word.length) deleting = true;
    }
    el.textContent = word.slice(0, chars);
    const hold = !deleting && chars >= word.length ? 1700 : 0;
    homeTyper = window.setTimeout(tick, (deleting ? 42 : 88) + hold);
  };
  homeTyper = window.setTimeout(tick, 600);
}

// 首页「返回顶部」：滚动超过阈值时在右下角显示，点击平滑回顶。
// 滚动监听只绑定一次（首页可能被多次渲染，如切换语言），每次渲染保证按钮存在即可；
// 处理函数按 id 动态定位按钮，避免监听器在重复渲染中丢失。离开首页后按钮随
// #view 重置而移除，处理函数找不到按钮即不动作，不会产生孤儿按钮。
let homeToTopBound = false;
const TO_TOP_SVG =
  '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5"/><path d="M5 12l7-7 7 7"/></svg>';

function mountHomeToTop(view: HTMLElement): void {
  let btn = view.querySelector<HTMLButtonElement>("#toTopHome");
  if (!btn) {
    btn = document.createElement("button");
    btn.id = "toTopHome";
    btn.className = "to-top-home";
    btn.type = "button";
    btn.setAttribute("aria-label", "返回顶部");
    btn.innerHTML = TO_TOP_SVG;
    btn.addEventListener("click", () =>
      window.scrollTo({ top: 0, behavior: "smooth" }),
    );
    view.appendChild(btn);
  }

  if (!homeToTopBound) {
    homeToTopBound = true;
    const onScroll = () => {
      const el = document.getElementById("toTopHome");
      if (el) el.classList.toggle("show", window.scrollY > 420);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }
}

// 语言切换时重渲染当前首页；保留已输入的搜索词与当前分类。
onLangChange(() => {
  if (location.hash === "" || location.hash === "#/" || location.hash === "#") {
    const view = document.getElementById("view")!;
    const query =
      view.querySelector<HTMLInputElement>("#subjSearch")?.value ?? "";
    const cat =
      view.querySelector<HTMLButtonElement>(".filter-chip.is-active")?.dataset
        .cat ?? "all";
    renderHome(view);
    if (cat !== "all") {
      view
        .querySelector<HTMLButtonElement>(`.filter-chip[data-cat="${cat}"]`)
        ?.click();
    }
    if (query) {
      const input = view.querySelector<HTMLInputElement>("#subjSearch");
      if (input) {
        input.value = query;
        input.dispatchEvent(new Event("input"));
      }
    }
  }
});
