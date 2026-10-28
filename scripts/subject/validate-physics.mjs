// physics 内容门禁（七十四批引入，接入 verify）
// 两道硬门禁，锁死"三本账"里的深度账与引用纪律，防止跨批回潮：
//   1) detail 长度：凡带 detail 的条目，中文 detail ≥ 260、英文 detailEn ≥ 700
//      （无 detail 字段的 constants/glossary/sources 属设计性短，自动豁免）
//   2) 引用可解析：zh detail / oneLiner 里的每个「X」都必须在可解析 term 集合内
//      （修辞性引用应写全角双引号，不得用直角引号伪装成链接）
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = "public";
const DATA_DIR = join(ROOT, "physics-data", "data");
const FLOOR_ZH = 260;
const FLOOR_EN = 700;

// —— 构建可解析 term 集合（全库 name-ish + physics 模块标题 + 学科名）——
const NAME_KEYS = [
  "term",
  "termEn",
  "name",
  "nameEn",
  "n",
  "nEn",
  "title",
  "titleEn",
  "label",
  "labelEn",
  "cn",
  "cnEn",
  "dyn",
  "dynasty",
];
const set = new Set();
for (const d of readdirSync(ROOT).filter(
  (x) => x.endsWith("-data") && existsSync(join(ROOT, x, "data")),
)) {
  for (const f of readdirSync(join(ROOT, d, "data")).filter((x) =>
    x.endsWith(".json"),
  )) {
    const j = JSON.parse(readFileSync(join(ROOT, d, "data", f), "utf8"));
    const arr = Array.isArray(j)
      ? j
      : j.items || j.data || j.entries || j.nodes || j.things || [];
    if (!Array.isArray(arr)) continue;
    for (const it of arr) {
      for (const k of NAME_KEYS)
        if (typeof it[k] === "string") set.add(it[k].trim());
      for (const t of it.tags || []) if (t && t.zh) set.add(t.zh);
    }
  }
}
const ts = readFileSync("src/subjects/physics/data.ts", "utf8");
for (const m of ts.matchAll(/title: \{ zh: "([^"]+)"/g)) set.add(m[1]);
for (const s of JSON.parse(readFileSync("src/core/subjects.json", "utf8"))) {
  set.add(s.zh);
  if (s.nameZh) set.add(s.nameZh);
}

let pass = 0;
const fails = [];
const ok = (cond, msg) => {
  if (cond) pass++;
  else fails.push(msg);
};

let checked = 0,
  langBearing = 0;
for (const f of readdirSync(DATA_DIR).filter((x) => x.endsWith(".json"))) {
  if (f === "overview.json" || f === "search.json") continue;
  const mod = f.replace(".json", "");
  const arr = JSON.parse(readFileSync(join(DATA_DIR, f), "utf8"));
  if (!Array.isArray(arr)) continue;
  for (const it of arr) {
    const tag = `physics/${mod}.${it.id ?? "?"}`;
    // 门禁 1：detail 长度
    if (typeof it.detail === "string") {
      langBearing++;
      ok(
        it.detail.length >= FLOOR_ZH,
        `${tag} 中文 detail 过短 ${it.detail.length} < ${FLOOR_ZH}`,
      );
      ok(
        typeof it.detailEn === "string" && it.detailEn.length >= FLOOR_EN,
        `${tag} 英文 detailEn 过短 ${it.detailEn?.length ?? 0} < ${FLOOR_EN}`,
      );
    }
    // 门禁 2：引用可解析（zh detail / oneLiner）
    for (const fld of ["detail", "oneLiner"]) {
      const txt = it[fld];
      if (typeof txt !== "string") continue;
      for (const mm of txt.matchAll(/「([^」]+)」/g)) {
        checked++;
        ok(
          set.has(mm[1]),
          `${tag}[${fld}] 「${mm[1]}」非可解析 term（应改全角双引号或指向真实条目）`,
        );
      }
    }
  }
}

console.log(
  `physics 门禁 | 集合 ${set.size} | detail-bearing ${langBearing} | 「」引用 ${checked}`,
);
console.log(`pass=${pass} fail=${fails.length}`);
if (fails.length) {
  console.log(fails.join("\n"));
  process.exit(1);
}
