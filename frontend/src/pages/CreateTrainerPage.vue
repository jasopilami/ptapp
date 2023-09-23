<template>
  <div class="full-width q-px-xl">
    <pt-header>Trainer anlegen</pt-header>

    <q-input
      v-model="trainer.name"
      rounded
      class="q-my-md"
      color="accent"
      outlined
      label="Name"
    />
    <q-input
      v-model="trainer.email"
      rounded
      class="q-my-md"
      color="accent"
      outlined
      label="E-Mail"
    />
    <q-input
      v-model="trainer.password"
      rounded
      class="q-my-md"
      color="accent"
      outlined
      label="Password"
    />
    <q-input
      type="textarea"
      v-model="trainer.description"
      rounded
      class="q-my-md"
      color="accent"
      outlined
      label="Beschreibung"
    />
    <q-input
      v-model="trainer.avatar"
      rounded
      class="q-my-md"
      color="accent"
      outlined
      label="Avatar URL"
    />

    <q-btn
      label="Anlegen"
      glossy
      color="accent"
      class="full-width q-mt-xl"
      @click="createTrainer"
    />
  </div>
</template>

<script setup>
import { api } from "src/boot/axios";
import { reactive } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const trainer = reactive({
  name: "",
  email: "",
  password: "",
  description: "",
  avatar: "",
});

async function createTrainer() {
  try {
    await api.post("/trainer", {
      ...trainer,
    });
    router.push("/trainer");
  } catch (err) {}
}
</script>
