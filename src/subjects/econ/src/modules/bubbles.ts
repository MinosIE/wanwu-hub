import { openDetail } from "../core/detail";
import { L, t } from "../core/i18n";
import type { DetailPayload, LObj } from "../core/types";
import { lvlBadge } from "../core/ui";
import {
  compact,
  escapeInline,
  listSection,
  mountGrid,
  pairList,
  pointList,
  relatedButtons,
  textSection,
} from "./shared";
import type { ModuleInstance } from "./types";

export interface Bubble extends LObj {
  id: string;
  y: number;
  yearLabel?: string;
  title: string;
  titleEn?: string;
  category?: string;
  categoryEn?: string;
  level?: number;
  icon?: string;
  lead?: string;
  leadEn?: string;
  story?: string;
  cost?: string;
  lesson?: string;
  trick?: { k: string; v: string }[];
  signal?: string[];
  signalEn?: string[];
  related?: string[];
}

function card(item: Bubble): string {
  return `<article class="card js-item" data-key="${item.id}">
    <header class="card-h">
      <span class="card-ic" aria-hidden="true">${escapeInline(item.icon ?? "🎭")}</span>
      <span class="card-t">${escapeInline(L(item, "title"))}</span>
      ${lvlBadge(item.level)}
    </header>
    <p class="card-lead">${escapeInline(L(item, "lead"))}</p>
    <footer class="card-f">
      <span class="tag">${escapeInline(L(item, "yearLabel") ?? item.y)}</span>
      ${item.category ? `<span class="tag">${escapeInline(L(item, "category"))}</span>` : ""}
      <span class="card-go">${t("ui.enter")}</span>
    </footer>
  </article>`;
}

export default async function render(): Promise<ModuleInstance> {
  const grid = await mountGrid<Bubble>({
    file: "bubbles.json",
    hostSel: "#bubblesGrid",
    filterSel: "#bubblesFilters",
    countSel: "#bubblesCount",
    levels: true,
    sortBy: (a, b) => Number(a.y) - Number(b.y),
    match: (it, q) =>
      [
        it.title,
        it.titleEn,
        it.category,
        it.categoryEn,
        it.lead,
        it.leadEn,
        it.story,
        it.storyEn,
        it.cost,
        it.costEn,
        it.lesson,
        it.lessonEn,
      ]
        .join(" ")
        .toLowerCase()
        .includes(q.toLowerCase()),
    card,
    onPick: (item) => openDetail(detail(item)),
  });

  function detail(item: Bubble): DetailPayload {
    return {
      eyebrow: t("nav.bubbles"),
      title: L<string>(item, "title"),
      subtitle: [
        L<string>(item, "yearLabel") ?? String(item.y),
        L<string>(item, "category"),
      ]
        .filter(Boolean)
        .join(" · "),
      level: item.level,
      sections: compact([
        textSection("📖", t("ui.story"), L<string>(item, "story") ?? ""),
        listSection("🔑", t("ui.trick"), pointList(item, "trick")),
        listSection("⚠️", t("ui.signal"), pairList(item, "signal")),
        textSection("🧾", t("ui.cost"), L<string>(item, "cost") ?? ""),
        textSection("💡", t("ui.lesson"), L<string>(item, "lesson") ?? ""),
      ]),
      related: relatedButtons(item.related, "m-bubbles"),
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
