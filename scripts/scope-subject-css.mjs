// 把子应用（econ / mind）的 CSS 作用域化到指定根类（如 .econ-root），
// 避免其全局 .card/.hero 等类污染主应用。用法：
//   node scripts/scope-subject-css.mjs .econ-root <file1> [file2 ...]
// 参考 scripts/scope-dynasty-css.mjs 的范式。
import fs from "node:fs";
import postcss from "postcss";
import prefixer from "postcss-prefix-selector";

const [, , prefix, ...files] = process.argv;
if (!prefix || files.length === 0) {
  console.error("用法: node scope-subject-css.mjs <prefix> <css文件...>");
  process.exit(1);
}

for (const file of files) {
  const css = fs.readFileSync(file, "utf8");
  const out = postcss([
    prefixer({
      prefix,
      transform(_p, selector, prefixed) {
        const s = selector.trim();
        if (s === ":root") return prefix;
        if (s === "html") return prefix;
        if (s === "body") return prefix;
        // 形如 :root[data-theme='dark'] -> .econ-root[data-theme='dark']
        if (s.startsWith(":root[")) return prefix + s.slice(":root".length);
        return prefixed;
      },
    }),
  ])
    .process(css, { from: undefined })
    .css;
  fs.writeFileSync(file, out);
  console.log("scoped ->", file);
}
