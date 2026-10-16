/**
 * 共享散文文本助手：把详情抽屉里一整段长文案按句拆成要点，缓解「文字墙」。
 * 由轻量学科（subjectKit：chem/physics）、FULL 学科（各 modules/shared.ts 的
 * textSection）与 mind 学科共同引用，拆分口径单一事实源。
 * 转义/内联 markup 因路径而异，故格式交给调用方传入的 format（esc / escapeInline）。
 */

/** 把一段散文按句切分：中文按 。！？（对小数/缩写无歧义，安全）；
 *  英文按「句末标点 + 空白 + 大写」切，并先遮蔽 e.g./i.e. 等缩写，
 *  避免把 "e.g. NaCl" 误切、也不误切 0.5 这类小数（其后无空白）。 */
export function splitProse(s: string): string[] {
  const t = s.trim();
  if (!t) return [];
  if (/[。！？]/.test(t)) {
    return t
      .split(/(?<=[。！？])\s*/)
      .map((x) => x.trim())
      .filter(Boolean);
  }
  const PH = "\u0001";
  const masked = t
    .replace(/e\.g\./gi, `e${PH}g${PH}`)
    .replace(/i\.e\./gi, `i${PH}e${PH}`);
  return masked
    .split(/(?<=[.!?])\s+(?=[A-Z"'(])/)
    .map((x) => x.split(PH).join(".").trim())
    .filter(Boolean);
}

/** 散文 → HTML：单句仍以 <p> 呈现，两句以上转成既有的 .dsec-list 项目符号。
 *  format 由调用方提供（esc 纯转义 / escapeInline 额外支持 **加粗**）。 */
export function proseHTML(
  text: string,
  format: (t: string) => string = (x) => x,
): string {
  const parts = splitProse(text);
  if (parts.length <= 1) return `<p>${format(text)}</p>`;
  return `<ul class="dsec-list">${parts
    .map((p) => `<li>${format(p)}</li>`)
    .join("")}</ul>`;
}
