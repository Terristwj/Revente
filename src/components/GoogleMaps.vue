<template>
    <div>
        <p class="lead">Please enter your location and we will show the nearby drop off locations:</p>
        <GoogleAddressAutocomplete :apiKey="apiKey" v-model="address" @callback="callbackFunction" class="form-control"
            placeholder="address" />
        <div id="map">
            <GoogleMap :api-key="apiKey" style="width: 100%; height: 500px" :center="{ lat: lat, lng: lng }" :zoom="15">
                <GoogleMarker :options="{ position: { lat: lat, lng: lng } }" />
                <GoogleMarker :options="{ position: { lat: lat + 0.0001, lng: lng } }" />
            </GoogleMap>
        </div>
    </div>
</template>
<script>

import { GoogleMap, Marker as GoogleMarker } from "vue3-google-map";
import GoogleAddressAutocomplete from 'vue3-google-address-autocomplete'
export default {
    components: {
        GoogleMap,
        GoogleMarker,
        GoogleAddressAutocomplete,
    },
    data() {
        return {
            lat: null,
            lng: null,
            apiKey: "AIzaSyApnpHM07gLONvFhRdgZRKDmEYoP3w1mOo",
            address: "",
        };
    },
    created() {
        this.$getLocation()
            .then((coordinates) => {
                console.log(coordinates);
                this.lat = coordinates.lat;
                this.lng = coordinates.lng;
            }).catch((error) => {
                console.log(error);
            });
    },
    methods: {
        callbackFunction(place) {
            this.lat = place.geometry.location.lat();
            this.lng = place.geometry.location.lng();
        }
    }
}
</script>

<style scoped>
#map {
    height: 100%;
    padding-top: 1rem;
    padding-bottom: 1rem;
}
</style>