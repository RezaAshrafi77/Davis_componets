export default {
    plugins: {
        // tailwindcss: {},
        autoprefixer: {},
        cssnano: { preset: "default" },
        "postcss-url": {
            url: "copy", // Copies assets to the output folder
            useHash: true, // Adds a hash to the filename for cache busting
            assetsPath: "assets", // Destination folder for assets in the output
        },
    },
}
