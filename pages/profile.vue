<template>
  <Title>User Profile</Title>

  <v-container>
    <v-row>
      <v-col cols="6" offset="3">
        <h1 class="text-h1">User Profile</h1>
      </v-col>
    </v-row>

    <v-row v-if="!authStore.isUserInfoLoaded">
      <v-col cols="6" offset="3">
        <v-card class="pa-5">
          <v-icon icon="mdi-loading mdi-spin" />
          Loading profile info...
        </v-card>
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col cols="6" offset="3">
        <v-card class="pa-5">
          <form-profile-data />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
const router = useRouter()
const authStore = useAuthStore()

onMounted(() => {
  if (!authStore.isAuthenticated) {
    authStore.setLoginSuccessRedirect("/profile")
    router.replace("/auth/login")
  }
})
</script>
