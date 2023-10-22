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
            <div class="row">
                <div :class="sidebarOpen()? 'col col-md-3 col-lg-3 col-sm-3 col-xxl-3' : ''">
                    <CollapsibleSidebar 
                    :cSidebar="cSidebar"
                    :open="cSidebar.open"
                    @toggleOpen="toggleOpen"
                    />
                </div>

                <div :class="sidebarOpen() ? 'col col-xxl-9 col-xl-9 col-lg-9 col-md-9 col-sm-9' : ''">
                    <div class="container-fluid">
                        <div class="row listings shadow-sm p-3 mb-5 bg-white rounded">
                            <h2 class="text-center">Current Listings</h2>
                            <div class="col col-xxl-3 col-xl-3 col-lg-3 col-md-3 pb-2 list-item">
                                <ItemCard />
                            </div>
                            <div class="col col-xxl-3 col-xl-3 col-lg-3 col-md-3 pb-2 list-item">
                                <ItemCard />
                            </div>
                            <div class="col col-xxl-3 col-xl-3 col-lg-3 col-md-3 pb-2 list-item">
                                <ItemCard />
                            </div>
                            <div class="col col-xxl-3 col-xl-3 col-lg-3 col-md-3 pb-2 list-item">
                                <ItemCard />
                            </div>
                            <div class="col col-xxl-3 col-xl-3 col-lg-3 col-md-3 pb-2 list-item">
                                <ItemCard />
                            </div>
                            <div class="col col-xxl-3 col-xl-3 col-lg-3 col-md-3 pb-2 list-item">
                                <ItemCard />
                            </div>
            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
</template>

<style>

CollapsibleSideBar {
    display: flex;
}
.cSidebar {
    justify-content: center;
    margin: 15px auto;
    margin-left: 15px;
    width: 200px;
    height: 50px;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    padding: 15px;
    background-color: white;
    align-items: center;
    display: inline-block;
}

.cSidebar h3 {
    font-size: 18px;
    margin: 0px;
    padding-left: 5px;
    font-weight: 400;
    font-family: 'inter-regular';
    color: black;
    text-align: left;
    text-transform: uppercase;
    position: relative;
    transition: all 0.4s linear; 
}

.cSidebar h3::after {
    content: '';

    position: absolute;
    top: 50%;
    right: 0px;
    transform: translateY(-50%) rotate(-180deg);

    width: 20px;
    height: 20px;

    background-image: url('../assets/angle-up-solid.svg');
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
}

.cSidebar .sidebarContent {
    color: white;
    opacity: 0;
    max-height: 0px;
    overflow-y: hidden;
    transition:  all 0.4s ease out;
}

.cSidebar.open {
    width: 300px;
    transition: all 0.2s linear;
}

.cSidebar.open h3 {
    margin-bottom: 40px;
}

.cSidebar.open h3::after {
    transform:translateY(-50%) rotate(0deg);
}

.cSidebar.open .sidebarContent {
    opacity: 1;
    max-height: 1000px;
}

</style>
