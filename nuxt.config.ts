// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["vuetify/lib/styles/main.sass", "@/assets/main.scss"],
  build: {
    transpile: ["vuetify"],
  },
  modules: [
    "@invictus.codes/nuxt-vuetify",
    "@nuxtjs/emotion",
    "@nuxtjs/sanity",
  ],
  devtools: {enabled: false},
  sanity: {
    projectId: "egyyw5h5",
    dataset: "production",
    useCdn: true,
  },
  vuetify: {
    /* vuetify options */
    vuetifyOptions: {
      theme: {
        defaultTheme: "light",
        themes: {
          light: {
            colors: {
              primary: "#203040",
              secondary: "#208080",
              background: "#eeeeee",
            },
          },
        },
      },
    },

    moduleOptions: {
      /* nuxt-vuetify module options */
      treeshaking: true,
      useIconCDN: true,

      /* vite-plugin-vuetify options */
      styles: "sass",
      autoImport: true,
      useVuetifyLabs: true,
    },
  },
})
