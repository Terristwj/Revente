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
		},
	};
</script>

<template>
	<img :src="imgUrl" :alt="itemName" class="cart-img" />
	<div class="align-items-center justify-content-center">
		<h6 class="mb-3">{{ name }}</h6>
		<p>{{ brand }}</p>
		<p>Size: {{ size }}</p>
		<p>
			Seller: <a href="#" class="seller-link">{{ seller }}</a>
		</p>
		<div class="mt-4">
			<button class="btn btn-outline-dark me-sm-2">
				<font-awesome-icon :icon="['far', 'heart']" />
				Add to Wishlist
			</button>
			<button class="btn btn-outline-dark ms-sm-2">
				<font-awesome-icon :icon="['far', 'trash-can']" /> Remove
			</button>
		</div>
	</div>
</template>

<style scoped>
	p {
		line-height: 90%;
	}
	.cart-img {
		width: 167px;
		height: 190px;
		object-fit: cover;
		float: left;
		border: 1px solid black;
		margin-right: 1rem;
	}
	.seller-link {
		color: var(--bs-dark);
	}
</style>
