import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import autoprefixer from "autoprefixer";

export default defineConfig({
  plugins: [react()],
  define: {
    global: "window", // Fix for draft-js compatibility
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
      },
    },
    postcss: {
      plugins: [autoprefixer()],
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "./src/main.js"),
      name: "ReactElementsDavis",
      formats: ["es", "cjs"],
      fileName: (format) => `main.${format}.js`,
    },
    target: "esnext", // Optimize for modern JavaScript
    minify: "esbuild",
    cssCodeSplit: true, // Ensures CSS is bundled properly
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react-hook-form",
        "classnames",
        "jalali-moment",
        "react-icons",
        "react-draft-wysiwyg",
        "draft-js",
        "html-to-draftjs",
        "draft-js-export-html",
        "react-multi-date-picker",
        "react-date-object",
        "@tailwindcss/typography",
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
