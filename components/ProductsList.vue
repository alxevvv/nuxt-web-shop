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
import {q} from "groqd"
import {Product} from "@/models"

const sanity = useSanityClient()

const {query} = q("*").filter("_type == 'product'")

const {data: products} = await useAsyncData("products", () => {
  return sanity.fetch<Product[]>(query)
})
</script>
