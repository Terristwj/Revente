<template>
    <!-- tabs -->
    <div class="row text-center mb-4">
     
        <div class="tab d-flex">
            <div class="col">
                <button class="tablinks w-100" :class="{ 'clicked': pendingShow }" @click="openTab('pending')">Pending</button>

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
            <div class="container" v-if="!noPending">
                
                <div class="table-responsive">
                <table class="table table-striped">
                    <thead class="thead-light">
                        <tr class="table-danger" style="border:1px solid black;">
                            <th scope="col">ID</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Category</th>
                            <th scope="col">Status</th>
                            <th scope="col">Action Taken</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        <tr v-for="(product,idx) in pendingProducts" :key="product.id">
                            <td>{{ product.id }}</td>
                            <td>{{ product.name }}</td>
                            <td>{{ product.price }}</td>
                            <td>{{ product.category }}</td>
                            <td>{{ product.status }}</td>
                            <td>
                                <button class="btn btn-success mx-2" @click="approveProduct(product,idx)">Approve</button>
                                <button class="btn btn-danger mx-0" @click="removeProduct(idx)">Reject</button>
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
                            <th scope="col">Product Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Category</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="product in approvedProducts" :key="product.id">
                            <td>{{ product.id }}</td>
                            <td>{{ product.name }}</td>
                            <td>{{ product.price }}</td>
                            <td>{{ product.category }}</td>
                            <td>{{ product.status }}</td>
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

export default {
    data() {
        return {
            pendingShow: true,
            approvedShow: false,
            statsShow: false,
            // products: null,

            //fake getting it from the server
            pendingProducts: [
                { id: 3121, name: 'Shirt', price: 10.99, category: 'Electronics', status: 'Pending',  },
                { id: 4212,  name: 'Pants', price: 24.99, category: 'Clothing', status: 'Pending',},
                { id: 3513,  name: 'Skirt', price: 15.49, category: 'Home & Kitchen', status: 'Pending' },
                { id: 3513,  name: 'Skirt', price: 15.49, category: 'Home & Kitchen', status: 'Pending' },
                { id: 3513,  name: 'Skirt', price: 15.49, category: 'Home & Kitchen', status: 'Pending' },
                { id: 3513,  name: 'Skirt', price: 15.49, category: 'Home & Kitchen', status: 'Pending' },
                { id: 3513,  name: 'Skirt', price: 15.49, category: 'Home & Kitchen', status: 'Pending' },
                { id: 3513,  name: 'Skirt', price: 15.49, category: 'Home & Kitchen', status: 'Pending' },
                { id: 3513,  name: 'Skirt', price: 15.49, category: 'Home & Kitchen', status: 'Pending' },
                { id: 3513,  name: 'Skirt', price: 15.49, category: 'Home & Kitchen', status: 'Pending' },
                { id: 3513,  name: 'Skirt', price: 15.49, category: 'Home & Kitchen', status: 'Pending' },
                { id: 3513,  name: 'Skirt', price: 15.49, category: 'Home & Kitchen', status: 'Pending' },
                 { id: 3513,  name: 'Skirt', price: 15.49, category: 'Home & Kitchen', status: 'Pending' }
                
                
                // Add more products here
            ],
            //fake getting it from server
            approvedProducts: [
                { id: 5311, name: 'Jacket', price: 10.99, category: 'Electronics', status: 'Approved' },
                { id: 2942, name: 'Sweatshirt', price: 24.99, category: 'Clothing', status: 'Approved' },
                { id: 3435, name: 'Potato', price: 15.49, category: 'Home & Kitchen', status: 'Approved' },
                // Add more products here
            ],
        }
    },
    computed:{
        noPending(){
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
        approveProduct(product,idx) {
            // console.log('approveProduct');
            this.pendingProducts[idx].status = "Approved";
            this.approvedProducts.push(product);
            this.pendingProducts.splice(idx,1);
        },
        //needs to update server
        removeProduct(idx) {
            // console.log('removeProduct');
            this.pendingProducts.splice(idx,1);
        }
    },

}
</script>

<style scoped>
td{
    font-size: 1rem;
    padding: 20px;
}
th{
    font-weight: bolder;
    font-size: 1.2rem;
    
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
.col{
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

@media (max-width: 768px) {

    * {
        font-size: 10px;
    }

    .tab button {
        font-size: 12px;
    }
    .heading{
        font-size: 1.5rem;
    }
   
}
</style>