/**
 * 移动端「模块导航下拉」注入器：窄屏时用吸顶的 .modnav-select 替代会折行的 pill 导航条。
 *
 * 设计要点（保持各学科零侵入）：
 * - 选项直接来自现有 .modnav .mod 按钮（value=data-go，文案=按钮 textContent）；
 * - change 时点击对应 .mod 按钮，复用各学科自身的模块切换逻辑，无需改动 activate/setActive；
 * - 通过 MutationObserver 监听 .modnav：模块切换（class 变化）时同步选中态，
 *   语言切换重写按钮文案时自动刷新 option 文字。
 *
 * 仅对被标记 .subject-mnav 的学科根节点生效（thought/life/earth/econ/mind），
 * 不影响轻量学科（.subject-kit）与王朝（dynasty）等其它布局。
 */
export function initMobileNav(root: HTMLElement): void {
  const nav = root.querySelector<HTMLElement>(".modnav");
  if (!nav) return;

  let select = root.querySelector<HTMLSelectElement>(".modnav-select");
  if (!select) {
    const created = document.createElement("select");
    created.className = "modnav-select";
    created.setAttribute(
      "aria-label",
      nav.getAttribute("aria-label") || "模块导航",
    );
    nav.insertAdjacentElement("afterend", created);
    select = created;
  }
  const sel = select;

  const mods = (): HTMLElement[] => [
    ...nav.querySelectorAll<HTMLElement>(".mod"),
  ];

  const fill = (): void => {
    const active = mods().find((m) => m.classList.contains("active"));
    sel.innerHTML = mods()
      .map(
        (b) =>
          `<option value="${b.dataset.go || ""}">${(b.textContent || "").trim()}</option>`,
      )
      .join("");
    sel.value = active?.dataset.go || mods()[0]?.dataset.go || "";
  };
  fill();

  sel.onchange = (): void => {
    const go = sel.value;
    mods()
      .find((m) => m.dataset.go === go)
      ?.click();
    // 把模块内容顶到吸顶导航下方，替代「无论点哪都滚回顶部」。
    requestAnimationFrame(() =>
      root
        .querySelector<HTMLElement>(".module.active")
        ?.scrollIntoView({ behavior: "smooth", block: "start" }),
    );
  };

  const mo = new MutationObserver(() => {
    window.requestAnimationFrame(fill);
  });
  mo.observe(nav, {
    subtree: true,
    childList: true,
    attributes: true,
    attributeFilter: ["class"],
    characterData: true,
  });
}
