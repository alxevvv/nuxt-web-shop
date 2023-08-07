<template>
  <v-form v-model="isValid" validate-on="blur" @submit.prevent="handleSubmit">
    <v-text-field
      v-model="fullName"
      :rules="fullNameRules"
      label="Full Name"
      variant="outlined"
      required
    />

    <v-text-field
      v-model="country"
      :rules="countryRules"
      label="Country"
      variant="outlined"
      required
    />

    <v-text-field
      v-model="city"
      :rules="cityRules"
      label="City"
      variant="outlined"
    />

    <v-text-field
      v-model="address"
      :rules="addressRules"
      label="Address"
      variant="outlined"
      required
    />

    <v-text-field
      v-model="postalCode"
      :rules="postalCodeRules"
      label="Postal Code"
      variant="outlined"
      required
    />

    <v-btn
      block
      :loading="isLoading"
      type="submit"
      class="mt-2"
      text="Continue"
      color="secondary"
    />
  </v-form>
</template>

<script setup lang="ts">
const router = useRouter()
const authStore = useAuthStore()
const checkoutStore = useCheckoutStore()

const isValid = ref(false)
const isLoading = ref(false)

const fullName = ref(
  checkoutStore.shippingInfo.fullName || authStore.userInfo?.name || ""
)
const country = ref(checkoutStore.shippingInfo.country)
const city = ref(checkoutStore.shippingInfo.city)
const address = ref(checkoutStore.shippingInfo.address)
const postalCode = ref(checkoutStore.shippingInfo.postalCode)

const fullNameRules = [
  (value: string) => {
    if (value) return true

    return "Full Name is required."
  },
]

const countryRules = [
  (value: string) => {
    if (value) return true

    return "Country is required."
  },
]

const cityRules = [
  () => {
    return true
  },
]

const addressRules = [
  (value: string) => {
    if (value) return true

    return "Address is required."
  },
]

const postalCodeRules = [
  (value: string) => {
    if (value) return true

    return "Postal Code is required."
  },
]

async function handleSubmit() {
  if (!isValid.value) {
    return
  }
  isLoading.value = true
  checkoutStore.setShippingInfo({
    fullName: fullName.value,
    country: country.value,
    city: city.value,
    address: address.value,
    postalCode: postalCode.value,
  })
  isLoading.value = false
  router.push("/payment")
}
</script>
