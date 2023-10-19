<script>
import NavigationBar from "./components/NavigationBar.vue";
import FooterComponent from "./components/FooterComponent.vue";

export default {
    created() {
        document.addEventListener("keydown", this.handleSpacebar);
    },
    unmounted() {
        document.removeEventListener("keydown", this.handleSpacebar);
    },
    methods: {
        handleSpacebar(event) {
            // Check if the pressed key is the spacebar (key code 32)
            if (event.keyCode === 32) {
                event.preventDefault(); // Prevent the default spacebar action (scrolling)
            }
        },
    },
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
