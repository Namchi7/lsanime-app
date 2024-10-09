/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./app/**/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#33367E",
        secondary: "#0A1625",
        accent: "#36889A",
        basic: "#FFFFFF",
        moon: "#6A2782",
        sun: "#ffeb33",
        button: "#11B011",
      },
      fontFamily: {
        thin: ["Poppins-Thin", "sans-serif"],
        extralight: ["Poppins-ExtraLight", "sans-serif"],
        light: ["Poppins-Light", "sans-serif"],
        regular: ["Poppins-Regular", "sans-serif"],
        medium: ["Poppins-Medium", "sans-serif"],
        semibold: ["Poppins-SemiBold", "sans-serif"],
        bold: ["Poppins-Bold", "sans-serif"],
        extrabold: ["Poppins-ExtraBold", "sans-serif"],
        black: ["Poppins-Black", "sans-serif"],
      },
    },
  },
  plugins: [],
};
