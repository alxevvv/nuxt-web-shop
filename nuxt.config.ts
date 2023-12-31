// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["vuetify/lib/styles/main.sass", "@/assets/main.scss"],
  build: {
    transpile: ["vuetify", "jsonwebtoken", "lodash"],
  },
  modules: [
    "@invictus.codes/nuxt-vuetify",
    "@nuxtjs/emotion",
    "@pinia/nuxt",
    "nuxt-snackbar",
  ],
  devtools: {enabled: false},
  imports: {
    dirs: ["./composables", "./stores"],
  },
  pinia: {
    autoImports: ["defineStore", "storeToRefs", "acceptHMRUpdate"],
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
          dark: {
            colors: {
              primary: "#102030",
              secondary: "#208080",
              background: "#444444",
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
