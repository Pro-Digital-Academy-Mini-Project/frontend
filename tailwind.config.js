/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'bounce-up': 'bounce-up 0.3s ease forwards',
      },
      keyframes: {
        'bounce-up': {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
    },
  },
  variants: {},
  plugins: [require('tailwind-scrollbar-hide')],
};
