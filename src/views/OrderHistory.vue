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
    async getItems(userID) {
        console.log(userID);
        const items = await FBInstanceFirestore.getProductsBasedOnBuyerID(userID);

        await Promise.all(
        items.map(async (item) => {
            var obj = {};
            obj["brand"] = item.brand;
            obj["imgUrl"] = item.image_src;
            obj["name"] = item.product_name;
            obj["size"] = item.size;
            obj["productID"] = item.productID;
            obj["seller_name"] = null;

            const userData = await FBInstanceFirestore.getUser(item.seller_ID);
            let sellerName = userData.first_name + " " + userData.last_name;
            obj["seller_name"] = sellerName;

            this.items.push(obj);
            })
            );
        },
    },
};
</script>

<template>
    <body>
        <!--BELOW IS THE HEADER-->
        <h2 class="m-5 mb-4">Order History</h2>

        <!--BELOW ARE THE PAST ORDER ITEMS-->
        <div v-for="(order, index) in items" :key="index" class="container-fluid">
            <PastOrders 
            :deliverydate="order.deliverydate" 
            :imgUrl="order.imgUrl"
            :brand="order.brand" 
            :size="order.size" 
            :seller="order.seller_name" 
            :name="order.name" 
            :productID="order.productID"
            />
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
