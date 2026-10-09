import { openDetail } from '../core/detail';
import { L, t } from '../core/i18n';
import type { DetailPayload, LObj, SourceRef } from '../core/types';
import {
  compact,
  escapeInline,
  listSection,
  mountGrid,
  pointList,
  relatedButtons,
  textSection,
} from './shared';
import type { ModuleInstance } from './types';

export interface Species extends LObj {
  id: string;
  name: string;
  nameEn?: string;
  taxon?: string;
  taxonEn?: string;
  status?: string;
  statusEn?: string;
  region?: string;
  regionEn?: string;
  oneLiner?: string;
  bio?: string;
  traits?: { k?: string; v?: string; kEn?: string; vEn?: string }[];
  notes?: { k?: string; v?: string; kEn?: string; vEn?: string }[];
  related?: string[];
  sources?: SourceRef[];
}

function card(item: Species): string {
  return `<article class="card js-item" data-key="${item.id}">
    <header class="card-h">
      <span class="card-t">${escapeInline(L(item, 'name'))}</span>
    </header>
    <p class="card-sub">${escapeInline(L<string>(item, 'taxon'))}</p>
    <p class="card-lead">${escapeInline(L(item, 'oneLiner'))}</p>
    <footer class="card-f">
      <span class="tag">${escapeInline(L(item, 'status'))}</span>
      <span class="card-go">${t('ui.enter')}</span>
    </footer>
  </article>`;
}

export default async function render(): Promise<ModuleInstance> {
  const grid = await mountGrid<Species>({
    file: 'endemics.json',
    hostSel: '#endemicsGrid',
    sortBy: (a, b) => Number(a.order ?? 0) - Number(b.order ?? 0),
    match: (it, q) =>
      [
        it.name,
        it.nameEn,
        it.taxon,
        it.taxonEn,
        it.status,
        it.statusEn,
        it.region,
        it.regionEn,
        it.oneLiner,
        it.oneLinerEn,
        it.bio,
        it.bioEn,
        ...(it.traits ?? []).flatMap((p) => [p.k, p.kEn, p.v, p.vEn]),
        ...(it.notes ?? []).flatMap((p) => [p.k, p.kEn, p.v, p.vEn]),
      ]
        .join(' ')
        .toLowerCase()
        .includes(q.toLowerCase()),
    card,
    onPick: (item) => openDetail(detail(item)),
  });

  function detail(item: Species): DetailPayload {
    return {
      eyebrow: t('nav.endemics'),
      title: L<string>(item, 'name'),
      subtitle: [L<string>(item, 'taxon'), L<string>(item, 'region')].filter(Boolean).join(' · '),
      tags: [L<string>(item, 'status'), L<string>(item, 'region')].filter(Boolean),
      sections: compact([
        textSection('🎯', t('ui.oneLiner'), L<string>(item, 'oneLiner') ?? ''),
        textSection('🧭', t('ui.detail'), L<string>(item, 'bio') ?? ''),
        listSection('🔑', t('ui.traits'), pointList(item, 'traits')),
        listSection('🌿', t('ui.significance'), pointList(item, 'notes')),
      ]),
      related: relatedButtons(item.related, 'm-endemics'),
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
