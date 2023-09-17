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
        >
          <q-checkbox
            v-model="session.booked"
            label="Bin dabei"
            color="teal"
            left-label
          />
        </pt-booking-item>
      </q-list>

      <div class="text-h6 text-grey-4">Gesamt</div>

      <div class="text-h5 text-accent">
        {{ gesamt }}
        <q-icon name="euro_symbol" />
      </div>
    </div>

    <q-btn
      to="/account"
      color="accent"
      label="OK"
      rounded
      glossy
      icon="shopping_cart"
      class="full-width q-my-xl"
    />
  </q-page>
</template>

<script setup>
import { computed, reactive, ref } from "vue";

const props = defineProps({
  id: String,
});

const gesamt = computed(() => {
  return trainer.sessions
    .filter((s) => s.booked)
    .map((s) => s.price)
    .reduce((a, b) => a + b, 0);
});

const trainer = reactive({
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
      booked: false,
    },
    {
      id: 2,
      title: "Grundlagentraining",
      description: "Für Anfänger",
      price: 100,
      time_in_minutes: 120,
      time_descriptor: "Samstags um 18:00",
      booked: false,
    },
  ],
});
</script>
