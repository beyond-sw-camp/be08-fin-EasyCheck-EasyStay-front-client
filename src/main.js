import { createApp } from "vue";
import App from "./App.vue";
import vClickOutside from 'v-click-outside';

// Nucleo Icons
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import { setupPlugins } from "./plugins";
import { useKakao } from "vue3-kakao-maps/@utils";
import { createPinia } from "pinia";
import axios from "axios";

useKakao(import.meta.env.VITE_PUBLIC_KAKAO_API_KEY);

axios.defaults.baseURL = "http://localhost:8080";
const app = createApp(App);

const pinia = createPinia();
app.use(pinia);

setupPlugins(app);

app.use(vClickOutside);
app.mount("#app");
