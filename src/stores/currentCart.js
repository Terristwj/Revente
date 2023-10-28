import { ref } from "vue";
import { defineStore } from "pinia";

export const useCurrentCart = defineStore("currentCart", () => {
  const shoppingCart = ref([]);

  function addCart(uid) {
    shoppingCart.value.push(uid);
  }
  function getCart() {
    return shoppingCart.value;
  }
  function removeCart(uid) {
    shoppingCart.value.splice(shoppingCart.value.indexOf(uid), 1);
  }

  return {
    shoppingCart,
    addCart,
    getCart,
    removeCart,
  };
});

/**
 *  Used to retrieve the current user that is logged in.
 *  Note: If using mounted, must call timeout()
 *  How to use:
 *
 *  1|   import { userStore } from "../main.js";
 *  2|
 *  3|   export default {
 *  4|      mounted() {
 *  5|          setTimeout(function () {
 *   6|              console.log(userStore.getUserID());
 *  7|          }, 2000);
 *  8|      },
 *  9|   }
 */
