<template>
  <v-switch
    v-model="isDark"
    inset
    hide-details
    :false-icon="themeIcon"
    :true-icon="themeIcon"
  />
</template>

<script setup lang="ts">
import {useAppTheme} from "@/composables"

const {isDark, themeIcon} = useAppTheme()
</script>
