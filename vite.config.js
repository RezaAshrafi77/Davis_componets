import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

export default defineConfig({
    plugins: [react()],
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
        cssCodeSplit: false, // Separate CSS for better performance
        rollupOptions: {
            external: [
                "react",
                "react-dom",
                "react-hook-form",
                "classnames",
                "jalali-moment",
                "react-icons",
            ],
            output: {
                globals: {
                    react: "React",
                    "react-dom": "ReactDOM",
                },
            },
        },
    },
})
