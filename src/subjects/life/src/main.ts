import "./styles/index.css";

import { createSubjectApp } from "../../../core/subject/appKit";
import { fetchData } from "./core/data";
import { initDetail, openDetail } from "./core/detail";
import { esc, need } from "./core/dom";
import * as i18n from "./core/i18n";
import { preloadRelated } from "./core/related";
import { initSearch } from "./core/search";
import { initTheme } from "./core/theme";
import { MODULES, moduleByKey } from "./modules";

const { boot, activate, setHistoryUpdate } = createSubjectApp({
  logTag: "[life]",
  modules: MODULES,
  moduleByKey,
  i18n,
  fetchData,
  esc,
  need,
  initDetail,
  openDetail,
  initSearch,
  initTheme,
  preloadRelated,
  mail: { user: "417913012", domain: "qq.com" },
});

export { boot, activate, setHistoryUpdate };

// 仅在独立运行时自动启动；被主应用内嵌时由 index.ts 显式 boot(root)。
if (!document.getElementById("app")) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => boot());
  } else {
    boot();
  }
}
