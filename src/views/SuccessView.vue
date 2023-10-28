<template>
    <div class="row justify-content-center align-items-center">
        <div class="col-md-12 order-sm-last col-lg-6 p-3 text-center order-xs-last">
            <Card>
                <template #title> Successful Checkout! </template>
                <template #content>
                    <p class="m-0">
                        Thanks for making a purchase with us! We hope you enjoy your new item(s).
                    </p>
                    <button type="button" class="btn btn-dark mt-4" @click="goToListing()">Back To Listings</button>
                </template>
            </Card>
        </div>
        <div class="col-md-8 col-lg-6 p-3 d-flex justify-content-center align-items-center order-lg-last">
            <img class='img-fluid' src="../assets/img/ecommerce/success.png" alt="">
        </div>
    </div>
</template>

<style scoped>
.img-fluid {
    height: auto;
    width: 100%;
    padding: 5rem;
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


export default {
    methods: {
        goToListing() {
            console.log("working");
            this.$router.push({name: "Listing"});
        },
    }
}
</script>