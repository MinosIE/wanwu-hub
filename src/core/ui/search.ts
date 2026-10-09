/**
 * 统一搜索组件（依赖反转版）。
 * ------------------------------------------------------------
 * 所有学科共用同一套搜索逻辑与结果渲染；学科只需提供：
 *  - 输入框 / 结果容器（#search / .search-results）
 *  - onPick 回调（选中结果后的行为）
 *  - t()（用于空结果文案，由 setI18n 注入）
 * 主题色由 CSS 变量驱动，无需传入。
 */

import { fetchData } from './data';
import { esc, need } from './dom';
import { t, getLang } from './ui';

export interface SearchEntry {
  m: string;
  id: string;
  t: string;
  n: string;
  nEn?: string;
  x?: string;
  xEn?: string;
}

export interface SearchController {
  run(query: string): void;
  close(): void;
}

export interface InitSearchOpts {
  input: string; // 输入框选择器，默认 '#search'
  results: string; // 结果容器选择器，默认 '#searchResults'
  onPick: (entry: SearchEntry) => void;
  fetchUrl?: string; // 索引文件，默认 'search.json'
}

export function initSearch(opts: InitSearchOpts): SearchController {
  const inputSel = opts.input ?? '#search';
  const resultsSel = opts.results ?? '#searchResults';
  const input = need<HTMLInputElement>(inputSel);
  const box = need(resultsSel);

  let index: SearchEntry[] | null = null;
  let loading: Promise<void> | null = null;
  let items: SearchEntry[] = [];
  let cursor = -1;

  function ensureIndex(): Promise<void> {
    if (index) return Promise.resolve();
    if (!loading) {
      loading = fetchData<SearchEntry[]>(opts.fetchUrl ?? 'search.json')
        .then((data) => {
          index = data;
        })
        .catch(() => {
          index = [];
        });
    }
    return loading;
  }

  function score(entry: SearchEntry, q: string): number {
    const n = (entry.n || '').toLowerCase();
    const x = (entry.x || '').toLowerCase();
    const nEn = (entry.nEn || '').toLowerCase();
    const xEn = (entry.xEn || '').toLowerCase();
    if (n === q || nEn === q) return 0;
    if (n.startsWith(q) || nEn.startsWith(q)) return 1;
    if (n.includes(q) || nEn.includes(q)) return 2;
    if (x.includes(q) || xEn.includes(q)) return 3;
    return 99;
  }

  function render(list: SearchEntry[]): void {
    if (!list.length) {
      box.innerHTML = `<p class="sr-empty">${esc(t('searchEmpty'))}</p>`;
      box.hidden = false;
      return;
    }
    const lang = getLang();
    box.innerHTML = list
      .map((e, i) => {
        const name = (lang === 'en' && e.nEn) || e.n;
        const x = (lang === 'en' && e.xEn) || e.x || '';
        return `<div class="sr-item${i === cursor ? ' on' : ''}" role="option" data-i="${i}">
          <span class="sr-type">${esc(t(e.t))}</span>
          <span class="sr-name">${esc(name)}</span>
          <span class="sr-x">${esc(x)}</span>
        </div>`;
      })
      .join('');
    box.hidden = false;
  }

  function run(query: string): void {
    const q = query.trim().toLowerCase();
    cursor = -1;
    if (!q) {
      close();
      return;
    }
    void ensureIndex().then(() => {
      const all = index ?? [];
      items = all
        .map((e) => ({ e, s: score(e, q) }))
        .filter((r) => r.s < 99)
        .sort((a, b) => a.s - b.s)
        .slice(0, 14)
        .map((r) => r.e);
      render(items);
    });
  }

  input.addEventListener('input', () => run(input.value));
  input.addEventListener('focus', () => {
    if (!input.value.trim()) close();
  });
  input.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape') {
      close();
      return;
    }
    if (!items.length) return;
    if (ev.key === 'ArrowDown' || ev.key === 'ArrowUp') {
      ev.preventDefault();
      cursor = ev.key === 'ArrowDown' ? (cursor + 1) % items.length : (cursor - 1 + items.length) % items.length;
      box.querySelectorAll('.sr-item').forEach((node, i) => node.classList.toggle('on', i === cursor));
      return;
    }
    if (ev.key === 'Enter') {
      ev.preventDefault();
      const picked = items[cursor >= 0 ? cursor : 0];
      if (picked) {
        opts.onPick(picked);
        close();
      }
    }
  });

  box.addEventListener('click', (ev) => {
    const node = (ev.target as HTMLElement).closest<HTMLElement>('.sr-item');
    if (!node) return;
    const picked = items[Number(node.dataset.i)];
    if (picked) {
      opts.onPick(picked);
      close();
    }
  });

  document.addEventListener('click', (ev) => {
    if (!(ev.target as HTMLElement).closest('.search')) close();
  });

  function close(): void {
    box.hidden = true;
    box.innerHTML = '';
    items = [];
    cursor = -1;
  }

  // 预取索引，让首次输入零等待
  void ensureIndex();
  return { run, close };
}
