import type { ListModule } from '../core/types';
import { dtext } from '../core/dom';

export const compare: ListModule = {
  id: 'compare',
  file: 'compare.json',
  titleKey: 'compare.title',
  subKey: 'compare.sub',
  filters: [{ field: 'category', labelKey: 'ui.category' }],
  card: (it, L) => ({
    title: L(it, 'term'),
    sub: L(it, 'termEn'),
    one: L(it, 'oneLiner'),
    tags: [L(it, 'category')].filter(Boolean),
  }),
  detail: (it, L) => ({
    title: L(it, 'term'),
    sub: L(it, 'termEn'),
    sections: [
      { labelKey: 'ui.oneLiner', html: dtext(L(it, 'oneLiner')) },
      { labelKey: 'ui.west', html: dtext(L(it, 'west')) },
      { labelKey: 'ui.east', html: dtext(L(it, 'east')) },
      { labelKey: 'ui.detail', html: dtext(L(it, 'detail')) },
    ],
    relatedIds: it.related || [],
    sources: it.sources || [],
  }),
};
