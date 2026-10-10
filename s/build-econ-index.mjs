// econ 派生数据重建：由 16 个模块 JSON 生成 search.json（搜索索引）+ related.json（跨模块相关条目索引）。
// 输出格式与消费端约定完全一致：
//   search.json 条目：{ m, id, t, n, x, nEn, xEn }（t = "search.t.<type>"；x/xEn 为多字段空格拼接的摘要）
//   related.json：{ <id>: [ { m, n, nEn }, ... ] }（同一 id 可跨模块，按模块顺序入桶）
// 字段→摘要的组合规则逐模块精确定义，重建结果与既有 committed 文件逐字节一致（用 git diff 验证）。
// 用法：node s/build-econ-index.mjs
import fs from "node:fs";
import path from "node:path";

const D = "public/econ-data/data";
const read = (f) => JSON.parse(fs.readFileSync(path.join(D, f), "utf8"));

// 名称字段取 zh/en 两列
const F = (zh, en) => (it, l) => (l === "zh" ? it[zh] : it[en]);
const NAME = {
  term: F("term", "termEn"),
  title: F("title", "titleEn"),
  name: F("name", "nameEn"),
  topic: F("topic", "topicEn"),
  question: F("question", "questionEn"),
  q: F("q", "qEn"),
  myth: F("myth", "mythEn"),
};
// glossary 名称带缩写：中文全角括号、英文半角带空格
const glossaryName = (it, l) =>
  l === "zh"
    ? it.abbr
      ? `${it.term}（${it.abbr}）`
      : it.term
    : it.abbr
      ? `${it.termEn} (${it.abbr})`
      : it.termEn;

// parts：{f/fe 字符串字段} | {a/ae 字符串数组} | {o + ko/vo/ke/ve 对象数组}
const P = {
  s: (f, fe) => ({ f, fe }),
  arr: (a, ae) => ({ a, ae }),
  obj: (o, ko, vo, ke, ve) => ({ o, ko, vo, ke, ve }),
};

const MODULES = [
  {
    file: "concepts",
    m: "m-concepts",
    t: "concept",
    name: NAME.term,
    parts: [
      P.s("oneLiner", "oneLinerEn"),
      P.s("category", "categoryEn"),
      P.arr("tags", "tagsEn"),
      P.s("detail", "detailEn"),
      P.s("example", "exampleEn"),
    ],
  },
  {
    file: "glossary",
    m: "m-glossary",
    t: "term",
    name: glossaryName,
    parts: [
      P.s("plain", "plainEn"),
      P.s("category", "categoryEn"),
      P.s("def", "defEn"),
    ],
  },
  {
    file: "macro",
    m: "m-macro",
    t: "topic",
    name: NAME.title,
    parts: [
      P.s("lead", "leadEn"),
      P.s("category", "categoryEn"),
      P.obj("points", "k", "v", "kEn", "vEn"),
    ],
  },
  {
    file: "micro",
    m: "m-micro",
    t: "topic",
    name: NAME.title,
    parts: [
      P.s("lead", "leadEn"),
      P.s("category", "categoryEn"),
      P.obj("points", "k", "v", "kEn", "vEn"),
    ],
  },
  {
    file: "money",
    m: "m-money",
    t: "topic",
    name: NAME.title,
    parts: [
      P.s("lead", "leadEn"),
      P.s("category", "categoryEn"),
      P.obj("points", "k", "v", "kEn", "vEn"),
    ],
  },
  {
    file: "thinkers",
    m: "m-thinkers",
    t: "thinker",
    name: NAME.name,
    parts: [
      P.s("oneLiner", "oneLinerEn"),
      P.s("school", "schoolEn"),
      P.s("country", "countryEn"),
      P.s("life", "lifeEn"),
      P.s("bio", "bioEn"),
      P.obj("ideas", "k", "v", "kEn", "vEn"),
    ],
  },
  {
    file: "schools",
    m: "m-schools",
    t: "school",
    name: NAME.name,
    parts: [
      P.s("core", "coreEn"),
      P.s("span", "spanEn"),
      P.arr("founders", "foundersEn"),
      P.arr("keyIdeas", "keyIdeasEn"),
      P.arr("strengths", "strengthsEn"),
      P.arr("criticisms", "criticismsEn"),
    ],
  },
  {
    file: "events",
    m: "m-events",
    t: "event",
    name: NAME.title,
    parts: [
      P.s("yearLabel", "yearLabelEn"),
      P.s("place", "placeEn"),
      P.s("what", "whatEn"),
      P.s("why", "whyEn"),
      P.s("impact", "impactEn"),
    ],
  },
  {
    file: "behavioral",
    m: "m-behavioral",
    t: "behavior",
    name: NAME.name,
    parts: [
      P.s("oneLiner", "oneLinerEn"),
      P.s("category", "categoryEn"),
      P.s("detail", "detailEn"),
      P.s("experiment", "experimentEn"),
      P.s("everyday", "everydayEn"),
    ],
  },
  {
    file: "gametheory",
    m: "m-game",
    t: "game",
    name: NAME.name,
    parts: [
      P.s("oneLiner", "oneLinerEn"),
      P.s("category", "categoryEn"),
      P.s("detail", "detailEn"),
      P.s("example", "exampleEn"),
    ],
  },
  {
    file: "trade",
    m: "m-trade",
    t: "trade",
    name: NAME.topic,
    parts: [
      P.s("oneLiner", "oneLinerEn"),
      P.s("detail", "detailEn"),
      P.s("example", "exampleEn"),
      P.obj("views", "k", "v", "kEn", "vEn"),
    ],
  },
  {
    file: "everyday",
    m: "m-everyday",
    t: "everyday",
    name: NAME.question,
    parts: [P.s("econ", "econEn"), P.s("detail", "detailEn")],
  },
  {
    file: "charts",
    m: "m-charts",
    t: "chart",
    name: NAME.title,
    parts: [P.s("unit", "unitEn"), P.s("note", "noteEn")],
  },
  {
    file: "myths",
    m: "m-myths",
    t: "myth",
    name: NAME.myth,
    parts: [P.s("truth", "truthEn"), P.s("why", "whyEn")],
  },
  {
    file: "quiz",
    m: "m-quiz",
    t: "topic",
    name: NAME.q,
    parts: [P.s("category", "categoryEn"), P.s("explain", "explainEn")],
  },
  {
    file: "compare",
    m: "m-compare",
    t: "compare",
    name: NAME.question,
    parts: [
      P.s("takeaway", "takeawayEn"),
      P.obj("cases", "who", "how", "whoEn", "howEn"),
    ],
  },
];

function tokens(item, parts, lang) {
  const out = [];
  for (const p of parts) {
    if (p.f) {
      const v = item[lang === "zh" ? p.f : p.fe];
      if (v) out.push(v);
    } else if (p.a) {
      for (const s of item[lang === "zh" ? p.a : p.ae] ?? [])
        if (s) out.push(s);
    } else if (p.o) {
      for (const o of item[p.o] ?? []) {
        const k = o[lang === "zh" ? p.ko : p.ke];
        const v = o[lang === "zh" ? p.vo : p.ve];
        if (k) out.push(k);
        if (v) out.push(v);
      }
    }
  }
  return out;
}

const search = [];
const related = {};
for (const mod of MODULES) {
  const items = read(mod.file + ".json");
  for (const it of items) {
    const n = mod.name(it, "zh") ?? "";
    const nEn = mod.name(it, "en") ?? "";
    search.push({
      m: mod.m,
      id: it.id,
      t: "search.t." + mod.t,
      n,
      x: tokens(it, mod.parts, "zh").join(" "),
      nEn,
      xEn: tokens(it, mod.parts, "en").join(" "),
    });
    (related[it.id] ??= []).push({ m: mod.m, n, nEn });
  }
}

fs.writeFileSync(path.join(D, "search.json"), JSON.stringify(search) + "\n");
fs.writeFileSync(
  path.join(D, "related.json"),
  JSON.stringify(related, null, 2) + "\n",
);
console.log(
  `econ index: ${search.length} search / ${Object.keys(related).length} related`,
);
