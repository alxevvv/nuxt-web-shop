<template>
  <Title>Login</Title>

  <v-container>
    <v-row>
      <v-col cols="6" offset="3">
        <h1 class="text-h1">Login</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="6" offset="3">
        <v-card class="pa-5">
          <form-login />
          <v-divider class="mt-5 mb-3" />
          Don't have an account?
          <nuxt-link to="/auth/register">Register</nuxt-link>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
