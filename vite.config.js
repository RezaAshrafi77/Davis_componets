import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [
        tailwindcss(),
        autoprefixer(),
        cssnano({ preset: "default" }), // Minify the final CSS
      ],
    },
  },
  define: {
    global: "window", // Fix for draft-js
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "./src/main.js"),
      name: "ReactElementsDavis",
      formats: ["es", "cjs"],
      fileName: (format) => `main.${format}.js`,
    },
    target: "esnext", // Target modern JavaScript for smaller and faster bundles
    minify: "esbuild", // Ensure minification
    // sourcemap: true, // Generate source maps for better debugging in production
    cssCodeSplit: true, // Ensure CSS is not split into chunks
    // emptyOutDir: false, // Prevent clearing the dist folder
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
