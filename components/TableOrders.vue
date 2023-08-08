<template>
  <v-table>
    <thead>
      <tr>
        <th class="text-left">#</th>
        <th class="text-left">ID</th>
        <th class="text-left">Date</th>
        <th class="text-left">Total</th>
        <th class="text-left">Paid</th>
        <th class="text-left">&nbsp;</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(order, index) in props.orders" :key="order._id">
        <td class="pa-3">
          {{ index + 1 }}
        </td>
        <td class="pa-3">
          <nuxt-link :to="`/order/${order._id}`">
            {{ order._id }}
          </nuxt-link>
        </td>
        <td class="pa-3">
          {{ order._createdAt }}
        </td>
        <td class="pa-3">
          {{ order.totalPrice }}
        </td>
        <td class="pa-3">
          {{ order.isPaid ? `Paid at ${order.paidAt}` : "Not paid" }}
        </td>
        <td class="pa-3">
          <nuxt-link :to="`/order/${order._id}`">
            <v-btn>Details</v-btn>
          </nuxt-link>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script setup lang="ts">
import {Order} from "@/models"

const props = defineProps<{
  orders: Order[]
}>()
</script>
