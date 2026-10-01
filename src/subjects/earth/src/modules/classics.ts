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
  relatedButtons,
  textSection,
} from './shared';
import type { ModuleInstance } from './types';

export interface Classic extends LObj {
  id: string;
  name: string;
  nameEn?: string;
  author?: string;
  era?: string;
  level?: number;
  core?: string;
  themes?: string[];
  influence?: string;
  related?: string[];
}

function card(item: Classic): string {
  return `<article class="card js-item" data-key="${item.id}">
    <header class="card-h">
      <span class="card-t">${escapeInline(L(item, 'name'))}</span>
      ${lvlBadge(item.level)}
    </header>
    <p class="card-sub">${escapeInline([L<string>(item, 'author'), L<string>(item, 'era')].filter(Boolean).join(' · '))}</p>
    <p class="card-lead">${escapeInline(L(item, 'core'))}</p>
    <footer class="card-f">
      <span class="tag">${escapeInline(t('nav.classics'))}</span>
      <span class="card-go">${t('ui.enter')}</span>
    </footer>
  </article>`;
}

export default async function render(): Promise<ModuleInstance> {
  const grid = await mountGrid<Classic>({
    file: 'classics.json',
    hostSel: '#classicsGrid',
    levels: true,
    sortBy: (a, b) => Number(a.order ?? 0) - Number(b.order ?? 0),
    match: (it, q) =>
      [
        it.name,
        it.nameEn,
        it.author,
        it.authorEn,
        it.era,
        it.eraEn,
        it.core,
        it.coreEn,
        it.influence,
        it.influenceEn,
        ...pairList(it, 'themes'),
      ]
        .join(' ')
        .toLowerCase()
        .includes(q.toLowerCase()),
    card,
    onPick: (item) => openDetail(detail(item)),
  });

  function detail(item: Classic): DetailPayload {
    return {
      eyebrow: t('nav.classics'),
      title: L<string>(item, 'name'),
      subtitle: [L<string>(item, 'author'), L<string>(item, 'era')].filter(Boolean).join(' · '),
      level: item.level,
      sections: compact([
        textSection('🎯', t('ui.core'), L<string>(item, 'core') ?? ''),
        listSection('🔑', t('ui.themes'), pairList(item, 'themes')),
        textSection('🌍', t('ui.influence'), L<string>(item, 'influence') ?? ''),
      ]),
      related: relatedButtons(item.related, 'm-classics'),
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
