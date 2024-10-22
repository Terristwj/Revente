import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export default function connectFirebase() {
    // Firebase Database
    const firebaseConfig = {
        apiKey: import.meta.env.VITE_FIREBASECONFIG_APIKEY,
        authDomain: import.meta.env.VITE_FIREBASECONFIG_AUTHDOMAIN,
        projectId: import.meta.env.VITE_FIREBASECONFIG_PROJECTID,
        storageBucket: import.meta.env.VITE_FIREBASECONFIG_STORAGEBUCKET,
        messagingSenderId: import.meta.env
            .VITE_FIREBASECONFIG_MESSAGINGSENDERID,
        appId: import.meta.env.VITE_FIREBASECONFIG_APPID,
        measurementId: import.meta.env.VITE_FIREBASECONFIG_MEASUREMENTID,
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    getMyAnalytics(app);
    return app;
}

function getMyAnalytics(app) {
    getAnalytics(app);
}

export function getMyFirestore(app) {
    return getFirestore(app);
}

export function getMyStorage(app) {
    return getStorage(app);
}
