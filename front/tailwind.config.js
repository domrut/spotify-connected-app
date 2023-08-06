/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    './index.html',
  ],
  theme: {
    fontFamily: {
      poppins: ['Poppins', 'sans-serif'],
    },
    extend: {
      gridAutoColumns: {
        'track': '5% 50% 20% 20% 5%',
        'mobileTrack': '10% 55% 25% 10%',
        'mobileTrackLegend': '10% 50% 25% 15%',
      },
      transitionProperty: {
        height: 'max-height'
      },
      fontSize: {
        "2xs": "0.6rem"
      },
      screens: {
        "2xs": "350px",
        "xs": "450px",
        "1.1md": "780px",
        "1.5md": "820px",
        "1243scr" : "1243px",
        "1.5xl": "1450px",
        "3xl": "1792px",
        "4xl": "2025px"
      },
      colors: {
        "sectionColor" : "#121212",
        "sectionColorLight" : "#f2f2f2"
      },
      flex: {
        '2': '2 1 0%',
        '3': '3 1 0%',
        '4': '4 1 0%',
        '5': '5 1 0%'
      }
    },
  },
  plugins: [],
}

