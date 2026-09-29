import { getLang, onLangChange } from "../core/i18n";
import { PROJECTS } from "../core/projects";

export function mount(view: HTMLElement, p?: (typeof PROJECTS)[number]): void {
  const render = () => {
    const lang = getLang();
    const title = p ? (lang === "en" ? p.en : p.zh) : "";
    const line1 =
      lang === "en"
        ? "This subject is being migrated into the unified hub."
        : "该学科正在迁入万物通识统一站。";
    const line2 =
      lang === "en"
        ? "It will be browsable here once integration is complete."
        : "接入完成后即可在此直接浏览。";
    view.innerHTML = `
      <div class="soon-wrap">
        <div style="font-size:2.4rem;margin-bottom:12px">${p ? p.emoji : "🚧"}</div>
        ${title ? `<h2>${title}</h2>` : ""}
        <p>${line1}</p>
        <p>${line2}</p>
        ${
          p?.siteUrl
            ? `<p style="margin-top:16px"><a class="gh-link" href="${p.siteUrl}" target="_blank" rel="noopener">${
                lang === "en" ? "Visit original site ↗" : "访问原站点 ↗"
              }</a></p>`
            : ""
        }
      </div>`;
  };
  render();
  onLangChange(render);
}
