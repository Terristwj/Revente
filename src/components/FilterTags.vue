<script>
	export default {
		props: {},
		data() {
			return {
				filter: {
					gender: '',
					brand: '',
					minPrice: '',
					maxPrice: '',
				},
			};
		},
	};
</script>

<template>
    
	<div class="col" v-if="filter.gender">
		{{ filter.gender }}
	</div>
	<div class="col" v-for="(tag, i) in filter.brand" :key="i">
		{{ tag }}
	</div>
	<div class="col" v-if="filter.maxPrice">
		{{ filter.minPrice }} - {{ filter.maxPrice }}
	</div>
</template>

<style scoped></style>
