/**
 * 移动端「模块导航」自定义下拉：窄屏时用吸顶的 .mnav 组件替代会折行的 pill 导航条。
 * 用自绘的按钮 + 弹出列表替代原生 <select>（原生样式与交互在不同系统上观感差）。
 *
 * 用法：
 * - FULL 学科：initMobileNav(root) 从现有 .modnav .mod 按钮派生选项，
 *   选择时点击对应 .mod，复用各学科既有切换逻辑（无需改 activate/setActive）。
 * - 轻量学科（subjectKit）：直接 mountNavDropdown(host, {...})，onSelect 调各自的 selectModule。
 *
 * 仅对被标记 .subject-mnav / .subject-kit 的学科根节点显示，不影响王朝（dynasty）。
 */

const escHtml = (s: string): string =>
  s.replace(
    /[&<>"]/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c] as string,
  );

export type NavOption = { value: string; label: string; icon?: string };

export type NavDropdown = {
  el: HTMLElement;
  setValue: (v: string) => void;
  setItems: (items: NavOption[]) => void;
};

/**
 * 把 host 替换为自定义下拉组件 .mnav。
 * 返回句柄用于外部同步选中项 / 刷新选项文案（如语言切换）。
 */
export function mountNavDropdown(
  host: HTMLElement,
  opts: {
    items: NavOption[];
    value?: string;
    label?: string;
    onSelect: (value: string) => void;
  },
): NavDropdown {
  const wrap = document.createElement("div");
  wrap.className = "mnav";
  host.replaceWith(wrap);
  wrap.innerHTML = `
    <button type="button" class="mnav-btn" aria-haspopup="listbox" aria-expanded="false">
      <span class="mnav-cur"></span>
      <span class="mnav-caret" aria-hidden="true"></span>
    </button>
    <div class="mnav-panel" role="listbox" tabindex="-1" hidden></div>`;

  const btn = wrap.querySelector<HTMLElement>(".mnav-btn")!;
  const cur = wrap.querySelector<HTMLElement>(".mnav-cur")!;
  const panel = wrap.querySelector<HTMLElement>(".mnav-panel")!;
  if (opts.label) btn.setAttribute("aria-label", opts.label);

  let items = opts.items;
  let value = opts.value ?? items[0]?.value ?? "";

  const optInner = (i: NavOption): string =>
    `${i.icon ? `<span class="mnav-ic" aria-hidden="true">${i.icon}</span>` : ""}<span class="mnav-t">${escHtml(i.label)}</span>`;

  const render = (): void => {
    const active = items.find((i) => i.value === value) ?? items[0];
    cur.innerHTML = active ? optInner(active) : "";
    panel.innerHTML = items
      .map(
        (i) =>
          `<button type="button" role="option" class="mnav-opt${i.value === value ? " on" : ""}" data-val="${escHtml(i.value)}" aria-selected="${i.value === value}">${optInner(i)}<span class="mnav-check" aria-hidden="true">✓</span></button>`,
      )
      .join("");
  };
  render();

  const open = (): void => {
    panel.hidden = false;
    wrap.classList.add("open");
    btn.setAttribute("aria-expanded", "true");
    document.addEventListener("pointerdown", onDoc, true);
    document.addEventListener("keydown", onKey, true);
  };
  const close = (focusBtn = false): void => {
    if (panel.hidden) return;
    panel.hidden = true;
    wrap.classList.remove("open");
    btn.setAttribute("aria-expanded", "false");
    document.removeEventListener("pointerdown", onDoc, true);
    document.removeEventListener("keydown", onKey, true);
    if (focusBtn) btn.focus();
  };
  function onDoc(e: Event): void {
    if (!wrap.contains(e.target as Node)) close();
  }
  function onKey(e: KeyboardEvent): void {
    if (e.key === "Escape") {
      e.stopPropagation();
      close(true);
    }
  }

  btn.addEventListener("click", () => {
    if (wrap.classList.contains("open")) close();
    else open();
  });
  panel.addEventListener("click", (e) => {
    const opt = (e.target as HTMLElement).closest<HTMLElement>(".mnav-opt");
    if (!opt) return;
    value = opt.dataset.val as string;
    render();
    close();
    opts.onSelect(value);
  });

  return {
    el: wrap,
    setValue: (v: string) => {
      value = v;
      render();
    },
    setItems: (next: NavOption[]) => {
      items = next;
      render();
    },
  };
}

/**
 * FULL 学科：从学科根节点已有的 .modnav .mod 按钮派生选项并注入 .mnav。
 */
export function initMobileNav(root: HTMLElement): void {
  const nav = root.querySelector<HTMLElement>(".modnav");
  if (!nav) return;

  const host = document.createElement("div");
  nav.insertAdjacentElement("afterend", host);

  const mods = (): HTMLElement[] => [
    ...nav.querySelectorAll<HTMLElement>(".mod"),
  ];
  const readItems = (): NavOption[] =>
    mods().map((b) => ({
      value: b.dataset.go || "",
      label: (b.textContent || "").trim(),
    }));
  const activeVal = (): string =>
    mods().find((m) => m.classList.contains("active"))?.dataset.go ||
    mods()[0]?.dataset.go ||
    "";

  const handle = mountNavDropdown(host, {
    items: readItems(),
    value: activeVal(),
    label: nav.getAttribute("aria-label") || "模块导航",
    onSelect: (v) => {
      mods()
        .find((m) => m.dataset.go === v)
        ?.click();
      // 把模块内容顶到吸顶导航下方，替代「无论点哪都滚回顶部」。
      requestAnimationFrame(() =>
        root
          .querySelector<HTMLElement>(".module.active")
          ?.scrollIntoView({ behavior: "smooth", block: "start" }),
      );
    },
  });

  // 监听 .modnav：模块切换（class 变化）同步选中态；语言切换重写按钮文案刷新 option 文字。
  const mo = new MutationObserver(() => {
    window.requestAnimationFrame(() => {
      handle.setItems(readItems());
      handle.setValue(activeVal());
    });
  });
  mo.observe(nav, {
    subtree: true,
    childList: true,
    attributes: true,
    attributeFilter: ["class"],
    characterData: true,
  });
}
