<template>
    <div>
        <!-- call the auto complete -->
        <GoogleAddressAutocomplete :apiKey="apiKey" v-model="address" @callback="getAddressData" class="form-control"
            placeholder="address" />
        <div class="pt-1"></div>
        <!-- map -->
        <div id="map" style="width: 100%; height: 500px;"></div>
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
            dropOffLocation: null,
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

    // used geolocation to get the laptop location and centralise the map
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
                    const { Map, InfoWindow } = await google.maps.importLibrary("maps");
                    const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker");
                    const map = new Map(document.getElementById("map"), this.mapOptions);

                    const pinBackground = new PinElement({
                        background: "#FBBC04",
                    });

                    const marker = new AdvancedMarkerElement({
                        position: this.mapOptions.center,
                        map: map,
                        content: pinBackground.element,
                    });

                    const tourStops = [
                        {
                            position: { lat: 1.3516, lng: 103.8995 },
                            title: "Warehouse East",
                        },
                        {
                            position: { lat: 1.3368, lng: 103.6942 },
                            title: "Warehouse West",
                        },
                        {
                            position: { lat: 1.2815, lng: 103.8448 },
                            title: "Warehouse South",
                        },
                        {
                            position: { lat: 1.3667, lng: 103.8 },
                            title: "Warehouse North",
                        },
                        {
                            position: { lat: 1.3691, lng: 103.8454 },
                            title: "Warehouse Central",
                        },
                    ];

                    const infoWindow = new InfoWindow();
                    tourStops.forEach(({ position, title }, i) => {
                        const pin = new PinElement({
                            glyph: `${i + 1}`,
                        });
                        const marker = new AdvancedMarkerElement({
                            position,
                            map,
                            title: `${i + 1}. ${title}`,
                            content: pin.element,
                        });

                        marker.addListener("click", ({ domEvent, latLng }) => {
                            const { target } = domEvent;

                            infoWindow.close();
                            infoWindow.setContent(marker.title);
                            infoWindow.open(marker.map, marker);
                            this.dropOffLocation = marker.title;
                            console.log(this.dropOffLocation);
                            this.$emit("drop-Off", this.dropOffLocation);
                        });
                    });
                })
                    .catch((error) => {
                        console.log(error);
                    });
            });
    },

    methods: {

        // reload the map when we get the location
        getAddressData(place) {
            // const place = this.$refs.autocomplete.getPlace();
            // console.log(place);
            this.mapOptions.center.lat = place.geometry.location.lat();
            this.mapOptions.center.lng = place.geometry.location.lng();
            // console.log(this.mapOptions);

            const loader = new Loader({
                apiKey: this.apiKey,
                version: "weekly",
                libraries: ["places"],
            });

            loader.load().then(async () => {
                const { Map, InfoWindow } = await google.maps.importLibrary("maps");
                const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker");
                const map = new Map(document.getElementById("map"), this.mapOptions);

                // set marker a selected location

                const pinBackground = new PinElement({
                    background: "#FBBC04",
                });

                const marker = new AdvancedMarkerElement({
                    position: this.mapOptions.center,
                    map: map,
                    content: pinBackground.element,
                });

                const tourStops = [
                    {
                        position: { lat: 1.3516, lng: 103.8995 },
                        title: "Warehouse East",
                    },
                    {
                        position: { lat: 1.3368, lng: 103.6942 },
                        title: "Warehouse West",
                    },
                    {
                        position: { lat: 1.2815, lng: 103.8448 },
                        title: "Warehouse South",
                    },
                    {
                        position: { lat: 1.3667, lng: 103.8 },
                        title: "Warehouse North",
                    },
                    {
                        position: { lat: 1.3691, lng: 103.8454 },
                        title: "Warehouse Central",
                    },
                ];

                const infoWindow = new InfoWindow();
                tourStops.forEach(({ position, title }, i) => {
                    const pin = new PinElement({
                        glyph: `${i + 1}`,
                    });
                    const marker = new AdvancedMarkerElement({
                        position,
                        map,
                        title: `${i + 1}. ${title}`,
                        content: pin.element,
                    });

                    marker.addListener("click", ({ domEvent, latLng }) => {
                        const { target } = domEvent;

                        infoWindow.close();
                        infoWindow.setContent(marker.title);
                        infoWindow.open(marker.map, marker);
                        this.dropOffLocation = marker.title;
                        console.log(this.dropOffLocation);
                        this.$emit("Drop-Off", this.dropOffLocation);
                    });
                });
            })
                .catch((error) => {
                    console.log(error);
                });
        },
    },
}
</script>

<style scoped>
#map {
    height: 100%;
    padding: 1rem;
}
</style>