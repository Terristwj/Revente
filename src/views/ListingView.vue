<script>
	import SideMenuBar from '../components/SideMenuBar.vue';
	import ItemCard from '../components/ItemCard.vue';
	export default {
		components: {
			SideMenuBar,
			ItemCard,
		},
		data() {
			return {
				test: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
			};
		},
		methods: {},
	};
</script>

<template>
	<body>
		<div class="m-3">
			<button
				class="btn btn-outline-dark d-inline-flex align-items-center"
				data-bs-toggle="offcanvas"
				data-bs-target="#offcanvas"
				role="button"
			>
				Filter
				<font-awesome-icon :icon="['fab', 'filter']" />
			</button>
		</div>
		<div class="container-fluid">
			<SideMenuBar />
			<div
				class="row row-cols-sm-2 row-cols-md-3 row-cols-lg-4 justify-content-center gap-5"
			>
				<ItemCard v-for="(num, index) in test" :key="index" />
			</div>
		</div>
	</body>
</template>

<style scoped>
	.btn-outline-dark:hover {
		color: white;
	}
</style>
