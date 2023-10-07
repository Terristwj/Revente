import "./assets/styles/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

// Component library
import connectPrimeVue from "./services/PrimeVue";

// Firebase Database
import connectFirebase from "./services/Firebase";

const app = createApp(App);

app.use(createPinia());
app.use(router);

// Refer to PrimeVue.js for the full list of components
connectPrimeVue(app);

// Refer to Firebase.js for configuration
let firebaseApp = connectFirebase();

app.mount("#app");

export default firebaseApp;
