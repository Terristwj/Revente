import { createRouter, createWebHistory } from "vue-router";
import { userStore } from "../main.js";

import { getAuth } from "firebase/auth";

// const provider = new GoogleAuthProvider();
// provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

// provider.setCustomParameters({
//     login_hint: "user@example.com",
// });

export const isAuthenticated = () => {
    let auth = getAuth();
    let user = auth.currentUser;
    return !!user;
};

// Add routes here
export const routes = [
    // Common Pages START
    {
        path: "/",
        name: "Home",
        component: () => import("../views/HomeView.vue"),
    },
    {
        path: "/about",
        name: "About",
        icon: ["fas", "info"],
        component: () => import("../views/AboutView.vue"),
    },
    {
        path: "/faq",
        name: "FAQ",
        component: () => import("../views/FAQView.vue"),
    },
    {
        path: "/tnc",
        name: "TnC",
        component: () => import("../views/TnCView.vue"),
    },

    // Common Pages END

    // admin page
    {
        path: "/admin",
        name: "Admin",
        component: () => import("../views/AdminView.vue"),
        meta: {
            requiresAuth: true,
        },
    },
    // Product Catalogue START
    {
        path: "/listing",
        name: "Listing",
        component: () => import("../views/ListingView.vue"),
    },
    {
        path: "/Cart",
        name: "Cart",
        icon: ["fas", "bag-shopping"],
        component: () => import("../views/CartView.vue"),
    },
    // Product Catalogue END

    // User Profile START
    {
        path: "/profile",
        name: "Profile",
        component: () => import("../views/ProfileView.vue"),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/profile/settings",
        name: "Settings",
        component: () => import("../views/UserSettingsView.vue"),
        meta: {
            requiresAuth: true,
        },
    },
    // User Profile END

    //Main Item Start
    {
        path: "/MainItem",
        name: "MainItem",
        component: () => import("../views/MainItemView.vue"),
    },
    //Main Item end

    // Login/Register START
    {
        path: "/login",
        name: "Login",
        component: () => import("../views/LoginView.vue"),
        meta: {
            requiresNoAuth: true,
        },
    },

    {
        path: "/register",
        name: "Register",
        component: () => import("../views/RegisterView.vue"),
        meta: {
            requiresNoAuth: true,
        },
    },
    // Login/Register END

    // Others START
    {
        // path: *
        path: "/:catchAll(.*)",
        name: "NotFound",
        component: () => import("../views/404View.vue"),
    },
    // Others END
    // Incomplete Views goes here END
    // Incomplete Views goes here START
    // upload page
    {
        path: "/profile/upload",
        name: "Upload",
        component: () => import("../views/UploadProductView.vue"),
        meta: {
            requiresAuth: true,
        },
    },
    // Others END

    // Incomplete Views goes here START
    {
        path: "/orderHistory",
        name: "Order History",
        component: () => import("../views/OrderHistory.vue"),
    },
    {
        path: "/reviewView/:id",
        name: "Review View",
        component: () => import("../views/ReviewView.vue"),
    },
    // Incomplete Views goes here END
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes,
});

router.beforeEach((to, from, next) => {
    setTimeout(function () {
        if (to.meta.requiresAuth && !isAuthenticated()) {
            if (userStore.getUserID()) {
                console.log(userStore.getUserID());
            } else {
                router.push("/login");
            }
        } else if (to.meta.requiresNoAuth && isAuthenticated()) {
            router.push("/");
        } else {
            next();
        }
    }, 1000);
});

export default router;
