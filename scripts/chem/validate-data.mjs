/* chem 数据核验：方程式守恒 + 双语结构 + 错字巡检 + SVG 粗筛。
   用法：
     node scripts/chem/validate-data.mjs            # 全量核验（默认 public/chem-data/data）
     node scripts/chem/validate-data.mjs reactions quickref   # 只核验指定模块
     node scripts/chem/validate-data.mjs --stats    # 只打印内容实测账（条目/detail 分布/SVG 等）
   退出码：fail>0 时为 1；警告（detail 偏短、物种未释义、SVG 静态估宽）不影响退出码，
   SVG 是否真越界以浏览器 getComputedTextLength()/getBBox() 实测为权威。 */
import fs from "node:fs";

const DIR = "public/chem-data/data";
const SUP = {
  "⁰": 0,
  "¹": 1,
  "²": 2,
  "³": 3,
  "⁴": 4,
  "⁵": 5,
  "⁶": 6,
  "⁷": 7,
  "⁸": 8,
  "⁹": 9,
  "⁺": 1,
  "⁻": -1,
};
const SUB = {
  "₀": 0,
  "₁": 1,
  "₂": 2,
  "₃": 3,
  "₄": 4,
  "₅": 5,
  "₆": 6,
  "₇": 7,
  "₈": 8,
  "₉": 9,
};
const SUPRE = new RegExp(`[${Object.keys(SUP).join("")}]+$`);
const CJK = /[\u3400-\u9fff]/;

function splitSpecies(side) {
  return side
    .split("+")
    .map((x) => x.trim())
    .filter(Boolean);
}

/** 返回 { atoms: Map, charge: number } ；解析失败返回 null */
function parseSpecies(raw) {
  let s = raw
    .replace(/[↑↓]/g, "")
    .replace(/[=≡—–]/g, "")
    .replace(/ₙ/g, "")
    .trim();
  let charge = 0;
  const tail = s.match(SUPRE);
  if (tail) {
    const sup = tail[0];
    s = s.slice(0, s.length - sup.length);
    let mag = 0,
      sign = 0,
      hasDigit = false;
    for (const c of sup) {
      const v = SUP[c];
      if (c === "⁺" || c === "⁻") sign = v;
      else {
        hasDigit = true;
        mag = mag * 10 + v;
      }
    }
    charge = sign !== 0 ? sign * (hasDigit ? mag : 1) : hasDigit ? mag : 0;
  }
  const atoms = new Map();
  const add = (el, n) => atoms.set(el, (atoms.get(el) || 0) + n);
  const walk = (str, mult) => {
    let i = 0;
    while (i < str.length) {
      const c = str[i];
      if (c === "(" || c === "[") {
        let depth = 0,
          j = i;
        for (; j < str.length; j++) {
          if (str[j] === "(" || str[j] === "[") depth++;
          else if (str[j] === ")" || str[j] === "]") {
            depth--;
            if (!depth) break;
          }
        }
        const inner = str.slice(i + 1, j);
        let k = j + 1,
          num = "";
        while (k < str.length && SUB[str[k]] !== undefined) {
          num += String(SUB[str[k]]);
          k++;
        }
        if (!walk(inner, num ? Number(num) : 1)) return null;
        i = k;
        continue;
      }
      if (c === "·") {
        let rest = str.slice(i + 1);
        let m = 1;
        const hm = rest.match(/^(\d+[xn]?|[xn])/);
        if (hm) {
          m = Number(hm[1].replace(/[xn]/g, "")) || 1;
          rest = rest.slice(hm[1].length);
        }
        if (!walk(rest, mult * m)) return null;
        return true;
      }
      if (/[A-Z]/.test(c)) {
        let el = c,
          j = i + 1;
        while (j < str.length && /[a-z]/.test(str[j])) {
          el += str[j];
          j++;
        }
        if (el.length > 1 && !/^[A-Z][a-z]?$/.test(el)) return null;
        let num = "";
        while (j < str.length && SUB[str[j]] !== undefined) {
          num += String(SUB[str[j]]);
          j++;
        }
        add(el, (num ? Number(num) : 1) * mult);
        i = j;
        continue;
      }
      return null;
    }
    return true;
  };
  let body = s,
    lead = 1;
  const lm = s.match(/^(\d+[xn]?|[xn])/);
  if (lm) {
    lead = Number(lm[1].replace(/[xn]/g, "")) || 1;
    body = s.slice(lm[1].length);
  }
  // 电子：2e⁻ 记作电荷 -2，不计原子
  if (body === "e") return { atoms: new Map(), charge: -1 * lead };
  if (!body || !walk(body, 1)) return null;
  for (const [el, n] of atoms) atoms.set(el, n * lead);
  return { atoms, charge: charge * lead };
}

function checkEq(a, b) {
  // 半反应写法 M − ne⁻ → Mⁿ⁺：先把电从左边搬到右边
  let lhs = a,
    rhs = b;
  const minus = lhs.match(/^(.*?)[\s]*[−-][\s]*(.*)$/);
  if (minus && /e⁻/.test(minus[2])) {
    lhs = minus[1];
    rhs = `${rhs} + ${minus[2]}`;
  }
  const errs = [];
  const sides = {};
  for (const [k, side] of [
    ["L", lhs],
    ["R", rhs],
  ]) {
    const total = new Map();
    let charge = 0;
    for (const sp of splitSpecies(side)) {
      const p = parseSpecies(sp);
      if (!p) return [`${sp} 解析失败`];
      charge += p.charge;
      for (const [el, n] of p.atoms) total.set(el, (total.get(el) || 0) + n);
    }
    sides[k] = { total, charge };
  }
  const keys = new Set([...sides.L.total.keys(), ...sides.R.total.keys()]);
  for (const el of keys) {
    const x = sides.L.total.get(el) || 0,
      y = sides.R.total.get(el) || 0;
    if (x !== y) errs.push(`原子 ${el}: ${x} ≠ ${y}`);
  }
  if (sides.L.charge !== sides.R.charge)
    errs.push(`电荷: ${sides.L.charge} ≠ ${sides.R.charge}`);
  return errs;
}

/* ---------- 反向对照：核验脚本自身必须有效（应报错的必须报错） ---------- */
const MUST_FAIL = [
  ["Fe + CuSO₄", "FeSO₄ + 2Cu"],
  ["CO₂ + Ca(OH)₂", "CaCO₃↓ + H₂"],
  ["2H₂ + O₂", "2H₂O + H"],
  ["2O₃", "2O₂"],
  ["Fe²⁺ + Cl₂", "Fe³⁺ + 2Cl⁻"],
  ["Ba²⁺ + SO₄²⁻", "BaSO₃↓"],
  ["C + O₂", "CO"],
  ["2Na + 2H₂O", "2NaOH + H₂↑ + H₂"],
  ["2Al + 2NaOH + 2H₂O", "2NaAlO₂ + 2H₂↑"],
  ["Fe₂O₃ + CO", "Fe + CO₂"],
  ["Ca(OH)₂ + Na₂CO₃", "CaCO₃↓ + NaOH"],
  ["Cu − 2e⁻", "Cu³⁺"],
  ["Fe − 2e⁻", "Fe³⁺"],
  ["4Fe + 3O₂ + xH₂O", "2Fe₂O₃·xH₂O"],
  ["CH₂=CH₂ + Br₂", "CH₂BrCH₂Br + H₂"],
];
const MUST_PASS = [
  ["NH₄⁺ + OH⁻", "NH₃↑ + H₂O"],
  ["CuSO₄ + 5H₂O", "CuSO₄·5H₂O"],
  ["3NO₂ + H₂O", "2HNO₃ + NO"],
  ["SO₂ + 2H₂S", "3S↓ + 2H₂O"],
  ["2Fe²⁺ + Cl₂", "2Fe³⁺ + 2Cl⁻"],
  ["Ba²⁺ + SO₄²⁻", "BaSO₄↓"],
  ["Fe + CuSO₄", "FeSO₄ + Cu"],
  ["CO₂ + Ca(OH)₂", "CaCO₃↓ + H₂O"],
  ["Na₂CO₃ + 2HCl", "2NaCl + H₂O + CO₂↑"],
  ["BaCl₂ + Na₂SO₄", "BaSO₄↓ + 2NaCl"],
  ["CuO + H₂SO₄", "CuSO₄ + H₂O"],
  ["CH₄ + 2O₂", "CO₂ + 2H₂O"],
  ["2Mg + CO₂", "2MgO + C"],
  ["2Na + Cl₂", "2NaCl"],
  ["3Fe + 2O₂", "Fe₃O₄"],
  ["2KClO₃", "2KCl + 3O₂↑"],
  ["2KMnO₄", "K₂MnO₄ + MnO₂ + O₂↑"],
  ["CaCO₃", "CaO + CO₂↑"],
  ["2H₂O", "2H₂↑ + O₂↑"],
  ["H₂SO₄ + 2NaOH", "Na₂SO₄ + 2H₂O"],
  ["Al(OH)₃ + 3HCl", "AlCl₃ + 3H₂O"],
  ["Cl₂ + 2NaBr", "2NaCl + Br₂"],
  ["H₂ + CuO", "Cu + H₂O"],
  ["Cu − 2e⁻", "Cu²⁺"],
  ["Zn − 2e⁻", "Zn²⁺"],
  ["Cu²⁺ + 2e⁻", "Cu"],
  ["4Fe + 3O₂ + 2xH₂O", "2Fe₂O₃·xH₂O"],
  ["CH₂=CH₂ + Br₂", "CH₂BrCH₂Br"],
  ["C₂H₅OH", "CH₂=CH₂↑ + H₂O"],
  ["nCH₂=CH₂", "[—CH₂—CH₂—]ₙ"],
];

let pass = 0;
const fails = [];
const ok = (c, m) => (c ? pass++ : fails.push(m));
const warns = [];
const warn = (cond, msg) => {
  if (!cond) warns.push(msg);
};

for (const [l, r] of MUST_FAIL)
  ok(checkEq(l, r).length > 0, `反向对照应报错但未报：${l} → ${r}`);
for (const [l, r] of MUST_PASS)
  ok(
    checkEq(l, r).length === 0,
    `反向对照应判平但报错：${l} → ${r} :: ${checkEq(l, r).join(";")}`,
  );

/* 括号展开、电荷与量级敏感 */
const p1 = parseSpecies("Al₂(SO₄)₃");
ok(
  p1 && p1.atoms.get("O") === 12 && p1.atoms.get("S") === 3,
  "Al₂(SO₄)₃ 展开失败",
);
const p2 = parseSpecies("Fe(SCN)₃");
ok(
  p2 && p2.atoms.get("C") === 3 && p2.atoms.get("N") === 3,
  "Fe(SCN)₃ 展开失败",
);
const p3 = parseSpecies("SO₄²⁻");
const p4 = parseSpecies("SO₃²⁻");
ok(p3?.charge === -2 && p4?.charge === -2, "多价离子电荷应为 -2");
ok(
  p3?.atoms.get("O") === 4 && p4?.atoms.get("O") === 3,
  "量级敏感：下标氧应不同",
);
const p5 = parseSpecies("CuSO₄·5H₂O");
ok(
  p5 && p5.atoms.get("H") === 10 && p5.atoms.get("O") === 9,
  "水合点系数解析失败",
);
ok(parseSpecies("O₂²⁻")?.charge === -2, "过氧根 O₂²⁻ 电荷应为 -2");

/* ---------- 内容侧巡检：历轮真实踩过的错字与悬空引用 ---------- */
const SUSPECT = [
  "退色",
  "野然",
  "，业上",
  "所只能",
  "活波",
  "高溶液",
  "胆矶",
  "判捬",
  "练铁",
  "儿件事",
  "情性",
  "向分",
  "egg-y",
  "still同",
  "Colourful",
  "Reactes",
  "省话",
  "士壤",
  "基磁",
  "儿茶酚",
  "诵片",
  "管壁也能感到温度升高。这条",
  "温度达到着火点以下。",
  "顺充",
  "领序",
  "代括",
  "镐酸钾",
  "镀酸钾",
  "鸨 3400",
  "必掌",
  "背成一句",
  "拖沓",
  "酚酚",
  "以反变重",
  "略略",
  "heap or tank",
  "Chemistry and Industry",
  "Chemistry in Daily Life",
];

/* ---------- 导出 JSON 是扁平结构：tags/tagsEn 平行数组，zh===en 时省略 termEn ---------- */
const ROLES = new Set(["l", "r", "c"]);
const keyOf = (s) =>
  s
    .trim()
    .replace(/[↑↓]/g, "")
    .replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻]/g, "")
    .replace(/^(\d+)/, "");

const argv = process.argv.slice(2);
const stats = argv.includes("--stats");
const allFiles = fs
  .readdirSync(DIR)
  .filter((f) => f.endsWith(".json") && !/overview|search/.test(f))
  .map((f) => f.replace(/\.json$/, ""));
const dirs = argv.filter((a) => a !== "--stats");
const list = dirs.length ? dirs : allFiles;

if (stats) {
  const ov = JSON.parse(fs.readFileSync(`${DIR}/overview.json`, "utf8"));
  let items = 0;
  for (const k of Object.keys(ov.counts)) items += ov.counts[k];
  const s = {
    模块: Object.keys(ov.counts).length,
    条目: items,
    非周期表: 0,
    带level: 0,
    无detail: 0,
    detail不足200: 0,
    detail达标: 0,
    带eq: 0,
    方程式: 0,
    subs: 0,
    非周期表SVG: 0,
    SVG总数: 0,
  };
  for (const f of fs.readdirSync(DIR)) {
    if (!f.endsWith(".json") || /overview|search/.test(f)) continue;
    const j = JSON.parse(fs.readFileSync(`${DIR}/${f}`, "utf8"));
    if (!Array.isArray(j)) continue;
    s.SVG总数 += j.filter((i) => i.figure).length;
    if (f === "periodic-table-full.json") continue;
    for (const it of j) {
      if (it.symbol) continue;
      s.非周期表++;
      if (it.level !== undefined) s.带level++;
      const L = (it.detail || "").length;
      if (!it.detail) s.无detail++;
      else if (L < 200) s["detail不足200"]++;
      else s.detail达标++;
      if (it.eq) {
        s.带eq++;
        s.方程式 += Array.isArray(it.eq) ? it.eq.length : 1;
      }
      s.subs += (it.subs || []).length;
      if (it.figure) s.非周期表SVG++;
    }
  }
  console.log(JSON.stringify(s, null, 2));
  process.exit(0);
}

let nEq = 0,
  nSub = 0,
  nFig = 0;
for (const key of list) {
  const items = JSON.parse(fs.readFileSync(`${DIR}/${key}.json`, "utf8"));
  for (const it of items) {
    const tag = `${key}.${it.id}`;
    for (const f of ["term", "oneLiner", "tags"]) {
      if (it[f] === undefined) continue;
      if (f === "tags") {
        ok(
          Array.isArray(it.tags) && Array.isArray(it.tagsEn),
          `${tag} tags/tagsEn 不成对`,
        );
        ok(
          it.tags.length === it.tagsEn.length,
          `${tag} tags 与 tagsEn 长度不等`,
        );
        for (const t of it.tagsEn)
          ok(!CJK.test(t), `${tag} tagsEn 含中文：${t}`);
      } else {
        ok(!!it[f], `${tag} ${f} 缺失`);
        // 导出器在 zh===en 时省略 xxxEn，此时原字段本身就该是英文（glossary.ph 等）
        if (it[`${f}En`] !== undefined)
          ok(!CJK.test(it[`${f}En`] || ""), `${tag} ${f}En 含中文`);
        else ok(!CJK.test(it[f] || ""), `${tag} ${f} 无 ${f}En 但含中文`);
      }
    }
    if (it.detail) {
      ok(!CJK.test(it.detailEn || ""), `${tag} detailEn 含中文`);
      warn(
        (it.detail || "").length > 120,
        `${tag} detail 偏短(${(it.detail || "").length})`,
      );
      warn(
        (it.detailEn || "").length > 200,
        `${tag} detailEn 偏短(${(it.detailEn || "").length})`,
      );
      const text = `${it.detail}${it.detailEn}`;
      for (const w of SUSPECT)
        ok(!text.includes(w), `${tag} 巡检命中可疑串「${w}」`);
      // detail 无论有没有 figure 都走 esc() 进单个 <p>，markdown 标记会原样显示
      ok(
        !/\*\*|`/.test(text),
        `${tag} detail 含 markdown 标记（渲染层 esc 后原样显示）`,
      );
    }
    const subs = it.subs || [];
    nSub += subs.length;
    const covered = new Set(subs.map((s) => keyOf(s.f)));
    for (const s of subs) {
      ok(ROLES.has(s.role), `${tag} sub ${s.f} role 非法: ${s.role}`);
      ok(
        !CJK.test(s.nameEn || "") && !CJK.test(s.noteEn || ""),
        `${tag} sub ${s.f} 英文含中文`,
      );
      ok(!!s.name && !!s.note, `${tag} sub ${s.f} 缺 name/note`);
      for (const w of SUSPECT)
        ok(
          !`${s.note}${s.noteEn}`.includes(w),
          `${tag} sub ${s.f} 巡检命中可疑串「${w}」`,
        );
    }
    const eqs = Array.isArray(it.eq) ? it.eq : it.eq ? [it.eq] : [];
    for (const e of eqs) {
      nEq++;
      const errs = checkEq(e.lhs, e.rhs);
      ok(
        errs.length === 0,
        `${tag} 方程式不守恒 ${e.lhs} → ${e.rhs} :: ${errs.join(";")}`,
      );
      for (const side of [e.lhs, e.rhs])
        for (const sp of splitSpecies(side))
          warn(
            covered.has(keyOf(sp)) || subs.length === 0,
            `${tag} 物种 ${sp} 未收入 subs`,
          );
      ok(!CJK.test(e.condEn || ""), `${tag} condEn 含中文`);
    }
    if (it.figure) {
      nFig++;
      const fig = it.figure;
      const cnt = (re) => (fig.match(re) || []).length;
      ok(cnt(/<text/g) === cnt(/<\/text>/g), `${tag} text 开合不等`);
      ok(cnt(/"/g) % 2 === 0, `${tag} 引号不成对`);
      ok(
        fig.startsWith("<svg") && fig.trim().endsWith("</svg>"),
        `${tag} figure 非完整 svg`,
      );
      const vb = (fig.match(/viewBox="0 0 (\d+) (\d+)"/) || [])
        .slice(1)
        .map(Number);
      ok(vb.length === 2, `${tag} 缺 viewBox 尺寸`);
      for (const m of fig.matchAll(
        /<text x="(\d+(?:\.\d+)?)" y="(\d+(?:\.\d+)?)"[^>]*font-size="([\d.]+)"[^>]*>([^<]*)<\/text>/g,
      )) {
        const [, x, y, size, txt] = m;
        const cjk = (txt.match(CJK) || []).length;
        const est =
          cjk * Number(size) + (txt.length - cjk) * Number(size) * 0.5;
        // 粗筛：忽略 text-anchor，真越界以浏览器实测为准
        warn(
          Number(x) + est <= vb[0] + 1,
          `${tag} SVG 估宽可能越界(x=${x} 估=${est.toFixed(0)})：${txt.slice(0, 22)}`,
        );
        ok(
          Number(y) <= vb[1],
          `${tag} SVG 文本超出高度(y=${y} vbH=${vb[1]})：${txt.slice(0, 22)}`,
        );
      }
    }
  }
}
console.log(
  `模块 ${list.join(",")} | 方程式 ${nEq} | subs ${nSub} | figure ${nFig}`,
);
console.log(`pass=${pass} fail=${fails.length} warn=${warns.length}`);
if (warns.length)
  console.log(
    `-- 警告（不影响退出码）--\n${warns.slice(0, 40).join("\n")}${warns.length > 40 ? `\n…共 ${warns.length} 条` : ""}`,
  );
if (fails.length) {
  console.log(fails.join("\n"));
  process.exit(1);
}
