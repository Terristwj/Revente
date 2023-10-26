<script>
import { defineComponent } from "vue";
import vue3starRatings from "vue3-star-ratings";
export default defineComponent({
    components: {
        vue3starRatings,
    },
    data() {
        return {
            rating: 4.5,
        }
    }
});
</script>

<template>
    <div>
        <vue3starRatings v-model="rating"/>
    </div>
</template>


<style>

</style>