<script setup>
import { ref } from "vue";
import { shoppingCart, recents, wishList } from "../main.js";

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
    created() {
        // Check if the product is in the wishlist during component creation
        this.isProductInWishlist = this.checkWishList(this.product.product_ID);
    },
    data () {
        return {
            isProductInWishlist: false,
        }
    },
    // data() {},
    methods: {
        linkToMoreDetails(id) {
            this.$router.push({ name: "MainItem", query: { id: id } });
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

        checkWishList(id) {
            return wishList.getWishList().includes(id);
        }
    },
};
</script>

<template>
    <div
        id="item-card"
        class="card mb-3 shadow"
        style="width: 18rem; height: 500px"
    >
        <img
            id="card_img"
            class="card-img-top pointing border-2 border-bottom border-subtle"
            :src="product.image_src"
            alt="Product Image"
            @click="
                visible = true;
                recent(product.product_ID);
            "
        />

        <div class="card-body pb-0 pt-1">
            <h5
                class="card-title"
                style="
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                "
            >
                {{ product.product_name }}
            </h5>
            <p class="card-text">{{ product.brand }}</p>
            <p class="card-text">{{ product.condition }}</p>
            <p class="card-text">$ {{ product.modifiedPrice }}</p>

            <div class="d-flex">
                <button
                    type="button"
                    class="btn btn-outline-dark my-3 mr-0 m1-3"
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
                    <font-awesome-icon
                        class="clear-like"
                        :icon="checkWishList(product.product_ID) ? ['fas', 'heart'] : ['far', 'heart']"
                    />
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
                        <Image
                            class="card-img-top object-fit-cover w-100 img-thumbnail p-2"
                            alt="Image"
                            preview
                        >
                            <template #indicatoricon>
                                <i class="pi pi-search-plus"></i>
                            </template>
                            <template #image>
                                <img
                                    style="width: 100%; aspect-ratio: 1 / 1"
                                    :src="product.image_src"
                                    alt="image"
                                />
                            </template>
                            <template #preview="slotProps">
                                <img
                                    style="
                                        height: 80vh;
                                        width: 100%;
                                        aspect-ratio: 1 / 1;
                                    "
                                    :src="product.image_src"
                                    alt="preview"
                                    :style="slotProps.style"
                                    @click="slotProps.onClick"
                                />
                            </template>
                        </Image>
                    </div>
                    <div class="row gap-1 flex-column col">
                        <p class="card-text">{{ product.brand }}</p>
                        <p class="card-text">{{ product.condition }}</p>
                        <p class="card-text">$ {{ product.modifiedPrice }}</p>
                        <p class="card-text">{{ product.description }}</p>
                        <div class="row gap-3 mt-2 justify-content-center">
                            <button
                                type="button"
                                class="btn btn-outline-dark col-lg-5"
                                @click="addCart(product.product_ID)"
                            >
                                Add to Cart
                            </button>
                            <button
                                type="button"
                                class="btn btn-dark col-lg-5"
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
#item-card:hover {
    filter: drop-shadow(0px 0px 0px #000000);
}

#card_img {
    width: 100%;
    height: 18rem;
    object-fit: fill;
}

#card_img:hover {
    filter: brightness(80%);
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

.btn-dark:hover {
    background-color: transparent;
    border: 1px solid black;
    color: black;
}

.btn-clear-like {
    border: none;
}

.clear-like:hover {
    color: #ff4800;
    font-size: larger;
}
</style>
