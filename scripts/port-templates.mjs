// 提取 econ/mind 原站 index.html 的 body 内 HTML 作为 view 模板（去掉 script/noscript）。
import fs from "node:fs";

const jobs = [
  [
    "/Users/wedo/Study/econ-everything/index.html",
    "/Users/wedo/Study/wanwu-hub/src/subjects/econ/template.ts",
  ],
  [
    "/Users/wedo/Study/mind-everything/index.html",
    "/Users/wedo/Study/wanwu-hub/src/subjects/mind/template.ts",
  ],
];

for (const [src, out] of jobs) {
  const html = fs.readFileSync(src, "utf8");
  const body = html.split("<body>")[1].split("</body>")[0];
  const tpl = body
    .replace(/<script[\s\S]*?<\/script>/g, "")
    .replace(/<noscript[\s\S]*?<\/noscript>/g, "")
    .trim();
  fs.writeFileSync(out, `export const TEMPLATE = ${JSON.stringify(tpl)};\n`);
  console.log("template ->", out, tpl.length, "chars");
}
