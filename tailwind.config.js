/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        night: {
          950: "#050509",
          900: "#0B0F1A",
          800: "#080D1F",
          700: "#101730",
        },
        neon: {
          cyan: "#00E5FF",
          blue: "#3B82F6",
          pink: "#FF2E93",
          purple: "#8B5CF6",
          gold: "#F8C46B",
        },
        soft: "#F8FAFC",
      },
      fontFamily: {
        display: ["Unbounded", "Space Grotesk", "sans-serif"],
        sans: ["Manrope", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        "glow-cyan": "0 0 24px rgba(0, 229, 255, 0.35)",
        "glow-pink": "0 0 24px rgba(255, 46, 147, 0.35)",
        "glow-purple": "0 0 32px rgba(139, 92, 246, 0.35)",
        "glow-soft": "0 0 60px rgba(59, 130, 246, 0.15)",
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(rgba(148,163,184,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.05) 1px, transparent 1px)",
      },
      keyframes: {
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
        aurora: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(4%, -6%) scale(1.08)" },
          "66%": { transform: "translate(-5%, 4%) scale(0.95)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "border-run": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
      animation: {
        ticker: "ticker 30s linear infinite",
        shimmer: "shimmer 3.5s linear infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        aurora: "aurora 16s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "border-run": "border-run 6s ease infinite",
      },
    },
  },
  plugins: [],
};
