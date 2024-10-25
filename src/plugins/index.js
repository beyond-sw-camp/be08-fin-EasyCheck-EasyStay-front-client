import { createPinia } from "pinia";
import router from "../router";
import materialKit from "../material-kit";
import VCalendar from "v-calendar";
import "v-calendar/style.css";
import dayjs from "dayjs";

const pinia = createPinia();

export function setupPlugins(app) {
  app.use(router);
  app.use(pinia);
  app.use(VCalendar);
  app.use(materialKit);
  app.use(dayjs);
}
