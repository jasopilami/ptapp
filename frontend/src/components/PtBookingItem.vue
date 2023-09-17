<template>
  <q-item clickable v-ripple>
    <q-item-section class="q-mb-md">
      <div v-if="session.trainer" class="row q-mb-md">
        <q-avatar color="primary" text-color="white" class="q-mr-md">
          <img :src="session.trainer.avatar" />
        </q-avatar>
        <q-item-label class="self-center text-h6">{{
          session.trainer.name
        }}</q-item-label>
      </div>
      <div>
        <div class="q-mb-md float-left">
          <q-item-label class="text-accent">{{ session.title }}</q-item-label>
          <q-item-label>
            {{ session.time_descriptor }}
          </q-item-label>
        </div>
        <div class="q-mb-md float-right">
          <div class="text-warning">
            {{ session.price }} Euro
            <q-icon name="euro_symbol" />
          </div>

          <div class="text-positive">
            {{ session.time_in_minutes }} Minuten
            <q-icon name="schedule" />
          </div>
        </div>
      </div>
      <q-item-label caption>
        {{ session.description }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup>
const props = defineProps(["session"]);
</script>
