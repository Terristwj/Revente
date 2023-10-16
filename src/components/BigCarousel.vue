<script>
	export default {
		props: {
			imgurls: {
				type: Array,
				required: true,
			},
			imgDesc: {
				type: String,
				required: true,
			},
			carouId: {
				type: String,
				required: true,
			},
			interval: {
				type: Number,
				default: 5000,
			},
		},
		data() {
			return {
				carouIdStr: '#' + this.carouId,
			};
		},
	};
</script>

<template>
	<div :id="carouId" class="carousel slide" data-bs-ride="carousel">
		<div class="carousel-indicators">
			<button
				v-for="(imgurl, index) in imgurls"
				:key="index"
				type="button"
				:data-bs-target="carouIdStr"
				:data-bs-slide-to="index"
				:class="{ active: index === 0 }"
				aria-current="true"
			></button>
		</div>
		<div class="carousel-inner">
			<div
				v-for="(imgurl, index) in imgurls"
				:key="index"
				class="carousel-item"
				:class="{ active: index === 0 }"
				:data-bs-interval="interval"
			>
				<img :src="imgurl" class="d-block w-100" :alt="imgDesc" />
			</div>
		</div>
		<button
			class="carousel-control-prev"
			type="button"
			:data-bs-target="carouIdStr"
			data-bs-slide="prev"
		>
			<span class="carousel-control-prev-icon" aria-hidden="true"></span>
			<span class="visually-hidden">Previous</span>
		</button>
		<button
			class="carousel-control-next"
			type="button"
			:data-bs-target="carouIdStr"
			data-bs-slide="next"
		>
			<span class="carousel-control-next-icon" aria-hidden="true"></span>
			<span class="visually-hidden">Next</span>
		</button>
	</div>
</template>
