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

  <v-snackbar
    color="error"
    location="top center"
    v-model="snackbars.error.visible"
  >
    {{ snackbars.error.message }}

    <template v-slot:actions>
      <v-btn variant="text" @click="snackbars.error.visible = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>

  <v-snackbar
    color="success"
    location="top center"
    v-model="snackbars.success.visible"
  >
    {{ snackbars.success.message }}

    <template v-slot:actions>
      <v-btn variant="text" @click="snackbars.success.visible = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
import {Product} from "@/models"
import {useCart} from "@/stores"

const route = useRoute()
const slug = route.params.slug

const sanity = useSanity()
const cart = useCart()

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

const snackbars = reactive({
  error: {visible: false, message: ""},
  success: {visible: false, message: ""},
})

async function addToCart() {
  const {error} = await cart.add(product.value!._id)
  if (error) {
    snackbars.error.message = error
    snackbars.error.visible = true
  } else {
    snackbars.success.message = `${product.value!.name} added to the cart`
    snackbars.success.visible = true
  }
}
</script>
