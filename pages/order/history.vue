<template>
  <Title>Order History</Title>

  <v-container>
    <v-row>
      <v-col>
        <h1 class="text-h1">Order History</h1>
      </v-col>
    </v-row>

    <v-row v-if="!orders">
      <v-col>
        <v-card class="pa-5">
          <v-icon icon="mdi-loading mdi-spin" />
          Loading orders...
        </v-card>
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col>
        <v-card class="pa-5">
          <table-orders :orders="orders" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import {Order} from "@/models"

const router = useRouter()
const authStore = useAuthStore()

const orders = ref<Order[] | null>(null)

onMounted(async () => {
  if (!authStore.isAuthenticated) {
    authStore.setLoginSuccessRedirect("/order/history")
    router.replace("/auth/login")
  } else {
    orders.value = await $fetch("/api/order/list", {
      headers: {
        authorization: `Bearer ${authStore.userInfo?.token}`,
      },
    })
  }
})
</script>
