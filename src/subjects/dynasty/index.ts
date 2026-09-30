import { getLang, onLangChange } from "../../core/i18n";
import { getTheme, onThemeChange } from "../../core/theme";
import "./dynasty.css";
import { TEMPLATE } from "./template";
import { DYNASTY_SCRIPT } from "./logic";

// dynasty 原站是一段自包含脚本（DOM 挂载型，不接管 document）。
// 这里用 new Function 把它注入一个「受限运行环境」：
//   - document -> 定向到 wanwu 的 view 容器
//   - location -> 去掉 hash 深链（wanwu 接管路由）
//   - window   -> 保留真实 window，但拦截 __setLang 暴露给顶栏
//   - localStorage -> 隔离，预置为 wanwu 当前语言
// 原站逻辑保持完整，做到「内容全量迁入、无 iframe、全宽、跟随顶栏语言/主题」。
export async function mount(view: HTMLElement): Promise<() => void> {
  view.classList.add("dynasty-root");
  view.innerHTML = TEMPLATE;

  const realDoc = document;

  const doc: any = new Proxy(realDoc, {
    get(target: any, prop: any) {
      switch (prop) {
        case "getElementById":
          return (id: string) => view.querySelector("#" + id);
        case "querySelector":
          return (s: string) => view.querySelector(s);
        case "querySelectorAll":
          return (s: string) => view.querySelectorAll(s);
        case "addEventListener":
          return (...a: any[]) => view.addEventListener(...a);
        case "documentElement":
          return view;
        case "body":
          return view;
        case "createElement":
        case "createElementNS":
          return (...a: any[]) => target[prop](...a);
        default:
          return target[prop];
      }
    },
    // 必须提供 set 陷阱：否则 Proxy 默认 [[Set]] 会以 Proxy 自身作为 receiver
    // 调用 document 的原生 setter（如 document.title = x），触发
    // "TypeError: Illegal invocation"，使原站脚本 init 中断、内容全空。
    set(target: any, prop: any, value: any) {
      target[prop] = value;
      return true;
    },
  });

  const loc = { hash: "", search: "", href: "" };

  let setLangFn: ((l: string) => void) | null = null;
  const win: any = new Proxy(window, {
    get(target: any, prop: any) {
      if (prop === "__setLang") return setLangFn;
      // scrollTo / scrollBy / scroll 等，以及 addEventListener /
      // removeEventListener / dispatchEvent 都要求 this 为真实 Window；
      // 经 Proxy 调用时 this 会变成代理，触发 "Illegal invocation"，
      // 或导致事件监听挂不到真实 window 上。统一绑定到真实 window。
      if (
        prop === "scrollTo" ||
        prop === "scrollBy" ||
        prop === "scroll" ||
        prop === "addEventListener" ||
        prop === "removeEventListener" ||
        prop === "dispatchEvent"
      ) {
        return (...a: any[]) => (target as any)[prop](...a);
      }
      return target[prop];
    },
    set(target: any, prop: any, value: any) {
      if (prop === "__setLang") {
        setLangFn = value;
        return true;
      }
      target[prop] = value;
      return true;
    },
  });

  const mem: Record<string, string> = { lang: getLang() };
  const localStorageStub: any = {
    getItem: (k: string) => (k in mem ? mem[k] : null),
    setItem: (k: string, v: string) => {
      mem[k] = v;
    },
    removeItem: (k: string) => {
      delete mem[k];
    },
  };

  const runner: any = new Function(
    "document",
    "window",
    "location",
    "localStorage",
    DYNASTY_SCRIPT,
  );
  runner(doc, win, loc, localStorageStub);

  const applyTheme = (t: string) => view.setAttribute("data-theme", t);
  applyTheme(getTheme());

  const offLang = onLangChange((l) => {
    if (setLangFn) setLangFn(l);
  });
  const offTheme = onThemeChange(applyTheme);

  return () => {
    offLang();
    offTheme();
  };
}
