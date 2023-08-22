import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import DirectionsView from "../views/DirectionsView.vue";

const routes = [
    {
        path: "/",
        name: "home",
        component: HomeView,
    },
    {
        path: "/directions",
        name: "directions",
        component: DirectionsView,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;