<template>
  <nuxt-link to="/cart" class="mr-2">
    <v-btn icon>
      <v-badge :content="badgeQuantity" color="success">
        <v-icon>mdi-cart</v-icon>
      </v-badge>
    </v-btn>
  </nuxt-link>
</template>

<script setup lang="ts">
const cartStore = useCartStore()

const badgeQuantity = computed(() =>
  cartStore.numItems > 9 ? "9+" : cartStore.numItems.toString()
)
</script>
