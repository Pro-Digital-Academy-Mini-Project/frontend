/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'bounce-up': 'bounce-up 0.3s ease forwards',
        'wave-move': 'wave-move 12s linear infinite',
      },
      keyframes: {
        'bounce-up': {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
          '100%': { transform: 'translateY(0)' },
        },
        'wave-move': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },

        },
      },
      variants: {},
      plugins: [require('tailwind-scrollbar-hide')],
    }
  }
}
