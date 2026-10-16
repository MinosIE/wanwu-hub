import type { ListModule } from '../core/types';
import { dtext } from '../core/dom';

export const experiments: ListModule = {
  id: 'experiments',
  file: 'experiments.json',
  titleKey: 'experiments.title',
  subKey: 'experiments.sub',
  filters: [{ field: 'category', labelKey: 'ui.category' }],
  card: (it, L) => ({
    title: L(it, 'term'),
    sub: [it.year, L(it, 'termEn')].filter(Boolean).join(' · '),
    one: L(it, 'oneLiner'),
    tags: [L(it, 'category')].filter(Boolean),
  }),
  detail: (it, L) => ({
    title: L(it, 'term'),
    sub: [it.year, L(it, 'termEn')].filter(Boolean).join(' · '),
    sections: [
      { labelKey: 'ui.oneLiner', html: dtext(L(it, 'oneLiner')) },
      { labelKey: 'ui.detail', html: dtext(L(it, 'detail')) },
      { labelKey: 'ui.ethics', html: dtext(L(it, 'ethics')) },
    ],
    relatedIds: it.related || [],
    sources: it.sources || [],
  }),
};
