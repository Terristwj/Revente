<script>
import router from "../../router/router.js";
import { userStore } from "../../main.js";
// import ItemCard from '../components/ItemCard.vue';
import FBInstanceFirestore from "../../services/Firebase/FirestoreDatabase.js";
import Rating from "primevue/rating";
import SmallCarouselMainPage from "../../components/SmallCarouselMainPage.vue";
import SmallCarouselRecents from "../../components/SmallCarouselRecents.vue";


export default {
    data() {
        return {
            rating: 8,
            userID: userStore.getUserID(),
            description: "",
            image_src: "",
            username: "",
            items: [],
        };

    },
    computed: {
        haveListing() {
            return this.items.length > 4;
        },
        littleListing(){
        return this.items.length < 5;
        },
        noListings() {
            return this.items.length == 0;
        },
    },
    components: {
        // ItemCard,
        Rating,
        SmallCarouselMainPage,
        SmallCarouselRecents
    },
    created() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    },
    mounted() {
        setTimeout(() => {
            if (!userStore.getUserID()) {
                router.push("/login");
            } else {
                // this.getItems(this.userID);
                FBInstanceFirestore.getUser(this.userID).then((data) => {
                    this.username = data.first_name + " " + data.last_name;
                    this.description = data.description;
                    this.image_src = data.image_src;

                });
                // console.log(this.userID);
                FBInstanceFirestore.getAllListedProductByUser(this.userID).then(
                (data) => {
                    this.items = data;
                    // console.log(data);
                }
            )
            }
        }, 500);
       


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
                        <Rating v-model="rating" :cancel="false" readonly />
                        <p class="col-md-12 fs-4 pt-2">
                            Description: {{ description }}
                        </p>
                    </div>
                </div>

                <!-- Listings -->
                <div class="container-fluid" v-if="littleListing">
                    <div class="row listings shadow-sm p-3 mb-5 bg-white rounded">
                        <h2 class="text-center">Current Listings</h2>
                        <!-- add in using v-for -->
                        <SmallCarouselRecents :products="items" />
                    </div>
                </div>
                <div class="container-fluid" v-if="haveListing">
                    <div class="row listings shadow-sm p-3 mb-5 bg-white rounded">
                        <h2 class="text-center">Current Listings</h2>
                        <!-- add in using v-for -->
                        <SmallCarouselMainPage :products="items" />
                    </div>
                </div>

                <div class="container-fluid" v-if="noListings">
                    <div class="row listings shadow-sm p-3 mb-5 bg-white rounded">
                        <h2 class="text-center">Current Listings</h2>
                        <!-- add in using v-for -->
                        <p class="lead text-center">No items listed</p>
                    </div>
                </div>
                <!-- Reviews -->
                <div class="container-fluid">
                    <div class="row reviews shadow-sm p-3 mb-5 bg-white rounded">
                        <h2 class="text-center">Reviews</h2>
                        <div class="row shadow-sm p-3 mb-5 bg-white rounded">
                            <p>Review</p>
                        </div>
                        <div class="row shadow-sm p-3 mb-5 bg-white rounded">
                            <p>Review</p>
                        </div>
                        <div class="row shadow-sm p-3 mb-5 bg-white rounded">
                            <p>Review</p>
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
</style>
