<script>
import FBInstanceFirestore from "../services/Firebase/FirestoreDatabase.js";
import { itemStore } from "../main.js";
import { userStore } from "../main.js";
import { shoppingCart } from "../main.js";

export default {
    data() {
        return {
            temp: [],
            user_ID: "",
            // Item Image
            imageSrc: "",

            // Gender
            gender: "",

            // Category
            category: "",

            // Condition
            condition: "",
            conditionNotes: "",
            brand: "",

            // Item Information
            itemID: "",
            itemName: "",
            itemBrand: "",
            itemDescription: "",

            // Others
            dropOffLocation: "",
            price: 0.0,
            generalSize: "",

            size: "",
            local_itemID: "",

            // Code-related
            isLoading: true,
            descriptionShow: true,
            sizeShow: false,
        };
    },
    methods: {
        async getProductData() {
            // //hardcode to get data from database
            // const itemID = "ICUUp4n7RfnPzLjP6Hd8";

            // For later implementation
            //  console.log(itemStore.getItemID());
            // itemStore.setItemID('jN2TrVSILV7eIMmzhJfV');
            this.local_itemID = itemStore.getItemID();

            FBInstanceFirestore.getProduct(this.local_itemID)
                .then((data) => {
                    this.temp = data;
                    // Handle the data once the promise is resolved
                    // console.log(data);
                    this.imageSrc = data.image_src;
                    this.brand = data.brand;

                    this.gender = data.gender;

                    this.category = data.category;

                    this.condition = data.condition;
                    this.conditionNotes = data.condition_notes;

                    this.itemName = data.product_name;
                    this.itemBrand = data.brand;
                    this.itemDescription = data.description;

                    this.dropOffLocation = data.drop_off_location;
                    this.price = parseFloat(data.modifiedPrice);
                    this.size = data.size;

                    const parts = this.size.split(' ');

                    // Initialize the length
                    let length = 0;

                    // Iterate through the parts to extract the length
                    for (let i = 0; i < parts.length; i++) {
                        const part = parts[i];
                        if (part === "Length:") {
                            length = parseFloat(parts[i + 1]);
                            break; // Exit the loop once length is found
                        }
                    }
                    if (length >= 120) {
                        this.generalSize = "Large";
                    } else if (length >= 100) {
                        this.generalSize = "Medium";
                    }
                    else if (length >= 80) {
                        this.generalSize = "Small";
                    }
                    else {
                        this.generalSize = "Extra Small";
                    }
                })
                .catch((error) => {
                    // Handle any errors that occur during the promise execution
                    console.error(error);
                });
        },


        openTab(event, tabName) {
            // console.log('openTab');
            if (tabName == "description") {
                this.descriptionShow = true;
                this.sizeShow = false;
            } else {
                this.descriptionShow = false;
                this.sizeShow = true;
            }
        },
        addCart() {
        if(shoppingCart.getCart().includes(this.local_itemID)){
            alert("Item already added to cart, please check your cart");
        }
        else{
            shoppingCart.addCart(this.local_itemID);
            console.log(shoppingCart.getCart());
        }
            
        },
        addWishList() {
            console.log("addWishList");
        },
    },
    created() {
        setTimeout(() => {
            this.getProductData();
            this.isLoading = false;
            this.user_ID = userStore.getUserID();
        }, 1000);

    },
};
</script>

<template>
    <div class="container">
        <div class="row py-5 border-bottom-black">
            <div class="col-md-1"></div>
            <!--            display image-->
            <div class="col-md-4 col-12">
                <img :src="imageSrc" class="img-fluid img_style" />
            </div>
            <!--            display product details-->
            <div class="col-md-6 col-12 pt-3 pt-md-0">
                <h4>{{ itemName }}</h4>
                <h6 class="catgory font-italic">{{ category }}</h6>
                <h6 class="font-weight-bold">$ {{ price }}</h6>
                <p>
                    {{ condition }}
                </p>
                <div class="features pt-3">
                    <h5><strong>Features</strong></h5>
                    <ul>
                        <li>
                            Gender:
                            {{ gender }}
                        </li>
                        <li>
                            Brand: {{ brand }}
                        </li>
                        <li>
                            Product Name:
                            {{ itemName }}
                        </li>
                        <li>
                            Condition:
                            {{ conditionNotes }}
                        </li>
                        <li>
                            Size:
                            {{ generalSize }}
                        </li>



                    </ul>
                </div>
                <div class="row w-75 wishcart">
                    <button type="button" class="btn btn-clear my-4" @click="addCart()">
                        Add to Cart
                    </button>
                    <button class="btn btn-outline-dark me-sm-2" @click="addWishList()">
                        <font-awesome-icon :icon="['far', 'heart']" />
                        Add to Wishlist
                    </button>
                </div>
            </div>
        </div>
        <div class="row text-center">
            <div class="tab">
                <button class="tablinks w-50" :class="{ clicked: descriptionShow }" @click="openTab(event, 'description')">
                    Description
                </button>
                <button class="tablinks w-50" :class="{ clicked: sizeShow }" @click="openTab(event, 'size')">
                    Size
                </button>
            </div>
            <div v-if="descriptionShow" class="tabcontent">
                <h2>More description</h2>
                <p>{{ itemDescription }}</p>
            </div>
            <div v-if="sizeShow" class="tabcontent">
                <h2>Detailed Size</h2>
                <h3>
                    {{ generalSize }}
                </h3>
                <p>{{ size }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.img_style {
    width: 100%;
    height: 100%;
    object-fit: fill;
}

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

    .tab button {
        font-size: 12px;
    }
}

@media (max-width: 425px) {
    .wishcart {
        margin-left: auto;
        margin-right: auto;
    }
}
</style>
