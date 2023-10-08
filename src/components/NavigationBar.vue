<script>
import router, { routes } from "../router/router.js";

// For Firebase Signout
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

export default {
    data() {
        return {
            // For Mobile Tab
            mobileTabVisible: false,

            // For Firebase Login
            isLoggedIn: false,
            auth: getAuth(),

            // For Navigation Bar
            routesExcludedLoggedIn: ["Register", "Login"],
            routesExcludedLoggedOut: ["Register", "Game"],
            navRoutes: null,
        };
    },
    methods: {
        // When logout is clicked
        handleLogout() {
            signOut(this.auth).then(() => {
                this.auth = getAuth();
                router.push("/login");
            });
        },
    },
    // Checks for user authentication to
    // display the correct navigation items
    mounted() {
        // When Login or Logout
        onAuthStateChanged(this.auth, (user) => {
            this.isLoggedIn = user ? true : false;
            this.navRoutes = this.isLoggedIn
                ? routes.filter(
                      (route) =>
                          !this.routesExcludedLoggedIn.includes(route.name)
                  )
                : routes.filter(
                      (route) =>
                          !this.routesExcludedLoggedOut.includes(route.name)
                  );
        });
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
                            >{{ route.name }}</RouterLink
                        >
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
                        <RouterLink class="nav-link" :to="route.path">{{
                            route.name
                        }}</RouterLink>
                    </li>
                    <li v-if="isLoggedIn" class="nav-item">
                        <button class="nav-link" @click="handleLogout">
                            Sign out
                        </button>
                    </li>
                </ul>
            </div>
            <!-- Desktop Tab Items END -->
        </div>
    </nav>
</template>

<style scoped>
nav {
    background-color: white;
    position: sticky;
    top: 0;
    z-index: 1;
}
.nav-item {
    transition-duration: 0.5s;
    box-shadow: 0px 0px grey;
}

.nav-item:hover {
    box-shadow: 0px 5px grey;
}
</style>
