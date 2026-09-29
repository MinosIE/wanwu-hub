import './styles/tokens.css';
import './styles/base.css';
import './styles/components.css';

import { initLang, applyStaticLang } from './core/i18n';
import { boot } from './core/app';

initLang();
// 仅在独立运行（mind.html）时自动启动；被主应用内嵌时由 index.ts 显式 boot(root)。
if (!document.getElementById('app')) {
  applyStaticLang();
  void boot();
}
