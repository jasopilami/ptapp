<template>
  <div class="full-width q-px-xl">
    <q-btn to="/account" color="accent"> Zurück </q-btn>
    <pt-header>Trainer Verwaltung</pt-header>
    <div class="q-gutter-md text-center q-mb-xl">
      <q-btn to="/trainer/createNews" color="accent"> News anlegen </q-btn>
      <q-btn to="/trainer/createTrainer" color="accent">
        Trainer anlegen
      </q-btn>
      <q-btn to="/trainer/createSession" color="accent">
        Session anlegen
      </q-btn>
    </div>
    <RouterView />
  </div>
</template>
