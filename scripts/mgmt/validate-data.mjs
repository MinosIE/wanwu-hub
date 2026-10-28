// mgmt 内容门禁（八十批引入，接入 verify）
// mgmt 是最后一个补专属门禁的 integrated 学科。三道账口径参照 chem（深度账未收完，
// 故长度先 warn 后 hard）与 physics（引用纪律直接硬门禁）：
//   1) 硬·引用纪律：detail / oneLiner 的 zh 里不得出现「」——mgmt 详情抽屉不渲染
//      term 链接，直角引号在此零收益，修辞一律用全角双引号 “”。
//   2) 硬·英文成文：凡带 detail 的条目 detailEn ≥ 240（现状最短 270，留余量防滑退）。
//   3) 软·深度账：detail zh < 120 记 warn（与 chem:validate 同口径；深度批收完后
//      升为硬门禁并抬到 260，见 BACKLOG 八十批续批候选）。
// 无 detail 字段的 sources（文献清单）属设计性短，按「仅有 detail 才检」自动豁免。
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const DATA_DIR = join("public", "mgmt-data", "data");
const EN_FLOOR = 240;
const ZH_WARN = 120;

let pass = 0;
let fail = 0;
let warn = 0;
const bad = (msg) => {
  fail += 1;
  console.error("FAIL " + msg);
};
const note = (msg) => {
  warn += 1;
  console.warn("WARN " + msg);
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
    // 3) 深度 warn：detail zh < ZH_WARN
    if (it.detail.length < ZH_WARN) {
      note(`${where} 的 detail 仅 ${it.detail.length} < ${ZH_WARN}`);
    }
    pass += 1;
  }
}

console.log(
  `[mgmt] 文件 ${files.length} · 条目 ${items} · 带 detail ${detailBearing} · ` +
    `pass=${pass} fail=${fail} warn=${warn}`,
);
process.exit(fail > 0 ? 1 : 0);
