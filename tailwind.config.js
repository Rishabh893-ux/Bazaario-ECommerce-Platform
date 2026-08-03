/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        background: "rgb(var(--background) / <alpha-value>)",
        card: "rgb(var(--card) / <alpha-value>)",
        ink: "rgb(var(--text-ink) / <alpha-value>)",
        brand: {
          DEFAULT: "#18181B",
          dark: "#09090B",
          light: "rgb(var(--border-subtle) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "#6366F1",
          dark: "#4F46E5",
          light: "#E0E7FF",
        },
      },
      borderRadius: {
        squircle: "1.25rem",
        "squircle-lg": "1.75rem",
      },
      boxShadow: {
        "glow-accent": "0 0 30px rgba(99, 102, 241, 0.4)",
        "glow-brand": "0 0 30px rgba(24, 24, 27, 0.15)",
        "card-hover": "0 16px 40px -8px rgba(9, 9, 11, 0.15)",
      },
      animation: {
        "fade-up": "fadeSlideUp 0.55s ease-out both",
        "fade-in": "fadeIn 0.4s ease-out both",
        shimmer: "shimmer 1.6s infinite linear",
        "glow-pulse": "glowPulse 2.5s ease-in-out infinite",
        "float-orb": "floatOrb 6s ease-in-out infinite",
        "toast-in": "toastSlideIn 0.3s ease-out both",
        "toast-out": "toastSlideOut 0.3s ease-in both",
        "pop-in": "popIn 0.35s ease-out both",
        "spin-in": "spinIn 0.4s ease-out both",
        "progress-shrink": "progressShrink linear both",
      },
      keyframes: {
        fadeSlideUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-600px 0" },
          "100%": { backgroundPosition: "600px 0" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(99, 102, 241, 0.35)" },
          "50%": { boxShadow: "0 0 45px rgba(99, 102, 241, 0.6)" },
        },
        floatOrb: {
          "0%, 100%": { transform: "translateY(0px) scale(1)" },
          "50%": { transform: "translateY(-20px) scale(1.05)" },
        },
        toastSlideIn: {
          from: { opacity: "0", transform: "translateX(120%)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        toastSlideOut: {
          from: { opacity: "1", transform: "translateX(0)" },
          to: { opacity: "0", transform: "translateX(120%)" },
        },
        progressShrink: {
          from: { width: "100%" },
          to: { width: "0%" },
        },
        spinIn: {
          from: { transform: "rotate(-90deg) scale(0)", opacity: "0" },
          to: { transform: "rotate(0deg) scale(1)", opacity: "1" },
        },
        popIn: {
          "0%": { transform: "scale(0.8)", opacity: "0" },
          "70%": { transform: "scale(1.05)", opacity: "1" },
          "100%": { transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};
