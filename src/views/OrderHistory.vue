<script>
import PastOrders from "../components/PastOrder.vue";
export default {
	// <div id='app'></div>
		components: {
			PastOrders,
		},
		data() { 
			return { 
		// key: value
			items: [
				{ deliverydate: "2023/10/24", imgUrl: "/src/assets/img/ecommerce/placeholderImage.jpg", brand: "gucci", size: "L", seller: "Lay Foo", name: "Men's Jeans" },

				{ deliverydate: "2023/10/22", imgUrl: '/src/assets/img/ecommerce/placeholderImage.jpg', brand: "gucci", size: "L", seller: "Lay Foo", name: "Men's Jeans" },
			],
			};
		}, // data
		// computed: { 
		//     derivedProperty() {
		//         return false;
		//     }  
		// }, // computed
		// created() { 
		// },
		// mounted() { 
		// },
		methods: {
			methodName() {
				
			}
		} // methods
	};
</script>

<template>
	<body>
		<!--BELOW IS THE HEADER-->
		<h2 class="m-5 mb-4">Order History</h2>

		<!--BELOW ARE THE PAST ORDER ITEMS-->
		<div class="container-fluid">
			<PastOrders
			v-for="(item, index) in items"
			:key="index"
			:deliverydate="item.deliverydate"
			:imgUrl="item.imgUrl"
			:brand="item.brand"
			:size="item.size"
			:seller="item.seller"
			:name="item.name"
			/>
		</div>
	</body>
</template>



<style scoped>
p {
	color: black;
}

h2 {
	font-family: 'inter-bold';
	color: black;
}
</style>
