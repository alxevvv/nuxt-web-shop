import {loadScript, PayPalNamespace} from "@paypal/paypal-js"
import {Order} from "@/models"

function usePayPal(
  buttonsContainer: string | HTMLElement,
  order: Ref<Order | null>
) {
  const snackbar = useSnackbar()
  const authStore = useAuthStore()

  const clientId = ref("")
  const clientLoadingError = ref("")
  const client = ref<PayPalNamespace | null>(null)

  const paymentError = ref("")
  const isPaymentSuccess = ref<boolean | null>(null)
  const isPaymentLoading = ref(false)

  const isClientLoading = computed(
    () => order.value && !client.value && !clientLoadingError.value
  )

  watch(
    order,
    async () => {
      if (
        order.value?.paymentMethod === "paypal" &&
        !order.value?.isPaid &&
        !clientId.value
      ) {
        const result = await $fetch("/api/keys/paypal", {
          headers: {
            authorization: `Bearer ${authStore.userInfo?.token}`,
          },
        })
        if (result) {
          clientId.value = result
        } else {
          clientLoadingError.value = "Failed to load the PayPal Client ID"
        }
      }
    },
    {immediate: true}
  )

  watch(clientId, async () => {
    if (clientId.value) {
      try {
        client.value = await loadScript({
          clientId: clientId.value,
          currency: "USD",
        })
      } catch (err) {
        console.error(err)
        clientLoadingError.value = "Failed to load the PayPal JS SDK script"
      }
    }
  })

  watch(client, async () => {
    if (client.value && client.value.Buttons) {
      try {
        await client.value
          .Buttons({
            async createOrder(data, actions) {
              if (order.value?.totalPrice) {
                isPaymentLoading.value = true
                isPaymentSuccess.value = null
                paymentError.value = ""
                const orderId = await actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: order.value?.totalPrice.toString(),
                      },
                    },
                  ],
                })
                return orderId
              } else {
                throw new Error("Price error")
              }
            },
            async onApprove(data, actions) {
              const details = await actions.order?.capture()
              try {
                const result = await $fetch(
                  `/api/order/payment/${order.value?._id}`,
                  {
                    method: "PUT",
                    body: details,
                    headers: {
                      authorization: `Bearer ${authStore.userInfo?.token}`,
                    },
                  }
                )

                snackbar.add({
                  type: "success",
                  text: "Order is paid",
                })

                paymentError.value = ""
                isPaymentSuccess.value = true

                order.value = result
              } catch (err) {
                const message = (err as Error).message

                snackbar.add({
                  type: "error",
                  text: message,
                })

                paymentError.value = message
                isPaymentSuccess.value = false
              } finally {
                isPaymentLoading.value = false
              }
            },
            onError(err) {
              const message = JSON.stringify(err)

              snackbar.add({
                type: "error",
                text: message,
              })

              paymentError.value = message
              isPaymentSuccess.value = false
              isPaymentLoading.value = false
            },
          })
          .render(buttonsContainer)
      } catch (err) {
        console.error(err)
        clientLoadingError.value = "Failed to render the PayPal Buttons"
      }
    }
  })

  return {
    clientId,
    clientLoadingError,
    client,
    isClientLoading,

    paymentError,
    isPaymentLoading,
  }
}

export {usePayPal}
