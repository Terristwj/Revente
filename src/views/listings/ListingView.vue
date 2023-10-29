<script>
import SideMenuBar from "../../components/SideMenuBar.vue";
import ItemCard from "../../components/ItemCard.vue";
import FBInstanceFirestore from "../../services/Firebase/FirestoreDatabase.js";

export default {
    components: {
        SideMenuBar,
        ItemCard,
    },
    data() {
        return {
            // Left Filter Menu
            visibleLeft: false,

            // Filter Settings
            filter: {
                gender: "",
                brand: "",
                minPrice: "",
                maxPrice: "",
            },
            brands: [],

            // Products to display
            allProductListings: [],
            productListings: [],

            // Pagination
            totalProducts: 0,
            paginationIndex: 0,
            paginationPageNumber: 0,

            // Error Handlers
            FBQuotaReached: false,
        };
    },
    computed: {
        filteredProducts() {
            var filtered = [];

            // Reset Button clicked
            if (
                this.filter.gender == "" &&
                this.filter.brand == "" &&
                this.filter.minPrice == "" &&
                this.filter.maxPrice == ""
            ) {
                this.resetPagination(this.allProductListings.length);
                return this.productListings;
            }

            // console.log(this.productListings);
            // else return filtered products
            for (const product of this.allProductListings) {
                // gender filter
                if (
                    product.gender != this.filter.gender &&
                    this.filter.gender != ""
                ) {
                    continue;
                }
                // brand filter
                if (
                    !this.filter.brand.includes(product.brand) &&
                    this.filter.brand != ""
                ) {
                    continue;
                }
                // price filter
                if (this.filter.minPrice == "" && this.filter.maxPrice == "") {
                    // console.log(1, product);
                    filtered.push(product);
                    continue;
                } else if (
                    product.modifiedPrice >= this.filter.minPrice &&
                    product.modifiedPrice <= this.filter.maxPrice
                ) {
                    // console.log(21, product);
                    filtered.push(product);
                    continue;
                } else {
                    // console.log(31, product);
                    continue;
                }
            }

            this.resetPagination(filtered.length);

            // console.log(filtered);
            return filtered;
        },
    },
    methods: {
        // Filters
        updateGender(e) {
            // console.log(e);
            this.filter.gender = e;
        },
        updateBrand(e) {
            // console.log(e);
            this.filter.brand = e;
        },
        updatePrice(e) {
            // console.log(e);
            if (e) {
                this.filter.minPrice = e[0];
                this.filter.maxPrice = e[1];
            } else {
                this.filter.minPrice = "";
                this.filter.maxPrice = "";
            }
        },
        clearFilters() {
            this.filter = {
                gender: "",
                brand: "",
                minPrice: "",
                maxPrice: "",
            };
        },

        // Pagination
        onPageChange(e, index) {
            // Scroll to top if 'Bottom Pagination'
            if (index == 2) {
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
            }

            // Update both 'Pagination Metadata'
            this.paginationIndex = e.first;
            this.paginationPageNumber = e.page;

            // Display the selected 'Pagination index' of products
            this.productListings = this.allProductListings.slice(
                e.first,
                e.first + e.rows
            );

            // Debugging Codes
            // console.log(e);
            // console.log(index);
            // console.log(this.allProductListings);
            // console.log(
            //     this.allProductListings.slice(e.first, e.first + e.rows)
            // );
        },

        resetPagination(count) {
            // Update both 'Pagination Metadata'
            this.totalProducts = count;
            // this.paginationIndex = 0;
            this.paginationPageNumber = 0;
        },

        // Database
    },
    async created() {
        // Get total products
        await FBInstanceFirestore.getAllProductListingsAndCount()
            .then(({ products, count }) => {
                // Data from Firebase
                this.allProductListings = products;
                this.totalProducts = count;

                // Get all brands
                for (const key in products) {
                    const brand = products[key].brand;
                    if (!this.brands.includes(brand)) this.brands.push(brand);
                }

                // Data to be displayed onLoad
                this.productListings = this.allProductListings.slice(0, 12);
            })
            .catch((err) => {
                console.log(err);
                this.FBQuotaReached = true;
            });

        if (this.FBQuotaReached) {
            this.$toast.add({
                severity: "error",
                summary: "Database Quota Reached",
                detail: "Database Quota will reset at SGT 1pm.",
                life: 15000,
            });
        }
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
                <!-- Sticky sidebar for large screens START -->
                <div class="col-lg-3 col-xl-2 d-none d-lg-block">
                    <SideMenuBar
                        class="sticky-top"
                        :brands="brands"
                        :isMobile="true"
                        @gender-picked="updateGender"
                        @brands-picked="updateBrand"
                        @price-range-selected="updatePrice"
                    />
                </div>
                <!-- Sticky sidebar for large screens END -->

                <!-- Toggle-able sidebar for smaller screen START -->
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
                <!-- Toggle-able sidebar for smaller screen END -->

                <div class="col-md-12 col-lg-9 col-xl-10">
                    <div class="card">
                        <Paginator
                            id="Paginator-1"
                            :template="{
                                '640px':
                                    'PrevPageLink CurrentPageReport NextPageLink',
                                '960px':
                                    'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
                                '1300px':
                                    'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
                                default:
                                    'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink ',
                            }"
                            :rows="12"
                            :totalRecords="totalProducts"
                            v-on:page="onPageChange($event, 1)"
                            :first="paginationIndex"
                            :page="paginationPageNumber"
                        >
                        </Paginator>

                        <div
                            v-if="filteredProducts.length == 0"
                            class="no-item-warning"
                        >
                            <h1>No Items Found</h1>
                            <button
                                @click="clearFilters"
                                class="btn btn-outline-secondary mt-3"
                            >
                                Reset Filter
                            </button>
                        </div>
                        <div class="row justify-content-center gap-2 gap-lg-3">
                            <ItemCard
                                v-for="(product, index) in filteredProducts"
                                :key="index"
                                :product="product"
                            />
                        </div>

                        <Paginator
                            id="Paginator-2"
                            :template="{
                                '640px':
                                    'PrevPageLink CurrentPageReport NextPageLink',
                                '960px':
                                    'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
                                '1300px':
                                    'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
                                default:
                                    'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink ',
                            }"
                            :rows="12"
                            :totalRecords="totalProducts"
                            v-on:page="onPageChange($event, 2)"
                            :first="paginationIndex"
                            :page="paginationPageNumber"
                        >
                        </Paginator>
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
.no-item-warning {
    text-align: center;
    padding: 15vh 0px;
}
</style>
