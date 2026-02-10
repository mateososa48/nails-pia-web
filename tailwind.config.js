/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        pink: "#EB90E4",
        lavender: "#AE9AF7",
        cream: "#FEF3EC",
        black: "#000000",
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
        serif: ["var(--font-manrope)", "system-ui", "sans-serif"],
        display: ["var(--font-ahsing)", "cursive"],
      },
    },
  },
  plugins: [],
};
