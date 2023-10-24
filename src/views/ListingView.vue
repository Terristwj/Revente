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
			};
		},
		computed: {
			isSidebarFullscreen() {
				return this.windowWidth < 576;
			},
		},
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
				v-if="isSidebarFullscreen"
			>
				Filter
				<font-awesome-icon :icon="['fab', 'filter']" />
			</button>
		</div>
		<div class="container-fluid">
			<div class="row">
				<div class="col-auto">
					<SideMenuBar :isSidebarFullscreen="isSidebarFullscreen" />
				</div>
				<div class="col-9">
					<div
						class="row row-cols-2 row-cols-md-3 row-cols-lg-4 justify-content-center gap-1 gap-md-2 gap-lg-3"
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
