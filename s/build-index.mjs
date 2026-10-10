// 参数化索引构建器：由某一学科的 schools/questions/classics/thinkers 生成 search.json + related.json。
// earth / life / thought 三学科数据 schema 相同，故共用本脚本（原 build-{earth,life,thought}-index.mjs 逐字节相同）。
// 用法：node s/build-index.mjs <earth|life|thought>
import fs from "node:fs";
import path from "node:path";

const subject = process.argv[2];
if (!subject) {
  console.error("用法: node s/build-index.mjs <earth|life|thought>");
  process.exit(1);
}
const D = `public/${subject}-data/data`;
const read = (f) => JSON.parse(fs.readFileSync(path.join(D, f), "utf8"));
const schools = read("schools.json");
const questions = read("questions.json");
const classics = read("classics.json");
const thinkers = read("thinkers.json");
// principles 为 earth 试点新增分类视图；life/thought 无此文件时自动跳过，互不影响。
const principles = fs.existsSync(path.join(D, "principles.json"))
  ? read("principles.json")
  : [];
// branches 为 thought 新增分类视图（机制/分支卡同构）。
const branches = fs.existsSync(path.join(D, "branches.json"))
  ? read("branches.json")
  : [];
// human-geo 为 earth 新增人文地理视图（机制卡同构）。
const humanGeo = fs.existsSync(path.join(D, "human-geo.json"))
  ? read("human-geo.json")
  : [];
const search = [];
for (const s of schools)
  search.push({
    m: "m-schools",
    id: s.id,
    t: "search.t.school",
    n: s.name,
    x: s.core,
    nEn: s.nameEn,
    xEn: s.coreEn,
  });
for (const q of questions)
  search.push({
    m: "m-questions",
    id: q.id,
    t: "search.t.question",
    n: q.name,
    x: q.oneLiner,
    nEn: q.nameEn,
    xEn: q.oneLinerEn,
  });
for (const c of classics)
  search.push({
    m: "m-classics",
    id: c.id,
    t: "search.t.classic",
    n: c.name,
    x: c.core,
    nEn: c.nameEn,
    xEn: c.coreEn,
  });
for (const t of thinkers)
  search.push({
    m: "m-thinkers",
    id: t.id,
    t: "search.t.thinker",
    n: t.name,
    x: t.oneLiner,
    nEn: t.nameEn,
    xEn: t.oneLinerEn,
  });
for (const p of principles)
  search.push({
    m: "m-principles",
    id: p.id,
    t: "search.t.principle",
    n: p.title,
    x: p.lead,
    nEn: p.titleEn,
    xEn: p.leadEn,
  });
for (const b of branches)
  search.push({
    m: "m-branches",
    id: b.id,
    t: "search.t.branch",
    n: b.title,
    x: b.lead,
    nEn: b.titleEn,
    xEn: b.leadEn,
  });
for (const h of humanGeo)
  search.push({
    m: "m-human-geo",
    id: h.id,
    t: "search.t.humanGeo",
    n: h.title,
    x: h.lead,
    nEn: h.titleEn,
    xEn: h.leadEn,
  });
const related = {};
const add = (id, m, n, nEn) => {
  (related[id] ??= []).push({ m, n, nEn });
};
for (const s of schools) add(s.id, "m-schools", s.name, s.nameEn);
for (const q of questions) add(q.id, "m-questions", q.name, q.nameEn);
for (const c of classics) add(c.id, "m-classics", c.name, c.nameEn);
for (const t of thinkers) add(t.id, "m-thinkers", t.name, t.nameEn);
for (const p of principles) add(p.id, "m-principles", p.title, p.titleEn);
for (const b of branches) add(b.id, "m-branches", b.title, b.titleEn);
for (const h of humanGeo) add(h.id, "m-human-geo", h.title, h.titleEn);
fs.writeFileSync(path.join(D, "search.json"), JSON.stringify(search) + "\n");
fs.writeFileSync(
  path.join(D, "related.json"),
  JSON.stringify(related, null, 2) + "\n",
);
console.log(
  `${subject} index:`,
  search.length,
  "search /",
  Object.keys(related).length,
  "related",
);
