// 从 chinese-dynasty-timeline/index.html 自动搬运「DOM 模板 + 主脚本」到 wanwu 站内 subject。
// 原站逻辑保持完整，仅做最小改写以适配 wanwu 的受限运行环境。
import fs from "node:fs";
import path from "node:path";

const SRC = "/Users/wedo/Study/chinese-dynasty-timeline/index.html";
const OUT = "/Users/wedo/Study/wanwu-hub/src/subjects/dynasty";
const html = fs.readFileSync(SRC, "utf8");

// ---- 提取 .wrap 容器 HTML（含 hero / search / modnav / 各 module 空壳 / toTop）----
const startTag = '<div class="wrap">';
const si = html.indexOf(startTag);
if (si < 0) throw new Error("wrap not found");
let i = si + startTag.length;
let depth = 1;
let end = -1;
while (i < html.length) {
  const open = html.indexOf("<div", i);
  const close = html.indexOf("</div>", i);
  if (close < 0) break;
  if (open > -1 && open < close) {
    depth++;
    i = open + 4;
  } else {
    depth--;
    i = close + 6;
    if (depth === 0) {
      end = close;
      break;
    }
  }
}
const wrapHtml = html.slice(si, end + 6);

// ---- 提取主脚本（含 const I18N 的那个 <script>）----
const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
const main = scripts.find((s) => s.includes("const I18N"));
if (!main) throw new Error("main script not found");

// ---- 最小改写 ----
// 1) fetch 数据路径 data/ -> dynasty-data/data/
let js = main.replace(/data\//g, "dynasty-data/data/");
// 2) 暴露 setLang 供 wanwu 顶栏调用（挂到传入的 window.__setLang）
js = js.replace(
  "function setLang(next) {",
  "function setLang(next) {\n    window.__setLang = setLang;",
);
// 3) 去掉 JSON-LD 注入（站内页不需要，且会污染 document.head）
js = js.replace(/\n\s*injectJsonLd\(\);/g, "");
// 4) 脚本加载即暴露 setLang 供 wanwu 顶栏调用。
//    （init() 不会调用 setLang，若只在函数体内暴露，window.__setLang 永远为空、顶栏切换语言无效）
js += "\nwindow.__setLang = setLang;";

fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(
  path.join(OUT, "template.ts"),
  `export const TEMPLATE = ${JSON.stringify(wrapHtml)};\n`,
);
fs.writeFileSync(
  path.join(OUT, "logic.ts"),
  `// @ts-nocheck\n// 自动从 chinese-dynasty-timeline/index.html 搬运，原站逻辑保持完整。\n// 仅做最小改写（数据路径、暴露 setLang、去 JSON-LD 注入）。\nexport const DYNASTY_SCRIPT = ${JSON.stringify(js)};\n`,
);
console.log("dynasty template+logic generated");
