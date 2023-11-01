import "./assets/styles/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
// Track userID
import { useCurrentUserStore } from "./stores/currentUser.js";
import { useCurrentItemID } from "./stores/currentItem.js";
import { useCurrentCart } from "./stores/currentCart.js";
import { useCurrentRecents } from "./stores/recents.js";
import { useCurrentWishList } from "./stores/wishList.js";
import { useReviewStore } from "./stores/reviewSubmission.js";
import App from "./App.vue";
import router from "./router/router.js";

// Component library
import connectPrimeVue from "./services/PrimeVue.js";

// Firebase Database
import connectFirebase, {
    getMyFirestore,
    getMyStorage,
} from "./services/Firebase/FirebaseConfig";

// Font-Awesome Icons
import FontAwesomeIcon from "./services/FontAwesome.js";

// google maps geolocation
import Vue3Geolocation from "vue3-geolocation";

const app = createApp(App);
app.use(Vue3Geolocation);
app.use(createPinia());
export const userStore = useCurrentUserStore();
export const itemStore = useCurrentItemID();
export const shoppingCart = useCurrentCart();
export const wishList = useCurrentWishList();
export const recents = useCurrentRecents();
export const reviewStore = useReviewStore();
app.use(router);

// Refer to PrimeVue.js for the full list of components
connectPrimeVue(app);

// Refer to Firebase.js for configuration
const firebaseApp = connectFirebase();
export const FirestoreDatabase = getMyFirestore(firebaseApp);
export const FirestoreStorage = getMyStorage(firebaseApp);

// Refer to FontAwesome.js for configuration
app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
