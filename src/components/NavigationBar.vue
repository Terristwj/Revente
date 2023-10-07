<script setup>
import { onMounted, ref } from "vue";
import router, { routes } from "../router/router.js";

// For Firebase Signout
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

// For Mobile Tab
var mobileTabVisible = ref(false);

// For Firebase Login
const isLoggedIn = ref(false);
let auth;

// For Navigation Bar
const routesExcludedLoggedIn = ["Register", "Login"];
const routesExcludedLoggedOut = ["Register", "Game"];
let navRoutes = routes.filter(
    (route) => !routesExcludedLoggedOut.includes(route.name)
);

// Checks for user authentication to
// display the correct navigation items
onMounted(() => {
    auth = getAuth();
    // When Login or Logout
    onAuthStateChanged(auth, (user) => {
        isLoggedIn.value = user ? true : false;
        navRoutes = isLoggedIn.value
            ? routes.filter(
                  (route) => !routesExcludedLoggedIn.includes(route.name)
              )
            : routes.filter(
                  (route) => !routesExcludedLoggedOut.includes(route.name)
              );
    });
});

// When logout is clicked
const handleLogout = () => {
    signOut(auth).then(() => {
        router.push("/login");
    });
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
