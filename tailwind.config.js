/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false,
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      "btnBg":"#1d4ed8"
    },
    screens: {
      'sm': { 'max': '850px' },
      'md': { 'max': '1000px' },
      'lg': { 'max': '1300px' },
      'xl': { 'max': '1550px' }
    },
  },
  plugins: [require('tailwindcss'), require('autoprefixer')],
}
