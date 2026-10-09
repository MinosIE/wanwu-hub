/**
 * 共享数据加载层（依赖反转版）。
 * ------------------------------------------------------------
 * 各学科数据目录不同（econ-data / physics-data …），由学科在 boot 时
 * 通过 setDataBase 注入自身基础路径；缓存按「base|file」隔离，
 * 避免同包内多学科学术共享模块实例时的键冲突。
 */

const cache = new Map<string, unknown>();
let base = '';

export function setDataBase(b: string): void {
  base = b;
}

export async function fetchData<T>(file: string): Promise<T> {
  const key = `${base}|${file}`;
  if (cache.has(key)) return cache.get(key) as T;
  const res = await fetch(base + file, { credentials: 'same-origin' });
  if (!res.ok) throw new Error(`加载 ${base}${file} 失败：HTTP ${res.status}`);
  const json = (await res.json()) as T;
  cache.set(key, json);
  return json;
}

/** 已缓存则同步返回，避免二次渲染时的请求抖动。 */
export function peekData<T>(file: string): T | undefined {
  return cache.get(`${base}|${file}`) as T | undefined;
}
