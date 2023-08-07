interface ShippingInfo {
  fullName: string
  country: string
  city: string
  address: string
  postalCode: string
}

interface PaymentInfo {
  method: "" | "paypal" | "stripe" | "cash"
}

const shippingInfoInitial: ShippingInfo = {
  fullName: "",
  country: "",
  city: "",
  address: "",
  postalCode: "",
}

const paymentInfoInitial: PaymentInfo = {
  method: "",
}

const useCheckoutStore = defineStore("checkout", () => {
  const authStore = useAuthStore()

  const {data: shippingInfo, isInitialized: isShippingInfoInitialized} =
    useCookieRef<ShippingInfo>("shipping-info", shippingInfoInitial)

  const {data: paymentInfo, isInitialized: isPaymentInfoInitialized} =
    useCookieRef<PaymentInfo>("payment-info", paymentInfoInitial)

  const isLoginCompleted = computed(() => authStore.isAuthenticated)
  const isShippingInfoCompleted = computed(
    () =>
      !!isShippingInfoInitialized.value &&
      !!shippingInfo.value.fullName &&
      !!shippingInfo.value.country &&
      !!shippingInfo.value.address &&
      !!shippingInfo.value.postalCode
  )
  const isPaymentInfoCompleted = computed(
    () => !!isPaymentInfoInitialized.value && !!paymentInfo.value.method
  )
  const isPlaceOrderCompleted = computed(() => false)

  function setShippingInfo(data: ShippingInfo) {
    shippingInfo.value = data
  }

  function setPaymentInfo(data: PaymentInfo) {
    paymentInfo.value = data
  }

  function reset() {
    setShippingInfo(shippingInfoInitial)
    setPaymentInfo(paymentInfoInitial)
  }

  return {
    shippingInfo,
    isShippingInfoInitialized,
    paymentInfo,
    isPaymentInfoInitialized,

    isLoginCompleted,
    isShippingInfoCompleted,
    isPaymentInfoCompleted,
    isPlaceOrderCompleted,

    setShippingInfo,
    setPaymentInfo,
    reset,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCheckoutStore, import.meta.hot))
}

export {useCheckoutStore}

export type {ShippingInfo, PaymentInfo}
