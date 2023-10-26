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
            uuid: crypto.randomUUID()
        };
    }, // data
    
    methods: {
        parseDataToReviewPage() {
            // validate inputs
            // console.log(this.deliverydate)
            let dataObject = {
                dd: this.deliverydate,
                imgUrl: this.imgUrl,
                brand: this.brand,
                size: this.size,
                seller: this.seller,
                name: this.name,
                uuid: this.uuid
            }

            this.$router.push({
                path: `reviewview/${this.uuid}`,
                query: {data: JSON.stringify(dataObject)}
            })
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

        <div class="col col-sm-4 col-md-3 col-lg-3 col-xxl-3 p-0 wrap">
            <!--this is for the router button-->
            <div class="buttonLoc">
                <button 
                @click="parseDataToReviewPage()"                 
                class="reviewButton"
                >
                Leave a Review
                </button>
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

.buttonLoc {
    display: flex;
    white-space: nowrap;
    align-items: start;
    width: 100%;
    height: 100%;
}

.reviewButton {
    background-color: white;
    padding: 8px;
    padding-left: 20px;
    padding-right: 20px; 
    border-radius: 5px;
    border: 0.5px solid black;
    font-family: 'inter-light';
    margin-right: 10px;
}

</style>