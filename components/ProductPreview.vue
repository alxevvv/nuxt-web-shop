<template>
  <v-card>
    <nuxt-link :to="`/product/${product.slug.current}`">
      <sanity-image :asset-id="product.image.asset._ref" auto="format">
        <template #default="{src}">
          <v-img cover height="250" :src="src" />
        </template>
      </sanity-image>

      <v-card-item>
        <v-card-title>
          {{ product.name }}
        </v-card-title>
      </v-card-item>
    </nuxt-link>

    <v-card-text>
      <product-rating :product="product" />
    </v-card-text>

    <v-divider class="mx-4 mt-3 mb-1" />

    <v-card-actions>
      <div class="w-100 d-flex justify-space-between">
        <v-chip size="large" color="success">${{ product.price }}</v-chip>
        <v-btn variant="text" color="secondary" @click="addToCart">
          Add to Cart
        </v-btn>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import {Product} from "@/models"

const props = defineProps<{
  product: Product
}>()

const {product} = toRefs(props)

const addToCart = useAddToCart(product.value)
</script>
