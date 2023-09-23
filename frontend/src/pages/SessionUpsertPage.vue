<template>
  <div class="full-width q-px-xl">
    <pt-header>Session anlegen</pt-header>
    <q-input
      v-model="session.title"
      rounded
      class="q-my-md"
      color="accent"
      outlined
      label="Titel"
    />
    <q-input
      type="textarea"
      v-model="session.description"
      rounded
      class="q-my-md"
      color="accent"
      outlined
      label="Beschreibung"
    />
    <q-input
      v-model="session.dateTime"
      rounded
      class="q-my-md"
      color="accent"
      outlined
      label="Tag & Zeit"
    />
    <q-input
      type="number"
      v-model="session.price"
      rounded
      class="q-my-md"
      color="accent"
      outlined
      label="Preis in Euro"
    />
    <q-input
      type="number"
      v-model="session.timeInMinutes"
      rounded
      class="q-my-md"
      color="accent"
      outlined
      label="Zeit in Minuten"
    />

    <q-btn
      label="Anlegen"
      glossy
      color="accent"
      class="full-width q-mt-xl"
      @click="createSession"
    />

    <div class="q-my-xl" />
  </div>
</template>

<script setup>
import { api } from "src/boot/axios";
import { reactive } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const session = reactive({
  title: "",
  description: "",
  dateTime: "",
  price: 0,
  timeInMinutes: 0,
});

async function createSession() {
  await api.post("/trainer/sessions", {
    ...session,
  });
  router.push("/trainer");
}
</script>
