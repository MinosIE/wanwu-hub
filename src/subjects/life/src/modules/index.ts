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
    icon: "🧬",
    file: "schools.json",
    priority: 0,
    load: () => import("./schools"),
  },
  {
    id: "m-questions",
    key: "questions",
    icon: "🌿",
    file: "questions.json",
    priority: 0,
    load: () => import("./questions"),
  },
  {
    id: "m-principles",
    key: "principles",
    icon: "🧫",
    file: "principles.json",
    priority: 1,
    load: () => import("./principles"),
  },
  {
    id: "m-classics",
    key: "classics",
    icon: "🐾",
    file: "classics.json",
    priority: 1,
    load: () => import("./classics"),
  },
  {
    id: "m-thinkers",
    key: "thinkers",
    icon: "🔬",
    file: "thinkers.json",
    priority: 1,
    load: () => import("./thinkers"),
  },
  {
    id: "m-endemics",
    key: "endemics",
    icon: "🐼",
    file: "endemics.json",
    priority: 1,
    load: () => import("./endemics"),
  },
];

export function moduleByKey(key: string): ModuleDef | undefined {
  return MODULES.find((m) => m.key === key || m.id === key);
}
