<template>
  <Title>Order Placement</Title>

  <v-container>
    <v-row>
      <v-col>
        <v-card class="pa-5 mt-5">
          <checkout-stepper />
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <h1 class="text-h1">Order Placement</h1>
      </v-col>
    </v-row>

    <v-row v-if="!checkoutStore.isReadyForOrderPlacement">
      <v-col>
        <v-card class="pa-5">
          <v-icon icon="mdi-loading mdi-spin" />
          Loading order info...
        </v-card>
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col :md="9" cols="12">
        <v-card class="pa-5 mb-5">
          <h2 class="text-h2">Shipping Address</h2>
          <p>{{ checkoutStore.shippingAddressVerbose }}</p>
          <nuxt-link to="/shipping">
            <v-btn type="button" class="mt-5" text="Edit" />
          </nuxt-link>
        </v-card>

        <v-card class="pa-5 mb-5">
          <h2 class="text-h2">Payment Method</h2>
          <p>{{ checkoutStore.paymentMethodVerbose }}</p>
          <nuxt-link to="/payment">
            <v-btn type="button" class="mt-5" text="Edit" />
          </nuxt-link>
        </v-card>

        <v-card class="pa-5 mb-5">
          <h2 class="text-h2">Order Items</h2>
          <table-order-items />
        </v-card>
      </v-col>

      <v-col :md="3" cols="12">
        <v-card class="pa-5">
          <h2 class="text-h2">Order Summary</h2>
          <v-list class="pa-0 mt-6">
            <v-list-item class="pa-0">
              <v-row>
                <v-col cols="6">Items:</v-col>
                <v-col cols="6">${{ cartStore.itemsPrice }}</v-col>

                <v-col cols="6">Shipping:</v-col>
                <v-col cols="6">${{ checkoutStore.shippingPrice }}</v-col>

                <v-divider />

                <v-col cols="6">Total:</v-col>
                <v-col cols="6">${{ checkoutStore.totalPrice }}</v-col>
              </v-row>
            </v-list-item>
          </v-list>

          <v-divider class="mt-3 mb-5" />

          <v-btn
            block
            color="secondary"
            :loading="isLoading"
            @click="placeOrder"
          >
            Place Order
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
const router = useRouter()
const snackbar = useSnackbar()
const authStore = useAuthStore()
const cartStore = useCartStore()
const checkoutStore = useCheckoutStore()

const isLoading = ref(false)

function placeOrder() {
  try {
    isLoading.value = true
    console.log("order placement")
  } catch (err) {
    snackbar.add({
      type: "error",
      text: (err as Error).message,
    })
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  if (!checkoutStore.isLoginCompleted) {
    authStore.setLoginSuccessRedirect("/payment")
    router.replace("/auth/login")
  } else if (cartStore.numItems === 0) {
    router.replace("/cart")
  } else if (!checkoutStore.isShippingInfoCompleted) {
    router.replace("/shipping")
  } else if (!checkoutStore.isPaymentInfoCompleted) {
    router.replace("/payment")
  }
})
</script>
