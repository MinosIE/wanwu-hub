import type { ModuleRender } from "./types";

export interface ModuleDef {
  /** DOM 中的 section id */
  id: string;
  /** i18n 键后缀（nav.<key> / entry.<key>.t / entry.<key>.d） */
  key: string;
  icon: string;
  /** 对应数据文件（供脚本文档与调试使用） */
  file: string;
  priority: 0 | 1 | 2;
  /** 动态 import → Vite 自动切成独立 chunk，首屏只加载入口模块 */
  load: () => Promise<{ default: ModuleRender }>;
}

export const MODULES: ModuleDef[] = [
  {
    id: "m-schools",
    key: "schools",
    icon: "🌍",
    file: "schools.json",
    priority: 0,
    load: () => import("./schools"),
  },
  {
    id: "m-questions",
    key: "questions",
    icon: "🌦️",
    file: "questions.json",
    priority: 0,
    load: () => import("./questions"),
  },
  {
    id: "m-principles",
    key: "principles",
    icon: "⚙️",
    file: "principles.json",
    priority: 1,
    load: () => import("./principles"),
  },
  {
    id: "m-human-geo",
    key: "humanGeo",
    icon: "🏙️",
    file: "human-geo.json",
    priority: 1,
    load: () => import("./human-geo"),
  },
  {
    id: "m-classics",
    key: "classics",
    icon: "🏔️",
    file: "classics.json",
    priority: 1,
    load: () => import("./classics"),
  },
  {
    id: "m-thinkers",
    key: "thinkers",
    icon: "🧭",
    file: "thinkers.json",
    priority: 1,
    load: () => import("./thinkers"),
  },
  {
    id: "m-glossary",
    key: "glossary",
    icon: "📖",
    file: "glossary.json",
    priority: 2,
    load: () => import("./glossary"),
  },
  {
    id: "m-myths",
    key: "myths",
    icon: "🧯",
    file: "myths.json",
    priority: 2,
    load: () => import("./myths"),
  },
  {
    id: "m-everyday",
    key: "everyday",
    icon: "🌂",
    file: "everyday.json",
    priority: 2,
    load: () => import("./everyday"),
  },
  {
    id: "m-compare",
    key: "compare",
    icon: "🆚",
    file: "compare.json",
    priority: 2,
    load: () => import("./compare"),
  },
  {
    id: "m-quiz",
    key: "quiz",
    icon: "📝",
    file: "quiz.json",
    priority: 2,
    load: () => import("./quiz"),
  },
];

export function moduleByKey(key: string): ModuleDef | undefined {
  return MODULES.find((m) => m.key === key || m.id === key);
}
