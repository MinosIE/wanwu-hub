import { openDetail } from "../core/detail";
import { L, t } from "../core/i18n";
import type { DetailPayload, LObj } from "../core/types";
import { lvlBadge } from "../core/ui";
import {
  compact,
  mountGrid,
  relatedButtons,
  textSection,
  topicCard,
} from "./shared";
import type { ModuleInstance } from "./types";

export interface Comparison extends LObj {
  id: string;
  title: string;
  titleEn?: string;
  icon?: string;
  category?: string;
  categoryEn?: string;
  level?: number;
  order?: number;
  lead?: string;
  leadEn?: string;
  west?: string;
  westEn?: string;
  east?: string;
  eastEn?: string;
  bridge?: string;
  bridgeEn?: string;
  related?: string[];
}

export default async function render(): Promise<ModuleInstance> {
  const grid = await mountGrid<Comparison>({
    file: "compare.json",
    hostSel: "#compareGrid",
    filterSel: "#compareFilters",
    countSel: "#compareCount",
    levels: true,
    sortBy: (a, b) => Number(a.order ?? 0) - Number(b.order ?? 0),
    match: (it, q) =>
      [
        it.title,
        it.titleEn,
        it.lead,
        it.leadEn,
        it.west,
        it.westEn,
        it.east,
        it.eastEn,
        it.bridge,
        it.bridgeEn,
        it.category,
        it.categoryEn,
      ]
        .join(" ")
        .toLowerCase()
        .includes(q.toLowerCase()),
    card: (it) => topicCard(it, lvlBadge(it.level)),
    onPick: (item) => openDetail(detail(item)),
  });

  function detail(item: Comparison): DetailPayload {
    return {
      eyebrow: t("nav.compare"),
      title: L<string>(item, "title"),
      subtitle: L<string>(item, "titleEn") ?? "",
      level: item.level,
      sections: compact([
        textSection("🔍", t("ui.lead"), L<string>(item, "lead") ?? ""),
        textSection("🅰", t("ui.sideA"), L<string>(item, "west") ?? ""),
        textSection("🅱", t("ui.sideB"), L<string>(item, "east") ?? ""),
        textSection("🌉", t("ui.bridge"), L<string>(item, "bridge") ?? ""),
      ]),
      related: relatedButtons(item.related, "m-compare"),
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
