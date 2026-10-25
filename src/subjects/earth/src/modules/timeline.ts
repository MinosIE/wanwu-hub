import { openDetail } from "../core/detail";
import { L, getLang, t } from "../core/i18n";
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

export interface Moment extends LObj {
  id: string;
  term: string;
  termEn?: string;
  category?: string;
  categoryEn?: string;
  level?: number;
  /** 公元年份；公元前为负数。 */
  year?: number;
  oneLiner?: string;
  oneLinerEn?: string;
  detail?: string;
  detailEn?: string;
  related?: string[];
}

/** 年份本地化：-399 → 「前 399 年」/「399 BCE」。 */
function yearText(year?: number): string {
  if (typeof year !== "number" || !Number.isFinite(year)) return "";
  const abs = Math.abs(year);
  return getLang() === "en"
    ? year < 0
      ? `${abs} BCE`
      : `${year} CE`
    : year < 0
      ? `前 ${abs} 年`
      : `${year} 年`;
}

function subText(item: Moment): string {
  return [yearText(item.year), L<string>(item, "category")]
    .filter(Boolean)
    .join(" · ");
}

export default async function render(): Promise<ModuleInstance> {
  const grid = await mountGrid<Moment>({
    file: "timeline.json",
    hostSel: "#timelineGrid",
    filterSel: "#timelineFilters",
    countSel: "#timelineCount",
    levels: true,
    sortBy: (a, b) => Number(a.year ?? 0) - Number(b.year ?? 0),
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
        String(it.year ?? ""),
      ]
        .join(" ")
        .toLowerCase()
        .includes(q.toLowerCase()),
    card: (it) =>
      termCard(it, {
        leadKeys: ["oneLiner"],
        sub: subText(it),
        badge: lvlBadge(it.level),
        icon: "🕰️",
      }),
    onPick: (item) => openDetail(detail(item)),
  });

  function detail(item: Moment): DetailPayload {
    return {
      eyebrow: t("nav.timeline"),
      title: L<string>(item, "term"),
      subtitle: [subText(item), L<string>(item, "termEn")]
        .filter(Boolean)
        .join(" · "),
      level: item.level,
      sections: compact([
        textSection("🎯", t("ui.oneLiner"), L<string>(item, "oneLiner") ?? ""),
        textSection("🧭", t("ui.detail"), L<string>(item, "detail") ?? ""),
      ]),
      related: relatedButtons(item.related, "m-timeline"),
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
