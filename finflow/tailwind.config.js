/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"Space Mono"', 'monospace'],
        sans: ['"DM Sans"', 'sans-serif'],
      },
      colors: {
        dark: {
          900: '#080c14',
          800: '#0a1120',
          700: '#0d1828',
          600: '#121e30',
          500: '#1e2d45',
          400: '#2a3a55',
          300: '#4a6080',
          200: '#718096',
          100: '#a0aec0',
        }
      }
    }
  },
  plugins: []
}
