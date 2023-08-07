<template>
  <Title>Shopping Cart</Title>

  <v-container>
    <v-row>
      <v-col>
        <h1 class="text-h1">Shopping Cart</h1>
      </v-col>
    </v-row>

    <v-row v-if="!cartStore.isItemsLoaded">
      <v-col>
        <v-card class="pa-5">
          <v-icon icon="mdi-loading mdi-spin" />
          Loading cart items...
        </v-card>
      </v-col>
    </v-row>

    <v-row v-else-if="cartStore.numItems === 0">
      <v-col>
        <v-card class="pa-5">
          Cart is empty.
          <nuxt-link to="/">Go shopping</nuxt-link>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col :md="9" cols="12">
        <v-card class="pa-5">
          <table-order-items editable />
        </v-card>
      </v-col>

      <v-col :md="3" cols="12">
        <v-card>
          <v-list>
            <v-list-item>
              <h2 class="text-h2">
                Subtotal ({{ cartStore.numUnits }} items):
              </h2>

              <v-chip size="x-large" color="success">
                ${{ cartStore.itemsPrice }}
              </v-chip>
            </v-list-item>

            <v-divider class="my-3" />

            <v-list-item>
              <v-btn color="secondary" class="w-100" @click="checkout">
                Checkout
              </v-btn>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
const router = useRouter()
const cartStore = useCartStore()

function checkout() {
  router.push("/shipping")
}
</script>
