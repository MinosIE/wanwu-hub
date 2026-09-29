// 统一路径层：本文件位于 <wanwu>/scripts/dynasty/paths.mjs
// dynasty 数据已迁入 wanwu，根目录为 <wanwu>/public/dynasty-data/data
// 站点静态资源根目录为 <wanwu>/public
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
export const REPO = path.resolve(HERE, '..', '..');
export const DATA = path.join(REPO, 'public', 'dynasty-data', 'data');
export const PUBLIC = path.join(REPO, 'public');
// 统一站部署在 GitHub Pages 子路径 /wanwu-hub/
export const SITE = 'https://wedo2016.github.io/wanwu-hub/';
