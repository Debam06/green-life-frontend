/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        merrie: ['Merriweather', 'serif'], // ✅ add Merriweather
      },
      animation: {
        fadeInUp: "fadeInUp 0.6s ease-out forwards",
        gradientShift: "gradientShift 8s ease infinite", // 🌈 subtle gradient animation
        floatLeaf: "floatLeaf 6s ease-in-out infinite", // 🍃 floating leaf animation
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        floatLeaf: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-15px) rotate(5deg)" },
        },
      },
      backgroundSize: {
        "200%": "200% 200%", // for gradient animation
      },
    },
  },
  plugins: [],
};