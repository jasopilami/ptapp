<template>
  <pt-header>Neuigkeiten</pt-header>
  <q-page padding>
    <q-card v-for="n in news" :key="n.id" class="q-my-md" flat>
      <q-card-section>
        <div class="text-subtitle2">{{ n.date }}</div>
        <div class="text-h6">{{ n.title }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        {{ n.content }}
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
const news = [
  {
    id: 1,
    title: "Öffnungszeiten Weihnachten",
    date: "20.12.2023",
    content: "Auch an Weihnachten haben wir für euch offen",
  },
  {
    id: 2,
    title: "Öffnungszeiten Ostern",
    date: "20.03.2023",
    content: "Auch an Ostern haben wir weiterhin offen",
  },
];
</script>
