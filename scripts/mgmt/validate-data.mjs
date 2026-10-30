// mgmt 内容门禁（八十批引入，接入 verify；九十批把长度软档升为硬档）
// mgmt 是最后一个补专属门禁的 integrated 学科。三道账口径参照 chem 与 physics：
//   1) 硬·引用纪律：detail / oneLiner 的 zh 里不得出现「」——mgmt 详情抽屉不渲染
//      term 链接，直角引号在此零收益，修辞一律用全角双引号 “”。
//   2) 硬·英文成文：凡带 detail 的条目 detailEn ≥ 240。
//   3) 硬·深度账（九十批起）：detail zh < 260 直接 fail——深度批队列（八十一〜九十批）
//      已把全部 detail-bearing 条目写厚到 zh ≥ 260，warn@120 软档随之升为 hard@260。
// 无 detail 字段的 sources（文献清单）属设计性短，按「仅有 detail 才检」自动豁免。
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const DATA_DIR = join("public", "mgmt-data", "data");
const EN_FLOOR = 240;
const ZH_FLOOR = 260;

let pass = 0;
let fail = 0;
const bad = (msg) => {
  fail += 1;
  console.error("FAIL " + msg);
};

const files = readdirSync(DATA_DIR).filter(
  (f) => f.endsWith(".json") && f !== "overview.json",
);
let items = 0;
let detailBearing = 0;
for (const f of files) {
  const arr = JSON.parse(readFileSync(join(DATA_DIR, f), "utf8"));
  if (!Array.isArray(arr)) continue;
  const mod = f.replace(/\.json$/, "");
  for (const it of arr) {
    items += 1;
    if (!it.detail) continue;
    detailBearing += 1;
    const where = `${mod}.${it.id ?? "?"}`;
    // 1) 引用纪律：zh 的 detail / oneLiner 禁「」
    for (const [field, text] of [
      ["detail", it.detail],
      ["oneLiner", it.oneLiner],
    ]) {
      if (typeof text === "string" && /[「」]/.test(text)) {
        bad(`${where} 的 ${field} 含直角引号「」（mgmt 修辞须用全角双引号）`);
      }
    }
    // 2) 英文成文：detailEn ≥ EN_FLOOR
    const en = typeof it.detailEn === "string" ? it.detailEn : "";
    if (en.length < EN_FLOOR) {
      bad(`${where} 的 detailEn 仅 ${en.length} < ${EN_FLOOR}`);
    }
    // 3) 深度硬门禁：detail zh < ZH_FLOOR
    if (it.detail.length < ZH_FLOOR) {
      bad(`${where} 的 detail 仅 ${it.detail.length} < ${ZH_FLOOR}`);
    }
    pass += 1;
  }
}

console.log(
  `[mgmt] 文件 ${files.length} · 条目 ${items} · 带 detail ${detailBearing} · ` +
    `pass=${pass} fail=${fail}`,
);
process.exit(fail > 0 ? 1 : 0);
