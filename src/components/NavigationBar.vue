<script>
import router, { routes } from "../router/router.js";

// For Firebase Signout
import { onAuthStateChanged } from "firebase/auth";
import FBInstanceAuth from "../services/Firebase/FirebaseAuthentication";

// Track userID
import { userStore } from "../main.js";

//import Icons
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
    data() {
        return {
            // For Firebase Login
            auth: FBInstanceAuth.getAuth(),

            // For Account Handling
            isLoggedIn: false,
            isAdmin: false,

            // For Mobile Tab
            mobileTabVisible: false,

            // For Navigation Bar Mobile START
            routesExcludedInBoth: [
                // Common
                "Home",

                // Admin
                "Admin",

                // User

                // Listings
                "MainItem",

                // LoginRegister
                "Register",

                // Others
                "NotFound",

                // WIP
                "Review View",
                "Success",
                "Order History",
            ],
            routesExcludedLoggedOut: [
                "Profile",
                "Settings",
                "Upload Listing",
                "Wish List",
            ],
            routesExcludedLoggedIn: ["Login"],
            navRoutes: null,
            // For Navigation Bar Mobile END

            // For Desktop Navigation Bar - Edit the HTML too
            // For Desktop Navigation Bar START
            activeProfile: false,
            profileItems: [
                {
                    label: "Settings",
                    icon: "pi pi-cog",
                    command: () => {
                        router.push("/profile/settings");
                        this.activeProfile = false;
                    },
                },
                {
                    label: "Upload Listing",
                    icon: "pi pi-upload",
                    command: () => {
                        router.push("/profile/upload");
                        this.activeProfile = false;
                    },
                },
                {
                    label: "Wish List",
                    icon: "pi pi-gift",
                    command: () => {
                        router.push("/profile/wishlist");
                        this.activeProfile = false;
                    },
                },
            ],
            activeAbout: false,
            aboutItems: [
                {
                    label: "Terms & Conditions",
                    icon: "pi pi-book",
                    command: () => {
                        router.push("/tnc");
                        this.activeAbout = false;
                    },
                },
                {
                    label: "FAQ",
                    icon: "pi pi-question-circle",
                    command: () => {
                        router.push("/faq");
                        this.activeAbout = false;
                    },
                },
            ],
            // For Desktop Navigation Bar END
        };
    },
    methods: {
        activeTab(tab) {
            // Close all tabs first
            this.activeAbout = false;
            this.activeProfile = false;

            // Open the specified tab
            if (tab == "about") this.activeAbout = true;
            if (tab == "profile") this.activeProfile = true;
        },
        // When logout is clicked
        handleLogout() {
            FBInstanceAuth.logout(this.auth);
        },
        // Display toast when login or logout
        showToast(severity, summary, detail) {
            this.$toast.add({
                severity,
                summary,
                detail,
                life: 3000,
            });
        },
    },
    // Checks for user authentication to
    // display the correct navigation items
    mounted() {
        // When Login or Logout
        onAuthStateChanged(this.auth, (user) => {
            // Update UserID store - START
            const store = userStore;
            // If logged in
            if (user) {
                store.setUserID(user.uid);
            } else {
                store.setUserID(null);
            }
            // console.log(store.getUserID());
            // Update UserID store - END
            // console.log(user);

            this.isLoggedIn = user ? true : false;
            if (this.isLoggedIn) {
                const routesExcluded = this.routesExcludedInBoth.concat(
                    this.routesExcludedLoggedIn
                );
                this.navRoutes = routes.filter(
                    (route) => !routesExcluded.includes(route.name)
                );
                this.showToast(
                    "success",
                    "Currently logged in",
                    "Welcome to Reventé!"
                );
            } else {
                const routesExcluded = this.routesExcludedInBoth.concat(
                    this.routesExcludedLoggedOut
                );
                // console.log(routes);
                this.navRoutes = routes.filter(
                    (route) => !routesExcluded.includes(route.name)
                );
                this.showToast(
                    "warn",
                    "Not logged in",
                    "Login to use our website"
                );
            }
        });
    },
    components: {
        FontAwesomeIcon,
    },
};
</script>

<!-- 
    Modify navigation items in "../router/index" 
    Using import { routes } from "../router/index"; 
-->

<template>
    <nav class="navbar navbar-expand-lg w-100 border-bottom shadow-sm p-2">
        <div id="navigationBarContent" class="container-fluid">
            <!-- Logo START -->
            <RouterLink to="/"
                ><img alt="Reventé logo" src="@/assets/logo.svg" width="125"
            /></RouterLink>

            <!-- Logo END -->

            <!-- Mobile START -->
            <!-- Mobile Tab Icon START -->
            <Button
                text
                icon="pi pi-bars"
                severity="secondary"
                @click="mobileTabVisible = true"
                class="d-lg-none"
            />
            <!-- Mobile Tab Icon END -->

            <!-- Mobile Tab Items START -->
            <Sidebar v-model:visible="mobileTabVisible" position="right">
                <template #header>
                    <div class="w-100 pe-5">
                        <RouterLink to="/" @click="mobileTabVisible = false"
                            ><img
                                alt="Reventé logo"
                                src="@/assets/logo.svg"
                                width="125"
                        /></RouterLink>
                    </div>
                </template>
                <ul class="navbar-nav">
                    <li
                        v-for="route in navRoutes"
                        :key="route.name"
                        class="nav-item"
                    >
                        <RouterLink
                            class="nav-link"
                            :to="route.path"
                            @click="mobileTabVisible = false"
                        >
                            {{ route.name }}
                        </RouterLink>
                    </li>
                    <li v-if="isLoggedIn" class="nav-item">
                        <a class="nav-link pointing" @click="handleLogout">
                            Sign out
                        </a>
                    </li>
                </ul>
            </Sidebar>
            <!-- Mobile Tab Items END -->
            <!-- Mobile END -->

            <!-- Desktop Tab Items START -->
            <div
                class="collapse navbar-collapse d-lg-flex justify-content-end"
                id="navbarNavDropdown"
            >
                <ul class="navbar-nav">
                    <li
                        v-for="route in navRoutes"
                        :key="route.name"
                        class="nav-item"
                    >
                        <!-- About Routes START -->
                        <div
                            v-if="route.name == 'About'"
                            @mouseover="activeTab('about')"
                        >
                            <RouterLink
                                @click="activeAbout = false"
                                class="nav-link"
                                :to="route.path"
                            >
                                <font-awesome-icon
                                    v-if="route.icon"
                                    :icon="route.icon"
                                />
                                {{ route.name }}
                            </RouterLink>
                            <Menu
                                v-if="activeAbout"
                                @mouseleave="activeAbout = false"
                                id="overlay_menu"
                                class="position-absolute"
                                style="margin-top: 5px"
                                :model="aboutItems"
                                :pt="{
                                    menu: {
                                        class: 'p-0',
                                    },
                                    label: {
                                        class: 'ps-1',
                                        style: 'font-size: 14px;',
                                    },
                                }"
                            />
                        </div>

                        <div
                            v-else-if="route.name == 'Terms & Conditions'"
                        ></div>
                        <div v-else-if="route.name == 'FAQ'"></div>
                        <!-- Profile Routes END -->

                        <!-- Profile Routes START -->
                        <div
                            v-else-if="route.name == 'Profile'"
                            @mouseover="activeTab('profile')"
                        >
                            <RouterLink
                                @click="activeProfile = false"
                                class="nav-link"
                                :to="route.path"
                            >
                                <font-awesome-icon
                                    v-if="route.icon"
                                    :icon="route.icon"
                                />
                                {{ route.name }}
                            </RouterLink>
                            <Menu
                                v-if="activeProfile"
                                @mouseleave="activeProfile = false"
                                id="overlay_menu"
                                class="position-absolute"
                                style="margin-top: 5px"
                                :model="profileItems"
                                :pt="{
                                    menu: {
                                        class: 'p-0',
                                    },
                                    label: {
                                        class: 'ps-1',
                                        style: 'font-size: 14px;',
                                    },
                                }"
                            />
                        </div>

                        <div v-else-if="route.name == 'Settings'"></div>
                        <div v-else-if="route.name == 'Upload Listing'"></div>
                        <div v-else-if="route.name == 'Wish List'"></div>
                        <!-- Profile Routes END -->

                        <!-- Default Routes START -->
                        <RouterLink
                            v-else
                            @mouseover="activeTab('')"
                            class="nav-link"
                            :to="route.path"
                        >
                            <font-awesome-icon
                                v-if="route.icon"
                                :icon="route.icon"
                            />
                            {{ route.name }}
                        </RouterLink>
                        <!-- Default Routes END -->
                    </li>
                    <li
                        v-if="isLoggedIn"
                        @mouseover="activeTab('')"
                        class="nav-item pointing"
                    >
                        <a class="nav-link" @click="handleLogout">
                            <font-awesome-icon
                                icon="arrow-right-from-bracket"
                            />
                            <span> Sign out </span>
                        </a>
                    </li>
                </ul>
            </div>
            <!-- Desktop Tab Items END -->
        </div>
    </nav>
    <Toast />
</template>

<style scoped>
nav {
    background-color: white;
    position: sticky;
    top: 0;
    z-index: 2;
}

.nav-item {
    box-shadow: 0px 0px grey;
}

.nav-item:hover {
    box-shadow: 0px 5px grey;
}
</style>
