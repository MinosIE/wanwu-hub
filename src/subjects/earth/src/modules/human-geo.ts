import { openDetail } from "../core/detail";
import { L, t } from "../core/i18n";
import type { DetailPayload, LObj } from "../core/types";
import { lvlBadge } from "../core/ui";
import {
  compact,
  listSection,
  mountGrid,
  pointList,
  relatedButtons,
  textSection,
  topicCard,
} from "./shared";
import type { ModuleInstance } from "./types";

export interface HumanGeo extends LObj {
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
  points?: { k?: string; v?: string; kEn?: string; vEn?: string }[];
  related?: string[];
}

export default async function render(): Promise<ModuleInstance> {
  const grid = await mountGrid<HumanGeo>({
    file: "human-geo.json",
    hostSel: "#humanGeoGrid",
    filterSel: "#humanGeoFilters",
    countSel: "#humanGeoCount",
    levels: true,
    sortBy: (a, b) => Number(a.order ?? 0) - Number(b.order ?? 0),
    match: (it, q) =>
      [
        it.title,
        it.titleEn,
        it.lead,
        it.leadEn,
        it.category,
        it.categoryEn,
        ...(it.points ?? []).flatMap((p) => [p.k, p.kEn, p.v, p.vEn]),
      ]
        .join(" ")
        .toLowerCase()
        .includes(q.toLowerCase()),
    card: (it) => topicCard(it, lvlBadge(it.level)),
    onPick: (item) => openDetail(detail(item)),
  });

  function detail(item: HumanGeo): DetailPayload {
    return {
      eyebrow: t("nav.humanGeo"),
      title: L<string>(item, "title"),
      subtitle: L<string>(item, "titleEn") ?? "",
      level: item.level,
      sections: compact([
        textSection("🎯", t("ui.oneLiner"), L<string>(item, "lead") ?? ""),
        listSection("🔑", t("ui.points"), pointList(item, "points")),
      ]),
      related: relatedButtons(item.related, "m-human-geo"),
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
