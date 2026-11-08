/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: '#111210',
        warmWhite: '#F1EEE7',
        graphite: '#242521',
        naturalStone: '#C8BFB1',
        thermowood: '#302720',
        bronze: '#8A745C',
        norra: {
          dark: '#111210',
          panel: '#1A1B18',
          subtle: '#242521',
          stone: '#C8BFB1',
          wood: '#302720',
          accent: '#8A745C',
          light: '#F1EEE7',
          muted: '#8C8984',
        }
      },
      fontFamily: {
        serif: ['"Bodoni Moda"', 'serif'],
        sans: ['"IBM Plex Sans"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      letterSpacing: {
        widest: '.2em',
        tightest: '-.04em',
      }
    },
  },
  plugins: [],
}
