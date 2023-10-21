<template>
	<StripeElements
		v-slot="{ elements }"
		:stripe-key="stripeKey"
		:instance-options="instanceOptions"
		:elements-options="elementsOptions"
	>
		<StripeElement
			type="cardNumber"
			:elements="elements"
			:options="cardNumberOptions"
		/>
		<StripeElement
			type="postalCode"
			:elements="elements"
			:options="postalCodeOptions"
		/>
	</StripeElements>
	<button type="button" @click="pay">Pay</button>
</template>

<script lang="ts">
	import { StripeElements, StripeElement } from 'vue-stripe-js';
	import { loadStripe } from '@stripe/stripe-js';
	import { defineComponent, ref, onBeforeMount } from 'vue';

	export default defineComponent({
		name: 'CardOnly',

		components: {
			StripeElements,
			StripeElement,
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
			const cardNumberOptions = ref({});
			const postalCodeOptions = ref({});
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
				elms.value.instance
					.createToken(cardElement)
					.then((result: object) => {
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
				cardNumberOptions,
				postalCodeOptions,
				card,
				elms,
				pay,
			};
		},
	});
</script>
