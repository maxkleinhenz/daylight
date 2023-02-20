/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#F1954A",
        darker: "#9B6D4A",
        darkest: "#534439",
      },
    },
  },
  plugins: [],
};
