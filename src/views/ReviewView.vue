<script>
import ReviewItem from "../components/ReviewItem.vue";
import vue3starRatings from "vue3-star-ratings";
import FBInstanceFirestore from "../services/Firebase/FirestoreDatabase.js";
import FBInstanceStorage from "../services/Firebase/FirebaseStorage.js";
import { userStore } from "../main.js";
import { useReviewStore } from '../main.js';

export default {
    components: {
        ReviewItem,
        vue3starRatings,
    },
    data() {
        return {
            //obtain data from Order History
            //dataObject = {deliverydate,imgUrl,brand,size, seller, name, uuid}
            productID: this.$route.params.productID,
            productData: null,

            //obtain data from review inputs
            review: {
                rating: 0,
                textinput: "",
            },

            //item image
            imageSrc: null,
            // Firebase-Related Codes
            isLoading: false,
            firstError: "",
            isSuccessful: false,
        };
    },

    created() {
        // Fetch product data based on the product ID
        this.fetchProductData();

        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    },

    methods: {
        // this takes the data from Firestore based on Product ID
        async fetchProductData() {
            try {
                // Fetch product data from Firestore based on product ID
                this.productData = await FBInstanceFirestore.getProduct(this.productID);
            } catch (error) {
                console.error("Error fetching product data:", error);
            }
        },
        
        onFileChange(event) {
            if (event.target.files.length > 0) {
                this.imageFile = event.target.files[0];
                this.imageSrc = URL.createObjectURL(this.imageFile);
            }
        },



        //Firebase-Related Codes
        submitForm() {
            // If there are no errors, submit the form
            if (this.isEverythingValid) {
                console.log(this.review.rating);
                console.log(this.review.textinput);
                FBInstanceFirestore.getProduct(this.item.product_id).then((data) => {
                    console.log(data);
                    FBInstanceFirestore.updateReviewAndRating(
                        // Seller and Product
                        data.seller_ID,
                        data.product_ID,

                        // Product Details
                        data.product_name,
                        data.brand,
                        data.description,

                        // Category
                        data.gender,
                        data.category,

                        // Condition
                        data.condition,
                        data.condition_notes,

                        // Others
                        data.drop_off_location,
                        data.price,
                        data.modifiedPrice,
                        data.size,
                        data.image_src,
                        // Status
                        data.is_approved,
                        data.is_bought,

                        // Review Details
                        data.buyer_ID,
                        this.review.textinput,
                        this.review.rating
                    )
                });
            }

        },



        //Firebase related methods
        async doSubmitForm() {
            if (this.isEverythingValid()) {
                await this.firebaseAddItem();

                // Update the reviewSubmitted property in the store
                const reviewStore = useReviewStore();
                reviewStore.setReviewSubmitted(true);

                // Emit the 'review-submitted' event here
                this.$emit('review-submitted');
            } else {
                this.showToastError(this.firstError);
            }
        },

        isEverythingValid() {
            // Validate form fields
            this.firstError = "";

            if (!this.review.textinput) {
                this.review.textinput =
                    "Please tell us more about the condition.";
                return false;
            }

            if (!this.review.rating) {
                this.firstError = "Give your ratings, where 5 stars indicate that the clothing you purchased is excellent.";
                return false;
            }

            return true;
        },

        async firebaseAddItem() {
            let hasError = false;

            // (1) Add doc into Firestore
            //dataObject = {deliverydate,imgUrl,brand,size, seller, name, uuid}
            let rating = this.review.rating;
            let review = this.review.textinput;

            // (2) Retrieve the product_ID of add_doc
            const reviewID = await FBInstanceFirestore.createReview(
                // Seller and Product details
                userStore.getUserID(),
                userStore.getOrderedProductID(),

                // Review Details
                rating,
                review
            );

            // (3) Upload item_image_file into Storage using product_ID
            // Upload image
            hasError = await FBInstanceStorage.uploadImage(
                "reviews",
                reviewID,
                this.imageSrc
            );

            if (hasError) {
        this.firstError = "Please try again later.";
        } else {
        const url = await FBInstanceStorage.getImageUrl("reviews", reviewID);
        if (!url) {
            this.firstError = "Please try again later.";
        } else {
            let errorCode = await FBInstanceFirestore.updateProductImageSrc(
                userStore.getUserID(),
                userStore.getOrderedProductID(),
                rating,
                review,
                url
            );
            switch (errorCode) {
            default:
                this.firstError = errorCode;
            }
        }
        }
        if (this.firstError) {
            this.showToastError(this.firstError);
        } else {
            this.showToastSuccess();
            this.isSuccessful = true;
            this.imageSrc = "";
        }
    },
    showToastError(detail) {
        this.$toast.add({
            severity: "error",
            summary: "ReviewFailed",
            detail,
            life: 3000,
        });
    },
    showToastSuccess() {
        this.$toast.add({
            severity: "success",
            summary: "Your Review was Successfully created!",
            life: 3000,
        });
    },
    clearPage() {
        this.imageSrc = "";
        this.review.rating = 0;
        this.review.textinput = 0;
        this.isSuccessful = false;
    },
    created() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        // console.log(this.item);
    },
};
</script>

<template>
    <body>
        <!--BELOW IS THE TITLE-->
        <h2 class="m-5 mb-4">Leave a Review</h2>

        <!--BELOW IS THE ITEM DETAIL-->
        <div class="container-fluid itemContainer">
            <ReviewItem :deliverydate="item.deliverydate" :imgUrl="item.imgUrl" :brand="item.brand" :size="item.size"
                :seller="item.seller" :name="item.name" :uuid="item.uuid" />
        </div>

        <!--BELOW IS THE REVIEWING PORTION-->
        <div class="container ratingPortion">
            <h4>Rating</h4>
            <div>
                <vue3starRatings v-model="review.rating" :starSize="'32'" starColor="#ff9800" inactiveColor="#333333"
                    :numberOfStars="5" :disableClick="false" />
            </div>
        </div>

        <div class="container reviewPortion">
            <div class="row">
                <h4>Review</h4>
            </div>

            <div class="row reviewInput">
                <textarea v-model="review.textinput" placeholder="add multiple lines"></textarea>
            </div>
        </div>

        <div class="container uploadPhoto">
            <h4>Upload Photo</h4>

            <div>
                <div class="photoPortion">
                    <img :src="imageSrc" class="uploading-image" id="file-upload" />
                    <input type="file" accept="image/png, image/jpeg" @change="onFileChange($event)" />
                </div>
            </div>
        </div>

        <button class="submit" @click="submitForm()">SUBMIT</button>
    </body>

    <!-- Successful Followup -->
    <Dialog v-model:visible="isSuccessful" class="text-black" style="width: 80vw; max-width: 800px"
        :breakpoints="{ '960px': '75vw', '641px': '100vw' }" modal :closable="false">
        <template #header>
            <h5>
                <span class="bg-black text-white py-1 px-2 fw-bold">Your Review for {{ item.name }}</span>
                &nbsp;is successfully uploaded!
            </h5>

            <div>
                <button @click="$router.push('/orderhistory')">Back to Order History</button>
            </div>
        </template>
    </Dialog>
</template>

<style scoped>
h4 {
    font-family: "inter-bold";
    color: black;
}

h2 {
    font-family: "inter-bold";
    color: black;
}

.itemContainer {
    border-bottom: 1px solid grey;
}

.ratingPortion {
    margin: 40px;
}

.reviewPortion {
    margin: 40px;
}

.reviewInput {
    white-space: pre-wrap;
}

textarea {
    height: 200px;
    max-width: 700px;
    margin-left: 15px;
}

.uploading-image {
    display: flex;
    max-height: 200px;
    width: auto;
}

.photoPortion {
    margin-top: 30px;
    border: 0.5px solid grey;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 40px;
    padding-right: 40px;
    border-radius: 5px;
    max-width: 700px;
    display: flex;
}

.submit {
    background-color: black;
    padding: 8px;
    padding-left: 20px;
    padding-right: 20px;
    border-radius: 5px;
    width: 175px;
    border: 0.5px solid black;
    font-family: "inter-light";
    margin-right: 10px;
    position: relative;
    margin-left: 50px;
    margin-bottom: 50px;
    color: white;
}

.uploadPhoto {
    margin: 40px;
}
</style>
