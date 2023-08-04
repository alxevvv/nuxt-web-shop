<template>
  <div>
    <slot />
  </div>
</template>

<script setup lang="ts">
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - Nuxt Web Shop` : "Nuxt Web Shop"
  },
  link: [
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap",
    },
  ],
})
</script>
