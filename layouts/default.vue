<template>
  <v-layout>
    <v-app-bar>
      <v-toolbar color="primary">
        <v-toolbar-title>
          <nuxt-link to="/">nuxt web shop</nuxt-link>
        </v-toolbar-title>

        <template v-slot:append>
          <nuxt-link to="/cart" class="mr-2">
            <v-btn icon>
              <v-icon>mdi-cart</v-icon>
            </v-btn>
          </nuxt-link>

          <v-divider vertical class="mr-6 my-4" />

          <dark-mode-switch />
        </template>
      </v-toolbar>
    </v-app-bar>

    <v-main id="app-main">
      <slot />
    </v-main>
  </v-layout>

  <v-footer id="app-footer">All rights reserved</v-footer>
</template>

<script setup lang="ts">
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - Nuxt Web Shop` : "Nuxt Web Shop"
  },
  link: [
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap",
    },
  ],
})
</script>

<style lang="scss">
.v-app-bar {
  .v-toolbar-title {
    a {
      color: #ffffff;
      margin-left: 1rem;
      font-weight: 700;
      font-size: 1.5rem;
    }
  }
}

#app-footer {
  max-height: 48px;
  justify-content: flex-end;
}
</style>
