<script>
// import ItemCard from '../components/ItemCard.vue';
import Rating from "primevue/rating";
import { userStore } from "../../main.js";
import FBInstanceFirestore from "../../services/Firebase/FirestoreDatabase.js";

export default {
    data() {
        return {
            rating: 8,
            userID: userStore.getUserID(),
            description: "",
            image_src:  "",
            username: "",
        };
    },
    components: {
        // ItemCard,
        Rating,
    },
    created() {
        // console.log(this.userID);
        FBInstanceFirestore.getUser(this.userID).then((data) => {
            console.log(data);
            this.username = data.first_name + " " + data.last_name;
            this.description = data.description;
            this.image_src = data.image_src;
        });
        
        
    }
};
</script>

<template>
    <div>
        <!-- User Jumbotron -->
        <div class="p-3 mb-4 bg-light rounded-3">
            <div class="container-fluid py-2">
                <div class="row">
                    <div class="col-xl-2 col-md-4 col-xs-6">
                        <img
                            src= ""
                            alt= "generic profile picture"
                            class="img-thumbnail mt-4 mb-2"
                            style="width: 200px; z-index: 1"
                        />
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
                <div class="container-fluid">
                    <div
                        class="row listings shadow-sm p-3 mb-5 bg-white rounded"
                    >
                        <h2 class="text-center">Current Listings</h2>
                        <!-- add in using v-for -->
                        <!-- <div class="col-xxl-3 col-xl-4 col-lg-4 col-md-6 col pb-2 list-item">
                            <ItemCard />
                        </div> -->
                    </div>
                </div>
                <!-- Reviews -->
                <div class="container-fluid">
                    <div
                        class="row reviews shadow-sm p-3 mb-5 bg-white rounded"
                    >
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
