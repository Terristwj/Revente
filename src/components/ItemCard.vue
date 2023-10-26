<template>
    <div class="card" style="width: 18rem;">
        <img src="https://primefaces.org/cdn/primevue/images/usercard.png" class="card-img-top" alt="..." id="card_img">

        <div class="card-body pb-0 pt-1">
            <h5 class="card-title">{{ i.name }}</h5>
            <p class="card-text">{{ i.brand }}</p>
            <p class="card-text">{{ i.seller }}</p>
            <p class="card-text">$ {{ i.price }}</p>

            <div class="container">
                <button type="button" class="btn btn-clear m-3" @click="visible = true">Quick View</button>
                <button type="button" class="btn btn-clear-like m-3" id="fav"><font-awesome-icon
                        :icon="['far', 'heart']" /></button>
            </div>
        </div>


        <Dialog v-model:visible="visible" modal :header="i.name" :style="{ width: '70vw' }">
            <div class="container-fluid">
                <div class="row">
                    <div class="col">
                        <img src="https://primefaces.org/cdn/primevue/images/usercard.png" class="card-img-top" alt="...">
                    </div>
                    <div class="col">
                        <p class="card-text">{{ i.brand }}</p>
                        <p class="card-text">{{ i.seller }}</p>
                        <p class="card-text">$ {{ i.price }}</p>
                        <p class="card-text">{{ i.description }}</p>
                        <div class="container text-center p-0">
                            <button type="button" class="btn btn-clear m-3">Add to Cart</button>
                            <button type="button" class="btn btn-dark m-3">More Details</button>
                        </div>
                    </div>
                </div>
            </div>
        </Dialog>
    </div>
</template>

<style scoped>
#card_img {
    width: 100%;
    height: 18rem;
    object-fit: fill;
}

.card-body {
    margin: 10px;
}

.card-text {
    margin: 0;
}

.btn {
    border-radius: 23px;
}

.btn-clear {
    border: 1px solid black;
}

.btn-clear-like {}

.btn-clear:hover {
    background-color: black;
    color: white;
}

.btn-dark:hover {
    background-color: transparent;
    border: 1px solid black;
    color: black;
}
</style>


<script setup>
import { ref } from "vue";

const visible = ref(false);

</script>

<script>
export default {
    props: ["item"],

    data() {
        return {

            emptyHeart: `<font-awesome-icon
                            :icon="['far', 'heart']" />`,
            heart: `<font-awesome-icon :icon="['fas', 'heart']" style="color: #ff0000;" />`,
            i: {
                name: "Item Name",
                brand: "Brand Name",
                seller: "Seller Name",
                price: "Price",
                description: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
                link: '',
            }
        };
    },

    methods: {
    }
}
</script>