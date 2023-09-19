import { onMounted, ref } from "vue";
import { api } from "../boot/axios";

export function useHttp(url) {
  const data = ref([]);

  async function fetchData() {
    const res = await api.get(url);
    data.value = res.data;
  }

  onMounted(() => fetchData());

  return data;
}
