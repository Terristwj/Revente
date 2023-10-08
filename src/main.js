import "./assets/styles/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router/router.js";

// Component library
import connectPrimeVue from "./services/PrimeVue.js";

// Firebase Database
import connectFirebase from "./services/Firebase/FirebaseConfig";

const app = createApp(App);

app.use(createPinia());
app.use(router);

// Refer to PrimeVue.js for the full list of components
connectPrimeVue(app);

// Refer to Firebase.js for configuration
connectFirebase();

app.mount("#app");
