<template>
  <pt-header>Training Buchen</pt-header>

  <q-page padding>
    <q-card class="q-my-md" v-for="t in trainer" :key="t.id" flat>
      <div class="row">
        <q-avatar size="100px" class="q-mt-md q-ml-md q-mr-md">
          <img :src="t.avatar" />
        </q-avatar>
        <div class="text-h5 self-center">
          {{ t.name }}
          <div class="text-caption text-grey">
            {{ t.email }}
          </div>
        </div>
      </div>
      <q-card-section>
        <div>
          {{ t.description }}
        </div>
      </q-card-section>

      <q-card-actions>
        <q-space />
        <q-btn
          :to="`/booking/${t.id}`"
          color="accent"
          label="Buchen"
          unelevated
          rounded
          glossy
          icon="shopping_cart"
          class="full-width q-mb-md"
        />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup>
import { useHttp } from "../composables/http";

const trainer = useHttp("/trainer");
</script>
