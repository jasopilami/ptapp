<template>
  <pt-header>Dein Training bei {{ trainer.name }}</pt-header>
  <q-page padding>
    <div class="column items-center q-mt-md">
      <q-avatar size="100px">
        <img :src="trainer.avatar" />
      </q-avatar>

      <div class="q-my-sm text-grey text-caption">{{ trainer.email }}</div>

      <q-list bordered class="q-my-xl full-width">
        <pt-booking-item
          v-for="session in trainer.Sessions"
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
      @click="buySessions"
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
import { ref, computed, onMounted } from "vue";
import { api } from "src/boot/axios";
import { useRouter } from "vue-router";

const props = defineProps({
  id: String,
});

const trainer = ref({});
const router = useRouter();

async function buySessions() {
  try {
    await api.post("/buy", {
      sessions: trainer.value.Sessions.filter((s) => s.booked).map((s) => s.id),
    });
    router.push("/account");
  } catch (err) {
    console.error("something went wrong", err);
  }
}

onMounted(async () => {
  const res = await api.get(`/trainer/${props.id}`);
  trainer.value = {
    ...res.data,
    Sessions: res.data.Sessions.map((session) => ({
      ...session,
      booked: ref(false),
    })),
  };
});

const gesamt = computed(() => {
  if (!trainer.value.Sessions) return 0;
  return trainer.value.Sessions.filter((s) => s.booked)
    .map((s) => s.price)
    .reduce((a, b) => a + b, 0);
});
</script>
