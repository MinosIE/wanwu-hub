// econ 本地 ui 助手已统一迁移至共享层 src/core/ui（i18n 通过 setI18n 注入）。
// 保留本文件作为 re-export 薄壳，避免改动各模块的 import 路径。
export * from '../../../../core/ui';
