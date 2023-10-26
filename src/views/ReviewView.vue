<script>
import ReviewItem from "../components/ReviewItem.vue";
import RatingItem from "../components/RatingItem.vue";
export default {
    components: {
			ReviewItem,
			RatingItem,
	},
    data() { 
			return { 
		// key: value
			item: JSON.parse(this.$route.query.data),
			review: {
				rating: "",
				textinput: "",
				id: this.uuid,
			},
			previewImage: null,
			imageUploaded: false,
			};
	},

    methods: {
		uploadImage(e){
			const image = e.target.files[0];
			const reader = new FileReader();
			this.imageUploaded = true;
			reader.readAsDataURL(image);
			reader.onload = e =>{
				this.previewImage = e.target.result;
				console.log(this.previewImage);
			};

		},
    } 
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
			<RatingItem v-model="review.rating"/>
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

		<div class="container photoPortion">
			<h4>Upload Photo <span class="optional"> (Optional) </span></h4>
			<div class="photoPortion">
				<img v-if="imageUploaded" src="previewImage" class="uploading-image"/>
				<input type="file" accept="image/jpeg" @change="uploadImage(e)">
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
	display:flex;
}

.photoPortion {
	margin: 40px;
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

</style>