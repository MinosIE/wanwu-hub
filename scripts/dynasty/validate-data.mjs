// 校验各朝代帝王在位年份是否按时序排列（并立政权按组内时序校验）
// 用法：node scripts/dynasty/validate-data.mjs
import fs from "node:fs";
import path from "node:path";
import { DATA } from "./paths.mjs";

function toNum(tok) {
  tok = tok.replace(/^约/, "").trim();
  if (tok.startsWith("公元")) return +tok.slice(2);
  if (tok.startsWith("前")) return -+tok.slice(1);
  return +tok;
}
function startYear(rg) {
  const parts = rg.replace(/^约/, "").split(/[–\-~→]/);
  return toNum(parts[0]);
}

// 三国、南北朝是两个并立多政权朝代：页面按魏/蜀/吴、南朝/北朝分组呈现，
// 组内即位年必须递增，组间切换则重置基线（组间不排序是有意为之）。
// 其余朝代的 t 是「开国 / 贞观 / 末代」这类时段标签（清 11 帝全部不同），
// 不能当分组键用，否则校验会形同虚设，因此仍按全局递增校验。
const PARALLEL = new Set(["三国", "南北朝"]);

const dir = path.join(DATA, "dynasties");
const files = fs.readdirSync(dir);
let issues = 0;
for (const f of files) {
  const d = JSON.parse(fs.readFileSync(path.join(dir, f), "utf8"));
  const parallel = PARALLEL.has(d.name);
  let prev = -Infinity,
    prevName = "",
    prevGroup = null;
  const closedGroups = new Set();
  for (const e of d.emperors) {
    const y = startYear(e.rg);
    if (isNaN(y)) {
      console.log(`[无法解析] ${d.name} ${e.n} rg=${e.rg}`);
      continue;
    }
    if (parallel) {
      const g = String(e.t ?? "").replace(/末$/, "");
      if (g !== prevGroup) {
        if (closedGroups.has(g)) {
          console.log(
            `[分组打断] ${d.name}: 「${g}」组在 ${prevName} 之后又重新出现`,
          );
          issues++;
        }
        if (prevGroup) closedGroups.add(prevGroup);
        prevGroup = g;
        prev = -Infinity;
      }
    }
    if (y < prev) {
      console.log(
        `[乱序] ${d.name}${parallel ? `（${prevGroup}组内）` : ""}: ${prevName}(${prev}) -> ${e.n}(${y})`,
      );
      issues++;
    }
    prev = y;
    prevName = e.n;
  }
}
console.log(`\n共发现 ${issues} 处乱序`);
