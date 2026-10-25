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

export interface Myth extends LObj {
  id: string;
  term: string;
  termEn?: string;
  category?: string;
  categoryEn?: string;
  level?: number;
  myth?: string;
  mythEn?: string;
  truth?: string;
  truthEn?: string;
  detail?: string;
  detailEn?: string;
  related?: string[];
}

export default async function render(): Promise<ModuleInstance> {
  const grid = await mountGrid<Myth>({
    file: "myths.json",
    hostSel: "#mythsGrid",
    filterSel: "#mythsFilters",
    countSel: "#mythsCount",
    levels: true,
    match: (it, q) =>
      [
        it.term,
        it.termEn,
        it.category,
        it.categoryEn,
        it.myth,
        it.mythEn,
        it.truth,
        it.truthEn,
        it.detail,
        it.detailEn,
      ]
        .join(" ")
        .toLowerCase()
        .includes(q.toLowerCase()),
    card: (it) =>
      termCard(it, {
        leadKeys: ["truth"],
        badge: lvlBadge(it.level),
        tag: L<string>(it, "category"),
        icon: "🧯",
      }),
    onPick: (item) => openDetail(detail(item)),
  });

  function detail(item: Myth): DetailPayload {
    return {
      eyebrow: t("nav.myths"),
      title: L<string>(item, "term"),
      subtitle: L<string>(item, "termEn") ?? "",
      level: item.level,
      sections: compact([
        textSection("❌", t("ui.myth"), L<string>(item, "myth") ?? ""),
        textSection("✅", t("ui.truth"), L<string>(item, "truth") ?? ""),
        textSection("🧭", t("ui.detail"), L<string>(item, "detail") ?? ""),
      ]),
      related: relatedButtons(item.related, "m-myths"),
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
