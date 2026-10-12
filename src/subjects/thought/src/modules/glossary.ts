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

export interface Term extends LObj {
  id: string;
  term: string;
  termEn?: string;
  category?: string;
  categoryEn?: string;
  level?: number;
  def?: string;
  defEn?: string;
  plain?: string;
  plainEn?: string;
  related?: string[];
}

export default async function render(): Promise<ModuleInstance> {
  const grid = await mountGrid<Term>({
    file: "glossary.json",
    hostSel: "#glossaryGrid",
    filterSel: "#glossaryFilters",
    countSel: "#glossaryCount",
    levels: true,
    match: (it, q) =>
      [
        it.term,
        it.termEn,
        it.category,
        it.categoryEn,
        it.def,
        it.defEn,
        it.plain,
        it.plainEn,
      ]
        .join(" ")
        .toLowerCase()
        .includes(q.toLowerCase()),
    card: (it) =>
      termCard(it, {
        leadKeys: ["def"],
        badge: lvlBadge(it.level),
        tag: L<string>(it, "category") ?? "",
      }),
    onPick: (item) => openDetail(detail(item)),
  });

  function detail(item: Term): DetailPayload {
    return {
      eyebrow: t("nav.glossary"),
      title: L<string>(item, "term"),
      subtitle: L<string>(item, "termEn") ?? "",
      level: item.level,
      sections: compact([
        textSection("📖", t("ui.def"), L<string>(item, "def") ?? ""),
        textSection("💬", t("ui.plain"), L<string>(item, "plain") ?? ""),
      ]),
      related: relatedButtons(item.related, "m-glossary"),
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
