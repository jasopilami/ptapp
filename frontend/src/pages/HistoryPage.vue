<template>
  <pt-header>Deine Buchungen</pt-header>
  <q-page padding>
    <q-list bordered>
      <pt-booking-item
        v-for="buchung in buchungen"
        :key="buchung.id"
        :session="buchung"
      />
    </q-list>
  </q-page>
</template>

<script setup>
const buchungen = [
  {
    id: 1,
    title: "Wettkampfvorbereitung",
    description:
      "Coole Beschreibung, ganz lange beschreibung mit viel Inhalt soll auch viel Inhalt haben und ganz lang etwas anzeigen",
    price: 200,
    time_in_minutes: 60,
    time_descriptor: "Jeden Dienstag um 16:00",
    trainer: {
      name: "Jascha",
      avatar: "https://cdn.quasar.dev/img/avatar.png",
    },
  },
  {
    id: 2,
    title: "Grundlagentraining",
    description: "Für Anfänger",
    price: 100,
    time_in_minutes: 120,
    time_descriptor: "Samstags um 18:00",
    trainer: {
      name: "Jascha",
      avatar: "https://cdn.quasar.dev/img/avatar.png",
    },
  },
];
</script>
