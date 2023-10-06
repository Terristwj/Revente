import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import connectPrimeVue from "./primevue";

const app = createApp(App);

app.use(createPinia());
app.use(router);

// Refer to primevue.js for the full list of components
connectPrimeVue(app);

app.mount("#app");
