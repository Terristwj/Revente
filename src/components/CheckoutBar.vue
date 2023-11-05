<script>
import { userStore } from '../main.js';

export default {
	props: {
		totalOriginal: {
			type: Number,
			required: true,
		},
		discounts: {
			type: Number,
			required: false,
			default: 0,
		},
		shipping: {
			type: Number,
			required: false,
			default: 0,
		},
		total: {
			type: Number,
			required: true,
		},
		itemCount: {
			type: Number,
			required: true,
		},
		cartItems: {
			type: Array,
			required: true,
		},
		itemIds: {
			type: Array,
			required: true,
		},
	},
	data() {
		return {
			promoInput: '',
			promoMsg: '',
			promoCodes: ['PROMO1', 'PROMO2', 'PROMO3'],
			promoDetails: [],
			userId: userStore.getUserID(),
		};
	},
	methods: {
		goToCheckout() {
			if (this.itemCount === 0) return;

			fetch(
				'https://revente-backend.vercel.app/create-checkout-session',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						success_url:
							'http://localhost:5173/success?product_ids=' +
							this.itemIds.toString() +
							'&user_id=' +
							this.userId,
						cancel_url: 'http://localhost:5173/cart',
						items: this.cartItems,
					}),
				}
			)
				.then((res) => {
					if (res.ok) return res.json();
					return res.json().then((json) => Promise.reject(json));
				})
				.then(({ url }) => {
					// console.log(url);
					window.location = url;
				})
				.catch((e) => {
					console.error(e.error);
				});
		},
		applyPromo() {
			this.promoMsg = '';
			if (this.promoCodes.includes(this.promoInput)) {
				this.promoMsg = 'Promo code applied!';
			} else {
				this.promoMsg = 'Invalid promo code!';
				setTimeout(() => {
					this.promoMsg = '';
				}, 4000);
				this.promoInput = '';
			}
		},
	},
	computed: {
		calculatedPromoClass() {
			if (this.promoMsg === 'Invalid promo code!') {
				return 'text-danger';
			} else {
				return 'text-success';
			}
		},
	},
	watch: {
		promoInput() {
			this.promoInput = this.promoInput.toUpperCase();
		},
	},
};
</script>

<template>
	<div class="mb-3">
		<!-- Promo Code Section -->
		<label for="promoCode" class="form-label">
			<h6>Apply Promo Code</h6>
		</label>
		<div class="row">
			<div class="col-sm-9">
				<div class="input-group mb-3">
					<input
						autofocus
						type="text"
						class="form-control"
						placeholder="Enter promo code here"
						aria-label="promo code input"
						aria-describedby="promo-btn"
						id="promoCode"
						v-model="promoInput"
						@keydown.enter="applyPromo"
					/>
				</div>
			</div>
			<div class="col-sm-3">
				<button
					class="btn btn-dark"
					type="button"
					id="promo-btn"
					:disabled="itemCount === 0"
					@click="applyPromo"
				>
					Apply
				</button>
			</div>
		</div>
		<div :class="calculatedPromoClass">{{ promoMsg }}</div>
		<hr class="mt-4 mb-5" />
		<!-- Cart Calculation Section -->
		<div class="d-flex justify-content-between">
			<p>Subtotal</p>
			<p>${{ totalOriginal }}</p>
		</div>
		<div class="d-flex justify-content-between">
			<p>Discount</p>
			<p>${{ discounts }}</p>
		</div>
		<div class="d-flex justify-content-between">
			<p>Shipping</p>
			<p>${{ shipping }}</p>
		</div>
		<div class="d-flex justify-content-between mt-2">
			<b>Total ({{ itemCount }})</b><b>${{ total }}</b>
		</div>
		<hr class="my-5" />
		<!-- Proceed to Checkout -->
		<div class="row mx-1">
			<button
				class="btn btn-dark"
				@click="goToCheckout"
				:disabled="itemCount === 0"
			>
				PROCEED TO CHECKOUT
			</button>
		</div>
	</div>
</template>

<style scoped>
	p {
		line-height: 70%;
	}

	.border-red {
		border: 2px solid red;
	}
</style>
