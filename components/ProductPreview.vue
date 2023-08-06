<template>
  <v-card>
    <nuxt-link :to="`/product/${product.slug.current}`">
      <v-img
        cover
        :height="360"
        :src="$urlFor(product!.image).size(360, 360).url()"
        :alt="product!.name"
      />

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
