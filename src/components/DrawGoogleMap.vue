<template>
    <div>
        <h2>Vue Js Google Maps with Multiple Markers Example</h2>

        <gmap-map :center="center" :zoom="10" style="width:100%;  height: 555px;">
            <gmap-marker :key="index" v-for="(gmp, index) in locations" :position="gmp" @click="center = gmp"></gmap-marker>
        </gmap-map>

    </div>
</template>
   
<script>
export default {
    name: "DrawGoogleMap",
    data() {
        return {
            center: {
                lat: 39.7837304,
                lng: -100.4458825
            },
            locations: [],
            currentLocation: null
        };
    },

    mounted() {
        this.setLocationLatLng();
    },

    methods: {
        setPlace(loc) {
            this.currentLocation = loc;
        },
        setLocationLatLng: function () {
            navigator.geolocation.getCurrentPosition(geolocation => {
                this.center = {
                    lat: geolocation.coords.latitude,
                    lng: geolocation.coords.longitude
                };
            });

            this.locations = [
                {
                    lat: 39.7837304,
                    lng: -100.4458825,
                    label: 'United States'
                },
                {
                    lat: 38.6529545,
                    lng: -90.2411166,
                    label: 'St. Louis'
                },
                {
                    lat: 41.3828939,
                    lng: 2.1774322,
                    label: 'Barcelona'
                },
                {
                    lat: -10.3333333,
                    lng: -53.2,
                    label: 'Brazil'
                }
            ];

        }
    }
};
</script>