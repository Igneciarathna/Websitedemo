// tailwind.config.js
export default {
  darkMode: "class", // ✅ Moved outside theme
  theme: {
    extend: {
      animation: {
        fadeIn: "fadeIn 4s ease-out",
        sparkle: "sparkle 2s linear infinite",
        drawLine: "drawLine 1s ease-out forwards",
      },
      keyframes: {
        sparkle: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(200%)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        drawLine: {
          "0%": {
            strokeDasharray: "1000",
            strokeDashoffset: "1000",
          },
          "100%": {
            strokeDasharray: "1000",
            strokeDashoffset: "0",
          },
        },        
      },
    },
  },
  plugins: [],
};
