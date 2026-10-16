/**
 * 全局「顶部细进度条」：为所有需要等待的异步交互（学科 / 路由切换、模块数据
 * 懒加载等）提供统一、非遮挡的反馈。引用计数驱动、支持并发；仅在操作超过
 * SHOW_DELAY 仍未完成时才淡入，避免瞬时命中缓存 / 同步渲染时的无谓闪烁。
 *
 * 设计要点：
 *  - 不接管布局（position:fixed + pointer-events:none），盖在顶栏之上；
 *  - 颜色取全局 --teal / --accent，自动跟随明暗主题；
 *  - prefers-reduced-motion 下退化为一条静态渐变色条（不做滑动动画）。
 */

const SHOW_DELAY = 140; // ms：短于此的异步不显示进度条（避免瞬时操作闪一下）
const MIN_VISIBLE = 260; // ms：一旦显示至少停留这么久，避免一闪而过
const HIDE_GRACE = 80; // ms：计数归零后再等这么久，若期间有新异步则续用

let count = 0;
let bar: HTMLDivElement | null = null;
let showTimer = 0;
let hideTimer = 0;
let shownAt = 0;

function ensureBar(): HTMLDivElement {
  if (bar) return bar;
  const el = document.createElement("div");
  el.className = "route-progress";
  el.setAttribute("aria-hidden", "true");
  document.body.appendChild(el);
  bar = el;
  return el;
}

function reveal(): void {
  ensureBar().classList.add("active");
  shownAt = performance.now();
}

function isShown(): boolean {
  return !!bar && bar.classList.contains("active");
}

/** 标记一个异步操作开始；与 endProgress 成对调用。 */
export function beginProgress(): void {
  count++;
  if (count > 1) return; // 已在进行中：无需重排显示定时器
  window.clearTimeout(hideTimer);
  showTimer = window.setTimeout(reveal, SHOW_DELAY);
}

/** 标记一个异步操作结束；计数归零后淡出。 */
export function endProgress(): void {
  if (count > 0) count--;
  if (count > 0) return; // 仍有并发的异步未完成，保持显示
  window.clearTimeout(showTimer); // 还没到显示阈值就结束了：取消
  if (!isShown()) return;
  const remain = Math.max(0, MIN_VISIBLE - (performance.now() - shownAt));
  window.clearTimeout(hideTimer);
  hideTimer = window.setTimeout(() => {
    // 宽限期内若有新异步开始（count 又 >0），撤销本次隐藏。
    if (count > 0) return;
    bar?.classList.remove("active");
  }, remain + HIDE_GRACE);
}

/** 包裹一个返回 Promise 的任务，自动驱动进度条，透传其结果 / 异常。 */
export function withProgress<T>(task: () => Promise<T>): Promise<T> {
  beginProgress();
  return task().finally(endProgress);
}
