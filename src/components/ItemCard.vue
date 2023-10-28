<script setup>
import { ref } from "vue";
import { itemStore } from "../main.js";
import { shoppingCart } from "../main.js";
import { recents } from "../main.js";
import { wishList } from "../main.js";

const visible = ref(false);
</script>

<script>
export default {
    props: {
        product: {
            type: Object,
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
            if (shoppingCart.getCart().includes(id)) {
                alert("Item already added to cart, please check your cart");
            } else {
                shoppingCart.addCart(id);
                console.log(shoppingCart.getCart());
            }
        },
        recent(id) {
            recents.addRecents(id);
            // console.log(recents.getRecent());
        },
        addWishList(id) {
            if (wishList.getWishList().includes(id)) {
                alert(
                    "Item already added to wishlist, please check your wishlist"
                );
            } else {
                wishList.addWish(id);
                // console.log(wishList.getWishList());
            }
        },
    },
};
</script>

<template>
    <div class="card mb-2" style="width: 18rem">
        <img
            :src="product.image_src"
            alt="Product Image"
            class="card-img-top"
            id="card_img"
        />

        <div class="card-body pb-0 pt-1">
            <h5 class="card-title">{{ product.product_name }}</h5>
            <p class="card-text">{{ product.brand }}</p>
            <p class="card-text">{{ product.condition }}</p>
            <p class="card-text">$ {{ product.modifiedPrice }}</p>

            <div class="d-flex">
                <button
                    type="button"
                    class="btn btn-clear my-3 mr-0 m1-3"
                    @click="
                        visible = true;
                        recent(product.product_ID);
                    "
                >
                    Quick View
                </button>
                <button
                    type="button"
                    class="btn btn-clear-like"
                    id="fav"
                    @click="addWishList(product.product_ID)"
                >
                    <font-awesome-icon :icon="['far', 'heart']" />
                </button>
            </div>
        </div>

        <Dialog
            v-model:visible="visible"
            :header="product.product_name"
            style="width: 80vw; max-width: 800px"
            :breakpoints="{ '960px': '75vw', '641px': '100vw' }"
            modal
        >
            <div class="container-fluid">
                <div class="row">
                    <div class="col">
                        <img
                            :src="product.image_src"
                            alt="Product Image"
                            id="dialog_img"
                            class="card-img-top w-100 object-fit-cover"
                        />
                    </div>
                    <div class="col">
                        <p class="card-text">{{ product.brand }}</p>
                        <p class="card-text">{{ product.condition }}</p>
                        <p class="card-text">$ {{ product.modifiedPrice }}</p>
                        <p class="card-text">{{ product.description }}</p>
                        <div class="container p-0">
                            <button
                                type="button"
                                class="btn btn-clear"
                                @click="addCart(product.product_ID)"
                            >
                                Add to Cart
                            </button>
                            <button
                                type="button"
                                class="btn btn-dark m-3"
                                @click="linkToMoreDetails(product.product_ID)"
                            >
                                More Details
                            </button>
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
