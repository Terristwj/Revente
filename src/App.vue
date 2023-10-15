<script>
import NavigationBar from "./components/NavigationBar.vue";
import FooterComponent from "./components/FooterComponent.vue";
export default {
    components: {
        NavigationBar,
        FooterComponent,
    },
};
</script>

<template>
    <NavigationBar />
    <div id="content">
        <RouterView />
    </div>
    <FooterComponent />
</template>

<style scoped></style>
