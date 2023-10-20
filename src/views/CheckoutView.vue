<script>
	import CountryDropdown from '../components/CountryDropdown.vue';
	export default {
		components: {
			CountryDropdown,
		},
		data() {
			return {
				saveAddress: false,
			};
		},
	};
</script>

<template>
	<div class="container">
		<h1 class="my-5">ORDER</h1>
		<!-- details sections -->
		<h3>1. Shipping Details</h3>
		<div class="form mb-5">
			<p class="form-header">Recipient Details</p>
			<div class="mb-3 required">
				<label for="fname" class="form-label">First Name</label>
				<input
					type="text"
					class="form-control"
					id="fname"
					placeholder="Enter your first name"
				/>
			</div>
			<div class="mb-3 required">
				<label for="lname" class="form-label">Last Name</label>
				<input
					type="text"
					class="form-control"
					id="lname"
					placeholder="Enter your last name"
				/>
			</div>
			<div class="mb-3 required">
				<label for="fname" class="form-label">Phone Number</label>
				<div class="input-group mb-3">
					<span class="input-group-text">+65</span>
					<input
						type="text"
						class="form-control"
						id="phone"
						placeholder="Enter your phone number"
					/>
				</div>
			</div>

			<!-- Shipping Adress -->
			<p class="form-header">Shipping Address</p>
			<CountryDropdown />

			<div class="mb-3 required">
				<label for="address" class="form-label">Address</label>
				<input
					type="text"
					class="form-control"
					id="address"
					placeholder="Enter your address"
				/>
			</div>
			<div class="row">
				<div class="col-6">
					<div class="mb-3 required">
						<label for="postal" class="form-label"
							>Zip / Postal Code</label
						>
						<input
							type="text"
							class="form-control"
							id="postal"
							placeholder="Enter your postal code"
						/>
					</div>
				</div>
				<div class="col-6">
					<div class="mb-3">
						<label for="unit" class="form-label">Unit Number</label>
						<input
							type="text"
							class="form-control"
							id="unit"
							placeholder="Enter your unit number"
						/>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-6">
					<div class="mb-3 required">
						<label for="city" class="form-label">City</label>
						<input
							type="text"
							class="form-control"
							id="city"
							placeholder="Enter your city"
						/>
					</div>
				</div>
				<div class="col-6">
					<div class="mb-3 required">
						<label for="city" class="form-label">State</label>
						<input
							type="text"
							class="form-control"
							id="city"
							placeholder="Enter your city state"
						/>
					</div>
				</div>
			</div>
			<div class="form-check m-3">
				<input
					class="form-check-input"
					type="checkbox"
					id="saveAddress"
					v-model="saveAddress"
				/>
				<label class="form-check-label saveAddress" for="save">
					Save as default shipping address
				</label>
			</div>
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
