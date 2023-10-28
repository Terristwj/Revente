<script>
import FBInstanceFirestore from "../../services/Firebase/FirestoreDatabase.js";
import { userStore, wishList } from "../../main.js";
import { shoppingCart } from "../../main.js";
import SmallCarousel from "../../components/SmallCarousel.vue";
import router from "../../router/router.js";

export default {
    data() {
        return {
            // Database Quota related
            FBQuotaReached: false,

            cart: [],
            userID: "",
            generalSize: [],
            recentProducts: [],
            reccomendedProducts: [],
            category: {},
            popularCategory: "",
        };
    },
    computed: {},
    methods: {
        toListing() {
            router.push("/listings");
        },
        async getProductData() {
            await FBInstanceFirestore.getAllProducts()
                .then((data) => {
                    this.generalSize = [];
                    for (let i = 0; i < data.length; i++) {
                        if (
                            shoppingCart.getCart().includes(data[i].product_ID)
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
                                    console.log(data[i].seller_name);
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
                    console.log(error);
                    this.FBQuotaReached = true;
                });
        },
    },
    components: {
        SmallCarousel,
    },
    mounted() {
        // When enter from About page - START
        if (sessionStorage.getItem("toReload")) {
            sessionStorage.removeItem("toReload");
            location.reload();
        }

        // When enter from About page - END
    },
    async created() {
        setTimeout(async () => {
            await this.getProductData();
            this.isLoading = false;
            this.user_ID = userStore.getUserID();
        }, 1000);

        let recent = wishList.getWishList();
        for (let i = 0; i < recent.length; i++) {
            await FBInstanceFirestore.getProduct(recent[i])
                .then((data) => {
                    this.recentProducts.push(data);

                    let ind_category = data.category;
                    if (this.category[ind_category] == undefined) {
                        this.category[ind_category] = 1;
                    } else {
                        this.category[ind_category] += 1;
                    }
                    // console.log(this.category);

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
                    console.log(error);
                    this.FBQuotaReached = true;
                });
        }

        await FBInstanceFirestore.getAllProducts()
            .then((data) => {
                for (const key in data) {
                    if (
                        data[key].category == this.popularCategory &&
                        data[key].is_approved == true
                    ) {
                        this.reccomendedProducts.push(data[key]);
                    }
                }
            })
            .catch((error) => {
                // Handle any errors that occur during the promise execution
                console.log(error);
                this.FBQuotaReached = true;
            });

        if (this.FBQuotaReached) {
            this.$toast.add({
                severity: "error",
                summary: "Database Quota Reached",
                detail: "Database Quota will reset at SGT 1pm.",
                life: 15000,
            });
        }
    },
};
</script>

<template>
    <div class="container">
        <h1 class="my-4">Your Personal Currated Wishlist</h1>
        <p>
            Browse through our categories for inspiration and add something you
            like.
        </p>
        <div class="d-grid gap-2 d-md-flex justify-content-md-start">
            <button
                class="btn btn-outline-dark me-md-2 px-md-5"
                type="button"
                @click="toListing()"
            >
                LISTINGS
            </button>
        </div>
        <div class="section">
            <h3>Wish List</h3>
            <SmallCarousel :products="recentProducts" />
        </div>
        <div class="section">
            <h3>Recommended For You</h3>
            <SmallCarousel :products="reccomendedProducts" />
        </div>
    </div>
</template>

<style scoped>
.section {
    margin-top: 50px;
    margin-bottom: 50px;
}
</style>
