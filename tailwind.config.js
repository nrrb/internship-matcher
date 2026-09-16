/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      colors: {
        ink: '#1e1b4b',
        plum: '#4c1d95',
        gold: '#f4b942',
        mist: '#f7f7fb',
      },
      boxShadow: {
        card: '0 12px 30px rgba(30, 27, 75, 0.08)',
      },
    },
  },
  plugins: [],
}
