<template>
    <div class="container">
        <div class="row py-5 border-bottom-black">
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
                        <li>We will dynamically add the info here through AI</li>
                        <li>Officia quas, officiis eius magni error magnam voluptatem</li>
                        <li>nesciunt quod! Earum voluptatibus quaerat dolorem doloribus</li>
                        <li>molestias ipsum ab, ipsa consectetur laboriosam soluta et</li>
                        <li>ut doloremque dolore corrupti, architecto iusto beatae.</li>
                    </ul>
                </div>
                <div class="row w-75 wishcart">
                    <button type="button" class="btn btn-clear my-4" @click="addCart()">Add to Cart</button>
                    <button class="btn btn-outline-dark me-sm-2" @click="addWishList()">
                        <font-awesome-icon :icon="['far', 'heart']" />
                        Add to Wishlist
                    </button>
                </div>


            </div>
        </div>
        <div class="row text-center">
            <div class="tab">
                <button class="tablinks w-50" :class="{ 'clicked': descriptionShow }"
                    @click="openTab(event, 'description')">Description</button>
                <button class="tablinks w-50" :class="{ 'clicked': sizeShow }" @click="openTab(event, 'size')">Size</button>
            </div>
            <div v-if="descriptionShow" class="tabcontent">
                <h3>{{ description }}</h3>
                <p>London is the capital city of England.</p>

            </div>
            <div v-if="sizeShow" class="tabcontent">
                <h3>{{ size }}</h3>
                <p>Paris is the capital of France.</p>

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
            image: '',
            description: 'TEST TEST',
            size: 'TEST TESTsadasd',
            descriptionShow: true,
            sizeShow: false,

        };
    },
    methods: {
        openTab(event, tabName) {

            // console.log('openTab');
            if (tabName == 'description') {
                this.descriptionShow = true;
                this.sizeShow = false;
            }
            else {
                this.descriptionShow = false;
                this.sizeShow = true;
            }
        },
        addCart() {
            console.log('addCart');
        },
        addWishList() {
            console.log('addWishList');
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

        let my_product = FBInstanceFirestore.getProducts(this.itemID);
        my_product.then((data) => {
            // Handle the data once the promise is resolved
            this.product = data;
            console.log(data); // Do something with the data
        }).catch((error) => {
            // Handle any errors that occur during the promise execution
            console.error(error);
        });
        // this.product = data[1];
        this.category = { categoryName: "Tee" };
    },
}
</script>
<style scoped>
.clicked {
    background-color: #ddd;
}

.category {
    font-weight: 400;
}

.btn-clear:hover {
    background-color: black;
    color: white;
}

.btn {
    border-radius: 23px;
}

.btn-clear {
    border: 1px solid black;
}

.tablinks {
    border: 1px solid black;
    margin: 0;
    color: black;
    font-weight: 600;
    font-size: 1.2rem;
    cursor: pointer;
    transition: 0.3s;

}

/* Style the tab */
.tab {
    overflow: hidden;
    border: 1px solid white;
    border-bottom: none;
    /* background-color: #f1f1f1; */

}

/* Style the buttons inside the tab */
.tab button {
    /* background-color: inherit; */
    border: none;
    outline: none;
    cursor: pointer;
    padding: 14px 16px;
    transition: 0.3s;
    font-size: 17px;
}

/* Change background color of buttons on hover */
.tab button:hover {
    background-color: #ddd;
}

/* Style the tab content */
.tabcontent {
    padding: 10dvh;
    border: 1px solid #fffefe;
    border-top: none;
    margin-bottom: 5dvh;
}

@media (max-width: 768px) {

    * {
        font-size: 10px;
    }
    .tab button{
        font-size: 12px;
    }

}

@media(max-width:425px){
    .wishcart{
        margin-left: auto;
        margin-right: auto;
    }

}
</style>