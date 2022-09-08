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
      colors: {
        'primary': {
          100: 'hsl(189, 41%, 97%)',
          200: 'hsl(185, 41%, 84%)',
          300: 'hsl(184, 14%, 56%)',
          400: 'hsl(186, 14%, 43%)',
          500: 'hsl(183, 100%, 15%)',
        }
      }
    },
  },
  plugins: [],
}
