<template>
  <v-app :theme="themeName">
    <nuxt-layout>
      <nuxt-page />
    </nuxt-layout>
    <nuxt-snackbar />
  </v-app>
</template>

<script setup lang="ts">
import {useAppTheme} from "@/composables"

const {themeName} = useAppTheme()
</script>
