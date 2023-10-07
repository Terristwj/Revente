import { createRouter, createWebHistory } from "vue-router";

// Add routes here
export const routes = [
    {
        path: "/",
        name: "Home",
        component: () => import("../views/HomeView.vue"),
    },
    {
        path: "/register",
        name: "Register",
        component: () => import("../views/RegisterView.vue"),
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
    }
    {
        path: "/game",
        name: "Game",
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import("../views/GameView.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes,
});

export default router;
