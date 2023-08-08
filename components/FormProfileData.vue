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
      autocomplete="username"
      variant="outlined"
      required
    />

    <v-text-field
      v-model="password"
      type="password"
      :rules="passwordRules"
      label="Password"
      autocomplete="new-password"
      variant="outlined"
    />

    <v-text-field
      v-model="passwordConfirm"
      type="password"
      :rules="passwordConfirmRules"
      label="Password confirm"
      autocomplete="new-password"
      variant="outlined"
    />

    <v-btn
      block
      :loading="isLoading"
      type="submit"
      class="mt-2"
      text="Continue"
      color="secondary"
    />
  </v-form>
</template>

<script setup lang="ts">
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

    return "Name must be at least 2 characters long"
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
    if (value.length === 0 || value.length > 5) return true

    return "Password must be more than 5 characters"
  },
]

const passwordConfirmRules = [
  (value: string) => {
    if (value.length === 0 || value.length > 5) return true

    return "Password must be more than 5 characters"
  },
  (value: string) => {
    if (value === password.value) return true

    return "Passwords must match each other"
  },
]

async function handleSubmit() {
  if (!isValid.value) {
    return
  }

  isLoading.value = true

  const {data: user, error} = await useFetch("/api/users/me", {
    method: "PATCH",
    body: {
      name: name.value,
      email: email.value,
      password: password.value,
    },
    headers: {
      authorization: `Bearer ${authStore.userInfo?.token}`,
    },
  })
  isLoading.value = false

  if (!user.value) {
    snackbar.add({
      type: "error",
      text: error.value?.message ?? "Unable to update profile info",
    })
    return
  }
  authStore.updateUserInfo(user.value)
  snackbar.add({
    type: "success",
    text: "Profile info updated successfully",
  })

  password.value = ""
  passwordConfirm.value = ""
}

onMounted(() => {
  name.value = authStore.userInfo?.name ?? ""
  email.value = authStore.userInfo?.email ?? ""
})
</script>
