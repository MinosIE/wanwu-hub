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
const related = {};
const add = (id, m, n, nEn) => {
  (related[id] ??= []).push({ m, n, nEn });
};
for (const s of schools) add(s.id, "m-schools", s.name, s.nameEn);
for (const q of questions) add(q.id, "m-questions", q.name, q.nameEn);
for (const c of classics) add(c.id, "m-classics", c.name, c.nameEn);
for (const t of thinkers) add(t.id, "m-thinkers", t.name, t.nameEn);
for (const p of principles) add(p.id, "m-principles", p.title, p.titleEn);
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
