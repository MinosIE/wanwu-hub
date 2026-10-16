import type { ListModule } from '../core/types';
import { dtext } from '../core/dom';

export const mindbend: ListModule = {
  id: 'mindbend',
  file: 'mindbend.json',
  titleKey: 'mindbend.title',
  subKey: 'mindbend.sub',
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
    ],
    relatedIds: it.related || [],
    sources: it.sources || [],
  }),
};
