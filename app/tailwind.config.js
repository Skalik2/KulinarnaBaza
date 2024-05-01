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
      screens: {
        xs: "320px",
        md400: "400px",
        md500: "500px",
        md600: "600px",
        md750: "750px",
        md800: "800px",
      },
      backgroundImage: {
        cockingBgDark: "url('/cockingbg-dark.png')",
        cockingBgWhite: "url('/cockingbg-white.png')",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
