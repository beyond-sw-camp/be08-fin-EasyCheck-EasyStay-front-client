import { createPinia } from "pinia";
import router from "../router";
import materialKit from "../material-kit";

const pinia = createPinia();

export function setupPlugins(app) {
  app.use(router);
  app.use(pinia);
  app.use(materialKit);
}
