<script>
import router, { routes, isAuthenticated } from "../router/index";

// For Firebase Signout
import { getAuth, signOut } from "firebase/auth";

export default {
    data() {
        return {
            mobileTabVisible: false,
            routes,
            isLoggedIn: isAuthenticated(),
            auth: getAuth(),
        };
    },
    watch: {
        isLoggedIn() {
            console.log(this.isLoggedIn);
        },
    },
    methods: {
        logout() {
            console.log(1);
            console.log(isAuthenticated());
            signOut(this.auth)
                .then(() => {
                    // Sign-out successful.
                    console.log(this.currentUserStore.isLoggedIn);
                    router.push("/login");
                })
                .catch((error) => {
                    // An error happened.
                    console.log(error);
                });
        },
    },
};
</script>

<!-- 
    Modify navigation items in "../router/index" 
    Using import { routes } from "../router/index"; 
-->

<template>
    <nav class="navbar navbar-expand-lg w-100 border-bottom shadow-sm p-2 mb-4">
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
                        v-for="route in routes"
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
                        v-for="route in routes"
                        :key="route.name"
                        class="nav-item"
                    >
                        <RouterLink class="nav-link" :to="route.path">{{
                            route.name
                        }}</RouterLink>
                    </li>
                </ul>
            </div>
            <!-- Desktop Tab Items END -->
            <button v-if="!isLoggedIn" @click="logout">Sign out</button>
            {{ auth }}
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
