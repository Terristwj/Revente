<script></script>

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
</template>

<style scoped>
	html,
	body {
		background-color: white;
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
