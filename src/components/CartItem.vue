<script>

import { wishList,shoppingCart } from "../main.js";
export default {
	data() {
		return {
			temp: [],
		};
	},
	props: {
		imgUrl: {
			type: String,
			required: true,
		},
		brand: {
			type: String,
			required: false,
		},
		size: {
			type: String,
			required: true,
		},
		seller: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		itemID: {
			type: String,
			required: true,
		},
	},

	methods: {
		remove(id) {
			shoppingCart.removeCart(id);	
		},
		addWishList(id) {
            if (wishList.getWishList().includes(id)) {
                alert("Item already added to wishlist, please check your wishlist");
            }
            else {
                wishList.addWish(id);
                // console.log(wishList.getWishList());
            }

        },

	},
};
	
</script>

<template>
	<div class="container-fluid">
		<div class="row">
			<div class="col-3 ps-0">
				<img :src="imgUrl" :alt="itemName" class="cart-img img-fluid" />
			</div>
			<div class="col-9">
				<div class="row">
					<div class="col-auto">
						<h6>{{ name }}</h6>
					</div>
					<div class="col-3">
						<h6>${{ price }}</h6>
					</div>
				</div>
				<p>{{ brand }}</p>
				<p>Size: {{ size }}</p>
				<p>
					Seller: <a href="#" class="seller-link">{{ seller }}</a>
				</p>
				<div class="mt-4">
					<button class="btn btn-outline-dark me-sm-2" @click="addWishList(itemID)">
						<font-awesome-icon :icon="['far', 'heart']" />
						Add to Wishlist
					</button>
					<button class="btn btn-outline-dark ms-sm-2" @click="remove(itemID)">
						<font-awesome-icon :icon="['far', 'trash-can']" />
						Remove
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
p {
	line-height: 85%;
}

.cart-img {
	width: 167px;
	height: 190px;
	object-fit: cover;
	float: left;
	border: 1px solid black;
	margin-right: 1rem;
}

.seller-link {
	color: var(--bs-dark);
}
</style>
