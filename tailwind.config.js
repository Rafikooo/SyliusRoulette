/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'sylius-primary': '#22b99a',
        'sylius-medium': '#1f6964',
        'sylius-secondary': '#1E2E3E',
        'sylius-dark': '#001a29',
        'danger': '#DC143C'
      }
    },
    fontFamily: {
      Roboto: ['Roboto', 'sans-serif'],
    },
    screens: {
      sm: '640px',
      md: '768px',
    }
  },
  plugins: [],
}
