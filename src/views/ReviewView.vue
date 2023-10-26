<script>
import ReviewItem from "../components/ReviewItem.vue";
import vue3starRatings from "vue3-star-ratings";
import FBInstanceFirestore from "../services/Firebase/FirestoreDatabase.js";
import FBInstanceStorage from "../services/Firebase/FirebaseStorage.js";
export default {
    components: {
			ReviewItem,
			vue3starRatings,
	},
    data() { 
		return { 
		// key: value
			item: JSON.parse(this.$route.query.data),
			review: {
				rating: 4.5,
				textinput: "",
			},
			imageSrc: null,
			};
	},

    methods: {
        onFileChange(event) {
            if (event.target.files.length > 0) {
                this.imageFile = event.target.files[0];
                this.imageSrc = URL.createObjectURL(this.imageFile);
            }
		},
    },
    };
</script>

<template>
	<body>
		<!--BELOW IS THE HEADER-->
		<h2 class="m-5 mb-4">Leave a Review</h2>

		<!--BELOW IS THE ITEM DETAIL-->
		<div class="container-fluid itemContainer">
			<ReviewItem
			:deliverydate="item.deliverydate"
			:imgUrl="item.imgUrl"
			:brand="item.brand"
			:size="item.size"
			:seller="item.seller"
			:name="item.name"
			:uuid="item.uuid"
			/>
		</div>

		<!--BELOW IS THE REVIEWING PORTION-->
		<div class="container ratingPortion">
			<h4>Rating</h4>
			<div>
				<vue3starRatings
				v-model="review.rating"
				:starSize="'32'"
				starColor="#ff9800"
				inactiveColor="#333333"
				:numberOfStars="5"
				:disableClick="false" 
			/>
			</div>
		</div>

		<div class="container reviewPortion">
			<div class="row">
				<h4>Review</h4>
			</div>

			<div class="row reviewInput">
				<p>{{ review.textinput }}</p>
				<textarea v-model="review.textinput" placeholder="add multiple lines"></textarea>
			</div>
		</div>

		<div class="container uploadPhoto">
			<h4>Upload Photo <span class="optional"> (Optional) </span></h4>
			
			<div>
				<div class="photoPortion">
					<img :src="imageSrc" class="uploading-image"/>
					<input type="file" accept="image/png, image/jpeg" @change="onFileChange($event)">
				</div>
			</div>
		</div>

		<button class="submit">
			SUBMIT
		</button>

	</body>
</template>

<style scoped>

h3 {
	font-family: "inter-bold";
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

.optional {
	font-style: italic;
}

.uploading-image{
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
    font-family: 'inter-light';
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