<template>
  <v-form v-model="isValid" validate-on="blur" @submit.prevent="handleSubmit">
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
      :disabled="authStore.isAuthenticated"
      type="submit"
      block
      class="mt-2"
      text="Submit"
      color="secondary"
    ></v-btn>
  </v-form>
</template>

<script setup lang="ts">
const router = useRouter()
const snackbar = useSnackbar()
const authStore = useAuthStore()

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

async function handleSubmit() {
  if (!isValid.value) {
    return
  }
  isLoading.value = true
  const {data: user, error} = await useFetch("/api/users/login", {
    method: "POST",
    body: {
      email: email.value,
      password: password.value,
    },
  })
  isLoading.value = false
  if (!user.value) {
    snackbar.add({
      type: "error",
      text: error.value?.message ?? "Unable to login",
    })
    return
  }
  authStore.login(user.value)
  snackbar.add({
    type: "success",
    text: `Hello, ${user.value.name}!`,
  })
}
</script>
