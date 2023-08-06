<template>
  <v-icon v-if="!authStore.isUserInfoLoaded" icon="mdi-loading mdi-spin" />
  <nuxt-link v-else-if="!authStore.isAuthenticated" to="/auth/login">
    Login
  </nuxt-link>
  <nuxt-link v-else to="/profile">
    {{ authStore.userInfo?.name }}
  </nuxt-link>
</template>

<script setup lang="ts">
const authStore = useAuthStore()
</script>
