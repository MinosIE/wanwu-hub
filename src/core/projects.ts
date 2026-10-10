import subjects from "./subjects.json";

export interface Project {
  key: string;
  emoji: string;
  zh: string;
  en: string;
  subZh: string;
  subEn: string;
  descZh: string;
  descEn: string;
  repo: string;
  line: "timeline" | "everything";
  /** 在 wanwu 统一站内是否已接入可浏览的内容 */
  integrated: boolean;
  siteUrl?: string;
  repoUrl?: string;
  statusZh: "online" | "first" | "soon" | "wip";
  statusEn: "online" | "first" | "soon" | "wip";
  tagsZh: string[];
  tagsEn: string[];
}

/**
 * 学科清单的唯一数据源：src/core/subjects.json。
 * 该文件同时被 scripts/gen-sitemap.mjs、scripts/gen-geo.mjs、s/prerender.mjs 读取，
 * 新增/改名只需改 JSON，四处自动一致，避免手写清单漂移。
 */
export const PROJECTS: Project[] = subjects as Project[];

export function statusLabel(p: Project, lang: "zh" | "en"): string {
  const key = lang === "zh" ? p.statusZh : p.statusEn;
  const map: Record<string, string> = {
    online: lang === "zh" ? "已上线" : "Online",
    first: lang === "zh" ? "系列首作" : "First Work",
    soon: lang === "zh" ? "敬请期待" : "Coming Soon",
    wip: lang === "zh" ? "接入中" : "Integrating",
  };
  return map[key] || key;
}
