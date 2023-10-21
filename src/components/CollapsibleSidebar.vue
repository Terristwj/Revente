<template>
    <div>
        <div :class="open ? 'cSidebar open' : 'cSidebar'">
            <h3 @click="$emit('toggleOpen')">Filter Here</h3>

            <div class="sidebarContent">
                <SideMenuBar style="color: black;"/>
            </div>
        </div>    
    
    </div>
</template>

<script>
import SideMenuBar from "../components/SideMenuBar.vue";

export default {
    name: "CollapsibleSidebar",
    props: ["cSidebar", "open"],
    components: {
        SideMenuBar,
    },
}
</script>

