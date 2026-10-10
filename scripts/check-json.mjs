// 校验 public/<subject>-data/data/**/*.json 全部为合法 JSON（可解析）。
// 数据与代码分离后，任一 JSON 手改出错都会让学科白屏——此脚本作 CI 门禁兜底。
// 用法：node scripts/check-json.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC = path.join(ROOT, "public");

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (name.endsWith(".json")) out.push(p);
  }
  return out;
}

const files = walk(PUBLIC);
let bad = 0;
for (const f of files) {
  try {
    JSON.parse(fs.readFileSync(f, "utf8"));
  } catch (e) {
    bad++;
    console.error(`[JSON 解析失败] ${path.relative(ROOT, f)}\n  ${e.message}`);
  }
}

console.log(`检查 ${files.length} 个 JSON 文件，失败 ${bad} 个。`);
process.exit(bad ? 1 : 0);
