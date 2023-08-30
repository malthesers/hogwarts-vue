/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      merinda: ["Merienda, serif, system-ui"],
    },
    colors: {
      "hogwarts-accent": "#FAECBF",
      "hogwarts-light": "#392A48",
      "hogwarts-dark": "#2F223A",
      "howler-accent": "#3A3120",
    },
    extend: {},
  },
  plugins: [],
};
