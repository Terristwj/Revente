<script>
	export default {
		name: 'SideMenuBar',
		props: {
			brands: {
				type: Array,
			},
		},
		data() {
			return {
				// Values to be passed to parent component
				genderPicked: '',
				priceRangeSelected: '',
				brandsPicked: [],

				// inputs
				brandSearchInput: '',
				minPriceInput: '',
				maxPriceInput: '',

				// Gender selection
				genders: ['Male', 'Female', 'Unisex'],
				// Price selection
				priceRanges: {
					'SG $0 ~ SG $50': [0, 50],
					'SG $50 ~ SG $100': [50, 100],
					'SG $100 ~ SG $150': [100, 150],
					'SG $150 ~ SG $200': [150, 200],
					'SG $200 ~ SG $250': [200, 250],
					'SG $250 ~ SG $300': [250, 300],
				},
				isPriceRangeWrong: false,

				// Sidebar section, to determine which section is open
				isGenderOpen: false,
				isBrandOpen: false,
				isPriceOpen: false,
			};
		},
		watch: {
			genderPicked() {
				console.log(this.genderPicked);
				this.$emit('gender-picked', this.genderPicked);
			},
			brandsPicked() {
				console.log(this.brandsPicked);
				this.$emit('brands-picked', this.brandsPicked);
			},
			priceRangeSelected() {
				console.log(this.priceRangeSelected);
				this.$emit('price-range-selected', this.priceRangeSelected);
			},
		},
		methods: {
			searchPrice() {
				if (this.minPriceInput > this.maxPriceInput) {
					this.isPriceRangeWrong = true;
					setTimeout(() => {
						this.isPriceRangeWrong = false;
					}, 2000);
				} else {
					this.$emit('price-range-selected', [
						this.minPriceInput,
						this.maxPriceInput,
					]);
				}
			},
			openGender() {
				this.isGenderOpen = !this.isGenderOpen;
				this.isBrandOpen = false;
				this.isPriceOpen = false;
			},
			openBrand() {
				this.isGenderOpen = false;
				this.isBrandOpen = !this.isBrandOpen;
				this.isPriceOpen = false;
			},
			openPrice() {
				this.isGenderOpen = false;
				this.isBrandOpen = false;
				this.isPriceOpen = !this.isPriceOpen;
			},
		},
	};
</script>

<template>
	<!-- Gender (default open) -->
	<ul class="list-unstyled ps-0">
		<li class="mb-1">
			<div class="row">
				<div class="col-10" @click="openGender">Gender</div>
				<button
					class="col-2 btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
					@click="openGender"
					:aria-expanded="[isGenderOpen ? true : false]"
				></button>
			</div>
			<div
				class="collapse"
				:class="{ show: isGenderOpen }"
				id="gender-collapse"
			>
				<ul
					class="btn-toggle-nav list-unstyled fw-normal pb-1 small mt-4 ms-3 ms-3"
				>
					<li v-for="(gender, index) in genders" :key="index">
						<div class="form-check">
							<input
								v-model="genderPicked"
								class="form-check-input"
								type="radio"
								:value="gender"
								:id="gender"
							/>
							<label class="form-check-label caps" :for="gender">
								{{ gender }}
							</label>
						</div>
					</li>
				</ul>
			</div>
		</li>

		<li class="border-top my-3"></li>
		<!-- Brand  -->
		<li class="mb-1">
			<div class="row">
				<div class="col-10" @click="openBrand">Brand</div>
				<button
					class="col-2 btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
					@click="openBrand"
					:aria-expanded="[isBrandOpen ? true : false]"
				></button>
			</div>
			<div
				class="collapse"
				:class="{ show: isBrandOpen }"
				id="brand-collapse"
			>
				<ul
					class="btn-toggle-nav list-unstyled fw-normal pb-1 small mt-4 ms-3 ms-3"
				>
					<li>
						<div class="input-group mb-3">
							<input
								type="text"
								class="form-control"
								placeholder="Search Brands"
								aria-label="Search Brands"
								v-model="brandSearchInput"
							/>
						</div>
					</li>
					<li v-for="brand in brands" :key="brand">
						<div class="form-check">
							<input
								class="form-check-input"
								type="checkbox"
								v-model="brandsPicked"
								:value="brand"
								:id="brand"
							/>
							<label class="form-check-label" :for="brand">
								{{ brand }}
							</label>
						</div>
					</li>
				</ul>
			</div>
		</li>

		<li class="border-top my-3"></li>
		<!-- Price -->
		<li class="mb-1">
			<div class="row">
				<div class="col-10" @click="openPrice">Price</div>
				<button
					class="col-2 btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
					@click="openPrice"
					:aria-expanded="[isPriceOpen ? true : false]"
				></button>
			</div>
			<div
				class="collapse"
				:class="{ show: isPriceOpen }"
				id="price-collapse"
			>
				<div
					class="btn-toggle-nav list-unstyled fw-normal pb-1 small mt-4 ms-3"
				>
					<div
						class="form-check"
						v-for="(priceRange, key) in priceRanges"
						:key="priceRange"
					>
						<input
							v-model="priceRangeSelected"
							class="form-check-input"
							type="radio"
							:id="key"
							:value="priceRange"
						/>
						<label class="form-check-label" :for="key">
							{{ key }}
						</label>
					</div>
					<div class="mt-4">
						<div class="row price-search">
							<div class="col-4 pe-0">
								<input
									type="number"
									class="price-form"
									placeholder="0"
									v-model="minPriceInput"
									min="0"
								/>
							</div>
							<div class="dash col-1 py-0">-</div>
							<div class="col-4 ps-0">
								<input
									type="number"
									class="price-form"
									placeholder="0"
									v-model="maxPriceInput"
									min="0"
								/>
							</div>
							<div class="col-2 ps-0">
								<button class="price-btn" @click="searchPrice">
									Apply
								</button>
							</div>
						</div>
						<div v-if="isPriceRangeWrong">
							<div class="text-danger mt-2" role="alert">
								min price is greater than max price!
							</div>
						</div>
					</div>
				</div>
			</div>
		</li>
		<!-- Size -->
	</ul>
</template>

<style scoped>
	.caps {
		text-transform: uppercase;
	}
</style>
