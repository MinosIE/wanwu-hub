/**
 * 应用级能力注入点（服务定位器）：避免模块 → main 的循环依赖。
 * 由 earth / life / thought / econ 的 core/app.ts 收敛而来。
 * 内嵌模式下同一时刻只有一个学科挂载，boot 时会重新 provideApp，故共享单例安全。
 */

import type { AppApi } from "./types";

export type { AppApi };

let api: AppApi | null = null;

export function provideApp(next: AppApi): void {
  api = next;
}

export function app(): AppApi {
  if (!api) throw new Error("[subject] AppApi 尚未初始化");
  return api;
}
