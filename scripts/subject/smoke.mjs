/* subjectKit 系学科（physics / chem / mgmt）浏览器冒烟：自起 preview，双语 × 明暗四组合逐条点开。
   用法：node scripts/subject/smoke.mjs <subject> [模块 key...]
     node scripts/subject/smoke.mjs physics experiments
     node scripts/subject/smoke.mjs chem kinetics energy
   断言期望值一律从 public/<subject>-data/data/*.json 现算，浏览器只证明「渲染 = 数据」；
   每组合同时跑一轮反向对照（破环渲染后断言必须变红），防止永真断言。
   退出码：fail > 0 时为 1。 */
import { spawn } from "node:child_process";
import { readFileSync } from "node:fs";
import puppeteer from "puppeteer";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PORT = 4401;
const BASE = `http://localhost:${PORT}/wanwu-hub/`;

const argv = process.argv.slice(2);
const rest = argv.filter((a) => !a.startsWith("--"));
const subject = rest[0];
if (!subject)
  throw new Error(
    "用法：node scripts/subject/smoke.mjs <subject> [模块 key...]",
  );
const only = rest.slice(1);
const D = `public/${subject}-data/data/`;

const overview = JSON.parse(readFileSync(`${D}overview.json`, "utf8"));
/* overview.modules 的标题形态各学科不一：chem 是 {zh,en}，physics/mgmt 是 title/titleEn 平铺 */
const zhOf = (t) => (t && typeof t === "object" ? t.zh : t);
const enOf = (t, flat) => (t && typeof t === "object" ? (t.en ?? flat) : flat);
const itemCache = new Map();
const readItems = (key) => {
  if (!itemCache.has(key))
    itemCache.set(key, JSON.parse(readFileSync(`${D}${key}.json`, "utf8")));
  return itemCache.get(key);
};
const modules = (
  only.length
    ? overview.modules.filter((m) => only.includes(m.key))
    : overview.modules
).map((m) => ({
  key: m.key,
  titleZh: zhOf(m.title),
  titleEn: enOf(m.title, m.titleEn),
  declared: m.count,
  items: readItems(m.key),
}));
if (!modules.length) throw new Error(`模块名不匹配：${only.join(",")}`);
const total = modules.reduce((n, m) => n + m.items.length, 0);
console.log(
  `[${subject}] 冒烟范围：${modules.length} 模块 / ${total} 条 × 4 组合`,
);

/* 每模块拿末尾 3 条的中文/英文标题当搜索探针（内容批的新条目总在数组尾部） */
const probes = modules.map((m) => ({
  key: m.key,
  zh: m.items.slice(-3).map((it) => ({ term: it.term, id: it.id })),
  en: m.items
    .slice(-3)
    .map((it) => ({ term: it.termEn || it.term, id: it.id })),
}));

const server = spawn(
  "npx",
  ["vite", "preview", "--port", String(PORT), "--strictPort"],
  {
    stdio: "ignore",
  },
);
const wait = async () => {
  for (let i = 0; i < 160; i++) {
    try {
      const r = await fetch(BASE);
      if (r.ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 250));
  }
  throw new Error("preview 未就绪");
};

let pass = 0;
const fails = [];
const ok = (cond, msg) => {
  if (cond) pass++;
  else fails.push(msg);
};
const norm = (s) => (s || "").replace(/\s+/g, "").trim();
/* 只留字母数字汉字：去掉标点、列表符号与上下标，使正文可比 */
const clean = (s) => (s || "").replace(/[^0-9A-Za-z\u4e00-\u9fff]/g, "");
const CJK = /[\u4e00-\u9fff]/;
/* 模块网格内的「条目」标记：普通卡模块是 .js-item，周期表模块是 .js-pt
   （占位格 .js-pt-marker、图例 .js-pt-leg 无 data-key，不计入条目数）。 */
const itemsSel = (scope) => `${scope} .js-item, ${scope} .js-pt`;

/* physics/chem 允许同一 id 跨模块重名（以模块为命名空间），所以跨模块搜索结果里
   `[data-key=id]` 并不唯一。断言口径改为「标题 ∈ 该 id 的候选集」，并用标题文本
   在同 id 的多张结果卡里挑出探针那一张，避免点到隔壁模块的重名条目。 */
const termsById = new Map();
for (const m of overview.modules) {
  for (const it of readItems(m.key)) {
    if (!termsById.has(it.id)) termsById.set(it.id, new Set());
    termsById
      .get(it.id)
      .add(norm(it.term))
      .add(norm(it.termEn || it.term));
  }
}

const browser = await puppeteer.launch({
  executablePath: CHROME,
  args: ["--no-sandbox"],
});
const pageErr = [];
try {
  await wait();
  for (const lang of ["zh", "en"]) {
    for (const theme of ["light", "dark"]) {
      const tag = `${lang}/${theme}`;
      const ctx = await browser.createBrowserContext();
      const page = await ctx.newPage();
      await page.setViewport({ width: 1360, height: 900 });
      page.on("pageerror", (e) =>
        pageErr.push(`${tag} pageerror: ${e.message}`),
      );
      page.on("console", (m) => {
        /* 离线跑时百度统计这类外部脚本会触发 Failed to load resource，
           与学科渲染无关；同源请求失败改由下面的 requestfailed 带 URL 记。 */
        if (m.type() !== "error" || /Failed to load resource/.test(m.text()))
          return;
        pageErr.push(`${tag} console: ${m.text()}`);
      });
      page.on("requestfailed", (r) => {
        if (new URL(r.url()).origin === new URL(BASE).origin)
          pageErr.push(
            `${tag} 同源请求失败 ${r.url()}：${r.failure()?.errorText ?? ""}`,
          );
      });
      await page.evaluateOnNewDocument(
        (l, t) => {
          localStorage.setItem("lang", l);
          localStorage.setItem("theme", t);
        },
        lang,
        theme,
      );
      await page.goto(`${BASE}#/subject/${subject}/`, {
        waitUntil: "networkidle2",
      });
      await page.waitForSelector(".modnav .mod", { timeout: 20000 });

      /* 存在性对照：先证明页面真渲染了本学科，否则后面全是空转 */
      const nav = await page.$$eval(".modnav .mod", (els) =>
        els.map((e) => e.dataset.go),
      );
      ok(
        nav.length === overview.modules.length,
        `${tag} 导航模块数 ${nav.length} ≠ ${overview.modules.length}`,
      );

      /* 五十八批回归：学科吸顶层的偏移必须等于实测顶栏高，否则导航被顶栏盖住 */
      const sticky = await page.evaluate(() => {
        const nav = document.querySelector(".subject-root .modnav");
        return {
          varH: parseFloat(
            getComputedStyle(document.documentElement).getPropertyValue(
              "--topbar-h",
            ),
          ),
          realH: Math.round(
            document.querySelector("header.topbar")?.getBoundingClientRect()
              .height ?? -1,
          ),
          navTopCss: nav ? getComputedStyle(nav).top : "none",
        };
      });
      ok(
        Math.abs(sticky.varH - sticky.realH) <= 1,
        `${tag} --topbar-h ${sticky.varH} ≠ 实测顶栏 ${sticky.realH}`,
      );
      ok(
        sticky.navTopCss === `${sticky.varH}px`,
        `${tag} 模块导航 CSS top ${sticky.navTopCss} ≠ --topbar-h ${sticky.varH}px`,
      );

      for (const mod of modules) {
        await page.evaluate(
          (k) => document.querySelector(`.mod[data-go="${k}"]`).click(),
          mod.key,
        );
        const head = await page.$eval(`#sm-${mod.key} .mod-head h2`, (e) =>
          e.textContent.replace(/\s+/g, "").trim(),
        );
        const wantHead = lang === "zh" ? mod.titleZh : mod.titleEn;
        ok(head === norm(wantHead), `${tag} 模块标题 ${head} ≠ ${wantHead}`);
        ok(
          await page.$eval(`#sm-${mod.key}`, (e) =>
            e.classList.contains("active"),
          ),
          `${tag} 模块未激活 ${mod.key}`,
        );

        const cards = await page.$$eval(itemsSel(`#sm-${mod.key}`), (els) =>
          els.map((e) => e.dataset.key),
        );
        ok(
          cards.length === mod.items.length,
          `${tag} ${mod.key} 卡片数 ${cards.length} ≠ 数据 ${mod.items.length}`,
        );
        if (mod.declared != null) {
          ok(
            mod.declared === mod.items.length,
            `${tag} ${mod.key} overview.count ${mod.declared} ≠ 实有 ${mod.items.length}（计数漂移）`,
          );
        }

        /* 难度筛选：chip 档位与逐档计数都须由数据算出；level 允许缺省
           （如 chem periodic-table-full 全 118 条无该字段），故先剔除 null/undefined，
           否则 [null] 会让 length 为真却无对应 chip，选择器返回 null 而 .click() 抛错。 */
        const levels = [
          ...new Set(mod.items.map((it) => it.level).filter((l) => l != null)),
        ].sort((a, b) => a - b);
        const chips = await page.$$eval(
          `#sm-${mod.key} .sm-filters [data-lvl]`,
          (els) => els.map((e) => Number(e.dataset.lvl)),
        );
        if (levels.length) {
          ok(
            chips.join(",") === [0, ...levels].join(","),
            `${tag} ${mod.key} 筛选档位 ${chips.join(",")} ≠ 0,${levels.join(",")}`,
          );
          for (const lv of levels) {
            const want = mod.items.filter((it) => it.level === lv).length;
            await page.evaluate(
              (k, v) =>
                document
                  .querySelector(`#sm-${k} .sm-filters [data-lvl="${v}"]`)
                  .click(),
              mod.key,
              lv,
            );
            const got = await page.$$eval(
              itemsSel(`#sm-${mod.key}`),
              (els) => els.length,
            );
            ok(
              got === want,
              `${tag} ${mod.key} lv${lv} 筛出 ${got} ≠ 期望 ${want}`,
            );
          }
          await page.evaluate(
            (k) =>
              document
                .querySelector(`#sm-${k} .sm-filters [data-lvl="0"]`)
                .click(),
            mod.key,
          );
          ok(
            (await page.$$eval(
              itemsSel(`#sm-${mod.key}`),
              (els) => els.length,
            )) === mod.items.length,
            `${tag} ${mod.key} 复位「全部」后计数不符`,
          );
        } else {
          ok(
            chips.length === 0,
            `${tag} ${mod.key} 无 level 数据却渲染了筛选条`,
          );
        }

        for (const it of mod.items) {
          const sel = `#sm-${mod.key} [data-key="${it.id}"]`;
          /* 不用 puppeteer 命中测试（滚动位置与遮挡会让它假报「不可点击」），
             改为滚到居中后直接 DOM click，并单独断言尺寸与可见性。 */
          const box = await page.evaluate((s) => {
            const el = document.querySelector(s);
            if (!el) return null;
            el.scrollIntoView({ block: "center" });
            const r = el.getBoundingClientRect();
            const st = getComputedStyle(el);
            el.click();
            return {
              w: Math.round(r.width),
              h: Math.round(r.height),
              vis: st.visibility,
              disp: st.display,
            };
          }, sel);
          if (!box) {
            fails.push(`${tag} 卡片缺失 ${mod.key}.${it.id}`);
            continue;
          }
          ok(
            box.w > 0 &&
              box.h > 0 &&
              box.vis === "visible" &&
              box.disp !== "none",
            `${tag} 卡片不可见 ${mod.key}.${it.id} ${JSON.stringify(box)}`,
          );

          /* 抽屉带滑入动画：轮询 .open 就位，不写死等待时长 */
          await page.waitForFunction(() => {
            const d = document.querySelector("#subDetail");
            return d && !d.hidden && d.classList.contains("open");
          });
          const got = await page.$eval("#subDetail", (e) => {
            const q = (s) => e.querySelectorAll(s);
            const secs = [...e.querySelectorAll(".dsec")];
            const titled = (t) => {
              const s = secs.find(
                (x) =>
                  (x.querySelector(".dsec-t")?.textContent || "").trim() === t,
              );
              return s ? s.querySelector(".dsec-body")?.innerText || "" : "";
            };
            return {
              title: (
                e.querySelector(".detail-title")?.textContent || ""
              ).trim(),
              eyebrow: (
                e.querySelector(".detail-eyebrow")?.textContent || ""
              ).trim(),
              sections: q(".dsec").length,
              bodyText: e.querySelector(".detail-body")?.innerText || "",
              detailZh: titled("详解"),
              detailEnSec: titled("Details"),
              eqSets: q(".eq-set").length,
              eqs: q(".eq-set .eq").length,
              subGroups: q(".sub-group").length,
              subs: q(".sub-group .sub").length,
              figures: q(".sd-figure").length,
              tags: q(".detail-tags .tag").length,
              rel: q("[data-rel]").length,
              hasClose: !!e.querySelector(".detail-close"),
            };
          });
          const wantTitle = lang === "zh" ? it.term : it.termEn || it.term;
          ok(
            got.title === wantTitle,
            `${tag} 详情标题 ${got.title} ≠ ${wantTitle}`,
          );
          ok(
            norm(got.eyebrow).includes(
              norm(lang === "zh" ? mod.titleZh : mod.titleEn),
            ),
            `${tag} 抽屉眉标缺模块名 ${mod.key}.${it.id} -> ${got.eyebrow}`,
          );
          /* 节数 = 数据里实际存在的可渲染字段数 */
          const wantSections = [
            it.oneLiner ? 1 : 0,
            it.value ? 1 : 0,
            it.eq ? 1 : 0,
            it.subs?.length ? 1 : 0,
            it.figure ? 1 : 0,
            it.detail ? 1 : 0,
            it.example ? 1 : 0,
          ].reduce((a, b) => a + b, 0);
          ok(
            got.sections === wantSections,
            `${tag} ${mod.key}.${it.id} 分节 ${got.sections} ≠ 期望 ${wantSections}`,
          );
          /* 物理的 eq 可以是单对象 {lhs,rhs,rel}，化学的是数组 */
          const eqCount = Array.isArray(it.eq) ? it.eq.length : it.eq ? 1 : 0;
          ok(
            got.eqSets === (it.eq ? 1 : 0) && got.eqs === eqCount,
            `${tag} ${mod.key}.${it.id} 方程块 ${got.eqSets}/${got.eqs} ≠ ${it.eq ? 1 : 0}/${eqCount}`,
          );
          /* subs 按 role（l/r/c）分组，组数 = 数据里出现的角色数 */
          const roleGroups = it.subs?.length
            ? new Set(it.subs.map((s) => s.role)).size
            : 0;
          ok(
            got.subGroups === roleGroups &&
              got.subs === (it.subs ? it.subs.length : 0),
            `${tag} ${mod.key}.${it.id} 释义行 ${got.subGroups}/${got.subs} ≠ ${roleGroups}/${it.subs?.length ?? 0}`,
          );
          ok(
            got.figures === (it.figure ? 1 : 0),
            `${tag} ${mod.key}.${it.id} 示意图 ${got.figures} ≠ ${it.figure ? 1 : 0}`,
          );
          ok(
            got.tags === (it.tags?.length ?? 0),
            `${tag} ${mod.key}.${it.id} 标签 ${got.tags} ≠ ${it.tags?.length ?? 0}`,
          );
          const body = lang === "zh" ? it.detail : it.detailEn || it.detail;
          if (body) {
            /* 字符集与长度只看「详解」节：figure / subs 等节允许带中文标注 */
            const shown = clean(lang === "zh" ? got.detailZh : got.detailEnSec);
            const want = clean(body);
            ok(
              shown.length >= want.length * 0.9,
              `${tag} ${mod.key}.${it.id} 详解正文偏短 ${shown.length} < ${want.length}`,
            );
            ok(
              shown.includes(want.slice(0, 20)),
              `${tag} ${mod.key}.${it.id} 详解正文未渲染（前 20 字未命中）`,
            );
            ok(
              CJK.test(shown) === CJK.test(want),
              `${tag} ${mod.key}.${it.id} 详解节字符集异常`,
            );
          }
          ok(
            !/undefined|\[object/.test(got.bodyText),
            `${tag} 出现 undefined ${mod.key}.${it.id}`,
          );
          ok(
            !/(\*\*|`)/.test(got.bodyText),
            `${tag} markdown 残留 ${mod.key}.${it.id}`,
          );
          if (it.figure)
            ok(
              await svgInBounds(page, tag, mod.key, it.id),
              `${tag} SVG 越界 ${it.id}`,
            );
          await page.evaluate(() =>
            document.querySelector(".detail-close").click(),
          );
          await page.waitForFunction(
            () => document.querySelector("#subDetail")?.hidden,
          );
          pass++;
        }
      }

      /* 搜索：新条目的标题必须能被当前语言整词命中，且能就地开抽屉 */
      for (const p of probes) {
        for (const one of p[lang]) {
          const res = await searchHit(page, one.term);
          ok(
            res.includes(one.id),
            `${tag} 搜索「${one.term}」未命中 ${one.id}（结果 ${res.join(",") || "空"}）`,
          );
          if (res.includes(one.id)) {
            const clicked = await page.evaluate(
              (sel, text) => {
                const hit = [...document.querySelectorAll(sel)].find((e) =>
                  (e.textContent || "").replace(/\s+/g, "").includes(text),
                );
                if (!hit) return false;
                hit.scrollIntoView({ block: "center" });
                hit.click();
                return true;
              },
              `#subResults [data-key="${one.id}"]`,
              norm(one.term),
            );
            ok(clicked, `${tag} 搜索结果里没有标题为「${one.term}」的卡片`);
            if (!clicked) {
              await clearSearch(page);
              continue;
            }
            await page.waitForFunction(() => {
              const d = document.querySelector("#subDetail");
              return d && !d.hidden && d.classList.contains("open");
            });
            const t = await page.$eval(".detail-title", (e) =>
              e.textContent.trim(),
            );
            const cands = [...(termsById.get(one.id) ?? [])];
            ok(
              cands.includes(norm(t)),
              `${tag} 搜索结果标题 ${t} ∉ ${one.id} 候选集 ${cands.join("/")}`,
            );
            await page.evaluate(() =>
              document.querySelector(".detail-close").click(),
            );
            await page.waitForFunction(
              () => document.querySelector("#subDetail")?.hidden,
            );
          }
          await clearSearch(page);
          ok(
            (await page.$$eval(
              itemsSel(`#sm-${p.key}`),
              (els) => els.length,
            )) === modules.find((m) => m.key === p.key).items.length,
            `${tag} 清空搜索后 ${p.key} 列表未复原`,
          );
        }
      }

      await negativeControls(page, tag, modules, ok);
      await page.close();
      await ctx.close();
      console.log(`${tag} 完成（累计 pass=${pass}）`);
    }
  }
} finally {
  await browser.close();
  server.kill();
}
ok(
  pageErr.length === 0,
  `控制台/页面错误 ${pageErr.length} 条：${pageErr.slice(0, 3).join(" | ")}`,
);
console.log(`\n[${subject}] smoke：pass=${pass} fail=${fails.length}`);
const kinds = new Map();
for (const f of fails) {
  const k = f
    .replace(/^(zh|en)\/(light|dark) /, "")
    .replace(/[≠:].*$/, "")
    .trim();
  kinds.set(k, (kinds.get(k) || 0) + 1);
}
for (const [k, n] of [...kinds].sort((a, b) => b[1] - a[1]).slice(0, 8)) {
  console.log(`  ✗x${n} ${k}`);
}
for (const f of fails.slice(0, 12)) console.log("  ✗", f);
process.exit(fails.length ? 1 : 0);

/* ---------- helpers ---------- */

async function svgInBounds(page, tag, key, id) {
  /* 浏览器里跑的函数拿不到 node 作用域，归一化必须就地写 */
  const bad = await page.$$eval("#subDetail .sd-figure svg text", (ts) =>
    ts
      .map((t) => {
        const flat = (t.textContent || "").replace(/\s+/g, " ").trim();
        const b = t.getBBox();
        const svg = t.ownerSVGElement;
        const vb = svg.viewBox.baseVal;
        const w = vb.width || svg.clientWidth.baseVal.value;
        const h = vb.height || svg.clientHeight.baseVal.value;
        const over = [];
        if (b.x < -0.5) over.push(`左${b.x.toFixed(1)}`);
        if (b.x + b.width > w + 0.5)
          over.push(`右溢${(b.x + b.width - w).toFixed(1)}`);
        if (b.y < -0.5) over.push(`上${b.y.toFixed(1)}`);
        if (b.y + b.height > h + 0.5)
          over.push(`下溢${(b.y + b.height - h).toFixed(1)}`);
        return over.length ? `${flat}(${b.width.toFixed(1)}) ${over}` : "";
      })
      .filter(Boolean),
  );
  ok(bad.length === 0, `${tag} SVG 越界 ${key}.${id}: ${bad.join(" | ")}`);
  return bad.length === 0;
}

async function searchHit(page, term) {
  await page.evaluate((t) => {
    const el = document.querySelector("#search");
    el.focus();
    el.value = t;
    el.dispatchEvent(new Event("input", { bubbles: true }));
  }, term);
  await new Promise((r) => setTimeout(r, 350));
  return page.$$eval("#subResults .js-item", (els) =>
    els.map((e) => e.dataset.key),
  );
}

async function clearSearch(page) {
  await page.evaluate(() => {
    const el = document.querySelector("#search");
    el.value = "";
    el.dispatchEvent(new Event("input", { bubbles: true }));
  });
  await new Promise((r) => setTimeout(r, 350));
}

/** 反向对照：故意破坏渲染或喂假 id，断言必须变红，否则说明上面的断言是永真的。 */
async function negativeControls(page, tag, modules, ok) {
  const mod = modules[0];
  const last = mod.items[mod.items.length - 1];
  await page.evaluate(
    (k) => document.querySelector(`.mod[data-go="${k}"]`).click(),
    mod.key,
  );
  await new Promise((r) => setTimeout(r, 200));
  const count = () =>
    page.$$eval(`#sm-${mod.key} .js-item`, (els) => els.length);

  const n0 = await count();
  ok(
    n0 === mod.items.length,
    `${tag} 反向前置：${mod.key} 当前 ${n0} ≠ ${mod.items.length}`,
  );
  await page.evaluate((sel) => {
    document.querySelector(sel).remove();
  }, `#sm-${mod.key} [data-key="${last.id}"]`);
  ok(
    (await count()) === n0 - 1,
    `${tag} 反向①：删一张卡后计数没变（断言不敏感）`,
  );

  const fake = await page.$$eval(
    `#sm-${mod.key} [data-key="no-such-id-xyz"]`,
    (e) => e.length,
  );
  const real = await page.$$eval(
    `#sm-${mod.key} [data-key="${mod.items[0].id}"]`,
    (e) => e.length,
  );
  ok(
    fake === 0 && real === 1,
    `${tag} 反向②：假 id ${fake} / 真 id ${real}，选择器不敏感`,
  );

  await page.evaluate((sel) => {
    const el = document.querySelector(sel);
    el.scrollIntoView({ block: "center" });
    el.click();
  }, `#sm-${mod.key} [data-key="${mod.items[0].id}"]`);
  await page.waitForFunction(() =>
    document.querySelector("#subDetail")?.classList.contains("open"),
  );
  const secBefore = await page.$$eval("#subDetail .dsec", (e) => e.length);
  await page.evaluate(() => {
    document.querySelectorAll("#subDetail .dsec").forEach((n) => {
      n.remove();
    });
  });
  ok(
    (await page.$$eval("#subDetail .dsec", (e) => e.length)) === 0,
    `${tag} 反向③：删掉分节后计数仍为 ${secBefore}，断言不敏感`,
  );
  await page.evaluate(() => document.querySelector(".detail-close").click());
  await page.waitForFunction(
    () => document.querySelector("#subDetail")?.hidden,
  );

  const none = await searchHit(page, "zzz-不存在-zzz");
  ok(
    none.length === 0,
    `${tag} 反向④：假搜索词仍出 ${none.length} 条，命中断言不敏感`,
  );
  await clearSearch(page);
}
