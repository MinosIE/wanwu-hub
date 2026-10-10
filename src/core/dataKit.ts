/**
 * 学科数据加载层工厂：统一走 Vite 的 BASE_URL，带内存缓存，失败降级为 reject。
 * 各 FULL 学科用 `createDataLoader('<subject>-data/data')` 派生自己的加载器，
 * 避免 earth / life / thought / econ 各自复制同一份 21 行逻辑。
 */
export interface DataLoader {
  dataUrl(file: string): string;
  fetchData<T>(file: string): Promise<T>;
  peekData<T>(file: string): T | undefined;
}

export function createDataLoader(baseDir: string): DataLoader {
  const cache = new Map<string, unknown>();

  function dataUrl(file: string): string {
    return `${import.meta.env.BASE_URL}${baseDir}/${file}`;
  }

  async function fetchData<T>(file: string): Promise<T> {
    if (cache.has(file)) return cache.get(file) as T;
    const res = await fetch(dataUrl(file), { credentials: "same-origin" });
    if (!res.ok) throw new Error(`加载 data/${file} 失败：HTTP ${res.status}`);
    const json = (await res.json()) as T;
    cache.set(file, json);
    return json;
  }

  /** 已缓存则同步返回，避免二次渲染时的请求抖动。 */
  function peekData<T>(file: string): T | undefined {
    return cache.get(file) as T | undefined;
  }

  return { dataUrl, fetchData, peekData };
}
