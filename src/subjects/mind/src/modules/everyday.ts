import type { ListModule } from '../core/types';
import { dtext } from '../core/dom';

export const everyday: ListModule = {
  id: 'everyday',
  file: 'everyday.json',
  titleKey: 'everyday.title',
  subKey: 'everyday.sub',
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
      { labelKey: 'ui.detail', html: dtext(L(it, 'detail')) },
    ],
    relatedIds: it.related || [],
    sources: it.sources || [],
  }),
};
