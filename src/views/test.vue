<template>
    <div id="app">
        <p-card title="Sales Data">
            <p-chart type="line" :data="datacollection"></p-chart>
        </p-card>
    </div>
</template>
  
<script>
import { Line } from 'vue-chartjs'
import { Card } from 'primevue/card'
import { Chart } from 'primevue/chart'

export default {
    name: 'App',
    components: {
        'p-card': Card,
        'p-chart': Chart
    },
    data() {
        return {
            datacollection: {
                labels: ['January', 'February', 'March', 'April', 'May'],
                datasets: [
                    {
                        label: 'Sales',
                        backgroundColor: '#f87979',
                        data: [40, 39, 10, 40, 39, 80, 40]
                    }
                ]
            }
        }
    },
    mounted() {
        this.renderChart(this.datacollection)
    }
}
</script>
  
<style>
@import url("https://unpkg.com/primevue/resources/themes/saga-blue/theme.css");
@import url("https://unpkg.com/primevue/resources/primevue.min.css");
@import url("https://unpkg.com/primeicons/primeicons.css");
</style>
  