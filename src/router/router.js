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
    icon: ["fas", "info"],
    component: () => import("../views/AboutView.vue"),
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
    path: "/faq",
    name: "FAQ",
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/FAQView.vue"),
  },

  {
    path: "/register",
    name: "Register",
    component: () => import("../views/RegisterView.vue"),
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
    icon: ["fas", "bag-shopping"],
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/ProfileView.vue"),
    icon: ["fas", "user"],
    meta: {
      requiresAuth: true,
    },
  },
  {
    // path: *
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: () => import("../views/404View.vue"),
  },

  //upload page
  {
    path: "/upload",
    name: "Upload",
    component: () => import("../views/UploadProductView.vue"),
  },

  // admin page
  {
    path: "/admin",
    name: "Admin",
    component: () => import("../views/AdminView.vue"),
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    setTimeout(function () {
      if (userStore.getUserID()) {
        console.log(userStore.getUserID());
      } else {
        router.push("/login");
      }
    }, 1000);
  } else {
    next();
  }
});

export default router;
