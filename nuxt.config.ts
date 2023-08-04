// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["vuetify/lib/styles/main.sass", "@/assets/main.scss"],
  build: {
    transpile: ["vuetify"],
  },
  modules: ["@invictus.codes/nuxt-vuetify", "@nuxtjs/emotion"],
  devtools: {enabled: false},
  vuetify: {
    /* vuetify options */
    vuetifyOptions: {
      theme: {
        defaultTheme: "light",
        themes: {
          light: {
            colors: {
              primary: "#f0c000",
              secondary: "#208080",
              background: "#eeeeee",
              surface: "#203040",
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
