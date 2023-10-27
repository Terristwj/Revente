<script>
import { useWindowSize } from 'vue-window-size';
import SideMenuBar from '../components/SideMenuBar.vue';
import ItemCard from '../components/ItemCard.vue';
import FBInstanceFirestore from "../services/Firebase/FirestoreDatabase.js";
export default {
	created() {
		// grabs all the data already AND SPLITS them into pending and approved
		FBInstanceFirestore.getAllProducts().then((data) => {
			for (const key in data) {
				if (data[key].is_approved == true) {
					this.approvedProducts.push(data[key]);
				}
			}
			console.log(this.approvedProducts);
		}).catch((error) => {
			// Handle any errors that occur during the promise execution
			console.error(error);
		});


	},
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
			visibleLeft: false,
			approvedProducts : [],
		};
	},
};
</script>

<template>
	<body>
		<div class="container-fluid">
			<div class="row">
				<div class="my-3">
					<button class="btn btn-outline-dark d-inline-flex align-items-center d-block d-lg-none"
						data-bs-toggle="offcanvas" data-bs-target="#offcanvas" role="button" @click="visibleLeft = true">
						Filter
						<font-awesome-icon :icon="['fas', 'filter']" class="mx-2" />
					</button>
				</div>
			</div>
			<div class="row">
				<div class="col-lg-3 d-none d-lg-block">
					<SideMenuBar />
				</div>
				<Sidebar v-model:visible="visibleLeft" class="d-block d-lg-none">
					<SideMenuBar />
				</Sidebar>
				<div class="col-md-12 col-lg-9">
					<div class="row row-cols-2 justify-content-center gap-2 gap-lg-3">
						<ItemCard v-for="(product, index) in approvedProducts" :key="index" :product = product />
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
