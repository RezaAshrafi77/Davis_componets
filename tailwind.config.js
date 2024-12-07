/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        fontFamily: {
            IranSans: ["IranSans"],
        },
        extend: {
            screens: {
                xs: "320px", // Extra Small devices
                sm: "480px", // Small devices
                md: "744px", // Medium devices
                lg: "1025px", // Large devices
                xl: "1440px", // XLarge
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
                green: {
                    DEFAULT: "#02894C",
                },
                red: {
                    DEFAULT: "#960018",
                    error: "#960018",
                },
                gray: {
                    f7: "#f7f7f7",
                    DEFAULT: "#C9C3C3",
                    e7: "#e7e7e7",
                },
                white: {
                    DEFAULT: "#ffffff",
                    light: "#F5FEFF",
                    lighter: "#EEFEFF",
                },
            },
            fontSize: {
                "3xs": "0.5rem", // 8px
                "2xs": "0.625rem", // 10px
            },
            boxShadow: {
                primary: "0px 3px 8px 0px rgb(0 0 0 / 8%)",
                box: "0px 2px 4px rgba(0, 0, 0, 0.15)",
            },
        },
    },
    plugins: [],
}
