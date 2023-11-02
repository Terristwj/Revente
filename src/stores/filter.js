import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';

export const useCurrentFilter = defineStore('filter', () => {
	const filterSettings = useLocalStorage('filterSettings', {
		gender: '',
		brand: [],
		minPrice: '',
		maxPrice: '',
	});

	function setGender(gender) {
		filterSettings.value.gender = gender;
	}

	function setBrands(brands) {
		filterSettings.value.brand = brands;
	}

	function addBrand(brand) {
		if (!filterSettings.value.brand.includes(brand)) {
			filterSettings.value.brand.push(brand);
		}
	}

	function removeBrand(brand) {
		filterSettings.value.brand = filterSettings.value.brand.filter(
			(b) => b !== brand
		);
	}

	function setPriceRange(min, max) {
		filterSettings.value.minPrice = min;
		filterSettings.value.maxPrice = max;
	}

	function getFilter() {
		return filterSettings.value;
	}

	function resetFilters() {
		filterSettings.value = {
			gender: '',
			brand: [],
			minPrice: '',
			maxPrice: '',
		};
	}

	return {
		filterSettings,
		setGender,
		setBrands,
		addBrand,
		removeBrand,
		setPriceRange,
		getFilter,
		resetFilters,
	};
});

/**
 *  Used to retrieve the filter tags user that input.
 *  Note: If using mounted, must call timeout()
 *  How to use:
 *
 *  1|   import { filters } from "../main.js";
 *  2|
 *  3|   export default {
 *  4|      mounted() {
 *  5|          setTimeout(function () {
 *  6|              console.log(userStore.getUserID());
 *  7|          }, 2000);
 *  8|      },
 *  9|   }
 */
