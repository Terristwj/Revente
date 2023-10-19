

<template>
    <div class="container">
        <div class="row pt-5">
            <div class="col-md-1"></div>
            <!--            display image-->
            <div class="col-md-4 col-12">
                <img src="../assets/img/ecommerce/exampleTee.png" class="img-fluid">
            </div>
            <!--            display product details-->
            <div class="col-md-6 col-12 pt-3 pt-md-0">
                <h4>{{ product.name }}</h4>
                <h6 class="catgory font-italic"> {{ category.categoryName }}</h6>
                <h6 class="font-weight-bold"> $ {{ product.price }}</h6>
                <p>
                    {{ product.description }}
                </p>
                <div class="features pt-3">
                    <h5><strong>Features</strong></h5>
                    <ul>
                        <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
                        <li>Officia quas, officiis eius magni error magnam voluptatem</li>
                        <li>nesciunt quod! Earum voluptatibus quaerat dolorem doloribus</li>
                        <li>molestias ipsum ab, ipsa consectetur laboriosam soluta et</li>
                        <li>ut doloremque dolore corrupti, architecto iusto beatae.</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import FBInstanceFirestore from "../services/Firebase/FirestoreDatabase.js";
import { itemStore } from "../main.js";
export default {
    data() {
        return {
            product: {},
            category: {},
            itemID: '',
            image:''

        }
    },
    created() {
        // let data = {
        //     1: {
        //         "product_id": 1,
        //         "product_name": "Vintage Tee",
        //         "description": "nesciunt quod! Earum voluptatibus quaerat dolorem doloribus",
        //         "price": "100",
        //         "imgSrc": "../assets/img/ecommerce/exampleTee.png",
        //         "color": "white"
        //     }
        // };
        //  console.log(itemStore.getItemID());

        //hardcode
        itemStore.setItemID('jN2TrVSILV7eIMmzhJfV');
    
        this.itemID = itemStore.getItemID();
        // console.log(this.itemID);
        // this.product = data[this.itemID];

        let my_product =  FBInstanceFirestore.getProducts(this.itemID);
        my_product.then((data) => {
            // Handle the data once the promise is resolved
            this.product = data;
            console.log(data); // Do something with the data
            }).catch((error) => {
            // Handle any errors that occur during the promise execution
            console.error(error);
            });
        // this.product = data[1];
        this.category = { categoryName: "Tee" }



    },
}
</script>
<style>
.category {
    font-weight: 400;
}
</style>