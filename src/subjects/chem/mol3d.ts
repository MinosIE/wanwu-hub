// 化学 3D 分子查看器（试点）：零依赖 Canvas 2D 手绘球棍模型。
// 设计约束：
//  - 不引入任何运行时依赖（全站零依赖），用旋转矩阵 + 弱透视 + 画家算法自行渲染；
//  - 只在模块滚动进视口后才启动 rAF（性能预算），离屏即暂停、销毁即清理；
//  - 无 Canvas / 偏好减少动画时降级为 2D 结构式文字，内容仍可读；
//  - 由 subjectKit 的「自定义模块」钩子（SubjectModule.custom）在 chem 内按需 dynamic-import。
import { getLang } from "../../core/i18n";

interface Atom {
  el: string;
  x: number;
  y: number;
  z: number;
}
interface Bond {
  a: number;
  b: number;
  o: 1 | 2 | 3;
}
interface LStr {
  zh: string;
  en: string;
}
interface Molecule {
  id: string;
  formula: string;
  name: LStr;
  geom: LStr;
  angle: LStr;
  atoms: Atom[];
  bonds: Bond[];
}

// CPK 风格配色 + 球半径（世界单位，用于透视缩放）
const EL: Record<string, { c: string; r: number }> = {
  H: { c: "#f2f4f7", r: 0.3 },
  C: { c: "#414b57", r: 0.46 },
  N: { c: "#3b74e0", r: 0.46 },
  O: { c: "#ff4438", r: 0.46 },
  S: { c: "#e7c64b", r: 0.52 },
};

const T = 0.63; // 甲烷四面体单位缩放
const MOLECULES: Molecule[] = [
  {
    id: "h2o",
    formula: "H₂O",
    name: { zh: "水", en: "Water" },
    geom: { zh: "V 形（角形）", en: "Bent" },
    angle: { zh: "键角约 104.5°", en: "≈104.5°" },
    atoms: [
      { el: "O", x: 0, y: 0, z: 0 },
      { el: "H", x: 0.76, y: 0.59, z: 0 },
      { el: "H", x: -0.76, y: 0.59, z: 0 },
    ],
    bonds: [
      { a: 0, b: 1, o: 1 },
      { a: 0, b: 2, o: 1 },
    ],
  },
  {
    id: "co2",
    formula: "CO₂",
    name: { zh: "二氧化碳", en: "Carbon dioxide" },
    geom: { zh: "直线形", en: "Linear" },
    angle: { zh: "键角 180°", en: "180°" },
    atoms: [
      { el: "C", x: 0, y: 0, z: 0 },
      { el: "O", x: 1.16, y: 0, z: 0 },
      { el: "O", x: -1.16, y: 0, z: 0 },
    ],
    bonds: [
      { a: 0, b: 1, o: 2 },
      { a: 0, b: 2, o: 2 },
    ],
  },
  {
    id: "ch4",
    formula: "CH₄",
    name: { zh: "甲烷", en: "Methane" },
    geom: { zh: "正四面体", en: "Tetrahedral" },
    angle: { zh: "键角约 109.5°", en: "≈109.5°" },
    atoms: [
      { el: "C", x: 0, y: 0, z: 0 },
      { el: "H", x: 1, y: 1, z: 1 },
      { el: "H", x: -1, y: -1, z: 1 },
      { el: "H", x: -1, y: 1, z: -1 },
      { el: "H", x: 1, y: -1, z: -1 },
    ].map((a) => ({ ...a, x: a.x * T, y: a.y * T, z: a.z * T })),
    bonds: [
      { a: 0, b: 1, o: 1 },
      { a: 0, b: 2, o: 1 },
      { a: 0, b: 3, o: 1 },
      { a: 0, b: 4, o: 1 },
    ],
  },
  {
    id: "nh3",
    formula: "NH₃",
    name: { zh: "氨", en: "Ammonia" },
    geom: { zh: "三角锥形", en: "Trigonal pyramidal" },
    angle: { zh: "键角约 107°", en: "≈107°" },
    atoms: [
      { el: "N", x: 0, y: 0, z: 0.13 },
      { el: "H", x: 0.94, y: 0, z: -0.28 },
      { el: "H", x: -0.47, y: 0.81, z: -0.28 },
      { el: "H", x: -0.47, y: -0.81, z: -0.28 },
    ],
    bonds: [
      { a: 0, b: 1, o: 1 },
      { a: 0, b: 2, o: 1 },
      { a: 0, b: 3, o: 1 },
    ],
  },
  {
    id: "c2h4",
    formula: "C₂H₄",
    name: { zh: "乙烯", en: "Ethene" },
    geom: { zh: "平面形（含 C=C 双键）", en: "Planar (C=C)" },
    angle: { zh: "键角约 120°", en: "≈120°" },
    atoms: [
      { el: "C", x: -0.67, y: 0, z: 0 },
      { el: "C", x: 0.67, y: 0, z: 0 },
      { el: "H", x: -1.25, y: 0.93, z: 0 },
      { el: "H", x: -1.25, y: -0.93, z: 0 },
      { el: "H", x: 1.25, y: 0.93, z: 0 },
      { el: "H", x: 1.25, y: -0.93, z: 0 },
    ],
    bonds: [
      { a: 0, b: 1, o: 2 },
      { a: 0, b: 2, o: 1 },
      { a: 0, b: 3, o: 1 },
      { a: 1, b: 4, o: 1 },
      { a: 1, b: 5, o: 1 },
    ],
  },
  {
    id: "c6h6",
    formula: "C₆H₆",
    name: { zh: "苯", en: "Benzene" },
    geom: { zh: "平面正六边形（大 π 键）", en: "Planar hexagon" },
    angle: { zh: "键角 120°", en: "120°" },
    atoms: (() => {
      const arr: Atom[] = [];
      for (let i = 0; i < 6; i++) {
        const ang = (Math.PI / 3) * i;
        arr.push({
          el: "C",
          x: 1.4 * Math.cos(ang),
          y: 1.4 * Math.sin(ang),
          z: 0,
        });
      }
      for (let i = 0; i < 6; i++) {
        const ang = (Math.PI / 3) * i;
        arr.push({
          el: "H",
          x: 2.48 * Math.cos(ang),
          y: 2.48 * Math.sin(ang),
          z: 0,
        });
      }
      return arr;
    })(),
    bonds: [
      { a: 0, b: 1, o: 2 },
      { a: 1, b: 2, o: 1 },
      { a: 2, b: 3, o: 2 },
      { a: 3, b: 4, o: 1 },
      { a: 4, b: 5, o: 2 },
      { a: 5, b: 0, o: 1 },
      { a: 0, b: 6, o: 1 },
      { a: 1, b: 7, o: 1 },
      { a: 2, b: 8, o: 1 },
      { a: 3, b: 9, o: 1 },
      { a: 4, b: 10, o: 1 },
      { a: 5, b: 11, o: 1 },
    ],
  },
];

const pick = (o: LStr): string => (getLang() === "en" ? o.en : o.zh);

let styleDone = false;
function ensureStyle(): void {
  if (styleDone || document.getElementById("mol3d-style")) {
    styleDone = true;
    return;
  }
  const el = document.createElement("style");
  el.id = "mol3d-style";
  el.textContent = `
.chem-root .mol3d-root{display:grid;gap:12px;--m3d-line:rgba(120,140,170,.32)}
.chem-root .m3d-stage{position:relative;border:1px solid var(--m3d-line);border-radius:14px;background:linear-gradient(160deg,#0e1c28,#0a131b);overflow:hidden}
.chem-root .m3d-canvas{display:block;width:100%;height:340px;touch-action:none;cursor:grab}
.chem-root .m3d-canvas:active{cursor:grabbing}
.chem-root .m3d-tilt{position:absolute;left:12px;top:10px;font-size:12px;color:#9fb3c8;pointer-events:none}
.chem-root .m3d-toolbar{position:absolute;right:10px;top:10px;display:flex;gap:6px}
.chem-root .m3d-btn{font-size:12px;padding:6px 10px;border-radius:8px;border:1px solid rgba(255,255,255,.18);background:rgba(255,255,255,.08);color:#e6eef5;cursor:pointer}
.chem-root .m3d-btn:hover{background:rgba(255,255,255,.16)}
.chem-root .m3d-chips{display:flex;flex-wrap:wrap;gap:8px}
.chem-root .m3d-chip{font-size:13px;padding:7px 12px;border-radius:999px;border:1px solid var(--m3d-line);background:transparent;color:inherit;cursor:pointer}
.chem-root .m3d-chip.on{color:#fff;background:var(--brand);border-color:var(--brand);font-weight:700}
.chem-root .m3d-name{font-size:15px;font-weight:700}
.chem-root .m3d-facts{font-size:13px;opacity:.85;margin-top:2px}
.chem-root .m3d-legend{display:flex;flex-wrap:wrap;gap:10px;margin-top:8px;font-size:12px}
.chem-root .m3d-legend i{display:inline-block;width:12px;height:12px;border-radius:50%;margin-right:4px;vertical-align:-1px;border:1px solid rgba(0,0,0,.2)}
.chem-root .m3d-2d{font-size:13px;margin-top:6px}
.chem-root .m3d-2d summary{cursor:pointer;opacity:.8}
.chem-root .m3d-2d .f2d{font-size:16px;letter-spacing:.5px;margin:6px 0}
.chem-root .m3d-note{font-size:12px;opacity:.6;margin-top:2px}
`;
  document.head.appendChild(el);
  styleDone = true;
}

const disposals = new WeakMap<HTMLElement, () => void>();

/** 供 subjectKit 自定义模块钩子调用：在给定容器内挂载 3D 查看器。 */
export function mount(grid: HTMLElement): void {
  disposals.get(grid)?.();
  ensureStyle();

  const cur = MOLECULES[0];
  grid.innerHTML = `
    <div class="mol3d-root">
      <div class="m3d-stage">
        <canvas class="m3d-canvas" role="img" aria-label="3D molecule model"></canvas>
        <div class="m3d-tilt">${
          getLang() === "en"
            ? "Drag to rotate · scroll to zoom"
            : "拖动旋转 · 滚轮缩放"
        }</div>
        <div class="m3d-toolbar">
          <button class="m3d-btn" data-act="spin" type="button"></button>
          <button class="m3d-btn" data-act="reset" type="button">${
            getLang() === "en" ? "Reset" : "复位"
          }</button>
          <button class="m3d-btn" data-act="out" type="button" aria-label="zoom out">－</button>
          <button class="m3d-btn" data-act="in" type="button" aria-label="zoom in">＋</button>
        </div>
      </div>
      <div class="m3d-chips">
        ${MOLECULES.map(
          (m) =>
            `<button class="m3d-chip${
              m.id === cur.id ? " on" : ""
            }" type="button" data-id="${m.id}">${m.formula}</button>`,
        ).join("")}
      </div>
      <div class="m3d-info"></div>
      <p class="m3d-note">${
        getLang() === "en"
          ? "A schematic model to aid spatial understanding; bond lengths/angles are approximate and scaled, not exact crystallographic data."
          : "为帮助空间理解而作的示意模型；键长 / 键角经近似与缩放，非精确晶体数据。"
      }</p>
    </div>`;

  const root = grid.querySelector<HTMLElement>(".mol3d-root")!;
  const canvas = root.querySelector<HTMLCanvasElement>(".m3d-canvas")!;
  const info = root.querySelector<HTMLElement>(".m3d-info")!;
  const spinBtn = root.querySelector<HTMLElement>('[data-act="spin"]')!;

  const reduce =
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
  const state = {
    mol: cur,
    rotX: -0.35,
    rotY: 0.6,
    baseRotX: -0.35, // 自转摆动中心（拖拽 / 复位会更新它）
    spinT: 0,
    zoom: 1,
    spin: !reduce,
    dragging: false,
    raf: 0,
    running: false,
  };

  // 2D 兜底（无 canvas 上下文时）
  const ctx = canvas.getContext("2d");
  const renderInfo = (): void => {
    const m = state.mol;
    const els = Array.from(new Set(m.atoms.map((a) => a.el)));
    const bondsText = m.bonds
      .map((b) => {
        const mark = b.o === 2 ? "=" : b.o === 3 ? "≡" : "–";
        return `${m.atoms[b.a].el}${mark}${m.atoms[b.b].el}`;
      })
      .filter((v, i, arr) => arr.indexOf(v) === i)
      .join(" · ");
    info.innerHTML = `
      <div class="m3d-name">${m.formula} · ${pick(m.name)}</div>
      <div class="m3d-facts">${pick(m.geom)} · ${pick(m.angle)}</div>
      <div class="m3d-legend">${els
        .map(
          (e) =>
            `<span><i style="background:${EL[e]?.c ?? "#999"}"></i>${e}</span>`,
        )
        .join("")}</div>
      <details class="m3d-2d"><summary>${
        getLang() === "en" ? "2D structure" : "结构式（2D）"
      }</summary>
        <div class="f2d">${m.formula}</div>
        <div>${bondsText}</div>
      </details>`;
  };

  const setSpin = (): void => {
    spinBtn.textContent = state.spin
      ? getLang() === "en"
        ? "⏸ Spin"
        : "⏸ 自转"
      : getLang() === "en"
        ? "▶ Spin"
        : "▶ 自转";
  };

  const select = (id: string): void => {
    state.mol = MOLECULES.find((m) => m.id === id) ?? state.mol;
    grid
      .querySelectorAll<HTMLElement>(".m3d-chip")
      .forEach((c) => c.classList.toggle("on", c.dataset.id === id));
    renderInfo();
    if (!state.running) draw();
  };

  if (!ctx) {
    canvas.style.display = "none";
    root.querySelector<HTMLElement>(".m3d-tilt")!.style.display = "none";
    root.querySelector<HTMLElement>(".m3d-toolbar")!.style.display = "none";
  }

  function project(m: Molecule): {
    pts: { sx: number; sy: number; r: number; z: number; el: string }[];
    seg: {
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      r1: number;
      r2: number;
      z: number;
      o: number;
    }[];
    w: number;
    h: number;
    fit: number;
  } {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (canvas.width !== Math.round(w * dpr))
      canvas.width = Math.round(w * dpr);
    if (canvas.height !== Math.round(h * dpr))
      canvas.height = Math.round(h * dpr);
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    // 以质心为原点
    const cx = m.atoms.reduce((s, a) => s + a.x, 0) / m.atoms.length;
    const cy = m.atoms.reduce((s, a) => s + a.y, 0) / m.atoms.length;
    const cz = m.atoms.reduce((s, a) => s + a.z, 0) / m.atoms.length;
    let ext = 0.001;
    for (const a of m.atoms) {
      const d = Math.hypot(a.x - cx, a.y - cy, a.z - cz);
      if (d > ext) ext = d;
    }
    const base = (Math.min(w, h) * 0.34) / ext;
    const cam = ext * 3.4;
    const cosX = Math.cos(state.rotX);
    const sinX = Math.sin(state.rotX);
    const cosY = Math.cos(state.rotY);
    const sinY = Math.sin(state.rotY);
    const to = (a: Atom) => {
      const x = a.x - cx;
      const y = a.y - cy;
      const z = a.z - cz;
      // 绕 Y 再绕 X
      const x1 = x * cosY - z * sinY;
      const z1 = x * sinY + z * cosY;
      const y1 = y * cosX - z1 * sinX;
      const z2 = y * sinX + z1 * cosX;
      const p = cam / (cam - z2);
      return {
        sx: w / 2 + x1 * p * base * state.zoom,
        sy: h / 2 - y1 * p * base * state.zoom,
        r: (EL[a.el]?.r ?? 0.4) * base * p * state.zoom * 1.3,
        z: z2,
        el: a.el,
      };
    };
    const pts = m.atoms.map(to);
    const seg = m.bonds.map((b) => {
      const A = pts[b.a];
      const B = pts[b.b];
      return {
        x1: A.sx,
        y1: A.sy,
        x2: B.sx,
        y2: B.sy,
        r1: A.r,
        r2: B.r,
        z: (A.z + B.z) / 2,
        o: b.o,
      };
    });
    return { pts, seg, w, h, fit: base };
  }

  function draw(): void {
    if (!ctx) return;
    const { pts, seg, w, h } = project(state.mol);
    ctx.clearRect(0, 0, w, h);
    const items: { z: number; render: () => void }[] = [];
    for (const s of seg) {
      items.push({
        z: s.z,
        render: () => {
          const dx = s.x2 - s.x1;
          const dy = s.y2 - s.y1;
          const len = Math.hypot(dx, dy) || 1;
          const ux = dy / len;
          const uy = -dx / len;
          const offs = s.o === 1 ? [0] : s.o === 2 ? [-3, 3] : [-5, 0, 5];
          ctx.lineCap = "round";
          ctx.strokeStyle = "rgba(196,208,222,.85)";
          ctx.lineWidth = Math.max(2, (s.r1 + s.r2) * 0.22);
          for (const o of offs) {
            ctx.beginPath();
            ctx.moveTo(s.x1 + ux * o, s.y1 + uy * o);
            ctx.lineTo(s.x2 + ux * o, s.y2 + uy * o);
            ctx.stroke();
          }
        },
      });
    }
    for (const p of pts) {
      items.push({
        z: p.z,
        render: () => {
          const g = ctx.createRadialGradient(
            p.sx - p.r * 0.35,
            p.sy - p.r * 0.35,
            p.r * 0.1,
            p.sx,
            p.sy,
            p.r,
          );
          const c = EL[p.el]?.c ?? "#999";
          g.addColorStop(0, "rgba(255,255,255,.92)");
          g.addColorStop(0.25, c);
          g.addColorStop(1, shade(c));
          ctx.beginPath();
          ctx.fillStyle = g;
          ctx.arc(p.sx, p.sy, p.r, 0, Math.PI * 2);
          ctx.fill();
          if (p.el !== "H" && p.r > 9) {
            ctx.fillStyle =
              p.el === "C" || p.el === "N" || p.el === "O"
                ? "rgba(255,255,255,.92)"
                : "rgba(20,25,32,.9)";
            ctx.font = `${Math.round(p.r * 0.9)}px ui-sans-serif,system-ui`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(p.el, p.sx, p.sy);
          }
        },
      });
    }
    items.sort((a, b) => a.z - b.z);
    for (const it of items) it.render();
  }

  const loop = (): void => {
    if (state.dragging || !state.spin) return;
    // 双轴轻 tumble：rotY 匀速自转，rotX 绕中心缓慢摆动，
    // 使平面型分子（苯 / 乙烯）始终朝观察者倾斜，不会转到侧视成一条线。
    state.spinT += 1;
    state.rotY += 0.006;
    state.rotX = state.baseRotX + Math.sin(state.spinT * 0.02) * 0.5;
    draw();
  };

  const start = (): void => {
    if (state.running || !ctx) return;
    state.running = true;
    state.raf = window.setInterval(loop, 16);
  };
  const stop = (): void => {
    state.running = false;
    if (state.raf) window.clearInterval(state.raf);
    state.raf = 0;
  };

  // 事件
  const onChip = (e: Event): void => {
    const t = (e.target as HTMLElement).closest<HTMLElement>(".m3d-chip");
    if (t?.dataset.id) select(t.dataset.id);
  };
  const onTool = (e: Event): void => {
    const t = (e.target as HTMLElement).closest<HTMLElement>(".m3d-btn");
    if (!t) return;
    const a = t.dataset.act;
    if (a === "spin") {
      state.spin = !state.spin;
      setSpin();
    } else if (a === "reset") {
      state.rotX = -0.35;
      state.rotY = 0.6;
      state.baseRotX = -0.35;
      state.zoom = 1;
      draw();
    } else if (a === "in") {
      state.zoom = Math.min(2.2, state.zoom * 1.2);
      draw();
    } else if (a === "out") {
      state.zoom = Math.max(0.5, state.zoom / 1.2);
      draw();
    }
  };
  let px = 0;
  let py = 0;
  const onDown = (e: PointerEvent): void => {
    state.dragging = true;
    px = e.clientX;
    py = e.clientY;
    canvas.setPointerCapture?.(e.pointerId);
  };
  const onMove = (e: PointerEvent): void => {
    if (!state.dragging) return;
    state.rotY += (e.clientX - px) * 0.01;
    state.rotX += (e.clientY - py) * 0.01;
    px = e.clientX;
    py = e.clientY;
    draw();
  };
  const onUp = (): void => {
    state.dragging = false;
    state.baseRotX = state.rotX; // 以拖拽结束的角度为新的摆动中心
  };
  const onWheel = (e: WheelEvent): void => {
    if (!ctx) return;
    e.preventDefault();
    state.zoom = Math.max(
      0.5,
      Math.min(2.2, state.zoom * (e.deltaY < 0 ? 1.1 : 0.9)),
    );
    draw();
  };

  const onClick = (e: Event): void => {
    onChip(e);
    onTool(e);
  };
  root.addEventListener("click", onClick);
  if (ctx) {
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);
    canvas.addEventListener("wheel", onWheel, { passive: false });
  }

  setSpin();
  renderInfo();
  draw();

  // 仅在可见时运行自转 rAF（性能预算）
  let io: IntersectionObserver | null = null;
  if (ctx && "IntersectionObserver" in window) {
    io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          if (en.isIntersecting) {
            draw(); // 模块刚显示时容器尺寸才有效，先补绘一帧（兜住关闭自转的情况）
            if (state.spin) start();
          } else stop();
        }
      },
      { threshold: 0.05 },
    );
    io.observe(root);
  } else if (ctx) {
    start();
  }

  disposals.set(grid, () => {
    io?.disconnect();
    stop();
    root.removeEventListener("click", onClick);
    if (ctx) {
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
      canvas.removeEventListener("wheel", onWheel);
    }
  });
}

// 简单变暗，用于球体边缘阴影
function shade(hex: string): string {
  const n = hex.replace("#", "");
  const r = Math.round((parseInt(n.slice(0, 2), 16) || 0) * 0.5);
  const g = Math.round((parseInt(n.slice(2, 4), 16) || 0) * 0.5);
  const b = Math.round((parseInt(n.slice(4, 6), 16) || 0) * 0.5);
  return `rgb(${r},${g},${b})`;
}
