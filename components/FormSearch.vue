<template>
  <v-form
    id="searchInputContainer"
    @submit.prevent="searchStore.updateProducts"
  >
    <v-text-field
      v-model="searchStore.searchQuery"
      label="Search"
      density="compact"
      variant="outlined"
      hide-details
    />

    <v-btn
      type="submit"
      icon="mdi-magnify"
      :loading="searchStore.isProductsLoading"
    />
  </v-form>
</template>

<script setup lang="ts">
const searchStore = useSearchStore()
</script>

<style lang="scss">
#searchInputContainer {
  min-width: 240px;
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
