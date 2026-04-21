/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#E5E5E5',
          DEFAULT: '#737373',
          dark: '#404040',
        },
        secondary: {
          DEFAULT: '#111111',
          surface: '#1A1A1A',
        },
        accent: {
          red: '#EE3134',
          silver: '#D4D4D4',
          white: '#FFFFFF',
        },
        text: {
          main: '#E5E5E5',
          muted: '#525252',
        },
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1.25rem',
          md: '2rem',
        },
        screens: {
          sm: '100%',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1636px',
        },
      },
      boxShadow: {
        'watch': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.05), 0 10px 30px -10px rgba(0, 0, 0, 0.7)',
      }
    },
  },
}