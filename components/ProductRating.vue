<template>
  <div class="d-flex align-center">
    <v-rating
      :model-value="product.rating"
      color="amber"
      density="compact"
      half-increments
      readonly
      size="small"
    />

    <div v-if="showNumReviews" class="text-grey ms-4">
      {{ product.rating }} ({{ product.numReviews }} reviews)
    </div>
  </div>
</template>

<script setup lang="ts">
import {Product} from "@/models"

withDefaults(
  defineProps<{
    product: Product
    showNumReviews?: boolean
  }>(),
  {
    showNumReviews: false,
  }
)
</script>
