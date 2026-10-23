/**
 * 详情抽屉工厂：由各学科 core/detail.ts 收敛而来。
 * DOM 结构与原 earth detail.ts 完全一致（dsec / detail-head / rel-chips / detail-src），
 * 保证抽屉零视觉变化。root / lastFocus / closeTimer 为实例私有状态，学科 shim 各持一份。
 */

import type { DetailPayload, SourceRef } from "./types";
import { yearText } from "../ui/text";

export interface SubjectDetailDeps {
  esc: (value: unknown) => string;
  need: <T extends HTMLElement = HTMLElement>(
    sel: string,
    root?: ParentNode,
  ) => T;
  t: (key: string, vars?: Record<string, string | number>) => string;
  getLang: () => "zh" | "en";
}

export interface SubjectDetail {
  initDetail(): void;
  openDetail(p: DetailPayload): void;
  closeDetail(): void;
  srcLabel(s: SourceRef): string;
}

export function createSubjectDetail(deps: SubjectDetailDeps): SubjectDetail {
  const { esc, need, t, getLang } = deps;

  let root: HTMLElement;
  let lastFocus: HTMLElement | null = null;
  let closeTimer: number | null = null;

  function levelLabel(level?: number): string {
    if (!level) return "";
    return t(`ui.lvl${level}`);
  }

  /** 来源标签：英文界面优先 labelEn（缺失回退中文），年份括号随语言。
   *  公元前负年份走 yearText（「前 450 年」/「450 BCE」），不再裸出「-450」。图表卡等处可复用。 */
  function srcLabel(s: SourceRef): string {
    const en = getLang() === "en";
    const label = en ? s.labelEn || s.label : s.label;
    const y = yearText(s.year, en);
    const year = y ? (en ? ` (${y})` : `（${y}）`) : "";
    return `${esc(label)}${year}`;
  }

  function sourcesHtml(sources?: SourceRef[]): string {
    if (!sources?.length) return "";
    const items = sources
      .map((s) => {
        const label = srcLabel(s);
        return s.url
          ? `<li><a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${label}</a></li>`
          : `<li>${label}</li>`;
      })
      .join("");
    return `<div class="detail-src"><b>${esc(t("ui.sources"))}</b><ul>${items}</ul></div>`;
  }

  function closeDetail(): void {
    if (!root || root.hidden) return;
    root.classList.remove("open");
    if (closeTimer) clearTimeout(closeTimer);
    closeTimer = window.setTimeout(() => {
      root.hidden = true;
      root.innerHTML = "";
      document.body.classList.remove("no-scroll");
      lastFocus?.focus();
      lastFocus = null;
      closeTimer = null;
    }, 400);
  }

  function openDetail(p: DetailPayload): void {
    if (!root) initDetail();
    if (closeTimer) {
      clearTimeout(closeTimer);
      closeTimer = null;
    }
    root.classList.remove("open");
    lastFocus = (document.activeElement as HTMLElement) ?? null;

    const eyebrow = [p.eyebrow, levelLabel(p.level)]
      .filter(Boolean)
      .join(" · ");
    const tags = p.tags?.length
      ? `<div class="detail-tags">${p.tags.map((x) => `<span class="tag">${esc(x)}</span>`).join("")}</div>`
      : "";
    // 副标题与标题同串时不重复展示（英文态下 L(term) 与 L(termEn) 会撞车）。
    const subtitle = p.subtitle && p.subtitle !== p.title ? p.subtitle : "";

    const body = p.sections
      .map((sec) => {
        const head = `${
          sec.icon
            ? `<span class="dsec-ic" aria-hidden="true">${sec.icon}</span>`
            : ""
        }<span class="dsec-t">${esc(sec.title)}</span>`;
        const content = sec.items?.length
          ? `<ul class="dsec-list">${sec.items.map((i) => `<li>${i}</li>`).join("")}</ul>`
          : sec.html
            ? `<div class="dsec-body">${sec.html}</div>`
            : "";
        return `<section class="dsec"><h4 class="dsec-h">${head}</h4>${content}</section>`;
      })
      .join("");

    root.innerHTML = `
    <div class="detail-backdrop" data-close="1"></div>
    <aside class="detail-panel" role="dialog" aria-modal="true" aria-label="${esc(p.title)}">
      <header class="detail-head">
        <button class="detail-close" type="button" data-close="1" aria-label="${esc(t("ui.close"))}">✕</button>
        ${eyebrow ? `<p class="detail-eyebrow">${esc(eyebrow)}</p>` : ""}
        <h3 class="detail-title">${esc(p.title)}</h3>
        ${subtitle ? `<p class="detail-sub">${esc(subtitle)}</p>` : ""}
        ${p.badge ? `<span class="badge">${esc(p.badge)}</span>` : ""}
        ${tags}
      </header>
      <div class="detail-body">${body}</div>
      ${
        p.related?.length
          ? `<div class="detail-rel"><b>${esc(t("ui.related"))}</b><div class="rel-chips">${p.related
              .map(
                (r, i) =>
                  `<button type="button" class="chip" data-rel="${i}">${esc(r.label)}</button>`,
              )
              .join("")}</div></div>`
          : ""
      }
      ${sourcesHtml(p.sources)}
    </aside>`;

    root.querySelectorAll<HTMLElement>("[data-close]").forEach((node) => {
      node.addEventListener("click", closeDetail);
    });
    root.querySelectorAll<HTMLElement>("[data-rel]").forEach((node) => {
      node.addEventListener("click", () => {
        const idx = Number(node.dataset.rel);
        const target = p.related?.[idx];
        if (!target) return;
        closeDetail();
        target.onClick();
      });
    });

    root.hidden = false;
    document.body.classList.add("no-scroll");
    requestAnimationFrame(() => root.classList.add("open"));
    root.querySelector<HTMLElement>(".detail-panel")?.focus();
  }

  function initDetail(): void {
    root = need("#detailRoot");
    root.hidden = true;
    document.addEventListener("keydown", (ev) => {
      if (ev.key === "Escape") closeDetail();
    });
  }

  return { initDetail, openDetail, closeDetail, srcLabel };
}
