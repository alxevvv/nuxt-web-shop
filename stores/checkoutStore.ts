interface ShippingInfo {
  fullName: string
  country: string
  city: string
  address: string
  postalCode: string
}

const shippingInfoInitial = {
  fullName: "",
  country: "",
  city: "",
  address: "",
  postalCode: "",
}

const useCheckoutStore = defineStore("checkout", () => {
  const authStore = useAuthStore()

  const {data: shippingInfo, isInitialized: isShippingInfoInitialized} =
    useCookieRef<ShippingInfo>("shipping-info", shippingInfoInitial)

  const isLoginCompleted = computed(() => authStore.isAuthenticated)
  const isShippingInfoCompleted = computed(
    () =>
      !!isShippingInfoInitialized.value &&
      !!shippingInfo.value.fullName &&
      !!shippingInfo.value.country &&
      !!shippingInfo.value.address &&
      !!shippingInfo.value.postalCode
  )
  const isPaymentMethodCompleted = computed(() => false)
  const isPlaceOrderCompleted = computed(() => false)

  function setShippingInfo(data: ShippingInfo) {
    shippingInfo.value = data
  }

  function reset() {
    shippingInfo.value = shippingInfoInitial
  }

  return {
    shippingInfo,
    isShippingInfoInitialized,

    isLoginCompleted,
    isShippingInfoCompleted,
    isPaymentMethodCompleted,
    isPlaceOrderCompleted,

    setShippingInfo,
    reset,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCheckoutStore, import.meta.hot))
}

export {useCheckoutStore}
