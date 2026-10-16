import type { ListModule } from '../core/types';
import { dtext } from '../core/dom';

export const concepts: ListModule = {
  id: 'concepts',
  file: 'concepts.json',
  titleKey: 'concepts.title',
  subKey: 'concepts.sub',
  filters: [{ field: 'category', labelKey: 'ui.category' }],
  card: (it, L) => ({
    title: L(it, 'term'),
    sub: L(it, 'termEn'),
    one: L(it, 'oneLiner'),
    tags: [L(it, 'category')].filter(Boolean),
    level: it.level,
  }),
  detail: (it, L) => ({
    title: L(it, 'term'),
    sub: L(it, 'termEn'),
    sections: [
      { labelKey: 'ui.oneLiner', html: dtext(L(it, 'oneLiner')) },
      { labelKey: 'ui.detail', html: dtext(L(it, 'detail')) },
      { labelKey: 'ui.example', html: dtext(L(it, 'example')) },
    ],
    relatedIds: it.related || [],
    sources: it.sources || [],
  }),
};
