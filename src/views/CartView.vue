<script>
import CartItem from '../components/CartItem.vue';
import CheckoutBar from '../components/CheckoutBar.vue';
import FBInstanceFirestore from "../services/Firebase/FirestoreDatabase.js";
import { userStore } from "../main.js";
export default {
	data() {
		return {
			cart: [],
			userID: '',
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
				total += this.cart[i].modifiedPrice;
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
		async getProductData() {
			FBInstanceFirestore.getAllProducts()
				.then((data) => {
					for (let i = 0; i < data.length; i++) {
						if (data[i].user_ID === this.user_ID && data[i].addToCart === true) {
							let sellerName = FBInstanceFirestore.getUser(data[i].seller_ID);
							sellerName
								.then((name) => {
									// Use the data here
									data[i].seller_name = name.first_name;
									this.cart.push(data[i]);
									console.log(data[i].seller_name);
								})
								.catch((error) => {
									// Handle any errors that might occur
									console.error(error);
								});						
						}
					}

				})
				.catch((error) => {
					// Handle any errors that occur during the promise execution
					console.error(error);
				});
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
	created() {
		setTimeout(() => {
			this.getProductData();
			this.isLoading = false;
			this.user_ID = userStore.getUserID();
		}, 1000);

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
				<button class="btn btn-outline-dark me-md-2 px-md-5" type="button">
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
					<CartItem v-for="(item, index) in cart" :key="index" :name="item.name" :price="item.modifiedPrice"
						:size="item.size" :brand="item.brand" :seller="item.seller_name" :imgUrl="item.image_src"
						:class="cartItemStyle(index)" :itemID="item.product_ID"/>
				</div>
				<div class="col-lg-4">
					<CheckoutBar :totalOriginal="cartTotal" :total="cartTotal" :itemCount="cart.length" />
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
