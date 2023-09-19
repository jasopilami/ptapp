<template>
  <pt-header>Dein Account</pt-header>

  <div class="text-center text-h6 text-grey-4">
    <div>{{ user.name }}</div>
    <div>{{ user.email }}</div>
  </div>

  <pt-header>Deine Buchungen</pt-header>
  <q-page padding>
    <q-list bordered>
      <pt-booking-item
        v-for="buchung in buchungen"
        :key="buchung.id"
        :session="buchung.Session"
      />
    </q-list>
  </q-page>
</template>

<script setup>
import { useHttp } from "src/composables/http";
const user = useHttp("/hello");
const buchungen = useHttp("/bookings");
</script>
