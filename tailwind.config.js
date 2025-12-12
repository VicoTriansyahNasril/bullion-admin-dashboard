/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#FD5725",
                secondary: "#2E74B2",
                dark: "#231F20",
                light: "#F1F3FC",
                success: "#E8F5E9",
                successText: "#2E7D32",
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                header: ['Montserrat', 'sans-serif'],
            }
        },
    },
    plugins: [],
}