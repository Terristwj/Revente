<script>
import ItemCardSmallCarousell from "./ItemCardSmallCarousell.vue";
export default {
    props: {
        products: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            responsiveOptions: [
                {
                    breakpoint: "1300px",
                    numVisible: 1,
                  
                },
                {
                    breakpoint: "991px",
                    numVisible: 1,
            
                },
                {
                    breakpoint: "767px",
                    numVisible: 1,
              
                },
            ],
        };
    },
    components: {
    ItemCardSmallCarousell
},
};
</script>

<template>
    <Carousel
        :value="products"
        :numVisible="1"
        circular
    >
        <template #item="slotProps">
            <div class="centered-item">
                <ItemCardSmallCarousell :product="slotProps.data" />
            </div>
        </template>
    </Carousel>
</template>

<style scoped>
.centered-item {
    display: flex;
    justify-content: center;
}
</style>
