import { ref } from "vue";
import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";


export const useCurrentWishList = defineStore("currentWishList", () => {
    const wishList = useLocalStorage("wishList", []);

    function addWish(uid) {
        wishList.value.push(uid);
    }
    function getWishList() {
        return wishList.value;
    }

    return {
        wishList,
        addWish,
        getWishList,
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
