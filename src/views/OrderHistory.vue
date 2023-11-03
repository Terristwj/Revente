<script>
import PastOrders from "../components/PastOrder.vue";
import FBInstanceFirestore from "../services/Firebase/FirestoreDatabase.js";
import { userStore } from "../main.js";
import { watchEffect } from "vue";
import router from "../router/router.js";

export default {
    // <div id='app'></div>
    components: {
        PastOrders,
    },
    data() {
        return {
            // key: value
            userID: "",
            items: [],
        };
    },
    created() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;

        setTimeout(() => {
            if (!this.userID) {
                router.push("/login");
            } else {
                this.getItems(this.userID);
            }
        }, 1500);
    },
    mounted() {
        watchEffect(() => {
            this.userID = userStore.getUserID();
        });
    },
    methods: {
        goToListing() {
            // console.log("working");
            router.push("/listings");
        },
        getItems(userID) {
            FBInstanceFirestore.getProductsBasedOnBuyerID(userID).then(
                (data) => {
                    data.forEach((item) => {
                        var obj = {};
                        obj["brand"] = item.brand;
                        obj["imgUrl"] = item.image_src;
                        obj["name"] = item.product_name;
                        obj["size"] = item.size;
                        obj["seller_name"] = null;
                        obj["product_id"] = item.product_ID;
                        obj["review_desc"] = item.review_desc;
                        if (item.review_desc != "") {
                            obj["reviewed"] = true;
                        } else {
                            obj["reviewed"] = false;
                        }
                        FBInstanceFirestore.getUser(item.seller_ID).then(
                            (data) => {
                                let sellerName =
                                    data.first_name + " " + data.last_name;
                                obj["seller_name"] = sellerName;
                                this.items.push(obj);
                            }
                        );
                    });
                }
            );
        },
    }, // methods
};
</script>

<template>
    <!--BELOW IS THE HEADER-->
    <div class="container">
        <h1 class="m-5 text-start">Order History</h1>
    </div>

    <!--BELOW ARE THE PAST ORDER ITEMS-->
    <div class="container-fluid">
        <PastOrders
            v-for="(item, index) in items"
            :key="index"
            :imgUrl="item.imgUrl"
            :brand="item.brand"
            :size="item.size"
            :seller="item.seller_name"
            :name="item.name"
            :product_id="item.product_id"
            :review_desc="item.review_desc"
            :reviewed="item.reviewed"
        />
    </div>

    <!--BELOW ARE THE PAST ORDER ITEMS-->
    <div v-if="!items.length" class="container noOrders">
        <div class="textPortion m-5 text-start">
            <h3>You have not made any orders.</h3>
            <p>
                Browse through our categories for inspiration and add something
                you like.
            </p>
            <div class="d-grid gap-2 d-md-flex justify-content-md-start my-5">
                <button
                    class="btn btn-outline-dark me-md-2 px-md-5 listingButton"
                    type="button"
                    @click="goToListing()"
                >
                    LISTINGS
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
p {
    color: black;
}

h2 {
    font-family: "inter-bold";
}

h4 {
    font-family: "inter-regular";
    color: rgb(69, 69, 69);
}

.listingButton {
    max-width: 400px;
}
</style>
