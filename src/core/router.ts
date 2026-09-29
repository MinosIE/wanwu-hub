export type Route = { name: "home" } | { name: "subject"; key: string; sub?: string };

export function parse(): Route {
  const raw = location.hash.replace(/^#\/?/, "");
  if (raw.startsWith("subject/")) {
    const rest = raw.slice("subject/".length);
    const [key, sub] = rest.split("/");
    if (key) return { name: "subject", key, sub };
  }
  return { name: "home" };
}

export function navigate(path: string): void {
  location.hash = path;
}

export function onRoute(cb: () => void): void {
  window.addEventListener("hashchange", cb);
}
