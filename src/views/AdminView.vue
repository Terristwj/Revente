<template>
    <!-- tabs -->
    <div class="row text-center mb-4">

        <div class="tab d-flex">
            <div class="col">
                <button class="tablinks w-100" :class="{ 'clicked': pendingShow }"
                    @click="openTab('pending')">Pending</button>

            </div>
            <div class="col">
                <button class="tablinks w-100" :class="{ 'clicked': approvedShow }"
                    @click="openTab('approved')">Approved</button>

            </div>
            <div class="col">

                <button class="tablinks w-100" :class="{ 'clicked': statsShow }" @click="openTab('stats')">Stats</button>
            </div>


        </div>

        <!-- pending content -->
        <div v-if="pendingShow" class="tabcontent py-5">
            <h2 class="mb-5 heading">Pending</h2>

            <div v-if="noPending" class="my-5">
                <h3>No Pending Products!</h3>
            </div>
            <div class="container w-100" v-if="!noPending">

                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead class="thead-light">
                            <tr class="table-danger" style="border:1px solid black;">
                                <th scope="col">ID</th>
                                <th scope="col">Product</th>
                                <th scope="col">Product Name</th>
                                <th scope="col">Price (Quoted by seller)</th>
                                <th scope="col">Price (AI Generated Price)</th>
                                <th scope="col">Category</th>
                                <th scope="col">Accept</th>
                                <th scope="col">Reject</th>
                                <th scope="col">Insert Size Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(product, idx) in pendingProducts" :key="product.product_ID">
                                <td>{{ product.product_ID }}</td>
                                <td><img :src="product.image_src" alt="Product Image"
                                        :style="{ width: '100px', height: '100px' }" /></td>
                                <td>{{ product.product_name }}</td>
                                <td :class="getPriceClass(product.price, product.modifiedPrice)">{{ product.price }}</td>
                                <td>{{ product.modifiedPrice }}</td>
                                <td>{{ product.category }}</td>
                                <td>
                                    <button class="btn btn-success mx-2"
                                        @click="approveProduct(product, idx, product.modifiedPrice)">Approve</button>
                                </td>
                                <td>
                                    <button class="btn btn-danger mx-0" @click="removeProduct(idx)">Reject</button>
                                </td>
                                <td>
                                    <textarea name="detailedSizing" :id="'detailedSizing-' + idx" v-model="productSize[idx]"
                                        cols="20" rows="5"
                                        placeholder="Chest Width: cm, Shoulder Width: cm, Sleeve Length: cm, Length: cm"></textarea>
                                </td>
                            </tr>
                        </tbody>

                    </table>
                </div>

            </div>
        </div>

        <!-- approved content -->
        <div v-if="approvedShow" class="tabcontent">
            <h2 class="mb-5 heading">Approved</h2>
            <div class="container">
                <div class="table-responsive">
                    <table class="table table-striped custom-table">
                        <thead class="thead-light">
                            <tr class="table-success" style="border:1px solid black;">
                                <th scope="col">ID</th>
                                <th scope="col">Product</th>
                                <th scope="col">Product Name</th>
                                <th scope="col">Price</th>
                                <th scope="col">Category</th>
                                <th scope="col">Size</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="product in approvedProducts" :key="product.id">
                                <td>{{ product.product_ID }}</td>
                                <td><img :src="product.image_src" alt="Product Image"
                                        :style="{ width: '100px', height: '100px' }" /></td>
                                <td>{{ product.product_name }}</td>
                                <td>{{ product.modifiedPrice}}</td>
                                <td>{{ product.category }}</td>
                                <td class="text-wrap">{{ product.size }}</td>

                            </tr>
                        </tbody>

                    </table>
                </div>

            </div>
        </div>

        <!-- stats content -->
        <div v-if="statsShow" class="tabcontent">
            <h2 class="mb-5 heading">Stats</h2>
        </div>
    </div>
</template>

<script>
import FBInstanceFirestore from "../services/Firebase/FirestoreDatabase.js";

export default {
    data() {
        return {
            productSize: [],
            pendingShow: true,
            approvedShow: false,
            statsShow: false,
            // products: null,
            pendingProducts: [],
            //fake getting it from server
            approvedProducts: [
                {
                    product_ID: 5311, product_name: 'Jacket', modifiedPrice: 10.99, category: 'Electronics', status: 'Approved',
                    size: `Chest Width: 132 cm, Shoulder Width: 56 cm, Sleeve Length: 60 cm, Length: 70 cm`, image_src : ''
                },
                // Add more products here
            ],
        }
    },
    computed: {
        noPending() {
            return this.pendingProducts.length == 0;
        },


    },

    methods: {
        openTab(word) {
            // console.log('openTab');
            if (word == "pending") {
                this.pendingShow = true;
                this.approvedShow = false;
                this.statsShow = false;
            }
            else if (word == "approved") {
                this.pendingShow = false;
                this.approvedShow = true;
                this.statsShow = false;
            } else {
                this.pendingShow = false;
                this.approvedShow = false;
                this.statsShow = true;
            }
        },

        //needs to update server
        approveProduct(product, idx, newprice) {
            // console.log('approveProduct');
            const size = this.productSize[idx];

            if (size) {
                // console.log(size);
                this.pendingProducts[idx].status = "Approved";
               
                //update firebase
                FBInstanceFirestore.updateProductStatus(
                    this.pendingProducts[idx].seller_ID,
                    this.pendingProducts[idx].product_ID,
                    this.pendingProducts[idx].product_name,
                    this.pendingProducts[idx].brand,
                    this.pendingProducts[idx].description,
                    this.pendingProducts[idx].gender,
                    this.pendingProducts[idx].category,
                    this.pendingProducts[idx].condition,
                    this.pendingProducts[idx].condition_notes,
                    this.pendingProducts[idx].drop_off_location,
                    this.pendingProducts[idx].price,
                    this.pendingProducts[idx].modifiedPrice,
                    "true",
                    this.pendingProducts[idx].image_src,
                    size,
                );

                this.pendingProducts[idx].price = newprice;
                let id = this.pendingProducts[idx].product_ID;
                console.log(id);
                this.approvedProducts.push(product);
                console.log(this.approvedProducts);
                for (const key in this.approvedProducts) {
                    if (this.approvedProducts[key].product_ID == id) {
                        this.approvedProducts[key].size = size;
                    }
                }
                this.pendingProducts.splice(idx, 1);
                this.productSize[idx] = '';
            } else {
                // Size is not filled, show a notification
                alert('Please fill in the size');
            }
        },

        //needs to update server
        removeProduct(idx) {
            // console.log('removeProduct');
            if (this.pendingProducts[idx].price <= this.pendingProducts[idx].modifiedPrice) {
                alert('Are you sure you want to reject this product?')
            }
            else {
                this.pendingProducts.splice(idx, 1);
            }
        },


        modifyPrice(price) {
            const randomValue = Math.floor(Math.random() * 21) - 10;
            return (price + randomValue).toFixed(2);
        },
        getPriceClass(price, modifiedPrice) {
            return {
                'text-success': price <= modifiedPrice,
                'text-danger': price > modifiedPrice,
            };
        },


    },
    // In your Vue component
    created() {
        // grabs all the data already AND SPLITS them into pending and approved
        FBInstanceFirestore.getAllProducts().then((data) => {
            for (const key in data) {
                if (data[key].is_approved == "false") {
                    this.pendingProducts.push(data[key]);
                }
                else {
                    //if dh the same product, push to approvedProducts
                    if(this.approvedProducts.includes(data[key]) == false){
                        this.approvedProducts.push(data[key]);
                    }
                   
                }
            }
           
            this.pendingProducts.forEach((product) => {
                product.modifiedPrice = this.modifyPrice(product.price);

            });
            console.log(this.pendingProducts); // Do something with the data
        }).catch((error) => {
            // Handle any errors that occur during the promise execution
            console.error(error);
        });

    },





}
</script>

<style scoped>
td {
    font-size: 1rem;
    padding: 20px;
    /* border-bottom: 1px solid #000000; */
    border: 1px solid #000000;
    vertical-align: middle;
}

th {
    font-weight: bolder;
    font-size: 1.2rem;
    border: 1px solid #000000;

}

table {
    border: 1px solid #000000;
}

.clicked {
    background-color: #15020254;
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

.col {
    border: 0.5px solid rgb(196, 191, 191);

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
    background-color: #15020254;
}

/* Style the tab content */
.tabcontent {
    padding: 10dvh;
    border: 1px solid #fffefe;
    border-top: none;
    margin-bottom: 5dvh;
}

.my-custom-table {
    width: 100%;
    /* Set the width of the table to 100% */
}

.table-responsive {
    max-height: 600px;
    /* Set the maximum height of the table container */
    overflow-y: auto;
    /* Enable vertical scrolling if the content exceeds the container's height */
}

@media (max-width: 768px) {

    * {
        font-size: 10px;
    }

    .tab button {
        font-size: 12px;
    }

    .heading {
        font-size: 1.5rem;
    }

}
</style>