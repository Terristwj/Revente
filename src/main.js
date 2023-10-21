import "./assets/styles/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
// Track userID
import { useCurrentUserStore } from "./stores/currentUser.js";
import { useCurrentItemID } from "./stores/currentItem.js";
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
import { faHeart, faUser, faInfo, faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
const app = createApp(App);

app.use(createPinia());
export const userStore = useCurrentUserStore();
export const itemStore = useCurrentItemID();
app.use(router);

// Refer to PrimeVue.js for the full list of components
connectPrimeVue(app);

// Refer to Firebase.js for configuration
export const FirestoreDatabase = connectFirebase();

// Font-Awesome Icons
library.add(faFacebookF, faTwitter, faInstagram, faTiktok, faHeart, far, faUser, faInfo, faShoppingBag);
app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
