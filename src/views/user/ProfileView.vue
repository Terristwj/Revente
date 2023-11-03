<script>
import router from "../../router/router.js";
import { userStore } from "../../main.js";
// import ItemCard from '../components/ItemCard.vue';
import FBInstanceFirestore from "../../services/Firebase/FirestoreDatabase.js";
import SmallCarouselMainPage from "../../components/SmallCarouselMainPage.vue";
import SmallCarouselRecents from "../../components/SmallCarouselRecents.vue";
import vue3starRatings from "vue3-star-ratings";

export default {
    data() {
        return {
            // need to dynamically set this rating based on average of all reviews
            total_rating: 0,
            rating: 0,
            userID: "",
            description: "",
            image_src: "",
            username: "",
            items: [],
            reviews: [],
            profilerating: 0,
        };
    },
    computed: {
        haveListing() {
            return this.items.length > 4;
        },
        littleListing() {
            return this.items.length < 5;
        },
        noListings() {
            return this.items.length == 0;
        },

    },
    components: {
        // ItemCard,
        SmallCarouselMainPage,
        SmallCarouselRecents,
        vue3starRatings,
    },
    created() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    },
    mounted() {
        setTimeout(async () => {
            this.userID = userStore.getUserID();

            if (!this.userID) {
                router.push("/login");
            } else {
                // this.getItems(this.userID);
                await FBInstanceFirestore.getUser(this.userID).then((data) => {
                    this.username = data.first_name + " " + data.last_name;
                    this.description = data.description;
                    this.image_src = data.image_src;
                });
                // console.log(this.userID);
                await FBInstanceFirestore.getAllListedProductByUser(
                    this.userID
                ).then((data) => {
                    this.items = data;
                });
                await FBInstanceFirestore.getAllBoughtProductByUser(
                    this.userID
                ).then((data) => {
                    data.forEach((item) => {
                        if (item.review_desc != null) {
                            let obj = {};
                            obj["product_name"] = item.product_name;
                            obj["brand"] = item.brand;
                            obj["image_src"] = item.image_src;
                            obj["buyer_name"] = null;
                            obj["review_desc"] = item.review_desc;
                            this.total_rating += item.rating;
                            obj["rating"] = item.rating;
                            FBInstanceFirestore.getUser(item.buyer_ID).then(
                                (data) => {
                                    let buyerName =
                                        data.first_name + " " + data.last_name;
                                    obj["buyer_name"] = buyerName;
                                    this.reviews.push(obj);
                                    this.rating =
                                        this.total_rating / this.reviews.length;

                                }
                            );

                        }
                    });
                });
            }
        }, 1000);
    },
};
</script>

<template>
    <div>
        <!-- User Jumbotron -->
        <div class="p-3 mb-4 bg-light rounded-3">
            <div class="container-fluid py-2">
                <div class="row">
                    <div class="col-xl-2 col-md-4 col-xs-6">
                        <img :src="image_src" alt="generic profile picture" class="img-thumbnail mt-4 mb-2"
                            style="width: 200px; z-index: 1" />
                    </div>
                    <div class="col-xl-10 col-md-8 col-xs-6">
                        <h1 class="display-5 fw-bold py-2">{{ username }}</h1>
                        Rating:
                        <vue3starRatings v-model="this.rating" :starSize="'20'" starColor="#ff9800" inactiveColor="#333333"
                            :numberOfStars="5" :disableClick="true" />
                        <p class="col-md-12 fs-4 pt-2">
                            Description: {{ description }}
                        </p>
                    </div>
                </div>

                <!-- Listings -->
                <div class="container-fluid" v-if="littleListing">
                    <div class="row listings shadow-sm p-3 mb-5 bg-white rounded">
                        <h2 class="text-center listingHeader">Current Listings</h2>
                        <!-- add in using v-for -->
                        <SmallCarouselRecents :products="items" />
                    </div>
                </div>
                <div class="container-fluid" v-if="haveListing">
                    <div class="row listings shadow-sm p-3 mb-5 bg-white rounded">
                        <h2 class="text-center listingHeader">Current Listings</h2>
                        <!-- add in using v-for -->
                        <SmallCarouselMainPage :products="items" />
                    </div>
                </div>

                <div class="container-fluid" v-if="noListings">
                    <div class="row listings shadow-sm p-3 mb-5 bg-white rounded">
                        <h2 class="text-center listingHeader">Current Listings</h2>
                        <!-- add in using v-for -->
                        <p class="lead text-center">No items listed</p>
                    </div>
                </div>
                <!-- Reviews -->
                <div class="container-fluid">
                    <div class="row reviews shadow-sm p-3 mb-5 bg-white rounded">
                        <h2 class="text-center listingHeader">Reviews</h2>
                        <!-- add in using v-for -->
                        <div v-for="item in this.reviews" :key="item" class="shadow-sm p-3 mb-5 bg-white rounded">
                            <div class="row">
                                <div class="col">
                                    <vue3starRatings v-model="item.rating" :starSize="'30'" starColor="#ff9800"
                                        inactiveColor="#333333" :numberOfStars="5" :disableClick="true" />
                                </div>
                                <div class="row">
                                    <div class="col-xl-2 col-md-4 p-0">
                                        <img :src="item.image_src" alt="generic profile picture"
                                            class="img-thumbnail mt-4 mb-2" style="width: 75%; z-index: 1" />
                                    </div>
                                    <div class="col-xl-3 col-md-5 my-auto">
                                        <p class="fs-5">
                                            <strong>Product:</strong>
                                            {{ item.product_name }}
                                        </p>
                                        <p class="fs-5">
                                            <strong>Review:</strong>
                                            {{ item.review_desc }}
                                        </p>
                                        <p class="fs-5 fw-bold">
                                            {{ item.buyer_name }}
                                        </p>
                                    </div>
                                    <div class="col-xl-6 col-md-3">
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.listings {
    margin-top: 2rem;
    background-color: lightgrey;
}

.list-item {
    display: flex;
    align-self: start;
    justify-content: center;
}

.listingHeader {
    margin-bottom: 40px;
    margin-top: 20px;
}

</style>
