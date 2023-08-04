<template>
  <div>
    <slot />
  </div>
</template>

<script setup lang="ts">
useHead({
  link: [
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap",
    },
  ],
})
</script>
