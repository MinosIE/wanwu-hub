// 统一站 GEO 生成器（路径式 URL，minosie 主机）：
//  1) 为 thought / earth / life / physics / chem 生成各自的 llms.txt / llms-en.txt / robots.txt / sitemap.xml
//     （dynasty 由 scripts/dynasty/build-geo.mjs 负责；econ / mind 为人工精修，仅做 URL 修正，不在本脚本覆盖）
//  2) 生成站点根 hub 的 llms.txt / llms-en.txt / robots.txt，索引全部学科。
// 用法：node scripts/gen-geo.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PUB = path.join(REPO, "public");
const SITE = "https://minosie.github.io/wanwu-hub/";

// 学科清单来自唯一数据源 src/core/subjects.json（与 projects.ts / gen-sitemap / prerender 共享）
const SUBJECTS = JSON.parse(
  fs.readFileSync(path.join(REPO, "src", "core", "subjects.json"), "utf8"),
);
const ALL = SUBJECTS.map((s) => ({ key: s.key, cn: s.zh, en: s.en }));
const DATA_BACKED = new Set(
  SUBJECTS.filter((s) =>
    fs.existsSync(path.join(PUB, `${s.key}-data`, "data")),
  ).map((s) => s.key),
);

// 由本脚本负责生成 llms 的学科：scaffold 三科 + 轻量两科（physics/chem 的数据由 export-data 导出）
// （dynasty 自有 build-geo；econ / mind 为人工精修）
const SCAFFOLD = ["thought", "earth", "life", "physics", "chem", "mgmt"];
// 标语直接复用 subjects.json 的 descZh/descEn，避免再维护一份文案
const TAG = Object.fromEntries(
  SCAFFOLD.map((key) => {
    const s = SUBJECTS.find((x) => x.key === key);
    return [key, { cn: s.descZh, en: s.descEn }];
  }),
);
const LABEL = {
  overview: { cn: "概览与计数", en: "Overview & counts" },
  schools: { cn: "学派", en: "Schools" },
  questions: { cn: "核心问题", en: "Core questions" },
  classics: { cn: "经典著作", en: "Classics" },
  thinkers: { cn: "思想家", en: "Thinkers" },
  branches: { cn: "分支 / 机制", en: "Branches & mechanisms" },
  principles: { cn: "原理", en: "Principles" },
  humanGeo: { cn: "人文地理", en: "Human geography" },
  glossary: { cn: "术语表", en: "Glossary" },
  timeline: { cn: "时间线", en: "Timeline" },
  experiments: { cn: "思想实验", en: "Thought experiments" },
  compare: { cn: "中西对照", en: "East-West comparisons" },
  myths: { cn: "常见误区", en: "Common misreadings" },
  sources: { cn: "参考资料", en: "References" },
  everyday: { cn: "生活应用", en: "Everyday applications" },
  quiz: { cn: "小测验", en: "Quiz" },
  search: { cn: "搜索索引", en: "Search index" },
  related: { cn: "相关条目索引", en: "Related index" },
  endemics: { cn: "特有物种", en: "Endemic species" },
};

/** 文件名（kebab）→ LABEL 键（camel）：human-geo.json → humanGeo。 */
const stemKey = (stem) => stem.replace(/-([a-z])/g, (_, c) => c.toUpperCase());

function dataFiles(key) {
  const dir = path.join(PUB, `${key}-data`, "data");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .sort();
}

/** 读取 overview.json（不存在或解析失败返回空对象）。 */
function overviewOf(key) {
  const file = path.join(PUB, `${key}-data`, "data", "overview.json");
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    return {};
  }
}

/**
 * 数据入口清单：标签优先取 overview.modules（physics/chem 由 data.ts 导出，带中英标题），
 * 其次 LABEL 表，最后用文件名本身。
 */
function dataEntries(key, ov) {
  const titles = new Map(
    (ov.modules ?? []).map((m) => [m.key, { cn: m.title, en: m.titleEn }]),
  );
  return dataFiles(key).map((f) => {
    const name = path.basename(f, ".json");
    const stem = stemKey(name);
    // overview.modules 用原始模块 key（kebab），LABEL 表用 camel 键，两边都试。
    const t = titles.get(name) ??
      titles.get(stem) ??
      LABEL[stem] ??
      LABEL[name] ?? {
        cn: stem,
        en: stem,
      };
    return { f, cn: t.cn || stem, en: t.en || stem };
  });
}

/** 规模行：overview.counts 存在时给出条目与分类数。 */
function scaleOf(ov, lang) {
  const counts = ov.counts ?? {};
  const keys = Object.keys(counts);
  if (!keys.length) return "";
  const total = keys.reduce((n, k) => n + (Number(counts[k]) || 0), 0);
  return lang === "cn"
    ? `共 ${total} 条 / ${keys.length} 类，全部为结构化 JSON。`
    : `${total} entries across ${keys.length} categories, all as structured JSON.`;
}

// ---------- 1) scaffold 学科：per-subject GEO ----------
for (const key of SCAFFOLD) {
  const meta = ALL.find((x) => x.key === key);
  const dir = path.join(PUB, `${key}-data`);
  const ov = overviewOf(key);
  const files = dataEntries(key, ov);
  const scale = scaleOf(ov, "cn");
  const scaleEn = scaleOf(ov, "en");
  const base = `${SITE}${key}-data/`;

  const zh = [
    `# ${meta.cn}`,
    "",
    `> ${TAG[key].cn}`,
    "",
    ...(scale ? [scale, ""] : []),
    "## 数据入口",
    ...files.map((e) => `- [${e.cn}](${base}data/${e.f})`),
    `- [页面](${SITE}subject/${key}/)`,
    "",
  ].join("\n");
  fs.writeFileSync(path.join(dir, "llms.txt"), zh);

  const en = [
    `# ${meta.en}`,
    "",
    `> ${TAG[key].en}`,
    "",
    ...(scaleEn ? [scaleEn, ""] : []),
    "## Data endpoints",
    ...files.map((e) => `- [${e.en}](${base}data/${e.f})`),
    `- [Page](${SITE}subject/${key}/)`,
    `- [Chinese index](${base}llms.txt)`,
    "",
  ].join("\n");
  fs.writeFileSync(path.join(dir, "llms-en.txt"), en);

  fs.writeFileSync(
    path.join(dir, "robots.txt"),
    `User-agent: *\nAllow: /\nSitemap: ${base}sitemap.xml\n`,
  );

  const urls = [
    `<url><loc>${SITE}subject/${key}/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>`,
    `<url><loc>${base}llms.txt</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>`,
    `<url><loc>${base}llms-en.txt</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>`,
    ...files.map(
      (e) =>
        `<url><loc>${base}data/${e.f}</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>`,
    ),
  ];
  fs.writeFileSync(
    path.join(dir, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  ${urls.join("\n  ")}\n</urlset>\n`,
  );
  console.log(`per-subject GEO ✓ ${key}（${files.length} 数据文件）`);
}

// ---------- 2) 根 hub：llms.txt / llms-en.txt / robots.txt ----------
const hubZh = [
  "# 万物通识系列 · Wanwu General Knowledge",
  "",
  "> 一组中英双语的通识科普静态站，覆盖历史、经济、心理、哲学、地理、生物、物理、化学。全部内容为结构化 JSON，可被 AI 引擎直接抓取引用。",
  "",
  "## 学科索引",
  ...ALL.map((s) => {
    const page = `${SITE}subject/${s.key}/`;
    if (!DATA_BACKED.has(s.key)) return `- [${s.cn}](${page})`;
    return `- [${s.cn}](${page})：[数据索引](${SITE}${s.key}-data/llms.txt)`;
  }),
  "",
  "## 站点资产",
  `- [站点地图](${SITE}sitemap.xml)`,
  "",
].join("\n");
fs.writeFileSync(path.join(PUB, "llms.txt"), hubZh);

const hubEn = [
  "# Wanwu General Knowledge Series",
  "",
  "> A set of bilingual (Chinese/English) general-knowledge static sites spanning history, economics, psychology, philosophy, geography, biology, physics and chemistry. All content is structured JSON, directly crawlable by search engines and LLMs.",
  "",
  "## Subject index",
  ...ALL.map((s) => {
    const page = `${SITE}subject/${s.key}/`;
    if (!DATA_BACKED.has(s.key)) return `- [${s.en}](${page})`;
    return `- [${s.en}](${page}): [data index](${SITE}${s.key}-data/llms-en.txt)`;
  }),
  "",
  `- [Site map](${SITE}sitemap.xml)`,
  "",
].join("\n");
fs.writeFileSync(path.join(PUB, "llms-en.txt"), hubEn);

fs.writeFileSync(
  path.join(PUB, "robots.txt"),
  `User-agent: *\nAllow: /\nSitemap: ${SITE}sitemap.xml\n`,
);
console.log("root hub GEO ✓ (llms.txt / llms-en.txt / robots.txt)");
