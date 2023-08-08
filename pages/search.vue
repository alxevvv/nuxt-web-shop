<template>
  <Title>Search</Title>

  <v-container>
    <v-row>
      <v-col :md="3" cols="12">
        <v-card class="pa-5">
          <div v-if="searchStore.isCategoriesLoading">
            <v-icon icon="mdi-loading mdi-spin" />
            Loading...
          </div>

          <div v-else>
            <v-list class="pa-0">
              <v-list-item class="px-0">
                <v-select
                  v-model="searchStore.category"
                  :items="['All', ...(searchStore.categories ?? [])]"
                  variant="solo-filled"
                  label="Category"
                />
              </v-list-item>

              <v-list-item class="px-0">
                <v-select
                  v-model="searchStore.price"
                  :items="[
                    {title: 'All', value: 'All'},
                    {title: 'Lower than $40', value: '0-39.99'},
                    {title: 'From $40 to $100', value: '40-100'},
                    {title: '$100 and higher', value: '100-1000000'},
                  ]"
                  variant="solo-filled"
                  label="Price"
                />
              </v-list-item>

              <v-list-item class="px-0">
                <v-select
                  v-model="searchStore.rating"
                  :items="[
                    {title: 'All', value: 'All'},
                    {title: '1 ⭐', value: '1'},
                    {title: '2 ⭐⭐', value: '2'},
                    {title: '3 ⭐⭐⭐', value: '3'},
                    {title: '4 ⭐⭐⭐⭐', value: '4'},
                    {title: '5 ⭐⭐⭐⭐⭐', value: '5'},
                  ]"
                  variant="solo-filled"
                  label="Minimal Rating"
                />
              </v-list-item>
            </v-list>

            <v-divider class="mb-3" />

            <v-list class="px-0 pb-0">
              <v-list-item class="px-0">
                <v-btn
                  block
                  color="secondary"
                  :loading="searchStore.isProductsLoading"
                  @click="searchStore.updateProducts"
                >
                  Apply Filters
                </v-btn>
              </v-list-item>

              <v-list-item v-if="searchStore.isFiltersChanged" class="px-0">
                <v-btn
                  block
                  :disabled="searchStore.isProductsLoading"
                  @click="searchStore.resetFilters"
                >
                  Reset Filters
                </v-btn>
              </v-list-item>
            </v-list>
          </div>
        </v-card>

        <v-card v-if="!searchStore.isCategoriesLoading" class="pa-5 mt-5">
          <v-select
            hide-details
            v-model="searchStore.sort"
            :items="[
              {title: 'Default', value: 'default'},
              {title: 'Price: Low to High', value: 'lowest'},
              {title: 'Price: High to Low', value: 'highest'},
              {title: 'Top rated', value: 'toprated'},
            ]"
            variant="solo-filled"
            label="Sorting"
          />
        </v-card>
      </v-col>

      <v-col :md="9" cols="12">
        <v-card v-if="searchStore.isProductsLoading" class="pa-5">
          <v-icon icon="mdi-loading mdi-spin" />
          Loading products...
        </v-card>

        <v-card v-else-if="searchStore.products?.length === 0" class="pa-5">
          <v-alert color="info">
            There are no products for selected criteria
          </v-alert>
        </v-card>

        <v-row v-else>
          <v-col
            v-for="product in searchStore.products"
            :key="product._id"
            :md="4"
          >
            <product-preview :product="product" :image-height="240" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
const searchStore = useSearchStore()

onMounted(() => {
  searchStore.updateProducts()
})
</script>
