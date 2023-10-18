<script>
import SideMenuBar from "../components/SideMenuBar.vue";
export default {
    components: {
        SideMenuBar,
    },
    mounted() {
        // When enter from About page - START
        if (sessionStorage.getItem("toReload")) {
            sessionStorage.removeItem("toReload");
            location.reload();
        }
        // When enter from About page - END
    },
};
</script>

<template>
    <SideMenuBar />
</template>

<style scoped></style>
