/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background) / <alpha-value>)",
        card: "rgb(var(--card) / <alpha-value>)",
        ink: "rgb(var(--text-ink) / <alpha-value>)",
        brand: {
          DEFAULT: "#799f0c", // Olive Green
          dark: "#5a7809",
          light: "rgb(var(--border-subtle) / <alpha-value>)",
        },
        accent: "#ffe000", // Yellow
      },
      borderRadius: {
        squircle: "1.25rem",
      },
    },
  },
  plugins: [],
};
