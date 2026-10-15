import { defineConfig } from "vite";

// 系列统一站部署在 GitHub Pages 子路径 /wanwu-hub/
// 首页 (index.html) 为 SPA 外壳；dynasty / econ / mind 均已内嵌进主应用（不再用 iframe / 独立入口）
export default defineConfig({
  base: "/wanwu-hub/",
  build: {
    target: "es2020",
    outDir: "dist",
    // 关闭 CSS 代码分割：把所有学科样式（含懒加载分块的 tokens/覆盖）合并到入口的单一
    // 样式表，随 index.html 首屏加载。避免从王朝切到其他学科时其专属 CSS 迟到造成
    // 「先出结构再补样式」的闪烁（JS 仍按学科懒加载分块）。
    cssCodeSplit: false,
    rollupOptions: {
      input: {
        main: "index.html",
      },
    },
  },
});
