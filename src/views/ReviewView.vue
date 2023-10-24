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

			};
	},

    methods: {
			methodName() {
				
			}
    } 
    };
</script>

<template>
	<body>
		<!--BELOW IS THE HEADER-->
		<h2 class="m-5 mb-4">Leave a Review</h2>

		<!--BELOW IS THE ITEM DETAIL-->
		<div class="container-fluid">
			<ReviewItem
			:deliverydate="item.deliverydate"
			:imgUrl="item.imgUrl"
			:brand="item.brand"
			:size="item.size"
			:seller="item.seller"
			:name="item.name"
			/>
		</div>

		<!--BELOW IS THE REVIEWING PORTION-->
		<RatingItem v-model="rating"/>

	</body>
</template>

<style scoped>

</style>