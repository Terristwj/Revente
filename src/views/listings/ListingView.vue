<script>
import SideMenuBar from '../../components/SideMenuBar.vue';
import ItemCard from '../../components/ItemCard.vue';
import FBInstanceFirestore from '../../services/Firebase/FirestoreDatabase.js';
import { filters } from '../../main';
export default {
	components: {
		SideMenuBar,
		ItemCard,
	},
	created() {
		document.body.scrollTop = 0;
		document.documentElement.scrollTop = 0;
		// Database
		setTimeout(async () => {
			// Get total products
			await FBInstanceFirestore.getAllProductListingsAndCount()
				.then(({ products, count }) => {
					// Data from Firebase
					this.allProductListings = products;
					this.totalProducts = count;

					// Get all brands
					for (const key in products) {
						const brand = products[key].brand;
						if (!this.brands?.includes(brand))
							this.brands.push(brand);
					}

					// Data to be displayed onLoad
					this.productListings = this.allProductListings.slice(
						0,
						12
					);

					// Remove skeleton loader
					this.isLoading = false;
					// Update filter
					this.updateFilter();
				})
				.catch((err) => {
					console.log(err);
					this.FBQuotaReached = true;
				});

			if (this.FBQuotaReached) {
				this.$toast.add({
					severity: 'error',
					summary: 'Database Quota Reached',
					detail: 'Database Quota will reset at SGT 3pm.',
					life: 15000,
				});
			}
		}, 2000);
	},
	mounted() {
		this.filter = filters.getFilter();
		this.windowWidth = window.innerWidth;
		window.addEventListener('resize', this.onResize);
	},
	beforeUnmount() {
		window.removeEventListener('resize', this.onResize);
	},
	data() {
		return {
			windowWidth: 0,
			// Left Filter Menu
			visibleLeft: false,

			// Filter Settings
			filter: {
				gender: '',
				brand: [],
				minPrice: '',
				maxPrice: '',
				category: [],
			},
			brands: [],

			// Products to display
			allProductListings: [],
			productListings: [],
			filteredListings: [],

			// Pagination
			totalProducts: 0,
			paginationIndex: 0,
			paginationPageNumber: 0,

			// Error Handlers
			FBQuotaReached: false,
			isLoading: true,
		};
	},
	computed: {
		isLargeScreen() {
			return this.windowWidth >= 992; // Bootstrap's large screen breakpoint
		},
	},
	methods: {
		onResize() {
			this.windowWidth = window.innerWidth;
		},
		// Filter
		updateFilter() {
			this.filter = filters.getFilter();
			this.filterProducts();
		},
		clearFilters() {
			this.filter = {
				gender: '',
				brand: [],
				minPrice: '',
				maxPrice: '',
				category: [],
			};
			filters.resetFilters();
			this.filterProducts();
		},
		clearFilterFromListingPage() {
			this.$refs.sideMenuBarRef.clearFilters();
			this.clearFilters();
		},
		filterProducts() {
			var filtered = [];
			// Reset Button clicked
			if (
				this.filter.gender == '' &&
				this.filter.brand == [] &&
				this.filter.minPrice == '' &&
				this.filter.maxPrice == '' &&
				this.filter.category == []
			) {
				this.resetPagination(this.allProductListings.length);
				this.productListings = this.allProductListings;
				this.filteredListings = this.allProductListings;
			}
			for (const product of this.allProductListings) {
				// gender filter
				if (
					product.gender.toLowerCase() !=
						this.filter.gender.toLowerCase() &&
					this.filter.gender != ''
				) {
					continue;
				}
				// brand filter
				if (
					!this.filter.brand?.includes(product.brand) &&
					this.filter.brand != ''
				) {
					continue;
				}
				// category filter
				if (
					!this.filter.category?.includes(product.category) &&
					this.filter.category != ''
				) {
					continue;
				}
				// price filter
				if (
					this.filter.minPrice == '' &&
					this.filter.maxPrice == ''
				) {
					filtered.push(product);
					continue;
				} else if (
					product.modifiedPrice >= this.filter.minPrice &&
					product.modifiedPrice <= this.filter.maxPrice
				) {
					filtered.push(product);
					continue;
				} else {
					continue;
				}
			}
			this.resetPagination(filtered.length);
			this.filteredListings = filtered;
			this.productListings = this.filteredListings.slice(0, 12);
		},

		// Pagination
		onPageChange(e, index) {
			// Scroll to top if 'Bottom Pagination'
			if (index == 2) {
				document.body.scrollTop = 0;
				document.documentElement.scrollTop = 0;
			}

			// Update both 'Pagination Metadata'
			this.paginationIndex = e.first;
			this.paginationPageNumber = e.page;

			// Display the selected 'Pagination index' of products
			this.productListings = this.filteredListings.slice(
				e.first,
				e.first + e.rows
			);
		},

		resetPagination(count) {
			// Update both 'Pagination Metadata'
			this.totalProducts = count;
			this.paginationIndex = 0;
			this.paginationPageNumber = 0;
		},
	},
};
</script>

<template>
	<body>
		<div class="container-fluid">
			<div class="row">
				<div class="my-3">
					<button
						class="btn btn-outline-dark d-inline-flex align-items-center d-block d-lg-none"
						@click="visibleLeft = true"
					>
						Filter
						<font-awesome-icon
							:icon="['fas', 'filter']"
							class="mx-2"
						/>
					</button>
				</div>
			</div>
			<div class="row shadow">
				<!-- Sticky sidebar for large screens START -->
				<div class="col-lg-3 col-xl-2 d-none d-lg-block">
					<SideMenuBar
						v-if="isLargeScreen"
						class="sticky-top"
						:brands="brands"
						:isMobile="true"
						:filter="filter"
						@update-filter="updateFilter"
						@clear-filters="clearFilters"
						ref="sideMenuBarRef"
					/>
				</div>
				<!-- Sticky sidebar for large screens END -->

				<!-- Toggle-able sidebar for smaller screen START -->
				<Sidebar
					v-model:visible="visibleLeft"
					class="d-block d-lg-none"
				>
					<SideMenuBar
						v-if="!isLargeScreen"
						:brands="brands"
						:filter="filter"
						@update-filter="updateFilter"
						@clear-filters="clearFilters"
						ref="sideMenuBarRef"
					/>
				</Sidebar>
				<!-- Toggle-able sidebar for smaller screen END -->

				<!-- Skeleton START -->
				<div
					v-if="isLoading"
					class="card p-0 col-md-12 col-lg-9 col-xl-10"
				>
					<skeleton
						style="
							border-radius: 1% 1% 0% 0%;
							width: 100%;
							height: 65px;
						"
					>
					</skeleton>
					<br />
					<div
						class="row p-3 flex-column justify-content-center align-items-center gap-2 gap-lg-3"
					>
						<div class="row gap-3">
							<skeleton
								class="col"
								style="border-radius: 0%; height: 20vh"
							></skeleton
							><skeleton
								class="col"
								style="border-radius: 0%; height: 20vh"
							></skeleton>
							<skeleton
								class="col"
								style="border-radius: 0%; height: 20vh"
							></skeleton>
						</div>
						<div class="row gap-3">
							<skeleton
								class="col"
								style="border-radius: 0%; height: 20vh"
							>
							</skeleton>
							<skeleton
								class="col"
								style="border-radius: 0%; height: 20vh"
							></skeleton>
							<skeleton
								class="col"
								style="border-radius: 0%; height: 20vh"
							></skeleton>
						</div>
						<div class="row gap-3">
							<skeleton
								class="col"
								style="border-radius: 0%; height: 20vh"
							>
							</skeleton>
							<skeleton
								class="col"
								style="border-radius: 0%; height: 20vh"
							></skeleton>
							<skeleton
								class="col"
								style="border-radius: 0%; height: 20vh"
							></skeleton>
						</div>
					</div>

					<br />
					<skeleton
						style="
							border-radius: 0% 0% 1% 1%;
							width: 100%;
							height: 65px;
						"
					>
					</skeleton>
				</div>
				<!-- Skeleton END -->

				<div
					v-if="!isLoading"
					class="card col-md-12 col-lg-9 col-xl-10"
				>
					<Paginator
						id="Paginator-1"
						:template="{
							'640px':
								'PrevPageLink CurrentPageReport NextPageLink',
							'960px':
								'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
							'1300px':
								'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
							default:
								'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink ',
						}"
						:rows="12"
						:totalRecords="totalProducts"
						v-on:page="onPageChange($event, 1)"
						:first="paginationIndex"
						:page="paginationPageNumber"
					>
					</Paginator>

					<div
						v-if="productListings.length == 0"
						class="no-item-warning"
					>
						<h1>No Items Found</h1>
						<button
							@click="clearFilterFromListingPage"
							class="btn btn-outline-secondary mt-3"
						>
							Reset Filter
						</button>
					</div>
					<div
						class="row p-3 border-3 border-top border-bottom border-subtle justify-content-center gap-2 gap-lg-3"
					>
						<ItemCard
							v-for="(product, index) in productListings"
							:key="index"
							:product="product"
						/>
					</div>

					<Paginator
						id="Paginator-2"
						:template="{
							'640px':
								'PrevPageLink CurrentPageReport NextPageLink',
							'960px':
								'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
							'1300px':
								'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
							default:
								'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink ',
						}"
						:rows="12"
						:totalRecords="totalProducts"
						v-on:page="onPageChange($event, 2)"
						:first="paginationIndex"
						:page="paginationPageNumber"
					>
					</Paginator>
				</div>
			</div>
		</div>
	</body>
</template>

<style scoped>
	body {
		overflow: visible;
	}
	.btn-outline-dark:hover {
		color: white;
	}
	.sticky-top {
		position: -webkit-sticky;
		position: sticky;
		top: 4em;
	}
	.no-item-warning {
		text-align: center;
		padding: 15vh 0px;
	}
</style>
