<template>
    <div class="row justify-content-center align-items-center">
        <div
            class="col-md-12 order-sm-last col-lg-6 p-3 text-center order-xs-last"
        >
            <Card>
                <template #title> Successful Checkout! </template>
                <template #content>
                    <p class="m-0">
                        Thanks for making a purchase with us! We hope you enjoy
                        your new item(s).
                    </p>
                    <button
                        type="button"
                        class="btn btn-dark mt-4"
                        @click="goToListing()"
                    >
                        Back To Listings
                    </button>
                </template>
            </Card>
        </div>
        <div
            class="col-md-12 col-lg-6 p-3 order-lg-last d-flex justify-content-center align-items-center"
        >
            <img
                class="img-fluid"
                src="../assets/img/ecommerce/success.png"
                alt=""
            />
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

export default {
    data() {
        return {
            productIds: [],
        };
    },
    methods: {
        goToListing() {
            console.log("working");
            this.$router.push({ name: "Listing" });
        },
        getProductIds() {
            let url = new URL(window.location);
            let productIds = url.searchParams.get("product_ids");
            return productIds.split(",");
        },

        // firebase method
        updateDatabase(arr) {
            arr.forEach((id) => {
                FBInstanceFirestore.getProduct(id).then((data) => {
                    console.log(data);
                    data.is_bought = true;
                    console.log(data);
                    FBInstanceFirestore.updateProductStatus(
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
                        data.image_src,
                        data.size,

                        // Status
                        data.is_approved,
                        data.is_bought
                    );
                });
            });
        },
    },

    created() {
        this.productIds = this.getProductIds();
        console.log(this.productIds);
        this.updateDatabase(this.productIds);
    },
};
</script>
