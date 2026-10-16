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

const BASE = import.meta.env.BASE_URL;

/** 思想总览图是否已展开（语言切换时需同步按钮文案）。 */
let ovShown = false;

/** 思想学科特有：在首页插入可展开的「思想脉络总览图」。 */
function renderOverview(): void {
  const home = document.getElementById("m-home");
  const refs = document.getElementById("refsBox");
  if (!home || !refs || document.getElementById("ovFig")) return;
  const fig = document.createElement("div");
  fig.className = "ov-fig";
  fig.id = "ovFig";
  fig.innerHTML =
    '<button class="ov-toggle" id="ovToggle" type="button" aria-expanded="false">' +
    '<span class="ov-toggle-t" data-i18n="ov.toggle"></span>' +
    '<span class="ov-toggle-ic" aria-hidden="true">▾</span></button>' +
    '<img class="ov-img" id="ovImg" alt="' +
    esc(i18n.t("ov.alt")) +
    '" loading="lazy" hidden />' +
    '<figcaption class="ov-cap" id="ovCap" data-i18n="ov.cap" hidden></figcaption>';
  home.insertBefore(fig, refs);
  i18n.applyStaticLang();

  const img = need<HTMLImageElement>("#ovImg");
  const cap = need("#ovCap");
  const btn = need("#ovToggle");
  const tEl = btn.querySelector<HTMLElement>(".ov-toggle-t");
  const syncLabel = () => {
    if (tEl)
      tEl.textContent = ovShown
        ? i18n.t("ov.toggleClose")
        : i18n.t("ov.toggle");
  };
  ovShown = false;
  btn.addEventListener("click", () => {
    ovShown = !ovShown;
    if (ovShown && !img.getAttribute("src")) {
      img.src = BASE + "thought-data/thought-overview.png";
    }
    img.hidden = !ovShown;
    cap.hidden = !ovShown;
    btn.classList.toggle("open", ovShown);
    btn.setAttribute("aria-expanded", String(ovShown));
    syncLabel();
  });
}

const { boot, activate, setHistoryUpdate } = createSubjectApp({
  logTag: "[thought]",
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
  hooks: {
    afterRender: renderOverview,
    onLangChangeExtra: () => {
      const ovT = document.querySelector<HTMLElement>("#ovToggle .ov-toggle-t");
      if (ovT)
        ovT.textContent = i18n.t(ovShown ? "ov.toggleClose" : "ov.toggle");
    },
  },
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
