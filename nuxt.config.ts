// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    '@nuxtjs/leaflet',
    '@nuxtjs/supabase',
  ],
  googleFonts: {
    families: {
      Lato: [100, 300, 400, 700, 900],
    },
  },
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
    },
  },
  supabase: {
    redirect: true,
    redirectOptions: {
      login: '/login', 
      callback: '/', 
      include: ['/admin/**'], 
      exclude: ['/', '/catalogo', '/contacto'], 
      saveRedirectToCookie: false, 
    },
  },
  pages: true
})