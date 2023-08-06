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
          <v-table>
            <thead>
              <tr>
                <th class="text-left">#</th>
                <th class="text-left">&nbsp;</th>
                <th class="text-left">Name</th>
                <th class="text-left">Quantity</th>
                <th class="text-left">Price</th>
                <th class="text-left">&nbsp;</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(item, index) in cartStore.items" :key="item._id">
                <td class="pa-3">
                  {{ index + 1 }}
                </td>
                <td class="pa-3">
                  <v-img :src="item.image" :alt="item.name" />
                </td>
                <td class="pa-3">
                  <nuxt-link :to="`/product/${item.slug}`">
                    {{ item.name }}
                  </nuxt-link>
                </td>
                <td class="pa-3">
                  <v-select
                    hide-details
                    :items="
                      [...Array(item.countInStock).keys()].map((x) => x + 1)
                    "
                    :model-value="item.quantity"
                    @update:model-value="(q) => cartStore.update(item._id, q)"
                  />
                </td>
                <td class="text-right pa-3">
                  <v-chip color="success">
                    ${{ item.price * item.quantity }}
                  </v-chip>
                </td>
                <td class="text-right pa-3">
                  <v-btn
                    icon="mdi-trash-can"
                    @click="cartStore.remove(item._id)"
                  />
                </td>
              </tr>
            </tbody>
          </v-table>
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
const cartStore = useCartStore()

function checkout() {
  console.log("checkout")
}
</script>
