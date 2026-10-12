// 仓库数据 JSON 的统一排版器（从 scripts/fmt-json.mjs 拆出，供其内联使用）：
//   · 2 空格缩进，UTF-8 原样中文（不做 \u 转义）
//   · 任何对象 / 数组：能压进一行且行宽 ≤ 80 就内联，否则逐项展开
//   · 数字、布尔、null 直接序列化
// 被 fmt-json.mjs（重排既有文件）与 export-data.mjs（生成 physics / chem 导出）共用，
// 保证两条路径产出同一风格，重排与导出不会互相把文件推离。
/** 紧凑一行形式（用于判断能否内联）；字符串/数字等直接 JSON.stringify。 */
function compactOf(value) {
  if (Array.isArray(value)) {
    if (!value.length) return "[]";
    return `[${value.map((v) => compactOf(v)).join(", ")}]`;
  }
  if (value && typeof value === "object") {
    const keys = Object.keys(value);
    if (!keys.length) return "{}";
    return `{ ${keys.map((k) => `${JSON.stringify(k)}: ${compactOf(value[k])}`).join(", ")} }`;
  }
  return JSON.stringify(value);
}

/** 序列化：value 在 depth 层级的文本表示；先试内联，装不下再展开。 */
export function ser(value, depth = 0) {
  const pad = "  ".repeat(depth);
  const padIn = "  ".repeat(depth + 1);
  if (Array.isArray(value)) {
    if (!value.length) return "[]";
    const inline = compactOf(value);
    if (pad.length + inline.length <= 80) return inline;
    const rows = value.map((v) => `${padIn}${ser(v, depth + 1)}`);
    return `[\n${rows.join(",\n")}\n${pad}]`;
  }
  if (value && typeof value === "object") {
    const keys = Object.keys(value);
    if (!keys.length) return "{}";
    const inline = compactOf(value);
    if (pad.length + inline.length <= 80) return inline;
    const rows = keys.map(
      (k) => `${padIn}${JSON.stringify(k)}: ${ser(value[k], depth + 1)}`,
    );
    return `{\n${rows.join(",\n")}\n${pad}}`;
  }
  return JSON.stringify(value);
}
