<template class="login-view">
    <login-section />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// import SliderSection from '../components/SliderComponents/SliderSection.vue'
import LoginSection from '../components/LoginComponents/LoginSection.vue'

export default defineComponent({
    name: 'HomeView',
    components: {
        // SliderSection,
        LoginSection,
    },
})
</script>