<template>
  <div class="full-width q-px-xl">
    <pt-header>News anlegen</pt-header>
    <q-input
      v-model="news.title"
      rounded
      class="q-my-md"
      color="accent"
      outlined
      label="Titel"
    />
    <q-input
      type="textarea"
      v-model="news.message"
      rounded
      class="q-my-md"
      color="accent"
      outlined
      label="Beschreibung"
    />

    <q-btn
      glossy
      color="accent"
      class="full-width q-mt-xl"
      label="Anlegen"
      @click="createNews"
    />
  </div>
</template>

<script setup>
import { api } from "src/boot/axios";
import { reactive } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const news = reactive({
  title: "",
  message: "",
});

async function createNews() {
  await api.post("/trainer/news", {
    ...news,
  });
  router.push("/trainer");
}
</script>
