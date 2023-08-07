<template>
  <v-form v-model="isValid" validate-on="submit" @submit.prevent="handleSubmit">
    <v-radio-group v-model="method" :rules="methodRules">
      <v-radio label="PayPal" value="paypal" />
      <v-radio label="Stripe" value="stripe" />
      <v-radio label="Cash" value="cash" />
    </v-radio-group>

    <v-btn
      block
      :loading="isLoading"
      type="submit"
      class="mt-2"
      text="Continue"
      color="secondary"
    />

    <nuxt-link to="/shipping">
      <v-btn block type="button" class="mt-2" text="Back" />
    </nuxt-link>
  </v-form>
</template>

<script setup lang="ts">
import {PaymentInfo} from "@/stores"

const router = useRouter()
const snackbar = useSnackbar()
const checkoutStore = useCheckoutStore()

const isValid = ref(false)
const isLoading = ref(false)

const method = ref<PaymentInfo["method"]>(checkoutStore.paymentInfo.method)

const methodRules = [
  (value: PaymentInfo["method"]) => {
    if (value) return true

    return "Method is required."
  },
]

async function handleSubmit() {
  if (!method.value) {
    snackbar.add({
      type: "warning",
      text: "Please select the payment method",
    })
    return
  }
  isLoading.value = true
  checkoutStore.setPaymentInfo({
    method: method.value,
  })
  isLoading.value = false
  if (checkoutStore.isShippingInfoCompleted) {
    router.push("/place-order")
  } else {
    router.push("/shipping")
  }
}
</script>
