<script>
	import CartItem from '../components/CartItem.vue';
	import CheckoutBar from '../components/CheckoutBar.vue';
	export default {
		data() {
			return {
				cart: [
					{
						name: "Mens's Jeans",
						price: 10,
						size: 'M',
						brand: 'Unbranded',
						seller: 'John Doe',
						imgUrl: '/src/assets/img/ecommerce/Google.png',
					},
					{
						name: "Mens's Jeans",
						price: 10,
						size: 'M',
						brand: 'Unbranded',
						seller: 'John Doe',
						imgUrl: '/src/assets/img/ecommerce/Google.png',
					},
				],
			};
		},
		computed: {
			cartContent() {
				if (this.cart.length === 0) {
					return false;
				} else {
					return this.cart.length;
				}
			},
			cartTotal() {
				let total = 0;
				for (let i = 0; i < this.cart.length; i++) {
					total += this.cart[i].price;
				}
				return total;
			},
		},
		methods: {
			cartItemStyle(index) {
				let styling = '';
				if (index === this.cart.length - 1) {
					styling += 'mb-5';
				}
				if (index === 0) {
					styling += ' mt-0';
				} else {
					styling += ' mt-5';
				}
				return styling;
			},
		},
		components: {
			CartItem,
			CheckoutBar,
		},
		mounted() {
			// When enter from About page - START
			if (sessionStorage.getItem('toReload')) {
				sessionStorage.removeItem('toReload');
				location.reload();
			}
			// When enter from About page - END
		},
	};
</script>

<template>
	<div class="container">
		<h1 class="my-5">
			Shopping Cart <span v-if="cartContent">({{ cartContent }})</span>
		</h1>
		<div v-if="!cartContent">
			<h3>Your Shopping Cart is empty.</h3>
			<p>
				Browse through our categories for inspiration and add something
				you like.
			</p>
			<br />
			<div class="d-grid gap-2 d-md-flex justify-content-md-start">
				<button
					class="btn btn-outline-dark me-md-2 px-md-5"
					type="button"
				>
					NEW ARRIVALS
				</button>
				<button class="btn btn-outline-dark px-md-5" type="button">
					TRENDING
				</button>
			</div>
		</div>
		<div class="cart-section">
			<div class="row">
				<div class="col-lg-8">
					<CartItem
						v-for="(item, index) in cart"
						:key="index"
						:name="item.name"
						:price="item.price"
						:size="item.size"
						:brand="item.brand"
						:seller="item.seller"
						:imgUrl="item.imgUrl"
						:class="cartItemStyle(index)"
					/>
				</div>
				<div class="col-lg-4">
					<CheckoutBar
						:totalOriginal="cartTotal"
						:total="cartTotal"
						:itemCount="cart.length"
					/>
				</div>
			</div>
		</div>
		<div class="section">
			<h3>Recently Viewed</h3>
		</div>
		<div class="section">
			<h3>Recommended For You</h3>
		</div>
	</div>
</template>

<style scoped>
	.section {
		margin-top: 50px;
	}
</style>
