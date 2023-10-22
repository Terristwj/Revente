<script>
import CollapsibleSidebar from "../components/CollapsibleSidebar.vue";
export default {
    components: {
        CollapsibleSidebar,
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

        }
    }
};
</script>

<template>
    <body>
        <CollapsibleSidebar 
        :cSidebar="cSidebar"
        :open="cSidebar.open"
        @toggleOpen="toggleOpen"
        />
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
