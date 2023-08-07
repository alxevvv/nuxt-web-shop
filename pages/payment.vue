<template>
  <Title>Payment Method</Title>

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
        <h1 class="text-h1">Payment Method</h1>
      </v-col>
    </v-row>

    <v-row v-if="!checkoutStore.isPaymentInfoInitialized">
      <v-col cols="6" offset="3">
        <v-card class="pa-5">
          <v-icon icon="mdi-loading mdi-spin" />
          Loading payment info...
        </v-card>
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col cols="6" offset="3">
        <v-card class="pa-5">
          <form-payment-info />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
const router = useRouter()
const authStore = useAuthStore()
const checkoutStore = useCheckoutStore()

onMounted(() => {
  if (!checkoutStore.isLoginCompleted) {
    authStore.setLoginSuccessRedirect("/payment")
    router.replace("/auth/login")
  } else if (!checkoutStore.isShippingInfoCompleted) {
    router.replace("/shipping")
  }
})
</script>
