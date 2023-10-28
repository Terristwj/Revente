<script>
import ItemCard from "./ItemCard.vue";
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
                    numVisible: 3,
                    numScroll: 1,
                },
                {
                    breakpoint: "991px",
                    numVisible: 2,
                    numScroll: 1,
                },
                {
                    breakpoint: "767px",
                    numVisible: 1,
                    numScroll: 1,
                },
            ],
        };
    },
    components: {
        ItemCard,
    },
};
</script>

<template>
    <Carousel
        :value="products"
        :numVisible="4"
        :numScroll="1"
        :responsiveOptions="responsiveOptions"
        circular
        :autoplayInterval="3000"
        :showIndicators="false"
    >
        <template #item="slotProps">
            <div class="centered-item">
                <ItemCard :product="slotProps.data" />
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
