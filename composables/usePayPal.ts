import {loadScript, PayPalNamespace} from "@paypal/paypal-js"
import {watchOnce} from "@vueuse/core"

function usePayPal(
  buttonsContainer: string | HTMLElement,
  loadingTrigger: Ref<boolean>
) {
  const authStore = useAuthStore()

  const clientId = ref("")
  const error = ref<string>("")
  const client = ref<PayPalNamespace | null>(null)

  const isLoading = computed(
    () => loadingTrigger.value && !client.value && !error.value
  )

  watchOnce(loadingTrigger, async () => {
    if (loadingTrigger.value && !clientId.value) {
      const result = await $fetch("/api/keys/paypal", {
        headers: {
          authorization: `Bearer ${authStore.userInfo?.token}`,
        },
      })
      if (result) {
        clientId.value = result
      } else {
        error.value = "Failed to load the PayPal Client ID"
      }
    }
  })

  watchOnce(clientId, async () => {
    if (clientId.value) {
      try {
        client.value = await loadScript({
          clientId: clientId.value,
          currency: "USD",
        })
      } catch (err) {
        console.error(err)
        error.value = "Failed to load the PayPal JS SDK script"
      }
    }
  })

  watchOnce(client, async () => {
    if (client.value && client.value.Buttons) {
      try {
        await client.value.Buttons().render(buttonsContainer)
      } catch (err) {
        console.error(err)
        error.value = "Failed to render the PayPal Buttons"
      }
    }
  })

  return {
    clientId,
    error,
    client,
    isLoading,
  }
}

export {usePayPal}
