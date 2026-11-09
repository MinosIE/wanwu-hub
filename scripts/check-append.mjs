// 数据 append-only 守卫（deletions = 0）：把「扩充数据时既有条目不得被删除或改动」这条
// 反复靠临时 .tmp-bXX 脚本手工断言的红线，固化成可复用、可入 CI 的检查。
//
// 背景：check-links / check-json / data:check 已覆盖内容型校验（死链、双语、英文混中文、
// 派生索引、overview 计数、id 唯一），唯独不覆盖「扩充是否动了既有条目」。扩充 91+ 批次时，
// 每次都要临时写脚本断言「前 N 条 JSON.stringify 逐条不变」——本脚本把它沉淀下来。
//
// 判定：以 git 基线（默认 HEAD）为参照，对工作区改动的「内容数据文件」逐条比对，
//   · 既有条目被删除 / 被改动  → 报错（deletions / modifications 必须为 0）
//   · 既有条目原样保留、仅新增  → 放行（append）
// 内容文件指 public/<x>-data/data/ 下的 .json；派生 / 汇总文件（overview / search / related /
// sources）允许随扩充重算，故排除。
//
// 比对策略：
//   · 数组且元素都有 id  → 按 id 深比对：基线每个 id 必须仍存在于新文件且内容不变；新增 id 放行。
//   · 数组但元素无 id（如 sources.json，已排除；兜底）→ 前缀比对：基线前 N 条须逐条等于新文件前 N 条。
//   · 对象（如 dynasty/dynasties/*.json、culture.json、records.json）→ 递归：基线每个 key 须仍
//     存在于新文件且内容不变；新增 key 放行。
//
// 用法：
//   node scripts/check-append.mjs            # 工作区 vs HEAD
//   node scripts/check-append.mjs main        # 工作区 vs 任意 git 基线
//   node scripts/check-append.mjs --only earth life   # 只看指定学科
//   node scripts/check-append.mjs HEAD --only dynasty  # 组合
// 退出码：有删除 / 改动即 1，否则 0；非 git 环境或无改动一律通过。
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const argv = process.argv.slice(2);

const only = new Set();
let base = "HEAD";
let i = 0;
while (i < argv.length) {
  const a = argv[i];
  if (a === "--only") {
    i++;
    while (i < argv.length && !argv[i].startsWith("--")) {
      only.add(argv[i]);
      i++;
    }
    continue;
  }
  if (a.startsWith("--")) {
    i++;
    continue;
  }
  base = a;
  i++;
}

/** 取 git 中某基线下的文件内容；文件在基线不存在则返回 null。 */
function gitShow(ref, relPath) {
  try {
    return execFileSync("git", ["show", `${ref}:${relPath}`], {
      cwd: ROOT,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    });
  } catch {
    return null;
  }
}

/** 工作区相对基线改动的、落在 public/<x>-data/data/ 下的内容 .json 文件。 */
function changedDataFiles() {
  let out;
  try {
    out = execFileSync(
      "git",
      ["diff", "--name-only", "--diff-filter=AMD", base, "--", "public"],
      { cwd: ROOT, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] },
    );
  } catch {
    return [];
  }
  return out
    .split("\n")
    .map((s) => s.trim())
    .filter((p) => p?.includes("-data/data/") && p.endsWith(".json"));
}

/** 派生 / 汇总文件：允许随扩充重算，不做 append-only 约束。 */
const DERIVED = new Set([
  "overview.json",
  "search.json",
  "related.json",
  "sources.json",
]);

/** 规范化深比较：对象按 key 排序，避免字段顺序抖动误报；数组按下标。 */
function norm(v) {
  if (Array.isArray(v)) return v.map(norm);
  if (v && typeof v === "object") {
    return Object.keys(v)
      .sort()
      .reduce((acc, k) => {
        acc[k] = norm(v[k]);
        return acc;
      }, {});
  }
  return v;
}
const eq = (a, b) => JSON.stringify(norm(a)) === JSON.stringify(norm(b));

/** 数组 append-only：基线每个 id 须仍在新数组且内容不变；无 id 时退化为前缀比对。 */
function checkArray(oldArr, newArr) {
  const res = { deleted: [], modified: [], added: 0 };
  const hasId = oldArr.every((x) => x && typeof x.id === "string");
  if (hasId) {
    const newById = new Map();
    for (const x of newArr)
      if (x && typeof x.id === "string") newById.set(x.id, x);
    const oldIds = new Set(oldArr.map((x) => x.id));
    for (const old of oldArr) {
      const cur = newById.get(old.id);
      if (cur === undefined) res.deleted.push(old.id);
      else if (!eq(old, cur)) res.modified.push(old.id);
    }
    res.added = newArr.filter(
      (x) => x && typeof x.id === "string" && !oldIds.has(x.id),
    ).length;
  } else {
    // 无 id：前缀比对，基线前 N 条须逐条等于新文件前 N 条。
    for (let i = 0; i < oldArr.length; i++) {
      if (!eq(oldArr[i], newArr[i])) {
        res.modified.push(`#${i}`);
        break;
      }
    }
    res.added = Math.max(0, newArr.length - oldArr.length);
  }
  return res;
}

/** 对象 append-only：基线每个 key 须仍在新对象且内容不变；新增 key 放行。 */
function checkObject(oldObj, newObj) {
  const res = { deleted: [], modified: [], added: 0 };
  for (const k of Object.keys(oldObj)) {
    if (!(k in newObj)) res.deleted.push(k);
    else if (!eq(oldObj[k], newObj[k])) res.modified.push(k);
  }
  res.added = Object.keys(newObj).filter((k) => !(k in oldObj)).length;
  return res;
}

const files = changedDataFiles().filter((p) => {
  const base2 = path.basename(p);
  if (DERIVED.has(base2)) return false;
  if (only.size === 0) return true;
  // 形如 public/earth-data/data/x.json → 学科名 earth
  const m = p.match(/public\/(.+?)-data\/data\//);
  return m ? only.has(m[1]) : true;
});

let errors = 0;
let checked = 0;

for (const rel of files) {
  const oldRaw = gitShow(base, rel);
  const newRaw = fs.existsSync(path.join(ROOT, rel))
    ? fs.readFileSync(path.join(ROOT, rel), "utf8")
    : null;
  if (oldRaw === null && newRaw === null) continue;

  let oldData, newData;
  try {
    oldData = oldRaw === null ? undefined : JSON.parse(oldRaw);
    newData = newRaw === null ? undefined : JSON.parse(newRaw);
  } catch (e) {
    console.error(`[${rel}] JSON 解析失败：${e.message}`);
    errors++;
    continue;
  }

  // 文件被整体删除：除非基线本就不存在，否则视为删除既有内容。
  if (newRaw === null) {
    console.error(`[${rel}] 文件被删除，但基线存在（${base}）——既有内容丢失`);
    errors++;
    continue;
  }
  if (oldRaw === null) {
    // 新增文件：无既有内容可保护，放行。
    console.log(`[${rel}] 新增文件，无既有内容可保护，放行`);
    checked++;
    continue;
  }

  const res = Array.isArray(oldData)
    ? checkArray(oldData, Array.isArray(newData) ? newData : [])
    : checkObject(
        oldData,
        newData && typeof newData === "object" ? newData : {},
      );

  checked++;
  if (res.deleted.length === 0 && res.modified.length === 0) {
    console.log(
      `[${rel}] append 通过：保留既有条目 ${res.added > 0 ? `，新增 ${res.added} 条` : ""}`,
    );
    continue;
  }
  if (res.deleted.length) {
    console.error(
      `[${rel}] 删除了 ${res.deleted.length} 个既有条目：${res.deleted.slice(0, 10).join(", ")}${res.deleted.length > 10 ? " …" : ""}`,
    );
    errors++;
  }
  if (res.modified.length) {
    console.error(
      `[${rel}] 改动了 ${res.modified.length} 个既有条目：${res.modified.slice(0, 10).join(", ")}${res.modified.length > 10 ? " …" : ""}`,
    );
    errors++;
  }
}

if (files.length === 0) {
  console.log("append-only 守卫：无内容数据文件改动，通过。");
  process.exit(0);
}
console.log(
  `\nappend-only 守卫：检查 ${checked} 个内容文件，失败 ${errors} 个。`,
);
process.exit(errors ? 1 : 0);
