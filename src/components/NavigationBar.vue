<script setup>
import { ref } from "vue";
import Sidebar from "primevue/sidebar";

import { RouterLink } from "vue-router";
const visibleRight = ref(false);

import { routes } from "../router/index";
</script>

<template>
    <nav class="navbar navbar-expand-lg w-100 border-bottom shadow-sm p-2 mb-4">
        <div id="navigationBarContent" class="container-fluid">
            <!-- Logo START -->
            <img
                class="me-auto"
                alt="Reventé"
                src="@/assets/logo.svg"
                width="125"
            />
            <!-- Logo END -->

            <!-- Mobile START -->
            <!-- Mobile Tab Icon START -->
            <Button
                text
                icon="pi pi-bars"
                severity="secondary"
                @click="visibleRight = true"
                class="d-lg-none"
            />
            <!-- Mobile Tab Icon END -->

            <!-- Mobile Tab Items START -->
            <Sidebar v-model:visible="visibleRight" position="right">
                <h2>Right Sidebar</h2>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
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
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/about"
                            >About</RouterLink
                        >
                    </li>
                </ul>
            </div>
            <!-- Desktop Tab Items END -->
        </div>
    </nav>
</template>

<style scoped></style>
