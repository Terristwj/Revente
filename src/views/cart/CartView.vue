<script>
// Services
import router from "../../router/router.js";
import FBInstanceFirestore from "../../services/Firebase/FirestoreDatabase.js";

// Components
import CartItem from "../../components/CartItem.vue";
import CheckoutBar from "../../components/CheckoutBar.vue";
import SmallCarousel from "../../components/SmallCarousel.vue";
import SmallCarouselRecents from "../../components/SmallCarouselRecents.vue";

// Stores
import { userStore, shoppingCart, recents } from "../../main.js";

export default {
    data() {
        return {
            userID: "",

            // Items to display
            cart: [],
            generalSize: [],

            // Product placements
            recentProducts: [],
            recomendedProducts: [],
            category: {},

            popularCategory: "",

            // get the priceInCents and the name of product from the cart
            changedCart: [],

            // get the product ids of cartItems
            cartItems: [],
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
        cartTotal() {
            let total = 0;
            for (let i = 0; i < this.cart.length; i++) {
                total += this.cart[i].modifiedPrice;
            }
            return total.toFixed(2);
        },
        noRecents() {
            return this.recentProducts.length == 0
        },
        noRecomended() {
            return this.recomendedProducts.length == 0
        },
        fourRecents() {
            return this.recentProducts.length > 0 && this.recentProducts.length < 5
        },
        showCarousel() {
            return this.recentProducts.length > 4
        },
        showReccoCarousel() {
            return this.recomendedProducts.length > 4
        }

    },
    methods: {
        getCartDetails() {
            FBInstanceFirestore.getAllProducts().then((data) => {
                data.forEach((item) => {
                    if (
                        shoppingCart.getCart().includes(item.product_ID) &&
                        item.is_bought == false
                    ) {
                        var obj = {};
                        for (var prop in item) {
                            if (prop == "product_name") {
                                obj["name"] = item[prop];
                            }
                            if (prop == "modifiedPrice") {
                                obj["priceInCents"] = item[prop] * 100;
                            }
                        }
                        this.changedCart.push(obj);
                        this.cartItems.push(item.product_ID);
                    }
                });
            });
        },
        toListing() {
            router.push("/listings");
        },
        cartItemStyle(index) {
            let styling = "";
            if (index === this.cart.length - 1) {
                styling += "mb-5";
            }
            if (index === 0) {
                styling += " mt-0";
            } else {
                styling += " mt-5";
            }
            return styling;
        },
        async getProductData() {
            FBInstanceFirestore.getAllProducts()
                .then((data) => {
                    this.generalSize = [];
                    for (let i = 0; i < data.length; i++) {
                        if (
                            shoppingCart
                                .getCart()
                                .includes(data[i].product_ID) &&
                            data[i].is_bought == false
                        ) {
                            let size = data[i].size;
                            let sellerName = FBInstanceFirestore.getUser(
                                data[i].seller_ID
                            );
                            sellerName
                                .then((name) => {
                                    // Use the data here
                                    data[i].seller_name = name.first_name;
                                    this.cart.push(data[i]);
                                })
                                .catch((error) => {
                                    // Handle any errors that might occur
                                    console.error(error);
                                });

                            const parts = size.split(" ");
                            // Initialize the length
                            let length = 0;

                            // Iterate through the parts to extract the length
                            for (let i = 0; i < parts.length; i++) {
                                const part = parts[i];
                                if (part === "Length:") {
                                    length = parseFloat(parts[i + 1]);
                                    break; // Exit the loop once length is found
                                }
                            }
                            if (length >= 120) {
                                this.generalSize.push("Large");
                            } else if (length >= 100) {
                                this.generalSize.push("Medium");
                            } else if (length >= 80) {
                                this.generalSize.push("Small");
                            } else {
                                this.generalSize.push("Extra Small");
                            }
                        }
                    }
                })
                .catch((error) => {
                    // Handle any errors that occur during the promise execution
                    console.error(error);
                });
        },
    },
    components: {
        CartItem,
        CheckoutBar,
        SmallCarousel,
        SmallCarouselRecents
    },
    created() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;

        setTimeout(() => {
            this.getProductData();
            this.getCartDetails();
            this.isLoading = false;
            this.user_ID = userStore.getUserID();
        }, 1000);
        let tempRecent = recents.getRecents();
        let recent = [];
        for (let i = 0; i < tempRecent.length; i++) {
            if (recent.includes(tempRecent[i]) == false) {
                recent.push(tempRecent[i]);
            }
        }

        for (let i = 0; i < recent.length; i++) {
            FBInstanceFirestore.getProduct(recent[i])
                .then((data) => {
                    if(data.is_bought == false){
                        this.recentProducts.push(data);
                    }
                    let ind_category = data.category;
                    if (this.category[ind_category] == undefined) {
                        this.category[ind_category] = 1;
                    } else {
                        this.category[ind_category] += 1;
                    }
                    let max = 0;
                    for (const [key, value] of Object.entries(this.category)) {
                        if (value > max) {
                            max = value;
                            this.popularCategory = key;
                        }
                    }
                })
                .catch((error) => {
                    // Handle any errors that occur during the promise execution
                    console.error(error);
                });
        }

        FBInstanceFirestore.getAllProducts()
            .then((data) => {
                for (const key in data) {
                    if (
                        data[key].category == this.popularCategory &&
                        data[key].is_approved == true &&
                        data[key].is_bought == false
                    ) {
                        this.recomendedProducts.push(data[key]);
                    }
                }
            })
            .catch((error) => {
                // Handle any errors that occur during the promise execution
                console.error(error);
            });
    },
};
</script>

<template>
    <div class="container">
        <div class="">

            <h1 class="my-4">
                Shopping Cart <span v-if="cartContent">({{ cartContent }})</span>
            </h1>
            <div v-if="!cartContent">
                <div class="row">


                    <div class="col-lg-8">
                        <h3>Your Shopping Cart is empty.</h3>
                        <p>
                            Browse through our categories for inspiration and add something
                            you like.
                        </p>
                        <br />
                        <div class="d-grid gap-2 d-md-flex justify-content-md-start">
                            <button class="btn btn-outline-dark me-md-2 px-md-5" type="button" @click="toListing()">
                                LISTINGS
                            </button>
                        </div>
                    </div>


                    <div class="col-lg-4">
                        <CheckoutBar :totalOriginal="cartTotal" :total="cartTotal" :itemCount="cart.length"
                            :cartItems="this.changedCart" :itemIds="this.cartItems" />
                    </div>



                </div>
            </div>
        </div>
        <div class="cart-section" v-if="cartContent">
            <div class="row">
                <div class="col-lg-8">
                    <CartItem v-for="(item, index) in cart" :key="index" :name="item.product_name"
                        :price="item.modifiedPrice" :size="generalSize[index]" :brand="item.brand"
                        :seller="item.seller_name" :imgUrl="item.image_src" :class="cartItemStyle(index)"
                        :itemID="item.product_ID" />
                </div>
                <div class="col-lg-4">
                    <CheckoutBar :totalOriginal="cartTotal" :total="cartTotal" :itemCount="cart.length"
                        :cartItems="this.changedCart" :itemIds="this.cartItems" />
                </div>
            </div>
        </div>

        <div class="section" v-if="noRecents">
            <h3>Recently Viewed</h3>
            <p>You have not viewed any products yet.</p>
        </div>

        <div class="section" v-if="fourRecents">
            <h3>Recently Viewed</h3>
            <SmallCarouselRecents :products="recentProducts" />
        
        </div>
        <div class="section" v-if="showCarousel">
            <h3>Recently Viewed</h3>
            <SmallCarousel :products="recentProducts" />
        </div>

        <div class="section" v-if="noRecomended">
            <h3>Recommended For You</h3>
            <p>There are no recommendations for you yet.</p>
        </div>

        <div class="section" v-if="showReccoCarousel">
            <h3>Recommended For You</h3>
            <SmallCarousel :products="recomendedProducts" />
        </div>
    </div>
</template>

<style scoped>
.section {
    margin-top: 50px;
}
</style>
