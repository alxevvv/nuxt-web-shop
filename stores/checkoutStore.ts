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

const paymentMethods: Record<PaymentInfo["method"], string> = {
  [""]: "Method is not selected",
  paypal: "PayPal",
  stripe: "Stripe",
  cash: "Cash",
}

const useCheckoutStore = defineStore("checkout", () => {
  const authStore = useAuthStore()
  const cartStore = useCartStore()

  const {data: shippingInfo, isInitialized: isShippingInfoInitialized} =
    useCookieRef<ShippingInfo>("shipping-info", shippingInfoInitial)

  const {data: paymentInfo, isInitialized: isPaymentInfoInitialized} =
    useCookieRef<PaymentInfo>("payment-info", paymentInfoInitial)

  const shippingAddressVerbose = computed(() =>
    isShippingInfoCompleted.value
      ? `${shippingInfo.value.fullName}, ${shippingInfo.value.country}, ${
          shippingInfo.value.city ? `${shippingInfo.value.city}, ` : ""
        }${shippingInfo.value.address}, ${shippingInfo.value.postalCode}`
      : "Shipping address isn't provided"
  )

  const shippingPrice = computed(() => (cartStore.itemsPrice > 250 ? 0 : 15))

  const paymentMethodVerbose = computed(
    () => paymentMethods[paymentInfo.value.method]
  )

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
  const isReadyForOrderPlacement = computed(
    () =>
      isLoginCompleted.value &&
      isShippingInfoCompleted.value &&
      isPaymentInfoCompleted.value
  )
  const isPlaceOrderCompleted = computed(() => false)

  const taxPrice = computed(() => round(cartStore.itemsPrice * 0.15))
  const totalPrice = computed(() =>
    round(cartStore.itemsPrice + taxPrice.value + shippingPrice.value)
  )

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

    shippingAddressVerbose,
    shippingPrice,
    paymentMethodVerbose,
    taxPrice,
    totalPrice,

    isLoginCompleted,
    isShippingInfoCompleted,
    isPaymentInfoCompleted,
    isReadyForOrderPlacement,
    isPlaceOrderCompleted,

    setShippingInfo,
    setPaymentInfo,
    reset,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCheckoutStore, import.meta.hot))
}

export {useCheckoutStore, paymentMethods}

export type {ShippingInfo, PaymentInfo}
