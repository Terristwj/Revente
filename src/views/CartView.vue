<script>
import CartItem from "../components/CartItem.vue";
export default {
    data() {
        return {
            cart: [
                {
                    name: "Mens's Jeans",
                    price: 10,
                    size: "M",
                    brand: "Unbranded",
                    seller: "John Doe",
                    imgUrl: "/src/assets/img/ecommerce/Google.png",
                },
            ],
            cartTotal: 0,
        };
    },
    computed: {
        cartContent() {
            if (this.cart.length === 0) {
                return false;
            } else {
                return this.cart.length;
            }
        },
    },
    components: {
        CartItem,
    },
};
</script>

<template>
    <div class="container">
        <h1 class="mt-5">
            Shopping Cart <span v-if="cartContent">({{ cartContent }})</span>
        </h1>
        <div v-if="!cartContent">
            <h3 class="mt-4">Your Shopping Cart is empty.</h3>
            <p>
                Browse through our categories for inspiration and add something
                you like.
            </p>
            <br />
            <div class="d-grid gap-2 d-md-flex justify-content-md-start">
                <button
                    class="btn btn-outline-dark me-md-2 px-md-5"
                    type="button"
                >
                    NEW ARRIVALS
                </button>
                <button class="btn btn-outline-dark px-md-5" type="button">
                    TRENDING
                </button>
            </div>
        </div>
        <div class="cart-section mt-5">
            <div class="row">
                <div class="col-md-7">
                    <CartItem
                        v-for="(item, index) in cart"
                        :key="index"
                        :name="item.name"
                        :price="item.price"
                        :size="item.size"
                        :brand="item.brand"
                        :seller="item.seller"
                        :imgUrl="item.imgUrl"
                    />
                </div>
                <div class="col-md-5">check out</div>
            </div>
        </div>
        <div class="section">
            <h3>Recently Viewed</h3>
        </div>
        <div class="section">
            <h3>Recommended For You</h3>
        </div>
    </div>
</template>

<style scoped>
.section {
    margin-top: 50px;
}
</style>
