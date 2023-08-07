<template>
  <v-table>
    <thead>
      <tr>
        <th class="text-left">#</th>
        <th class="text-left">&nbsp;</th>
        <th class="text-left">Name</th>
        <th class="text-left">Quantity</th>
        <th class="text-left">Price</th>
        <th class="text-left" v-if="props.editable">&nbsp;</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(item, index) in cartStore.items" :key="item._id">
        <td class="pa-3">
          {{ index + 1 }}
        </td>
        <td class="pa-3">
          <v-img :src="item.image" :alt="item.name" />
        </td>
        <td class="pa-3">
          <nuxt-link :to="`/product/${item.slug}`">
            {{ item.name }}
          </nuxt-link>
        </td>
        <td class="pa-3">
          <v-select
            v-if="props.editable"
            hide-details
            :items="[...Array(item.countInStock).keys()].map((x) => x + 1)"
            :model-value="item.quantity"
            @update:model-value="(q) => cartStore.update(item._id, q)"
          />
          <span v-else>{{ item.quantity }}</span>
        </td>
        <td class="pa-3">
          <v-chip color="success"> ${{ item.price * item.quantity }} </v-chip>
        </td>
        <td class="pa-3" v-if="props.editable">
          <v-btn icon="mdi-trash-can" @click="cartStore.remove(item._id)" />
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{editable?: boolean}>(), {
  editable: false,
})

const cartStore = useCartStore()
</script>
