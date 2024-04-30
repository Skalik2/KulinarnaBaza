/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        fancy: '"Kalam", cursive',
      },
      colors: {
        main: "#ff3000",
        mainHover: "#fb8c23",
        bgWhite: "#fcfcfc",
        bgWhiteHover: "#f4f2f0",
        bgDark: "#1f1b1a",
        bgDarkHover: "#282322",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
