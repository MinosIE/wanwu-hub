import type { ListModule } from '../core/types';
import { dtext } from '../core/dom';

export const timeline: ListModule = {
  id: 'timeline',
  file: 'timeline.json',
  titleKey: 'timeline.title',
  subKey: 'timeline.sub',
  mode: 'timeline',
  card: (it, L) => ({
    title: L(it, 'term'),
    sub: L(it, 'termEn'),
    one: L(it, 'oneLiner'),
  }),
  detail: (it, L) => ({
    title: L(it, 'term'),
    sub: [it.year, L(it, 'termEn')].filter(Boolean).join(' · '),
    sections: [
      { labelKey: 'ui.oneLiner', html: dtext(L(it, 'oneLiner')) },
      { labelKey: 'ui.detail', html: dtext(L(it, 'detail')) },
    ],
    relatedIds: it.related || [],
    sources: it.sources || [],
  }),
};
