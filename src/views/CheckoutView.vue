<script>
	import CountryDropdown from '../components/CountryDropdown.vue';
	import { StripeElements, StripeElement } from 'vue-stripe-js';
	import { loadStripe } from '@stripe/stripe-js';
	import { defineComponent, ref, onBeforeMount } from 'vue';
	export default {
		components: {
			CountryDropdown,
			// StripeElements,
			// StripeElement,
		},
		setup() {
			const stripeKey = ref('pk_test_TYooMQauvdEDq54NiTphI7jx'); // test key
			const instanceOptions = ref({
				// https://stripe.com/docs/js/initializing#init_stripe_js-options
			});
			const elementsOptions = ref({
				// https://stripe.com/docs/js/elements_object/create#stripe_elements-options
			});
			const cardOptions = ref({
				// https://stripe.com/docs/stripe.js#element-options
				value: {
					postalCode: '12345',
				},
			});
			const stripeLoaded = ref(false);
			const card = ref();
			const elms = ref();

			onBeforeMount(() => {
				const stripePromise = loadStripe(stripeKey.value);
				stripePromise.then(() => {
					stripeLoaded.value = true;
				});
			});

			const pay = () => {
				// Get stripe element
				const cardElement = card.value.stripeElement;

				// Access instance methods, e.g. createToken()
				elms.value.instance.createToken(cardElement).then((result) => {
					// Handle result.error or result.token
					console.log(result);
				});
			};

			return {
				stripeKey,
				stripeLoaded,
				instanceOptions,
				elementsOptions,
				cardOptions,
				card,
				elms,
				pay,
			};
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
			};
		},
		methods: {
			countryInput(code) {
				console.log(code);
				this.shippingLocation.countryCode = code;
			},
			async handleSubmit() {},
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
							<label for="cc-details" class="form-label"
								>Card Details</label
							>
							<StripeElements
								id="cc-details"
								class="form-control"
								v-if="stripeLoaded"
								v-slot="{ elements, instance }"
								ref="elms"
								:stripe-key="stripeKey"
								:instance-options="instanceOptions"
								:elements-options="elementsOptions"
							>
								<StripeElement
									ref="card"
									:elements="elements"
									:options="cardOptions"
								/>
							</StripeElements>
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
