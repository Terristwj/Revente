<script>
export default {
    props: {
        deliverydate: {
            type: String,
            required: true
        },
        imgUrl: {
            type: String,
            required: true,
        },
        brand: {
            type: String,
            required: false,
        },
        size: {
            type: String,
            required: true,
        },
        seller: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },

    },
    events: [],
    data() {
        return {
            // key: value
        }
    }, // data
    
    methods: {
        methodName() {
            
        }
    }, // methods;
    
    watch: {

    },

    computed: {

    }
    // component must be declared before app.mount(...)
};
</script>


<template>
    <div class="row m-1 p-5">
        <div class="col col-auto justify-content-center">
            <img :src="imgUrl" :alt="name" class="itemImg"/>
        </div>
        <div class="col col-auto justify-content-center">
            <p class="deliveryDate">DELIVERED ON {{deliverydate}}</p>
            <p class="itemName">{{name}}</p>
            <p class="brandName">{{brand}}</p>
            <p class="size">Size: {{size}}</p>
            <p class="seller">Seller: {{seller}}</p>
        </div>
    </div>
</template>

<style>
p {
    font-size: 14px;
}

.deliveryDate {
    font-family: 'inter-light';
    font-style: italic;
    text-transform: uppercase;
    padding-top: 5px;
}

.itemName {
    font-family: 'inter-bold';
    font-size: 16px;
}

.brandName {
    font-family: 'inter-regular';
}

.seller {
    font-family: 'inter-regular';
    text-decoration: underline;
}

.itemImg {
    width: auto;
    max-width: 167px;
    max-height: 200px;
    object-fit: cover;
    float: left;
    margin-right: 1rem;
}

</style>