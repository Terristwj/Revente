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
    <div class="row p-5">

        <div class="col col-sm-8 col-md-9 col-lg-9 col-xxl-9">
            <div class="col col-auto justify-content-center">
                <img :src="imgUrl" :alt="name" class="itemImg"/>
            </div>
            <div class="col col-auto justify-content-center px-4">
                <p class="deliveryDate">DELIVERED ON {{deliverydate}}</p>
                <p class="itemName">{{name}}</p>
                <p class="brandName">{{brand}}</p>
                <p class="size">Size: {{size}}</p>
                <p>Seller: <a href="#" class="sellerLink">{{seller}}</a></p>
            </div>
        </div>
    </div>
</template>

<style>
p {
    font-size: 14px;
    font-family: 'inter-regular';
}

.deliveryDate {
    font-family: 'inter-light';
    font-style: italic;
    text-transform: uppercase;
    font-size: 16px;
}

.itemName {
    font-family: 'inter-bold';
    font-size: 16px;
}

.brandName {
    font-family: 'inter-regular';
}

.itemImg {
    width: auto;
    max-width: 167px;
    max-height: 200px;
    object-fit: cover;
    float: left;
    margin-right: 3rem;

}

.sellerLink {
    text-decoration: underline;
    color: black;
    font-size: 14px;
    font-family: 'inter-regular';
}

</style>