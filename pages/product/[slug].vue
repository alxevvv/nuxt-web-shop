<template>
  <Title>{{ product!.name }}</Title>

  <v-container>
    <v-row>
      <v-col>
        <nuxt-link to="/">back to catalog</nuxt-link>
      </v-col>
    </v-row>
  </v-container>

  <v-container>
    <v-row>
      <v-col :md="6" :xs="12">
        <sanity-image :asset-id="product!.image.asset._ref" auto="format">
          <template #default="{src}">
            <v-img :src="src" />
          </template>
        </sanity-image>
      </v-col>

      <v-col :md="3" :xs="12">
        <v-list>
          <v-list-item>
            <h1 class="text-h1">{{ product!.name }}</h1>
          </v-list-item>

          <v-list-item>
            <span>Category: {{ product!.category }}</span>
          </v-list-item>

          <v-list-item>
            <span>Brand: {{ product!.brand }}</span>
          </v-list-item>

          <v-list-item class="w-100">
            <product-rating show-num-reviews :product="product!" />
          </v-list-item>

          <v-list-item>
            <span>Description: {{ product!.description }}</span>
          </v-list-item>
        </v-list>
      </v-col>

      <v-col :md="3" :xs="12">
        <v-card>
          <v-list>
            <v-list-item>
              <div class="d-flex">
                <div class="w-50">Price</div>
                <div class="w-50">${{ product!.price }}</div>
              </div>
            </v-list-item>

            <v-list-item>
              <div class="d-flex">
                <div class="w-50">Status</div>
                <div class="w-50">{{ stockStatus }}</div>
              </div>
            </v-list-item>

            <v-list-item>
              <v-btn color="secondary" class="w-100" @click="addToCart">
                Add to cart
              </v-btn>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import {Product} from "@/models"
import {useCart} from "@/stores"

const route = useRoute()
const slug = route.params.slug

const sanity = useSanity()
const cart = useCart()
const snackbar = useSnackbar()

const query = groq`*[_type == "product" && slug.current == $slug][0]`
const {data: product} = await useAsyncData(`product:${slug}`, () => {
  return sanity.fetch<Product>(query, {slug})
})

if (!product.value) {
  throw createError({
    statusCode: 404,
    fatal: true,
  })
}

const stockStatus = computed(() =>
  product.value!.countInStock > 0 ? "In stock" : "Unavailable"
)

async function addToCart() {
  const {error} = await cart.add(product.value!._id)
  if (error) {
    snackbar.add({
      type: "error",
      text: error,
    })
  } else {
    snackbar.add({
      type: "success",
      text: `${product.value!.name} added to the cart`,
    })
  }
}
</script>
