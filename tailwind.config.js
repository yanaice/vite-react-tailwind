module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontSize: {
      xs: ["1rem", { lineHeight: "1.2" }],
      sm: ["1.125rem", { lineHeight: "1.2" }],
      base: ["1.25rem"],
      lg: ["1.75rem", { lineHeight: "1.2" }],
      // 'xl': '1.25rem',
      '2xl': '1.5rem',
      // '3xl': '1.875rem',
      // '4xl': '2.25rem',
      // '5xl': '3rem',
      // '6xl': '4rem',
      // '7xl': '5rem',
    },
    // colors: { // override tailwin default color
    //   indigo: '#454648',
    //   blue: '#008387',
    //   red: '#de3618',
    // },
    minWidth: {
      0: "0",
      "1/4": "25%",
      "1/2": "50%",
      "3/4": "75%",
      full: "100%",
    },
    extend: {
      colors: {
        primary: {
          200: "#79BFAF",
          500: "#008387",
          700: "#004848",
        },
        secondary: "#454648",
      },
      flex: {
        2: "2 2 0%",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
