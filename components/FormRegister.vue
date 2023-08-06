<template>
  <v-form v-model="isValid" validate-on="blur" @submit.prevent="handleSubmit">
    <v-text-field
      v-model="name"
      :rules="nameRules"
      label="Name"
      variant="outlined"
      required
    />

    <v-text-field
      v-model="email"
      type="email"
      :rules="emailRules"
      label="E-mail"
      variant="outlined"
      required
    />

    <v-text-field
      v-model="password"
      type="password"
      :rules="passwordRules"
      label="Password"
      variant="outlined"
      required
    />

    <v-text-field
      v-model="passwordConfirm"
      type="password"
      :rules="passwordConfirmRules"
      label="Password confirm"
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
const router = useRouter()
const snackbar = useSnackbar()
const authStore = useAuthStore()

const isValid = ref(false)
const isLoading = ref(false)

const name = ref("")
const email = ref("")
const password = ref("")
const passwordConfirm = ref("")

const nameRules = [
  (value: string) => {
    if (value) return true

    return "Name is required."
  },
  (value: string) => {
    if (value.length >= 2) return true

    return "Password must be at least 2 characters long"
  },
]

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

const passwordConfirmRules = [
  (value: string) => {
    if (value) return true

    return "Password is required."
  },
  (value: string) => {
    if (value.length > 5) return true

    return "Password must be more than 5 characters"
  },
  (value: string) => {
    if (value === password.value) return true

    return "Passwords must match each other"
  },
]

async function handleSubmit() {
  isLoading.value = true
  const {data: user, error} = await useFetch("/api/users/register", {
    method: "POST",
    body: {
      name: name.value,
      email: email.value,
      password: password.value,
    },
  })
  isLoading.value = false
  if (!user.value) {
    snackbar.add({
      type: "error",
      text: error.value?.message ?? "Unable to register",
    })
    return
  }
  authStore.login(user.value)
  snackbar.add({
    type: "success",
    text: `Hello, ${user.value.name}!`,
  })
  router.replace("/")
}

onMounted(() => {
  if (authStore.isAuthenticated) {
    router.replace("/")
  }
})
</script>
