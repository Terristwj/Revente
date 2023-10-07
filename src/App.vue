<script>
import NavigationBar from "./components/NavigationBar.vue";
export default {
    components: {
        NavigationBar,
    },
};
</script>

<template>
    <NavigationBar />
    <div id="content">
        <RouterView />
    </div>
</template>

<style scoped>


</style>
