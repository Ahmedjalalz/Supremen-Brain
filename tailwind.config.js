/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        room: "#06060a",
        counter: "#0a0a12",
        wood: "#161620",
        gold: "#C9A227",
        "tarnished-gold": "#c5a448",
        light: "#f0ece1",
        smoke: "#a6a095",
      },
      fontFamily: {
        playfair: ["'Playfair Display'", "serif"],
        inter: ["Inter", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      animation: {
        "cursor-blink": "cursor-blink 0.53s infinite alternate",
        "glint": "glint 2s ease-in-out infinite",
        "pulse-slow": "pulse-slow 4s ease-in-out infinite",
        "fade-in-up": "fade-in-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "grain": "grain 8s steps(10) infinite",
      },
      keyframes: {
        "cursor-blink": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        "glint": {
          "0%, 100%": { backgroundPosition: "-200% 0" },
          "50%": { backgroundPosition: "200% 0" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: 0.1 },
          "50%": { opacity: 0.25 },
        },
        "fade-in-up": {
          "0%": { opacity: 0, transform: "translateY(15px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "grain": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-5%, -5%)" },
          "20%": { transform: "translate(-10%, 5%)" },
          "30%": { transform: "translate(5%, -10%)" },
          "40%": { transform: "translate(-5%, 15%)" },
          "50%": { transform: "translate(-15%, 10%)" },
          "60%": { transform: "translate(15%, 0)" },
          "70%": { transform: "translate(0, 15%)" },
          "80%": { transform: "translate(3%, 35%)" },
          "90%": { transform: "translate(-10%, 10%)" },
        }
      },
      backgroundImage: {
        "wood-grain": "radial-gradient(ellipse at center, rgba(30, 20, 10, 0.25) 0%, rgba(10, 5, 0, 0.5) 100%)",
      }
    },
  },
  plugins: [],
}
