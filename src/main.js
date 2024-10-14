import { createApp } from "vue";
import App from "./App.vue";

// Nucleo Icons
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import { setupPlugins } from "./plugins";

const app = createApp(App);

setupPlugins(app);

app.mount("#app");
