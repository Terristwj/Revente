<script>
import PastOrders from "../components/PastOrder.vue";
import FBInstanceFirestore from "../services/Firebase/FirestoreDatabase.js";
import { userStore } from "../main.js";
import { watchEffect } from "vue";

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
            this.getItems(this.userID);
        }, 1000);
    },
    mounted() {
        watchEffect(() => {
            this.userID = userStore.getUserID();
        })
    },
    methods: {
        getItems(userID) {
            console.log(userID);
            FBInstanceFirestore.getProductsBasedOnBuyerID(userID).then((data) => {
                console.log(data);
                data.forEach(item => {
                    var obj = {}
                    console.log(item.seller_ID);
                    obj["brand"] = item.brand;
                    obj["imgUrl"] = item.image_src;
                    obj["name"] = item.product_name;
                    obj["size"] = item.size;
                    obj["seller_name"] = null;
                    // this.items.push(item)
                    FBInstanceFirestore.getUser(item.seller_ID).then((data) => {
                        let sellerName = data.first_name + " " + data.last_name;
                        console.log(sellerName);
                        obj["seller_name"] = sellerName;
                        this.items.push(obj);
                    })
                });
            });
        },
    }, // methods
};
</script>

<template>
    <body>
        <!--BELOW IS THE HEADER-->
        <h2 class="m-5 mb-4">Order History</h2>

        <!--BELOW ARE THE PAST ORDER ITEMS-->
        <div class="container-fluid">
            <PastOrders v-for="(item, index) in items" :key="index" :deliverydate="item.deliverydate" :imgUrl="item.imgUrl"
                :brand="item.brand" :size="item.size" :seller="item.seller_name" :name="item.name" />
        </div>
    </body>
</template>

<style scoped>
p {
    color: black;
}

h2 {
    font-family: "inter-bold";
    color: black;
}
</style>
