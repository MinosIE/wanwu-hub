import { getLang, t } from './i18n';
import { esc } from './dom';
import type { DetailView, RefSource } from './types';

// 说明：s.html 等由各模块拼装，凡插入数据字段一律经 esc()；来源 url 同样转义后作为 href。

// 关闭滑出动画的延时定时器（跨调用复用，避免重开时残留定时器把新面板隐藏）。
let closeTimer = 0;

/**
 * 来源标签：英文界面优先 labelEn（缺失回退中文），年份括号随语言。
 * 页脚 refs 与详情面板共用这一份，避免两处行为分叉。
 */
export function srcLabel(s: RefSource): string {
  const en = getLang() === 'en';
  const label = en ? s.labelEn || s.label : s.label;
  // label 已含年份（如 "Milgram (1963)"）时不再重复拼接
  const hasYear = s.year != null && String(label).includes(`(${s.year})`);
  const year =
    s.year != null && !hasYear ? (en ? ` (${s.year})` : `（${s.year}）`) : '';
  return `${esc(label)}${year}`;
}

export function renderDetail(
  view: DetailView,
  onRelated: (id: string) => void,
): void {
  const root = document.getElementById('detailRoot');
  if (!root) return;

  // 重开（如 related 跳转）时先取消待执行的关闭清理并回到初始滑出态。
  window.clearTimeout(closeTimer);
  root.classList.remove('open');

  const sections = view.sections
    .map(
      (s) => `
      <div class="detail-section">
        <h4>${esc(t(s.labelKey))}</h4>
        <div class="body">${s.html}</div>
      </div>`,
    )
    .join('');

  const related =
    view.related && view.related.length
      ? `<div class="detail-section">
         <h4>${esc(t('ui.related'))}</h4>
         <div class="related-list">${view.related
           .map(
             (r) =>
               `<button class="related-link" data-rel="${esc(r.id)}">${esc(r.title)}</button>`,
           )
           .join('')}</div>
       </div>`
      : '';

  const sources =
    view.sources && view.sources.length
      ? `<div class="detail-section">
         <h4>${esc(t('ui.sources'))}</h4>
         <div class="sources">${view.sources
           .map((s) => {
             const text = srcLabel(s);
             return s.url
               ? `<a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${text}</a>`
               : text;
           })
           .join('；')}</div>
       </div>`
      : '';

  root.innerHTML = `
    <div class="detail-backdrop" data-close="1"></div>
    <div class="detail-panel" role="dialog" aria-modal="true">
      <div class="detail-head">
        <h2>${esc(view.title)}</h2>
        <button class="detail-close" id="detailClose" aria-label="${esc(t('ui.close'))}">✕</button>
      </div>
      ${view.sub ? `<p class="detail-sub">${esc(view.sub)}</p>` : ''}
      ${sections}${related}${sources}
    </div>`;
  root.hidden = false;
  document.body.style.overflow = 'hidden';
  requestAnimationFrame(() => root.classList.add('open'));

  const panel = root.querySelector<HTMLElement>('.detail-panel')!;
  const closeBtn = panel.querySelector<HTMLElement>('#detailClose');
  const lastFocused =
    document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;

  const close = () => {
    root.classList.remove('open');
    document.body.style.overflow = '';
    document.removeEventListener('keydown', onKey);
    lastFocused?.focus();
    // 等滑出过渡（0.3s）结束后再隐藏并清空，避免动画被截断。
    window.clearTimeout(closeTimer);
    closeTimer = window.setTimeout(() => {
      root.hidden = true;
      root.innerHTML = '';
    }, 320);
  };
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      close();
      return;
    }
    if (e.key !== 'Tab') return;
    // 焦点圈定：Tab 只在面板内的可聚焦元素间循环
    const focusables = Array.from(
      panel.querySelectorAll<HTMLElement>(
        'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      ),
    ).filter((n) => !n.hasAttribute('disabled'));
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  closeBtn?.addEventListener('click', close);
  root
    .querySelector<HTMLElement>('.detail-backdrop')
    ?.addEventListener('click', close);
  root.addEventListener('click', (e) => {
    if (e.target === root) close();
  });
  document.addEventListener('keydown', onKey);
  closeBtn?.focus();

  root.querySelectorAll<HTMLElement>('.related-link').forEach((b) =>
    b.addEventListener('click', () => {
      const id = b.dataset.rel;
      if (id) onRelated(id);
    }),
  );
}
