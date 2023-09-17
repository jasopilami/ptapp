import { boot } from "quasar/wrappers";
import PtHeader from "../components/PtHeader.vue";
import PtBookingItem from "../components/PtBookingItem.vue";

export default boot(async ({ app }) => {
  app.component("pt-header", PtHeader);
  app.component("pt-booking-item", PtBookingItem);
});
