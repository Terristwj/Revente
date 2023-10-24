<template>
    <div>
        <GoogleAddressAutocomplete :apiKey="apiKey" v-model="address" @callback="getAddressData" class="form-control"
            placeholder="address" />
        <div id="map" style="width: 100%; height: 500px"></div>
    </div>
</template>

<script>
import GoogleAddressAutocomplete from 'vue3-google-address-autocomplete';
import { Loader } from "@googlemaps/js-api-loader";

export default {
    components: {
        GoogleAddressAutocomplete,
    },
    data() {
        return {
            lat: null,
            lng: null,
            apiKey: "AIzaSyApnpHM07gLONvFhRdgZRKDmEYoP3w1mOo",
            mapOptions: {
                center: {
                    lat: 0,
                    lng: 0,
                },
                zoom: 15,
                scrollwheel: false,
                mapId: 1,
            },
        };
    },
    created() {
        this.$getLocation()
            .then((coordinates) => {
                console.log(coordinates);
                this.mapOptions.center.lat = coordinates.lat;
                this.mapOptions.center.lng = coordinates.lng;
                const loader = new Loader({
                    apiKey: this.apiKey,
                    version: "weekly",
                    libraries: ["places"],
                });

                loader.load().then(async () => {
                    const { Map } = await google.maps.importLibrary("maps");
                    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
                    const map = new Map(document.getElementById("map"), this.mapOptions);
                    const marker = new AdvancedMarkerElement({
                        position: { lat: 1.296568, lng: 103.852119 },
                        map: map,
                    });
                });
            })
            .catch((error) => {
                console.log(error);
            });
    },
    methods: {
        getAddressData(place) {
            // const place = this.$refs.autocomplete.getPlace();
            // console.log(place);
            this.mapOptions.center.lat = place.geometry.location.lat();
            this.mapOptions.center.lng = place.geometry.location.lng();
            console.log(this.mapOptions);

            const loader = new Loader({
                apiKey: this.apiKey,
                version: "weekly",
                libraries: ["places"],
            });

            loader.load().then(async () => {
                const { Map } = await google.maps.importLibrary("maps");
                const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
                const map = new Map(document.getElementById("map"), this.mapOptions);
                const marker = new AdvancedMarkerElement({
                    position: { lat: 1.296568, lng: 103.852119 },
                    map: map,
                });
            });
        },
    },
};
</script>