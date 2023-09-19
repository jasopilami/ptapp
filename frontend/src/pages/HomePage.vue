<template>
  <pt-header>Neuigkeiten</pt-header>
  <q-page padding>
    <q-card v-for="n in news" :key="n.id" class="q-my-md" flat>
      <q-card-section>
        <div class="text-caption text-grey">
          {{ new Date(n.updatedAt).toLocaleDateString() }}
        </div>
        <div class="text-h6">{{ n.title }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        {{ n.message }}
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { useHttp } from "../composables/http";
const news = useHttp("/news");
</script>
