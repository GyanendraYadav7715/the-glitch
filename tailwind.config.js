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
                brand: {
                    pink: '#FFB6D9',       // From your logo
                    pink,dark: '#CC92AE', // For hover states
            },
            surface: {
                background: '#121212', // Main dark bg
                card: '#1E1E1E',       // Section/Card bg
                input: '#2C2C2C',      // Search bars
            },
            content: {
                main: '#F5F5F5',       // Primary text
                muted: '#A0A0A0',      // Secondary text
            },
            aspectRatio: {
                'poster': '10 / 14', // Custom ratio for anime posters
            },
        },
    },
},
    plugins: [],
};