<template>
  <pt-header>Dein Training bei {{ trainer.name }}</pt-header>
  <q-page padding>
    <div class="column items-center q-mt-md">
      <q-avatar size="100px">
        <img :src="trainer.avatar" />
      </q-avatar>

      <q-list bordered class="q-my-xl full-width">
        <pt-booking-item
          v-for="session in trainer.sessions"
          :key="session.id"
          :session="session"
        />
      </q-list>

      <div class="text-h6 text-grey-4">Gesamt</div>

      <div class="text-h5 text-accent">
        100 Euro
        <q-icon name="euro_symbol" />
      </div>
    </div>

    <q-btn
      color="accent"
      label="OK"
      rounded
      glossy
      icon="shopping_cart"
      class="full-width q-mt-xl"
    />
  </q-page>
</template>

<script setup>
const props = defineProps({
  id: String,
});

const trainer = {
  id: props.id,
  avatar: "https://cdn.quasar.dev/img/avatar.png",
  name: "Jascha",
  pricePerHour: 50.0,
  tags: ["Wettkampf", "Technik"],
  content: "Jascha ist brutaler Trainer",
  sessions: [
    {
      id: 1,
      title: "Wettkampfvorbereitung",
      description:
        "Coole Beschreibung, ganz lange beschreibung mit viel Inhalt soll auch viel Inhalt haben und ganz lang etwas anzeigen",
      price: 200,
      time_in_minutes: 60,
      time_descriptor: "Jeden Dienstag um 16:00",
    },
    {
      id: 2,
      title: "Grundlagentraining",
      description: "Für Anfänger",
      price: 100,
      time_in_minutes: 120,
      time_descriptor: "Samstags um 18:00",
    },
  ],
};
</script>
