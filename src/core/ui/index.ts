/** 共享学科 UI 层统一出口。各学科 `import { ... } from '../../../core/ui'`。 */
export * from './ui';
export { initSearch } from './search';
export type { SearchEntry, SearchController, InitSearchOpts } from './search';
export * from './dom';
