<script>
	import BigCarousel from '../components/BigCarousel.vue';
	import ItemCard from "../components/ItemCard.vue";
	export default {
		data() {
			return {
				imgurls: [
					'/src/assets/img/ecommerce/Google.png',
					'/src/assets/img/ecommerce/Google.png',
					'/src/assets/img/ecommerce/Google.png',
				],
			};
		},
		components: {
			BigCarousel,
			ItemCard,
		},
	};
</script>

<template>
	<header class="video-header">
		<video
			src="../assets/videos/exampleVid.mp4"
			autoplay
			loop
			playsinline
			muted
		></video>

		<div class="header-text">
			<h1>
				Reimagining
				<span>Sustainable</span>
			</h1>
		</div>
		<div class="description">
			<p>
				Propelling the Second-Hand Market: AI's Thrift Store AI holds
				immense potential to enhance the second-hand clothing market in
				myriad ways. From reliable pricing and personalized user
				experiences to expert styling services, AI-driven advancements
				breathe new life into pre-loved fashion. And let's not forget
				the boon of precise sizing, eliminating guesswork and enabling
				customers to find their perfect match effortlessly.
			</p>
			<p class="credit">
				Find out more
				<a href="#">here</a>
			</p>
		</div>
	</header>
	<div class="body-spacer"></div>
	<body>
		<div class="p-4 my-5">
			<h1>Fashionably Green</h1>
			<p>
				With REVENTÉ, you are supporting sustainable fashion! Explore a
				curated collection of fashionable clothing, made to enhance your
				wardrobe. Here at REVENTÉ, we build our platform through the
				principles of the circular economy and thrifting. Discover the
				latest trends, vintage finds, and timeless classics, all while
				reducing your environmental footprint. Join us in redefining
				fashion with style and conscience.
			</p>
			<div>
				<button class="btn btn-outline-dark me-3 px-5">Register</button>
				<button class="btn btn-dark ms-3 px-5">Sign In</button>
			</div>
		</div>
		<div class="p-4 my-5">
			<div class="container-fluid">
				<div class="row">
					<div class="col-md-6">
						<h1>Sale</h1>
						<BigCarousel
							:imgurls="imgurls"
							imgDesc="Example"
							carouId="SaleCarousel"
							:interval="5000"
						/>
					</div>
					<div class="col-md-6">
						<h1>New Drops</h1>
						<BigCarousel
							:imgurls="imgurls"
							imgDesc="Example2"
							carouId="DropCarousel"
							:interval="7000"
						/>
					</div>
					
				</div>
			</div>
			<ItemCard/>
		</div>
	</body>
</template>

<style scoped>
	.btn {
		border-radius: 23px;
	}

	html,
	body {
		background-color: white;
	}

	.body-spacer {
		margin-top: 100dvh;
	}

	video {
		width: 100dvw;
		min-height: 100dvh;
		position: absolute;
		top: 0;
		left: 0;
		object-fit: cover;
	}

	.header-text {
		position: absolute;
		color: white;
		display: flex;
		flex-direction: column;
		justify-content: center;
		text-align: center;
		transform: translateY(-5rem);
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
	}
	.header-text h1 {
		font-weight: 400;
		font-size: 1.75rem;
		text-transform: uppercase;
		line-height: 1;
	}
	.header-text span {
		display: block;
		font-weight: 900;
		font-size: 6rem;
	}
	.description {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto;
		color: black;
		background-color: hsla(0, 0%, 92%, 0.7);
		padding: 2rem;
	}
	.description p {
		max-width: 60rem;
		margin-inline: auto;
		line-height: 1.6;
	}
	.credit {
		font-size: 0.75rem;
	}
	.credit a {
		color: rgb(151, 151, 151);
		text-underline-offset: 2px;
	}
	@media (max-width: 768px) {
		.header-text h1 {
			font-weight: 400;
			font-size: 1.4rem;
			text-transform: uppercase;
			line-height: 1;
		}
		.header-text span {
			display: block;
			font-weight: 900;
			font-size: 4.8rem;
		}
	}
	@media (max-width: 576px) {
		.header-text h1 {
			font-weight: 400;
			font-size: 1.12rem;
			text-transform: uppercase;
			line-height: 1;
		}
		.header-text span {
			display: block;
			font-weight: 900;
			font-size: 3.85rem;
		}
	}
</style>
