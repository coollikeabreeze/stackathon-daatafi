const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ['./client/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Questrial', ...defaultTheme.fontFamily.sans],
        title: ['Manjari']
      },
    },
  },
  plugins: [],
}
