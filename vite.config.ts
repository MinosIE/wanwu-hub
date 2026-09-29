import { defineConfig } from "vite";

// 系列统一站部署在 GitHub Pages 子路径 /wanwu-hub/
// 首页 (index.html) 为 SPA 外壳；dynasty.html / econ.html / mind.html 为迁入的独立子应用（iframe 嵌入）
export default defineConfig({
  base: "/wanwu-hub/",
  build: {
    target: "es2020",
    outDir: "dist",
    rollupOptions: {
      input: {
        main: "index.html",
        econ: "econ.html",
        mind: "mind.html",
      },
    },
  },
});
