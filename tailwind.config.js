/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // We use CSS variables so you can change them in globals.css
                primary: "var(--primary)",
                secondary: "#1a1a1a",
                lightbg: "#232323",
            },
            aspectRatio: {
                'poster': '10 / 14', // Custom ratio for anime posters
            },
        },
    },
    plugins: [],
};