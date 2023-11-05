<template>
    <div class="row justify-content-center align-items-center">
        <div class="col-md-12 order-sm-last col-lg-6 p-3 text-center order-xs-last">
            <Card>
                <template #title> Successful Checkout! </template>
                <template #content>
                    <p class="m-0">
                        Thanks for making a purchase with us! We hope you enjoy
                        your new item(s).
                    </p>
                    <button type="button" class="btn btn-dark mt-4 mx-4" @click="goToListing()">
                        Back To Listings
                    </button>
                    <button type="button" class="btn btn-dark mt-4 mx-4" @click="goToOrderHistory()">
                        Leave a Review!
                    </button>
                </template>
            </Card>
        </div>
        <div class="col-md-12 col-lg-6 p-3 order-lg-last d-flex justify-content-center align-items-center">
            <img class="img-fluid" src="../assets/img/ecommerce/success.png" alt="" />
        </div>
    </div>
</template>

<style scoped>
.img-fluid {
    height: auto;
    width: 70%;
    padding-left: 5rem;
    padding-right: 5rem;
}

.btn {
    border-radius: 23px;
}

.btn-dark:hover {
    background-color: transparent;
    border: 1px solid black;
    color: black;
}
</style>

<script>
import FBInstanceFirestore from "../services/Firebase/FirestoreDatabase.js";
import router from "../router/router.js";

export default {
    data() {
        return {
            productIds: [],
            user_ID: "",
        };
    },
    methods: {
        goToListing() {
            // console.log("working");
            router.push("/listings");
        },
        goToOrderHistory() {
            // console.log("working");
            router.push("/orderHistory");
        },
        getProductIds() {
            let url = new URL(window.location);
            let productIds = url.searchParams.get("product_ids");
            return productIds.split(",");
        },

        getUserId() {
            let url = new URL(window.location);
            let userID = url.searchParams.get("user_id");
            return userID;
        },

        // firebase method
        updateDatabase(arr, userID) {
            arr.forEach((id) => {
                FBInstanceFirestore.getProduct(id).then((data) => {
                    // console.log(data);
                    data.is_bought = true;
                    // console.log(data);
                    FBInstanceFirestore.updateProductStatusAndAddSellerID(
                        // Seller and Product
                        data.seller_ID,
                        data.product_ID,

                        // Product Details
                        data.product_name,
                        data.brand,
                        data.description,

                        // Category
                        data.gender,
                        data.category,

                        // Condition
                        data.condition,
                        data.condition_notes,

                        // Others
                        data.drop_off_location,
                        data.price,
                        data.modifiedPrice,
                        data.size,
                        data.image_src,
                        // Status
                        data.is_approved,
                        data.is_bought,

                        userID,
                        "",
                        "",
                    );
                });
            });
        },
    },

    created() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;

        this.productIds = this.getProductIds();
        // console.log(this.productIds);
        this.user_ID = this.getUserId();
        // console.log(this.user_ID);
        this.updateDatabase(this.productIds, this.user_ID);
    },
};
</script>
