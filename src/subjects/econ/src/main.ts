import "./styles/index.css";

import { setI18n } from "../../../core/ui";
import { setDataBase } from "../../../core/ui/data";
import { createSubjectApp } from "../../../core/subject/appKit";
import { fetchData } from "./core/data";
import { initDetail, openDetail } from "./core/detail";
import { esc, need } from "./core/dom";
import * as i18n from "./core/i18n";
import { preloadRelated } from "./core/related";
import { initSearch } from "./core/search";
import { initTheme } from "./core/theme";
import { MODULES, moduleByKey } from "./modules";

const BASE = import.meta.env.BASE_URL;

const { boot, activate, setHistoryUpdate } = createSubjectApp({
  logTag: "[econ]",
  modules: MODULES,
  moduleByKey,
  i18n,
  fetchData,
  esc,
  need,
  initDetail,
  openDetail,
  // econ 的搜索走共享 ui/search（依赖反转版，选项对象入参）
  initSearch: (onPick) => initSearch({ onPick }),
  initTheme,
  preloadRelated,
  mail: { user: "417913012", domain: "qq.com" },
  hooks: {
    // econ 模块复用共享 ui 层，boot 早期注入 i18n 与数据基路径
    beforeInit: () => {
      setI18n(i18n.t, i18n.L, i18n.getLang);
      setDataBase(`${BASE}econ-data/data/`);
    },
  },
});

export { boot, activate, setHistoryUpdate };

// 仅在独立运行（econ.html）时自动启动；被主应用内嵌时由 index.ts 显式 boot(root)。
if (!document.getElementById("app")) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => boot());
  } else {
    boot();
  }
}
