import './assets/styles/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
// Track userID
import { useCurrentUserStore } from './stores/currentUser.js';
import { useCurrentItemID } from './stores/currentItem.js';
import { useCurrentCart } from './stores/currentCart.js';
import App from './App.vue';
import router from './router/router.js';

// Component library
import connectPrimeVue from './services/PrimeVue.js';

// Firebase Database
import connectFirebase, {
	getMyFirestore,
	getMyStorage,
} from './services/Firebase/FirebaseConfig';

// Font-Awesome Icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
	faFacebookF,
	faTwitter,
	faInstagram,
	faTiktok,
} from '@fortawesome/free-brands-svg-icons';
import {
  faHeart,
  faUser,
  faInfo,
  faShoppingBag,
  faUpload,
  faCircleCheck,
  faHourglassHalf,
  faMoneyBillTrendUp,
} from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

// google maps geolocation
import Vue3Geolocation from 'vue3-geolocation';

const app = createApp(App);
app.use(Vue3Geolocation);
app.use(createPinia());
export const userStore = useCurrentUserStore();
export const itemStore = useCurrentItemID();
export const shoppingCart = useCurrentCart();
app.use(router);

// Refer to PrimeVue.js for the full list of components
connectPrimeVue(app);

// Refer to Firebase.js for configuration
const firebaseApp = connectFirebase();
export const FirestoreDatabase = getMyFirestore(firebaseApp);
export const FirestoreStorage = getMyStorage(firebaseApp);

// Font-Awesome Icons
library.add(
  faFacebookF,
  faTwitter,
  faInstagram,
  faTiktok,
  faHeart,
  far,
  faUser,
  faInfo,
  faShoppingBag,
  faUpload,
  faCircleCheck,
  faHourglassHalf,
  faMoneyBillTrendUp
);
app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app');
