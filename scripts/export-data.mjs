// 轻量学科（physics / chem）数据导出器：把 src/subjects/<x>/data.ts 里的 TS 常量
// 转成与 FULL 学科同一契约的机器可读 JSON，落到 public/<x>-data/data/。
//
//   · LStr {zh,en}      → 主字段（zh）+ `字段En` 副本（en），与 earth/life/thought 一致
//   · LStr[]（如 tags） → 并行数组 tags / tagsEn
//   · 每个模块一个文件（模块 key 即文件名），另有 overview.json 与 sources.json
//
// 用法：node scripts/export-data.mjs [physics chem]
//   追加 --check 只报告与已提交文件不一致的学科（CI 防漂移），不写盘。
// 说明：data.ts 是这两个学科的唯一事实来源，本脚本只是它的投影；改动 data.ts 后需重跑。
import { build } from "esbuild";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { ser } from "./jsonStyle.mjs";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const VERSION = "0.1.0";
const SOURCES = {
  physics: { file: "src/subjects/physics/data.ts", name: "physicsData" },
  chem: { file: "src/subjects/chem/data.ts", name: "chemData" },
};

const argv = process.argv.slice(2);
const check = argv.includes("--check");
const picked = argv.filter((a) => !a.startsWith("--"));
const subjects = picked.length ? picked : Object.keys(SOURCES);

const isObj = (v) => v && typeof v === "object";
const isPlain = (v) => isObj(v) && !Array.isArray(v);
/** LStr 判定：只由 zh / en 字符串构成的扁平对象（最多两键）。 */
const isLStr = (v) =>
  isPlain(v) &&
  Object.keys(v).length <= 2 &&
  Object.values(v).every((x) => typeof x === "string") &&
  ("zh" in v || "en" in v);

/** 把 value 按契约写进 host[key]：LStr 拆双字段，LStr[] 拆并行数组，其余递归。 */
function emit(value, key, host) {
  if (value === undefined || value === null) return;
  if (isLStr(value)) {
    const { zh, en } = value;
    if (typeof zh === "string") host[key] = zh;
    // en 与 zh 相同视为未翻译：省略 `*En`，让渲染层与抓取方都回退中文，避免伪英文。
    if (typeof en === "string" && en !== zh) host[key + "En"] = en;
    return;
  }
  if (Array.isArray(value)) {
    if (value.length && value.every(isLStr)) {
      host[key] = value.map((v) => v.zh ?? v.en);
      const en = value.map((v) => v.en ?? v.zh);
      if (en.some((x, i) => x !== host[key][i])) host[key + "En"] = en;
      return;
    }
    host[key] = value.map((v) => {
      if (!isObj(v)) return v;
      if (isLStr(v)) return v.zh ?? v.en;
      return convert(v, {});
    });
    return;
  }
  if (isPlain(value)) {
    host[key] = convert(value, {});
    return;
  }
  host[key] = value;
}

function convert(obj, out) {
  for (const [k, v] of Object.entries(obj)) emit(v, k, out);
  return out;
}

/** data.ts → 可 import 的 ESM（esbuild 剥离类型，产物在 node_modules/.cache 下，不进版本库）。 */
async function loadData(key) {
  const spec = SOURCES[key];
  const tmpDir = path.join(REPO, "node_modules", ".cache", "wanwu-export");
  fs.mkdirSync(tmpDir, { recursive: true });
  const tmp = path.join(tmpDir, `${key}-data.mjs`);
  await build({
    entryPoints: [path.join(REPO, spec.file)],
    outfile: tmp,
    bundle: false,
    format: "esm",
    platform: "node",
    target: "node20",
  });
  const mod = await import(pathToFileURL(tmp).href);
  const data = mod[spec.name];
  if (!data) throw new Error(`${spec.file} 未导出 ${spec.name}`);
  return data;
}

// 与 fmt-json 同一排版器：导出产物本身就是仓库风格，重排不会造成反向漂移。
const text = (value) => ser(value) + "\n";

for (const key of subjects) {
  const data = await loadData(key);
  const dir = path.join(REPO, "public", `${key}-data`, "data");
  const files = new Map(); // 文件名 -> 期望文本

  const modules = [];
  const counts = {};
  for (const m of data.modules ?? []) {
    const items = (m.items ?? []).map((it) => convert(it, {}));
    counts[m.key] = items.length;
    modules.push({
      key: m.key,
      icon: m.icon ?? "",
      title: m.title?.zh ?? m.key,
      titleEn: m.title?.en ?? "",
      kind: m.kind ?? "cards",
      count: items.length,
    });
    files.set(`${m.key}.json`, text(items));
  }

  const overview = {
    version: VERSION,
    generatedFrom: SOURCES[key].file,
    heroTitle: data.heroTitle?.zh ?? "",
    heroTitleEn: data.heroTitle?.en ?? "",
    intro: data.intro?.zh ?? "",
    introEn: data.intro?.en ?? "",
    total: Object.values(counts).reduce((n, v) => n + v, 0),
    counts,
    modules,
    kpis: modules.map((m) => ({ key: m.key, icon: m.icon, value: m.count })),
  };
  files.set("overview.json", text(overview));

  const sources = (data.refs ?? []).map((r) =>
    convert({ label: r.label, type: r.type, url: r.url }, {}),
  );
  files.set("sources.json", text(sources));

  if (check) {
    let drift = 0;
    for (const [name, want] of files) {
      const file = path.join(dir, name);
      if (!fs.existsSync(file) || fs.readFileSync(file, "utf8") !== want) {
        console.error(
          `[${key}] ${name} 与 data.ts 不一致（需重跑 npm run data:export）`,
        );
        drift++;
      }
    }
    const extra = fs.existsSync(dir)
      ? fs.readdirSync(dir).filter((f) => f.endsWith(".json") && !files.has(f))
      : [];
    for (const f of extra) {
      console.error(`[${key}] ${f} 不是 data.ts 的产物（多余文件）`);
      drift++;
    }
    if (drift) process.exitCode = 1;
    else
      console.log(
        `[${key}] 导出一致：${files.size} 个文件 / ${overview.total} 条`,
      );
    continue;
  }

  fs.mkdirSync(dir, { recursive: true });
  for (const [name, want] of files)
    fs.writeFileSync(path.join(dir, name), want);
  // 清掉模块被删除后留下的孤儿文件，保证目录与 data.ts 一一对应。
  for (const f of fs.readdirSync(dir)) {
    if (f.endsWith(".json") && !files.has(f)) {
      fs.rmSync(path.join(dir, f));
      console.log(`[${key}] 移除过期文件 ${f}`);
    }
  }
  console.log(
    `[${key}] 导出 ${files.size} 个文件 / ${overview.total} 条 / ${modules.length} 个模块`,
  );
}

if (check) {
  if (!process.exitCode) console.log("导出一致性检查通过。");
} else {
  console.log(
    "下一步：npm run gen:geo && npm run gen:sitemap（更新 llms 与站点地图）。",
  );
}
