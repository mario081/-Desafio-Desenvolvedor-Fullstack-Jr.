/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
          950: '#2e1065',
        },
        surface: {
          DEFAULT: '#3b2d5c',
          light: '#4a3d6e',
          dark: '#2d2347',
        },
        accent: {
          DEFAULT: '#8b5cf6',
          light: '#a78bfa',
          bright: '#c4b5fd',
        },
      },
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        'pill': '9999px',
      },
      backgroundImage: {
        'gradient-dark': 'linear-gradient(180deg, #2d2347 0%, #1e1b2e 100%)',
        'gradient-radial': 'radial-gradient(ellipse at top, #3b2d5c 0%, #2d2347 50%, #1e1b2e 100%)',
      },
      boxShadow: {
        'glow': '0 0 40px -10px rgba(139, 92, 246, 0.4)',
        'card': '0 4px 24px -4px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
}
