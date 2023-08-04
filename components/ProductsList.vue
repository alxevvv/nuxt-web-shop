<template>
  <v-container>
    <v-row>
      <v-col v-for="product in products" :key="product._id" :md="4">
        <product-preview :product="product" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import {Product} from "@/models"

const sanity = useSanity()

const query = groq`*[_type == "product"]`
const {data: products} = await useAsyncData("products", () => {
  return sanity.fetch<Product[]>(query)
})
</script>
