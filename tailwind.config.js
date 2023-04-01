/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    darkMode: "class",
    theme: {
        screens: {
            md: { max: "991.99px" },
            sm: { max: "767.99px" },
            xs: { max: "479.99px" },
        },
        extend: {
            colors: {
                darkgrey: "#2c2c37",
                black: "#21222d",
                blue: "#645dc6",
                lightblue: "#f4f7ff",
                grey: "#565a69",
                lightgrey: "#e8f0fb",
            },
            borderWidth: {
                1: "1px",
            },
            boxShadow: {
                secondaryTop: "0 -4px 5px #645dc6",
                secondaryBottom: "0 4px 5px #645dc6",
            },
        },
    },
    plugins: [],
};
