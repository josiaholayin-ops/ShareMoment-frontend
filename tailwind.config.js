/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: '#0b0b10',
        peach: '#FFC6A5',
        green: '#2ECC71'
      },
      boxShadow: { soft: '0 10px 30px rgba(0,0,0,.35)' }
    }
  },
  plugins: [],
}
