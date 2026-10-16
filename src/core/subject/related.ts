/**
 * 跨模块相关条目工厂：由各学科 core/related.ts 收敛而来。
 * table 为实例私有缓存，学科 shim 各持一份。依赖 fetchData / getLang / app 由 shim 注入。
 */

import type { AppApi } from "./types";

interface RelatedTarget {
  m: string;
  n: string;
  nEn: string;
}

export interface SubjectRelatedDeps {
  fetchData: <T>(file: string) => Promise<T>;
  getLang: () => "zh" | "en";
  app: () => AppApi;
}

export interface SubjectRelated {
  preloadRelated(): Promise<void>;
  relatedChips(
    ids: unknown,
    currentModule: string,
  ): { label: string; onClick: () => void }[];
}

export function createRelated(deps: SubjectRelatedDeps): SubjectRelated {
  const { fetchData, getLang, app } = deps;
  let table: Record<string, RelatedTarget[]> | null = null;

  /** 预取跨模块相关条目索引（体积很小，启动时一次性载入）。 */
  async function preloadRelated(): Promise<void> {
    if (table) return;
    try {
      table = await fetchData<Record<string, RelatedTarget[]>>("related.json");
    } catch {
      table = {};
    }
  }

  /**
   * 把数据里的 related id 列表转换成可点击的相关条目。
   * 同一 id 存在于多个模块时，优先当前模块，其次取首个可用模块。
   */
  function relatedChips(
    ids: unknown,
    currentModule: string,
  ): { label: string; onClick: () => void }[] {
    if (!Array.isArray(ids) || !table) return [];
    const seen = new Set<string>();
    const out: { label: string; onClick: () => void }[] = [];
    for (const raw of ids) {
      const id = String(raw);
      if (seen.has(id)) continue;
      const bucket = table[id];
      if (!bucket?.length) continue;
      const hit = bucket.find((b) => b.m === currentModule) ?? bucket[0];
      seen.add(id);
      out.push({
        label: getLang() === "en" ? hit.nEn || hit.n : hit.n,
        onClick: () => app().openTarget(hit.m, id),
      });
    }
    return out;
  }

  return { preloadRelated, relatedChips };
}
