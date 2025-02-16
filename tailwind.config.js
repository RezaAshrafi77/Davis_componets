/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html", // Include your main HTML file
        "./src/**/*.{js,jsx,ts,tsx}", // Include all JavaScript and JSX/TSX files
    ],
    // eslint-disable-next-line no-undef
    plugins: [],
    // Scan all component files for used classes
    theme: {
        fontFamily: {
            IranSans: ["IranSans"],
        },
        screens: {
            xs: "303px", // Extra Small devices
            md: "672px", // Medium devices
            lg: "952px", // Large devices
            xl: "1160px", // XLarge
        },
        extend: {
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
            keyframes: {
                wiggle: {
                    "0%, 100%": { transform: "rotate(-3deg)" },
                    "50%": { transform: "rotate(3deg)" },
                },
                flipLeft: {
                    "0%": { transform: "translateX(-100%)" },
                    "100%": { transform: "translateX(0%)" },
                },
                flipBottom: {
                    "0%": { transform: "translateY(-100%)" },
                    "100%": { transform: " translateY(0%)" },
                },
                flipTop: {
                    "0%": { transform: "translateY(100%)" },
                    "100%": { transform: " translateY(0%)" },
                },
                flipRight: {
                    "0%": { transform: "translateX(100%)" },
                    "100%": { transform: "translateX(0%)" },
                },
            },
            animation: {
                flipLeft: "flipLeft 0.3s ",
                flipBottom: "flipBottom 0.3s",
                flipTop: "flipTop 0.3s",
                flipRight: "flipRight 0.3s",
            },
        },
    },
}
