/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["public/index.html"],
  theme: {
    extend: {
      fontFamily: {
        main: ['Space Mono']
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.75rem' }],
      },
      colors: ({ colors }) => ({
      })
    },
  },
  plugins: [],
}
