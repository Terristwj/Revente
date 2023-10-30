<script>
export default {
    props: {
        products: {
            type: Object,
            required: true,
        },
        imgDesc: {
            type: String,
            required: true,
        },
        carouId: {
            type: String,
            required: true,
        },
        interval: {
            type: Number,
            default: 5000,
        },
    },
    data() {
        return {
            carouIdStr: "#" + this.carouId,
        };
    },
    methods: {
        linkToMoreDetails(id) {
            this.$router.push({ name: "MainItem", query: { id: id } });
        },
    },
};
</script>

<template>
    <div
        :id="carouId"
        class="carousel slide"
        data-bs-ride="carousel"
        style="max-width: 100%"
    >
        <div class="carousel-indicators">
            <button
                v-for="(product, index) in products"
                :key="index"
                type="button"
                :data-bs-target="carouIdStr"
                :data-bs-slide-to="index"
                :class="{ active: index === 0 }"
                aria-current="true"
            ></button>
        </div>
        <div
            class="carousel-inner"
            style="max-height: 0; padding-bottom: 100%; position: relative"
        >
            <div
                v-for="(product, index) in products"
                :key="index"
                class="carousel-item"
                :class="{ active: index === 0 }"
                :data-bs-interval="interval"
                style="
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                "
            >
                <div
                    class="image-container"
                    style="width: 100%; height: 100%; overflow: hidden"
                >
                    <Image
                        class="card-img-top object-fit-cover w-100 img-thumbnail p-2"
                        alt="Image"
                        preview
                    >
                        <template #indicatoricon>
                            <i class="pi pi-search-plus"></i>
                        </template>
                        <template #image>
                            <img
                                style="width: 100%; aspect-ratio: 1 / 1"
                                :src="product.image_src"
                                alt="image"
                            />
                        </template>
                        <template #preview="slotProps">
                            <img
                                style="
                                    height: 75vh;
                                    width: 100%;
                                    aspect-ratio: 1 / 1;
                                "
                                :src="product.image_src"
                                alt="preview"
                                :style="slotProps.style"
                                @click="slotProps.onClick"
                            />
                            <button
                                type="button"
                                class="position-absolute bottom-0 start-0 btn btn-light w-100 py-3"
                                @click="linkToMoreDetails(product.product_ID)"
                            >
                                <span class="fw-bold">
                                    Go to Product Page
                                </span>
                            </button>
                        </template>
                    </Image>
                </div>
            </div>
        </div>
        <button
            class="carousel-control-prev"
            type="button"
            :data-bs-target="carouIdStr"
            data-bs-slide="prev"
        >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button
            class="carousel-control-next"
            type="button"
            :data-bs-target="carouIdStr"
            data-bs-slide="next"
        >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>
</template>
