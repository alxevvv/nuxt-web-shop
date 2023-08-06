<template>
  <v-form v-model="isValid" validate-on="blur">
    <v-text-field
      v-model="email"
      type="email"
      :rules="emailRules"
      label="E-mail"
      variant="outlined"
      required
    />

    <v-text-field
      type="password"
      v-model="password"
      :rules="passwordRules"
      label="Password"
      variant="outlined"
      required
    />

    <v-btn
      :loading="isLoading"
      type="submit"
      block
      class="mt-2"
      text="Submit"
      color="secondary"
    ></v-btn>
  </v-form>
</template>

<script setup lang="ts">
const isValid = ref(false)
const isLoading = ref(false)

const email = ref("")
const password = ref("")

const emailRules = [
  (value: string) => {
    if (value) return true

    return "E-mail is required."
  },
  (value: string) => {
    if (/.+@.+\..+/.test(value)) return true

    return "E-mail must be valid."
  },
]

const passwordRules = [
  (value: string) => {
    if (value) return true

    return "Password is required."
  },
  (value: string) => {
    if (value.length > 5) return true

    return "Password must be more than 5 characters"
  },
]
</script>
