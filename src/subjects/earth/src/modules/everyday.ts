import { openDetail } from "../core/detail";
import { L, t } from "../core/i18n";
import type { DetailPayload, LObj } from "../core/types";
import { lvlBadge } from "../core/ui";
import {
  compact,
  mountGrid,
  relatedButtons,
  termCard,
  textSection,
} from "./shared";
import type { ModuleInstance } from "./types";

export interface Everyday extends LObj {
  id: string;
  term: string;
  termEn?: string;
  category?: string;
  categoryEn?: string;
  level?: number;
  oneLiner?: string;
  oneLinerEn?: string;
  detail?: string;
  detailEn?: string;
  related?: string[];
}

export default async function render(): Promise<ModuleInstance> {
  const grid = await mountGrid<Everyday>({
    file: "everyday.json",
    hostSel: "#everydayGrid",
    filterSel: "#everydayFilters",
    countSel: "#everydayCount",
    levels: true,
    match: (it, q) =>
      [
        it.term,
        it.termEn,
        it.category,
        it.categoryEn,
        it.oneLiner,
        it.oneLinerEn,
        it.detail,
        it.detailEn,
      ]
        .join(" ")
        .toLowerCase()
        .includes(q.toLowerCase()),
    card: (it) =>
      termCard(it, {
        titleKeys: ["term"],
        leadKeys: ["oneLiner"],
        badge: lvlBadge(it.level),
        tag: L<string>(it, "category") ?? "",
        icon: "🌂",
      }),
    onPick: (item) => openDetail(detail(item)),
  });

  function detail(item: Everyday): DetailPayload {
    return {
      eyebrow: t("nav.everyday"),
      title: L<string>(item, "term"),
      subtitle: L<string>(item, "termEn") ?? "",
      level: item.level,
      sections: compact([
        textSection("💬", t("ui.oneLiner"), L<string>(item, "oneLiner") ?? ""),
        textSection("🧭", t("ui.detail"), L<string>(item, "detail") ?? ""),
      ]),
      related: relatedButtons(item.related, "m-everyday"),
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
