import { createRouter, createWebHistory } from "vue-router";
// import { userStore } from "../main.js";
import { getAuth } from "firebase/auth";

// Add routes here
export const routes = [
    // Common Pages START
    {
        path: "/",
        name: "Home",
        component: () => import("../views/common/HomeView.vue"),
    },
    {
        path: "/about",
        name: "About",
        icon: ["fas", "bookmark"],
        component: () => import("../views/common/AboutView.vue"),
    },
    {
        path: "/tnc",
        name: "Terms & Conditions",
        component: () => import("../views/common/TnCView.vue"),
    },
    {
        path: "/faq",
        name: "FAQ",
        component: () => import("../views/common/FAQView.vue"),
    },
    // Common Pages END

    // Admin page START
    {
        path: "/admin",
        name: "Admin",
        component: () => import("../views/admin/AdminView.vue"),
    },
    // Admin page END

    // Product Catalogue START
    {
        path: "/listings",
        name: "Listings",
        icon: ["fas", "shirt"],
        component: () => import("../views/listings/ListingView.vue"),
    },
    {
        path: "/listings/item",
        name: "MainItem",
        component: () => import("../views/listings/MainItemView.vue"),
    },
    // Product Catalogue END

    // Cart & Checkout START
    {
        path: "/cart",
        name: "Cart",
        icon: ["fas", "bag-shopping"],
        component: () => import("../views/cart/CartView.vue"),
        meta: {
            requiresAuth: true,
        },
    },
    // Cart & Checkout END

    // User Profile START
    {
        path: "/profile",
        name: "Profile",
        icon: ["fas", "user"],
        component: () => import("../views/user/ProfileView.vue"),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/profile/settings",
        name: "Settings",
        component: () => import("../views/user/UserSettingsView.vue"),
        meta: {
            requiresAuth: true,
        },
    },
    // (Sellers) User upload listing
    {
        path: "/profile/upload",
        name: "Upload Listing",
        component: () => import("../views/user/UploadProductView.vue"),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/profile/wishlist",
        name: "Wish List",
        component: () => import("../views/user/WishlistView.vue"),
        meta: {
            requiresAuth: true,
        },
    },
    // User Profile END

    // Login/Register START
    {
        path: "/login",
        name: "Login",
        component: () => import("../views/loginRegister/LoginView.vue"),
        meta: {
            requiresNoAuth: true,
        },
    },
    {
        path: "/register",
        name: "Register",
        component: () => import("../views/loginRegister/RegisterView.vue"),
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
        component: () => import("../views/others/404View.vue"),
    },
    // Others END

    // Incomplete Views goes here START
    {
        path: "/orderHistory",
        name: "Order History",
        component: () => import("../views/OrderHistory.vue"),
    },
    {
        path: "/reviewview/",
        name: "Review View",
        component: () => import("../views/ReviewView.vue"),
    },

    {
        path: "/success",
        name: "Success",
        component: () => import("../views/SuccessView.vue"),
    },
    // Incomplete Views goes here END
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes,
});

// Check if user is authenticated (Part 1)
export const isAuthenticated = () => {
    let auth = getAuth();
    let user = auth.currentUser;
    return !!user;
};

// Check if user is authenticated (Part 2)
// Current issue/bug:
// 'router.beforeEach' is called before 'getAuth()' works properly
// Therefore, the current solution is to force a 1 second delay
//
// How it works:
// (1) - If user is NOT authenticated AND enters a restricted page,
//       user is redirected to login page. E.g. 'Profile' and 'Upload'

// (2) - If user is authenticated AND enters a non-authenticated page,
//       user is redirected to home page. E.g. 'Login' and 'Register'

// router.beforeEach((to, from, next) => {
//     setTimeout(function () {
//         // (1) Redirected to login page
//         if (to.meta.requiresAuth && !isAuthenticated()) {
//             // This if-block will never happen,
//             // But used for debugging
//             if (userStore.getUserID()) {
//                 console.log(userStore.getUserID());
//             }
//             // (1) Redirected to login page
//             else {
//                 router.push("/login");
//             }
//         }

//         // (2) Redirected to home page
//         //     Mainly for Login/Register page
//         else if (to.meta.requiresNoAuth && isAuthenticated()) {
//             router.push("/");
//         } else {
//             next();
//         }
//     }, 1000);
// });

export default router;
