<script>
import { defineComponent } from "vue";
import vue3starRatings from "vue3-star-ratings";
export default defineComponent({
    props: {
        starColor: {
            type: String,
            default: "#ff9800"
        },
            inactiveColor: {
            type: String,
            default: "#333"
        },
            starSize: {
            type: String,
            default: '32'
        },
            controlBg: {
            type: String,
            default: '#2e5090'
        },
            controlColor: {
            type: String,
            default: '#fff'
        },
            controlSize: {
            type: String,
            default: '24'
        },
            numberOfStars: {
            type: Number,
            default: 5
        },
            showControl: {
            type: Boolean,
            default: true
        },
            modelValue: {
            type: Number
        },
            disableClick: {
            type: Boolean,
            default: false
        },
            step: {
            type: Number,
            default: 0.5
        }
    },
    components: {
        vue3starRatings,
    },
});
</script>

<template>
    <div>
        <vue3starRatings v-model="rating"/>
    </div>
</template>


<style>

</style>