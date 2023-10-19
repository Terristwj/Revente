import { createRouter, createWebHistory } from "vue-router";

import { getAuth } from "firebase/auth";

export const isAuthenticated = () => {
    let auth = getAuth();
    let user = auth.currentUser;
    return !!user;
};

// Add routes here
export const routes = [
    {
        path: "/",
        name: "Home",
        component: () => import("../views/HomeView.vue"),
    },
    {
        path: "/about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import("../views/AboutView.vue"),
    },
    {
        path: "/faq",
        name: "FAQ",
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import("../views/FAQView.vue"),
    },
    {
        path: "/login",
        name: "Login",
        component: () => import("../views/LoginView.vue"),
        props: true,
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
    // {
    //     path: "/game",
    //     name: "Game",
    //     // route level code-splitting
    //     // this generates a separate chunk (About.[hash].js) for this route
    //     // which is lazy-loaded when the route is visited.
    //     component: () => import("../views/GameView.vue"),
    //     meta: {
    //         requiresAuth: true,
    //     },
    // },
    {
        path: "/listing",
        name: "Listing",
        component: () => import("../views/ListingView.vue"),
    },
    {
        path: "/Cart",
        name: "Cart",
        component: () => import("../views/CartView.vue"),
    },
    {
        path: "/MainItem",
        name: "MainItem",
        component: () => import("../views/MainItemView.vue"),
    },
    {
        // path: *
        path: "/:catchAll(.*)",
        name: "NotFound",
        component: () => import("../views/404View.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes,
});

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !isAuthenticated()) {
        next("/login");
    } else {
        next();
    }
});

export default router;
