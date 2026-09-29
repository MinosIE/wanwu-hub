// 把原站 styles.css 作用域化为 .dynasty-root，避免污染 wanwu 全局样式。
import fs from "node:fs";
import postcss from "postcss";
import prefixer from "postcss-prefix-selector";

const SRC = "/Users/wedo/Study/chinese-dynasty-timeline/styles.css";
const OUT = "/Users/wedo/Study/wanwu-hub/src/subjects/dynasty/dynasty.css";
const css = fs.readFileSync(SRC, "utf8");

const out = postcss([
  prefixer({
    prefix: ".dynasty-root",
    transform(prefix, selector, prefixed) {
      const s = selector.trim();
      if (s === ":root") return ".dynasty-root";
      if (s === "body") return ".dynasty-root";
      if (s === ':root[data-theme="dark"]') return '.dynasty-root[data-theme="dark"]';
      return prefixed;
    },
  }),
]).process(css, { from: undefined }).css;

fs.writeFileSync(OUT, out);
console.log("dynasty css scoped ->", OUT);
