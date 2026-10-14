/* chem 浏览器冒烟：起 preview、双语 × 明暗逐条点开，验证渲染与 SVG 越界。
   node scripts/chem/smoke.mjs                 # 全部 19 个模块
   node scripts/chem/smoke.mjs kinetics energy # 只跑指定模块
   断言口径全部来自 public/chem-data/data/*.json，浏览器只负责证明「渲染出来的与数据一致」。
   退出码：fail>0 时为 1。 */
import { spawn } from "node:child_process";
import { readFileSync } from "node:fs";
import puppeteer from "puppeteer";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PORT = 4399;
const BASE = `http://localhost:${PORT}/wanwu-hub/`;
const only = process.argv.slice(2).filter((a) => !a.startsWith("--"));

const D = "public/chem-data/data/";
const overview = JSON.parse(readFileSync(`${D}overview.json`, "utf8"));
const modules = (
  only.length
    ? overview.modules.filter((m) => only.includes(m.key))
    : overview.modules
).map((m) => ({
  key: m.key,
  titleZh: m.title.zh,
  titleEn: m.title.en,
  items: JSON.parse(readFileSync(`${D}${m.key}.json`, "utf8")),
}));
if (!modules.length) throw new Error(`模块名不匹配：${only.join(",")}`);
const total = modules.reduce((n, m) => n + m.items.length, 0);
console.log(`冒烟范围：${modules.length} 模块 / ${total} 条 × 4 组合`);

const server = spawn(
  "npx",
  ["vite", "preview", "--port", String(PORT), "--strictPort"],
  {
    stdio: "ignore",
  },
);
const wait = async () => {
  for (let i = 0; i < 120; i++) {
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
const norm = (s) => (s || "").replace(/\s+/g, " ").trim();

const browser = await puppeteer.launch({
  executablePath: CHROME,
  args: ["--no-sandbox"],
});
try {
  await wait();
  for (const lang of ["zh", "en"]) {
    for (const theme of ["light", "dark"]) {
      const ctx = await browser.createBrowserContext();
      const page = await ctx.newPage();
      await page.setViewport({ width: 1360, height: 900 });
      await page.evaluateOnNewDocument(
        (l, t) => {
          localStorage.setItem("lang", l);
          localStorage.setItem("theme", t);
        },
        lang,
        theme,
      );
      await page.goto(`${BASE}#/subject/chem/`, { waitUntil: "networkidle2" });

      /* 存在性对照：先证明页面真的渲染了 chem，否则后面全是空转 */
      const nav = await page.$$eval(".mod", (els) =>
        els.map((e) => e.dataset.go),
      );
      ok(
        nav.length === overview.modules.length,
        `${lang}/${theme} 导航模块数 ${nav.length} ≠ ${overview.modules.length}`,
      );

      for (const mod of modules) {
        await page.evaluate(
          (k) => document.querySelector(`.mod[data-go="${k}"]`).click(),
          mod.key,
        );
        const heading = await page.$eval(`#sm-${mod.key} .mod-head h2`, (e) =>
          e.textContent.replace(/\s+/g, " ").trim(),
        );
        ok(
          /[\u4e00-\u9fff]/.test(heading) === (lang === "zh"),
          `${lang}/${theme} 模块标题语言不符：${mod.key} -> ${heading}`,
        );
        for (const it of mod.items) {
          const sel = `#sm-${mod.key} [data-key="${it.id}"]`;
          /* 不用 puppeteer 命中测试（滚动位置与遮挡会让它假报「不可点击」），
             而是滚到居中后直接 DOM click，并单独断言尺寸与可见性。 */
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
            fails.push(`${lang}/${theme} 卡片缺失 ${mod.key}.${it.id}`);
            continue;
          }
          ok(
            box.w > 0 &&
              box.h > 0 &&
              box.vis === "visible" &&
              box.disp !== "none",
            `${lang}/${theme} 卡片不可见 ${mod.key}.${it.id} ${JSON.stringify(box)}`,
          );
          const got = await page.$eval("#subDetail", (e) => {
            const n = (s) => (s || "").replace(/\s+/g, " ").trim();
            return {
              open: !e.hidden,
              title: n(e.querySelector(".sd-title")?.textContent),
              body: n(e.innerText),
            };
          });
          ok(got.open, `${lang}/${theme} 面板未打开 ${mod.key}.${it.id}`);
          const wantTitle = lang === "zh" ? it.term : it.termEn || it.term;
          ok(
            got.title === wantTitle,
            `${lang}/${theme} 详情标题 ${got.title} ≠ ${wantTitle}`,
          );
          const body = lang === "zh" ? it.detail : it.detailEn || it.detail;
          if (body) {
            ok(
              got.body.includes(norm(body).slice(0, 24)),
              `${lang}/${theme} 详情正文未渲染 ${mod.key}.${it.id}`,
            );
          }
          ok(
            !/undefined|\[object/.test(got.body),
            `${lang}/${theme} 出现 undefined ${mod.key}.${it.id}`,
          );
          ok(
            !/(\*\*|`)/.test(got.body),
            `${lang}/${theme} markdown 残留 ${mod.key}.${it.id}`,
          );
          if (it.figure) {
            /* 浏览器里跑的函数拿不到 node 作用域，归一化必须就地写 */
            const bad = await page.$$eval(
              "#subDetail .sd-figure svg text",
              (ts) =>
                ts
                  .map((t) => {
                    const flat = (t.textContent || "")
                      .replace(/\s+/g, " ")
                      .trim();
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
                    return over.length
                      ? `${flat}(${b.width.toFixed(1)}) ${over}`
                      : "";
                  })
                  .filter(Boolean),
            );
            ok(
              bad.length === 0,
              `${lang}/${theme} SVG 越界 ${mod.key}.${it.id}: ${bad.join(" | ")}`,
            );
          }
          await page.evaluate(() =>
            document.querySelector(".sd-close").click(),
          );
          ok(
            await page.$eval("#subDetail", (e) => e.hidden),
            `${lang}/${theme} 关闭后面板仍可见 ${mod.key}.${it.id}`,
          );
        }
      }
      await page.close();
      await ctx.close();
      console.log(`${lang}/${theme} 完成（累计 pass=${pass}）`);
    }
  }
} finally {
  await browser.close();
  server.kill();
}
console.log(`\nchem smoke：pass=${pass} fail=${fails.length}`);
for (const f of fails.slice(0, 25)) console.log("  ✗", f);
process.exit(fails.length ? 1 : 0);
