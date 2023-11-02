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
            FBInstanceFirestore.getProductsBasedOnBuyerID(userID).then((data) => {
                data.forEach(item => {
                    var obj = {}
                    obj["brand"] = item.brand;
                    obj["imgUrl"] = item.image_src;
                    obj["name"] = item.product_name;
                    obj["size"] = item.size;
                    obj["seller_name"] = null;
                    obj["product_id"] = item.product_ID;
                    obj["review_desc"] = item.review_desc;
                    if (item.review_desc != '') {
                        obj["reviewed"] = true;
                    } else {
                        obj["reviewed"] = false;
                    }
                    FBInstanceFirestore.getUser(item.seller_ID).then((data) => {
                        let sellerName = data.first_name + " " + data.last_name;
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

        <!--BELOW IS THE HEADER-->
        <h2 class="m-5 text-center">Order History</h2>

        <!--BELOW ARE THE PAST ORDER ITEMS-->
        <div class="container-fluid">
            <PastOrders v-for="(item, index) in items" :key="index" :imgUrl="item.imgUrl"
                :brand="item.brand" :size="item.size" :seller="item.seller_name" :name="item.name" :product_id="item.product_id" :review_desc="item.review_desc" :reviewed="item.reviewed"/>
        </div>

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
