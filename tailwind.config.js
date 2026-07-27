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
          DEFAULT: "#334155", // Slate Gray
          dark: "#1E293B",    // Dark Slate
          light: "rgb(var(--border-subtle) / <alpha-value>)",
        },
        accent: "#D2B48C", // Sand Beige
      },
      borderRadius: {
        squircle: "1.25rem",
      },
    },
  },
  plugins: [],
};
