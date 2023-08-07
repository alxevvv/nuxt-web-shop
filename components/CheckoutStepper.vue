<template>
  <div class="w-100 d-flex">
    <div class="flex-grow-1">
      <v-icon :color="checkoutStore.isLoginCompleted ? 'success' : undefined">
        mdi-{{
          checkoutStore.isLoginCompleted ? "check-bold" : "numeric-1-circle"
        }}
      </v-icon>
      <span :class="{['text-success']: checkoutStore.isLoginCompleted}">
        Login
      </span>
    </div>

    <div class="flex-grow-1">
      <v-icon
        :color="checkoutStore.isShippingInfoCompleted ? 'success' : undefined"
      >
        mdi-{{
          checkoutStore.isShippingInfoCompleted
            ? "check-bold"
            : "numeric-2-circle"
        }}
      </v-icon>
      <span :class="{['text-success']: checkoutStore.isShippingInfoCompleted}">
        Shipping Address
      </span>
    </div>

    <div class="flex-grow-1">
      <v-icon
        :color="checkoutStore.isPaymentInfoCompleted ? 'success' : undefined"
      >
        mdi-{{
          checkoutStore.isPaymentInfoCompleted
            ? "check-bold"
            : "numeric-3-circle"
        }}
      </v-icon>
      <span :class="{['text-success']: checkoutStore.isPaymentInfoCompleted}">
        Payment Method
      </span>
    </div>

    <div class="flex-grow-1">
      <v-icon
        :color="checkoutStore.isPlaceOrderCompleted ? 'success' : undefined"
      >
        mdi-{{
          checkoutStore.isPlaceOrderCompleted
            ? "check-bold"
            : "numeric-4-circle"
        }}
      </v-icon>
      <span :class="{['text-success']: checkoutStore.isPlaceOrderCompleted}">
        Place Order
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
const checkoutStore = useCheckoutStore()
</script>
