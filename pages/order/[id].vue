<template>
  <Title v-if="order">Order {{ id }}</Title>

  <v-container>
    <v-row v-if="order">
      <v-col>
        <h1 class="text-h1">Order {{ id }}</h1>
      </v-col>
    </v-row>

    <v-row v-if="!order">
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
          <p>{{ shippingAddressVerbose }}</p>
        </v-card>

        <v-card class="pa-5 mb-5">
          <h2 class="text-h2">Payment Method</h2>
          <p>{{ paymentMethodVerbose }}</p>
          <p class="mt-3">
            <v-chip :color="order!.isPaid ? 'success' : 'error'">
              {{ paymentStatus }}
            </v-chip>
          </p>
        </v-card>

        <v-card class="pa-5 mb-5">
          <h2 class="text-h2">Order Items</h2>
          <v-table>
            <thead>
              <tr>
                <th class="text-left">#</th>
                <th class="text-left">&nbsp;</th>
                <th class="text-left">Name</th>
                <th class="text-left">Quantity</th>
                <th class="text-left">Price</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(item, index) in order!.items" :key="item._key">
                <td class="pa-3">
                  {{ index + 1 }}
                </td>
                <td class="pa-3">
                  <v-img :src="item.image" :alt="item.name" />
                </td>
                <td class="pa-3">
                  {{ item.name }}
                </td>
                <td class="pa-3">
                  <span>{{ item.quantity }}</span>
                </td>
                <td class="pa-3">
                  <v-chip color="success">
                    ${{ item.price * item.quantity }}
                  </v-chip>
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-card>
      </v-col>

      <v-col :md="3" cols="12">
        <v-card class="pa-5">
          <h2 class="text-h2">Order Summary</h2>
          <v-list class="pa-0 mt-6">
            <v-list-item class="pa-0">
              <v-row>
                <v-col cols="6">Items:</v-col>
                <v-col cols="6">${{ order!.itemsPrice }}</v-col>

                <v-col cols="6">Tax:</v-col>
                <v-col cols="6">${{ order!.taxPrice }}</v-col>

                <v-col cols="6">Shipping:</v-col>
                <v-col cols="6">${{ order!.shippingPrice }}</v-col>

                <v-divider />

                <v-col cols="6">
                  <span class="font-weight-bold">Total:</span>
                </v-col>
                <v-col cols="6">
                  <span class="font-weight-bold">
                    ${{ order!.totalPrice }}
                  </span>
                </v-col>
              </v-row>
            </v-list-item>
          </v-list>

          <template v-if="!order.isPaid">
            <v-divider class="mt-3 mb-5" />

            <div
              v-if="order.paymentMethod === 'paypal'"
              id="paypal-button-container"
            >
              <div v-if="isPaypalLoading" class="text-center">
                <v-progress-circular indeterminate />
              </div>

              <div v-else-if="paypalError">
                <v-alert type="error" :text="paypalError" />
              </div>
            </div>
          </template>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import {Order} from "@/models"
import {PaymentInfo, paymentMethods} from "@/stores"
import {usePayPal} from "@/composables"

const router = useRouter()
const route = useRoute()

const id = route.params.id

const authStore = useAuthStore()

const order = ref<Order | null>(null)

const shippingAddressVerbose = computed(
  () =>
    `${order.value?.shippingAddress.fullName}, ${
      order.value?.shippingAddress.country
    }, ${
      order.value?.shippingAddress.city
        ? `${order.value?.shippingAddress.city}, `
        : ""
    }${order.value?.shippingAddress.address}, ${
      order.value?.shippingAddress.postalCode
    }`
)

const paymentMethodVerbose = computed(
  () => paymentMethods[order.value?.paymentMethod as PaymentInfo["method"]]
)

const paymentStatus = computed(() =>
  order.value?.isPaid ? `Paid at ${order.value?.paidAt}` : "Not paid"
)

const paypalLoadingTrigger = computed(
  () => !!order.value && order.value.paymentMethod === "paypal"
)

const {
  clientId: paypalClientId,
  client: paypal,
  isLoading: isPaypalLoading,
  error: paypalError,
} = usePayPal("#paypal-button-container", paypalLoadingTrigger)

onMounted(async () => {
  if (!authStore.isAuthenticated) {
    authStore.setLoginSuccessRedirect(route.fullPath)
    router.replace("/auth/login")
  } else {
    try {
      const result = await $fetch<Order>(`/api/order/${id}`, {
        headers: {
          authorization: `Bearer ${authStore.userInfo?.token}`,
        },
      })
      order.value = result
    } catch (err) {
      throw createError({
        statusCode: 404,
        message: (err as Error).message,
        fatal: true,
      })
    }
  }
})
</script>
