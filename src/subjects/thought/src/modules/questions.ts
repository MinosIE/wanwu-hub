import { openDetail } from '../core/detail';
import { L, t } from '../core/i18n';
import type { DetailPayload, LObj } from '../core/types';
import { lvlBadge } from '../core/ui';
import {
  compact,
  escapeInline,
  listSection,
  mountGrid,
  pairList,
  pointList,
  relatedButtons,
  textSection,
} from './shared';
import type { ModuleInstance } from './types';

export interface Question extends LObj {
  id: string;
  name: string;
  nameEn?: string;
  era?: string;
  level?: number;
  oneLiner?: string;
  positions?: { k?: string; v?: string; kEn?: string; vEn?: string }[];
  why?: string;
  thinkers?: string[];
  related?: string[];
}

function card(item: Question): string {
  return `<article class="card js-item" data-key="${item.id}">
    <header class="card-h">
      <span class="card-t">${escapeInline(L(item, 'name'))}</span>
      ${lvlBadge(item.level)}
    </header>
    <p class="card-sub">${escapeInline(L<string>(item, 'era') ?? '')}</p>
    <p class="card-lead">${escapeInline(L(item, 'oneLiner'))}</p>
    <footer class="card-f">
      <span class="tag">${escapeInline(t('nav.questions'))}</span>
      <span class="card-go">${t('ui.enter')}</span>
    </footer>
  </article>`;
}

export default async function render(): Promise<ModuleInstance> {
  const grid = await mountGrid<Question>({
    file: 'questions.json',
    hostSel: '#questionsGrid',
    levels: true,
    sortBy: (a, b) => Number(a.order ?? 0) - Number(b.order ?? 0),
    match: (it, q) =>
      [
        it.name,
        it.nameEn,
        it.era,
        it.eraEn,
        it.oneLiner,
        it.oneLinerEn,
        it.why,
        it.whyEn,
        ...(it.positions ?? []).flatMap((p) => [p.k, p.kEn, p.v, p.vEn]),
        ...pairList(it, 'thinkers'),
      ]
        .join(' ')
        .toLowerCase()
        .includes(q.toLowerCase()),
    card,
    onPick: (item) => openDetail(detail(item)),
  });

  function detail(item: Question): DetailPayload {
    return {
      eyebrow: t('nav.questions'),
      title: L<string>(item, 'name'),
      subtitle: L<string>(item, 'era') ?? '',
      level: item.level,
      sections: compact([
        textSection('🎯', t('ui.oneLiner'), L<string>(item, 'oneLiner') ?? ''),
        listSection('⚖️', t('ui.positions'), pointList(item, 'positions')),
        textSection('💡', t('ui.why'), L<string>(item, 'why') ?? ''),
        listSection('🧠', t('ui.thinkers'), pairList(item, 'thinkers')),
      ]),
      related: relatedButtons(item.related, 'm-questions'),
      sources: Array.isArray(item.sources) ? item.sources : [],
    };
  }

  return {
    openById: (id: string) => {
      const item = grid.byId.get(id);
      if (!item) return false;
      openDetail(detail(item));
      return true;
    },
  };
}
