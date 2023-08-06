<template>
  <Title>Register</Title>

  <v-container>
    <v-row>
      <v-col cols="6" offset="3">
        <h1 class="text-h1">Register</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="6" offset="3">
        <v-card class="pa-5">
          <form-register />
          <v-divider class="mt-5 mb-3" />
          Already registered?
          <nuxt-link to="/auth/login">Login</nuxt-link>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
const router = useRouter()
const authStore = useAuthStore()

onMounted(() => {
  if (authStore.isAuthenticated) {
    router.replace("/")
  }
})
</script>
