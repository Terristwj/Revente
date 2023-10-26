<template>
    <div>
        <!-- User Jumbotron -->
        <div class="p-3 mb-4 bg-light rounded-3">
            <div class="container-fluid py-2">
                <div class="row">
                    <div class="col-xl-2 col-md-4 col-xs-6">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                            alt="Generic placeholder image" class=" img-thumbnail mt-4 mb-2"
                            style="width: 200px; z-index: 1">
                    </div>
                    <div class="col-xl-10 col-md-8 col-xs-6">
                        <h1 class="display-5 fw-bold py-2">Username</h1>
                        Rating:
                        <Rating v-model="rating" :cancel="false" readonly />
                        <p class="col-md-12 fs-4 pt-2">Description: Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Aliquid eum fugit
                            quis, laboriosam ad porro veniam! Dicta dolores id nesciunt distinctio necessitatibus. Saepe
                            voluptas accusamus dicta cupiditate excepturi laboriosam corporis?</p>
                    </div>
                </div>

                <!-- Listings -->
                <div class="container-fluid">
                    <div class="row listings shadow-sm p-3 mb-5 bg-white rounded">
                        <h2 class="text-center">Current Listings</h2>
                        <div class="col-xxl-3 col-xl-4 col-lg-4 col-md-6 col pb-2 list-item">
                            <ItemCard />
                        </div>
                        <div class="col-xxl-3 col-xl-4 col-lg-4 col-md-6 col pb-2 list-item">
                            <ItemCard />
                        </div>
                        <div class="col-xxl-3 col-xl-4 col-lg-4 col-md-6 col pb-2 list-item">
                            <ItemCard />
                        </div>
                        <div class="col-xxl-3 col-xl-4 col-lg-4 col-md-6 col pb-2 list-item">
                            <ItemCard />
                        </div>
                        <div class="col-xxl-3 col-xl-4 col-lg-4 col-md-6 col pb-2 list-item">
                            <ItemCard />
                        </div>
                        <div class="col-xxl-3 col-xl-4 col-lg-4 col-md-6 col pb-2 list-item">
                            <ItemCard />
                        </div>




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

<script>
import ItemCard from '../components/ItemCard.vue';
import Rating from 'primevue/rating';
export default {
    data() {
        return {
            rating: 10,
        }
    },
    components: {
        ItemCard,
        Rating,
    }
}


</script>

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