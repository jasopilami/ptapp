<template>
  <div class="absolute-center full-width q-px-xl">
    <pt-header>PT</pt-header>
    <q-input
      rounded
      class="q-my-md"
      color="accent"
      outlined
      v-model="email"
      label="E-Mail"
    >
      <template v-slot:prepend>
        <q-icon name="account_circle" />
      </template>
    </q-input>
    <q-input
      color="accent"
      rounded
      class="q-my-md"
      outlined
      v-model="password"
      label="Password"
    >
      <template v-slot:prepend>
        <q-icon name="lock_open" />
      </template>
    </q-input>
    <div class="q-my-xl" />
    <q-btn label="Login" glossy color="accent" class="full-width" />
    <q-btn
      label="Registrieren"
      color="grey-6"
      flat
      class="full-width q-mt-xl"
    />
  </div>
</template>

<script setup>
const email = "";
const password = "";
</script>
