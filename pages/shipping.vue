<template>
  <Title>Shipping Address</Title>

  <v-container>
    <v-row>
      <v-col>
        <v-card class="pa-5 mt-5">
          <checkout-stepper />
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="6" offset="3">
        <h1 class="text-h1">Shipping Address</h1>
      </v-col>
    </v-row>

    <v-row v-if="!checkoutStore.isShippingInfoInitialized">
      <v-col cols="6" offset="3">
        <v-card class="pa-5">
          <v-icon icon="mdi-loading mdi-spin" />
          Loading shipping info...
        </v-card>
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col cols="6" offset="3">
        <v-card class="pa-5">
          <form-shipping-info />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
const router = useRouter()
const authStore = useAuthStore()
const cartStore = useCartStore()
const checkoutStore = useCheckoutStore()

onMounted(() => {
  if (!checkoutStore.isLoginCompleted) {
    authStore.setLoginSuccessRedirect("/shipping")
    router.replace("/auth/login")
  } else if (cartStore.numItems === 0) {
    router.replace("/cart")
  }
})
</script>
