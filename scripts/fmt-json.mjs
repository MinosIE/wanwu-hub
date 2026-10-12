// 学科数据 JSON 排版器：把 public/*-data/data/*.json 统一为仓库既有风格
//   （排版规则见 scripts/jsonStyle.mjs，与 export-data.mjs 共用）
// 用法：node scripts/fmt-json.mjs [thought earth life ...]（不带参数=全部 *-data/data）
//   只重排内容数据文件：派生文件 search.json / related.json 由构建脚本 owns，
//   overview.json / sources.json 保持现状（避免无意义的排版抹擦）。
//   追加 --check 只报告需要重排的文件（CI 用），不写盘。
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { ser } from "./jsonStyle.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
/** 不参与重排：派生索引与元数据文件。 */
const SKIP = new Set([
  "search.json",
  "related.json",
  "overview.json",
  "sources.json",
  "compare-cache.json",
]);
const argv = process.argv.slice(2);
const check = argv.includes("--check");
const picked = argv.filter((a) => !a.startsWith("--"));

function targets() {
  // 直接给定文件路径（含 /）时只处理这些文件，避免无意的全量重排。
  const direct = picked.filter((a) => a.includes("/"));
  if (direct.length) return direct.map((a) => path.join(ROOT, a));
  const names = picked.filter((a) => !a.includes("/"));
  const dirs = fs
    .readdirSync(path.join(ROOT, "public"))
    .filter((d) => d.endsWith("-data"))
    .filter((d) => !names.length || names.includes(d.replace(/-data$/, "")))
    .map((d) => path.join(ROOT, "public", d, "data"))
    .filter((d) => fs.existsSync(d));
  return dirs.flatMap((d) =>
    fs
      .readdirSync(d)
      .filter((f) => f.endsWith(".json") && !SKIP.has(f))
      .map((f) => path.join(d, f)),
  );
}

let changed = 0;
for (const file of targets()) {
  const original = fs.readFileSync(file, "utf8");
  let data;
  try {
    data = JSON.parse(original);
  } catch {
    continue; // 交由 check-json.mjs 报错
  }
  const out = ser(data) + "\n";
  if (out === original) continue;
  changed++;
  const rel = path.relative(ROOT, file);
  if (check) console.log(`需重排：${rel}`);
  else fs.writeFileSync(file, out);
}
console.log(
  check
    ? `排版检查：${changed} 个文件需要重排。`
    : `排版完成：重排 ${changed} 个文件。`,
);
process.exit(check && changed ? 1 : 0);
