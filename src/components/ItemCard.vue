<template>
    <div class="card mb-2" style="width: 18rem;">
        <img :src="product.image_src" alt="Product Image" class="card-img-top" id="card_img" />

        <div class="card-body pb-0 pt-1">
            <h5 class="card-title">{{ product.product_name }}</h5>
            <p class="card-text">{{ product.brand }}</p>
            <p class="card-text">{{ product.condition }}</p>
            <p class="card-text">$ {{ product.modifiedPrice }}</p>

            <div class="d-flex">
                <button type="button" class="btn btn-clear my-3 mr-0 m1-3" @click="visible = true">Quick View</button>
                <button type="button" class="btn btn-clear-like" id="fav"><font-awesome-icon
                        :icon="['far', 'heart']" /></button>
            </div>
        </div>


        <Dialog v-model:visible="visible" modal :header="product.product_name" :style="{ width: '50vw' }">
            <div class="container-fluid">
                <div class="row">
                    <div class="col">
                        <img :src="product.image_src" alt="Product Image" id="dialog_img" class="card-img-top" />
                    </div>
                    <div class="col">
                        <p class="card-text">{{ product.brand }}</p>
                        <p class="card-text">{{ product.condition }}</p>
                        <p class="card-text">$ {{ product.modifiedPrice }}</p>
                        <p class="card-text">{{ product.description }}</p>
                        <div class="container p-0">
                            <button type="button" class="btn btn-clear" @click="addCart(product.product_ID)">Add to
                                Cart</button>
                            <button type="button" class="btn btn-dark m-3"
                                @click="linkToMoreDetails(product.product_ID)">More Details</button>
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

#dialog_img {
    width: auto;
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
import FBInstanceFirestore from "../services/Firebase/FirestoreDatabase.js";
import { itemStore } from "../main.js";
import { userStore } from "../main.js";


const visible = ref(false);

</script>

<script>
export default {

    props: {
        product: {
            type: Array,
            required: true,
        },

    },


    data() {
        return {
            emptyHeart: `<font-awesome-icon
                            :icon="['far', 'heart']" />`,
            heart: `<font-awesome-icon :icon="['fas', 'heart']" style="color: #ff0000;" />`,
            temp: [],
            user_ID: "",
        };
    },

    methods: {
        linkToMoreDetails(id) {
            itemStore.setItemID(id);
            this.$router.push({ name: "MainItem" });
        },
        addCart(id) {
            this.user_ID = userStore.getUserID();
            FBInstanceFirestore.getProduct(id)
                .then((data) => {
                    this.temp = data;
                    // console.log(this.temp);
                    if (this.temp.addToCart == true) {
                        alert("Item already added to cart, please check your cart");
                    }
                    else {
                        FBInstanceFirestore.addToCart(
                            this.temp.seller_ID,
                            this.temp.product_ID,
                            this.temp.product_name,
                            this.temp.brand,
                            this.temp.description,
                            this.temp.gender,
                            this.temp.category,
                            this.temp.condition,
                            this.temp.condition_notes,
                            this.temp.drop_off_location,
                            this.temp.price,
                            parseFloat(this.temp.modifiedPrice),
                            true,
                            false,
                            this.temp.image_src,
                            this.temp.size,
                            this.user_ID,
                            true
                        );
                        FBInstanceFirestore.getProduct(this.temp.product_ID)
                            .then((data) => {
                                this.temp = data;
                                // console.log(data);
                            })
                            .catch((error) => {
                                // Handle any errors that occur during the promise execution
                                console.error(error);
                            });

                        if (this.temp.addToCart == true) {
                            alert("Item added to cart, please check your cart");
                        }
                    }
                })
                .catch((error) => {
                    // Handle any errors that occur during the promise execution
                    console.error(error);
                });

        },
    }
}
</script>