import "./assets/styles/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router/router.js";

// Component library
import connectPrimeVue from "./services/PrimeVue.js";

// Firebase Database
import connectFirebase from "./services/Firebase/FirebaseConfig";

// Font-Awesome Icons
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";

const app = createApp(App);

app.use(createPinia());
app.use(router);

// Refer to PrimeVue.js for the full list of components
connectPrimeVue(app);

// Refer to Firebase.js for configuration
connectFirebase();

// Font-Awesome Icons
library.add(faFacebookF, faTwitter, faInstagram, faTiktok, faHeart, far);
app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
