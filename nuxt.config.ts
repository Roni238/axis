export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  site: { 
    url: 'https://axis-archive.vercel.app',
    name: 'AXIS',
  },
  
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/icon',
    '@nuxt/image',
  ],
  image: {
    format: ['webp', 'avif', 'png'],
    quality: 85,
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
      ]
    }
  },
  tailwindcss: {
    configPath: 'tailwind.config.js'
  },
  build: {
    transpile: ['gsap'],
  },
  css: ['~/assets/css/tailwind.css'],
  experimental: {
    payloadExtraction: false,
  }
})