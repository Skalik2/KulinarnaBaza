/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#ff3000",
        mainHover: "#fb8c23",
        bgWhite: "#fcfcfc",
        bgDark: "#1f1b1a",
      },
    },
  },
  plugins: [],
};
