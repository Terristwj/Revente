<script>
import { useWindowSize } from "vue-window-size";
import SideMenuBar from "../../components/SideMenuBar.vue";
import ItemCard from "../../components/ItemCard.vue";
import FBInstanceFirestore from "../../services/Firebase/FirestoreDatabase.js";

export default {
    created() {
        // grabs all the data already AND SPLITS them into pending and approved
        FBInstanceFirestore.getAllProducts()
            .then((data) => {
                for (const key in data) {
                    if (
                        data[key].is_approved == true &&
                        data[key].is_bought == false
                    ) {
                        this.approvedProducts.push(data[key]);
                        this.brands.push(data[key].brand);
                    }
                }
                console.log(this.approvedProducts);
            })
            .catch((error) => {
                // Handle any errors that occur during the promise execution
                console.log(error);
                this.$toast.add({
                    severity: "error",
                    summary: "Database Quota Reached",
                    detail: "Database Quota will reset at SGT 1pm.",
                    life: 15000,
                });
            });
    },
    setup() {
        const { width, height } = useWindowSize();
        return {
            windowWidth: width,
            windowHeight: height,
        };
    },
    data() {
        return {
            visibleLeft: false,
            approvedProducts: [],
            brands: [],
            filter: {
                gender: "",
                brand: "",
                minPrice: "",
                maxPrice: "",
            },
        };
    },
    computed: {
        filteredProducts() {
            var filtered = [];
            // if no filter, add all products
            if (
                this.filter.gender == "" &&
                this.filter.brand == "" &&
                this.filter.price == ""
            ) {
                return this.approvedProducts;
            }
            // else return filtered products
            for (const product of this.approvedProducts) {
                // gender filter
                if (
                    product.gender != this.filter.gender &&
                    this.filter.gender != ""
                ) {
                    continue;
                }
                // brand filter
                if (
                    !product.brand.includes(this.filter.brand) &&
                    this.filter.brand != ""
                ) {
                    continue;
                }
                // price filter
                if (this.filter.minPrice == "" && this.filter.maxPrice == "") {
                    filtered.push(product);
                    continue;
                } else if (
                    product.modifiedPrice >= this.filter.minPrice &&
                    product.modifiedPrice <= this.filter.maxPrice
                ) {
                    filtered.push(product);
                    continue;
                } else {
                    continue;
                }
            }
            return filtered;
        },
    },
    methods: {
        updateGender(e) {
            this.filter.gender = e;
        },
        updateBrand(e) {
            this.filter.brand = e;
        },
        updatePrice(e) {
            this.filter.minPrice = e[0];
            this.filter.maxPrice = e[1];
        },
    },
    components: {
        SideMenuBar,
        ItemCard,
    },
};
</script>

<template>
    <body>
        <div class="container-fluid">
            <div class="row">
                <div class="my-3">
                    <button
                        class="btn btn-outline-dark d-inline-flex align-items-center d-block d-lg-none"
                        @click="visibleLeft = true"
                    >
                        Filter
                        <font-awesome-icon
                            :icon="['fas', 'filter']"
                            class="mx-2"
                        />
                    </button>
                </div>
            </div>
            <div class="row">
                <!-- Sticky sidebar for large screens -->
                <div class="col-lg-3 col-xl-2 d-none d-lg-block">
                    <SideMenuBar
                        class="sticky-top"
                        :brands="brands"
                        @gender-picked="updateGender"
                        @brands-picked="updateBrand"
                        @price-range-selected="updatePrice"
                    />
                </div>
                <!--Toggle-able sidebar for smaller screen -->
                <Sidebar
                    v-model:visible="visibleLeft"
                    class="d-block d-lg-none"
                >
                    <SideMenuBar
                        :brands="brands"
                        @gender-picked="updateGender"
                        @brands-picked="updateBrand"
                        @price-range-selected="updatePrice"
                    />
                </Sidebar>
                <div class="col-md-12 col-lg-9 col-xl-10">
                    <div class="row justify-content-center gap-2 gap-lg-3">
                        <ItemCard
                            v-for="(product, index) in filteredProducts"
                            :key="index"
                            :product="product"
                        />
                    </div>
                </div>
            </div>
        </div>
    </body>
</template>

<style scoped>
body {
    overflow: visible;
}
.btn-outline-dark:hover {
    color: white;
}
.sticky-top {
    position: -webkit-sticky;
    position: sticky;
    top: 4em;
}
</style>
