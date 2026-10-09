/**
 * 共享学科 UI 助手（依赖反转版）。
 * ------------------------------------------------------------
 * 与 i18n 解耦：各学科的 `t` / `L` 在 boot 时通过 setI18n 注入，
 * 本模块不直接依赖任何具体学科的字典（满足 SOLID 的依赖倒置）。
 */

import { esc, clickable } from './dom';

/* ---------- 结构类型（仅声明所需形状，避免耦合各学科 types） ---------- */
export interface SourceRef {
  label?: string;
  labelEn?: string;
  url?: string;
  type?: string;
  typeEn?: string;
  year?: string | number;
}
export interface LObj {
  id?: string | number;
  level?: number;
  category?: string;
  sources?: SourceRef[];
  [k: string]: unknown;
}
export interface DetailSection {
  title: string;
  html: string;
}

/* ---------- i18n 依赖反转 ---------- */
type TFn = (key: string, vars?: Record<string, string | number>) => string;
type LFn = <T = string>(o: LObj | undefined | null, key: string) => T;

let _t: TFn = (k) => k;
let _L: LFn = (() => undefined) as LFn;
let _getLang: () => 'zh' | 'en' = () => 'zh';

/** 由各学科在 boot 时注入自身 i18n（依赖倒置：本模块只依赖抽象）。 */
export function setI18n(
  t: TFn,
  L: LFn,
  getLang?: () => 'zh' | 'en',
): void {
  _t = t;
  _L = L;
  if (getLang) _getLang = getLang;
}
/** 当前语言（注入后的当前学科状态）。 */
export function getLang(): 'zh' | 'en' {
  return _getLang();
}
/** 取界面文案（注入后的当前学科字典）。 */
export function t(key: string, vars?: Record<string, string | number>): string {
  return _t(key, vars);
}
/** 取数据字段（注入后的当前学科字典）。 */
export function L<T = string>(o: LObj | undefined | null, key: string): T {
  return _L(o, key);
}

/* ---------- 通用渲染助手 ---------- */

/** 难度徽标：1 入门 / 2 进阶 / 3 拓展。 */
export function lvlBadge(level?: number): string {
  if (!level) return '';
  return `<span class="lvl lvl-${level}">${esc(t(`ui.lvl${level}`))}</span>`;
}

/** 统一取来源数组（宽松容错：非数组视为空）。 */
export function sourcesOf(item: LObj): SourceRef[] {
  const s = item.sources;
  return Array.isArray(s) ? (s as SourceRef[]) : [];
}

/** 从数据里归纳「分类」筛选项（保持出现顺序，去重）。 */
export function collectCategories(items: LObj[]): { value: string; label: string }[] {
  const seen = new Map<string, string>();
  for (const it of items) {
    const value = String(it.category ?? '');
    if (!value) continue;
    if (!seen.has(value)) seen.set(value, L(it, 'category'));
  }
  return [...seen.entries()].map(([value, label]) => ({ value, label }));
}

export interface FilterState {
  cat: string;
  level: number;
}
export interface FilterOptions {
  categories?: { value: string; label: string }[];
  levels?: boolean;
}

/** 渲染「分类 + 难度」筛选条；点击后回调，由调用方重渲染列表。 */
export function renderFilters(
  host: HTMLElement,
  state: FilterState,
  opts: FilterOptions,
  onChange: () => void,
): void {
  const parts: string[] = [];
  if (opts.categories?.length) {
    parts.push(
      `<span class="fl-label">${esc(t('ui.all'))}</span>`,
      `<button type="button" class="chip${state.cat === '' ? ' on' : ''}" data-cat="">${esc(t('ui.all'))}</button>`,
      ...opts.categories.map(
        (c) =>
          `<button type="button" class="chip${state.cat === c.value ? ' on' : ''}" data-cat="${esc(c.value)}">${esc(c.label)}</button>`,
      ),
    );
  }
  if (opts.levels) {
    parts.push(
      `<span class="fl-sep" aria-hidden="true"></span><span class="fl-label">${esc(t('ui.level'))}</span>`,
      `<button type="button" class="chip${state.level === 0 ? ' on' : ''}" data-lvl="0">${esc(t('ui.all'))}</button>`,
      ...[1, 2, 3].map(
        (lv) =>
          `<button type="button" class="chip${state.level === lv ? ' on' : ''}" data-lvl="${lv}">${esc(t(`ui.lvl${lv}`))}</button>`,
      ),
    );
  }
  host.innerHTML = parts.join('');
  host.querySelectorAll<HTMLElement>('[data-cat]').forEach((node) => {
    node.addEventListener('click', () => {
      state.cat = node.dataset.cat ?? '';
      onChange();
    });
  });
  host.querySelectorAll<HTMLElement>('[data-lvl]').forEach((node) => {
    node.addEventListener('click', () => {
      state.level = Number(node.dataset.lvl ?? 0);
      onChange();
    });
  });
}

export function matchFilters(item: LObj, state: FilterState): boolean {
  if (state.cat && String(item.category ?? '') !== state.cat) return false;
  if (state.level && Number(item.level ?? 0) !== state.level) return false;
  return true;
}

/** 卡片列表通用渲染：items 过滤后交给 build(item) 产出 HTML，并绑定点击。 */
export function renderList<T extends LObj>(
  host: HTMLElement,
  items: T[],
  build: (item: T) => string,
  onPick: (item: T) => void,
  cardClass = 'card',
): void {
  host.innerHTML = items.map((it) => build(it)).join('');
  host.querySelectorAll<HTMLElement>('.js-item').forEach((node) => {
    const key = node.dataset.key;
    const item = items.find((it) => String(it.id) === key);
    if (item) clickable(node, () => onPick(item));
  });
  host.classList.toggle('is-empty', items.length === 0);
  void cardClass;
}

/** 计数行。 */
export function countText(host: HTMLElement, n: number): void {
  host.textContent = t('ui.count', { n });
  host.hidden = false;
}

export function keyword(text: string, q: string): string {
  const safe = esc(text);
  if (!q) return safe;
  const idx = text.toLowerCase().indexOf(q.toLowerCase());
  if (idx < 0) return safe;
  const before = esc(text.slice(0, idx));
  const hit = esc(text.slice(idx, idx + q.length));
  const after = esc(text.slice(idx + q.length));
  return `${before}<mark>${hit}</mark>${after}`;
}
