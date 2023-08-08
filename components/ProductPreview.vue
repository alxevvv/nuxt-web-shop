<template>
  <v-card>
    <nuxt-link :to="`/product/${product.slug.current}`">
      <v-img
        cover
        :height="props.imageHeight"
        :src="imageUrl"
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

const {$urlFor} = useNuxtApp()

const props = withDefaults(
  defineProps<{
    product: Product
    imageHeight?: number
  }>(),
  {
    imageHeight: 360,
  }
)

const {product} = toRefs(props)

const imageUrl = computed(() =>
  $urlFor(product.value!.image).size(props.imageHeight, props.imageHeight).url()
)

const addToCart = useAddToCart(product.value)
</script>
