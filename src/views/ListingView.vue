<script>
import CollapsibleSidebar from "../components/CollapsibleSidebar.vue";
import ItemCard from '../components/ItemCard.vue';
export default {
    components: {
        CollapsibleSidebar,
        ItemCard,
    },
    data () {
        return {
            cSidebar: [
                {
                    open: false,
                },
            ]
        }
    },
    methods: {
        toggleOpen: function () {
            this.cSidebar.open = !this.cSidebar.open;
        },

        sidebarOpen: function () {
            if (this.cSidebar.open == true) {
                return true
            } else {
                return false
            }
        },
    }
};
</script>

<template>
    <body>
        <div class="container-fluid">
            <div :class="sidebarOpen() ? 'row flex' : 'col col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-3'">
                <div :class="sidebarOpen()? 'col col-md-3 col-lg-3 col-sm-3 col-xxl-3' : ''">
                    <CollapsibleSidebar 
                    :cSidebar="cSidebar"
                    :open="cSidebar.open"
                    @toggleOpen="toggleOpen"
                    />
                </div>

                <div :class="sidebarOpen() ? 'col col-xxl-9 col-xl-9 col-lg-9 col-md-9 col-sm-9' : 'row flex'">
                    <div class="container-fluid">
                        <div class="row listings shadow-sm p-3 mb-5 bg-white rounded">
                            <h2 class="text-center">Current Listings</h2>
                            <div class="col-xxl-3 col-xl-4 col-lg-4 col-md-6 col pb-2 list-item">
                                <ItemCard />
                            </div>
                            <div class="col-xxl-3 col-xl-4 col-lg-4 col-md-6 col pb-2 list-item">
                                <ItemCard />
                            </div>
                            <div class="col-xxl-3 col-xl-4 col-lg-4 col-md-6 col pb-2 list-item">
                                <ItemCard />
                            </div>
                            <div class="col-xxl-3 col-xl-4 col-lg-4 col-md-6 col pb-2 list-item">
                                <ItemCard />
                            </div>
                            <div class="col-xxl-3 col-xl-4 col-lg-4 col-md-6 col pb-2 list-item">
                                <ItemCard />
                            </div>
                            <div class="col-xxl-3 col-xl-4 col-lg-4 col-md-6 col pb-2 list-item">
                                <ItemCard />
                            </div>
            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
</template>

<style scoped></style>
