import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js"

export default defineConfig({
    plugins: [react(), cssInjectedByJsPlugin()],
    build: {
        lib: {
            entry: path.resolve(__dirname, "./src/main.js"),
            name: "ReactElementsDavis",
            formats: ["es", "cjs"],
            fileName: (format) => `main.${format}.js`,
        },
        rollupOptions: {
            external: ["react", "react-dom"],
            output: {
                globals: {
                    react: "React",
                    "react-dom": "ReactDOM",
                },
            },
        },
    },
})
