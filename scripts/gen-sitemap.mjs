// 生成根 sitemap.xml：从 public/ 实际文件派生，覆盖全部学科页面 + llms 文本 + 数据 JSON。
// 之前的手写 sitemap 域名与 data 路径均已过时（缺 dynasty-data 前缀、无 /subject 页）。
// 用法：node scripts/gen-sitemap.mjs   （可加入 CI / rebuild）
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC = path.join(ROOT, "public");
const BASE = "https://minosie.github.io/wanwu-hub";

// 学科清单来自唯一数据源 src/core/subjects.json（与 projects.ts / gen-geo / prerender 共享）
const SUBJECTS = JSON.parse(
  fs.readFileSync(path.join(ROOT, "src", "core", "subjects.json"), "utf8"),
).map((s) => s.key);

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

const rel = (p) => path.relative(PUBLIC, p).split(path.sep).join("/");
const all = walk(PUBLIC);

const urls = [];
urls.push({ loc: `${BASE}/`, change: "daily", pri: "1.0" });
for (const k of SUBJECTS) {
  urls.push({ loc: `${BASE}/subject/${k}/`, change: "weekly", pri: "0.9" });
}
// llms 文本（*.txt，跳过 robots.txt）
for (const f of all) {
  if (!f.endsWith(".txt") || rel(f) === "robots.txt") continue;
  urls.push({ loc: `${BASE}/${rel(f)}`, change: "monthly", pri: "0.7" });
}
// 数据 JSON
for (const f of all) {
  if (!f.endsWith(".json")) continue;
  urls.push({ loc: `${BASE}/${rel(f)}`, change: "yearly", pri: "0.5" });
}

const body = urls
  .map(
    (u) =>
      `  <url><loc>${u.loc}</loc><changefreq>${u.change}</changefreq><priority>${u.pri}</priority></url>`,
  )
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;

fs.writeFileSync(path.join(PUBLIC, "sitemap.xml"), xml);
console.log(
  `sitemap.xml 已生成：${urls.length} 条（首页 1 + 学科页 ${SUBJECTS.length} + 文本/数据 ${urls.length - 1 - SUBJECTS.length}）`,
);
