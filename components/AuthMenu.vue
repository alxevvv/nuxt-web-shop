<template>
  <v-icon v-if="!authStore.isUserInfoLoaded" icon="mdi-loading mdi-spin" />

  <nuxt-link v-else-if="!authStore.isAuthenticated" to="/auth/login">
    <v-btn variant="flat" color="primary">Login</v-btn>
  </nuxt-link>

  <v-menu v-else open-on-hover>
    <template v-slot:activator="{props}">
      <v-btn v-bind="props">
        {{ authStore.userInfo?.name }}
      </v-btn>
    </template>

    <v-list>
      <v-list-item>
        <v-list-item-title>
          <nuxt-link to="/profile">
            <v-btn variant="flat">Profile</v-btn>
          </nuxt-link>
        </v-list-item-title>
      </v-list-item>

      <v-list-item>
        <v-list-item-title>
          <v-btn variant="flat" @click="logout">Logout</v-btn>
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup lang="ts">
const router = useRouter()
const authStore = useAuthStore()

function logout() {
  authStore.logout()
  router.push("/")
}
</script>
