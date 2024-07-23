/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx,ejs}"],
  theme: {
    extend: {
      animation: {
        'highlight': 'highlight 200ms ease-out'
      },
      keyframes: {
        highlight: {
          '0%': { boxShadow: '0 0 0 0 rgba(255, 0, 0, 0.5)' },
          '100%': { boxShadow: '0 0 0 10px rgba(255, 0, 0, 0)' }
        },
      },
    },
  },
  plugins: [],
}

