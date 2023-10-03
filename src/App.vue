<script setup>
import { RouterView } from "vue-router";
import NavigationBar from "./components/NavigationBar.vue";
</script>

<template>
    <NavigationBar />
    <div id="content">
        <RouterView />
    </div>
</template>

<style scoped>


</style>
