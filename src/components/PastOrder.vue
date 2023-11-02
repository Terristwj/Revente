<script>
export default {
    props: {
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
        product_id: {
            type: String,
            required: true,
        },
        review_desc: {
            type: String,
            required: true,
        },
        reviewed: {
            type: Boolean,
            required: true,
        },
    },
    data() {
        return {
            // key: value
        };
    }, // data

    methods: {
        parseDataToReviewPage() {
            // validate inputs
            // console.log(this.deliverydate)
            let dataObject = {
                imgUrl: this.imgUrl,
                brand: this.brand,
                size: this.size,
                seller: this.seller,
                name: this.name,
                product_id: this.product_id,
            }

            this.$router.push({
                path: `reviewview/`,
                query: { data: JSON.stringify(dataObject) }
            })
        },


    },// methods;
    // component must be declared before app.mount(...)
};
</script>


<template>
    <div class="row mb-5">
        <div class="col-md-2 col-xl-3 ">
            
        </div>
        <div class="col-xl-3 col-md-4">
            <img :src="imgUrl" alt="generic profile picture" class="img-thumbnail mt-4 mb-2"
                style="width: 75%; z-index: 1" />
        </div>
        <div class="col-xl-3 col-md-4">
            <p class="deliveryDate">DELIVERED</p>
            <p class="itemName">{{ name }}</p>
            <p class="brandName">{{ brand }}</p>
            <p class="size">Size: {{ size }}</p>
            <p>Seller: <a href="#" class="sellerLink">{{ seller }}</a></p>
            <div class="buttonLoc">
                <button id="reviewButton" @click="parseDataToReviewPage()" class="reviewButton" :disabled="this.reviewed">
                    Leave a Review
                </button>
            </div>
        </div>
        <div class="col-md-2 col-xl-3 ">
            
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

/* .buttonLoc {
    display: flex;
    white-space: nowrap;
    align-items: start;
    width: 100%;
    height: 100%;
} */

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