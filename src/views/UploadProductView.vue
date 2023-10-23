<template>
    <!-- None  <576px, sm  ≥576px, md  ≥768px, lg  ≥992px, xl  ≥1200px, xxl  ≥1400px -->
    <header class="head fixed-top">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12 d-flex justify-content-between">
                    <h3 class="m-3" style="font-family:inter-medium;">List your preloved items here</h3>
                    <button type="button" class="btn btn-dark m-3 px-4">List Now</button>
                </div>
            </div>
        </div>
    </header>
    <div class='container-fluid content'>
        <form action="">
            <div class='row p-1 justify-content-around'>


                <!-- upload box -->
                <div
                    class='col-md-4 col-sm-11 shadow p-3 mb-5 bg-white rounded mx-4 upload d-flex justify-content-center align-items-center'>
                    <div class="container-fluid">
                        <div class="container-fluid d-flex justify-content-center align-items-center text-center"
                            id="upload_box">
                            <label for="file-upload" class="custom-file-upload">
                                <font-awesome-icon :icon="['fas', 'upload']" size="2xl" />
                                <p class="button">Select Photos</p>
                            </label>
                            <input id="file-upload" type="file" />
                        </div>
                    </div>
                </div>

                <!-- Categories -->
                <div class="col-md-7 col-sm-12">
                    <div class="row">
                        <div class='col-11 shadow p-3 mb-5 bg-white rounded mx-4 categories'>
                            <h4 class="lead">Category</h4>
                            <div>
                                <div class="card flex justify-content-center">
                                    <Dropdown v-model="selectedCategory" editable showClear :options="categories"
                                        optionLabel="name" placeholder="Select a Category" class="w-full md:w-14rem" />
                                </div>
                            </div>
                        </div> <!-- col -->
                        <!-- row -->

                        <!-- Condition -->
                        <div class="col-11 shadow p-3 mb-5 bg-white rounded mx-4">
                            <h4 class="lead">Condition</h4>
                            <div class="card flex justify-content-center">
                                <Dropdown v-model="selectedCondition" editable showClear :options="conditions"
                                    optionLabel="name" placeholder="Condition" class="w-full md:w-14rem" />
                            </div>
                            <h4 class="lead mt-3">Notes on condition (Optional)</h4>
                            <textarea name="ConditionNotes" id="" cols="30" rows="5" class="form-control"
                                placeholder="Example: Stained, Minor defects at the collar area, Perfect Condition"></textarea>

                        </div>

                        <!-- Item-details -->
                        <div class="col-11 shadow p-3 mb-5 bg-white rounded mx-4">
                            <h4 class="lead">Item Details</h4>
                            <div class="container-fluid py-3">
                                <span class="p-float-label">
                                    <InputText id="itemdetails" v-model="itemDetails" class="form-control" />
                                    <label for="itemdetails">Listing Name</label>
                                </span>
                            </div>
                            <div class="container-fluid py-3">
                                <span class="p-float-label">
                                    <InputText id="brand" v-model="brand" class="form-control" />
                                    <label for="brand">Brand</label>
                                </span>
                            </div>
                            <h4 class="lead mt-3">Description (Optional)</h4>
                            <textarea name="" id="Description" cols="30" rows="5" class="form-control"></textarea>

                        </div>


                        <!-- Drop-off Location -->
                        <div class="col-11 shadow p-3 mb-5 bg-white rounded mx-4">
                            <h4 class="lead">Drop-off Location</h4>
                            <div class="container-fluid py-3">
                                <span class="p-float-label">
                                    <InputText id="address" v-model="address" class="form-control" />
                                    <label for="address">Address</label>
                                </span>
                            </div>
                            <div id="map">
                                <GoogleMap api-key="AIzaSyApnpHM07gLONvFhRdgZRKDmEYoP3w1mOo"
                                    style="width: 100%; height: 500px" :center="center" :zoom="15">
                                    <Marker :options="{ position: center }" />
                                </GoogleMap>
                            </div>
                        </div>

                        <!-- Price -->
                        <div class="col-11 shadow p-3 mb-5 bg-white rounded mx-4">
                            <h4 class="lead">Price</h4>
                            <div class="container-fluid py-3">
                                <span class="p-float-label">
                                    <InputText id="price" v-model="price" class="form-control" />
                                    <label for="price">Price</label>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </form>
    </div> <!-- container -->
</template>

<script>
import { GoogleMap, Marker } from "vue3-google-map";

export default {
    components: {
        GoogleMap,
        Marker,
    },
    setup() {
        const center = { lat: 1.296568, lng: 103.852119 };

        return { center };
    },
    data() {
        return {
            map: null,
            selectedCategory: null,
            categories: [
                { name: 'T-Shirt', code: 'TSH' },
                { name: 'Pants', code: 'PNT' },
                { name: 'Shorts', code: 'SHO' },
                { name: 'Skirt', code: 'SKR' }
            ],
            selectedCondition: null,
            conditions: [
                { name: 'Brand New' },
                { name: 'Like New' },
                { name: 'Lightly Used' },
                { name: 'Well Used' },
                { name: 'Heavily Used' },
            ],
            itemDetails: '',
            brand: '',
            address: '',
            price: '',
        };
    },

};
</script>


<style scoped>
.custom-file-upload {
    display: inline-block;
    padding: 6px 12px;
    cursor: pointer;
}

input[type="file"] {
    display: none;
}

#upload_box {
    border: 1.5px dashed #000000;
    border-radius: 10px;
    display: inline-block;
    padding: 6px 12px;
    cursor: pointer;
    height: 200px;
    background-color: rgb(180, 180, 180);
    opacity: 0.9;
    /* width: 500px; */
}

.button {
    border: 1px solid #000000;
    padding: 0.5rem;
    margin-top: 0.5rem;
    border-radius: 10px;
    color: white;
    background-color: black;
}

.upload {
    height: 50dvh;
    background-image: url("../assets/img/ecommerce/uploadimg1.png");
    background-position: center;
}

.head {
    top: 56px;
    z-index: 999;
    background-color: rgb(248, 228, 213);
    opacity: 0.9;

}

.content {
    margin-top: 80px;
}
</style>