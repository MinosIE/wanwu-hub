// 预渲染脚本：把 hash 路由的 vanilla SPA 渲染成「每学科一个真实静态 HTML」。
// 思路：vite build 产出 dist（SPA 外壳 + 资源），本脚本启动一个按 /wanwu-hub/ 前缀
// 映射到 dist 的静态服务器，用 puppeteer 访问每个学科的 hash URL，等 #view 渲染出
// 内容后抓取整页 HTML，写入 dist/subject/<key>/index.html。
// 每个学科静态文件内联一段脚本：直接访问时自动补上 hash，保证客户端 main.ts 接管后
// 渲染同一页；对不执行 JS 的爬虫也提供可读内容（SEO）。
import { createServer } from "node:http";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, extname, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const DIST = join(ROOT, "dist");
const BASE = "/wanwu-hub"; // 与 vite.config.ts 的 base 一致
const PORT = 4321;

if (!existsSync(DIST)) {
  console.error("[prerender] 未找到 dist/，请先运行 vite build");
  process.exit(1);
}

// 需要预渲染的页面：首页 + 已接入的学科。
// file: 输出到 dist 下的相对路径；url: 本地服务器访问路径（含 hash）；hash: 静态文件直访时补足的 hash。
const ROUTES = [
  { file: "index.html", url: `${BASE}/`, title: "万物通识系列 — 系列入口", hash: null },
  { file: "subject/dynasty/index.html", url: `${BASE}/#/subject/dynasty`, title: "中华王朝 — 万物通识系列", hash: "#/subject/dynasty" },
  { file: "subject/econ/index.html", url: `${BASE}/#/subject/econ`, title: "万物经济学 — 万物通识系列", hash: "#/subject/econ" },
  { file: "subject/mind/index.html", url: `${BASE}/#/subject/mind`, title: "万物心理学 — 万物通识系列", hash: "#/subject/mind" },
  { file: "subject/thought/index.html", url: `${BASE}/#/subject/thought`, title: "万物哲学 — 万物通识系列", hash: "#/subject/thought" },
  { file: "subject/earth/index.html", url: `${BASE}/#/subject/earth`, title: "万物地理 — 万物通识系列", hash: "#/subject/earth" },
  { file: "subject/life/index.html", url: `${BASE}/#/subject/life`, title: "万物生物 — 万物通识系列", hash: "#/subject/life" },
];

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
};

// 把 /wanwu-hub/xxx 映射到 dist/xxx；根与目录回退到 index.html
function resolveDistPath(pathname) {
  let rel = pathname.startsWith(BASE + "/")
    ? pathname.slice(BASE.length)
    : pathname;
  if (rel === "" || rel.endsWith("/")) rel += "index.html";
  const full = join(DIST, rel);
  if (!full.startsWith(DIST)) return null; // 防目录穿越
  return full;
}

function startServer() {
  return new Promise((resolve) => {
    const server = createServer(async (req, res) => {
      try {
        const url = new URL(req.url, `http://localhost:${PORT}`);
        const target = resolveDistPath(url.pathname);
        if (!target || !existsSync(target)) {
          res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
          res.end("Not Found");
          return;
        }
        const buf = await readFile(target);
        res.writeHead(200, {
          "content-type": MIME[extname(target)] || "application/octet-stream",
        });
        res.end(buf);
      } catch (e) {
        res.writeHead(500, { "content-type": "text/plain; charset=utf-8" });
        res.end(String(e));
      }
    });
    server.listen(PORT, () => resolve(server));
  });
}

async function renderRoute(browser, route) {
  const page = await browser.newPage();
  try {
    await page.goto(`http://localhost:${PORT}${route.url}`, {
      waitUntil: "networkidle0",
      timeout: 30000,
    });
    // 等 #view 渲染出内容（mount 是异步的，会拉取 JSON）
    await page.waitForFunction(
      () => {
        const v = document.getElementById("view");
        return v && v.children.length > 0;
      },
      { timeout: 20000 },
    );
    // 给增量渲染一点余量
    await new Promise((r) => setTimeout(r, 300));
    let html = await page.content();

    // 替换标题
    html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${route.title}</title>`);
    // 直接访问静态文件时补足 hash，保证 main.ts 接管后渲染同一页
    if (route.hash) {
      html = html.replace(
        /<head>/i,
        `<head>\n<script>if(!location.hash)history.replaceState(null,'','${route.hash}');</script>`,
      );
    }
    const outPath = join(DIST, route.file);
    await mkdir(dirname(outPath), { recursive: true });
    await writeFile(outPath, html, "utf-8");
    console.log(`[prerender] ✓ ${route.file}`);
  } catch (e) {
    console.warn(`[prerender] ✗ 跳过 ${route.file}：${e.message}`);
  } finally {
    await page.close();
  }
}

// 解析 Chrome 可执行文件：优先环境变量，其次本机常见安装，最后回退到 puppeteer 自带
function resolveChrome() {
  if (process.env.PUPPETEER_EXECUTABLE_PATH) return process.env.PUPPETEER_EXECUTABLE_PATH;
  const candidates = [
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
  ];
  for (const c of candidates) {
    if (existsSync(c)) return c;
  }
  return undefined;
}

async function main() {
  const server = await startServer();
  console.log(`[prerender] 静态服务器已启动 http://localhost:${PORT}${BASE}/`);
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: "new",
      executablePath: resolveChrome(),
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    for (const route of ROUTES) {
      await renderRoute(browser, route);
    }
  } finally {
    if (browser) await browser.close();
    server.close();
  }
  console.log("[prerender] 完成");
}

main().catch((e) => {
  console.error("[prerender] 失败:", e);
  process.exit(1);
});
