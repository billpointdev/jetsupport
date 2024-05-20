/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        black: "#000000",
        primary: "#F66B03",
        light: "#ffffff",
        lightGray: "#E4E4E4",
        primarylight: "#fff1e5",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        helvetica: ['Helvetica Neue']
      },
    },
  },
  plugins: [],
};