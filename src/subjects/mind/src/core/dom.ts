/**
 * mind 的 DOM 助手：`esc` 与全站共享实现逐字节等价，直接复用单一事实源 src/core/ui/dom。
 * 注意：mind 的 `el` 是「按选择器查询」的语义（返回 T|null），与共享层里「创建元素」的
 * `el` 同名但语义相反，故此处保留本地实现，不并入共享 dom。
 */
export { esc } from '../../../../core/ui/dom';

export function el<T extends HTMLElement = HTMLElement>(
  sel: string,
  root: ParentNode = document,
): T | null {
  return root.querySelector<T>(sel);
}
