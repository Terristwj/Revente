<script>
	import { useWindowSize } from 'vue-window-size';
	import SideMenuBar from '../components/SideMenuBar.vue';
	import ItemCard from '../components/ItemCard.vue';
	export default {
		setup() {
			const { width, height } = useWindowSize();
			return {
				windowWidth: width,
				windowHeight: height,
			};
		},
		components: {
			SideMenuBar,
			ItemCard,
		},
		data() {
			return {
				test: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
				visibleLeft: false,
			};
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
						data-bs-toggle="offcanvas"
						data-bs-target="#offcanvas"
						role="button"
						@click="visibleLeft = true"
					>
						Filter
						<font-awesome-icon :icon="['fab', 'filter']" />
					</button>
				</div>
			</div>
			<div class="row">
				<div class="col-lg-3 d-none d-lg-block">
					<SideMenuBar />
				</div>
				<Sidebar
					v-model:visible="visibleLeft"
					class="d-block d-lg-none"
				>
					<SideMenuBar />
				</Sidebar>
				<div class="col-md-12 col-lg-9">
					<div
						class="row row-cols-2 justify-content-center gap-2 gap-lg-3"
					>
						<ItemCard v-for="(num, index) in test" :key="index" />
					</div>
				</div>
			</div>
		</div>
	</body>
</template>

<style scoped>
	.btn-outline-dark:hover {
		color: white;
	}
</style>
