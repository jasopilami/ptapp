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
        </div>
      </div>
      <q-card-section>
        <div class="text-overline">{{ t.pricePerHour }} Euro/Stunde</div>
        <div class="q-mb-xs q-gutter-sm">
          <q-badge v-for="tag in t.tags" :key="tag" outline :label="tag" />
        </div>
        <div class="text-caption text-grey">
          {{ t.content }}
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
const trainer = [
  {
    id: 1,
    avatar: "https://cdn.quasar.dev/img/avatar.png",
    name: "Jascha",
    pricePerHour: 50.0,
    tags: ["Wettkampf", "Technik"],
    content: "Jascha ist brutaler Trainer",
  },
  {
    id: 2,
    avatar: "https://cdn.quasar.dev/img/avatar.png",
    name: "Niko",
    pricePerHour: 200.99,
    tags: ["Wettkampf", "Technik", "Brutal"],
    content: "Hallo, Welt",
  },
];
</script>
