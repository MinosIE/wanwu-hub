/**
 * FULL 学科共享框架层的类型契约（内容以 JSON 为准，这里只描述渲染所需的最小契约）。
 * 由 earth / life / thought / econ 的 core/types.ts 与 modules/types.ts 收敛而来，
 * 学科侧以 re-export shim 指回此处，调用点无需改动。
 */

export type Lang = "zh" | "en";

/** 带 `*En` 双语副本的任意内容对象（英文缺失时渲染层回退中文）。 */
export type LObj = Record<string, unknown>;

export interface SourceRef {
  label: string;
  labelEn?: string;
  year?: number;
  url?: string;
}

/** 详情面板的通用「分区」结构。 */
export interface DetailSection {
  icon?: string;
  title: string;
  /** 已转义的 HTML 片段（内部只由渲染层拼接，不接受外部输入）。 */
  html?: string;
  /** 纯文本行列表（自动加列表标记）。 */
  items?: string[];
}

export interface DetailPayload {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  badge?: string;
  level?: number;
  tags?: string[];
  sections: DetailSection[];
  related?: { label: string; onClick: () => void }[];
  sources?: SourceRef[];
}

/** 派生文件 data/overview.json 的结构。 */
export interface OverviewFile {
  version: string;
  counts: Record<string, number>;
  kpis: { key: string; icon: string; value: number }[];
}

/** 搜索索引条目 data/search.json。 */
export interface SearchEntry {
  /** 目标模块 DOM id，如 m-concepts */
  m: string;
  /** 目标条目 id（用于跳转高亮） */
  id: string;
  /** 类型 i18n key，如 search.t.concept */
  t: string;
  n: string;
  x: string;
  nEn?: string;
  xEn?: string;
}

export interface ThemeMode {
  current: "light" | "dark";
}

/* ---------------- 模块契约（原 modules/types.ts） ---------------- */

export interface ModuleCtx {
  root: HTMLElement;
  openDetail: (payload: DetailPayload) => void;
}

/** 每个模块返回的实例：用于跨模块/搜索跳转时直接打开某条目。 */
export interface ModuleInstance {
  openById?: (id: string) => boolean;
}

export type ModuleRender = (
  ctx: ModuleCtx,
) => Promise<ModuleInstance | void> | ModuleInstance | void;

/** 模块注册表条目：动态 import → Vite 自动切成独立 chunk，首屏只加载入口模块。 */
export interface ModuleDef {
  /** DOM 中的 section id */
  id: string;
  /** i18n 键后缀（nav.<key> / entry.<key>.t / entry.<key>.d） */
  key: string;
  icon: string;
  /** 对应数据文件（供脚本文档与调试使用） */
  file: string;
  priority: 0 | 1 | 2;
  load: () => Promise<{ default: ModuleRender }>;
}

/* ---------------- 应用级能力注入点（避免模块 → main 的循环依赖） ---------------- */

export interface AppApi {
  /** 切换到某个模块（DOM id，如 m-concepts）。 */
  switchModule(id: string): void;
  /** 切到模块并定位/打开某条目（跨模块跳转、搜索跳转、相关条目跳转）。 */
  openTarget(moduleId: string, key: string): void;
  /** 当前模块 id。 */
  currentModule(): string;
}
