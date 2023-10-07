import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

// Component library
import connectPrimeVue from "./service/primevue";

// Firebase Database
import connectFirebase from "./service/Firebase";

const app = createApp(App);

app.use(createPinia());
app.use(router);

// Refer to PrimeVue.js for the full list of components
connectPrimeVue(app);

// Refer to Firebase.js for the full list of components
connectFirebase();

app.mount("#app");
