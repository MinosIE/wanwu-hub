// 派生链接与双语完整性校验：为 earth / life / thought / physics / chem 检查
//   1) 每条 related 指向的 id 是否真实存在（跨模块，含同文件自指）
//   2) 双语是否成对：含中文的主字段有无对应 `*En` 副本（缺失会回退中文，视为告警；
//      纯符号 / 数值字段如 "pH"、相对原子质量无需翻译，不告警）
//   3) 英文字段里是否混入未转写的中文字符（常见于编辑时的半途停用）
//   4) 派生索引 search.json / related.json 是否覆盖了每个数据 id
//   5) overview.json 的 counts / kpis 是否与实际条目数一致（kebab / camel 同义看待）
//   另：同一学科内 id 是否唯一（physics / chem 以模块为命名空间，豁免）
// 用法：node scripts/check-links.mjs [earth life thought physics chem ...]
// physics / chem 的数据由 scripts/export-data.mjs 从 data.ts 导出，各模块 id 自成命名空间，
// 因此只对 scaffold 三科严格要求 id 唯一。
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);

/** 需要 `*En` 副本的中文主字段（各文件字段名并集，缺失即告警）。 */
const PAIRED_KEYS = [
  "name",
  "title",
  "term",
  "lead",
  "def",
  "plain",
  "oneLiner",
  "detail",
  "example",
  "core",
  "why",
  "myth",
  "truth",
  "west",
  "east",
  "bridge",
  "era",
  "category",
  "subtitle",
];

const DUP_EXEMPT = new Set(["physics", "chem"]);
const subjects = args.length
  ? args
  : ["earth", "life", "thought", "physics", "chem"];
let errors = 0;
let warnings = 0;

for (const subject of subjects) {
  const dir = path.join(ROOT, "public", `${subject}-data`, "data");
  if (!fs.existsSync(dir)) {
    console.error(`[${subject}] 数据目录不存在：${path.relative(ROOT, dir)}`);
    errors++;
    continue;
  }
  const files = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .filter(
      (f) =>
        ![
          "overview.json",
          "search.json",
          "related.json",
          "sources.json",
        ].includes(f),
    );

  /** id -> 出处文件 */
  const ids = new Map();
  /** 文件 -> 条目数组 */
  const parsed = new Map();
  for (const f of files) {
    let data;
    try {
      data = JSON.parse(fs.readFileSync(path.join(dir, f), "utf8"));
    } catch (e) {
      console.error(`[${subject}] ${f} 解析失败：${e.message}`);
      errors++;
      continue;
    }
    if (!Array.isArray(data)) continue;
    parsed.set(f, data);
    for (const it of data) {
      if (it && typeof it.id === "string") {
        if (ids.has(it.id) && !DUP_EXEMPT.has(subject)) {
          console.error(
            `[${subject}] id 重复：${it.id}（${ids.get(it.id)} 与 ${f}）`,
          );
          errors++;
        }
        ids.set(it.id, f);
      }
    }
  }

  // 1) 死链
  for (const [f, data] of parsed) {
    for (const it of data) {
      if (!Array.isArray(it?.related)) continue;
      for (const r of it.related) {
        if (typeof r !== "string") continue;
        if (!ids.has(r)) {
          console.error(
            `[${subject}] 死链：${f} → ${it.id} 的 related 指向不存在的 id「${r}」`,
          );
          errors++;
        }
      }
    }
  }

  // 2/3) 双语成对 + 英文字段混中文
  const cjk = /[\u3400-\u9fff\uf900-\ufaff]/;
  for (const [f, data] of parsed) {
    for (const it of data) {
      if (!it || typeof it !== "object") continue;
      for (const key of PAIRED_KEYS) {
        // 只有含中文的字段才需要英文副本（纯符号 / 数值无需翻译）。
        if (
          typeof it[key] === "string" &&
          it[key].trim() &&
          /[\u3400-\u9fff\uf900-\ufaff]/.test(it[key])
        ) {
          const enKey = `${key}En`;
          if (!(enKey in it)) {
            console.warn(
              `[${subject}] 缺双语副本：${f} → ${it.id} 无 ${enKey}`,
            );
            warnings++;
          } else if (!String(it[enKey] ?? "").trim()) {
            console.warn(
              `[${subject}] 英文副本为空：${f} → ${it.id} 的 ${enKey}`,
            );
            warnings++;
          }
        }
      }
      for (const [k, v] of Object.entries(it)) {
        if (k.endsWith("En") && typeof v === "string" && cjk.test(v)) {
          console.error(`[${subject}] 英文字段含中文：${f} → ${it.id} 的 ${k}`);
          errors++;
        }
        if (Array.isArray(v)) {
          v.forEach((row, i) => {
            if (!row || typeof row !== "object") return;
            for (const [rk, rv] of Object.entries(row)) {
              if (rk.endsWith("En") && typeof rv === "string" && cjk.test(rv)) {
                console.error(
                  `[${subject}] 英文字段含中文：${f} → ${it.id}[${i}] 的 ${rk}`,
                );
                errors++;
              }
            }
          });
        }
      }
    }
  }

  // 4) 派生索引覆盖：search.json / related.json 存在时，每个数据 id 都应被登记
  //    （漏登会导致该条目搜不到、related 按钮渲染为空）。
  for (const name of ["search.json", "related.json"]) {
    const file = path.join(dir, name);
    if (!fs.existsSync(file)) continue;
    const idx = JSON.parse(fs.readFileSync(file, "utf8"));
    const indexed = new Set(
      Array.isArray(idx)
        ? idx.map((e) => e?.id)
        : idx && typeof idx === "object"
          ? Object.keys(idx)
          : [],
    );
    for (const [f, data] of parsed)
      for (const it of data)
        if (typeof it?.id === "string" && !indexed.has(it.id)) {
          console.error(
            `[${subject}] ${f} → ${it.id} 未进入 ${name}（索引过期，需重跑 npm run index:build -- ${subject}）`,
          );
          errors++;
        }
  }

  // 5) overview 计数
  const ovPath = path.join(dir, "overview.json");
  if (fs.existsSync(ovPath)) {
    const ov = JSON.parse(fs.readFileSync(ovPath, "utf8"));
    const actual = {};
    for (const [f, data] of parsed)
      actual[f.replace(/\.json$/, "")] = data.length;
    // 数据文件用 kebab（human-geo.json），而 earth 等学科的 overview / i18n 键沿用
    // camel（humanGeo）：同义看待，避免因命名风格误报。
    const canon = (k) => k.replace(/-/g, "").toLowerCase();
    const countsByCanon = new Map(
      Object.keys(ov.counts ?? {}).map((k) => [canon(k), k]),
    );
    const actualByCanon = new Map(
      Object.keys(actual).map((k) => [canon(k), k]),
    );
    for (const [key, n] of Object.entries(actual)) {
      const ck = countsByCanon.get(canon(key));
      if (!ck) {
        console.warn(
          `[${subject}] overview.counts 缺少分类「${key}」（实际 ${n} 条）`,
        );
        warnings++;
      } else if (ov.counts[ck] !== n) {
        console.error(
          `[${subject}] overview.counts.${ck}=${ov.counts[ck]}，实际 ${n}`,
        );
        errors++;
      }
    }
    for (const key of Object.keys(ov.counts ?? {})) {
      if (!actualByCanon.has(canon(key))) {
        console.error(`[${subject}] overview.counts.${key} 无对应数据文件`);
        errors++;
      }
    }
    const kpiKeys = new Set((ov.kpis ?? []).map((k) => canon(k.key)));
    for (const key of Object.keys(actual)) {
      if (!kpiKeys.has(canon(key))) {
        console.warn(`[${subject}] overview.kpis 缺少「${key}」`);
        warnings++;
      }
    }
    for (const k of ov.kpis ?? []) {
      const fileKey = actualByCanon.get(canon(k.key));
      if (
        typeof k.value === "number" &&
        fileKey != null &&
        actual[fileKey] !== k.value
      ) {
        console.error(
          `[${subject}] overview.kpis.${k.key}=${k.value}，实际 ${actual[fileKey]}`,
        );
        errors++;
      }
    }
  }

  const total = [...parsed.values()].reduce((n, a) => n + a.length, 0);
  console.log(
    `[${subject}] ${files.length} 个数据文件 / ${total} 条 / ${ids.size} 个 id`,
  );
}

console.log(`\n链接与双语校验：错误 ${errors}，告警 ${warnings}。`);
process.exit(errors ? 1 : 0);
