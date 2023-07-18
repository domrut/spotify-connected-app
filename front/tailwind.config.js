/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    './index.html',
  ],
  theme: {
    fontFamily: {
      poppins: ['Poppins', 'sans-serif'],
    },
    extend: {
      screens: {
        "1.5xl": "1450px",
        "3xl": "1792px",
        "4xl": "2025px"
      },
      colors: {
        "sectionColor" : "#121212"
      },
      flex: {
        '3': '3 1 0%',
        '5': '5 1 0%'
      }
    },
  },
  plugins: [],
}

