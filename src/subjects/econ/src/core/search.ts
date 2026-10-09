// econ 本地 search 已统一迁移至共享层 src/core/ui/search（依赖反转版）。
// 保留本文件作为 re-export 薄壳，避免改动 main.ts 的 import 路径。
export { initSearch } from '../../../../core/ui/search';
export type { SearchEntry, SearchController, InitSearchOpts } from '../../../../core/ui/search';
