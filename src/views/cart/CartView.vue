<script>
import CartItem from '../../components/CartItem.vue';
import CheckoutBar from '../../components/CheckoutBar.vue';
import FBInstanceFirestore from "../../services/Firebase/FirestoreDatabase.js";
import { userStore } from "../../main.js";
import { shoppingCart } from "../../main.js";
import { recents } from "../../main.js";
import SmallCarousel from '../../components/SmallCarousel.vue';
import router from "../../router/router.js";

export default {
	data() {
		return {
			cart: [],
			userID: '',
			generalSize: [],
			recentProducts: [],
			reccomendedProducts: [],
			category: {},
			popularCategory: '',

			// get the priceInCents and the name of product from the cart
			changedCart: [],

			// get the product ids of cartItems
			cartItems: [],
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
			return total.toFixed(2);
		},
	},
	methods: {
		getCartDetails() {
			FBInstanceFirestore.getAllProducts().then((data) => {
				// console.log(data);
				console.log(shoppingCart.getCart());
				data.forEach((item) => {
					if (shoppingCart.getCart().includes(item.product_ID) && item.is_bought == false) {
						var obj = {};
						for (var prop in item) {
							if (prop == "product_name") {
								obj["name"] = item[prop];
								console.log(obj["name"]);
							}
							if (prop == "modifiedPrice") {
								obj["priceInCents"] = item[prop] * 100;
								console.log(obj["priceInCents"]);
							}

						}
						this.changedCart.push(obj);
						this.cartItems.push(item.product_ID);
					}
				})
				console.log(this.changedCart);
				console.log(this.cartItems);

			})
		},
		toListing() {
			router.push("/listings");
		},
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
					this.generalSize = [];
					console.log(data);
					for (let i = 0; i < data.length; i++) {
						if (shoppingCart.getCart().includes(data[i].product_ID) && data[i].is_bought == false) {
							let size = data[i].size;
							let sellerName = FBInstanceFirestore.getUser(data[i].seller_ID);
							sellerName
								.then((name) => {
									// Use the data here
									data[i].seller_name = name.first_name;
									this.cart.push(data[i]);
									console.log(this.cart);

								}
								)
								.catch((error) => {
									// Handle any errors that might occur
									console.error(error);
								});

							const parts = size.split(' ');
							// Initialize the length
							let length = 0;

							// Iterate through the parts to extract the length
							for (let i = 0; i < parts.length; i++) {
								const part = parts[i];
								if (part === "Length:") {
									length = parseFloat(parts[i + 1]);
									break; // Exit the loop once length is found
								}
							}
							if (length >= 120) {
								this.generalSize.push("Large");
							} else if (length >= 100) {
								this.generalSize.push("Medium");
							}
							else if (length >= 80) {
								this.generalSize.push("Small");
							}
							else {
								this.generalSize.push("Extra Small");
							}
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
		SmallCarousel
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
			this.getCartDetails();
			this.isLoading = false;
			this.user_ID = userStore.getUserID();
		}, 1000);
		let recent = recents.getRecents();
		for (let i = 0; i < recent.length; i++) {
			FBInstanceFirestore.getProduct(recent[i])
				.then((data) => {
					this.recentProducts.push(data);
					let ind_category = data.category;
					if (this.category[ind_category] == undefined) {
						this.category[ind_category] = 1;
					} else {
						this.category[ind_category] += 1;
					}
					console.log(this.category);
					let max = 0;
					for (const [key, value] of Object.entries(this.category)) {
						if (value > max) {
							max = value;
							this.popularCategory = key;
						}
					}

				})
				.catch((error) => {
					// Handle any errors that occur during the promise execution
					console.error(error);
				});
		}

		FBInstanceFirestore.getAllProducts()
			.then((data) => {
				for (const key in data) {
					if (data[key].category == this.popularCategory && data[key].is_approved == true && data[key].is_bought == false) {
						this.reccomendedProducts.push(data[key]);
					}
				}

			})
			.catch((error) => {
				// Handle any errors that occur during the promise execution
				console.error(error);
			});


	},
};
</script>

<template>
	<div class="container">
		<h1 class="my-4">
			Shopping Cart <span v-if="cartContent">({{ cartContent }})</span>
		</h1>
		<p>
			If you have removed an item; please go back one page and come back. <strong>Do not refresh pls D:</strong>
		</p>
		<div v-if="!cartContent">
			<h3>Your Shopping Cart is empty.</h3>
			<p>
				Browse through our categories for inspiration and add something
				you like.
			</p>
			<br />
			<div class="d-grid gap-2 d-md-flex justify-content-md-start">
				<button class="btn btn-outline-dark me-md-2 px-md-5" type="button" @click="toListing()">
					LISTINGS

				</button>
			</div>
		</div>
		<div class="cart-section">
			<div class="row">
				<div class="col-lg-8">
					<CartItem v-for="(item, index) in cart" :key="index" :name="item.product_name" :price="item.modifiedPrice"
						:size="generalSize[index]" :brand="item.brand" :seller="item.seller_name" :imgUrl="item.image_src"
						:class="cartItemStyle(index)" :itemID="item.product_ID" />

				</div>
				<div class="col-lg-4">
					<CheckoutBar :totalOriginal="cartTotal" :total="cartTotal" :itemCount="cart.length"
						:cartItems="this.changedCart" :itemIds="this.cartItems" />
				</div>
			</div>
		</div>
		<div class="section">
			<h3>Recently Viewed</h3>
			<SmallCarousel :products="recentProducts" />
		</div>
		<div class="section">
			<h3>Recommended For You</h3>
			<SmallCarousel :products="reccomendedProducts" />
		</div>
	</div>
</template>

<style scoped>
.section {
	margin-top: 50px;
}
</style>
