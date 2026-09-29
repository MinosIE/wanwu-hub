import { defineConfig } from "vite";

// 系列统一站部署在 GitHub Pages 子路径 /wanwu-hub/
// 首页 (index.html) 为 SPA 外壳；dynasty / econ / mind 均已内嵌进主应用（不再用 iframe / 独立入口）
export default defineConfig({
  base: "/wanwu-hub/",
  build: {
    target: "es2020",
    outDir: "dist",
    rollupOptions: {
      input: {
        main: "index.html",
        mind: "mind.html",
      },
    },
  },
});
