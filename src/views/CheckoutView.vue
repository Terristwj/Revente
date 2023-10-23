<script>
	import CountryDropdown from '../components/CountryDropdown.vue';
	import Stripe from 'stripe';
	export default {
		components: {
			CountryDropdown,
		},
		async mounted() {
			const { publishableKey } = await fetch('/config').then((r) =>
				r.json()
			);
			if (!publishableKey) {
				console.log(
					'No publishable key returned from the server. Please check `.env` and try again'
				);
				alert(
					'Please set your Stripe publishable API key in the .env file'
				);
			}

			const stripe = Stripe(publishableKey, {
				apiVersion: import.meta.env.VITE_API_VERSION,
			});

			const elements = stripe.elements();
			const card = elements.create('card');
			card.mount('#card-element');
		},
		data() {
			return {
				shippingLocation: {
					countryCode: '',
					address: '',
					zipCode: '',
					unitNumber: '',
					city: '',
					state: '',
					saveLocation: false,
				},
				personalDetails: {
					firstName: '',
					lastName: '',
					phoneNumber: '',
				},
				formDisabled: true,
				amount: 500,
				submitted: false,
				stripe: null,
				cardElement: null,
			};
		},
		methods: {
			countryInput(code) {
				console.log(code);
				this.shippingLocation.countryCode = code;
			},
			async handleSubmit() {
				console.log(this.shippingLocation, this.personalDetails);
				// Disable double submission of the form
				if (this.submitted) {
					return;
				}
				this.submitted = true;
				this.formDisabled = true;

				// Make a call to the server to create a new
				// payment intent and store its client_secret.
				const { error: backendError, clientSecret } = await fetch(
					'/create-payment-intent',
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							currency: 'sgd',
							paymentMethodType: 'card',
							amount: this.amount,
						}),
					}
				).then((r) => r.json());

				if (backendError) {
					console.log(backendError.message);

					// reenable the form.
					this.submitted = false;
					this.formDisabled = false;
					return;
				}

				console.log(`Client secret returned.`);

				const nameInput = document.querySelector('#name');

				// Confirm the card payment given the clientSecret
				// from the payment intent that was just created on
				// the server.
				const { error: stripeError, paymentIntent } =
					await this.stripe.confirmCardPayment(clientSecret, {
						payment_method: {
							card: this.cardElement,
							billing_details: {
								name: nameInput.value,
							},
						},
					});

				if (stripeError) {
					console.log(stripeError.message);

					// reenable the form.
					this.submitted = false;
					this.formDisabled = false;
					return;
				}

				console.log(
					`Payment ${paymentIntent.status}: ${paymentIntent.id}`
				);
			},
		},
	};
</script>

<template>
	<div class="container">
		<!-- 1. details section form -->
		<div class="row">
			<div class="col-1"></div>

			<div class="col-lg-10">
				<form action="">
					<h1 class="mt-5">ORDER</h1>
					<h3 class="my-5">1. Shipping Details</h3>
					<div class="form mb-5">
						<p class="form-header">Recipient Details</p>
						<div class="mb-3 required">
							<label for="fname" class="form-label"
								>First Name</label
							>
							<input
								required
								type="text"
								class="form-control"
								id="fname"
								placeholder="Enter your first name"
								v-model="personalDetails.firstName"
							/>
						</div>
						<div class="mb-3 required">
							<label for="lname" class="form-label"
								>Last Name</label
							>
							<input
								required
								type="text"
								class="form-control"
								id="lname"
								placeholder="Enter your last name"
								v-model="personalDetails.lastName"
							/>
						</div>
						<div class="mb-3 required">
							<label for="fname" class="form-label"
								>Phone Number</label
							>
							<div class="input-group mb-3">
								<span class="input-group-text">+65</span>
								<input
									required
									type="text"
									class="form-control"
									id="phone"
									placeholder="Enter your phone number"
									v-model="personalDetails.phoneNumber"
								/>
							</div>
						</div>

						<!-- Shipping Adress -->
						<p class="form-header">Shipping Address</p>
						<CountryDropdown @country-input="countryInput" />

						<div class="mb-3 required">
							<label for="address" class="form-label"
								>Address</label
							>
							<input
								required
								type="text"
								class="form-control"
								id="address"
								placeholder="Enter your address"
								v-model="shippingLocation.address"
							/>
						</div>
						<div class="row">
							<div class="col-6">
								<div class="mb-3 required">
									<label for="postal" class="form-label"
										>Zip / Postal Code</label
									>
									<input
										required
										type="text"
										class="form-control"
										id="postal"
										placeholder="Enter your postal code"
										v-model="shippingLocation.zipCode"
									/>
								</div>
							</div>
							<div class="col-6">
								<div class="mb-3">
									<label for="unit" class="form-label"
										>Unit Number</label
									>
									<input
										type="text"
										class="form-control"
										id="unit"
										placeholder="Enter your unit number"
										v-model="shippingLocation.unitNumber"
									/>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-6">
								<div class="mb-3 required">
									<label for="city" class="form-label"
										>City</label
									>
									<input
										required
										type="text"
										class="form-control"
										id="city"
										placeholder="Enter your city"
										v-model="shippingLocation.city"
									/>
								</div>
							</div>
							<div class="col-6">
								<div class="mb-3 required">
									<label for="city" class="form-label"
										>State</label
									>
									<input
										required
										type="text"
										class="form-control"
										id="city"
										placeholder="Enter your city state"
										v-model="shippingLocation.state"
									/>
								</div>
							</div>
						</div>
						<div class="form-check m-3">
							<input
								class="form-check-input"
								type="checkbox"
								id="saveAddress"
								v-model="shippingLocation.saveLocation"
							/>
							<label
								class="form-check-label saveAddress"
								for="save"
							>
								Save as default shipping address
							</label>
						</div>
					</div>

					<!-- 2. Shipping method -->
					<h3 class="my-5">2. Shipping Method</h3>

					<!-- Payment Methods -->
					<h3 class="my-5">3. Payment</h3>
					<div class="row gy-3">
						<div class="col-md-7 required">
							<label for="card-element"> Card Details </label>
							<div id="card-element">
								<!-- Elements will create input elements here -->
							</div>
						</div>

						<div class="col-md-5 required">
							<label for="cc-name" class="form-label"
								>Name on card</label
							>
							<input
								type="text"
								class="form-control"
								id="cc-name"
								placeholder=""
								required
							/>
							<small class="text-muted"
								>Full name as displayed on card</small
							>
							<div class="invalid-feedback">
								Name on card is required
							</div>
						</div>
					</div>

					<!-- Checkout Button -->
					<div class="row my-5">
						<div id="card-errors" role="alert"></div>
						<button
							class="btn btn-dark"
							:class="{ disabled: !formDisabled }"
							@click="handleSubmit"
						>
							Pay
						</button>
					</div>
				</form>
			</div>
			<div class="col-1"></div>
		</div>
	</div>
</template>

<style scoped>
	.saveAddress {
		font-weight: normal;
	}
	label {
		font-weight: bold;
	}
	.required label:after {
		color: #e32;
		content: ' *';
		display: inline;
	}
	.form {
		border: 1px solid grey;
		border-radius: 8px;
		padding: 1em;
	}
	.form-header {
		font-size: 120%;
		text-decoration: underline;
		text-align: center;
		margin: 2em 0 1em;
	}
</style>
