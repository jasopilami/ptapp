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
      :type="isPwd ? 'password' : 'text'"
      color="accent"
      rounded
      class="q-my-md"
      outlined
      v-model="password"
      label="Password"
    >
      <template v-slot:append>
        <q-icon
          :name="isPwd ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isPwd = !isPwd"
        />
      </template>
      <template v-slot:prepend>
        <q-icon name="lock_open" />
      </template>
    </q-input>

    <div class="q-my-xl" />
    <q-btn
      label="Login"
      glossy
      color="accent"
      class="full-width"
      @click="login"
    />
    <q-btn
      label="Registrieren"
      color="grey-6"
      flat
      class="full-width q-mt-xl"
    />
  </div>
</template>

<script setup>
import { api } from "../boot/axios";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const email = ref("");
const password = ref("");

const isPwd = ref(true);

async function login() {
  try {
    await api.post("/login", {
      email: email.value,
      password: password.value,
    });
    router.push("/");
  } catch (err) {
    console.error(err)
  }
}
</script>
