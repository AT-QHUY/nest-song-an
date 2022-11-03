/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./src/**/*.{html,js}",
        "./node_modules/tw-elements/dist/js/**/*.js",
    ],
    theme: {
        extend: {
            colors: {
                "regal-blue": "#00ADB5",
            },
        },
        fontFamily: {
            cur: ['"Brush Script MT"', "cursive"],
            trebu: ['"Trebuchet MS"', "sans-serif"],
            verda: ["Verdana"],
            ds: ['"SVN-Product Sans"'],
        },
    },
    plugins: [require("tw-elements/dist/plugin")],
};
