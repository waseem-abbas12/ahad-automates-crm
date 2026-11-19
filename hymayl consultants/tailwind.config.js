/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        humayl: {
          black: '#07090E',
          surface: '#0F141C',
          card: '#151C28',
          border: '#232E42',
          red: '#DC2626',
          'red-glow': '#EF4444',
          'red-dark': '#991B1B',
          silver: '#F1F5F9',
          'silver-muted': '#94A3B8',
          gold: '#EAB308',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Cinzel', 'Outfit', 'serif'],
      }
    },
  },
  plugins: [],
}
