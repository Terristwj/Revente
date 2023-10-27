<script>
import FBInstanceFirestore from "../services/Firebase/FirestoreDatabase.js";
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
		
			
			FBInstanceFirestore.getProduct(id)
                .then((data) => {
                    this.temp = data;
                    // console.log(this.temp);
                        FBInstanceFirestore.removeCart(
                            this.temp.seller_ID,
                            this.temp.product_ID,
                            this.temp.product_name,
                            this.temp.brand,
                            this.temp.description,
                            this.temp.gender,
                            this.temp.category,
                            this.temp.condition,
                            this.temp.condition_notes,
                            this.temp.drop_off_location,
                            this.temp.price,
                            parseFloat(this.temp.modifiedPrice),
                            true,
                            false,
                            this.temp.image_src,
                            this.temp.size,
                            '',
                            false
                        );	
                })
                .catch((error) => {
                    // Handle any errors that occur during the promise execution
                    console.error(error);
                });
				
		}

	},
};
	
</script>

<template>
	<div class="container-fluid">
		<div class="row">
			<div class="col-3 ps-0">
				<img :src="imgUrl" :alt="itemName" class="cart-img" />
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
					<button class="btn btn-outline-dark me-sm-2">
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
