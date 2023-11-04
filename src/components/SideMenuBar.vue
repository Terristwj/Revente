<script>
	import { filters } from '../main.js';
	export default {
		name: 'SideMenuBar',
		props: {
			brands: {
				type: Array,
			},
			isMobile: {
				type: Boolean,
				default: false,
			},
			filter: {
				type: Object,
				required: true,
			},
		},
		mounted() {
			window.addEventListener('scroll', this.onScroll);
		},
		beforeUnmount() {
			window.removeEventListener('scroll', this.onScroll);
		},
		data() {
			return {
				// Values to be passed to parent component
				genderPicked: this.filter.gender,
				brandsPicked: this.filter.brand,
				priceRangeSelected: [
					this.filter.minPrice,
					this.filter.maxPrice,
				],
				categoryPicked: this.filter.category,

				// inputs
				brandSearchInput: this.filter.brand,
				minPriceInput: '',
				maxPriceInput: '',

				// Gender selection
				genders: ['Male', 'Female', 'Unisex'],
				// Category selection
				categories: ['Top', 'Bottom', 'Dress'],
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
				isGenderOpen: true,
				isCategoryOpen: true,
				isBrandOpen: true,
				isPriceOpen: true,
			};
		},
		methods: {
			// Close brand Multiselect on scroll
			onScroll() {
				this.$refs.brandMultiSelect.hide();
				this.$refs.brandMultiSelect.$el.blur();
			},
			// Gender
			updateGender() {
				filters.setGender(this.genderPicked);
				this.$emit('update-filter');
			},
			clearGender() {
				this.genderPicked = '';
				this.updateGender();
			},
			// Category
			updateCategory() {
				filters.setCategory(this.categoryPicked);
				this.$emit('update-filter');
			},
			removeCategory(e) {
				this.categoryPicked = filters.removeCategory(e);
				this.updateCategory();
			},
			// Brand
			updateBrand() {
				this.brandSearchInput = this.brandsPicked;
				filters.setBrands(this.brandsPicked);
				this.$emit('update-filter');
			},
			removeBrand(e) {
				this.brandsPicked = filters.removeBrand(e);
				this.updateBrand();
			},
			brandSelection(e) {
				this.brandsPicked = e.value;
				this.updateBrand();
			},
			// Price
			updatePrice() {
				filters.setPriceRange(
					this.priceRangeSelected[0],
					this.priceRangeSelected[1]
				);
				this.$emit('update-filter');
			},
			clearPrice() {
				this.priceRangeSelected = ['', ''];
				this.updatePrice();
			},
			searchPrice() {
				if (this.minPriceInput > this.maxPriceInput) {
					this.isPriceRangeWrong = true;
					setTimeout(() => {
						this.isPriceRangeWrong = false;
					}, 2000);
				} else {
					filters.setPriceRange(
						this.minPriceInput,
						this.maxPriceInput
					);
					this.$emit('update-filter');
				}
			},
			// Reset
			clearFilters() {
				this.genderPicked = '';
				this.categoryPicked = [];
				this.brandsPicked = [];
				this.priceRangeSelected = ['', ''];
				this.brandSearchInput = '';
				this.minPriceInput = '';
				this.maxPriceInput = '';
				this.$emit('clear-filters');
			},

			// Open Tabs
			toggleGender() {
				this.isGenderOpen = !this.isGenderOpen;
			},
			toggleCategory() {
				this.isCategoryOpen = !this.isCategoryOpen;
			},
			toggleBrand() {
				this.isBrandOpen = !this.isBrandOpen;
			},
			togglePrice() {
				this.isPriceOpen = !this.isPriceOpen;
			},
		},
	};
</script>

<template>
	<div style="z-index: 0">
		<!-- Filter Reset Button START -->
		<button
			@click="clearFilters"
			class="btn btn-outline-secondary w-100 mb-3"
		>
			Reset Filter
		</button>
		<!-- Filter Reset Button END -->

		<!-- filter tags component START -->
		<div class="row row-cols-auto mb-2">
			<!-- Gender Tag START -->
			<div class="col rounded-pill border m-1" v-if="genderPicked">
				{{ genderPicked }}
				<i class="fa-regular fa-circle-xmark" @click="clearGender"></i>
			</div>
			<!-- Gender Tag END -->

			<!-- Category Tag START -->
			<div
				class="col rounded-pill border m-1"
				v-for="(tag, i) in categoryPicked"
				:key="i"
			>
				{{ tag }}
				<i
					class="fa-regular fa-circle-xmark pointing"
					@click="removeCategory(tag)"
				></i>
			</div>
			<!-- Category Tag END -->

			<!-- Brand Tag START -->
			<div
				class="col rounded-pill border m-1"
				v-for="(tag, i) in brandsPicked"
				:key="i"
			>
				{{ tag }}
				<i
					class="fa-regular fa-circle-xmark pointing"
					@click="removeBrand(tag)"
				></i>
			</div>
			<!-- Brand Tag END -->

			<!-- Price Tag START -->
			<div
				class="col rounded-pill border m-1"
				v-if="
					priceRangeSelected[0] != '' || priceRangeSelected[1] != ''
				"
			>
				${{ priceRangeSelected[0] }} - ${{ priceRangeSelected[1] }}
				<i class="fa-regular fa-circle-xmark" @click="clearPrice"></i>
			</div>
			<!-- Price Tag END -->
		</div>
		<!-- filter tags component END -->

		<!-- Side Menu START -->
		<ul class="list-unstyled ps-0">
			<!-- Gender START -->
			<li class="mb-1">
				<div class="row pointing">
					<div class="col-10" @click="toggleGender">Gender</div>
					<button
						class="col-2 btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
						@click="toggleGender"
						:aria-expanded="[isGenderOpen ? true : false]"
					></button>
				</div>
				<div class="collapse" :class="{ show: isGenderOpen }">
					<ul
						class="btn-toggle-nav list-unstyled fw-normal pb-1 small mt-4 ms-3 ms-3"
					>
						<li
							v-for="(gender, index) in genders"
							:key="index + isMobile"
						>
							<div class="form-check">
								<input
									v-model="genderPicked"
									class="form-check-input pointing"
									type="radio"
									:value="gender"
									:id="gender + isMobile"
									@change="updateGender"
								/>
								<label
									class="form-check-label pointing"
									:for="gender + isMobile"
								>
									{{ gender }}
								</label>
							</div>
						</li>
					</ul>
				</div>
			</li>
			<!-- Gender END -->

			<li class="border-top my-3"></li>

			<!-- Category START -->
			<li class="mb-1">
				<div class="row pointing">
					<div class="col-10" @click="toggleCategory">Category</div>
					<button
						class="col-2 btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
						@click="toggleCategory"
						:aria-expanded="[isCategoryOpen ? true : false]"
					></button>
				</div>
				<div class="collapse" :class="{ show: isCategoryOpen }">
					<ul
						class="btn-toggle-nav list-unstyled fw-normal pb-1 small mt-4 ms-3 ms-3"
					>
						<li
							v-for="(category, index) in categories"
							:key="index + isMobile"
						>
							<div class="form-check">
								<input
									v-model="categoryPicked"
									class="form-check-input pointing"
									type="checkbox"
									:value="category"
									:id="category + isMobile"
									@change="updateCategory"
								/>
								<label
									class="form-check-label pointing"
									:for="category + isMobile"
								>
									{{ category }}
								</label>
							</div>
						</li>
					</ul>
				</div>
			</li>
			<!-- Category END -->

			<li class="border-top my-3"></li>

			<!-- Brand START -->
			<li class="mb-1">
				<div class="row pointing">
					<div class="col-10" @click="toggleBrand">Brand</div>
					<button
						class="col-2 btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
						@click="toggleBrand"
						:aria-expanded="[isBrandOpen ? true : false]"
					></button>
				</div>
				<div class="collapse" :class="{ show: isBrandOpen }">
					<ul
						class="btn-toggle-nav list-unstyled fw-normal pb-1 small mt-4 ms-3 ms-3"
					>
						<li>
							<div class="input-group mb-3">
								<MultiSelect
									ref="brandMultiSelect"
									class="w-full md:w-20rem"
									style="z-index: 26"
									v-model="brandSearchInput"
									:options="brands"
									placeholder="Select Brands"
									:maxSelectedLabels="2"
									filter
									v-on:change="brandSelection"
									:pt="{
										label: {
											class: 'p-1 ps-3',
										},
										header: {
											class: 'p-2',
										},
										filterInput: {
											class: 'p-1',
										},
										list: {
											class: 'p-0',
										},
										item: {
											class: 'p-2 ps-3',
										},
									}"
								/>
							</div>
						</li>
					</ul>
				</div>
			</li>
			<!-- Brand END -->

			<li class="border-top my-3"></li>

			<!-- Price START -->
			<li class="mb-1">
				<div class="row pointing">
					<div class="col-10" @click="togglePrice">Price</div>
					<button
						class="col-2 btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
						@click="togglePrice"
						:aria-expanded="[isPriceOpen ? true : false]"
					></button>
				</div>
				<div class="collapse" :class="{ show: isPriceOpen }">
					<div
						class="btn-toggle-nav list-unstyled fw-normal pb-1 small mt-4 ms-3"
					>
						<div
							class="form-check"
							v-for="(priceRange, key) in priceRanges"
							:key="priceRange + isMobile"
						>
							<input
								v-model="priceRangeSelected"
								class="form-check-input pointing"
								type="radio"
								:id="key + isMobile"
								:value="priceRange"
								@change="updatePrice"
							/>
							<label
								class="form-check-label pointing"
								:for="key + isMobile"
							>
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
									<button
										class="price-btn"
										@click="searchPrice"
									>
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
			<!-- Price END -->

			<!-- Side Menu END -->
		</ul>
	</div>
</template>

<style scoped></style>
