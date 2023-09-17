<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page padding>
        <router-view />
      </q-page>
    </q-page-container>

    <q-tabs v-model="tab" class="fixed-bottom bg-primary" active-color="accent">
      <q-route-tab
        v-for="nav in navigation"
        :key="nav.to"
        :icon="nav.icon"
        :to="nav.to"
        exact
      />
    </q-tabs>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";

const tab = ref("buchen");

const navigation = [
  {
    icon: "home",
    to: "/",
  },
  {
    icon: "sports_mma",
    to: "/booking",
  },
  {
    icon: "account_circle",
    to: "/account",
  },
];
</script>
