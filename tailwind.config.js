/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        fontFamily: {
            IranSans: ["IranSans"],
        },
        extend: {
            screens: {
                xs: "303px", // Extra Small devices
                md: "672px", // Medium devices
                lg: "942px", // Large devices
                xl: "1368px", // XLarge
            },
            fontFamily: {
                300: ["IranSans300", "sans-serif"],
                400: ["IranSans400", "sans-serif"],
                500: ["IranSans500", "sans-serif"],
                600: ["IranSans600", "sans-serif"],
                700: ["IranSans700", "sans-serif"],
                800: ["IranSans800", "sans-serif"],
            },
            colors: {
                background: "#faffff",
                error: "#960018",
                success: "#02894C",
                formItem: "#EEFEFF",
                formItem2: "#C7F0FF",
                formItemInput: "#F5FEFF",
                white: {
                    DEFAULT: "#ffffff",
                },
            },
            fontSize: {
                "3xs": "0.5rem", // 8px
                "2xs": "0.625rem", // 10px
            },
            boxShadow: {
                primary: "0px 3px 8px 0px rgb(0 0 0 / 8%)",
                formItem: "0px 2px 4px rgba(0, 0, 0, 0.15)",
            },
            // keyframes: {
            //     flipBottom: {
            //         "0%": { transform: "translateY(-100%)" },
            //         "100%": { transform: " translateY(0%)" },
            //     },
            // },
            // animation: {
            //     flipBottom: "flipBottom",
            // },
        },
    },
    plugins: [],
}
