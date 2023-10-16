<script>
import NavigationBar from "./components/NavigationBar.vue";
import FooterComponent from "./components/FooterComponent.vue";
import ItemCard from "./components/ItemCard.vue";
export default {
    components: {
        NavigationBar,
        FooterComponent,
        ItemCard,
    },
};
</script>

<template>
    <NavigationBar />
    <div id="content">
        <RouterView />
        <ItemCard/>
    </div>
    <FooterComponent />
</template>

<style scoped></style>
