<script>
	export default {
		props: {
			brands: {
				type: Array,
			},
		},
		mounted() {
			document.addEventListener('click', this.handleClickOutside);
		},
		unmounted() {
			document.removeEventListener('click', this.handleClickOutside);
		},
		data() {
			return {
				brandSearchInput: '',
				isOpen: false,
				results: [],
				currentResult: '',
			};
		},
		methods: {
			setResult(result) {
				this.brandSearchInput = result;
				this.isOpen = false;
			},
			filterResults() {
				this.results = this.brands.filter(
					(item) =>
						item.indexOf(this.brandSearchInput.toUpperCase()) > -1
				);
			},
			onchange() {
				this.currentResult = '';
				this.filterResults();
				this.isOpen = true;
			},
			handleClickOutside(event) {
				if (!this.$el.contains(event.target)) {
					this.isOpen = false;
				}
			},
			getResult() {
				if (this.currentResult === '') {
					this.brandSearchInput = this.results[0];
				} else {
					this.brandSearchInput = this.results[this.currentResult];
				}
				this.isOpen = false;
				this.$emit('brands-picked', this.brandSearchInput);
			},
			selectNextResult() {
				if (this.currentResult === '') {
					this.currentResult = 0;
				} else if (this.currentResult >= 2) {
					this.currentResult = 0;
				} else {
					this.currentResult++;
				}
				console.log(this.currentResult);
			},
			selectPreviousResult() {
				if (this.currentResult === '') {
					this.currentResult = 2;
				} else if (this.currentResult === 0) {
					this.currentResult = 2;
				} else {
					this.currentResult--;
				}
				console.log(this.currentResult);
			},
		},
	};
</script>

<template>
	<div class="autocomplete">
		<div class="input-group">
			<input
				type="text"
				class="form-control border-end-0"
				placeholder="Search Brands"
				aria-label="Search Brands"
				v-model="brandSearchInput"
				@input="onchange"
				@keydown.enter="getResult"
				@keydown.down="selectNextResult"
				@keydown.up="selectPreviousResult"
			/>
			<span class="input-group-append">
				<button
					class="btn btn-outline-secondary border"
					type="button"
					@click="getResult"
				>
					<i class="fa fa-search"></i>
				</button>
			</span>
		</div>
		<ul
			v-show="isOpen"
			class="autocomplete-results"
			:class="{ invalid: results.length == 0 }"
		>
			<li
				v-for="(result, i) in results"
				:key="i"
				class="autocomplete-result"
				@click="setResult(result)"
				:class="{ 'is-active': i === currentResult }"
			>
				{{ result }}
			</li>
		</ul>
	</div>
</template>

<style scoped>
	.autocomplete {
		position: relative;
	}

	.autocomplete-results {
		padding: 0;
		margin: 0;
		border: 1px solid #eeeeee;
		max-height: 6.5em;
		overflow: auto;
		border-bottom-left-radius: 15px;
		border-bottom-right-radius: 15px;
	}

	.invalid {
		display: none;
	}
	.autocomplete-result {
		list-style: none;
		text-align: left;
		padding: 4px 16px;
		cursor: pointer;
	}

	.autocomplete-result:hover {
		background-color: #9fa6b2;
		color: white;
	}
	.is-active {
		background-color: #9fa6b2;
		color: white;
	}
</style>
