<template>
    <div id="Home" class="flex flex-col h-screen">
        <div class="m-3 mb-auto">
            <div class="grid grid-cols-2 gap-3 my-3">
                <ServiceSelectLarge text="Ride" imageWidth="74" image="ride" />
            </div>
        </div>
    </div>
</template>

<script setup>
import ServiceSelectLarge from "@/components/ServiceSelectLarge.vue";
</script>
