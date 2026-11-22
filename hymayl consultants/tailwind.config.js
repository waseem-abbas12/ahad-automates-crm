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
          black: '#05070B',
          surface: '#0B0F17',
          card: '#111622',
          cardHover: '#161D2C',
          border: 'rgba(255, 255, 255, 0.08)',
          borderHover: 'rgba(239, 68, 68, 0.4)',
          red: '#DC2626',
          'red-glow': '#EF4444',
          'red-light': '#F87171',
          'red-dark': '#991B1B',
          'red-deep': '#7F1D1D',
          ruby: '#E11D48',
          platinum: '#F8FAFC',
          silver: '#E2E8F0',
          'silver-muted': '#94A3B8',
          gold: '#F59E0B',
          'gold-dark': '#D97706',
          emerald: '#10B981',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Cinzel', 'Georgia', 'serif'],
      },
      boxShadow: {
        'ruby-glow': '0 0 35px -5px rgba(220, 38, 38, 0.35)',
        'ruby-subtle': '0 0 20px -3px rgba(220, 38, 38, 0.2)',
        'platinum-glow': '0 0 25px -5px rgba(255, 255, 255, 0.15)',
        'glass-card': '0 10px 40px -10px rgba(0, 0, 0, 0.7)',
      },
      backgroundImage: {
        'ruby-gradient': 'linear-gradient(135deg, #DC2626 0%, #B91C1C 50%, #991B1B 100%)',
        'ruby-shine': 'linear-gradient(135deg, #EF4444 0%, #DC2626 40%, #991B1B 100%)',
        'platinum-gradient': 'linear-gradient(135deg, #FFFFFF 0%, #E2E8F0 50%, #94A3B8 100%)',
        'dark-radial': 'radial-gradient(circle at top, rgba(220, 38, 38, 0.12) 0%, rgba(5, 7, 11, 0) 70%)',
      }
    },
  },
  plugins: [],
}
