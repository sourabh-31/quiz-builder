/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        titilliumWeb: ["Titillium Web", "sans-serif"],
        lilitaOne: ["Lilita One", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      colors: {
        secondary: "#ffe5d8",
        accent: "#ff5b08",
        bg: "#fff2ea",
      },
      maxWidth: {
        "8xl": "96rem",
      },
    },
  },
  plugins: [],
};
