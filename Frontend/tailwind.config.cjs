/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      backgroundColor: ['hover'],
      textColor: ['hover'],
      boxShadow: ['hover'],
    },
  },
  plugins: [],
}
